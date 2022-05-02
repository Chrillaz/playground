import { styled } from '@mui/material/styles';
import React from 'react';

interface IProps<T> {
    items: T[];
    children: ((item: T) => React.ReactNode)
}

const UL = styled('ul')(() => ({
	listStyle: 'none',
	margin: 0,
    padding: 0,
    width: '100%'
}));

export function UnorderedList<T = any[]>({ items, children }: IProps<T>) {

    return (
        <UL>
            {items.map((item) => children(item))}
        </UL>
    )
}