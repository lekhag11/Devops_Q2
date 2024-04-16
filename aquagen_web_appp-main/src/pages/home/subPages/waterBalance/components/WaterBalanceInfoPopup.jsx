import React from 'react';
import { Box, Typography } from '@mui/material';
import {
    BasicInfoAssets,
    BasicInfoEnumArray,
    BasicInfoLabel,
} from 'src/enums/waterBalanceEnums';

const WaterBalanceInfoPopup = ({ openInfoPopup }) => {
    return (
        <Box
            sx={{
                display: openInfoPopup ? 'block' : 'none',
                background: '#fff',
                width: '100%',
                position: 'relative',
                padding: '14px',
            }}
        >
            <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
                Balance Diagram Info
            </Typography>
            {BasicInfoEnumArray.map((element, index) => (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        marginTop: '4px',
                        paddingLeft: '8px',
                    }}
                    key={index}
                >
                    <img
                        src={BasicInfoAssets[element]}
                        alt=''
                        style={{
                            width: '100%',
                            maxWidth: '20px',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                    />
                    <Typography sx={{ p: '4px', paddingLeft: 2, fontSize: 14 }}>
                        {BasicInfoLabel[element]}
                    </Typography>
                </Box>
            ))}
        </Box>
    );
};

export default WaterBalanceInfoPopup;
