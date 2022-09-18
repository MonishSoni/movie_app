import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  movie: {
    padding: "10px",
   
  },

  link:{
   alignItems:'center',
   fontWeight:'bolder',
   textDecoration:'none',
   [theme.breakpoints.up('xs')]:{
    display:'flex',
    flexDirection:'column'
   },
   '&:hover':{
    cursor:'pointer'
   }

  },

  image:{
    height:'300px',
    marginBottom:'10px',
    borderRadius:'10px',
    transition:"all 0.3s ease",
    '&:hover':{
      transform:'scale(1.05)'
     },
     [theme.breakpoints.down('sm')]:{
       height:'400px'
     },
  },
  title: {
    color: theme.palette.text.primary,
    textOverflow: "ellipsis",
    width:'230px',
    whiteSpace:'nowrap',
    overflow:'hidden',
    marginTop:'10px',
    marginBotttom:'0px',
    textAlign:'center',
    [theme.breakpoints.down('sm')]:{
      width:"250px",
    },
  },


}));
