import * as api from '../api/api_manager';

export const add_new_product_action = (update,new_product_data) => async(dispatch) =>{
    try {
        dispatch({
            type : 'REQUEST_ADD_NEW_PRODUCT'
        });

        const { data } = update ? await api.update_product(update,new_product_data) : await api.add_new_product(new_product_data);  

        dispatch({
            type : 'SUCCESS_ADD_NEW_PRODUCT',
            payload : data
        });

    } catch (error) {
        console.log("Error in adding new product (actions): ",error);
        dispatch({
            type : 'ERROR_ADD_NEW_PRODUCT',
            payload:error.response.data.msg
        });
    }
};

export const get_all_products_action = (page) => async (dispatch) => {
    try {
        dispatch({
            type : 'REQUEST_GET_ALL_PRODUCTS'
        });

        const { data } = await api.get_all_products(page);

        dispatch({
            type : 'SUCCESS_GET_ALL_PRODUCTS',
            payload : data
        });
    } catch (error) {
        console.log("Error in getting all products (action): ",error);
        dispatch({
            type : 'ERROR_GET_ALL_PRODUCTS',
            payload : error.response.data.msg
        });
    }
};

export const get_all_products_by_category_action = (category) => async (dispatch) => {
    try {

        console.log(category);
        const { data } = await api.get_products_by_category(category);

        
        dispatch({
            type : 'SUCCESS_GET_ALL_PRODUCTS',
            payload : data
        });

    } catch (error) {
        console.log("Error in getting all products by category (action): ",error);
        dispatch({
            type : 'ERROR_GET_ALL_PRODUCTS',
            payload : error.response.data.msg
        });
    }
};

export const get_all_products_by_name_action = (name) => async (dispatch) => {
    try {

        const { data } = await api.get_products_by_name(name);
        
        dispatch({
            type : 'SUCCESS_GET_ALL_PRODUCTS',
            payload : data
        });

    } catch (error) {
        console.log("Error in getting all products by name (action): ",error);
        dispatch({
            type : 'ERROR_GET_ALL_PRODUCTS',
            payload : error.response.data.msg
        });
    }
};

export const delete_product_action = (product_id) => async (dispatch) => {
    try {

        const { data } = await api.delete_product(product_id);

        dispatch({
            type : 'SUCCESS_DELETE_PRODUCT',
            payload : data
        });
    } catch (error) {
        console.log("Error in deleting product ( action ): ",error);
        dispatch({
            type : 'ERROR_DELETE_PRODUCT',
            payload : error.response.data.msg
        });
    }
};

export const get_product_action = (product_id) => async (dispatch) => {
    try {
        dispatch({
            type : 'REQUEST_GET_PRODUCT'
        });

        const { data } = await api.get_product(product_id);

        dispatch({
            type : 'SUCCESS_GET_PRODUCT',
            payload : data
        });

    } catch (error) {
        console.log("Error in getting a product (action): ",error.message);
        dispatch({
            type : 'ERROR_GET_PRODUCT',
            payload : error.response.data.msg
        })
    }
};

export const get_newest_products_action = () => async (dispatch) => {
    try {
        const { data } = await api.get_newest_products();

        dispatch({
            type : 'SUCCESS_GET_NEWEST_PRODUCTS',
            payload : data
        })
    } catch (error) {
        console.log("Error in getting a newest products (action): ",error.message);
        dispatch({
            type : 'ERROR_GET_NEWEST_PRODUCTS',
            payload : error.response.data.msg
        })
    }
};