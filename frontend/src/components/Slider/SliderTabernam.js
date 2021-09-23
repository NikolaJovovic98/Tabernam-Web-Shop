import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import useStyle from './style';
import { Typography, Tooltip } from '@material-ui/core';
import { get_newest_products_action } from '../../actions/products_actions';
import Carousel from "react-elastic-carousel";


const Slider = ({type}) => {

    const classes = useStyle();
    const history = useHistory();
    const dispatch = useDispatch();

    const newest_products_data = useSelector(state => state.newest_products);
    const { newest_products } = newest_products_data;

    const handleProductClick = (id) => {
        history.push(`/show/${id}`);
    };

    React.useEffect(()=>{
        dispatch( get_newest_products_action());
    },[dispatch]);

    return (
        <>
            <div style={{textAlign : 'center',marginBottom:"20px"}}>
                <Typography variant="h5">
                    Newest Products
                </Typography>
            </div>
            <Carousel itemsToShow={2} itemsToScroll={2} style={{width : '95%',margin :'auto'}}>
                {
                    newest_products?.map((product,index)=>{
                        return (
                            <div key={index} className={classes.div}>
                                <div className={classes.price}>
                                    <Typography variant="subtitle1">
                                        {product.product_price} &euro;
                                    </Typography>
                                </div>
                                <Tooltip title={`View Product ${product.product_name}`} placement="bottom">
                                <img 
                                    src={product.product_image} 
                                    alt="product" 
                                    className={classes.img}
                                    onClick={()=>{
                                        handleProductClick(product._id);
                                    }} />
                                </Tooltip>
                            </div>
                        )
                    })
                }
            </Carousel>
        </>
    )
}

export default Slider


/*

 <div  style={{
            display : 'flex',
            justifyContent : 'center',
            textAlign : "center",
            marginBottom : "60px"
        }}>
        <Typography variant="h5">
            Newest Products
        </Typography>
        </div>
        <div className={classes.slider}>
            <ArrowBackIcon className={classes.left_arrow} onClick={prevSlide}/>
            <ArrowForwardIcon className={classes.right_arrow} onClick={nextSlide}/>
            {
                newest_products?.map((product,index)=>{
                    return ( 
                            <Tooltip title="View Product" placement="top" key={index}>
                            <img 
                                src={product.product_image} 
                                alt="product" 
                                onClick={()=>{handleProductClick(product._id)}}
                                className={ index === current ? classes.image : classes.disable } />
                            </Tooltip>
                    ) 
                })
            }
        </div>
*/