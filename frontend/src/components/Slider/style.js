import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    div : {
        //border : '2px solid red',
        textAlign : "center",
        margin : '5px',
        position : 'relative'
    },
    img : {
        //border : '2px solid green',
        width : "70%",
        cursor : 'pointer',
        transition: "all 1s",
        '&:hover' : {
            transform: "scale(1.2)"
          },
    },
    price : {
        position : 'absolute',
        zIndex : '1',
        top : '0',
        right : '15%',
        backgroundColor : "rgb(57, 230, 0)",
        padding : "6px",
        borderBottomLeftRadius : "10px",
        borderBottomRightRadius : '10px',
        height : '12%',
        color : 'white',
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center'
    }
}));

