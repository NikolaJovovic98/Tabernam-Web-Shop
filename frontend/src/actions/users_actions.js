import * as api from '../api/api_manager';

export const register_action = ( registerData ) => async (dispatch) =>{
    try {
        dispatch({type:'REGISTER_REQUEST'});
        
        const { data } = await api.register_user(registerData);

        dispatch({
            type:'REGISTER_SUCCESS',
            payload:data
        });
    } catch (error) {
        console.log(error);
        dispatch({
            type:'REGISTER_FAIL',
            payload:error.response.data.msg
        })
    }
};

export const login_action = (loginData) => async (dispatch) =>{
    try {
        dispatch({
            type : 'LOGIN_REQUEST'
        });

        const { data } = await api.login_user(loginData);

        dispatch({
            type : 'LOGIN_SUCCESS',
            payload : data
        });
    } catch (error) {
        console.log(error);
        dispatch({
            type : 'LOGIN_FAIL',
            payload : error.response.data.msg
        })
    }
};


export const get_cookie_action = () => async (dispatch) =>{
    try {
        dispatch({type:'GET_COOKIE_REQUEST'});
        const { data } = await api.get_cookie();
        dispatch({
            type : 'GET_COOKIE_LOGGED_IN',
            payload : data
        });
    } catch (error) {
        dispatch({
            type : 'GET_COOKIE_LOGGED_OUT',
            payload : error.response.data
        });
    }
};

export const remove_cookie_action = () => async (dispatch) =>{
    try {
        const { data } = await api.remove_cookie();
        dispatch({
            type : 'REMOVE_COOKIE_SUCCESS',
            payload : data
        });
    } catch (error) {
        dispatch({
            type : 'REMOVE_COOKIE_FAIL',
            payload : error.response.data.success
        });
    }
};

export const empty_login_data = () => async (dispatch) =>{
    dispatch({
        type : 'EMPTY_LOGIN_DATA'
    });
};

export const empty_logout_data = () => async (dispatch) =>{
    dispatch({
        type : 'EMPTY_LOGOUT_DATA'
    });
};

export const make_order_action = (orderData) => async (dispatch) => {
    try {

        dispatch({
            type : 'REQUEST_MAKE_ORDER'
        });

        const { data } = await api.make_order(orderData);

        dispatch({
            type : 'SUCCESS_MAKE_ORDER',
            payload : data
        });

    
    } catch (error) {
        console.log("Error in making an order (action) : ",error);
        dispatch({
            type : 'ERROR_MAKE_ORDER',
            payload :  error.response.data.msg
        });
    }
};

export const get_pending_orders_action = () => async (dispatch) => {
    try {
        dispatch({
            type : 'REQUEST_GET_PENDING_ORDERS'
        });

        const { data } = await api.get_pending_orders();

        dispatch({
            type : 'SUCCESS_GET_PENDING_ORDERS',
            payload : data
        });

    } catch (error) {
        dispatch({
            type : 'ERROR_GET_PENDING_ORDERS',
            payload : error.response.data.msg
        })
    }
};

export const get_users_pending_orders_action = () => async (dispatch) => {
    try {
        
        dispatch({
            type : 'REQUEST_USERS_PENDING_ORDERS'
        });

        const { data } = await api.get_users_pending_orders();

        dispatch({
            type : 'SUCCESS_USERS_PENDING_ORDERS',
            payload : data 
        });

    } catch (error) {
        console.log("Error in getting users pending orders (actions) : ",error.message);
        dispatch({
            type : 'ERROR_USERS_PENDING_ORDERS',
            payload : error.response.data.msg
        })
    }
};

export const update_order_action = (order_id) => async (dispatch) => {
    try {

        const { data } = await api.update_order(order_id);

        dispatch({
            type : 'SUCCESS_UPDATE_ORDER',
            payload : data 
        });

        
    } catch (error) {
        console.log("Error in updating users pending orders (actions) : ",error.message);
        dispatch({
            type : 'ERROR_USERS_PENDING_ORDERS',
            payload : error.response.data.msg
        });
    }
};

export const password_reset_request_action = (email) => async (dispatch) => {
    try {

        dispatch({ type : 'REQUEST_PASSWORD_RESET_REQUEST' });

        const { data } = await api.password_reset_request(email);

        dispatch({
            type : 'SUCCES_PASSWORD_RESET_REQUEST',
            payload : data
        });

    } catch (error) {
        console.log("Error in sending password reset request action: ",error.message);
        dispatch({
            type : 'ERROR_PASSWORD_RESET_REQUEST',
            payload : error.response.data.msg
        });
    }
};

export const password_reset_final_action = (jwt_token) => async (dispatch) => {
    try {

        const { data } = await api.password_reset_final(jwt_token);

        dispatch({
            type : 'SUCCES_PASSWORD_RESET_FINAL',
            payload : data
        });

    } catch (error) {
        console.log("Error in getting password reset final action: ",error.message);
        dispatch({
            type : 'ERROR_PASSWORD_RESET_FINAL',
            payload : error.response.data.msg
        });
    }
};

export const reset_password_action = (resetData) => async (dispatch) => {
    try {

        const { data } = await api.reset_password(resetData);

        dispatch({
            type : 'SUCCESS_RESET_PASSWORD',
            payload : data
        });

    } catch (error) {
        console.log('Error in reseting password action: ',error.message);
        dispatch({
            type : 'ERROR_RESET_PASSWORD',
            payload : error.response.data.msg
        });
    }
}