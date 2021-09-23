
export const add_new_product_reducer = ( new_product = {} , action ) =>{
    switch(action.type){
        case 'REQUEST_ADD_NEW_PRODUCT' :
            return {
                loading : true
            }
        case 'SUCCESS_ADD_NEW_PRODUCT' :
            return {
                loading : false,
                new_product : action.payload
            }
        case 'ERROR_ADD_NEW_PRODUCT' :
            return {
                loading : false,
                new_product_error : action.payload
            }
        default :
            return new_product;
    }
};

export const get_all_products_reducer = ( all_products = {} , action ) => {
    switch(action.type){
        case 'REQUEST_GET_ALL_PRODUCTS' :
            return {
                loading : true
            }
        case 'SUCCESS_GET_ALL_PRODUCTS' :
            return {
                loading : false,
                all_products : {...action.payload}
            }
        case 'ERROR_GET_ALL_PRODUCTS' :
            return {
                loading : false,
                all_products_error : action.payload
            }
        default :
            return all_products;
    }
};

export const delete_product_reducer = ( deleted_product = {} , action ) => {
    switch ( action.type ){
        case 'SUCCESS_DELETE_PRODUCT' :
            return {
                deleted_product : action.payload
            }
        case 'ERROR_DELETE_PRODUCT' :
            return {
                deleted_product_error : action.payload
            }
        default : 
            return deleted_product;
    }
};

export const get_product_reducer = ( show_product = {} , action ) => {
    switch(action.type) {
        case 'REQUEST_GET_PRODUCT':
            return {
                loading : true
            }
        case 'SUCCESS_GET_PRODUCT':
            return {
                loading : false,
                show_product : action.payload
            }
        case 'ERROR_GET_PRODUCT':
            return {
                loading : false,
                show_product_error : action.payload
            }
        default : 
            return show_product;
    }
};

export const get_newest_product_reducer = ( newest_products = [] , action ) => {
    switch(action.type) {
        case 'SUCCESS_GET_NEWEST_PRODUCTS':
            return {
                newest_products : action.payload
            }
        case 'ERROR_GET_NEWEST_PRODUCTS':
            return {
                newest_products_error : action.payload
            }
        default : 
            return newest_products;
    }
};