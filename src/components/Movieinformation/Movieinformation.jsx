import React from 'react'
import { Modal, Typography, Button, ButtonGroup, Grid, Box, CircularProgress, useMediaQuery, Rating } from '@mui/material'
import { Movie as MovieIcon, Theaters, Language, PlusOne, Favorite, FavoriteBorderOutlined, Remove, ArrowBack } from '@mui/material'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { useGetMovieQuery } from '../../services/tmdb';
import useStyles from "./styles"

const Movieinformation = () => {

  const classes = useStyles();
  const { id } = useParams();
  const { data, isFetching, error } = useGetMovieQuery(id);

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="8rem" />
      </Box>
    )
  }

  if (error) {
    return (
      <Box display="flex" flexDirection='column' alignItems="center">
        <p style={{ textDecoration: 'none', color: 'gray', fontSize: '18px' }}>Something went wrong</p>
        <Link style={{ textDecoration: 'none', color: '#1976d2', fontSize: '16px' }} to="/">Go Back</Link>
      </Box>
    )
  }
  return (
    <>
      <Grid container className={classes.container}>
        <Grid item sm={12} lg={4}>
          <img className={classes.poster} src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`} alt={data?.title} />
        </Grid>

        <Grid item container direction='column' lg={7}>
          <Typography variant='h4' align='center' gutterBottom>{data?.title}&nbsp;({(data.release_date.split('-')[0])})</Typography>
          <Typography variant='h5' align='center' gutterBottom>{data?.tagline}</Typography>

          <Grid item className={classes.container}>
            <Box display='flex' align="center">
               <Rating readOnly value={data.vote_average / 2} />
               <Typography variant='subtitle' align='center' gutterBottom>{data?.vote_average}/10</Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default Movieinformation