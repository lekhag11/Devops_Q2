import React from 'react';
import Box from '@mui/material/Box';
import FiberNewOutlinedIcon from '@mui/icons-material/FiberNewOutlined';

const NewFeatureTag = ({ title, hidden = false, children }) => {
    return (
        <Box
            position='relative'
            display='inline-block'
        >
            {children}
            <FiberNewOutlinedIcon
                fontSize='large'
                sx={{
                    position: 'absolute',
                    top: '-110%',
                    right: '-15%',
                }}
            />
        </Box>
    );
};

export default NewFeatureTag;
