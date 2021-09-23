import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  media: {
    height: 0,
    paddingTop: '56.25%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken',
  },
  border: {
    border: 'solid',
  },
  fullHeightCard: {
    height: '100%',
  },
  card: {
    display: 'flex',
    position : 'relative',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '100%',
    textAlign : "center"
  },
  category : {
    '&:hover' : {
      color: "orangered"
    },
    position : 'absolute',
    left : '80%',
    zIndex : '1',
    cursor : 'pointer',
    borderRadius : '10px',
    transition : '0.8s'
  },
  overlay: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    color: 'white',
  },
  overlay2: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    color: 'white',
  },
  grid: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px',
  },
  title: {
    padding: '0 16px',
  },
  cardActions: {
    padding : "10px",
    display: 'flex',
    flexDirection : 'row',
    justifyContent: 'space-around',
  },
  div : {
    overflow: "hidden",
  },
  test : {
    '&:hover' : {
      transform: "scale(1.3) rotate(5deg)"
    },
  transition: "all 0.5s",
  width: "100%",
  marginTop : '8px'
  }
});