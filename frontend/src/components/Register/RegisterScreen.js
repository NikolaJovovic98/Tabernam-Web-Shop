import React from 'react';
import { Avatar, Button, TextField, Grid , Typography, Container, CircularProgress  } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './style';
import { useState } from 'react';
import validator from '../../validation/register_validator';
import { useDispatch, useSelector } from 'react-redux'
import { register_action } from '../../actions/users_actions';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const initialState = {
    username : "",
    email : "",
    password : "",
    confirmPassword : ""
}

let validation_errors = [];

const RegisterScreen = () => {

    const query = useQuery();
    const classes = useStyles();
    const dispatch = useDispatch();

    const email_verify = query.get('verify');

    const [ registerFormData, setRegisterFormData ] = useState(initialState);
    const [ formErrors, setFormErrors ] = useState([]);

    const user_register = useSelector( state => state.register );
    const { loading, user, register_error } = user_register;
  
    const handleFormChange = (e) =>{
        setRegisterFormData({
            ...registerFormData,
            [e.target.name] : e.target.value
        });
    };

    const handleFormSubmit = async (e) =>{
        e.preventDefault();
        validation_errors = await validator(registerFormData);
        if(validation_errors.length > 0) {
            setFormErrors(validation_errors);
            setTimeout(()=>{
                setFormErrors([]);
            },3000);
        }else {
            dispatch(register_action(registerFormData));
            setFormErrors([]);
            setRegisterFormData(initialState);
        }
    };

    function useQuery() {
      return new URLSearchParams(useLocation().search);
    }

    return (
        <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register 
          </Typography>

          {
            email_verify 
            ?
            <Alert severity={email_verify} style={{margin:"10px"}} >
            <AlertTitle>Email Verification : {email_verify}</AlertTitle>
              <Typography variant="subtitle2" >
                {
                email_verify === 'success' ? 'Email verified, you can now login' : 'Could not verify email'
                }
              </Typography>
            </Alert>
            :
            null
          }
          {
            user
            ?
            <Alert severity="success" style={{margin:"10px"}} >
            <AlertTitle>Successfully Registered</AlertTitle>
              <Typography variant="subtitle2" >
                Verification link has been sent
                to your email account
              </Typography>
            </Alert>
           :
           null
          }
          {
              formErrors.length > 0
              ?
              <Alert severity="error" style={{margin:"10px"}} >
              <AlertTitle>Register Error</AlertTitle>
                {
                    formErrors.map((err)=>(
                        <Typography variant="subtitle2" key={err} >
                            {err}
                        </Typography>
                    ))
                }
             </Alert>
             :
             null
          }
          {
            loading
            ?
            <CircularProgress size="50px" />
            :
            null
          }
          {
            register_error
            ?
            <Alert severity="error" style={{margin:"10px"}} >
            <AlertTitle>Register Error</AlertTitle>
              {register_error}
            </Alert>
            :
            null
          }
          <form className={classes.form} onSubmit={handleFormSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  name="username"
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  autoFocus
                  value={registerFormData.username}
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={registerFormData.email}
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
                  value={registerFormData.password}
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  value={registerFormData.confirmPassword}
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
              Register
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Typography 
                  component={Link} 
                  to="/login" 
                  variant="subtitle2"
                  style={{textDecoration:"none",color:"blue"}} > Already have an account? Login </Typography>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    )
}

export default RegisterScreen;
