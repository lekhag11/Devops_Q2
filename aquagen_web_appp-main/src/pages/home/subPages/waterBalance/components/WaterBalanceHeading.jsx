import React, { useContext, useState } from 'react';
import {
    Box,
    ButtonBase,
    Container,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Paper,
    Popover,
    Typography,
} from '@mui/material';
import CustomSingleDatePicker from 'src/components/date-picker/CustomSingleDatePicker';
import { DateFormatter } from 'src/utils/dateFormatter';
import moment from 'moment';
import If from 'src/components/logical/If';
import CustomLoader from 'src/components/loader/loader';
import Expanded from 'src/components/helper/Expanded';
import { assets } from 'src/assets/assets';
import { WaterBalanceDataContext } from 'src/store/WaterBalanceStore';
import IfNot from 'src/components/logical/IfNot';
import CloseIcon from '@mui/icons-material/Close';
import { AppStoreContext } from 'src/store/AppStore';
import { AnalyticsService } from 'src/services/analytics/analyticsService';
import { AnalyticEvents } from 'src/enums/analyticsEnum';
import { HomeStoreContext } from 'src/store/HomeStore';

const HeaderDialogue = ({ element, open, anchorEl, handleClose, siUnit }) => {
    return (
        <Popover
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
            <Paper sx={{ width: '360px', padding: '16px 16px 0' }}>
                <Typography
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '1em',
                        fontWeight: 500,
                    }}
                >
                    {element.displayName}
                    <IconButton
                        onClick={handleClose}
                        sx={{ position: 'relative', left: '8px' }}
                    >
                        <CloseIcon fontSize='small' />
                    </IconButton>
                </Typography>
                <List
                    sx={{
                        maxHeight: '300px',
                        overflowY: 'scroll',
                        overflowX: 'hidden !important',
                        paddingBottom: 2,
                        '&::-webkit-scrollbar': {
                            width: '8px',
                            backgroundColor: '#FFF',
                        },
                        '&::-webkit-scrollbar-track': {
                            borderColor: '#FFF',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            borderRadius: '16px',
                            background: '#babac0',
                        },
                        '&::-webkit-scrollbar-button': {
                            display: 'none',
                        },
                    }}
                >
                    {element.nodes.map((category, categoryIndex) => (
                        <Box key={categoryIndex}>
                            <ListItem
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '4px 0px',
                                }}
                            >
                                <ListItemText>
                                    {category.displayName}
                                </ListItemText>
                                <ListItemText
                                    fontWeight={500}
                                    sx={{
                                        textAlign: 'right',
                                        paddingRight: '8px',
                                    }}
                                >
                                    {category.value}
                                    {siUnit}
                                </ListItemText>
                            </ListItem>
                            <If
                                condition={
                                    categoryIndex < element.nodes.length - 1
                                }
                            >
                                <Divider component='li' />
                            </If>
                        </Box>
                    ))}
                </List>
            </Paper>
        </Popover>
    );
};

const HeaderDetails = () => {
    const waterBalanceStore = useContext(WaterBalanceDataContext);
    const balanceData = waterBalanceStore?.balanceData?.data;

    const [anchorEl, setAnchorEl] = useState(null);
    const [targetPopover, setTargetPopover] = useState(null);

    //eslint-disable-next-line
    const handleClick = (event, value) => {
        setTargetPopover(value);
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setTargetPopover(null);
    };

    const open = Boolean(anchorEl);

    return (
        <>
            {balanceData?.summary?.map((element, waterBalanceHeaderIndex) => (
                <Box
                    sx={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                    }}
                    key={waterBalanceHeaderIndex}
                >
                    <Typography
                        sx={{
                            width: '100%',
                            fontSize: '1em',
                            fontWeight: 500,
                            display: 'flex',
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                            textWrap: 'nowrap',
                        }}
                    >
                        {element.displayName} : {element.value}{' '}
                        {balanceData.siUnit}
                        {/* TODO : uncomment details popup and remove eslint comment from declaration of below function */}
                        {/* <IconButton
                            onClick={(event) => {
                                handleClick(event, waterBalanceHeaderIndex);
                            }}
                        >
                            <InfoOutlinedIcon fontSize='small' />
                        </IconButton> */}
                        <If
                            condition={
                                targetPopover === waterBalanceHeaderIndex
                            }
                        >
                            <HeaderDialogue
                                element={element}
                                open={open}
                                anchorEl={anchorEl}
                                handleClose={handleClose}
                                targetPopover={targetPopover}
                                siUnit={balanceData.siUnit}
                            />
                        </If>
                        <Typography
                            variant='span'
                            sx={{
                                fontSize: 20,
                                fontWeight: 400,
                                textAlign: 'center',
                            }}
                        >
                            {waterBalanceHeaderIndex <
                            balanceData?.summary.length - 1
                                ? '|'
                                : ''}
                        </Typography>
                    </Typography>
                </Box>
            ))}
        </>
    );
};

const WaterBalanceHeading = ({ height = '32px', siUnit = 'kl' }) => {
    const appStore = useContext(AppStoreContext);
    const homeStore = useContext(HomeStoreContext);

    const waterBalanceStore = useContext(WaterBalanceDataContext);

    const handleDateChange = (date) => {
        const params = {
            date1: DateFormatter.formatter(date),
        };
        AnalyticsService.sendEvent(
            AnalyticEvents.WATER_BALANCE_DATE_CHANGE,
            params
        );
        waterBalanceStore.setParams(params);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Container sx={{ pb: 2 }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: { xs: 'flex-end', md: 'center' },
                        justifyContent: 'space-between',
                        marginTop: '10px',
                        marginBottom: '10px',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: '',
                            gap: { xs: '0px', md: '12px' },
                            flexDirection: { xs: 'column', md: 'row' },
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: 24,
                                fontWeight: 500,
                            }}
                        >
                            Water Balance Diagram
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: 16,
                                fontWeight: 400,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                            }}
                        >
                            (All values are present in{' '}
                            {waterBalanceStore.isLoading ? (
                                <CustomLoader size={20} />
                            ) : (
                                siUnit
                            )}{' '}
                            )
                        </Typography>
                    </Box>
                    <ButtonBase
                        style={{
                            color: '#4385F3',
                            textDecoration: 'underline',
                        }}
                        onClick={homeStore.handleStartFeatureTour}
                    >
                        Know the Features
                    </ButtonBase>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        columnGap: '28px',
                        rowGap: '16px',
                        justifyContent: 'flex-end',
                        flexWrap: 'wrap',
                    }}
                >
                    <Box
                        className='water-balance-header-details'
                        sx={{
                            minHeight: height,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-evenly',
                            flexWrap: 'wrap',
                            flexBasis: '800px',
                            flexGrow: 5,
                            flexShrink: 3,
                            background: '#81c2d92e',
                            border: `1px solid ${assets.colors.waterBalanceBlueColor}`,
                            borderRadius: '1px',
                        }}
                    >
                        <If condition={!waterBalanceStore.isLoading}>
                            <HeaderDetails />
                        </If>
                        <If condition={waterBalanceStore.isLoading}>
                            <Expanded
                                extraSx={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '100%',
                                }}
                            >
                                <CustomLoader
                                    sx={{ maxHeight: height, padding: '10px' }}
                                />
                            </Expanded>
                        </If>
                    </Box>
                    <Box
                        className='water-balance-select-date'
                        sx={{
                            display: 'flex',
                            maxWidth: '280px',
                            flexDirection: 'column',
                            justifyContent: 'start',
                            gap: '2px',
                            flexBasis: '200px',
                            flexShrink: 0,
                            flexGrow: 1,
                            alignSelf: 'right',
                        }}
                    >
                        <If condition={waterBalanceStore.balanceData.data}>
                            <CustomSingleDatePicker
                                onChange={(date) => {
                                    waterBalanceStore.setIsLoading(true);
                                    handleDateChange(date);
                                }}
                                defaultValue={moment()}
                                disabled={
                                    waterBalanceStore.isLoading ||
                                    !waterBalanceStore.balanceData.data
                                }
                                value={moment(
                                    waterBalanceStore.params.date1,
                                    'DD/MM/YYYY'
                                )}
                                minDate={moment(
                                    appStore?.loginData?.startDate,
                                    'DD/MM/YYYY'
                                )}
                                borderRadius='1px'
                                restStyle={{
                                    height: height,
                                }}
                            />
                        </If>
                        <IfNot condition={waterBalanceStore.balanceData.data}>
                            <CustomSingleDatePicker
                                label={'Select Date'}
                                disabled={true}
                                borderRadius='1px'
                                restStyle={{
                                    height: height,
                                }}
                            />
                        </IfNot>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default WaterBalanceHeading;
