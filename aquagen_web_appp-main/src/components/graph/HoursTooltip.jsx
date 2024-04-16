import React from 'react';
import { Box, Typography } from '@mui/material';

import If from '../logical/If';
import IfNot from '../logical/IfNot';

const HoursTooltip = ({
    active,
    payload,
    label,
    siUnit = 'kl',
    comparisonMode,
    tooltipBoxShadow = '0px 5px 15px 0px rgba(0,0,0,0.3)',
    tooltipBackgroundColor = '#ffffff',
    tooltipBorderRadius = 4,
    mainValue,
    comparisonValue,
    tooltipfontColor,
    tooltipWrapperStyle,
    mainColor,
    comparisonColor,
}) => {
    if (active && payload && payload.length) {
        return (
            <Box
                sx={{
                    boxShadow: tooltipBoxShadow,
                    borderRadius: `${tooltipBorderRadius}px`,
                    backgroundColor: tooltipBackgroundColor,
                    padding: 1,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <IfNot condition={comparisonMode}>
                    <Box
                        sx={{
                            display: 'flex',
                            mt: 1,
                            flexDirection: 'column',
                            borderLeft: `2px solid ${mainColor}`,
                            pl: 1,
                        }}
                    >
                        <Typography>
                            <span
                                style={{
                                    fontSize: '16px',
                                    fontWeight: '400',
                                    color: '#808080',
                                }}
                            >
                                {`${payload[0].payload.tooltip}`.toUpperCase()}
                            </span>
                        </Typography>
                        <Typography>
                            <span
                                style={{ fontWeight: 'bold', fontSize: '20px' }}
                            >{`${payload[0].payload.y1} ${siUnit}`}</span>
                        </Typography>
                    </Box>
                </IfNot>
                <If condition={comparisonMode}>
                    <Box
                        sx={{
                            padding: 0,
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <Typography>
                            <span
                                style={{
                                    fontSize: '16px',
                                    fontWeight: '400',
                                    color: '#808080',
                                }}
                            >
                                {`${payload[0].payload.tooltip}`.toUpperCase()}
                            </span>
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            mt: 1,
                            flexDirection: 'column',
                            borderLeft: `2px solid ${mainColor}`,
                            pl: 1,
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '12px',
                                fontWeight: '400',
                                color: '#808080',
                            }}
                        >
                            {mainValue}
                        </Typography>
                        <Typography>
                            <span
                                style={{ fontWeight: 'bold', fontSize: '20px' }}
                            >{`${payload[0].payload.y1} ${siUnit}`}</span>
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            mt: 1,
                            flexDirection: 'column',
                            borderLeft: `2px solid ${comparisonColor}`,
                            pl: 1,
                        }}
                    >
                        <div>
                            <Typography
                                sx={{
                                    fontSize: '12px',
                                    fontWeight: '400',
                                    color: '#808080',
                                }}
                            >
                                Compared to {comparisonValue}
                            </Typography>
                        </div>

                        <Typography>
                            <span
                                style={{ fontWeight: 'bold', fontSize: '20px' }}
                            >{`${payload[0].payload.y2} ${siUnit}`}</span>
                        </Typography>
                    </Box>
                </If>
            </Box>
        );
    }

    return <>{'ToolTip'}</>;
};

export default HoursTooltip;
