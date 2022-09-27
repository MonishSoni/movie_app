import { makeStyles } from "@mui/styles";
import { padding } from "@mui/system";

export default makeStyles((theme) => ({
  imageLink: {
    display:'flex',
    justifyContent:'center',
    padding:'5px 0',
    textDecoration:'none',
    alignItems:'center'
  },

  image:{
    fontWeight:'900',
    color:'#1976D2',
    fontSize:'32px',
    letterSpacing:'1px',
    margin:'15px 0',
    fontFamily: "'Acme', sans-serif"
  },

  links:{
    color:theme.palette.text.primary,
    textDecoration:'none',
  },

  genreImages:{
    filter: theme.palette.mode === 'dark' ? 'dark' : 'invert(1)',
  }
}));
