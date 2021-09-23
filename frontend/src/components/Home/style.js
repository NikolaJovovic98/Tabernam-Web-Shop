import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  test : {
      backgroundColor : "blue",
      width : "150px",
      height : "150px"
  },
  search : {
     margin : 'auto',
     width : '50%',
     marginTop : '40px',
     padding : '10px',
     display : 'flex',
     flexDirection : 'row',
     justifyContent : 'space-around',
     alignItems : 'center'
  }
}));

