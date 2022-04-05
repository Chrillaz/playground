import Home from '@/pages/home';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/styles';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { api } from '@/services/api';

describe('<Home />', () => {
    
    const theme = createTheme({ palette: { mode: 'dark' } });

    const defaultMessage = { id: 'some-id-1234', message: 'Hello World' };

    const createMessage = { id: 'another-id-1234', message: 'Hello Again' };

    const alteredMessage = 'Hello World Modified';

    jest.mock('@/services/api');

	describe('Message service CRUD operations', () => {

		beforeEach(() => jest.resetAllMocks());

        beforeEach(async () => {

            jest.spyOn(api, 'get')
                .mockImplementation(() => Promise.resolve({ data: [defaultMessage] }));

            render(
                <ThemeProvider theme={theme}>
                    <Home />
                </ThemeProvider>
            )

            return await waitFor(() => expect(screen.getByText('Submit a message.')).toBeInTheDocument );
        });

		it('can post a message', async () => {

            const postMock = jest.spyOn(api, 'post').mockImplementationOnce(() => Promise.resolve({ data: createMessage }));

			const message = createMessage.message;
           
            const input = screen.getByPlaceholderText('What is on your mind?') as HTMLTextAreaElement;

        	const submit = screen.getByText('Submit');

            await userEvent.type(input, message);
            
            await userEvent.click(submit);

            expect(screen.getByText(message)).toBeInTheDocument;
                
            expect(screen.getByTitle('message list').childElementCount).toBe(2);

            expect(postMock).toBeCalledTimes(1);

            expect(postMock).toBeCalledWith('messages', { message });
		});

        it('can delete a message', async () => {

            const deleteMock = jest.spyOn(api, 'delete').mockImplementation(
                () => Promise.resolve({ data: true })
            );

            expect(screen.getByTitle('message list').childElementCount).toBe(1);
            
            const menu = screen.getAllByTitle('message actions');
    
            await userEvent.click(menu[menu.length -1]);

            const deleteAction = within(screen.getByRole('menu')).getByText('Delete message');

            await userEvent.click(deleteAction);

            expect(deleteMock).toBeCalledTimes(1);

            expect(deleteMock).toBeCalledWith(`messages/${defaultMessage.id}`);
        });

        it('can edit a message', async () => {

            const putMock = jest.spyOn(api, 'put').mockImplementation(
                () => Promise.resolve({ data: {...defaultMessage, message: alteredMessage } })
            );

            expect(screen.getByText(defaultMessage.message)).toBeInTheDocument;

            const menu = screen.getAllByTitle('message actions');
    
            await userEvent.click(menu[menu.length -1]);

            const putAction = within(screen.getByRole('menu')).getByText('Edit message');

            await userEvent.click(putAction);

            const input = within(screen.getByRole('dialog')).getByPlaceholderText('edit message');

            await userEvent.clear(input);

            await userEvent.type(input, alteredMessage);

            const save = within(screen.getByRole('dialog')).getByText('Save');

            await userEvent.click(save);

            expect(putMock).toBeCalledTimes(1);

            expect(putMock).toBeCalledWith(`messages/${defaultMessage.id}`, {...defaultMessage, message: alteredMessage });
        })
	});
});
