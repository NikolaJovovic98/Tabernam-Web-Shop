import express from 'express';
const router = express.Router();
import { add_new_product, get_all_products, delete_product, update_product, show_product, get_products_by_category, search_by_name, test,get_newest_products } from '../controllers/products_controller.js';
import { check_admin } from '../middleware/check_admin_middleware.js';

router.post("/",check_admin,add_new_product);
router.get("/",get_all_products);
router.post("/:product_id",check_admin,delete_product);
router.post("/update/:product_id",check_admin,update_product);
router.get("/show/:product_id",show_product);
router.get("/get-by-category/:category",get_products_by_category);
router.get("/get-by-name/:name",search_by_name);
router.get("/get/newest-products",get_newest_products)

router.get("/this/is/test",test);

export default router;