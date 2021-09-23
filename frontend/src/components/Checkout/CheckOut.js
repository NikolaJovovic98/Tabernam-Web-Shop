import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Navbar from '../Navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import {get_all_products_action } from '../../actions/products_actions';
import { Typography, Checkbox, Grid, TextField, Button, CircularProgress } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { make_order_action } from '../../actions/users_actions';
import { Redirect } from 'react-router-dom';


const useStyles = makeStyles({
   
    table_div : {
        width : "50%",
        margin : "auto",
    },
    section : {
        margin : "auto",
        marginTop : "30px",
        width : "60%",
    },
    paper : {
        padding : "20px",
        display : "flex",
        flexDirection : "row",
        alignItems : "center",
        
    },
    form : {
        padding : "10px",
        borderRadius : "10px",
        width : "60%",
        margin : "auto",
        marginTop : "20px"
    }
});

const CheckOut = ({user}) => {

    const location = useLocation();
 
    const table_shopping_cart = location.state?.shopping_cart || [];

    table_shopping_cart.forEach( item => 
        delete item.product_image && 
        delete item.admin_who_added &&
        delete item.createdAt && 
        delete item.updatedAt && 
        delete item.__v );
    const table_total_price = location.state?.total_price;
    const date = new Date();
    const table_date = date.toLocaleString();

    const [ checkBoxState, setCheckBoxState ] = React.useState(false);
    const order_data = useSelector( state => state.make_order );
    const { loading, order, order_error } = order_data;

    const [ orderData, setOrderData ] = React.useState({
        user_id : user.id,
        username : user.username,
        shopping_cart : table_shopping_cart,
        total_price : table_total_price,
        order_date : table_date,
        address : "",
        phone_number : "",
        payment_method : "",
    });

    const classes = useStyles();
    const dispatch = useDispatch();

    React.useEffect(()=>{
        dispatch(get_all_products_action());
    },[dispatch]);

    if( typeof location.state === 'undefined' ) {
        return (
            <Redirect to="/" />
        );
    }

    const handleCheckBox = () => {
        setCheckBoxState(!checkBoxState);
    }

    const handleFormChange = (e) => {
        setOrderData({
            ...orderData,
            [ e.target.name ] : e.target.value
        })
    };

    const handleOrderSubmit = (e) => {
        e.preventDefault();
        if(!checkBoxState){
            alert("Must accept all terms.");
        }else {
            dispatch(make_order_action(orderData));
        }
    }

    return (
        <>
            <div style={{ marginBottom: "90px" }} >
                <Navbar user={user} />
            </div>
            <div className={classes.table_div} >
                <Typography variant="h5" style={{margin:"20px"}} > 
                    Your checkout bill
                </Typography>
                <Paper elevation={4} >
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="caption table">
                        <caption style={{fontWeight:"bold",fontSize:"18px",color:"green"}}>
                            Your total price will be {table_total_price} &euro; 
                        </caption>
                        <caption>
                        {table_date}
                        </caption>
                        <TableHead>
                            <TableRow>
                                <TableCell>Product Name</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="right">Quantity</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {table_shopping_cart.map((product) => (
                                <TableRow key={product.product_name}>
                                    <TableCell component="th" scope="row">
                                        {product.product_name}
                                    </TableCell>
                                    <TableCell align="right">{product.product_price}</TableCell>
                                    <TableCell align="right"> &times; {product.qty}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                </Paper>
            </div>

            <div className={classes.form}>
                <Typography variant="h5" style={{textAlign:"center",margin:"10px"}}>
                    Order Information
                </Typography>
                 {
                     loading 
                     ?
                     <CircularProgress size="50px" />
                     :
                     null
                 }
                 {
                     order
                     ?
                     <Alert severity="success" style={{margin:"10px"}} >
                    <AlertTitle>Order Placed!</AlertTitle>
                     Your order was successfully placed!
                    </Alert>
                     :
                     null
                 }
                  {
                      order_error
                      ?
                      <Alert severity="error" style={{margin:"10px"}} >
                    <AlertTitle>Order Error</AlertTitle>
                    {order_error}
                    </Alert>
                    :
                    null
                  }
                <form onSubmit={handleOrderSubmit}>
                <Grid container spacing={3}>
                    
                    <Grid item xs={8} style={{margin:'auto'}}>
                      <TextField
                        variant="filled"
                        required
                        fullWidth
                        id="address"
                        label="Address"
                        name="address"
                        type="text"
                        value={orderData.address}
                        onChange={handleFormChange}
                       />
                    </Grid>
                    
                    <Grid item xs={8} style={{margin:'auto'}}>
                      <TextField
                        variant="filled"
                        required
                        fullWidth
                        id="phone_number"
                        label="Phone Number"
                        name="phone_number"
                        type="text"
                        value={orderData.phone_number}
                        onChange={handleFormChange}
                       />
                    </Grid>
                     
                    <Grid item xs={8} style={{margin:'auto'}}>
                      <TextField
                        variant="filled"
                        required
                        fullWidth
                        id="payment_method"
                        label="Payment Method"
                        name="payment_method"
                        type="text"
                        value={orderData.payment_method}
                        onChange={handleFormChange}
                       />
                    </Grid>
                    <Grid item xs={6} style={{margin:'auto',display:'flex',justifyContent:"center"}} >
                    <Button
                        type="submit"
                        style= {{width:"55%",margin:'auto'}}
                        variant="contained"
                        color="primary"
                        >
                        Confirm Order
                    </Button>
                    </Grid>
                </Grid>
                </form>
            </div>


            <div className={classes.section} >
                <Paper elevation={4} className={classes.paper} >
                    <div>
                    <Checkbox
                        checked={checkBoxState}
                        onClick={handleCheckBox}
                    />
                    </div>
                   <div>
                    <Typography>
                        By filling the checkbox you agree with our terms and conditions. 
                        Your data is only being stored inside of local storage and cookies. 
                        For further safety information, you can contact our admin team. 
                        We wish you good shopping <strong>{user.username}</strong> !
                    </Typography>
                    </div>
                </Paper>
            </div>
        </>
    )
}

export default CheckOut;
