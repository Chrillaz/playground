import { IMessage } from "@/services/messages";
import { Button, Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { InputControl } from "../input-control/input-control";

interface IProps {
	onSubmit: (message: IMessage) => void;
}

const useStyles = makeStyles({
	multilineColor: {
		"& .MuiInputBase-input": {
			color: "white",
		},
	},
    actionContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: 8
    }
});

export const MessageAppender: FC<IProps> = ({ onSubmit }) => {
	const classes = useStyles();

	const formMethods = useForm();

	const handleSubmit = () => {
		if (typeof onSubmit === "function") {
			onSubmit({ ...formMethods.getValues() } as IMessage);
            formMethods.reset({ message: '' });
		}
	};

	return (
		<Container maxWidth="md">
			<FormProvider {...formMethods}>
				<InputControl
					focused
					multiline
                    fullWidth
					name="message"
					variant="outlined"
					size="small"
					InputProps={{
						className: classes.multilineColor,
					}}
				/>
				<div className={classes.actionContainer}>
					<Button
						variant="contained"
						color="primary"
						onClick={handleSubmit}
					>
						Submit
					</Button>
				</div>
			</FormProvider>
		</Container>
	);
};
