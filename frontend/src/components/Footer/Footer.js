import React from 'react'
import useStyle from './style';
import { List, ListItemText, ListItem, Paper } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

const Footer = () => {

    const classes = useStyle();

    return (
        <footer className={classes.footer} >
            <div className={classes.main_div}>

                <div className={classes.main_div_one}>
                    <Paper elevation={3}>
                        <List>
                            <ListItem >
                                <ListItemText primary="Contact Number" secondary="(+382)069703780" />
                            </ListItem>
                            <ListItem >
                                <ListItemText primary="Email" secondary="dzonnna@gmail.com" />
                            </ListItem>
                            <ListItem >
                                <ListItemText primary="Instagram Account" secondary="nikola__jovovic" />
                            </ListItem>
                            <ListItem >
                                <ListItemText primary="Store Location" secondary="Admirala Zmajevica 21" />
                            </ListItem>
                        </List>
                    </Paper>
                </div>

                <div className={classes.main_div_two}>
                    <div>
                        <img src='/images/logo.png' alt="Logo" />
                    </div>
                    <div style={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'space-around'}}>
                    <div>
                        <FacebookIcon fontSize="large"/>
                    </div>
                    <div>
                        <InstagramIcon fontSize="large"/>
                    </div>
                    <div>
                        <LinkedInIcon fontSize="large"/>
                    </div>
                    </div>
                </div>

                <div className={classes.main_div_three}>
                    <Paper elevation={3}>
                        <List>
                            <ListItem >
                                <ListItemText primary="Payment Methods"  />
                            </ListItem>
                            <ListItem >
                                <ListItemText primary="Q &and; A"  />
                            </ListItem>
                            <ListItem >
                                <ListItemText primary="Policy "  />
                            </ListItem>
                            <ListItem >
                                <ListItemText primary="Data Security"  />
                            </ListItem>
                        </List>
                    </Paper>
                </div>

            </div>
        </footer>
    )
}

export default Footer
