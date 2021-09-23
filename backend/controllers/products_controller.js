import Product from '../models/Products.js';
import Category from '../models/Categories.js';
import mongoose from 'mongoose';

export const add_new_product = async (req,res) =>{
    const { product_name,
            product_price, 
            product_image, 
            product_category,
            product_info_energy,
            product_info_fats,
            product_info_saturated_fats,
            product_info_proteins,
            product_info_carbs,
            product_info_sugar,
            product_info_fibers,
            product_info_salt  
            } = req.body;
    const admin_who_added = req.user;
    try {
        const categories = await Category.find();
        const check_category = categories.findIndex( cat => cat.name === product_category );
        if( check_category === -1 ) return res.status(400).json({msg:"Error in adding product"});
        const category_id = categories[check_category]._id;
        const new_product = await Product.create({
            product_name,
            product_price : parseFloat(product_price,10),
            product_image,
            admin_who_added,
            product_category : category_id,
            product_info_energy,
            product_info_fats,
            product_info_saturated_fats,
            product_info_proteins,
            product_info_carbs,
            product_info_sugar,
            product_info_fibers,
            product_info_salt 
        });
        res.status(201).json(new_product); 
    } catch (error) {
        console.log("Error in adding new product: ",error.message);
        res.status(401).json({msg:error});
    };
};

export const get_all_products = async (req,res) => {
    let { page } = req.query;
    try {
        if( !page ) {
            page = 0;
        }
        const num_of_products = await Product.count(); // ukupan broj proizvoda
        const limit = 8; // koliko ce biti prikazano po stranici
        const numberOfPages = Math.ceil(num_of_products/limit); // ukupan broj stranica
        const skip = Number(page) === 0 ? 0 : (Number(page)-1) * limit; // index odakle ce biti preskoceno kad se predje na stranicu drugu
        // skip = pocni od tog indexa

        const products = await Product.find() // nadji
                                      //.sort({ createdAt: -1 }) // sortiraj od najnovijeg do najstarijeg
                                      .limit(limit) // limitiraj na odredjeni broj limit
                                      .skip(skip) // pocni od proizvoda sa indexom [skip]
                                      .populate('product_category','-_id name'); // ...

        res.status(200).json({products,numberOfPages,currentPage:Number(page)});
    } catch (error) {
        console.log("Error in getting all products: ",error.message);
        res.status(401).json({msg:error.message});
    };
};

export const get_newest_products = async( req,res ) => {
    try {
        const latest_products = await Product.find().sort({createdAt:-1}).limit(5);
        res.status(200).json(latest_products);
    } catch (error) {
        console.log('Error in getting newest products');
        res.status(400).json({msg:error.message})
    }
}

export const delete_product = async (req,res) => {
    const {product_id} = req.params;
    try {
        const product = await Product.deleteOne({ _id : product_id });
        res.status(200).json(product);
    } catch (error) {
        console.log("Error in deleting product: ",error.message);
        res.status(401).json({msg:error.message});
    }
}

export const update_product = async (req,res) => {
    const { product_id } = req.params;
    const update_data = req.body;
    const admin_id = req.user;
    try {
        if(!mongoose.Types.ObjectId.isValid(product_id)) return res.status(401).json({msg:"Not allowed"});
        const product = await Product.findOne({_id:product_id});
        if( String(product.admin_who_added) !== admin_id) return res.status(401).json({msg:"Not allowed"});
        if(!product) return res.status(401).json({msg:"Not allowed"});
        const update_product = await Product.findOneAndUpdate({ _id : product_id },update_data);
        res.status(201).json(update_product);
    } catch (error) {
        console.log("Error in updating product: ",error.message);
        res.status(401).json({msg:error.message})
    }
};

export const show_product = async (req,res) => {
    const {product_id} = req.params;
    try {
        const product = await Product.findOne({ _id : product_id });
        if(!product) return res.status(400).json({msg:"Not found"});
        res.status(200).json(product);
    } catch (error) {
        console.log("Error in showing product: ",error.message);
        res.status(400).json({msg:error.message})
    }
};

export const get_products_by_category = async (req,res) => {
    const { category } = req.params;
    try {
        const categories = await Category.find();
        const index = categories.findIndex( cat => cat.name === category );
        const products = await Product.find({ product_category : categories[index]._id }).populate('product_category','-_id name');
        res.status(200).json({products});
    } catch (error) {
        console.log('Error in getting products by category: ',error.message);
        res.status(400).json({msg:error.message})
    }
};

// export const test = async(req,res) => {
//     const { categories_array } = req.body;
//     try {
//         const categories = await Category.insertMany(categories_array);
//         res.status(200).json(categories);
//     } catch (error) {
//         res.json(error.message);
//     }
// };

// export const test2 = async(req,res) => {
//     try {
//         // Posto u Product semi imamo dio koji se zove product_category i on pokazuje na _Id iz modela Category
//         // kad pretrazimo Product bez ovoga populate dobijamo podatke uz koje nam stoji da je product_category = 123419515 znaci id
//         // kad stavimo populate i unutar njega ime podatka dobijamo taj dio otvoren dakle Category dobijamo id name itd
//         const product = await Product.find().populate('product_category','-_id name');
//         res.json(product);
//     } catch (error) {
//         res.json(error.message);
//     }
// };

export const search_by_name = async(req,res) => {
    const name = req.params.name;
    try {
        const products = await Product.find( { product_name : { $regex : name  } } );
        res.status(200).json({products});
    } catch (error) {
        res.status(400).json(error.message);
    }
}

export const test = async (req,res)=>{
    try {
        const product = await Product.find({ product_name : "Pringles" });
        const result =  product.nameToLowerCase;
        res.json(result);
    } catch (error) {
        res.status(400).json(error.message);
    }
}