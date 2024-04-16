import React from 'react';
import { Box, Typography } from '@mui/material';
import { assets } from 'src/assets/assets';

const ImageView = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gridArea: 'image',
                backgroundImage: `url(${assets.images.waterBg})`,
                backgroundSize: 'cover',
                flexGrow: 1,
                maxWidth: { xs: 1, md: '50vw' },
                p: { xs: 8, md: 12 },
                justifyContent: 'space-around',
            }}
        >
            <img
                alt=''
                src={assets.images.fullLogoText}
                width={300}
                height={70}
            />
            <Typography
                sx={{
                    fontSize: { xs: 40, md: 55 },
                    color: 'white',
                    fontWeight: '500',
                }}
            >
                World’s most trusted Water Intelligence Platform
            </Typography>

            <Typography
                sx={{
                    fontSize: 16,
                    color: 'white',
                    fontWeight: '400',
                    display: {
                        xs: 'none',
                        md: 'block',
                    },
                }}
            >
                AI & IoT based water management solution for making industries
                water positive
            </Typography>
        </Box>
    );
};

export default ImageView;
