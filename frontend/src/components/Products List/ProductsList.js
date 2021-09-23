import React from 'react';
import useStyles from './style';
import { Grid } from '@material-ui/core';
import Product from '../Product/Product';
import { CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { get_all_products_action } from '../../actions/products_actions';
import { useDispatch } from 'react-redux';
import { Pagination } from '@material-ui/lab';
import { useHistory } from 'react-router';

const ProductsList = ({user}) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const products = useSelector(state => state.all_products);
    const { loading, all_products } = products;

    const added_new_product = useSelector( state => state.add_new_product );
    const { new_product } = added_new_product;

    const deleted_existing_product = useSelector( state => state.delete_product );
    const { deleted_product } = deleted_existing_product;
    
    // popraviti ovo ispod new || deleted jer treba u redux samo da se vrati sa bekenda
    // niz novi a ne da se provjerava ovako 

    React.useEffect(()=>{
        if(new_product || deleted_product) dispatch(get_all_products_action());
    },[new_product,deleted_product,dispatch]);

    return (
                loading
                    ?
                    <div style={{width:"10%",margin:"auto"}} >
                    <CircularProgress size="200px" />
                    </div>
                    :
                    <>
                     <div className={classes.div_paginate}>
                      <Pagination 
                        count={all_products?.numberOfPages} 
                        color="primary"
                        shape="rounded"
                        page={JSON.parse(localStorage.getItem('current_page')) || 1}
                        onChange={(e,value)=>{
                            dispatch(get_all_products_action(value)); 
                            history.push(`?page=${value}`);
                            localStorage.setItem('current_page',JSON.stringify(value));
                        }}/>
                        
                     </div>
                    <Grid className={classes.big_grid} alignContent="stretch" container spacing={3} >
                        {
                            typeof all_products?.products !=="undefined"  && all_products?.products.length !==0
                            ?
                            all_products?.products.map((one_product) => {
                                return (
                                  <Grid item key={one_product._id} >
                                    <Product product={one_product} user={user} />
                                  </Grid>    
                                )
                            })
                            :
                            <h2>No products yet...</h2>
                        }
                    </Grid>
                    </>
    )
}

export default ProductsList;

