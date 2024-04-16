import * as React from 'react';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { assets } from 'src/assets/assets';

const Toggle = ({
	size,
	onChange,
	isOn,
	restStyle,
	rest,
	checkColor = assets.colors.white,
	thumbColor = assets.colors.primary,
	uncheckColor = assets.colors.secondary,
}) => {
	const CustomSwitch = styled(Switch)(({ theme }) => ({
		'&MuiSwitch-root': {
			width: '64px',
		},
		padding: 6,
		'& .MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track': {
			opacity: 1,
			backgroundColor: checkColor,
		},
		'& .MuiSwitch-track': {
			borderRadius: 24 / 2,
			opacity: 1,
			backgroundColor: uncheckColor,
			'&:before, &:after': {
				content: '""',
				position: 'absolute',
				top: '50%',
				transform: 'translateY(-50%)',
				width: `${size || 20}`,
				height: `${size || 20}`,
			},
			'&:before': {
				left: 12,
			},
			'&:after': {
				right: 12,
			},
		},
		'& .MuiSwitch-thumb': {
			boxShadow: 'none',
			backgroundColor: thumbColor,
		},
	}));

	return (
		<FormGroup sx={{ ...restStyle }}>
			<FormControlLabel
				control={
					<CustomSwitch
						checked={isOn}
						onChange={onChange}
						{...rest}
					/>
				}
			/>
		</FormGroup>
	);
};

export default Toggle;
