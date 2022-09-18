import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import useStyles from './styles';
import {
  Actors,
  Profile,
  Navbar,
  Movies,
  Actorinformation,
  Movieinformation,
} from './index';

const App = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <CssBaseline>
          <Navbar />
          <main className={classes.content}>
            <div className={classes.toolbar}></div>
            <Routes>
              <Route path="/movie/:id" element={<Movieinformation />} />
              <Route path="/movie" element={<Movies />} />
              <Route path="/actor/:id" element={<Actorinformation />} />
              <Route path="/actor" element={<Actors />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/" element={<Movies/>} />
            </Routes>
          </main>
        </CssBaseline>
      </div>
    </>
  );
};

export default App;
