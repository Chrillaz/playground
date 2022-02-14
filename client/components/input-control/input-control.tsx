import { TextField, TextFieldProps } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';

/**
 * InputControl is an abstraction of MUI TextField using react-hook-form register
 * 
 * @link https://react-hook-form.com/api/useform/register
 * @link https://mui.com/components/text-fields/#main-content
 */
export const InputControl = ({
    name,
    ...props
}: TextFieldProps) => {

    const { register } = useFormContext();
    
    return(
        <TextField {...props} {...register(name)} />
    )
}