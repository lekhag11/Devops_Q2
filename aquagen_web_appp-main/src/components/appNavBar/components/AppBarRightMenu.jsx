import { ButtonBase, Divider, Menu, MenuItem } from '@mui/material';
import IfNot from 'src/components/logical/IfNot';
import { constants } from 'src/constants/constants';
import AlertDialog from 'src/dialogs/AlertDialog';
import ReportDialog from 'src/dialogs/reports/ReportDialog';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppStoreContext } from 'src/store/AppStore';
import { assets } from 'src/assets/assets';
import { LocalDBInstance, LocalDBKeys } from 'src/services/localdb/localdb';
import { LoginTypes } from 'src/controllers/splash/splashController';
import { useMsal } from '@azure/msal-react';
import If from 'src/components/logical/If';
import RealTimeClock from 'src/components/clock/realtimeClock';
import { AnalyticsService } from 'src/services/analytics/analyticsService';
import { AnalyticEvents } from 'src/enums/analyticsEnum';
import EnergyToggleButton from 'src/components/appNavBar/components/EnergyToggleButton';
import _ from 'lodash';
import { StandardCategoryTypeUppercase } from 'src/enums/categoryType';

function AppBarRightMenu({
    handleProfileMenuClose,
    handleProfileMenuClick,
    profileMenu,
    timerEnabled = true,
}) {
    const navigate = useNavigate();

    const { instance } = useMsal();

    const appStore = useContext(AppStoreContext);

    const handleMangeAccount = () => {
        AnalyticsService.sendEvent(AnalyticEvents.MANAGE_ACCOUNT_CLICK);
        handleProfileMenuClose();
        navigate('./manage_account');
    };

    const handleSignOut = () => {
        AnalyticsService.sendEvent(AnalyticEvents.SIGN_OUT_USER, {
            loginType: LoginTypes.default,
        });

        let loginType = LocalDBInstance.getItem(LocalDBKeys.loginType);
        if (loginType === LoginTypes.microsoft) {
            instance.logoutRedirect({
                postLogoutRedirectUri: '/',
            });
        }
        LocalDBInstance.removeItem(LocalDBKeys.loginResponse);
        LocalDBInstance.removeItem(LocalDBKeys.loginType);
        // appStore.setLoginData(undefined);
        handleProfileMenuClose();
        navigate(0);
    };

    const filteredCategoryData = _.filter(appStore.loginData?.services || [], {
        categoryId: StandardCategoryTypeUppercase.ENERGY_CATEGORY,
    });

    return (
        <>
            <If condition={filteredCategoryData.length > 0}>
                <EnergyToggleButton
                    selectedToggleButton={appStore.selectedCategory?.categoryId}
                    categoryData={filteredCategoryData}
                />
            </If>
            <If condition={timerEnabled}>
                <RealTimeClock />
            </If>
            <IfNot condition={constants.isMobile}>
                <ReportDialog />
            </IfNot>
            <AlertDialog />
            <Divider
                orientation='vertical'
                flexItem
                sx={{
                    borderColor: '#a1a1a1',
                    my: 1,
                    mx: 1,
                }}
            />

            <ButtonBase
                id='profile-menu-reference'
                onClick={handleProfileMenuClick}
                className='account-settings-intro-tour'
            >
                <img
                    alt=''
                    src={appStore.loginData?.logo}
                    height={30}
                />
                <KeyboardArrowDownIcon />
            </ButtonBase>

            <Menu
                id='profile-menu-reference'
                MenuListProps={{
                    'aria-labelledby': 'profile-menu-reference',
                }}
                anchorEl={profileMenu}
                open={Boolean(profileMenu)}
                onClose={handleProfileMenuClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem
                    key={'ManageAccount'}
                    onClick={handleMangeAccount}
                >
                    <PersonOutlineIcon sx={{ mx: 1 }} />
                    Manage Account
                </MenuItem>
                <Divider />

                <MenuItem
                    key={'logout'}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        color: assets.colors.red,
                    }}
                    onClick={handleSignOut}
                >
                    <LogoutIcon sx={{ mx: 1 }} />
                    Logout
                </MenuItem>
            </Menu>
        </>
    );
}

export default AppBarRightMenu;
