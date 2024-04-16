import React from 'react';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import { assets } from 'src/assets/assets';

const RadioButton = ({ value, checked, borderWidth, borderRadius = '4px', borderColor, background = '#fff', label, width, height, padding = '8px', restStyle, ...rest }) => {
    const radioStyle = {
        width: width,
        height: height,
        padding: padding,
        border: `${borderWidth || 1}px solid ${borderColor || 'grey'}`,
        borderRadius: borderRadius,
        background: checked ? background : '#ebebeb',
        color: assets.colors.primary,
        '& .MuiFormControlLabel-label': {
            paddingRight: '4px',
            fontWeight: '600',
        },
        ...restStyle,
    };

    return (
        <FormControlLabel
            value={value}
            sx={radioStyle}
            control={
                <Radio
                    checked={checked}
                    sx={{
                        paddingRight: '6px',
                        '&, &.Mui-checked': {
                            color: assets.colors.primary,
                        },
                    }}
                    {...rest}
                />
            }
            label={label}
        />
    );
};

export default RadioButton;
