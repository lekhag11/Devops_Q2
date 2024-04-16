import React from 'react';
import { Box, ButtonBase } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { assets } from 'src/assets/assets';
import {
    NavigationOptions,
    NavigationRoutes,
} from 'src/enums/navigationOptions';
import IfNot from 'src/components/logical/IfNot';
import If from 'src/components/logical/If';
import { StandardCategoryTypeUppercase } from 'src/enums/categoryType';
import NewFeatureTag from 'src/components/tooltip/NewFeatureTag';

const AppBarLeftMenu = ({ isMobileMenu = false }) => {
    const navigate = useNavigate();
    const pathName = window.location.pathname;
    const { categoryId } = useParams();

    const navigateToWaterBalance = () => {
        navigate(
            `${NavigationRoutes[NavigationOptions.waterBalance.categoryId]}`
        );
    };

    const navigateToDefaultPage = () => {
        navigate(NavigationRoutes.ROOT);
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <ButtonBase onClick={() => navigate('/')}>
                <If condition={isMobileMenu}>
                    <img
                        src={assets.images.logo}
                        height={34}
                        alt='logo'
                    />
                </If>
                <IfNot condition={isMobileMenu}>
                    <img
                        src={assets.images.fullLogoText}
                        height={34}
                        alt='logo'
                    />
                </IfNot>
            </ButtonBase>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ButtonBase
                    sx={{
                        display: !isMobileMenu
                            ? 'block'
                            : pathName.includes('manage_account') ||
                              pathName.includes('water_balance') ||
                              pathName.includes('energy_category')
                            ? 'block'
                            : 'none',
                        fontSize: 18,
                        fontweight: 500,
                        padding: '8px 10px',
                        borderRadius: '4px',
                        background:
                            !pathName.includes('manage_account') &&
                            !pathName.includes('water_balance') &&
                            !pathName.includes('energy_category')
                                ? '#FFFFFF1F'
                                : 'none',
                        outline:
                            !pathName.includes('manage_account') &&
                            !pathName.includes('water_balance') &&
                            !pathName.includes('energy_category')
                                ? '1px solid #ffffff61'
                                : 'none',
                        '&: hover': {
                            backgroundColor: '#FFFFFF1F',
                        },
                    }}
                    onClick={() => navigateToDefaultPage()}
                >
                    Water Monitoring
                </ButtonBase>
                <ButtonBase
                    sx={{
                        display: !isMobileMenu
                            ? 'block'
                            : categoryId in StandardCategoryTypeUppercase
                            ? 'block'
                            : 'none',
                        fontSize: 18,
                        fontweight: 500,
                        padding: '8px 10px',
                        borderRadius: '4px',
                        background: pathName.includes('water_balance')
                            ? '#FFFFFF1F'
                            : 'none',
                        outline: pathName.includes('water_balance')
                            ? '1px solid #ffffff61'
                            : 'none',
                        '&: hover': {
                            backgroundColor: '#FFFFFF1F',
                        },
                    }}
                    onClick={() => navigateToWaterBalance()}
                >
                    <NewFeatureTag
                        title={'New Feature'}
                        hidden={isMobileMenu}
                    >
                        Water Balancing
                    </NewFeatureTag>
                </ButtonBase>
            </Box>
        </Box>
    );
};

export default AppBarLeftMenu;
