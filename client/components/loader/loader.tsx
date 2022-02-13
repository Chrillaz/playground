import React from 'react';
import { CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    root: {
        margin: 'auto'
    }
});

export const Loader = () => {

    const classes = useStyles();

    return(
        <div className={classes.root}>
            <CircularProgress disableShrink />
        </div>
    )
}