import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Form from '../Form/Form';
import ProductsList from '../Products List/ProductsList';
import SearchComponent from '../Search Component/SearchComponent';
import useStyle from './style';
import { useDispatch } from 'react-redux';
import { get_all_products_action } from '../../actions/products_actions'; 
import { Paper, Button } from '@material-ui/core';
import SliderTabernam from '../Slider/SliderTabernam';

const HomeScreen = ({user}) => {

    const [ showForm, setShowForm ] = useState(false);

    const dispatch = useDispatch();
    const classes = useStyle();

    React.useEffect(()=>{
        dispatch(get_all_products_action());
    },[dispatch]);

    const SwitchForm = () => {
        return (
            user.is_admin
            ?
            <div style={{display:'flex',justifyContent:'center'}} >
            <Button 
             variant="contained"
             onClick={()=>{
                 setShowForm(!showForm);
             }} >
                Show Form
            </Button>
            </div>
            :
            null
        )
    }

    return (
        <>
            <div style={{marginBottom : "90px"}} >
             <Navbar user={user} />
            </div> 
            <SwitchForm/>
             {
                 user?.is_admin
                 ?
                 (
                    showForm
                    ?
                    <Form/>
                    :
                    null
                 )
                 :
                 null
             }

             <Paper  className={classes.search} >
                <SearchComponent/>
             </Paper>

            <div style={{
                margin:"20px",
                padding:"20px",
                borderRadius:"10px",
                backgroundColor:"rgb(240, 235, 235)"}} > 
               <ProductsList user={user} />
             </div>

             <div style={{
                 margin : 'auto',
                 marginTop : '50px',
                 marginBottom : '90px',
                 padding : '7px',
                 width : "70%",
             }}>
                 <Paper elevation={3}> 
                 <SliderTabernam type="main_slider"/>
                 </Paper>
             </div>
        </>
    );
};

export default HomeScreen;
