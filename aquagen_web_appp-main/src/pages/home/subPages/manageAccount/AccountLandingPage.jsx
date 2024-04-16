import React, { useContext, useEffect, useState } from 'react';
import {
    Card,
    CardHeader,
    IconButton,
    Typography,
    Box,
    Grid,
    Container,
    CircularProgress,
    TextField,
} from '@mui/material';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import moment from 'moment';
import { AppStoreContext } from 'src/store/AppStore';
import { useNavigate } from 'react-router-dom';
import { assets } from 'src/assets/assets';
import If from 'src/components/logical/If';
import IfNot from 'src/components/logical/IfNot';
import { LoginController } from 'src/controllers/login/loginController';
import { AccountStoreContext } from 'src/store/AccountStore';
import { styled, useTheme } from '@mui/material/styles';
import { debounce } from 'lodash';
import Expanded from 'src/components/helper/Expanded';
import CustomLoader from 'src/components/loader/loader';
import SideBarDrawer from 'src/components/appNavBar/components/SideBarDrawer';
import SubPageWrapper from 'src/components/helper/SubPageWrapper';
import { AnalyticEvents } from 'src/enums/analyticsEnum';
import { AnalyticsService } from 'src/services/analytics/analyticsService';
import AlertInfo from 'src/components/info/AlertInfo';

const AccountInfoCard = ({ navigate, cardTitleStyle, cardSubtitleStyle }) => {
    const handleAccountInfo = () => {
        AnalyticsService.sendEvent(AnalyticEvents.ACCOUNT_INFO_CLICK);
        navigate('./account_info');
    };
    return (
        <Card
            variant='outlined'
            sx={{ height: '100%', width: '100%' }}
        >
            <CardHeader
                avatar={<ErrorOutlineOutlinedIcon />}
                titleTypographyProps={{
                    style: {
                        cardTitleStyle,
                    },
                }}
                subheaderTypographyProps={{
                    style: {
                        cardSubtitleStyle,
                    },
                }}
                title={
                    <>
                        <Typography
                            variant='subtitle1'
                            component='span'
                            sx={{ fontWeight: 'bold' }}
                            fontSize={22}
                            noWrap
                        >
                            Account Info
                        </Typography>
                        <Typography
                            variant='body2'
                            component='span'
                            color='grey'
                            sx={{ marginLeft: '0.8rem' }}
                            noWrap
                        >
                            (View Only)
                        </Typography>
                    </>
                }
            />
            <Box sx={{ padding: '8px', marginLeft: '1rem' }}>
                <Typography
                    variant='body2'
                    color='textSecondary'
                >
                    Contains information such as Categories, <br /> Units and
                    their respective thresholds.
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'end',
                        marginTop: '12px',
                        marginRight: '12px',
                    }}
                    onClick={handleAccountInfo}
                >
                    <IconButton
                        sx={{
                            borderRadius: '6px',
                            backgroundColor: assets.colors.primary,
                            color: 'white',
                            width: 40,
                            height: 35,
                            py: 1,
                            '&:hover': {
                                backgroundColor: assets.colors.primary,
                            },
                        }}
                        size='small'
                    >
                        <ArrowForwardIcon />
                    </IconButton>
                </Box>
            </Box>
        </Card>
    );
};

const AccountSettingsCard = ({ cardTitleStyle, passVerifyandNavigate }) => {
    const [passvalue, setPassValue] = useState('');

    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = React.useState(false);

    const [passwordError, setPasswordError] = React.useState(false);

    const [errorMessage, setErrorMessage] = React.useState(undefined);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    return (
        <Card
            variant='outlined'
            sx={{ height: '100%', width: '100%' }}
        >
            <CardHeader
                avatar={<SettingsIcon />}
                titleTypographyProps={{
                    style: {
                        cardTitleStyle,
                    },
                }}
                title={
                    <Box
                        display={'flex'}
                        alignItems={'center'}
                        gap={'12px'}
                    >
                        <Typography
                            variant='subtitle1'
                            component='span'
                            sx={{ fontWeight: 'bold' }}
                            fontSize={22}
                            noWrap
                        >
                            Account settings
                        </Typography>

                        <AlertInfo
                            value={'New Feature'}
                            boxStyle={{ height: '28px', width: 'fit-content' }}
                            padding='0em 0.75em'
                        />
                    </Box>
                }
            />

            <Box sx={{ ml: '1rem' }}>
                <Typography
                    fontWeight={500}
                    color='dark'
                >
                    Enter Password
                </Typography>
                <Typography
                    variant='body2'
                    color='textSecondary'
                >
                    Password required to view and edit settings
                </Typography>
                <Box sx={{ display: 'flex' }}>
                    <FormControl
                        sx={{ m: 1, width: '75%', ml: 0, flexGrow: 1 }}
                        variant='outlined'
                    >
                        <TextField
                            id='outlined-basic'
                            type={showPassword ? 'text' : 'password'}
                            size='small'
                            sx={{ marginLeft: '0px' }}
                            label='Password'
                            value={passvalue}
                            error={passwordError}
                            helperText={passwordError ? errorMessage : ''}
                            onChange={(e) => setPassValue(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <IconButton
                                            aria-label='toggle password visibility'
                                            onClick={handleClickShowPassword}
                                            edge='end'
                                            size='small'
                                        >
                                            <If condition={showPassword}>
                                                <Visibility />
                                            </If>
                                            <IfNot condition={showPassword}>
                                                <VisibilityOff />
                                            </IfNot>
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </FormControl>

                    <Box
                        onClick={() =>
                            passVerifyandNavigate(
                                passvalue,
                                setPasswordError,
                                setErrorMessage,
                                setLoading
                            )
                        }
                    >
                        <IconButton
                            sx={{
                                borderRadius: '6px',
                                backgroundColor: assets.colors.primary,
                                color: 'white',
                                m: '10px',
                                mr: '18px',
                                width: 40,
                                height: 35,
                                '&:hover': {
                                    backgroundColor: assets.colors.primary,
                                },
                            }}
                            size='small'
                        >
                            {loading ? (
                                <CircularProgress
                                    size={'1rem'}
                                    color={'whiteTheme'}
                                />
                            ) : (
                                <ArrowForwardIcon />
                            )}
                        </IconButton>
                    </Box>
                </Box>
            </Box>
        </Card>
    );
};

function AccountLandingPage() {
    const appStore = useContext(AppStoreContext);

    const theme = useTheme();

    const accountStore = useContext(AccountStoreContext);

    const navigate = useNavigate();

    const loginType = appStore.loginData.type;

    const StyledContainer = styled(Container)(({ theme }) => ({
        backgroundColor: 'white',
        border: '2px solid #80808033',
        borderRadius: '6px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '72vh',
        [theme.breakpoints.up('lg')]: {
            width: '62vw',
        },
    }));

    const cardTitleStyle = {
        display: 'flex',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: '1.4rem',
        color: 'dark',
    };

    const cardSubtitleStyle = {
        display: 'flex',
        alignItems: 'center',
        marginLeft: '8px',
        fontSize: '0.8rem',
        color: 'grey',
    };

    useEffect(() => {
        appStore.setSelectedCategory();
        // eslint-disable-next-line
    }, []);

    const passVerifyandNavigate = debounce(
        async (password, setPasswordError, setErrorMessage, setLoading) => {
            if (password.includes(' ')) {
                setPasswordError(true);
                setErrorMessage("Password shouldn't contains space.");
                return;
            } else {
                setLoading(true);

                const username = appStore?.loginData?.username;

                if (username && password) {
                    let response = await LoginController.defaultLogin(
                        username,
                        password
                    );
                    if (response) {
                        AnalyticsService.sendEvent(
                            AnalyticEvents.ACCOUNT_SETTINGS_CLICK
                        );
                        navigate('./account_settings');
                        setPasswordError(false);
                        setErrorMessage(undefined);
                    } else {
                        setPasswordError(true);
                        setErrorMessage('Wrong password');
                    }
                }

                setLoading(false);
            }
        },
        500
    );

    const getJoiningDate = (date) => {
        return moment(date).format('DD/MM/YYYY');
    };

    const getNextPaymenyDate = (date) => {
        const currentDate = moment();
        let inputDate = moment(date);

        while (inputDate.isBefore(currentDate)) {
            inputDate.add(1, 'year');
        }

        return inputDate.format('DD/MM/YYYY');
    };

    return (
        <>
            <If condition={accountStore.accountScreenData}>
                <SubPageWrapper>
                    <SideBarDrawer
                        open={appStore.sideBarOpen}
                        setOpen={appStore.setSideBarOpen}
                    />
                    <Box
                        sx={{
                            width: '100%',
                            height: '100%',
                            minHeight: '100vh',
                            maxHeight: '100vh',
                            backgroundColor: assets.colors.background,
                            pt: 4,
                        }}
                    >
                        <StyledContainer
                            theme={theme}
                            sx={{ py: 2, width: { md: '84vw' } }}
                        >
                            <Box
                                textAlign='center'
                                sx={{ cursor: 'pointer' }}
                            >
                                <img
                                    alt=''
                                    src={appStore?.loginData?.logo}
                                    height={50}
                                />
                            </Box>

                            <Typography
                                color='dark'
                                align='center'
                                sx={{
                                    marginTop: '4px',
                                    marginBottom: '40px',
                                }}
                            >
                                Joined Aquagen :{' '}
                                {getJoiningDate(
                                    accountStore?.accountScreenData?.joiningDate
                                )}
                            </Typography>

                            <Box sx={{ mt: '20px' }}>
                                <Grid
                                    container
                                    justifyContent='space-around'
                                >
                                    <Grid
                                        item
                                        xs={12}
                                        md={loginType === 'OTP' ? 12 : 6}
                                        paddingX={'18px'}
                                        paddingY='12px'
                                    >
                                        <AccountInfoCard
                                            navigate={navigate}
                                            cardTitleStyle={cardTitleStyle}
                                            cardSubtitleStyle={
                                                cardSubtitleStyle
                                            }
                                        />
                                    </Grid>
                                    <IfNot condition={loginType === 'OTP'}>
                                        <Grid
                                            item
                                            xs={12}
                                            md={6}
                                            paddingX={'18px'}
                                            paddingY='12px'
                                        >
                                            <AccountSettingsCard
                                                cardTitleStyle={cardTitleStyle}
                                                passVerifyandNavigate={
                                                    passVerifyandNavigate
                                                }
                                            />
                                        </Grid>
                                    </IfNot>

                                    <Grid
                                        item
                                        xs={12}
                                        md={12}
                                        paddingX={'18px'}
                                    >
                                        <Box
                                            sx={{
                                                backgroundColor:
                                                    assets.colors.lightBlue,
                                                display: 'flex',
                                                margin: '10px 0',
                                                border: '2px solid #80808033',
                                                borderRadius: '6px',
                                                visibility: 'hidden',
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    padding: '8px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <CreditCardOutlinedIcon fontSize='small' />
                                                <Typography
                                                    variant='body1'
                                                    component='p'
                                                    marginLeft={'6px'}
                                                >
                                                    Next payment dues:{' '}
                                                    {getNextPaymenyDate(
                                                        accountStore
                                                            ?.accountScreenData
                                                            ?.joiningDate
                                                    )}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        </StyledContainer>
                    </Box>
                </SubPageWrapper>
            </If>
            <IfNot condition={accountStore.accountScreenData}>
                <Expanded
                    extraSx={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        mt: 20,
                    }}
                >
                    <CustomLoader />
                </Expanded>
            </IfNot>
        </>
    );
}

export default AccountLandingPage;
