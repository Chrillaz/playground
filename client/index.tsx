import React, { Fragment } from "react";
import ReactDom from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Router } from "@/router";
import { createTheme, CssBaseline } from "@mui/material";
import { makeStyles, ThemeProvider } from "@mui/styles";

const useStyles = makeStyles({
	root: {
		display: "flex",
		flexDirection: "column",
		flex: "1 1 100%",
		minHeight: "100vh",
		width: "100%",
	},
});

function App() {
	const classes = useStyles();

	return (
		<Fragment>
			<CssBaseline />
			<ThemeProvider theme={createTheme({palette: {mode: 'dark'}})}>
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
