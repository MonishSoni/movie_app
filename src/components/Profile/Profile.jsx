import React from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../../features/auth'
import { Typography, Button, Box } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';

const Profile = () => {

  const { user } = useSelector(userSelector)

  const favoriteMovies = [];

  const logout = () => {
    localStorage.clear();
    window.location.href = '/'
  }

  return (
    <>
      <Box>
        <Box display='flex' justifyContent="space-between">
          <Typography variant="h4" gutterBottom>My Profile</Typography>
          <Button color='inherit' onClick={logout}> Logout &nbsp; <ExitToApp /></Button>
        </Box>
        {!favoriteMovies.length  ? (<Typography variant="body3">Add favourites</Typography>) : (<Box>Favourite Movies</Box>)



        }
      </Box>
    </>
  )
}

export default Profile