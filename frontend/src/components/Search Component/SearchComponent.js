import React, { useContext, useState } from 'react';
import { TextField, InputAdornment, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import useStyle from './style';
import { get_all_products_by_category_action, get_all_products_action, get_all_products_by_name_action} from '../../actions/products_actions';
import { useDispatch } from 'react-redux';
import { GlobalContext } from '../../App';

const SearchComponent = () => {

    const { appliedFilter, setAppliedFilter } = useContext(GlobalContext);

    const classes = useStyle();
    const dispatch = useDispatch();

    const [ category, setCategory ] = useState("");

    const [ productNameSearch, setProductNameSearch ] = useState("");

    const handleSearchByCategory = (e) => {
        e.preventDefault();
        if( category.length !== 0 ) {
            dispatch(get_all_products_by_category_action(category));
            setAppliedFilter(true);
        }   
    }

    const handleSearchByName = (e) => {
        e.preventDefault();
        if( productNameSearch.length !== 0 ){
            dispatch(get_all_products_by_name_action(productNameSearch));
            setAppliedFilter(true);
        }
    }

    const handleResetFilter = () => {
        dispatch(get_all_products_action());
        setAppliedFilter(false);
    }

    return (
        <>
            <form onSubmit={handleSearchByName} >
            <TextField 
                id="outlined-search" 
                label="Search By Name" 
                type="search" 
                variant="outlined" 
                onKeyUp={(e)=>{
                    setProductNameSearch(e.target.value);
                    handleSearchByName(e);
                    if(e.target.value.length === 0) {
                        handleResetFilter();
                    }
                }}
                InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                          <SearchIcon className={classes.search_icon} />
                      </InputAdornment>
                    )
                  }}
            />
            </form>

            <div>
            <Button 
                  color="secondary" 
                  variant="contained"
                  disabled = {!appliedFilter}
                  onClick={handleResetFilter} 
                  style={{
                    borderRadius:"10px",
                    }}>
                Reset Filter
            </Button>
            </div>

            <form onSubmit={handleSearchByCategory} >
             <TextField 
                id="outlined-search" 
                label="Search By Category" 
                type="search"
                variant="outlined" 
                onChange={(e)=>{
                    setCategory(e.target.value)
                }}
                InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                          <SearchIcon className={classes.search_icon} />
                      </InputAdornment>
                    )
                  }}
            />
            </form>

        </>
    )
}

export default SearchComponent;
