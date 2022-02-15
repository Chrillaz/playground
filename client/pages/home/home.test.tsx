import { createTheme, Theme } from "@mui/material";
import { ThemeProvider } from "@mui/styles";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios, { AxiosStatic } from 'axios';
import React from "react";
import { act } from "react-dom/test-utils";
import Home from ".";

describe("<Home />", () => {

	const theme = {
		palette: {
			mode: "dark",
		},
	} as Theme;

	const mockMessage = { id: "some-id", message: "Hello World" };

    jest.mock('axios');

    const mockGet = jest.spyOn<AxiosStatic, 'get'>(axios, 'get');
    const mockPost = jest.spyOn<AxiosStatic, 'post'>(axios, 'post');
        
    mockGet.mockResolvedValueOnce({ data: [] });
    mockPost.mockResolvedValueOnce({ data: [mockMessage]});

	beforeEach(() => jest.resetAllMocks);

	it('Renders', async () => {

		render(
			<ThemeProvider theme={createTheme(theme)}>
				<Home />
			</ThemeProvider>
		);

		expect(screen.getByText("Submit a message.")).toBeInTheDocument;
	});

	it('Can post a message', async () => {

        const message = "Hello World";

		render(
			<ThemeProvider theme={createTheme(theme)}>
				<Home />
			</ThemeProvider>
		);

		const textArea = screen.getByPlaceholderText("What is on your mind?");

		const submit = screen.getByRole("button");

		expect(textArea).toBeInTheDocument;

		expect(submit).toBeInTheDocument;

		textArea.setAttribute("value", message);

		act(() => {
			fireEvent.click(submit);
		});

		waitFor(() => {
			expect(screen.getByText(message)).toBeInTheDocument;
		});
	});
});
