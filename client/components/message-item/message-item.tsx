import { IMessage } from "@/services/messages";
import { Icon, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { FC } from "react";
import { MenuDropdown } from "..";

interface IProps {
	message: IMessage;
    onEdit: (message: IMessage) => void;
	onDelete: (message: IMessage) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
    listItem: {
        backgroundColor: theme.palette.primary.dark,
        borderRadius: 5,
        marginBottom: theme.spacing(1),
        padding: theme.spacing(1),
        paddingTop: 0
    },
    itemHeader: {
        display: 'flex',
        justifyContent: 'flex-end',
        '& > span': {
            cursor: 'pointer'
        }
    },
    paragraph: {
        marginBottom: '0px !important'
    }
}));

export const MessageItem: FC<IProps> = ({ message, onEdit, onDelete, children }) => {

	const classes = useStyles();

    const handleEdit = () => {
        if (typeof onEdit === 'function') {
            onEdit(message);
        }
    }

	const handleDelete = () => {
		if (typeof onDelete === "function") {
			onDelete(message);
		}
	};

	return (
		<li className={classes.listItem}>
            <div className={classes.itemHeader}>
                <MenuDropdown 
                    id="message-actions"
                    label={<Icon>more_horiz</Icon>}
                    items={[
                        {
                            label: 'Edit message',
                            action: handleEdit
                        },
                        {
                            label: 'Delete message',
                            action: handleDelete
                        }
                    ]}
                />
            </div>
			<Typography
                paragraph
                classes={{paragraph: classes.paragraph}}
            >
                {children}
            </Typography>
		</li>
	);
};
