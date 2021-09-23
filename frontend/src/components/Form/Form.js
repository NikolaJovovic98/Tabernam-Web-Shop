import React, { useState,useContext } from 'react';
import { Paper, CircularProgress, Typography, TextField, Button, InputLabel, Select } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import useStyles from './style';
import FileBase from 'react-file-base64';
import { add_new_product_action } from '../../actions/products_actions';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalContext } from '../../App';


const initial_state = {
    product_name : "",
    product_price : "",
    product_image : "",
    product_category : "",
    product_info_energy : "",
    product_info_fats : "",
    product_info_saturated_fats : "",
    product_info_proteins : "",
    product_info_carbs : "",
    product_info_sugar : "",
    product_info_fibers : "",
    product_info_salt : ""
}

const checkObject = (obj) => {
    return Object.keys(obj).length === 0 ? false : true;
 };


const Form = () => {

    const dispatch = useDispatch();
    const classes = useStyles();
    const {product_update_context, set_product_update_context} = useContext(GlobalContext);

    const added_product = useSelector( state => state.add_new_product );
    const { loading, new_product, new_product_error } = added_product;

    const [ newProductData, setNewProductData ] = useState(initial_state);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if( newProductData.product_name.length   === 0 ||
            newProductData.product_price.length  === 0 ||
            newProductData.product_image.length  === 0   ){
                alert("MUST FILL ALL FIELDS!");
            }else {
                if(checkObject(product_update_context)){
                  dispatch(add_new_product_action(product_update_context.product_id,newProductData));  
                }else
                {
                  dispatch(add_new_product_action(false,newProductData));    
                }
                clear();
            }
    };

    const handleFormDataChange = (e) =>{
        setNewProductData({
            ...newProductData,
            [ e.target.name ] : e.target.value
        });
    };

    const clear = () =>{
        setNewProductData(initial_state);
        set_product_update_context({});
    };

    React.useEffect(()=>{
        if(checkObject(product_update_context)) setNewProductData(product_update_context);
    },[product_update_context]);

    return (
        <Paper className={classes.paper}>
         <form  autoComplete="off" className={classes.form} onSubmit={handleFormSubmit}>
           <Typography variant="h6">
               { checkObject(product_update_context) ? 'Update Product Data' : 'Add New Product' }
           </Typography>

            {
                  loading 
                  ? 
                  <CircularProgress size="90px" style={{margin:"20px"}} />
                  :
                  null
            }

           { new_product &&
                <Alert severity="success" style={{margin:"10px"}} >
                  <AlertTitle>Success</AlertTitle>
                   New Product Successfully Added!
                </Alert>
            }
            { new_product_error &&
             <Alert severity="error">
                 <AlertTitle>Error</AlertTitle>
                    {new_product_error}
              </Alert>
            }
             <TextField 
            className={classes.textField} 
            name="product_name"
            variant="outlined"
            label="Product Name"
            required
            fullWidth
            autoFocus
            value = {newProductData.product_name}
            onChange={handleFormDataChange}
            />
             <TextField 
            className={classes.textField} 
            name="product_price"
            variant="outlined"
            label="Product Price &euro;"
            required
            fullWidth
            type="number"
            value = {newProductData.product_price}
            InputProps={{
                inputProps:{
                    min : 0, // min value of number
                    step : "any" // decimal number
                }
            }}
            onChange={handleFormDataChange}
            />

            <TextField 
            className={classes.textField} 
            name="product_info_energy"
            variant="outlined"
            label="Energy"
            required
            type="number"
            value = {newProductData.product_info_energy}
            InputProps={{
                inputProps:{
                    min : 0, 
                    step : "any" 
                }
            }}
            onChange={handleFormDataChange}
            />

            <TextField 
            className={classes.textField} 
            name="product_info_fats"
            variant="outlined"
            label="Fats"
            required
            type="number"
            value = {newProductData.product_info_fats}
            InputProps={{
                inputProps:{
                    min : 0, 
                    step : "any" 
                }
            }}
            onChange={handleFormDataChange}
            />

            <TextField 
            className={classes.textField} 
            name="product_info_saturated_fats"
            variant="outlined"
            label="Saturated Fats"
            required
            type="number"
            value = {newProductData.product_info_saturated_fats}
            InputProps={{
                inputProps:{
                    min : 0, 
                    step : "any"
                }
            }}
            onChange={handleFormDataChange}
            />

            <TextField 
            className={classes.textField} 
            name="product_info_proteins"
            variant="outlined"
            label="Proteins"
            required
            type="number"
            value = {newProductData.product_info_proteins}
            InputProps={{
                inputProps:{
                    min : 0, 
                    step : "any"
                }
            }}
            onChange={handleFormDataChange}
            />

            <TextField 
            className={classes.textField} 
            name="product_info_carbs"
            variant="outlined"
            label="Carbs"
            required
            type="number"
            value = {newProductData.product_info_carbs}
            InputProps={{
                inputProps:{
                    min : 0, 
                    step : "any"
                }
            }}
            onChange={handleFormDataChange}
            />

            <TextField 
            className={classes.textField} 
            name="product_info_sugar"
            variant="outlined"
            label="Sugar"
            required
            type="number"
            value = {newProductData.product_info_sugar}
            InputProps={{
                inputProps:{
                    min : 0, 
                    step : "any"
                }
            }}
            onChange={handleFormDataChange}
            />

            <TextField 
            className={classes.textField} 
            name="product_info_fibers"
            variant="outlined"
            label="Fibers"
            required
            type="number"
            value = {newProductData.product_info_fibers}
            InputProps={{
                inputProps:{
                    min : 0, 
                    step : "any"
                }
            }}
            onChange={handleFormDataChange}
            />

            <TextField 
            className={classes.textField} 
            name="product_info_salt"
            variant="outlined"
            label="Salt"
            required
            type="number"
            value = {newProductData.product_info_salt}
            InputProps={{
                inputProps:{
                    min : 0, 
                    step : "any"
                }
            }}
            onChange={handleFormDataChange}
            />

            <div style={{width : "80%",margin:"10px"}} >

            <InputLabel htmlFor="age-native-simple">Product Category*</InputLabel>
                <Select
                native
                fullWidth
                name="product_category"
                value={newProductData.product_category}
                onChange={handleFormDataChange}
                >
                <option aria-label="None" value="" />
                <option value={"Drinks"}>Drinks</option>
                <option value={"Sweets"}>Sweets</option>
                <option value={"Snacks"}>Snacks</option>
                <option value={"Coffee"}>Coffee</option>
                </Select>

            </div>

             <div style={{margin:"10px",textAlign:"center"}}>
                 <Typography style={{marginBottom:"7px"}} >Product Photo*</Typography>
                 <FileBase 
                    type='file'
                    required
                    multiple={false}
                    onDone={({base64})=>{
                        setNewProductData({
                            ...newProductData,
                            product_image : base64
                        });
                    }}/>
            </div>
            <div className={classes.buttonDiv} >
            <Button 
             className={classes.buttonSubmit}
             variant="contained"
             color="primary"
             size="large"
             type="submit"
             fullWidth >
                 Add
            </Button>
            <Button 
             className={classes.buttonClear}
             variant="contained" 
             color="secondary" 
             size="small" 
             onClick={clear} 
             fullWidth>
                 Clear
            </Button>
            </div>
        </form>
    </Paper>
    )
}


export default Form;
