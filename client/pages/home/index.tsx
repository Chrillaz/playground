import React, { useRef } from "react";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import { useMessages } from "@/hooks/useMessages";
import { InputControl, MessageAppender, MessageItem, MessageList } from "@/components";
import {
	HookFormDialog,
	HookFormDialogRef,
} from "@/components/hook-form-dialog/hook-form-dialog";
import { IMessage } from "@/services/messages";

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		display: "flex",
		flex: "1 1 100%",
		width: "100%",
		flexDirection: "column",
		backgroundColor: theme.palette.background.default,
		[theme.breakpoints.up("md")]: {
			flexDirection: "row",
		},
	},
	main: {
		display: "flex",
		flexDirection: "column",
		flex: "1 1 100%",
		textAlign: "center",
		color: "#fff",
		margin: "auto",
	},
	aside: {
		width: "100%",
		flexShrink: 0,
		backgroundColor: theme.palette.grey[900],
		[theme.breakpoints.up("md")]: {
			width: "270px",
		},
	},
}));

function Home() {

	const classes = useStyles();

	const { messages, addMessage, removeMessage, updateMessage } = useMessages();

	const formRef = useRef<HookFormDialogRef | null>(null);

	const handleEdit = (message: IMessage) => {

		return formRef.current.open({
			title: "Edit message",
			content: <InputControl name="message" defaultValue={message.message} multiline fullWidth />,
			submitAction: (values) => updateMessage({
                ...message,
                ...values
            })
		});
	};

	return (
		<div className={classes.root}>
			<main className={classes.main} role="main">
				<h2>Submit a message.</h2>
				<MessageAppender onSubmit={addMessage} />
			</main>
			<aside className={classes.aside}>
				<MessageList messages={messages}>
					{(message) => (
						<MessageItem 
                            message={message} 
                            onEdit={handleEdit}
                            onDelete={removeMessage}
                        >
							{message.message}
						</MessageItem>
					)}
				</MessageList>
			</aside>
			<HookFormDialog ref={formRef} />
		</div>
	);
}

export default Home;
