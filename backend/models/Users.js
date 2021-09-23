import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username missing']
    },
    email: {
        type: String,
        required: [true, 'Email missing'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password missing'],
        minlength : 6,
        select : false
    },
    email_verify : {
        type : Boolean,
        default : false
    },
    is_admin : {
        type : Boolean,
        default : false
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;