import React from 'react';
import { Avatar, Button, TextField, Grid , Typography, Container, CircularProgress } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './style';
import { useState } from 'react';
import validator from '../../validation/login_validator';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { login_action, get_cookie_action, empty_login_data, empty_logout_data } from '../../actions/users_actions';
import { Redirect } from 'react-router';

const initial_state = {
    email : "",
    password : ""
}

const LoginScreen = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const [ loginFormData, setLoginFormData ] = useState(initial_state); 
    const [ loginErrors, setLoginErrors ] = useState([]);

    const login_data = useSelector( state => state.login );
    const { loading, user, login_error  } = login_data;

    const cookie_info = useSelector( state => state.is_user_logged_in );
    const { cookie } = cookie_info;

    const reset_password_data = useSelector( state => state.reset_password );
    const { reset_password } = reset_password_data;

    const handleFormChange = (e)=>{
        setLoginFormData({
            ...loginFormData,
            [e.target.name] : e.target.value
        });
    };

    const handleFormSubmit = async(e)=>{
        e.preventDefault();
        const validation_errors = await validator(loginFormData);
        if( validation_errors.length > 0 ) {
            setLoginErrors(validation_errors);
            setTimeout(()=>{
                setLoginErrors([]);
            },3000);
        }else {
            dispatch(login_action(loginFormData));
            setLoginErrors([]);
        }
    };

    React.useEffect(()=>{
      dispatch(empty_logout_data());
      dispatch(get_cookie_action());
      if(user?.username){
        history.push("/");
        dispatch(empty_login_data());
      }
    },[user,history,dispatch]);

    return (
      cookie
      ?
      <Redirect to="/"/>
      :
        <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login 
          </Typography>

          {
              loading 
              ?
              <CircularProgress size="50px" />
              :
              null
          }

          {
            login_error
            ?
            <Alert severity="error" style={{margin:"10px"}} >
            <AlertTitle>Login Error</AlertTitle>
              {login_error}
            </Alert>
            :
            null
          } 

          {
            reset_password
            ?
            <Alert severity="success" style={{margin:"10px"}} >
            <AlertTitle>Password Reseted</AlertTitle>
              Feel free to use new password !
            </Alert>
            :
            null
          }

           {
               loginErrors.length > 0
               ?
               <Alert severity="error" style={{margin:"10px"}} >
               <AlertTitle>Login Error</AlertTitle>
                 {
                     loginErrors.map((err)=>(
                         <Typography key={err} variant="subtitle2" >
                             {err}
                         </Typography>
                     ))
                 }
               </Alert>
               :
               null
           }

          <form className={classes.form} onSubmit={handleFormSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  autoFocus
                  id="email"
                  label="Email Address"
                  name="email"
                  type="email"
                  value={loginFormData.email}
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  inputProps={{
                     minLength: 6
                  }}
                  value={loginFormData.password}
                  onChange={handleFormChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Login
            </Button>
            <Grid container justifyContent="flex-end" >
              <Grid item>
                <Typography 
                  component={Link} 
                  to="/register" 
                  variant="subtitle2"
                  style={{textDecoration:"none",color:"blue"}} > Don't have an account ? Register </Typography>
              </Grid>
            </Grid>
            <Grid container justifyContent="flex-end" >
            <Grid item>
                <Typography 
                  component={Link} 
                  to="/password-reset" 
                  variant="subtitle2"
                  style={{textDecoration:"none",color:"blue"}} > Forgot your password ?</Typography>
              </Grid>
              </Grid> 
          </form>
        </div>  
      </Container>
    )
}

export default LoginScreen;
