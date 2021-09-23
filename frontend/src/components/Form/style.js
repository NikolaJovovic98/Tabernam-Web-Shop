import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
    margin : "auto",
    width : "40%",
    marginTop : "10px"
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
  },
  buttonSubmit: {
    margin:"auto",
    marginBottom: 10,
    marginTop:10,
    width:"20%"
  },
  buttonClear : {
    margin:"auto",
    width : "15%"
  },
  buttonDiv : {
    width:"90%",
    margin:"auto",
    display:"flex",
    flexDirection:"column"
  },
  textField : {
    margin : "5px"
  }
}));