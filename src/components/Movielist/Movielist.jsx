import React from 'react';
import { Grid } from '@mui/material';
import useStyles from "./styles"
import Movie from '../Movie/Movie';


const Movielist = ({ movies, numberofMovies }) => {

    const classes = useStyles();

    return (
        <Grid container className={classes.movieContainer}>

            {movies.results.slice(0, numberofMovies).map((movie, i) => (
                <Movie key={i} movie={movie} i={i} />
            ))}

        </Grid>
    )
}

export default Movielist