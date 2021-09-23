import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    footer : {
        minHeight : '50vh',
        backgroundColor : 'rgb(240, 245, 245)',
        borderRadius : "7px",
    },
    main_div : {
        //border : '2px solid black',
        padding : '5px',
        display : 'flex',
        flexDirection : "row",
        justifyContent : 'space-evenly',
    },
    main_div_one : {
        //border : '2px solid green',
        padding : '5px',
        width : '30%',
    } ,
    main_div_two : {
        //border : '2px solid red',
        padding : '5px',
        width : '30%',
        display : 'flex',
        flexDirection : 'column',
        justifyContent : 'space-around',
        alignItems : 'center'
    } ,
    main_div_three : {
        //border : '2px solid purple',
        padding : '5px',
        width : '30%'
    }    
}));