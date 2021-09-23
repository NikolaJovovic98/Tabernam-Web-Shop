import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    big_div : {
        //border : '4px solid black',
        display : 'grid',
        gridTemplateColumns : '1fr 1fr',
        gap : "2em",
        padding : "40px",
        backgroundColor : 'rgb(240, 235, 235)',
        width : '85%',
        margin : 'auto',
        borderRadius : "8px"
    },
    product_info_one : {
        //border : '4px solid blue',
        display : 'grid',
        gridTemplateColumns : '1fr 1fr',
        alignItems : 'center',
        padding : "10px"
    },
    product_info_two : {
        //border : '5px solid green',
        padding : "10px",
        display : 'grid',
        gridTemplateColumns : 'repeat(4,1fr)'
    },
    product_info_one_image : {
       // border : '4px solid yellow',
        textAlign : "center",
        borderRight : '1px solid rgb(240, 235, 235)'
    },
    product_info_one_info : {
        //border : '4px solid gray',
        padding : "10px",
        display : 'flex',
        flexDirection : "column",
        justifyContent : "center",
        alignItems : 'center'
    },
    one_data : {
        textAlign : 'center',
        margin : '10px',
        padding : '10px',
        border : '1px solid rgb(240, 235, 235) ',
        borderRadius : "8px",

        display : 'flex',
        flexDirection : 'column',
        justifyContent : 'space-around',
        alignItems : "center"

    }
}));

