import React, { useContext, useEffect, useRef, useState } from 'react';

import {
    Grid,
    Paper,
    Typography,
    List,
    Box,
    Divider,
    Button,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    Snackbar,
    Alert,
    DialogActions,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AppStoreContext } from 'src/store/AppStore';
import { assets } from 'src/assets/assets';
import { useBlocker, useNavigate } from 'react-router-dom';
import LeftSideNav from './LeftSideNav';
import Account from './Account';
import Users from './Users';
import AlertEmails from './AlertEmails';
import Reports from './Reports';
import { AccountStoreContext } from 'src/store/AccountStore';
import Expanded from 'src/components/helper/Expanded';
import CustomLoader from 'src/components/loader/loader';
import SubPageWrapper from 'src/components/helper/SubPageWrapper';
import SideBarDrawer from 'src/components/appNavBar/components/SideBarDrawer';
import { getMainPageWidth } from 'src/components/appNavBar/components/AppBarHelpers';
import { AccountController } from 'src/controllers/account/accountController';
import { AnalyticsService } from 'src/services/analytics/analyticsService';
import { AnalyticEvents } from 'src/enums/analyticsEnum';

const leftSideNav = [
    { title: 'Account', icon: PersonOutlineOutlinedIcon, value: 1 },
    { title: 'Users', icon: PersonAddAlt1OutlinedIcon, value: 2 },
    { title: 'Alerts', icon: NotificationsNoneOutlinedIcon, value: 3 },
    { title: 'Reports', icon: EditNoteOutlinedIcon, value: 4 },
];

function AccountSettingsPage() {
    const { accountScreenData, fetchAccountData } =
        useContext(AccountStoreContext);

    const navigate = useNavigate();

    const settingData = accountScreenData?.AccountSettingPage;

    const appStore = useContext(AppStoreContext);

    const [formData, setFormData] = useState({});

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [selectedleftNav, setSelectLeftnav] = useState(1);

    const [hasErrors, setHasErrors] = useState(false);

    const [loading, setLoadig] = useState(false);

    const [backDialog, setBackDialog] = useState(false);

    const [changesHappened, setChangesHappened] = useState(false);

    const [open, setOpen] = useState(true);

    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const [snackbarMessage, setSnackbarMessage] = useState('');

    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const industryId = appStore?.loginData?.industryId;

    const accountRef = useRef(null);

    const usersRef = useRef(null);

    const alertsRef = useRef(null);

    const reportsRef = useRef(null);

    let blocker = useBlocker(
        ({ currentLocation, nextLocation }) =>
            changesHappened &&
            currentLocation.pathname !== nextLocation.pathname
    );

    const largeScreenStyles = {
        '@media (min-width: 1024px)': {
            minWidth: '540px',
        },
    };

    useEffect(() => {
        if (settingData) {
            setFormData(settingData);
        }
    }, [settingData]);

    useEffect(() => {
        const intersectionObserverOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.7,
        };

        const intersectionObserver = new IntersectionObserver(
            handleIntersection,
            intersectionObserverOptions
        );

        const observeElement = (elementRef, elementName) => {
            const element = elementRef.current;
            if (element instanceof Element) {
                intersectionObserver.observe(element);
            } else {
                console.warn(
                    `Ref not found or not a valid element for ${elementName}`
                );
            }
        };

        observeElement(accountRef, 'account');
        observeElement(usersRef, 'users');
        observeElement(alertsRef, 'alerts');
        observeElement(reportsRef, 'reports');

        return () => {
            intersectionObserver.disconnect();
        };
    }, []);

    useEffect(() => {
        const beforeUnloadHandler = (event) => {
            const customMessage = 'Are you sure you want to refresh the page?';
            const userConfirmed = window.confirm(customMessage);
            if (userConfirmed) {
                console.log('Custom function called before unload');
            }
            if (!userConfirmed) {
                event.returnValue = customMessage;
            }
        };
        window.addEventListener('beforeunload', beforeUnloadHandler);
        return () => {
            window.removeEventListener('beforeunload', beforeUnloadHandler);
        };
    }, []);

    useEffect(() => {
        appStore.setSelectedCategory();
        // eslint-disable-next-line
    }, []);

    const scrollToComponent = (ref) => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleExit = () => {
        navigate('../');
    };

    function hasDuplicateEmails(emailArray) {
        const uniqueEmails = new Set(emailArray.map((email) => email.trim()));
        return emailArray.length !== uniqueEmails.size;
    }

    const handleSave = async () => {
        try {
            if (
                formData?.alerts?.email?.emailIds.some(
                    (email) => email.trim() === ''
                ) ||
                formData?.reports?.emailIds.some(
                    (email) => email.trim() === ''
                ) ||
                hasDuplicateEmails(formData?.alerts?.email?.emailIds) ||
                hasDuplicateEmails(formData?.reports?.emailIds)
            ) {
                setSnackbarMessage(
                    'Cannot update with empty  or duplicate emails.'
                );
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            } else if (
                formData?.alerts?.email?.enabled &&
                !formData.alerts?.email?.emailIds?.length
            ) {
                setSnackbarMessage('please add alteast one email');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            } else if (
                formData?.reports?.enabled &&
                !formData.reports?.emailIds?.length
            ) {
                setSnackbarMessage('please add alteast one email');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            } else if (
                formData.user
                    .filter((user) => user.active)
                    .some(
                        (user) =>
                            user.username.trim() === '' || user.phoneNo === ''
                    )
            ) {
                setSnackbarMessage('Cannot update with empty user details.');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            } else if (
                formData.user
                    .filter((user) => user.active)
                    .some((user) => user.phoneNo.length > 10)
            ) {
                setSnackbarMessage('Cannot update with invalid phone number .');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            } else {
                if (!hasErrors) {
                    if (!formData.alerts.email.enabled) {
                        formData.alerts.email.emailIds = [];
                        setFormData({ ...formData });
                    }

                    if (!formData.reports.enabled) {
                        formData.reports.emailIds = [];
                        Object.keys(formData?.reports?.services).forEach(
                            (category) => {
                                Object.keys(
                                    formData.reports.services[category]
                                ).forEach((service) => {
                                    formData.reports.services[category][
                                        service
                                    ] = false;
                                });
                            }
                        );

                        setFormData({ ...formData });
                    }
                    setLoadig(true);
                    const response =
                        await AccountController.accountSettingsUpdate(
                            formData,
                            appStore
                        );

                    if (response?.status === 200) {
                        AnalyticsService.sendEvent(
                            AnalyticEvents.ACCOUNT_SETTINGS_UPDATE
                        );
                        fetchAccountData();
                        setIsDialogOpen(true);
                        setChangesHappened(false);
                    } else {
                        console.error(
                            'Error saving account settings:',
                            response
                        );
                        setSnackbarMessage(
                            'Error saving account settings. Please try again.'
                        );
                        setSnackbarSeverity('error');
                        setSnackbarOpen(true);
                    }
                }
            }
        } catch (error) {
            console.error('Error saving account settings:', error);
        } finally {
            setLoadig(false);
        }
    };

    const handleCancel = () => {
        setSnackbarMessage('Cancelled!');
        setSnackbarSeverity('warning');
        setSnackbarOpen(true);
        setTimeout(() => {
            setSnackbarOpen(false);
        }, 5000);
        fetchAccountData();
        setFormData(settingData);
        setChangesHappened(false);
    };

    const LeftSideNavActive = (value) => {
        setSelectLeftnav(value);
        // Scroll to the corresponding component
        switch (value) {
            case 1:
                scrollToComponent(accountRef);
                break;
            case 2:
                scrollToComponent(usersRef);
                break;
            case 3:
                scrollToComponent(alertsRef);
                break;
            case 4:
                scrollToComponent(reportsRef);
                break;
            default:
                break;
        }
    };

    const handleIntersection = (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const targetId = entry.target.id;
                const correspondingNavItem = leftSideNav.find(
                    (navItem) => navItem.value === parseInt(targetId, 10)
                );
                if (correspondingNavItem) {
                    setSelectLeftnav(correspondingNavItem.value);
                }
            }
        });
    };

    if (settingData && !loading) {
        return (
            <SubPageWrapper>
                <SideBarDrawer
                    open={appStore.sideBarOpen}
                    setOpen={appStore.setSideBarOpen}
                />
                <Box
                    sx={{
                        backgroundColor: { md: assets.colors.background },
                        width: getMainPageWidth(appStore.sideBarOpen),
                    }}
                >
                    <Grid
                        container
                        spacing={4}
                        justifyContent='center'
                        sx={{ marginTop: 0 }}
                    >
                        <Grid
                            item
                            sx={{
                                display: { xs: 'none', md: 'block' },
                                minWidth: 'fit-content',
                            }}
                            md={2}
                        >
                            <Paper
                                elevation={0}
                                sx={{
                                    height: '90vh',
                                    marginLeft: open ? '0' : 'auto',
                                    marginRight: open ? 'auto' : '0',
                                    width: 'fit-content',
                                    px: 3,
                                }}
                            >
                                <Typography
                                    noWrap
                                    sx={{
                                        textAlign: 'center',
                                        display: 'flex',
                                        py: 3,
                                        justifyContent: open
                                            ? 'left'
                                            : 'center',
                                        alignItems: 'center',
                                        whiteSpace: 'nowrap',
                                    }}
                                    fontWeight={600}
                                    fontSize={24}
                                >
                                    <ArrowBackIcon
                                        onClick={handleExit}
                                        sx={{ mx: 1, cursor: 'pointer' }}
                                    />
                                    {open && 'Settings'}
                                </Typography>
                                <List>
                                    <LeftSideNav
                                        leftSideNav={leftSideNav}
                                        selectedleftNav={selectedleftNav}
                                        leftSideNavActive={LeftSideNavActive}
                                        open={open}
                                        setOpen={setOpen}
                                    />
                                </List>
                            </Paper>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            md={8}
                        >
                            <Paper
                                elevation={0}
                                sx={{
                                    height: '90vh',
                                    overflowY: 'scroll',
                                    scrollBehavior: 'smooth',
                                    margin: '0 20px',
                                    padding: '20px',
                                    ...largeScreenStyles,
                                }}
                            >
                                <div
                                    id='1'
                                    ref={accountRef}
                                >
                                    <Account
                                        settingData={settingData}
                                        formData={formData}
                                        setFormData={setFormData}
                                        setHasErrors={setHasErrors}
                                        setChangesHappened={setChangesHappened}
                                    />
                                </div>
                                <Divider sx={{ my: 4 }} />
                                <div
                                    id='2'
                                    ref={usersRef}
                                >
                                    <Users
                                        settingData={settingData}
                                        formData={formData}
                                        setFormData={setFormData}
                                        industryId={industryId}
                                        setHasErrors={setHasErrors}
                                        setChangesHappened={setChangesHappened}
                                    />
                                </div>
                                <Divider sx={{ my: 4 }} />
                                <div
                                    id='3'
                                    ref={alertsRef}
                                >
                                    <AlertEmails
                                        settingData={settingData}
                                        formData={formData}
                                        setFormData={setFormData}
                                        setHasErrors={setHasErrors}
                                        setChangesHappened={setChangesHappened}
                                    />
                                </div>
                                <Divider sx={{ my: 4 }} />
                                <div
                                    id='4'
                                    ref={reportsRef}
                                >
                                    <Reports
                                        settingData={settingData}
                                        formData={formData}
                                        setFormData={setFormData}
                                        accountData={accountScreenData}
                                        setHasErrors={setHasErrors}
                                        setChangesHappened={setChangesHappened}
                                    />
                                </div>
                                <Box
                                    display='flex'
                                    justifyContent='flex-end'
                                    m={3}
                                >
                                    <Button
                                        sx={{
                                            marginRight: '5px',
                                            color: 'black',
                                        }}
                                        onClick={handleCancel}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        variant='contained'
                                        sx={{
                                            backgroundColor:
                                                assets.colors.primary,
                                            color: 'white',
                                        }}
                                        onClick={handleSave}
                                    >
                                        Save
                                    </Button>
                                </Box>
                            </Paper>
                        </Grid>
                        <Dialog
                            open={blocker.state === 'blocked' || backDialog}
                            onClose={() => setBackDialog(false)}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <DialogTitle>Unsaved Changes</DialogTitle>
                                <IconButton
                                    aria-label='close'
                                    onClick={() => setBackDialog(false)}
                                >
                                    <CloseIcon />
                                </IconButton>
                            </Box>

                            <DialogContent>
                                Do you want to exit settings without saving
                                changes?
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    sx={{ marginRight: '5px', color: 'black' }}
                                    onClick={async () => {
                                        await fetchAccountData();
                                        blocker?.proceed();
                                    }}
                                >
                                    Exit
                                </Button>
                                <Button
                                    variant='contained'
                                    sx={{
                                        backgroundColor: assets.colors.primary,
                                        color: 'white',
                                    }}
                                    onClick={() => {
                                        handleSave();
                                        setBackDialog(false);
                                        blocker?.reset();
                                    }}
                                >
                                    Save Changes
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <Dialog
                            open={isDialogOpen}
                            onClose={closeDialog}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <DialogTitle>Success</DialogTitle>
                                <IconButton
                                    aria-label='close'
                                    onClick={closeDialog}
                                >
                                    <CloseIcon />
                                </IconButton>
                            </Box>

                            <DialogContent>
                                Account settings saved successfully!
                            </DialogContent>
                        </Dialog>
                    </Grid>
                    <Snackbar
                        open={snackbarOpen}
                        autoHideDuration={5000}
                        onClose={handleSnackbarClose}
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    >
                        <Alert
                            onClose={handleSnackbarClose}
                            severity={snackbarSeverity}
                            sx={{ width: '300px' }}
                        >
                            {snackbarMessage}
                        </Alert>
                    </Snackbar>
                </Box>
            </SubPageWrapper>
        );
    } else {
        return (
            <Expanded
                extraSx={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '90vh',
                }}
            >
                <CustomLoader />
            </Expanded>
        );
    }
}

export default AccountSettingsPage;
