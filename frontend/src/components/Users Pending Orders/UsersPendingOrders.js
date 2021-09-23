import React from 'react'
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
    Table,
    Tooltip } from '@material-ui/core';
import Navbar from '../Navbar/Navbar';
import useStyles from './style';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { useDispatch, useSelector } from 'react-redux';
import { get_users_pending_orders_action,update_order_action  } from '../../actions/users_actions';
import { get_all_products_action } from '../../actions/products_actions';


const UsersPendingOrders = ({user}) => {


    const dispatch = useDispatch();
    const classes = useStyles();

    const users_pending_orders_data = useSelector( state => state.users_pending_orders );
    const { loading, users_orders, users_orders_error } = users_pending_orders_data;

    React.useEffect(()=>{
        dispatch(get_all_products_action());
        dispatch(get_users_pending_orders_action());
    },[dispatch]);

    const handleUpdateOrder = (order_id) => {
        dispatch(update_order_action({order_id}));
    };

    const Delivered = ({order_id}) => {
       return <>
            <Tooltip title="Click To Change" placement="bottom"> 
            <CheckCircleIcon 
             fontSize="large" 
             style={{color:'green',marginLeft:'4px',cursor:'pointer'}}
             onClick={()=>{ handleUpdateOrder(order_id) }}
             />
            </Tooltip>
            <Typography variant="caption" >delivered</Typography>
        </>
    }

    const Undelivered = ({order_id}) => {
        return <>
              <Tooltip title="Click To Change" placement="bottom"> 
                <RemoveCircleIcon 
                    fontSize="large" 
                    style={{color:'red',marginLeft:'4px',cursor:'pointer'}}
                    onClick={()=>{ handleUpdateOrder(order_id) }}
                    />
              </Tooltip>
             <Typography variant="caption" >undelivered</Typography>
         </>
     }
    
    const DisplayPendingOrders = () => {
        return (
            users_orders_error
            ?
            <h4>error in getting pending posts</h4>
            :
            users_orders.map(order => {
                return (
                   <Paper key={order._id} className={classes.one_order} elevation={6}  >
                        <Card variant="elevation">
                            <CardContent className={classes.content}>
                                <Typography 
                                    className={classes.one_content}
                                    style={{
                                        backgroundColor : 'rgb(128, 255, 128)',
                                        borderRadius : '10px',
                                        fontStyle : 'italic',
                                        marginBottom : '5px'
                                    }}>
                                    {order.username}
                                </Typography>
                                <Divider />
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
                                   Delivery Status :
                                   {
                                       order.is_delivered
                                       ?
                                       <Delivered order_id = { order._id } />
                                       :
                                       <Undelivered order_id = {order._id}/>
                                   }
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
                        typeof users_orders !== 'undefined'
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

export default UsersPendingOrders;
