import React, { useContext } from 'react';
import Navbar from '../Navbar/Navbar';
import { useParams } from 'react-router';
import { CircularProgress, Paper, Typography, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { get_all_products_action, get_product_action } from '../../actions/products_actions';
import useStyles from './style';
import { GlobalContext } from '../../App';
import { useCartHook } from '../../helper';

const ProductScreen = ({ user }) => {

    const { shopping_cart_context, set_shopping_cart_context } = useContext(GlobalContext);

    const { handleAddToCart, handleRemoveFromCart } = useCartHook();

    const dispatch = useDispatch();
    const classes = useStyles();
    const { product_id } = useParams();

    const product_data = useSelector(state => state.get_product);
    const { loading, show_product, show_product_error } = product_data;

    React.useEffect(() => {
        dispatch(get_all_products_action());
        dispatch(get_product_action(product_id));
    }, [dispatch, product_id]);

    const findInCart = (id, shopping_cart) => {
        return shopping_cart.find(e => e.id === id) ? true : false;
    };

    const ShowData = () => {
        return (
            <div className={classes.big_div} >

                <Paper elevation={5} >
                    <div className={classes.product_info_one} >

                        <div className={classes.product_info_one_image} >
                            <img src={show_product.product_image} style={{ width: "100%" }} alt="Product" />
                        </div>

                        <div className={classes.product_info_one_info} >
                            <div style={{ marginBottom: "40px", width: "100%" }} >
                                <Typography variant='h4' >
                                    {show_product.product_name}
                                </Typography>
                                <Typography variant='subtitle1' >
                                    Some product description.
                                </Typography>
                            </div>
                            <div style={{ width: "100%" }} >
                                <Typography variant="h6" >
                                    {show_product.product_price}&euro; / piece
                                </Typography>
                                {
                                    !findInCart(show_product._id, shopping_cart_context)
                                        ?
                                        <Button
                                            type="submit"
                                            style={{ width: "70%" }}
                                            variant="contained"
                                            color="primary"
                                            onClick={()=>{
                                                handleAddToCart(show_product._id,set_shopping_cart_context);
                                            }}
                                        >
                                            Add To Cart
                                        </Button>
                                        :
                                        <Button
                                            type="submit"
                                            style={{ width: "70%" }}
                                            variant="contained"
                                            color="secondary"
                                            onClick={()=>{
                                                handleRemoveFromCart(show_product._id,set_shopping_cart_context);
                                            }}
                                        >
                                            Remove From Cart
                                        </Button>

                                }
                            </div>
                        </div>
                    </div>
                </Paper>

                <Paper elevation={5} >
                    <div className={classes.product_info_two} >
                        <div className={classes.one_data}>
                            <img src="/images/energy.png" alt="Energy" />
                            <Typography> Energy (kJ/kcal) </Typography>
                            <Typography> <strong>{show_product.product_info_energy}</strong> </Typography>
                        </div>

                        <div className={classes.one_data}>
                            <img src="/images/fats.png" alt="Fats" />
                            <Typography> Fats (g) </Typography>
                            <Typography> <strong>{show_product.product_info_fats}</strong> </Typography>
                        </div>

                        <div className={classes.one_data}>
                            <img src="/images/saturated.png" alt="Saturated Fats" />
                            <Typography> Saturated fats (g) </Typography>
                            <Typography> <strong>{show_product.product_info_saturated_fats}</strong> </Typography>
                        </div>

                        <div className={classes.one_data}>
                            <img src="/images/proteins.png" alt="Proteins" />
                            <Typography> Proteins (g) </Typography>
                            <Typography> <strong>{show_product.product_info_proteins}</strong> </Typography>
                        </div>

                        <div className={classes.one_data}>
                            <img src="/images/carbs.png" alt="Carbs" />
                            <Typography> Carbs  </Typography>
                            <Typography> <strong>{show_product.product_info_carbs}</strong> </Typography>
                        </div>

                        <div className={classes.one_data}>
                            <img src="/images/sugar.png" alt="Sugar" />
                            <Typography> Sugar (g) </Typography>
                            <Typography> <strong>{show_product.product_info_sugar}</strong> </Typography>
                        </div>

                        <div className={classes.one_data}>
                            <img src="/images/fibers.png" alt="Fibers" />
                            <Typography> Fibers (g) </Typography>
                            <Typography> <strong>{show_product.product_info_fibers}</strong> </Typography>
                        </div>

                        <div className={classes.one_data}>
                            <img src="/images/salt.png" alt="Salt" />
                            <Typography> Salt (g) </Typography>
                            <Typography> <strong>{show_product.product_info_salt}</strong> </Typography>
                        </div>
                    </div>
                </Paper>

            </div>
        )
    };

    const ShowProduct = () => {
        return <>
            {
                show_product_error
                    ?
                    <h4>error: {show_product_error}</h4>
                    :
                    (
                        <ShowData />
                    )
            }
        </>
    };

    return (
        <>
            <div style={{ marginBottom: "90px" }} >
                <Navbar user={user} />
            </div>
            {
                loading
                    ?
                    <CircularProgress size="200px" />
                    :
                    (
                        typeof show_product !== 'undefined'
                            ?
                            <ShowProduct />
                            :
                            null
                    )
            }
        </>
    )
}

export default ProductScreen;
