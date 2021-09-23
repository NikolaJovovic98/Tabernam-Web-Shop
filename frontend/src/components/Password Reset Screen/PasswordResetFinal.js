import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router';
import { password_reset_final_action, reset_password_action } from '../../actions/users_actions';
import { useDispatch } from 'react-redux';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { Alert, AlertTitle } from '@material-ui/lab';
import useStyle from './style';
import { useHistory } from 'react-router';
import { Typography, Grid, TextField, Button, Avatar, Container } from '@material-ui/core';


const PasswordResetFinal = () => {

    const dispatch = useDispatch();
    const classes = useStyle();
    const history = useHistory();

    const { jwt_token } = useParams();

    const password_reset_final_data = useSelector( state => state.password_reset_final );
    const { pass_reset_final, pass_reset_final_err } = password_reset_final_data; 

    const reset_password_data = useSelector( state => state.reset_password );
    const { reset_password, reset_password_error } = reset_password_data;

    const [ newPassword, setNewPassword ] = useState("");
    const [ confirmNewPassword, setConfirmNewPassword] = useState("");

    React.useEffect(()=>{
        dispatch(password_reset_final_action(jwt_token));
    },[dispatch,jwt_token]);

    const handlePasswordReset = (e) => {
        e.preventDefault();
        if( newPassword.length < 6 || ( newPassword !== confirmNewPassword ) ){
            alert("Please fill both fields.");
        }else {
            dispatch(reset_password_action({ 
                jwt_token,
                newPassword,
                confirmNewPassword
            }));

        }
    }

    //console.log(reset_password);

    if( reset_password ) {
        history.push("/login");
    }
 
    if(typeof pass_reset_final_err !== 'undefined' ){
        return (
            <>
              <Redirect to="/login"/>
            </>
        )
    }

    return (
        <>
            {
                pass_reset_final
                ?
                <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <VpnKeyIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Reseting Password
                    </Typography>

                    {
                        reset_password_error
                        ?
                        <Alert severity="error" style={{margin:"10px"}} >
                        <AlertTitle>Reset Password Error</AlertTitle>
                          {reset_password_error}
                        </Alert>
                        :
                        null
                    }

                    <Typography variant="caption" style={{textAlign:'center',margin:'10px'}}>
                        Please enter your new password, and confirm it.
                    </Typography>
                    <form className={classes.form} onSubmit={handlePasswordReset}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    autoFocus
                                    id="password"
                                    label="New Password"
                                    name="new_password"
                                    type="password"
                                    onChange={(e)=>{
                                        setNewPassword(e.target.value);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="password2"
                                    label="Confirm New Password"
                                    name="confirm_new_email"
                                    type="password"
                                    onChange={(e)=>{
                                        setConfirmNewPassword(e.target.value);
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
                                Reset Password
                            </Button>
                        </Grid>
                    </form>
                </div>
            </Container>
            :
            null
            }
        </>
    )
}

export default PasswordResetFinal;
