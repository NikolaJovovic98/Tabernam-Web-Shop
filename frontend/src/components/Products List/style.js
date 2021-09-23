import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  test : {
      backgroundColor : "blue",
      width : "150px",
      height : "150px",
  },
  big_grid : {
      display : "grid",
      gridTemplateColumns : "repeat(4,19%)",
      gap : "3em",
      justifyContent:"space-around"
  },
  div_paginate : {
    width : "70%",
    margin : 'auto',
    marginBottom : "25px",
    display : 'flex',
    justifyContent : 'center'
  }
}));

