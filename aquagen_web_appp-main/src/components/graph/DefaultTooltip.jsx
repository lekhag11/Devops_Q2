import React from 'react';
import { Box, Typography } from '@mui/material';
import { Formatter } from 'src/utils/formatter';

const DefaultTooltip = ({
    active,
    payload,
    label,
    tooltipWrapperStyle,
    siUnit = 'kl',
    tooltipLabelSize = '16px',
    tooltipValueSize = '14px',
    tooltipPadding = '8px',
    tooltipBoxShadow = '0px 5px 15px 0px rgba(0,0,0,0.3)',
    tooltipBackgroundColor = '#ffffff',
    tooltipBorderRadius = 4,
    tooltipContentStyle,
    tooltipfontColor,
}) => {
    const sx = {
        padding: tooltipPadding,
        boxShadow: tooltipBoxShadow,
        borderRadius: `${tooltipBorderRadius}px`,
        backgroundColor: tooltipBackgroundColor,
        ...tooltipWrapperStyle,
    };

    if (active && payload && payload.length) {
        return (
            <Box sx={sx}>
                {payload.map((entry, index) => (
                    <Typography
                        key={index}
                        sx={{
                            display: 'block',
                            fontWeight: 500,
                            fontSize: tooltipLabelSize,
                            color: tooltipfontColor
                                ? tooltipfontColor
                                : index === 0
                                ? entry.color
                                : entry.color,
                            ...tooltipContentStyle,
                        }}
                    >
                        <Box
                            component={'span'}
                            fontWeight={500}
                            fontSize={tooltipValueSize}
                        >
                            {`${Formatter.valueFormatter(
                                entry.value,
                                undefined,
                                2,
                                0
                            )}  ${siUnit}`}
                        </Box>
                    </Typography>
                ))}
            </Box>
        );
    }

    return <>{'ToolTip'}</>;
};

export default DefaultTooltip;
