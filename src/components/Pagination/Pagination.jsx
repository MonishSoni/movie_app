import React from 'react';
import { Typography, Button } from '@mui/material';
import useStyles from "./styles"

const Pagination = ({ currentPage, setPage, totalPages }) => {

    const classes = useStyles();



    const handleNext = () => {
        if (currentPage !== totalPages) {
            setPage((prevPage) => prevPage + 1)
        }
    };
    const handlePrev = () => {
        if (currentPage !== 1) {
            setPage((prevPage) => prevPage - 1)
        }
    };

    if (totalPages === 0) return null;

    return (
        <>
            <div className={classes.container} >
                <Button onClick={handlePrev} variant="contained" color="primary" type="button" className={classes.button}>Prev</Button>
                <Typography className={classes.text} variant="body2">{currentPage}</Typography>
                <Button onClick={handleNext} variant="contained" color="primary" type="button" className={classes.button}>Next</Button>

            </div>
        </>
    )
}

export default Pagination;