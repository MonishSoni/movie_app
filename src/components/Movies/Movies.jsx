import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, useMediaQuery, Typography } from "@mui/material"
import { useSelector } from 'react-redux';
import { useGetMoviesQuery } from '../../services/tmdb';
import Movielist from '../Movielist/Movielist';

import { selectGenreCategory } from '../../features/currentCategory';
import {Pagination} from "../"

const Movies = () => {

  const [page, setPage] = useState(1)
  const { genreCategoryName, searchQuery } = useSelector((state) => state.genreCategory)
  const { data, error, isFetching } = useGetMoviesQuery({genreCategoryName, page, searchQuery});


  if (isFetching) {
    return (
      <Box display='flex' justifyContent="center">
        <CircularProgress size='4rem' />
      </Box>
    )
  }

  if (!data.results.length) {
    <Box display='flex' alignItems="center" mt="20px">
      <Typography variant='h4'>No Movies Found. <br /> Please Search for Something Else</Typography>
    </Box>
  }

  if (error) {
    return 'An Error Occured'
  }

  return (
    <div>
      <Movielist movies={data} />
      <Pagination currentPage={page} setPage={setPage} totalPages={data.total_pages} />
    </div>
  )
}

export default Movies