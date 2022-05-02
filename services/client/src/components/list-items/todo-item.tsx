import React from 'react';
import { styled } from '@mui/material/styles';
import { ITodo } from '../../services/todo-service';
import { Checkbox, Typography } from '@mui/material';
import { FlexBox } from '@components';

interface IProps {
    title: ITodo['title'];
    children: string;
}

const ListItem = styled('li')(({theme}) => ({
    marginBottom: theme.spacing(1),
    boxShadow: theme.shadows[2],
    borderRadius: 5
}));

export const TodoItem = ({ title, children }: IProps) => {

    return (
        <ListItem>
            <FlexBox direction="row">
                <FlexBox direction="column" width="10%">
                    <Checkbox 
                        value={false}
                        onChange={() => null}
                        inputProps={{
                            'aria-label': 'item done'
                        }}
                    />
                </FlexBox>
                <FlexBox direction="column" alignItems="flex-start" width="90%">
                    <Typography variant="h5">{title}</Typography>
                    <Typography variant="caption">{children}</Typography>
                </FlexBox>
            </FlexBox>
        </ListItem>
    )
}
