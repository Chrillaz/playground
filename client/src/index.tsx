import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { FlexColumn } from '@components';
import { createTheme, ThemeProvider } from '@mui/material';
import { Router } from './router';
import { theme } from './theme';

const container = document.getElementById('root') as HTMLDivElement;

const root = createRoot(container);

root.render(
	<ThemeProvider theme={createTheme(theme)}>
		<FlexColumn>
			<BrowserRouter>
				<Router />
			</BrowserRouter>
		</FlexColumn>
	</ThemeProvider>
);
