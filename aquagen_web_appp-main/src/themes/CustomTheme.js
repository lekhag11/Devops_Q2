import { createTheme } from '@mui/material';
import { assets } from 'src/assets/assets';

const CustomTheme = createTheme({
    palette: {
        primaryTheme: {
            main: assets.colors.primary,
            contrastText: assets.colors.white,
        },
        secondaryTheme: {
            main: assets.colors.secondary,
            contrastText: assets.colors.white,
        },
        whiteTheme: {
            main: assets.colors.white,
            contrastText: assets.colors.primary,
        },
        energyTheme: {
            main: assets.colors.orange,
            contrastText: assets.colors.white,
        },
    },
});

export default CustomTheme;
