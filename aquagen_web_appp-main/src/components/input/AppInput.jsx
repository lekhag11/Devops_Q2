import { React, useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { OutlinedInput } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

const AppInput = ({
    placeholder,
    label,
    type,
    variant,
    margin,
    padding,
    error,
    maxLength,
    customTheme,
    width,
    height,
    value,
    borderRadius,
    onChange,
    restStyle,
    endAdornment,
    numberTypeSetFunction,
    ...rest
}) => {
    const inputStyle = {
        margin: margin,
        width: width || '180px',
        ...restStyle,
    };

    const outlinedInputStyle = {
        borderRadius: borderRadius || '8px',
        padding: padding,
        height: height || '48px',
        background: '#fff',
    };

    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    const checkAdornment = () => {
        if (endAdornment) {
            return endAdornment;
        }
        if (type === 'password')
            return (
                <InputAdornment position='end'>
                    <IconButton onClick={handleTogglePasswordVisibility}>
                        {showPassword ? (
                            <VisibilityOffOutlinedIcon />
                        ) : (
                            <VisibilityOutlinedIcon />
                        )}
                    </IconButton>
                </InputAdornment>
            );
    };

    const handleNumberInput = (event, setValue) => {
        const inputValue = event.target.value;

        if (/^[0-9]*$/.test(inputValue)) {
            setValue(event.target.value);
        }
    };

    if (type === 'numberType') {
        return (
            <FormControl
                sx={inputStyle}
                {...rest}
                color={customTheme || 'primaryTheme'}
            >
                <OutlinedInput
                    placeholder={placeholder}
                    type={'text'}
                    onChange={(event) => {
                        handleNumberInput(event, numberTypeSetFunction);
                    }}
                    {...rest}
                    error={error}
                    value={value}
                    sx={outlinedInputStyle}
                    inputProps={{
                        maxLength: maxLength,
                    }}
                    endAdornment={checkAdornment()}
                />
            </FormControl>
        );
    }
    return (
        <FormControl
            sx={inputStyle}
            {...rest}
            color={customTheme || 'primaryTheme'}
        >
            <OutlinedInput
                placeholder={placeholder}
                type={showPassword ? 'text' : type || 'text'}
                onChange={onChange}
                {...rest}
                error={error}
                value={value}
                sx={outlinedInputStyle}
                inputProps={{
                    maxLength: maxLength,
                }}
                endAdornment={checkAdornment()}
            />
        </FormControl>
    );
};

export default AppInput;
