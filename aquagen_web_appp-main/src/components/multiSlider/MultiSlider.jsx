import { Box, Slider } from '@mui/material';
import { useState } from 'react';

function MultiSlider(props) {
	const { values, min, max, thresholdMarks, style, ...rest } = props;

	const [value, setValue] = useState(values);

	const onChange = (e, tValues) => {
		const [minVal, maxVal] = tValues;
		if (maxVal > minVal && maxVal !== minVal) {
			setValue(tValues);
		}
	};

	return (
		<Box
			sx={{
				width: '100%',
				margin: '16px',
			}}
		>
			<Slider
				sx={{
					'& .MuiSlider-track': {
						background: 'red',
						borderColor: 'white',
					},
					'& .MuiSlider-thumb': {
						background: 'white',
						'& span': {
							background: 'black',
						},
					},
					'& .MuiSlider-mark': {
						background: 'none',
					},
					'& .MuiSlider-rail': {
						background: `linear-gradient(to right, red 0% ${20}%, green ${20}% ${50}%, red ${50}% 100%)`,
					},
					'& .MuiSlider-valueLabel': {},
					...style,
				}}
				valueLabelDisplay='on'
				valueLabelFormat={(x) => `${x} PPM`}
				value={value}
				min={min}
				max={max}
				scale={(x) => x}
				marks={[
					{ value: min, label: min },

					{ value: max / 2, label: max / 2 },
					{ value: -min * 2, label: -min * 2 },

					{ value: max, label: max },
				]}
				onChange={onChange}
				// disabled
				{...rest}
			/>
		</Box>
	);
}

export default MultiSlider;
