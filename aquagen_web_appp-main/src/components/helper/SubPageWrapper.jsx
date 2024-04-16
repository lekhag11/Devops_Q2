import { Box } from '@mui/material';
import React from 'react';

const SubPageWrapper = ({ children, restSx }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                width: `calc(100vw - (100vw - 100%))`,
                ...restSx,
            }}
        >
            {children}
        </Box>
    );
};

export default SubPageWrapper;
