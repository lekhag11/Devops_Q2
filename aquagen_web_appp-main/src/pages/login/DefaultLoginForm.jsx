import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Link,
    Typography,
} from '@mui/material';
import { LocalDBInstance, LocalDBKeys } from 'src/services/localdb/localdb';
import { AppStoreContext } from 'src/store/AppStore';
import { handleNavigationOnResponse } from 'src/utils/navigationHelper';
import CloseIcon from '@mui/icons-material/Close';
import { LoginTypes } from 'src/controllers/splash/splashController';
import { LoginController } from 'src/controllers/login/loginController';
import AppInput from 'src/components/input/AppInput';
import AppGesture from 'src/components/gesture/AppGesture';
import { assets } from 'src/assets/assets';
import AppButton from 'src/components/button/AppButton';
import { AnalyticEvents } from 'src/enums/analyticsEnum';
import { AnalyticsService } from 'src/services/analytics/analyticsService';

const DefaultLoginForm = () => {
    const navigate = useNavigate();

    const appStore = useContext(AppStoreContext);

    const [username, setUsername] = React.useState('');

    const [defaultLoading, setDefaultLoading] = React.useState(false);

    const [password, setPassword] = React.useState('');

    const [usernameError, setUsernameError] = React.useState(false);

    const [passwordError, setPasswordError] = React.useState(false);

    const [errorMessage, setErrorMessage] = React.useState(undefined);

    const [forgotPasswordDialog, setForgotPasswordDialog] =
        React.useState(false);

    async function handleOnDefaultLoginClick() {
        if (username.length < 4) {
            setUsernameError(true);
            setErrorMessage('Please enter valid username');
            return;
        } else {
            setUsernameError(false);
        }
        if (password.length < 5) {
            setPasswordError(true);
            setErrorMessage('Please enter valid password');
            return;
        } else {
            setPasswordError(false);
        }

        if (username.includes(' ')) {
            setUsernameError(true);
            setErrorMessage("Username shouldn't contains space.");
            return;
        } else {
            setUsernameError(false);
        }

        if (password.includes(' ')) {
            setPasswordError(true);
            setErrorMessage("Password shouldn't contains space.");
            return;
        } else {
            setPasswordError(false);
        }

        setErrorMessage(undefined);
        setDefaultLoading(true);
        LocalDBInstance.setItem(LocalDBKeys.loginType, LoginTypes.default);

        AnalyticsService.sendEvent(AnalyticEvents.DEFAULT_LOGIN_CLICK, {
            username: username,
        });

        let response = await LoginController.defaultLogin(username, password);
        if (!response) {
            AnalyticsService.sendEvent(AnalyticEvents.DEFAULT_LOGIN_ERROR, {
                username: username,
            });
            setUsernameError(true);
            setPasswordError(true);
            setErrorMessage('Invalid Credentials');
        }
        setDefaultLoading(false);
        handleNavigationOnResponse(
            response,
            appStore.setLoginData,
            appStore.setSelectedCategory,
            navigate
        );
    }

    return (
        <>
            <Typography variant='h5'>Log in</Typography>
            <AppInput
                placeholder='Enter Username'
                value={username}
                onChange={(event) => {
                    setUsername(event.target.value);
                }}
                width={1}
                maxLength={25}
                error={usernameError}
                restStyle={{
                    mt: 2,
                }}
            />
            <AppInput
                placeholder='Enter Password'
                value={password}
                onChange={(event) => {
                    setPassword(event.target.value);
                }}
                maxLength={30}
                width={1}
                error={passwordError}
                restStyle={{
                    mt: 2,
                }}
                type='password'
            />

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    my: 1,
                }}
            >
                <Typography
                    color='red'
                    fontSize={14}
                >
                    {errorMessage}
                </Typography>
                <AppGesture onClick={() => setForgotPasswordDialog(true)}>
                    <Typography color='#4176FF'>Forgot Password?</Typography>
                </AppGesture>
            </Box>

            <Dialog
                open={forgotPasswordDialog}
                onClose={() => setForgotPasswordDialog(false)}
            >
                <DialogContent
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <div></div>
                    <img
                        alt='logo'
                        height={30}
                        src={assets.images.fullLogoText}
                    />

                    <IconButton onClick={() => setForgotPasswordDialog(false)}>
                        <CloseIcon sx={{ strokeWidth: 1 }} />
                    </IconButton>
                </DialogContent>

                <DialogTitle
                    fontSize={16}
                    id='alert-dialog-slide-description'
                >
                    Please contact{' '}
                    <Link
                        underline='hover'
                        sx={{
                            cursor: 'pointer',
                            textDecorationLine: 'underline',
                        }}
                        onClick={() =>
                            (window.location =
                                'mailto:projectsupport@fluxgentech.com')
                        }
                    >
                        projectsupport@fluxgentech.com
                    </Link>{' '}
                    to change your password
                </DialogTitle>
            </Dialog>

            <AppButton
                width='100%'
                value='Log In'
                isLoading={defaultLoading}
                onClick={handleOnDefaultLoginClick}
            />
        </>
    );
};

export default DefaultLoginForm;
