import { useReducer, useEffect } from 'react';
import { TMessages, messages as messageReducer } from '@/reducers/messages';
import * as messages from '@/services/messages/messages';

interface IProvided {
    messages: TMessages;
    addMessage: (message: messages.IMessage) => void;
    removeMessage: (message: messages.IMessage) => void;
    updateMessage: (message: messages.IMessage) => void;
}

export const useMessages = (): IProvided => {

    const [state, dispatch] = useReducer(messageReducer, {});

    const getMessages = async (subscribed: boolean) => {

        const init = await messages.getAll();

        if ( subscribed ) {

            dispatch({ type: 'MESSAGES_INIT', init });
        }
    }

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

        let subscribed = true;

        getMessages(subscribed);

        return () => {
            subscribed = false;
        }
    }, []);

    return {
        messages: state,
        addMessage,
        removeMessage,
        updateMessage
    }
}