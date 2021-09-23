import User from '../models/Users.js';
import Order from '../models/Orders.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { email_verify_mailer, password_reset_mailer } from '../services/email_verify_mail.js';

export const register_user = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        if (!username || !email || !password) return res.status(405).json({ msg: " Must provide all fields " });
        const user = await User.findOne({ email });
        if (user) return res.status(405).json({ msg: " User with same email already exist " });
        const hashed_password = await bcryptjs.hash(password, 10);
        const new_user = await User.create({
            username,
            email,
            password: hashed_password
        });
        const jwt_token = jwt.sign({ id: new_user._id, username: new_user.username }, process.env.JWT_SECRET, { expiresIn: '10m' });
        await email_verify_mailer(email, jwt_token);
        return res.status(201).json(new_user);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: "Error in registering a user" });
    }
};

export const verify_email = async (req, res) => {
    try {
        const token = req.params.jwtToken;
        const open_token = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(open_token.id);
        if (!user) return res.redirect('http://localhost:3000/register?verify=error');
        await User.findOneAndUpdate({ _id: open_token.id }, { email_verify: true });
        res.redirect('http://localhost:3000/register?verify=success');
    } catch (error) {
        console.log(error.message);
        res.redirect('http://localhost:3000/register?verify=error');
    }
};

export const login_user = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) return res.status(406).json({ msg: "Must fill all fields" });
        const user = await User.findOne({ email }).select("+password");
        if (!user) return res.status(406).json({ msg: "User does not exist" });
        if (!user.email_verify) return res.status(406).json({ msg: "Verify your email first" });
        const compare_passwords = await bcryptjs.compare(password, user.password);
        if (!compare_passwords) return res.status(406).json({ msg: "Invalid email or password" });
        const jwt_token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET, { expiresIn: "2h" });
        res.cookie('profile',jwt_token,{
            secure : false,
            httpOnly : true
        });
        return res.status(201).json(
            {
              id: user._id,
              username: user.username,
              is_admin: user.is_admin
            });
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "Error in logging in" });
    }
};


export const get_cookie = async (req,res) =>{
    try {
        const cookie = req.cookies.profile || "no cookie";
        const digest_cookie = jwt.verify(cookie,process.env.JWT_SECRET);
        const user = await User.findById(digest_cookie.user_id);
        if(!user) return res.json(false);
        res.json(true);
    } catch (error) {
        if( error.message === 'jwt malformed' ) {
            return res.json(false);
        }
    }
};

export const place_order = async (req,res) => {
    const user_id = req.user;
    const total_price = req.price;
    const { shopping_cart,username, order_date, address, phone_number, payment_method  } = req.body;
    try {
        shopping_cart.forEach( item => delete item._id );

        const order = await Order.create({
            user_id,
            username,
            shopping_cart,
            total_price,
            order_date,
            address,
            phone_number,
            payment_method
        });

        res.status(200).json(order);

    } catch (error) {
        console.log("Error in placing an order: ",error);
        res.status(400).json({msg:error.message});
    }
};

export const pending_orders = async (req,res) => {
    const user_id = req.user;
    try {
        const all_orders = await Order.find({ user_id : user_id, is_delivered : false }).sort({ createdAt: -1 });
        res.status(201).json(all_orders);
    } catch (error) {
        console.log("Error in getting pending orders: ",error);
        res.status(400).json({msg:error.message});
    }
};

export const users_pending_orders = async ( req, res) => {
    const admin_id = req.user;
    try {
        const pending_orders = await Order.find().sort({createdAt: -1});
        res.status(200).json(pending_orders);
    } catch (error) {
        console.log("Error in getting all users pending orders: ",error.message);
        res.status(400).json({msg:error.message});
    }
};

export const update_order = async (req,res) => {
    const { order_id } = req.body;
    try {
        const find_order = await Order.findOne({ _id : order_id });
        if( !find_order ) return res.status(400).json({msg:"Not possible"});
        await Order.findOneAndUpdate({ _id : order_id }, { is_delivered : !find_order.is_delivered }, {new : true});
        const payload = await Order.find().sort({createdAt: -1});
        res.status(200).json(payload);
    } catch (error) {
        console.log("Error in updating order: ",error);
        res.status(400).json({msg:error.message});
    }
};

export const password_reset = async (req,res)=>{
    const {enteredEmail} = req.body;
    try {
        const all_users = await User.find();
        const index = all_users.findIndex( user => user.email === enteredEmail );
        if( index === -1 ) return res.status(400).json({msg:'Not possible'});
        const jwt_token = jwt.sign({enteredEmail},process.env.JWT_SECRET,{expiresIn:'1h'});
        await password_reset_mailer(enteredEmail,jwt_token);
        res.status(200).json({msg:`Email sent to ${enteredEmail}`});
    } catch (error) {
        console.log("Error in sending password reset link: ",error.message);
        res.status(400).json({msg:error.message});
    }
};

export const check_password_reset_jwt = async (req,res) => {
    const { jwt_token } = req.params;
    try {
    const jwt_verify = jwt.verify(jwt_token,process.env.JWT_SECRET);
    if(!jwt_verify) return res.status(400).json({msg:"Not possible 1"});
    const user = await User.find({ email : jwt_verify.enteredEmail });
    if(!user) return res.status(400).json({msg:"Not possible 2"});
    res.status(200).json(true);
    } catch (error) {
        console.log('Error in checking password reset jwt token: ',error.message);
        res.status(400).json({msg:error.message})
    }
}

export const reset_password = async (req,res) => {
    const { newPassword, confirmNewPassword, jwt_token } = req.body;
    try {
        const check_jwt = jwt.verify(jwt_token,process.env.JWT_SECRET);
        if(!check_jwt.enteredEmail) return res.status(400).json({msg:"Not able to reset password 1"});
        if( newPassword.length < 6 || (newPassword !== confirmNewPassword)) return res.status(400).json({msg:"Not able to reset password 2"});
        const hash_new_password = await bcryptjs.hash(newPassword,10);
        await User.findOneAndUpdate({ email : check_jwt.enteredEmail }, { password : hash_new_password });
        res.status(200).json(true);
    } catch (error) {
        console.log('Error in reseting password: ',error.message);
        res.status(400).json({msg:error.message});
    }
}

export const clear_cookies = (req,res) =>{
    try {
        res.clearCookie("profile");
        res.status(202).json(true);
    } catch (error) {
        console.log(error.message);
        res.status(406).json(false);
    }
}

