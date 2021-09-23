import express from 'express';
const router = express.Router();
import { register_user, 
        verify_email, 
        login_user, 
        get_cookie, 
        clear_cookies, 
        place_order, 
        pending_orders, 
        users_pending_orders, 
        update_order,
        password_reset,
        check_password_reset_jwt,
        reset_password } from '../controllers/users_controller.js';
import { check_user } from '../middleware/check_user_middleware.js';
import { shopping_cart_check } from '../middleware/check_shopping_cart.js';
import { check_admin } from '../middleware/check_admin_middleware.js';

router.post('/register',register_user);
router.get('/verifyEmail/:jwtToken',verify_email);
router.post('/login',login_user);
router.get('/test',get_cookie);
router.get('/cc',clear_cookies);
router.post('/place-order',check_user,shopping_cart_check,place_order); 
router.get('/pending-orders',check_user,pending_orders);
router.get('/users-pending-orders',check_admin,users_pending_orders);
router.post('/update-order',update_order);

router.post('/send-password-reset-link',password_reset);
router.get('/password-reset-check-jwt/:jwt_token',check_password_reset_jwt);
router.post('/reset-password',reset_password);

export default router;