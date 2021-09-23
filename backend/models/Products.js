import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const productSchema = new mongoose.Schema({
    product_name : {
        type : String,
        required : [ true, 'Product name missing' ]
    },
    product_price : {
        type : Number,
        required : [ true, 'Product price missing' ]
    },
    product_image : {
        type : String,
        required : [ true, 'Product image missing' ]
    },
    admin_who_added : {
        type : Schema.Types.ObjectId,
        required : [ true, 'Admin who added missing' ],
        ref : 'User'
    },
    product_category : {
        type : Schema.Types.ObjectId,
        required : [ true, 'Category missing' ],
        ref : 'Category'
    },
    product_info_energy : {
        type : String,
        required : [ true, 'Product info energy missing' ]
    },
    product_info_fats : {
        type : String,
        required : [ true, 'Product info fats missing' ]
    },
    product_info_saturated_fats : {
        type : String,
        required : [ true, 'Product info saturated fats missing' ]
    },
    product_info_proteins : {
        type : String,
        required : [ true, 'Product info proteins missing' ]
    },
    product_info_carbs : {
        type : String,
        required : [ true, 'Product info carbs missing' ]
    },
    product_info_sugar : {
        type : String,
        required : [ true, 'Product info sugar missing' ]
    },
    product_info_fibers : {
        type : String,
        required : [ true, 'Product info fibers missing' ]
    },
    product_info_salt : {
        type : String,
        required : [ true, 'Product info salt missing' ]
    }
},{timestamps:true});

productSchema.virtual('nameToLowerCase')
             .get(function () {
                 return this.product_name;
             });

const Product = mongoose.model('Product',productSchema);

export default Product;