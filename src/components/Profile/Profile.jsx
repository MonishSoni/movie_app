import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../../features/auth'
import { Typography, Button, Box } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';
import { useGetListQuery } from '../../services/tmdb';
import { Ratedcards } from "../"

const Profile = () => {

  const { user } = useSelector(userSelector)


  const { data: favmov, refetch: refetchfav } = useGetListQuery({ listName: 'favorite/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1 });
  const { data: watchmov, refetch: refetchwatch } = useGetListQuery({ listName: 'watchlist/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1 });

  useEffect(() => {
    refetchfav();
    refetchwatch();
  }, []);

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
        {!favmov?.results?.length && !watchmov?.results?.length ? (<Typography variant="body3">Add favourites</Typography>) :
          (<Box>
            <Ratedcards title='Favorite Movies' data={favmov} />
            <Ratedcards title='Watchlist' data={watchmov} />
          </Box>)



        }
      </Box>
    </>
  )
}

export default Profile