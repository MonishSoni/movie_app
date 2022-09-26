import React from 'react'
import { Typography, Button, Grid, Box, CircularProgress } from '@mui/material'
import { ArrowBack, SortByAlphaRounded } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { useGetActorQuery, useGetActormovQuery } from '../../services/tmdb';
import useStyles from "./styles";
import { Movielist } from "../";


const Actorinformation = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const { id } = useParams();
  const page = 1;
  const { data, isFetching, error } = useGetActorQuery(id);
  const { data: movies} = useGetActormovQuery({ id, page });

  console.log(data)
  const dispatch = useDispatch();

  if (isFetching) {
    return (
      <Box display='flex' justifyContent="center">
        <CircularProgress size='4rem' />
      </Box>
    )
  }

  if (error) {
    return (
      <Box display='flex' justifyContent="center" alignItems="center">
        <Button startIcon={<ArrowBack />} onClick={() => navigate('/')}>An Error Occured</Button>
      </Box>
    )
  }


  return (
    <>
      <Box>
        <Grid container spacing={3}>
          <Grid item lg={5} xl={4}>
            <img className={classes.image} src={`https://image.tmdb.org/t/p/w780/${data?.profile_path}`} alt={data.name} />
          </Grid>
          <Grid item lg={7} xl={8} style={{ display: 'flex', justifyContent: "center", flexDirection: "column" }}>
            <Typography variant="h4" gutterBottom>{data?.name}</Typography>
            <Typography variant="body1" gutterBottom>Born: {new Date(data?.birthday).toDateString()}</Typography>
            <Typography variant="body2" align="justify" paragraph>{data?.biography || 'Sorry, no data found'}</Typography>
            <Box marginTop="2rem" display="flex" justifyContent="space-around">
              <Button variant='contained' color="primary" target="_blank" href={`https://www.imdb.com/name/${data?.imdb_id}`}>IMDB</Button>
            </Box>
          </Grid>
        </Grid>
        <Box margin="2rem 0">
          <Typography variant="h4" gutterBottom align="center">Movies</Typography>
          {movies && <Movielist movies={movies} numberofMovies={12}/>}
        </Box>
      </Box>
    </>
  )
}

export default Actorinformation