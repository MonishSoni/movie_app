import React, { useEffect } from 'react';
import { Divider, List, ListItem, ListItemText, ListSubheader, ListItemIcon, Box, CircularProgress } from '@mui/material'
import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import useStyles from './styles';
import { useGetGenresQuery } from '../../services/tmdb';
import { useDispatch, useSelector } from 'react-redux';
import { selectGenreCategory } from '../../features/currentCategory';

const categories = [
    { label: 'Popular', value: 'popular', icon: 'videocam-outline' },
    { label: 'Top Rated', value: 'top_rated', icon: 'star-outline' },
    { label: 'Upcoming', value: 'upcoming', icon: 'albums-outline' },
];

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



const Sidebar = ({ setMobileOpen }) => {
    const { genreCategoryName } = useSelector((state) => state.genreCategory)
    const classes = useStyles();
    const theme = useTheme();
    const { data, isFetching } = useGetGenresQuery();

    const dispatch = useDispatch();


    return (
        <>
            {/* logo color change */}
            <Link to="/" onClick={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)} className={classes.imageLink}>
                {/* <img className={classes.image} src={theme.palette.mode === 'light' ? "filmyred" : "filmyblue" } />
                */}

                <p className={classes.image} >Moviehub</p>
            </Link>

            <Divider />
            <List>
                <ListSubheader>Categories</ListSubheader>
                {categories.map(({ label, value, icon }) => (
                    <Link key={value} className={classes.links} to="/" onClick={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}>
                        <ListItem onClick={() => dispatch(selectGenreCategory(value))} button>
                            <ListItemIcon>
                                <ion-icon name={icon}></ion-icon>
                            </ListItemIcon>

                            <ListItemText primary={label} />
                        </ListItem>
                    </Link>
                ))}
            </List>

            <Divider />

            <List>
                <ListSubheader>Genres</ListSubheader>
                {isFetching ? (<Box display='flex' justifyContent="center">
                    <CircularProgress />
                </Box>) : data.genres.map(({ name, id }) => (
                    <Link key={name} className={classes.links} to="/" onClick={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}>
                        <ListItem onClick={() => dispatch(selectGenreCategory(id))} button>
                            <ListItemIcon>
                                <ion-icon name={genreIcons[id]}></ion-icon>
                            </ListItemIcon>
                            <ListItemText primary={name} />

                        </ListItem>
                    </Link>
                ))}
            </List>
        </>
    )
}

export default Sidebar