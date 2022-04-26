import React from 'react';
import { CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

const RootWrapper = styled('div')(() => ({
    root: {
        margin: 'auto'
    }
}));

/**
 * CircularProgrss component aligned auto in flex box.
 * 
 * @link https://mui.com/api/circular-progress/#main-content 
 */
export const Loader = () => {

    return(
        <RootWrapper>
            <CircularProgress disableShrink />
        </RootWrapper>
    )
}