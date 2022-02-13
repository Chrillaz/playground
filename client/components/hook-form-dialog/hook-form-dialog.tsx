import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Theme,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, {
	cloneElement,
	forwardRef,
	isValidElement,
	useImperativeHandle,
	useState,
} from 'react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';

export interface IHookFormDialogOptions {
    title?: string;
    content?: JSX.Element | string;
    cancelLabel?: string;
    submitLabel?: string;
    submitAction?: (values: FieldValues) => unknown | undefined;
}

export type HookFormDialogRef = {
    open: (providedOptions: IHookFormDialogOptions) => void;
};

const DEFAULT_OPTIONS = {
	title: "Edit",
	content: "React Hook Form dialog.",
	submitLabel: "Save",
	cancelLabel: "Cancel",
};

const useStyles = makeStyles((theme: Theme) => ({
	dialog: {
		minHeight: 400,
		padding: theme.spacing(2),
		"& .MuiTextField-root": {
			marginBottom: theme.spacing(2),
		},
	},
}));

export const HookFormDialog = forwardRef<HookFormDialogRef, object>((_props, ref) => {
		
    const classes = useStyles();

	const formMethods = useForm();

	const [isOpen, setIsOpen] = useState<boolean>(false);

	const [options, setOptions] =
		useState<IHookFormDialogOptions>(DEFAULT_OPTIONS);

	useImperativeHandle(ref, () => ({
		open: (providedOptions: IHookFormDialogOptions) => {
			setOptions({ ...options, ...providedOptions });
			setIsOpen(true);
		},
	}));

	const cleanUp = () => {
		setOptions(DEFAULT_OPTIONS);
		setIsOpen(false);
		formMethods.reset();
	};

	const handleSubmit = () => {
		if (typeof options.submitAction === "function") {
			options.submitAction(formMethods.getValues());
		}

		cleanUp();
	};

	return (
		<Dialog
			open={isOpen}
			onClose={cleanUp}
			maxWidth="md"
            fullWidth
			classes={{ paper: classes.dialog }}
		>
			<FormProvider {...formMethods}>
				<DialogTitle>{options.title}</DialogTitle>
				<DialogContent>
					{isValidElement(options.content)
						? cloneElement(options.content)
						: options.content}
				</DialogContent>
				<DialogActions>
					<Button onClick={cleanUp}>{options.cancelLabel}</Button>
					<Button color="primary" onClick={handleSubmit}>
						{options.submitLabel}
					</Button>
				</DialogActions>
			</FormProvider>
		</Dialog>
	);
});
