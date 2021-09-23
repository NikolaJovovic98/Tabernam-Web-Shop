import React, { useState } from 'react';
import useStyle from './style';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { Grid, Typography, TextField, Button, Container, Avatar } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { password_reset_request_action } from '../../actions/users_actions';
import { Alert, AlertTitle } from '@material-ui/lab';

const PasswordResetScreen = () => {

    const classes = useStyle();
    const dispatch = useDispatch();

    const password_reset_request_data = useSelector( state => state.password_reset_request );
    const { loading, pass_res_req, pass_res_req_err } = password_reset_request_data;

    const [ enteredEmail, setEnteredEmail ] = useState("");

    const handlePasswordReset = (e) => {
        e.preventDefault();
        if( enteredEmail.length !== 0 ) dispatch(password_reset_request_action({enteredEmail}));
    };

    return (
        <>
            <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <VpnKeyIcon />
                    </Avatar>

                    <Typography component="h1" variant="h5">
                        Password Reset
                    </Typography>

                    {

                        loading
                        ?
                        <h3>Sending email...</h3>
                        :
                        null

                    }

                    {

                        pass_res_req
                        ?
                        <Alert severity="success" style={{margin:"10px"}} >
                         <AlertTitle>Email sent</AlertTitle>
                           Password reset link successfully sent
                         </Alert>
                        :
                        null

                    }

                    {

                        pass_res_req_err
                        ?
                        <Alert severity="error" style={{margin:"10px"}} >
                         <AlertTitle>Error</AlertTitle>
                            {pass_res_req_err}
                         </Alert>
                        :
                        null

                    }

                    <Typography variant="caption" style={{textAlign:'center',margin:'10px'}}>
                        Please enter your email address, and we will send you password reset link.
                    </Typography>
                    <form className={classes.form} onSubmit={handlePasswordReset}>
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
                                    onChange={(e)=>{
                                        setEnteredEmail(e.target.value);
                                    }}
                                />
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Send Reset Link
                            </Button>
                        </Grid>
                    </form>
                </div>
            </Container>
        </>
    )
}

export default PasswordResetScreen;
