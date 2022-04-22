import { styled } from '@mui/material/styles';
import React from 'react';

interface IProps {
    children: React.ReactNode | React.ReactNode[];
}

const FlexContainer = styled('div')(() => ({
	display: 'flex',
	flexDirection: 'column',
	flex: '1 1 100%',
	minHeight: '100vh',
	width: '100%',
}));

export const FlexColumn: React.ComponentType<IProps> = ({ children }) => {

	return <FlexContainer>{children}</FlexContainer>;
};
