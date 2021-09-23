import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const orderSchema = new mongoose.Schema({
    user_id: {
        type:  Schema.Types.ObjectId,
        required: [true, 'User id missing from order'],
        ref : 'User'
    },
    username : {
        type : String,
        required: [true, 'Username missing from order'],
    },
    shopping_cart : [
        {   
            _id : false,
            product_name  : { type : String, required : [ true, 'Product name missing' ] },
            product_price : { type : Number, required : [ true, 'Product price missing' ] },
            qty :           { type : Number, required : [ true, 'Product quantity missing' ] },
        }
    ],
    total_price : {
        type : Number,
        required : [ true, 'Total price missing' ]
    },
    address : {
        type : String,
        required : [ true, 'Address missing' ]
    },
    phone_number : {
        type : String,
        required : [ true, 'Phone number missing' ]
    },
    payment_method : {
        type : String,
        required : [ true, 'Payment method missing' ]
    },
    order_date : {
        type : String,
        required : [ true, 'Date missing' ]
    },
    is_delivered : {
        type : Boolean,
        default : false
    }
},{timestamps:true});

const Order = mongoose.model('Order', orderSchema);

export default Order;