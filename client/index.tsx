import { Router } from "@/router";
import { createTheme, CssBaseline, Theme } from "@mui/material";
import { makeStyles, ThemeProvider } from "@mui/styles";
import React, { Fragment } from "react";
import ReactDom from "react-dom";
import { BrowserRouter } from "react-router-dom";

const useStyles = makeStyles({
	root: {
		display: "flex",
		flexDirection: "column",
		flex: "1 1 100%",
		minHeight: "100vh",
		width: "100%",
	},
});

const theme = {
	palette: {
		mode: "dark",
	},
} as Theme;

function App() {
    
	const classes = useStyles();

	return (
		<Fragment>
			<CssBaseline />
			<ThemeProvider theme={createTheme(theme)}>
				<div className={classes.root}>
					<BrowserRouter>
						<Router />
					</BrowserRouter>
				</div>
			</ThemeProvider>
		</Fragment>
	);
}

ReactDom.render(<App />, document.getElementById("app"));
