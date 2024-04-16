import { Box, Typography } from '@mui/material';
import { assets } from 'src/assets/assets';

function SingleTotalView({ title, value }) {
    return (
        <Box
            sx={{
                display: 'flex',
                border: 1,
                backgroundColor: 'white',
                borderColor: assets.colors.borderColor,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexGrow: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    py: 1,
                    borderTopRightRadius: 1.8,
                    borderBottomRightRadius: 1.8,
                    backgroundColor: assets.colors.primary,
                }}
            >
                <Typography
                    color='white'
                    fontWeight='700'
                >
                    {title}
                </Typography>
            </Box>
            <Typography
                sx={{
                    display: 'flex',
                    flexGrow: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    py: 1,
                }}
                fontWeight='bold'
                fontSize='20px'
            >
                {value}
            </Typography>
        </Box>
    );
}

export default SingleTotalView;
