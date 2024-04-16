import React, { useContext, useEffect, useState } from 'react';
import { Box, ButtonBase, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AppStoreContext } from 'src/store/AppStore';
import { LocalDBInstance, LocalDBKeys } from 'src/services/localdb/localdb';
import { handleNavigationOnResponse } from 'src/utils/navigationHelper';
import { LoginTypes } from 'src/controllers/splash/splashController';
import { LoginController } from 'src/controllers/login/loginController';
import AppInput from 'src/components/input/AppInput';
import AppButton from 'src/components/button/AppButton';
import { OtpLoginCheck } from 'src/utils/otpLoginChecks';
import If from 'src/components/logical/If';
import StopWatch from 'src/components/clock/stopWatch';
import { constants } from 'src/constants/constants';
import { assets } from 'src/assets/assets';
import { AnalyticsService } from 'src/services/analytics/analyticsService';
import { AnalyticEvents } from 'src/enums/analyticsEnum';

const OtpLoginForm = () => {
    const navigate = useNavigate();

    const appStore = useContext(AppStoreContext);

    const [phNumber, setPhNumber] = useState('');

    const [otpValue, setOtpValue] = useState('');

    const [otpLoginLoading, setOtpLoginLoading] = useState(false);

    const [phNumberLoading, setPhNumberLoading] = useState(false);

    const [phNumberError, setPhNumberError] = useState(false);

    const [otpValueError, setOtpValueError] = useState(false);

    const [otpErrorMessage, setOtpErrorMessage] = useState(undefined);

    const [resentOtp, setResendOtp] = useState(false);

    const [showTimer, setShowTimer] = useState(false);

    const [sendOtpDisabled, setSendOtpDisabled] = useState(false);

    const [otpTimestamp, setOtpTimestamp] = useState('');

    const [loginButtonDisabled, setLoginButtonDisabled] = useState(true);

    const [phNumberFieldDisable, setPhNumberFieldDisable] = useState(false);

    async function handleOtpSent(analyticsEvent) {
        setResendOtp(false);
        setOtpValueError(false);

        const phnErrorCheck = OtpLoginCheck.numberCheck(phNumber);

        setPhNumberError(phnErrorCheck.isError);
        if (phnErrorCheck.isError) {
            setOtpErrorMessage(phnErrorCheck.errorMessage);
            return;
        }
        setOtpErrorMessage('');
        setPhNumberLoading(true);

        AnalyticsService.sendEvent(analyticsEvent, {
            phNumber: phNumber,
        });

        let response = await LoginController.otpPhnCheck(phNumber);

        if (!response) {
            setPhNumberError(true);
            setOtpErrorMessage('Number Not Registered');
            AnalyticsService.sendEvent(AnalyticEvents.SEND_OTP_ERROR, {
                phNumber: phNumber,
            });
        }

        setPhNumberLoading(false);

        if (response?.status === 'Success') {
            setOtpTimestamp(response?.otpTimestamp);
            setPhNumberFieldDisable(true);
            setOtpErrorMessage('OTP sent successfully');
            setSendOtpDisabled(true);
            setShowTimer(true);
            setTimeout(() => {
                setResendOtp(true);
                setShowTimer(false);
            }, constants.resendOtpTime * 1000);
            return;
        }
    }

    async function handleOtpLogin() {
        const otpErrorCheck = OtpLoginCheck.otpCheck(otpValue);

        setOtpValueError(otpErrorCheck.isError);
        if (otpErrorCheck.isError) {
            setOtpErrorMessage(otpErrorCheck.errorMessage);
            return;
        }

        setOtpErrorMessage('');
        setOtpLoginLoading(true);

        LocalDBInstance.setItem(LocalDBKeys.loginType, LoginTypes.otp);

        AnalyticsService.sendEvent(AnalyticEvents.OTP_LOGIN_CLICK, {
            phNumber: phNumber,
        });

        let response = await LoginController.otpLogin(
            phNumber,
            otpValue,
            otpTimestamp
        );
        if (!response) {
            setOtpValueError(true);
            setOtpErrorMessage('Invalid OTP');
            AnalyticsService.sendEvent(AnalyticEvents.OTP_LOGIN_ERROR, {
                phNumber: phNumber,
            });
        }
        setOtpLoginLoading(false);
        handleNavigationOnResponse(
            response,
            appStore.setLoginData,
            appStore.setSelectedCategory,
            navigate
        );
    }

    useEffect(() => {
        OtpLoginCheck.lengthCheck(6, otpValue.length, setLoginButtonDisabled);
    }, [otpValue]);

    return (
        <>
            <Typography variant='h5'>Log in</Typography>
            <AppInput
                type={'numberType'}
                placeholder='Enter Registered Mobile No.'
                value={phNumber}
                numberTypeSetFunction={setPhNumber}
                width={1}
                maxLength={10}
                padding='0px 5px 0px 0px'
                error={phNumberError}
                disabled={phNumberFieldDisable}
                restStyle={{
                    mt: 2,
                }}
                endAdornment={
                    <AppButton
                        value={'Send OTP'}
                        height='38px'
                        width='120px'
                        borderRadius='8px'
                        restStyle={{
                            padding: '0px',
                            '&.Mui-disabled': {
                                backgroundColor: '#C2D0D4',
                                color: '#ffffff',
                            },
                        }}
                        disabled={sendOtpDisabled}
                        isLoading={phNumberLoading}
                        onClick={() =>
                            handleOtpSent(AnalyticEvents.SEND_OTP_CLICK)
                        }
                    />
                }
            />
            <AppInput
                placeholder='Enter OTP'
                value={otpValue}
                type={'numberType'}
                numberTypeSetFunction={setOtpValue}
                maxLength={6}
                width={1}
                error={otpValueError}
                restStyle={{
                    mt: 2,
                }}
            />

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    my: 1,
                }}
            >
                <Typography
                    color={phNumberError || otpValueError ? 'red' : 'green'}
                    fontSize={phNumberError || otpValueError ? 14 : 16}
                >
                    {otpErrorMessage}
                </Typography>

                <If condition={resentOtp || !showTimer}>
                    <ButtonBase
                        onClick={() => handleOtpSent(AnalyticEvents.RESEND_OTP)}
                        sx={{
                            visibility: resentOtp ? 'visible' : 'hidden',
                        }}
                    >
                        <Typography color='#4176FF'>Resend OTP</Typography>
                    </ButtonBase>
                </If>

                <If condition={showTimer}>
                    <Typography
                        component={'span'}
                        sx={{
                            color: assets.colors.greySubText2,
                        }}
                    >
                        Retry in{' '}
                        <StopWatch
                            totalSeconds={constants.resendOtpTime}
                            sx={{ color: assets.colors.greySubText2 }}
                        />
                    </Typography>
                </If>
            </Box>

            <AppButton
                width='100%'
                value='Log In'
                isLoading={otpLoginLoading}
                onClick={handleOtpLogin}
                disabled={loginButtonDisabled}
                restStyle={{
                    '&.Mui-disabled': {
                        backgroundColor: '#C2D0D4',
                        color: '#ffffff',
                    },
                }}
            />
        </>
    );
};

export default OtpLoginForm;
