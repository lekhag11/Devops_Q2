import React from 'react';
import { Box, Tooltip } from '@mui/material';

const ConsumptionIndicator = ({ isLoading, rightPosition = true }) => {
    return (
        <Tooltip
            title={isLoading ? 'Consumption in Progress' : 'No Consumption'}
            disableFocusListener
            disableInteractive
            arrow
        >
            <Box
                sx={{
                    background: '#DCF3FC',
                    borderRadius: '50%',
                    display: 'grid',
                    placeItems: 'center',
                    position: 'absolute',
                    right: rightPosition ? '-10px' : 'auto',
                    left: rightPosition ? 'auto' : '-10px',
                    bottom: '-10px',
                    animation: isLoading ? 'blink 1s linear infinite' : '',
                    filter: isLoading ? '' : 'grayscale(100%)',
                }}
            >
                <svg
                    width='22'
                    height='22'
                    viewBox='0 0 16 16'
                    fill='none'
                    transform='translate(-3 -3)'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <g clipPath='url(#clip0_4442_4419)'>
                        <path
                            d='M9.99998 15C11.9298 15 13.5 13.4245 13.5 11.4879C13.5 9.59118 10.2198 5.2864 10.0801 5.10413L9.99998 5L9.91984 5.10481C9.78033 5.28674 6.5 9.59182 6.5 11.4882C6.50004 13.4245 8.07019 15 9.99998 15Z'
                            fill='#82D1ED'
                        />
                    </g>
                    <defs>
                        <clipPath id='clip0_4442_4419'>
                            <rect
                                width='10'
                                height='10'
                                fill='white'
                                transform='translate(5 5)'
                            />
                        </clipPath>
                    </defs>
                </svg>
            </Box>
        </Tooltip>
    );
};

export default ConsumptionIndicator;
