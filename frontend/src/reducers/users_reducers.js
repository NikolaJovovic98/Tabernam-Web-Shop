export const register_reducer = ( user = {} , action ) =>{
    switch(action.type){
        case 'REGISTER_REQUEST':
            return {
                loading : true
            };
        case 'REGISTER_SUCCESS':
            return {
                loading : false,
                user : action.payload
            };
        case 'REGISTER_FAIL':
            return {
                register_error : action.payload
            };
        default :
            return user;
    }
};

export const login_reducer = ( user = {}, action ) =>{
    switch(action.type){
        case 'LOGIN_REQUEST' :
            return {
                loading : true
            }
        case 'LOGIN_SUCCESS' :
            localStorage.setItem('user_info',JSON.stringify(action.payload));
            return {
                loading : false,
                user : action.payload
            }
        case 'LOGIN_FAIL' :
            return {
                login_error : action.payload
            }
        case 'EMPTY_LOGIN_DATA' :
            user = {};
            return user;
        default :
            return user;
    };
};

export const get_cookie_reducer = ( cookie = {} , action ) =>{
    switch(action.type) {
        case 'GET_COOKIE_REQUEST' :
            return {
                loading : true
            }
        case 'GET_COOKIE_LOGGED_IN' :
            return {
                loading : false,
                cookie : action.payload
            }
        case 'GET_COOKIE_LOGGED_OUT' :
            return {
                loading : false,
                cookie : action.payload
            }
        default : 
            return cookie;
    };
};

export const remove_cookie_reducer = ( remove_cookie = false , action ) =>{
    switch(action.type) {
        case 'REMOVE_COOKIE_SUCCESS' :
            localStorage.removeItem('user_info');
            return {
                remove_cookie : action.payload
            }
        case 'REMOVE_COOKIE_FAIL' :
            return {
                remove_cookie_error : action.payload
            }
        case 'EMPTY_LOGOUT_DATA' :
            remove_cookie = false;
            return remove_cookie;
        default : 
            return remove_cookie;
    };
};

export const make_order_reducer = ( order = {}, action ) => {
    switch(action.type){
        case 'REQUEST_MAKE_ORDER' :
            return {
                loading : true
            }
        case 'SUCCESS_MAKE_ORDER':
            return {
                loading : false,
                order : action.payload
            }
        case 'ERROR_MAKE_ORDER' : 
            return {
                loading : false,
                order_error : action.payload
            }
        default : 
            return order;
    }
}

export const get_pending_orders_reducer = ( pending_orders = [], action ) => {
    switch(action.type){
        case 'REQUEST_GET_PENDING_ORDERS' :
            return {
                loading : true
            }
        case 'SUCCESS_GET_PENDING_ORDERS' :
            return {
                loading : false,
                pending_orders : action.payload
            }
        case 'ERROR_GET_PENDING_ORDERS' :
            return {
                loading : false,
                pending_orders_error : action.payload
            }
        default : 
            return pending_orders;
    }
};


export const get_users_pending_orders_reducer = ( users_orders = [] , action ) => {
    switch(action.type){
        case 'REQUEST_USERS_PENDING_ORDERS' :
            return {
                loading : true
            }
        case 'SUCCESS_USERS_PENDING_ORDERS' :
            return {
                loading : false,
                users_orders : action.payload
            }
        case 'SUCCESS_UPDATE_ORDER' :
            return {
                loading : false,
                users_orders : action.payload
            }
        case 'ERROR_USERS_PENDING_ORDERS' :
            return {
                loading : false,
                users_orders_error : action.payload
            }
        default : 
            return users_orders;
    }
};

export const password_reset_request_reducer = ( pass_res_req = "" , action ) => { 
    switch(action.type) {
        case 'REQUEST_PASSWORD_RESET_REQUEST' :
            return {
                loading : true
            }
        case 'SUCCES_PASSWORD_RESET_REQUEST' :
            return {
                loading : false,
                pass_res_req : action.payload
            }
        case 'ERROR_PASSWORD_RESET_REQUEST' :
            return {
                loading : false,
                pass_res_req_err : action.payload
            }
        default :
            return pass_res_req;

    }
}

export const password_reset_final_reducer = ( pass_reset_final = {} , action ) => { 
    switch(action.type) {
        case 'SUCCES_PASSWORD_RESET_FINAL' :
            return {
                pass_reset_final : action.payload
            }
        case 'ERROR_PASSWORD_RESET_FINAL' :
            return {
                pass_reset_final_err : action.payload
            }
        default :
            return pass_reset_final;

    }
}

export const reset_password_reducer = ( reset_password = {} , action ) => { 
    switch(action.type) {
        case 'SUCCESS_RESET_PASSWORD' :
            return {
                reset_password : action.payload
            }
        case 'ERROR_RESET_PASSWORD' :
            return {
                reset_password_error : action.payload
            }
        default :
            return reset_password;

    }
}