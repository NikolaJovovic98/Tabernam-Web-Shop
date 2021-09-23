import dotenv from 'dotenv'
dotenv.config();
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import {connect_to_db} from "./config/db_connection.js";
const PORT = process.env.PORT || 2000;
const app = express();
import users_router from './routes/users_router.js';
import products_router from './routes/products_router.js';


// Kad postavimo credentials : true i origin (ovo je link servera frontend React)
// To znaci da ce se cookie kod login-a npr postaviti na frontend strani
// Isto tako withCredentials : true stavimo u React kod slanja axios poziva
// da bi imali pristup cookie-ju
app.use(cors({
    credentials : true,
    origin : 'http://localhost:3000'
}));

app.use(cookieParser());
app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({limit:"50mb",extended:true}));

app.use("/users",users_router);
app.use("/products",products_router);

connect_to_db()
.then(() => {
    console.log("Connected to database");
    app.listen(PORT,()=>{
        console.log(`Connected to server on port ${PORT}`);
    });    
}).catch((err) => {
    console.log(err);
});

