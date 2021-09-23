
export const useCartHook = () => {
    return {
        handleAddToCart : (product_id,set_shopping_cart_context_function) => add_to_cart(product_id,set_shopping_cart_context_function),
        handleRemoveFromCart : (product_id,set_shopping_cart_context_function) => remove_from_cart(product_id,set_shopping_cart_context_function)
    }
};

const add_to_cart = (product_id,set_shopping_cart_context_function) => {
    const arr = JSON.parse(localStorage.getItem('shopping_cart_ls')) || []; // uzmi local storage [arr] ili stavi prazni []
    const prod_obj = {
        id: product_id,
        qty: 1
    };
    arr.push(prod_obj); // dodaj product id tako da bude ili [...,product_id] ili [product_id]
    localStorage.setItem('shopping_cart_ls', JSON.stringify(arr));  // updejtuj local storage sa tim arr
    set_shopping_cart_context_function(arr); // stavi context da je arr
};

const remove_from_cart = (product_id,set_shopping_cart_context_function) => {
    const arr = JSON.parse(localStorage.getItem('shopping_cart_ls')) || [];
    const update_arr = arr.filter( p => p.id !== product_id );
    localStorage.setItem('shopping_cart_ls',JSON.stringify(update_arr));
    set_shopping_cart_context_function(update_arr);
}