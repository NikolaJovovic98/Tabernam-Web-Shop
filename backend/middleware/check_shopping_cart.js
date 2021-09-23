import Product from '../models/Products.js';

export const shopping_cart_check = async (req,res,next) => {
    const { shopping_cart, total_price } = req.body;
    try {

        const price = await shopping_cart.reduce( async (item_promise,curr) => {
            let product = await Product.findOne({ _id : curr._id });
            const test = await item_promise;
            return test + product.product_price * curr.qty;
        },0);  
        
        const final_price = price.toFixed(2);

        if( parseFloat(final_price,10) !== parseFloat(total_price,10) ) return res.status(400).json({msg:"Not allowed aloo!"});

        req.price = parseFloat(final_price,10);

        next();

    } catch (error) {
        console.log("Error in checking shopping cart: ",error);
        res.status(400).json({msg:error});
    }
};