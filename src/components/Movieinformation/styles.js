import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "space-around",
    margin: "10px 0 !important",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      flexWrap: "Wrap",
    },
  },

  genreContainer: {
    margin: "10px 0 !important",
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  pcon: {
    display: "flex",
    justifyContent: "center",
  },
  links: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textDecoration: "none",
    [theme.breakpoints.down("sm")]: {
      padding: "0.5rem 1rem",
    },
  },

  gimage: {
    color: "rgb(25, 118, 210)",
  },
  poster: {
    borderRadius: "15px",
    boxShadow: "0 0 6px rgba(64,64,70,0.4)",
    width: "80%",
    [theme.breakpoints.down("md")]: {
      margin: "0 auto",
      width: "50%",
      height: "350px",
      marginBottom: "35px",
    },

    [theme.breakpoints.down("sm")]: {
      margin: "0 auto",
      width: "100%",
      height: "350px",
      marginBottom: "25px",
    },
  },
}));
