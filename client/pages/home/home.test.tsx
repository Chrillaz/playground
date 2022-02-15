import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Home from '.'
import { ThemeProvider } from '@mui/styles';
import { createTheme, Theme } from '@mui/material';
import { act } from 'react-dom/test-utils';

describe('<Home />', () => {

    const theme = {
        palette: {
            mode: 'dark'
        }
    } as Theme;

    const mockMessage = { id: 'some-id', message: 'Hello World'};

    jest.mock('@/services/messages', () => ({
        getAll: () => jest.fn()
            .mockResolvedValueOnce([])
            .mockResolvedValueOnce([mockMessage]),
        getById: () => jest.fn().mockResolvedValueOnce(mockMessage),
        create: () => jest.fn().mockResolvedValueOnce(mockMessage),
    }))

    jest.mock('@/services/api', () => ({
        get: jest.fn(),
        post: jest.fn()
    }))

    beforeEach(() => jest.resetAllMocks);

    it('Renders with Submit a message.', () => {

        render(
            <ThemeProvider theme={createTheme(theme)}>
                <Home />
            </ThemeProvider>
        );

        expect(screen.getByText('Submit a message.')).toBeInTheDocument
    })

    it('Can post a message', () => {

        render(
            <ThemeProvider theme={createTheme(theme)}>
                <Home />
            </ThemeProvider>
        );

        const message = 'Hello World';

        const textArea = screen.getByPlaceholderText('What is on your mind?');

        const submit = screen.getByRole('button');

        expect(textArea).toBeInTheDocument;

        expect(submit).toBeInTheDocument;
        
        textArea.setAttribute('value', message);

        act(() => {

            fireEvent.click(submit);
        })

        waitFor(() => {

            expect(screen.getByText(message)).toBeInTheDocument;
        })
    })
})