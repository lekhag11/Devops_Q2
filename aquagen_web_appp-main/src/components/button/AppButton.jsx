import React from 'react';
import Button from '@mui/material/Button';
import { CircularProgress } from '@mui/material';

const AppButton = ({
    onClick,
    isLoading,
    variant,
    customTheme,
    disabled,
    backgroundColor,
    value,
    height = '48px',
    width,
    borderRadius = '8px',
    borderColor,
    color,
    fontSize,
    startIcon,
    endIcon,
    progressSize,
    progressTheme,
    restStyle,
    disabledColor = 'lightgray',
    my = 2,
    ...rest
}) => {
    const buttonStyle = {
        width: width,
        height: height,
        borderRadius: borderRadius,
        backgroundColor: backgroundColor,
        color: color,
        fontSize: fontSize,
        borderColor: borderColor,
        textTransform: 'none',
        my: my,
        '&:hover': {
            backgroundColor: backgroundColor,
            color: color,
        },
        '&.Mui-disabled': {
            backgroundColor: disabledColor,
        },
        ...restStyle,
    };

    return (
        <Button
            sx={buttonStyle}
            variant={variant ? variant : 'contained'}
            color={customTheme || 'primaryTheme'}
            startIcon={startIcon}
            endIcon={endIcon}
            onClick={onClick}
            disabled={disabled}
            {...rest}
        >
            {!isLoading ? (
                value || 'Button'
            ) : (
                <CircularProgress
                    size={progressSize || '2rem'}
                    color={progressTheme || 'whiteTheme'}
                />
            )}
        </Button>
    );
};

export default AppButton;
