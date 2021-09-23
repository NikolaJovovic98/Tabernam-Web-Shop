import axios from 'axios';
axios.defaults.withCredentials = true; // Ovo treba staviti zbog bug-a u axiosu kod slanja cookie pri api pozivu

const API = axios.create({ baseURL : 'http://localhost:2000' });

// Users
export const register_user = (data) => API.post('/users/register',data);
export const login_user = (data) => API.post('/users/login',data);
export const get_cookie = () => API.get('/users/test',{withCredentials:true});
export const remove_cookie = () => API.get('/users/cc',{withCredentials:true});
export const make_order = (data) => API.post('/users/place-order',data,{withCredentials:true});
export const get_pending_orders = () => API.get('/users/pending-orders',{withCredentials:true});
export const get_users_pending_orders =() => API.get('/users/users-pending-orders',{withCredentials:true});
export const update_order = (order_id) => API.post('/users/update-order',order_id,{withCredentials:true});
export const password_reset_request = (email) => API.post('/users/send-password-reset-link',email);
export const password_reset_final = (jwt_token) => API.get(`/users/password-reset-check-jwt/${jwt_token}`);
export const reset_password = (data) => API.post('/users/reset-password',data);

// Products
export const add_new_product = (data) => API.post('/products',data,{withCredentials:true}); 
export const get_all_products = (page) => API.get(`/products?page=${page}`,{withCredentials:true});
export const delete_product = (product_id) => API.post(`/products/${product_id}`,{withCredentials:true});
export const update_product = (product_id,data) => API.post(`/products/update/${product_id}`,data,{withCredentials:true});
export const get_product = (product_id) => API.get(`/products/show/${product_id}`);
export const get_products_by_category = (category) => API.get(`/products/get-by-category/${category}`);
export const get_products_by_name = (name) => API.get(`/products/get-by-name/${name}`);
export const get_newest_products = () => API.get('/products/get/newest-products');