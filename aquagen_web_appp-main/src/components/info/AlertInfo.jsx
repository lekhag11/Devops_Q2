import React from 'react';
import { Box, Typography } from '@mui/material';

const AlertInfo = ({
    component = 'span',
    margin,
    padding = '0.6rem .75rem 0.5rem',
    background = 'rgba(79, 156, 218, 0.12);',
    borderRadius = '4px',
    fontColor = '#3A94B4',
    fontSize = '14px',
    fontWeight = '400',
    icon,
    value,
    textStyle,
    boxStyle,
    restStyle,
}) => {
    const containerStyle = {
        margin: margin,
        padding: padding,
        background: background,
        borderRadius: borderRadius,
        color: fontColor,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        ...boxStyle,
    };

    const fontStyle = {
        fontSize: fontSize,
        fontWeight: fontWeight,
        lineHeight: '18px',
        ...textStyle,
    };

    return (
        <Box
            sx={containerStyle}
            component={component}
            {...restStyle}
        >
            {icon}
            <Typography sx={fontStyle}>{value}</Typography>
        </Box>
    );
};

export default AlertInfo;
