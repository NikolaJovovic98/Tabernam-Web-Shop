import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/Users.js';

export const check_admin = async (req,res,next) =>{
    try {
       const cookie = req.cookies.profile || false;
       if(!cookie) return res.status(401).json({msg:"Not allowed"});

       const jwt_token = jwt.verify(cookie,process.env.JWT_SECRET);
       const user_id = jwt_token.user_id;
       if(!mongoose.Types.ObjectId.isValid(user_id)) return res.status(401).json({msg:"Not allowed"});

       const user = await User.findById(user_id);
       if(!user.is_admin) return res.status(401).json({msg:"Not allowed"});

       req.user = user_id;
       next();
    } catch (error) {
         console.log("Error in admin check middleware ",error);
         res.status(401).json({msg:error})
    };
};

/*
Nakon sto se admin loginuje cuva se cookie koji sadrzi jwt token koji 
sadrzi id, nakon sto admin doda novi product treba odraditi api poziv ka
 bekendu sa podacima o produktu a na bekendu treba prije middleware add new 
 product dodati check admin middleware koji provjerava: 
1. da li postoji cookie
2. da li je jwt unutar cookie-ja validan
3. da li je id unutar jwt-a validan
4. da li je korisnik sa tim id-jem admin
*/