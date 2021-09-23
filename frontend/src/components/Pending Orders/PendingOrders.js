import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../Navbar/Navbar';
import { get_pending_orders_action } from '../../actions/users_actions';
import { get_all_products_action } from '../../actions/products_actions';
import { CircularProgress, 
        Card, 
        CardContent, 
        Typography, 
        Paper, 
        Divider, 
        Accordion, 
        AccordionSummary, 
        AccordionDetails, 
        TableContainer, 
        TableBody,
        TableRow,
        TableCell,
        Table } from '@material-ui/core';
import useStyles from './style';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const PendingOrders = ({ user }) => {

    const dispatch = useDispatch();
    const classes = useStyles();

    const pending_orders_data = useSelector(state => state.pending_orders);
    const { pending_orders, pending_orders_error, loading } = pending_orders_data;

    React.useEffect(() => {
        dispatch(get_pending_orders_action());
        dispatch(get_all_products_action());
    }, [dispatch]);


    const DisplayPendingOrders = () => {
        return (
            pending_orders_error
            ?
            <h4>error in getting pending posts</h4>
            :
            pending_orders.map(order => {
                return (
                   <Paper key={order._id} className={classes.one_order} elevation={6}  >
                        <Card variant="elevation">
                            <CardContent className={classes.content}>
                                <Typography className={classes.one_content}>
                                    Total Price : <strong>{order.total_price} &euro;</strong>
                                </Typography>
                                <Divider />
                                <Typography className={classes.one_content}>
                                    Address : <strong>{order.address}</strong>
                                </Typography>
                                <Divider/>
                                <Typography className={classes.one_content}>
                                    Phone Number : <strong>{order.phone_number}</strong>
                                </Typography>
                                <Divider/>
                                <Typography className={classes.one_content}>
                                   Payment Method : <strong>{order.payment_method}</strong>
                                </Typography>
                                <Divider/>
                                <Typography className={classes.one_content}>
                                   Order Date : <strong>{order.order_date}</strong>
                                </Typography>
                                <Divider/>
                                <Typography 
                                    className={classes.one_content} 
                                    style={{
                                        display : 'flex',
                                        flexDirection : 'row',
                                        justifyContent : 'center',
                                        alignItems : 'center',
                                        
                                    }}>
                                   Is Delivered : <RemoveCircleIcon fontSize="large" style={{color:'red',marginLeft:'4px'}}/>
                                </Typography>
                            </CardContent>
                        </Card>
                            <Accordion className={classes.acc} >
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                >
                                    <Typography>Shopping Cart</Typography>
                                </AccordionSummary>
                                <AccordionDetails className={classes.accDet} >
                                 
                                 <TableContainer component={Paper}>
                                     <Table>
                                     <TableBody>
                                        {
                                            order.shopping_cart.map( item => {
                                                return (
                                                <TableRow key={item.product_name}>
                                                    <TableCell align="left">{item.product_name}</TableCell>
                                                    <TableCell align="left">{item.product_price} &euro;</TableCell>
                                                    <TableCell align="right">&times;{item.qty}</TableCell>
                                                </TableRow>
                                                )
                                            })
                                        }
                                     </TableBody>
                                     </Table>
                                 </TableContainer>
                                
                                </AccordionDetails>
                            </Accordion>
                    </Paper> 
                )
            })
        );
    };

    return (
        <>
            <div style={{ marginBottom: "90px" }} >
                <Navbar user={user} />
            </div>
            {
                loading
                    ?
                    <div style={{ width: "10%", margin: "auto" }} >
                        <CircularProgress size="200px" />
                    </div>
                    :
                    (
                        typeof pending_orders !== 'undefined'
                            ?
                            <div className={classes.all_orders} >
                                <DisplayPendingOrders />
                            </div>
                            :
                            null
                    )
            }

        </>
    )
}

export default PendingOrders;
