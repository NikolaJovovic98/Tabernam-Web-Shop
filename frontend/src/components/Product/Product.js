import React, { useContext } from 'react';
import { Card, Typography, CardContent, Button, Tooltip } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import useStyles from './style';
import { delete_product_action, get_all_products_by_category_action } from '../../actions/products_actions';
import { useDispatch } from 'react-redux';
import { GlobalContext } from '../../App';
import { useCartHook } from '../../helper';

const Product = ({product,user}) => {

    const dispatch = useDispatch();
    const classes = useStyles();
    const {set_product_update_context} = useContext(GlobalContext);
    const {shopping_cart_context,set_shopping_cart_context,setAppliedFilter} = useContext(GlobalContext);
    const { handleAddToCart, handleRemoveFromCart } = useCartHook(); 

    const handleDeleteProduct = (id) =>{
        dispatch(delete_product_action(id));
    };

    const handleUpdateProduct = () => {
        
      set_product_update_context({...product});

       window.scrollTo({
         top : 0,
         behavior : "smooth"
       });
    };

    const findInCart = ( id, shopping_cart ) => {
        return shopping_cart.find(e => e.id === id) ? true : false;
    };

    const handleCategoryClick = () => {
        dispatch(get_all_products_by_category_action(product.product_category.name));
        setAppliedFilter(true);
    } 

    const EditandDelete = () => {
        return (
            <>
       <Tooltip title="Edit Product" placement="bottom"> 
        <Button 
        variant="contained"
        style={{backgroundColor:"rgba(94, 214, 94, 0.788)"}}
        onClick={handleUpdateProduct}
        > 
            <EditIcon fontSize="small"  />
        </Button>
        </Tooltip>  
        <Tooltip title="Delete Product" placement="bottom">
        <Button 
        variant="contained"
        style={{backgroundColor:"rgb(247, 65, 65)"}}
        onClick={()=>{
            handleDeleteProduct(product._id);
        }}
        > 
            <DeleteIcon fontSize="small" style={{color:"white"}}  />
        </Button>
        </Tooltip>
        </>
      )
    }

    return (
        <Card className={classes.card} >
            <Tooltip title="Show Category" placement="right">
            <Typography variant="caption" className={classes.category} onClick={handleCategoryClick}>
                { product.product_category.name } 
            </Typography>
            </Tooltip> 
        <div className={classes.div}>
        <Tooltip title="Show Product Info" placement="top">
            <a href={`/show/${product._id}`}>   
            <img src={product.product_image} alt="Product" className={classes.test} />
            </a>
        </Tooltip> 
        </div>
                 <Typography className={classes.title} variant="h6" gutterBottom >
                   {product.product_name}
                </Typography>
        <CardContent>
                <Typography variant="h5" color="primary" gutterBottom >
                    {product.product_price} &euro;
                </Typography>
        </CardContent>
        <div className={classes.cardActions} >
                {
                    !findInCart(product._id,shopping_cart_context)
                    ?
                    <Tooltip title="Add To Cart" placement="left">
                        <Button 
                        variant="contained"
                        color="primary"
                        onClick={()=>{
                            handleAddToCart(product._id,set_shopping_cart_context);
                        }}>
                        <AddShoppingCartIcon fontSize="small"/>
                        </Button>
                    </Tooltip>
                    :
                    <Tooltip title="Remove From Cart" placement="left">
                        <Button 
                        variant="contained"
                        color="secondary"
                        onClick={()=>{
                            handleRemoveFromCart(product._id,set_shopping_cart_context);
                        }}>
                        <RemoveShoppingCartIcon fontSize="small"/>
                        </Button>
                    </Tooltip>
                }
                
                 {
                     user?.is_admin && user.id === product.admin_who_added
                     ?
                     <EditandDelete/>
                     :
                     null
                 }
                   
        </div>
    </Card>
    )
}

export default Product;