import React, { FC } from 'react';
import { IMessage } from '@/services/messages';
import { useForm, FormProvider } from 'react-hook-form';
import { InputControl } from '../input-control/input-control';
import { Button } from '@mui/material';

interface IProps {
    onSubmit: (message: IMessage) => void;
}

export const MessageAppender: FC<IProps> = ({onSubmit}) => {

    const formMethods = useForm();

    const handleSubmit = () => {

        if ( typeof onSubmit === 'function' ) {

            onSubmit({...formMethods.getValues()} as IMessage);
        }
    }

    return (
        <FormProvider {...formMethods}>
            <InputControl 
                name="message"
                variant="outlined"
                size="small"
                multiline
            />
            <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={handleSubmit}
            >
                Submit
            </Button>
        </FormProvider>
    )
}