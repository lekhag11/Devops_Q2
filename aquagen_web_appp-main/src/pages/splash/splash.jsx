import { Box } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from 'src/assets/assets';
import { AppStoreContext } from 'src/store/AppStore';
import { validateLogin } from 'src/controllers/splash/splashController';

function SplashScreen() {
    const navigate = useNavigate();
    const appStore = useContext(AppStoreContext);

    const [isValidated, setIsValidated] = useState(false);

    useEffect(() => {
        validateLogin(
            isValidated,
            setIsValidated,
            appStore.setLoginData,
            appStore.setSelectedCategory,
            navigate
        );
        // eslint-disable-next-line
    }, []);

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: assets.colors.primary,
            }}
            height='100vh'
        >
            <img
                alt=''
                src={assets.images.logo}
                height={160}
            />
        </Box>
    );
}

export default SplashScreen;
