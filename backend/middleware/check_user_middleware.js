import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/Users.js';

export const check_user = async (req,res,next) => {
    try {
        const cookie = req.cookies.profile || false;
        if(!cookie) return res.status(401).json({msg:"Not possible 1"});
        
        const jwt_token = jwt.verify(cookie,process.env.JWT_SECRET);
        const logged_user_id = jwt_token.user_id;

        if(!mongoose.Types.ObjectId.isValid(logged_user_id)) return res.status(401).json({msg:"Not possible 2"});

        if(req.body.user_id) {
            const body_user_id = req.body.user_id;
            if( logged_user_id !== body_user_id ) return res.status(401).json({msg:"Not possible 3"});
        }
        
        const user = await User.findOne({ _id : logged_user_id });

        if(!user) return res.status(401).json({msg:"Not possible 4"});

        req.user = user._id;

        next();

    } catch (error) {
        console.log("Error in checking user middleware: ",error);
        res.status(401).json({msg:error});
    }
};