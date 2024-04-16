import React from 'react';
import { Box, Tooltip } from '@mui/material';
import OfflineBoltRoundedIcon from '@mui/icons-material/OfflineBoltRounded';
import { assets } from 'src/assets/assets';

const EnergyIndicator = ({ isLoading }) => {
    return (
        <Tooltip
            title={isLoading ? 'Consumption in Progress' : 'No Consumption'}
            disableFocusListener
            disableInteractive
            arrow
        >
            <Box
                sx={{
                    background: assets.colors.orange,
                    borderRadius: '50%',
                    display: 'grid',
                    placeItems: 'center',
                    position: 'absolute',
                    right: '-10px',
                    bottom: '-10px',
                    animation: isLoading ? 'blink 1s linear infinite' : '',
                    filter: isLoading ? '' : 'grayscale(100%)',
                }}
            >
                <OfflineBoltRoundedIcon
                    sx={{ fill: '#ffffff' }}
                    fontSize='small'
                />
            </Box>
        </Tooltip>
    );
};

export default EnergyIndicator;
