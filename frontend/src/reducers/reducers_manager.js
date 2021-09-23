import { combineReducers } from "redux";
import { register_reducer, 
         login_reducer, 
         get_cookie_reducer, 
         remove_cookie_reducer, 
         make_order_reducer, 
         get_pending_orders_reducer, 
         get_users_pending_orders_reducer,
         password_reset_request_reducer,
         password_reset_final_reducer,
         reset_password_reducer } from "./users_reducers";
import { add_new_product_reducer,get_all_products_reducer, delete_product_reducer, get_product_reducer,get_newest_product_reducer} from './products_reducers';

export default combineReducers({
    register : register_reducer,
    login : login_reducer,
    is_user_logged_in : get_cookie_reducer,
    log_out : remove_cookie_reducer,
    add_new_product : add_new_product_reducer,
    all_products : get_all_products_reducer,
    delete_product : delete_product_reducer,
    get_product : get_product_reducer,
    make_order : make_order_reducer,
    pending_orders : get_pending_orders_reducer,
    users_pending_orders : get_users_pending_orders_reducer,
    password_reset_request : password_reset_request_reducer,
    password_reset_final : password_reset_final_reducer,
    reset_password : reset_password_reducer,
    newest_products : get_newest_product_reducer
});