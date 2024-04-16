import {
    Box,
    DialogContent,
    DialogTitle,
    Paper,
    Popover,
    Typography,
} from '@mui/material';
import { useContext, useState } from 'react';
import AppIconButton from '../components/button/AppIconButton';
import CloseIcon from '@mui/icons-material/Close';
import AlertIcon from '@mui/icons-material/NotificationsNone';
import { assets } from 'src/assets/assets';
import { HomeStoreContext } from 'src/store/HomeStore';
import If from 'src/components/logical/If';
import CustomLoader from 'src/components/loader/loader';
import GenericInfo from 'src/components/info/GenericInfo';
import Expanded from 'src/components/helper/Expanded';
import { AnalyticsService } from 'src/services/analytics/analyticsService';
import { AnalyticEvents } from 'src/enums/analyticsEnum';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import AppGesture from 'src/components/gesture/AppGesture';
import { StandardCategoryType } from 'src/enums/categoryType';

function AlertTile({ title, body, subTitle, createdOn, isRead }) {
    return (
        <Box
            sx={{
                width: { xs: 1, md: 450 },
                backgroundColor: assets.colors.divider + '44',
                my: 2,
                borderRadius: 1,
                p: 2,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    mb: 1,
                    justifyContent: 'space-between',
                }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', ml: 1 }}>
                    <Box display='flex'>
                        <Typography
                            mr={!isRead ? 1 : 0}
                            color='red'
                        >
                            {!isRead ? '●' : ''}
                        </Typography>
                        <Typography>{title}</Typography>
                    </Box>
                    <Typography
                        color={'gray'}
                        fontSize={14}
                    >
                        {createdOn}
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', ml: 1 }}>
                    <Typography
                        fontWeight={700}
                        textAlign={'end'}
                    >
                        {body}
                    </Typography>
                    <Typography
                        fontWeight={700}
                        textAlign={'end'}
                    >
                        {subTitle}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}

function BuildAlertView({ handleClose }) {
    const homeStore = useContext(HomeStoreContext);
    const navigate = useNavigate();

    if (!homeStore.notificationData) {
        return (
            <Expanded
                extraSx={{
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <CustomLoader />
            </Expanded>
        );
    }
    const navigateToUnit = (item) => {
        AnalyticsService.sendEvent(AnalyticEvents.ALERTS_CLICK, {
            categoryId: item.categoryId,
            standardCategoryId: item.standardCategoryId,
            isRead: item.isRead,
        });

        homeStore.updateNotificationRead({
            id: item.id,
            date: item.date_key,
            type: item.type,
        });

        if (
            item.standardCategoryId.toLocaleLowerCase() ===
            StandardCategoryType.SOURCE_CATEGORY
        ) {
            navigate(
                `./${item.standardCategoryId.toLowerCase()}/${item.categoryId}`
            );
            setTimeout(() => {
                navigate(
                    `./${item.standardCategoryId.toLowerCase()}/${
                        item.categoryId
                    }/${item.subCategoryId}/${item.unitId}`
                );
            }, 1);
        } else {
            navigate(
                `./${item.standardCategoryId.toLowerCase()}/${item.categoryId}`
            );
        }
        handleClose();
    };

    return (
        <>
            <If
                condition={
                    homeStore.notificationData.notifications.length === 0
                }
            >
                {
                    <GenericInfo
                        title='No alerts found!'
                        lottieData={assets.lotties.emptyNotification}
                    />
                }
            </If>
            <If condition={homeStore.notificationData.notifications.length > 0}>
                {homeStore.notificationData.notifications.map((item) => (
                    <AppGesture
                        key={item['id']}
                        onClick={() => navigateToUnit(item)}
                    >
                        <AlertTile
                            title={item['title']}
                            body={item['body']}
                            subTitle={item['subTitle']}
                            isRead={item['isRead']}
                            createdOn={`${item['date']} ${item['time']}`}
                        />
                    </AppGesture>
                ))}
            </If>
        </>
    );
}

function AlertDialog() {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        AnalyticsService.sendEvent(AnalyticEvents.ALERTS_ICON_CLICK);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const homeStore = useContext(HomeStoreContext);

    return (
        <div>
            <AppIconButton
                icon={<AlertIcon />}
                label='Alerts'
                onClick={handleClick}
                badgeContent={_.sumBy(
                    homeStore.notificationData?.notifications,
                    function (o) {
                        if (!o.isRead) {
                            return 1;
                        }
                        return 0;
                    }
                )}
            />
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
                <Paper sx={{ overflow: 'auto' }}>
                    <Box
                        sx={{
                            height: 400,
                            minWidth: { xs: 1, md: 450 },
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <DialogTitle>Alerts</DialogTitle>
                            <AppIconButton
                                icon={
                                    <CloseIcon
                                        sx={{ strokeWidth: 1, mr: 2 }}
                                        onClick={handleClose}
                                    />
                                }
                            />
                        </Box>
                        <DialogContent sx={{ py: 0 }}>
                            <BuildAlertView handleClose={handleClose} />
                        </DialogContent>
                    </Box>
                </Paper>
            </Popover>
        </div>
    );
}

export default AlertDialog;
