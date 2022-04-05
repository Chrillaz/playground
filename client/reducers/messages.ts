import { IMessage } from '@/services/messages/messages';
type Actions = 'MESSAGES_INIT' | 'MESSAGE_ADD' | 'MESSAGE_UPDATE' | 'MESSAGE_REMOVE';

export type TMessages = Record<string, IMessage>;

export interface IAction {
    type: Actions;
    payload?: Record<string, any>;
    init?: IMessage[];
}

export const messages = (state: TMessages, action: IAction) => {

    const { type, payload, init } = action;

    switch(type) {
        case 'MESSAGES_INIT': {

            return {
                ...init.reduce((map, message) => ({...map, [message.id]: message}), {})
            }
        }
        case 'MESSAGE_ADD': {

            return {
                ...state,
                [payload.id]: payload
            }
        }
        case 'MESSAGE_UPDATE': {
            
            return {
                ...state,
                [payload.id]: payload
            }
        }
        case 'MESSAGE_REMOVE': {

            let {[payload.id]: omit, ...rest} = state;

            return {
                ...rest
            }
        }
        default: {
            return state
        }
    }
}