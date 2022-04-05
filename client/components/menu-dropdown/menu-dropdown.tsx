import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { makeStyles } from "@mui/styles";

interface IProps {
	id: string;
	label: string | JSX.Element;
    title: string;
	items: {
		label: string;
		action: (...args: any[]) => unknown;
	}[];
}

const useStyles = makeStyles({
	buttonRoot: {
		minWidth: 'auto !important',
        color: '#fff'
	},
});

/**
 * Whole abstraction of MUI menu
 * 
 * @param id string
 * @param label string
 * @param items Array
 * 
 * @link https://mui.com/components/menus/#main-content 
 */
export const MenuDropdown = ({ id, label, title, items }: IProps) => {

	const classes = useStyles();

	const [anchorEl, setAnchorEl] = useState(null);

	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<Button
				id={`${id}-button`}
				aria-controls={open ? `${id}-menu` : undefined}
				aria-haspopup="true"
				aria-expanded={open ? "true" : undefined}
                role="button"
                title={title}
				onClick={handleClick}
				size="small"
				classes={{ sizeSmall: classes.buttonRoot }}
			>
				{label}
			</Button>
			<Menu
				id={`${id}-menu`}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					"aria-labelledby": `${id}-button`,
				}}
			>
				{items.map((item, index) => (
					<MenuItem 
                        key={index} 
                        onClick={() => {
                            item.action();
                            handleClose();
                        }}
                    >
						{item.label}
					</MenuItem>
				))}
			</Menu>
		</div>
	);
};
