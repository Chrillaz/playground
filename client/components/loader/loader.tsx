import React from 'react';
import { CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    root: {
        margin: 'auto'
    }
});

/**
 * CircularProgrss component aligned auto in flex box.
 * 
 * @link https://mui.com/api/circular-progress/#main-content 
 */
export const Loader = () => {

    const classes = useStyles();

    return(
        <div className={classes.root}>
            <CircularProgress disableShrink />
        </div>
    )
}