import { CircularProgress } from '@mui/material';

function CustomLoader({ theme = 'primaryTheme', sx, ...props }) {
    return (
        <>
            <CircularProgress
                color={theme}
                sx={{ ...sx }}
                {...props}
            />
        </>
    );
}

export default CustomLoader;
