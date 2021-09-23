import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    all_orders : {
      padding : '30px',
      width : '83%',
      margin : 'auto',
      display : 'flex',
      flexDirection : 'row',
      justifyContent : "space-between",
      alignItems : 'flex-start',
      flexWrap : 'wrap',
      height : "36em",
      overflow : "scroll",
      overflowX : 'hidden'

  },
  one_order : {
      padding : '10px',
      textAlign : 'center',
      margin : '20px'
  },
  content : {
    //   border : '1px solid green'
  },
  one_content : {
      //border : '1px solid orange',
      padding : '4px',
      marginBottom : '4px'
  },
  accDet : {
    //border : '2px solid black'
  },
  accDetDiv: {
    margin : 'auto',
    padding : "5px"
  },
  acc : {
    backgroundColor : "rgb(240, 235, 235)",
    margin : '10px'
  }
}));

