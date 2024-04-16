import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import { Box, GlobalStyles, Typography } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { assets } from 'src/assets/assets';
import { loginRequest } from 'src/authConfig';
import AppButton from 'src/components/button/AppButton';
import { LoginTypes } from 'src/controllers/splash/splashController';
import { LocalDBInstance, LocalDBKeys } from 'src/services/localdb/localdb';
import SmartScreenIcon from '@mui/icons-material/SmartScreen';
import { LoginController } from 'src/controllers/login/loginController';
import If from 'src/components/logical/If';
import { constants } from 'src/constants/constants';
import DefaultLoginForm from 'src/pages/login/DefaultLoginForm';
import OtpLoginForm from 'src/pages/login/OtpLoginForm';
import ImageView from 'src/pages/login/ImageView';

function LoginScreen() {
    const { instance, accounts } = useMsal();

    const isAuthenticated = useIsAuthenticated();

    const navigate = useNavigate();

    const [microsoftLoading, setMicrosoftLoading] = React.useState(false);

    const handleMicrosoftLogin = () => {
        setMicrosoftLoading(true);
        LocalDBInstance.setItem(LocalDBKeys.loginType, LoginTypes.microsoft);
        instance.loginRedirect(loginRequest).catch((e) => {
            console.log(e);
        });
    };

    const [isPasswordLogin, setIsPasswordLogin] = useState(true);

    const handleLoginFormToggle = () => {
        setIsPasswordLogin(!isPasswordLogin);
    };

    useEffect(() => {
        if (isAuthenticated) {
            if (microsoftLoading) {
                return;
            }
            LoginController.microsoftLogin(instance, accounts, navigate);
        }
    }, [isAuthenticated, microsoftLoading, instance, accounts, navigate]);

    const globelCssStyle = {
        'input::-ms-reveal, input::-ms-clear': {
            display: 'none',
        },
    };

    return (
        <>
            <GlobalStyles styles={globelCssStyle} />
            <Box
                height='100vh'
                sx={{
                    display: { xs: 'flex', md: 'grid' },
                    flexDirection: 'column',
                    gridTemplateAreas: {
                        xs: `"image image"
                        "login login"`,
                        md: `"image login"`,
                    },
                    gridTemplateRows: 'auto',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                }}
            >
                <ImageView />
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Box
                        sx={{
                            flexDirection: 'column',
                            gridArea: 'login',
                            maxWidth: 400,
                            m: 5,
                        }}
                    >
                        <If condition={isPasswordLogin}>
                            <DefaultLoginForm />
                        </If>
                        <If condition={!isPasswordLogin}>
                            <OtpLoginForm />
                        </If>

                        <Box
                            sx={{
                                my: 2.5,
                                maxWidth: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: assets.colors.primary,
                                height: '1px',
                            }}
                        >
                            <Typography
                                sx={{
                                    px: 2,
                                    fontSize: 20,
                                    fontWeight: 500,
                                    color: assets.colors.primary,
                                    background: '#ffffff',
                                }}
                            >
                                or
                            </Typography>
                        </Box>

                        <AppButton
                            id={'.bottom-button-toggle-fotm'}
                            variant={'outlined'}
                            startIcon={
                                isPasswordLogin ? (
                                    <img
                                        alt='loginWithOtp'
                                        width={26}
                                        height={26}
                                        src={assets.images.loginOtpToggle}
                                    />
                                ) : (
                                    <SmartScreenIcon fontSize='small' />
                                )
                            }
                            value={`Login with ${
                                isPasswordLogin ? 'OTP' : 'Password'
                            }`}
                            width={'100%'}
                            fontSize={'15px'}
                            onClick={handleLoginFormToggle}
                            restStyle={{
                                fontWeight: 600,
                                position: 'relative',
                                '& .MuiButton-startIcon': {
                                    position: 'absolute',
                                    left: 16,

                                    '& svg': {
                                        fontSize: '28px',
                                    },
                                },
                            }}
                        />

                        <If condition={constants.microsoftSignInEnabled}>
                            <AppButton
                                width='100%'
                                value='SIGN IN WITH MICROSOFT'
                                backgroundColor={deepOrange[600]}
                                isLoading={microsoftLoading}
                                onClick={handleMicrosoftLogin}
                                startIcon={
                                    <img
                                        alt='Microsoft'
                                        width={20}
                                        height={20}
                                        src={assets.images.microsoftLogo}
                                    />
                                }
                            />
                        </If>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                mt: '40px',
                                alignItems: 'center',
                            }}
                        >
                            <Typography sx={{ mr: 2 }}>Powered by</Typography>
                            <img
                                alt=''
                                src={assets.images.fluxgenLogo}
                                height={45}
                                width={100}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default LoginScreen;
