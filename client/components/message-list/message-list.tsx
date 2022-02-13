import React, { FC, Fragment } from 'react';
import { TMessages } from "@/reducers/messageReducer";
import { IMessage } from '@/services/messages';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

interface IProps {
    messages: TMessages;
    children: (message: IMessage) => JSX.Element;
}

const useStyles = makeStyles((theme: Theme) => ({
    ul: {
        listStyle: 'none',
        color: '#fff',
        padding: theme.spacing(2)
    }
}));

export const MessageList: FC<IProps> = ({messages, children}) => {

    const classes = useStyles();

    return(
        <ul className={classes.ul}>
            {Object.values(messages).map(message => (
                <Fragment key={message.id}>
                    {children(message)}
                </Fragment>
            ))}
        </ul>
    )
}