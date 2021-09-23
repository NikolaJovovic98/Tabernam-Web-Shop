import React, { createContext, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import RegisterScreen from './components/Register/RegisterScreen';
import LoginScreen from './components/Login/LoginScreen';
import HomeScreen from './components/Home/HomeScreen';
import ProtectedRoute from './components/ProtectedRoutes/ProtectedRoute';
import CheckOut from './components/Checkout/CheckOut';
import PendingOrders from './components/Pending Orders/PendingOrders';
import UsersPendingOrders from './components/Users Pending Orders/UsersPendingOrders';
import ProductScreen from './components/Product Screen/ProductScreen';
import PasswordResetScreen from './components/Password Reset Screen/PasswordResetScreen';
import PasswordResetFinal from './components/Password Reset Screen/PasswordResetFinal';
import Footer from './components/Footer/Footer';
import { useSelector } from 'react-redux';


export const GlobalContext = createContext();

const App = () => {

    const [ product_update_context, set_product_update_context ] = useState({});
    const [ shopping_cart_context, set_shopping_cart_context ] = useState(JSON.parse(localStorage.getItem('shopping_cart_ls')) || []);
    const [ user_info, set_user_info] = useState({});
    const [ appliedFilter, setAppliedFilter ] = useState(false);

    const cookie_data = useSelector( state => state.is_user_logged_in );
    const { cookie } = cookie_data;

    React.useEffect(()=>{
        if( typeof cookie !== 'undefined' ){
            if(cookie){
             set_user_info(JSON.parse(localStorage.getItem('user_info')));
            }
        }
    },[cookie]);

    return (
        <GlobalContext.Provider value={{
            product_update_context,
            set_product_update_context,
            shopping_cart_context,
            set_shopping_cart_context,
            user_info,
            set_user_info,
            appliedFilter,
            setAppliedFilter
            }}>

         <BrowserRouter>

            <Switch>
                <ProtectedRoute path='/' exact component={HomeScreen}/>
                <Route path="/register" component={RegisterScreen} />
                <Route path="/login" component={LoginScreen}/>
                <Route path="/password-reset" component={PasswordResetScreen} />
                <Route path="/password-reset-final/:jwt_token" component={PasswordResetFinal} />
                <ProtectedRoute path='/checkout' component={CheckOut}/>
                <ProtectedRoute path='/pending-orders' component={PendingOrders} />
                <ProtectedRoute path='/users-orders' component={UsersPendingOrders} />
                <ProtectedRoute path='/show/:product_id' component={ProductScreen} />
                <Route path="*" component={()=>"404 NOT FOUND"}  />
            </Switch>
            {
                cookie
                ?
                <div style={{marginTop : '50px'}}>
                  <Footer/>
                </div>
                :
                null
            }
         </BrowserRouter>
        </GlobalContext.Provider>
    )
}

export default App;
