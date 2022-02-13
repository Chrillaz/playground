import { useReducer, useEffect } from 'react';
import { TMessages, messageReducer } from '@/reducers/messageReducer';
import * as messages from '@/services/messages';

interface IProvided {
    messages: TMessages;
    addMessage: (message: messages.IMessage) => void;
    removeMessage: (message: messages.IMessage) => void;
    updateMessage: (message: messages.IMessage) => void;
}

export const useMessages = (): IProvided => {

    const [state, dispatch] = useReducer(messageReducer, {});

    const addMessage: IProvided['addMessage'] = async (message) => {

        const payload = await messages.create(message);

        dispatch({ type: 'MESSAGE_ADD', payload });
    }

    const removeMessage: IProvided['removeMessage'] = async (message) => {

        const removed = await messages.removeById(message.id);

        if (removed) {
            dispatch({ type: 'MESSAGE_REMOVE', payload: message });
        }
    }

    const updateMessage: IProvided['updateMessage'] = async (message) => {

        const payload = await messages.updateById(message);

        dispatch({ type: 'MESSAGE_UPDATE', payload });
    }

    useEffect(() => {

        messages.getAll().then(init => dispatch({ type: 'MESSAGES_INIT', init }))
    }, []);

    return {
        messages: state,
        addMessage,
        removeMessage,
        updateMessage
    }
}