import React, { useState, useEffect } from 'react'
import { Modal, Typography, Button, ButtonGroup, Grid, Box, CircularProgress, useMediaQuery, Rating } from '@mui/material'
import { Movie as MovieIcon, Theaters, Language, PlusOne, Favorite, FavoriteBorderOutlined, Remove, ArrowBack } from '@mui/icons-material'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { useGetMovieQuery, useGetRecommendationQuery, useGetListQuery } from '../../services/tmdb';
import useStyles from "./styles";
import { Movielist } from "../";
import { userSelector } from '../../features/auth';

import { selectGenreCategory } from '../../features/currentCategory';


const genreIcons = {
  28: 'rocket-outline',
  12: 'map-outline',
  16: 'bug-outline',
  35: 'happy-outline',
  80: 'eye-off-outline',
  99: 'camera-outline',
  18: 'paw-outline',
  10751: 'people-outline',
  14: 'planet-outline',
  36: 'library-outline',
  27: 'skull-outline',
  10402: 'musical-notes-outline',
  9648: 'footsteps-outline',
  10749: 'heart-outline',
  878: 'flask-outline',
  10770: 'tv-outline',
  53: 'footsteps-outline',
  10752: 'game-controller-outline',
  37: 'ribbon-outline',
}

const Movieinformation = () => {


  const [fav, setFav] = useState(false);
  const [watchlist, setWatchlist] = useState(false);

  const user = useSelector(userSelector);
  const classes = useStyles();
  const { id } = useParams();
  const { data, isFetching, error } = useGetMovieQuery(id);
  const { data: favmov } = useGetListQuery({ listName: 'favorite/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1 });
  const { data: watchmov } = useGetListQuery({ listName: 'watchlist/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1 });
  const { data: recm, isFetching: recmfetch } = useGetRecommendationQuery({ list: '/recommendations', movie_id: id });
  const tmdbApikey = process.env.REACT_APP_TMDB_KEY;
  const dispatch = useDispatch();

  useEffect(() => {
    setFav(!!favmov?.results?.find((movie) => movie?.id === data?.id));
  }, [favmov, data]);

  useEffect(() => {
    setWatchlist(!!watchmov?.results?.find((movie) => movie?.id === data?.id));
  }, [watchmov, data]);


  const addtoFav = async () => {
    await axios.post(`https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${tmdbApikey}&session_id=${localStorage.getItem('session_id')}`, {
      media_type: 'movie',
      media_id: id,
      favorite: !fav,
    })

    setFav((prev) => !prev)
  }


  const addtoWatch = async () => {
    await axios.post(`https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${tmdbApikey}&session_id=${localStorage.getItem('session_id')}`, {
      media_type: 'movie',
      media_id: id,
      watchlist: !watchlist,
    })

    setWatchlist((prev) => !prev)
  }

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
        <Grid item sm={12} md={12} lg={4} className={classes.pcon}>
          <img className={classes.poster} src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`} alt={data?.title} />
        </Grid>

        <Grid item container direction='column' lg={7}>
          <Typography variant='h4' align='center' gutterBottom>{data?.title}&nbsp;({(data.release_date.split('-')[0])})</Typography>
          <Typography variant='h5' align='center' gutterBottom>{data?.tagline}</Typography>

          <Grid item className={classes.container}>
            <Box display='flex' align="center">
              <Rating readOnly value={data.vote_average / 2} />
              <Typography variant='subtitle' align='center' gutterBottom>{data?.vote_average.toFixed(1)}/10</Typography>
            </Box>
            <Typography variant='body5' align='center' gutterBottom>{data?.runtime}min / {data?.spoken_languages.length > 0 ? data?.spoken_languages[0].name : ''}</Typography>
          </Grid>
          <Grid item className={classes.genreContainer}>
            {data?.genres?.map((genre, i) => (
              <Link key={genre.name} className={classes.links} to="/" onClick={() => dispatch(selectGenreCategory(genre.id))}>
                <ion-icon className={classes.gimage} name={genreIcons[genre.id]}></ion-icon>
                <Typography color='textPrimary' variant='subtitle1'>{genre?.name}</Typography>
              </Link>
            ))}
          </Grid>

          <Typography variant="h6" gutterBottom style={{ marginTop: "10px" }}>Overview</Typography>
          <Typography style={{ marginBottom: "1rem" }}>{data?.overview}</Typography>
          <Typography variant='h6' gutterBottom >Top Cast</Typography>

          <Grid item container spacing={2}>
            {data && data.credits?.cast?.map((char, i) => (
              char.profile_path && (<Grid key={i} item xs={4} md={2} component={Link} to={`/actor/${char.id}`} style={{ textDecoration: 'none' }}>
                <img src={`https://image.tmdb.org/t/p/w500/${char.profile_path}`} className={classes.castimage} alt={char.name} />
                <Typography color="textPrimary">{char?.name}</Typography>
                <Typography color="textSecondary">{char?.character.split('/')[0]}</Typography>
              </Grid>)
            )).slice(0, 6)}
          </Grid>
          <Grid item container style={{ marginTop: '2rem' }}>
            <div className={classes.btncon}>
              <Grid item xs={12} sm={6} className={classes.btncon} >
                <ButtonGroup size="small" variant="outlined">
                  <Button target="_blank" rel="noopener noreferrer" href={data?.homepage} endIcon={<Language />}>Website</Button>
                  <Button target="_blank" rel="noopener noreferrer" href={`https://www.imdb.com/title/${data?.imdb_id}`} endIcon={<MovieIcon />}>IMDB</Button>
                  <Button onClick={() => { }} href="#" endIcon={<Theaters />}>Trailer</Button>
                </ButtonGroup>
              </Grid>

              <Grid item xs={12} sm={6} className={classes.btncon} >
                <ButtonGroup size="small" variant="outlined">
                  <Button onClick={addtoFav} href="#" endIcon={fav ? <FavoriteBorderOutlined /> : <Favorite />}>{fav ? "Unfavorite" : "Favorite"}</Button>
                  <Button style={{ borderRadius: '0px', borderRight: '0px' }} onClick={addtoWatch} href="#" endIcon={watchlist ? <Remove /> : <PlusOne />}>Watchlist</Button>
                  <Button style={{ borderRadius: '0px 4px 4px 0px' }} endIcon={<ArrowBack />}>
                    <Typography style={{ textDecoration: "none" }}
                      component={Link} to="/" color='inherit' variant='subtitle2'>back</Typography>
                  </Button>

                </ButtonGroup>
              </Grid>
            </div>
          </Grid>
        </Grid>
        <Box marginTop="5rem" width="100%">
          <Typography variant="h5" gutterBottom align="center">You might also like</Typography>
          {recm ? <Movielist movies={recm} numberofMovies={12} /> : <Box>Sorry, nothing was found</Box>}
        </Box>
      </Grid>
    </>
  )
}

export default Movieinformation