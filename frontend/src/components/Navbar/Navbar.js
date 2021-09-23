import React, {useContext, useState} from 'react';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { Paper, Tooltip } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useDispatch, useSelector } from 'react-redux';
import { remove_cookie_action, get_cookie_action,empty_login_data } from '../../actions/users_actions';
import { Button, Menu, MenuItem } from '@material-ui/core';
import { GlobalContext } from '../../App';


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    height : "10px"
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  inputRoot: {
    color: 'inherit',
  },
  test : {
      display : "flex",
      flexDirection : "row",
  },
  logo_title : {
    display : "flex",
    flexDirection : "row",
    justifyContent : "flex-start",
    alignItems : "center",   
},
  logo : {
    '&:hover': {
      transform: "rotate(270deg)",
    },
    width : "100%",
    transition: "transform .7s ease-in-out",
    cursor : "pointer"
  },
  sc_icon_button : {
    marginRight : "20px",
    position : "relative"
  },
  dropdown : {
    position : "absolute",
    width : "200px",
    top : "120%",
    right : "-220%",
    padding : "20px",
    display : "flex",
    flexDirection : "column",
    alignItems : "center",
    overflowX : "hidden",
    overflowY : "auto",
    maxHeight : "500px",
  },
  dropdown_item : {
    borderBottom : "1px solid gray",
    padding : "5px",
    margin : "10px",
    width : "100%",
    textAlign : "center"
  },
  badge : {
    cursor : "pointer",
    padding : "5px"
  },
  dropdown_section :{
    display : "flex",
    flexDirection : "row",
    justifyContent: "center",
    alignItems : "center",
    width : "100%",
  },
  dropdown_item_remove : {
    '&:hover' : {
      color : "orangered"
    },
    color : "orange",
    cursor : "pointer",
    transition : "0.5s",
  },
  total_price : {
    marginRight : "20px"
  },
  add_remove : {
    width : "50%",
    margin : "auto",
    marginTop : "10px",
    display : "flex",
    flexDirection : "row",
    justifyContent: "space-evenly",
  }, 
  buttons : {
    display : "grid",
    gridTemplateColumns : "3fr 1fr",
    gap : "10px"
  }
}));

export default function Navbar({user}) {

  const {shopping_cart_context,set_shopping_cart_context,set_user_info} = useContext(GlobalContext);
  const sc = shopping_cart_context.length !== 0 ? true : false ; // da li je pun ili prazan

  const [ open, setOpen ] = useState(false);
  const [ anchorEl, setAnchorEl ] = useState(null);

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const products = useSelector( state => state.all_products );
  const { all_products, loading } = products;

  const logout = useSelector( state => state.log_out );
  const { remove_cookie } = logout;

  const shopping_cart = []; 
  let total_price = 0.0;

  // filtriramo all_products koji je niz objekata producta sa imenom cijenom id-jem
  // uslov filtera jeste da shopping_cart_context koji je niz id-jeva proizvoda sadrzi id od
  // objekta proizvoda kroz koji se iterira
  // const shopping_cart = all_products.filter( prod => shopping_cart_context.includes(prod._id) );

  if(typeof all_products?.products !== 'undefined' && !loading ){


    /* kraci nacin
    const updatedCart = shopping_cart.map((item) => {
      const moreProductInfo = all_products.filter((product) => product.id === item.id)[0];
      return {
        ...item,
        ...moreProductInfo
      }
    })
    */

    for( let one_product of all_products?.products ) {
      for( let scc_item of shopping_cart_context ){
        if(one_product._id === scc_item.id){
          let it = {
            ...one_product,
            qty : scc_item.qty
          }
          shopping_cart.push(it);
        }
      }
    }

    total_price = shopping_cart.reduce((prev,curr)=> {
      return prev + curr.product_price * curr.qty;
    },0);
    total_price = total_price.toFixed(2);

  }

  const handleLogout = () => {
    dispatch(remove_cookie_action());
    dispatch(empty_login_data());
    set_user_info({});
  };

  if( remove_cookie ){
    dispatch(get_cookie_action());
  }

  const openDropdown = () => {
    setOpen(!open);
  }

  const handleRemoveItem = (product_id) => {
    const arr = JSON.parse(localStorage.getItem('shopping_cart_ls')) || [] ;
    const update_arr = arr.filter( p => p.id !== product_id );
    localStorage.setItem('shopping_cart_ls',JSON.stringify(update_arr));
    set_shopping_cart_context(update_arr);
  };

  const goToCheckout = () => {
    history.push({
      pathname : "/checkout",
      state : {
        shopping_cart,
        total_price,
      }
    });
  };

  const handleAddOneItem = (product_id) => {
    const arr = JSON.parse(localStorage.getItem('shopping_cart_ls')) || [];
    // mapiramo kroz arr i radimo sljedece: ukoliko p.id je jednak product_id onda 
    // vracemo objekat sa svim atributima ...p ali atribut qty mijenjamo jer dodajemo 1
    // u suprotnom samo vracemo objekat p
    const update_arr = arr.map( p => p.id === product_id ? { ...p, qty : p.qty + 1 } : p );
    localStorage.setItem('shopping_cart_ls',JSON.stringify(update_arr));
    set_shopping_cart_context(update_arr);
  };

  const handleRemoveOneItem = (product_id) => {
    const arr = JSON.parse(localStorage.getItem('shopping_cart_ls')) || [];
    const index = arr.findIndex( p => p.id === product_id );
    if( arr[index].qty === 1 ) {
      handleRemoveItem(product_id);
    }else {
    const update_arr = arr.map( p => p.id === product_id ? { ...p, qty : p.qty - 1 } : p );
    localStorage.setItem('shopping_cart_ls',JSON.stringify(update_arr));
    set_shopping_cart_context(update_arr);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (e) => {
     setAnchorEl(e.currentTarget);
  }

  const emptyShoppingCart = () => {
    const choice = window.confirm("Are you sure you want to empty your shopping cart ?");
    choice ? empty() : alert("Ok");
  };

  const empty = () => {
    localStorage.removeItem('shopping_cart_ls');
    set_shopping_cart_context([]);
  };

  const DropDown = () => {

    return (
      <Paper className={classes.dropdown} elevation={3}  variant="outlined" >
        <div className={classes.buttons} >
           <Button 
              color="primary" 
              variant="contained"
              disabled={!sc}
              onClick={goToCheckout}>
                 Checkout
            </Button>
            <Button 
              color="secondary" 
              variant="contained"
              disabled={!sc}
              onClick={emptyShoppingCart}>
                 Empty
            </Button>
          </div>
               {  sc
                  ?
                  shopping_cart.map( product => {
                    return (
                      <div className={classes.dropdown_item} key={product._id}>
                        <div className={classes.dropdown_section} >
                          <div>
                            <img src={product.product_image} style={{width:"80%"}} alt="Product" />
                          </div>
                          <div >
                          <Tooltip title="Remove Product" placement="right"> 
                            <HighlightOffIcon onClick={()=>{
                              handleRemoveItem(product._id);
                            }} className={classes.dropdown_item_remove} />
                          </Tooltip>
                          </div>
                        </div>
                      <Typography variant="subtitle1" >
                          {product.qty} &times; { product.product_name }
                      </Typography>
                      <div className={classes.add_remove} >
                            <div>
                            <Tooltip title="Add One" placement="left">  
                            <AddBoxIcon 
                              fontSize="large"  
                              style={{color:"green",cursor:"pointer"}}
                              onClick={()=>{
                                handleAddOneItem(product._id);
                              }}/>
                            </Tooltip>
                            </div>
                            <div>
                            <Tooltip title="Remove One" placement="right">  
                            <RemoveCircleIcon 
                              fontSize="large" 
                              style={{color:"red",cursor:"pointer"}}
                              onClick={()=>{
                                handleRemoveOneItem(product._id);
                              }}/>
                            </Tooltip>
                            </div>
                      </div>
                    </div>
                    )
                  })
                  :
                  <Typography variant="subtitle2" style={{margin:"20px"}} >
                    No products
                  </Typography>
               } 
        </Paper>
    )
  }

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" style={{padding:"10px",borderRadius:"0px"}} >
        <Toolbar disableGutters={true} >
         <div className={classes.logo_title} > 
           <div style={{width:"15%",marginRight:"5px"}}  >
            <img className={classes.logo} src="/images/logo.png" alt="Test" onClick={()=>{history.push("/")}} />
           </div>
           <div >
             <Typography variant="h5">Tabernam Online Store</Typography>
           </div>
          </div>
          <div className={classes.grow} />
           <div className={classes.total_price} >
           <Typography>
               Total Price : {total_price} &euro;
             </Typography>
           </div>
           <div className={classes.sc_icon_button} >
           <Tooltip title="Shopping Cart" placement="left"> 
              <Badge className={classes.badge} badgeContent={shopping_cart_context.length} showZero color="secondary" onClick={openDropdown}>
                <ShoppingCartIcon  />
              </Badge>
           </Tooltip>
               {
                open
                ?
                 <DropDown/>
                :
                null
              }
            </div>

              <Typography onClick={handleClick} style={{cursor:'pointer'}} >
                {user.username} { user.is_admin ? "admin" : null } 
              </Typography>

                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                   >
                    <MenuItem onClick={()=>{ history.push("/pending-orders"); }}>Your Orders</MenuItem>
                    <MenuItem onClick={()=>{
                      user.is_admin
                      ?
                      history.push("/users-orders")
                      :
                      history.push("/pending-orders");
                    }}>{user.is_admin ? 'Users Orders' : 'Something Else'}</MenuItem>
                  </Menu>

              <Button 
                  color="secondary" 
                  variant="contained"
                  onClick={handleLogout} 
                  style={{
                    borderRadius:"10px",
                    marginLeft : "10px"
                    }}>
              <Badge>
                <Typography style={{marginRight:"5px"}} variant="subtitle2" >Logout</Typography>
                <ExitToAppIcon  />
              </Badge>
            </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}