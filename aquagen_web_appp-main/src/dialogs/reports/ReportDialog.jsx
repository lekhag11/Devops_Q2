import React, { useContext, useState } from 'react';
import {
    Box,
    DialogContent,
    DialogTitle,
    Paper,
    Popover,
    Tab,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { TabContext, TabList } from '@mui/lab';
import { assets } from 'src/assets/assets';
import If from 'src/components/logical/If';
import { AppStoreContext } from 'src/store/AppStore';
import { StandardCategoryTypeUppercase } from 'src/enums/categoryType';
import DailySummaryReport from './tabs/DailySummaryReport';
import AppIconButton from 'src/components/button/AppIconButton';
import BuildGroundwaterReport from './tabs/BuildGroundwaterReport';
import BuildEnergyReport from './tabs/BuildEnergyReport';
import BuildQualityReport from './tabs/BuildQualityReport';
import BuildConsumptionReport from './tabs/BuildConsumptionReport';

const selectedTabProps = {
    maxWidth: '100vw',
    flexGrow: 1,
    color: assets.colors.primary,
    border: 1,
    fontSize: 16,
    fontWeight: 700,
    borderBottom: 0,
    borderColor: '#CBCBCB',
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
};
const unSelectedTabProps = {
    maxWidth: '100vw',
    flexGrow: 1,
    backgroundColor: '#EDF1F2',
    border: 1,
    borderBottom: 1,
    mt: 0.4,
    borderColor: '#CBCBCB',
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
};

const BuildReportTabView = () => {
    const appStore = useContext(AppStoreContext);
    const [selectedTab, setSelectedTab] = useState(
        appStore.loginData.reportsTab[0].id
    );

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    return (
        <Box>
            <TabContext value={selectedTab}>
                <Box sx={{ borderColor: 'divider', borderBottom: 0 }}>
                    <TabList
                        onChange={handleChange}
                        indicatorColor=''
                        textColor='inherit'
                    >
                        {appStore.loginData.reportsTab.map((tab) => (
                            <Tab
                                key={tab.id}
                                sx={
                                    selectedTab === tab.id
                                        ? selectedTabProps
                                        : unSelectedTabProps
                                }
                                label={tab.displayName}
                                value={tab.id}
                            />
                        ))}
                    </TabList>
                </Box>
                <Box
                    sx={{
                        border: 1,
                        borderTop: 0,
                        borderColor: '#CBCBCB',
                        borderBottomLeftRadius: 2,
                        borderBottomRightRadius: 2,
                    }}
                >
                    <If
                        condition={
                            selectedTab ===
                            StandardCategoryTypeUppercase.SOURCE_CATEGORY
                        }
                    >
                        <BuildConsumptionReport />
                    </If>
                    <If
                        condition={
                            selectedTab ===
                            StandardCategoryTypeUppercase.QUALITY_CATEGORY
                        }
                    >
                        <BuildQualityReport />
                    </If>
                    <If
                        condition={
                            selectedTab ===
                            StandardCategoryTypeUppercase.GROUND_WATER_LEVEL
                        }
                    >
                        <BuildGroundwaterReport />
                    </If>
                    <If
                        condition={
                            selectedTab ===
                            StandardCategoryTypeUppercase.ENERGY_CATEGORY
                        }
                    >
                        <BuildEnergyReport />
                    </If>
                </Box>
            </TabContext>
        </Box>
    );
};

function ReportDialog() {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <If condition={true}>
                <AppIconButton
                    iconUrl={assets.images.reportIcon}
                    label='Reports'
                    onClick={handleClick}
                />
            </If>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <Paper
                    sx={{
                        overflow: 'auto',
                        minWidth: { xs: '90vw', sm: 500 },
                        maxWidth: 500,
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <DialogTitle>Reports</DialogTitle>
                        <AppIconButton
                            icon={
                                <CloseIcon
                                    sx={{ strokeWidth: 1, mr: 2 }}
                                    onClick={handleClose}
                                />
                            }
                        />
                    </Box>
                    <If condition={false}>
                        <Box
                            sx={{
                                marginLeft: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <DailySummaryReport />
                        </Box>
                    </If>

                    <DialogContent>
                        <BuildReportTabView />
                    </DialogContent>
                </Paper>
            </Popover>
        </div>
    );
}

export default ReportDialog;
