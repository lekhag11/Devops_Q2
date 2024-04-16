import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    Box,
    Checkbox,
    FormControlLabel,
    Paper,
    DialogTitle,
    Popover,
    DialogContent,
    useMediaQuery,
    useTheme,
    Tooltip,
    ToggleButtonGroup,
    ToggleButton,
    Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AppButton from 'src/components/button/AppButton';
import AppIconButton from 'src/components/button/AppIconButton';
import CustomMultiDateRangePicker from 'src/components/date-picker/CustomMultiDateRangePicker';
import { ConsumptionDataType } from 'src/enums/consumptionDataType';
import { DateFormatter } from 'src/utils/dateFormatter';
import moment from 'moment';
import { assets } from 'src/assets/assets';
import _ from 'lodash';
import { AppStoreContext } from 'src/store/AppStore';
import { useRef } from 'react';
import { GetParamsData } from 'src/utils/getParams';
import { AnalyticsService } from 'src/services/analytics/analyticsService';
import { AnalyticEvents } from 'src/enums/analyticsEnum';

const HeaderForm = ({ consumptionStore, handleDialogueClose }) => {
    const { categoryId } = useParams();
    const [fromDate, setFromDate] = useState(moment());
    const [toDate, setToDate] = useState();
    const [disableFrom, setDisableFrom] = useState(false);
    const [disableTo, setDisableTo] = useState(true);
    const [comparisonBoxDisable, setComparisonBoxDisable] = useState(false);
    const [dateLabel, setDateLabel] = useState({
        label1: 'Date',
        label2: 'Comparison Date',
    });
    const [headerInputChange, setHeaderInputChange] = useState(false);
    const [initialRender, setInitialRender] = useState(true);

    const rawParamObject = useRef({
        date1: moment(new Date()).format('DD/MM/YYYY'),
        category: categoryId,
        type: 'HOUR',
    });

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const appStore = useContext(AppStoreContext);

    useEffect(() => {
        if (!headerInputChange) return;
        updateRefParamObject();
        //eslint-disable-next-line
    }, [headerInputChange]);

    useEffect(() => {
        handleRadioButtonChange(consumptionStore.consumptionDataType);
        //eslint-disable-next-line
    }, [consumptionStore.consumptionDataType]);

    useEffect(() => {
        setDisableTo(!consumptionStore.comparisonBox);
        if (initialRender) return;
        handleComparison();
        //eslint-disable-next-line
    }, [consumptionStore.comparisonBox]);

    const handleDatePickerInputChange = (func, val) => {
        func(val);
        setHeaderInputChange(true);
    };

    const handleRadioButtonChange = (selectedType) => {
        handleDateChange();
        handleUiChangesBasedOnDataType(selectedType);
        if (initialRender) {
            setInitialRender(false);
            return;
        }
        setHeaderInputChange(true);
    };

    const handleUiChangesBasedOnDataType = (selectedType) => {
        setHeaderInputChange(false);

        let datePickerLabel,
            disableFromDatePickerFlag,
            comparisonBoxDisableFlag;

        if (selectedType === ConsumptionDataType.HOURS) {
            comparisonBoxDisableFlag =
                DateFormatter.formatter(moment) ===
                appStore?.loginData?.startDate;
            datePickerLabel = {
                label1: 'Date',
                label2: 'Comparison Date',
            };
            disableFromDatePickerFlag = false;
        } else if (selectedType === ConsumptionDataType.DAYS) {
            comparisonBoxDisableFlag =
                DateFormatter.formatter(
                    DateFormatter.getStartDate(moment()),
                    'MMM/YYYY'
                ) ===
                DateFormatter.formatter(
                    DateFormatter.stringToDate(appStore?.loginData?.startDate),
                    'MMM/YYYY'
                );
            datePickerLabel = {
                label1: 'Month',
                label2: 'Comparison Month',
            };
            disableFromDatePickerFlag = false;
        } else if (selectedType === ConsumptionDataType.MONTHS) {
            if (
                DateFormatter.formatter(
                    DateFormatter.getStartDate(moment(), 'year'),
                    'YYYY'
                ) ===
                DateFormatter.formatter(
                    DateFormatter.stringToDate(appStore?.loginData?.startDate),
                    'YYYY'
                )
            ) {
                comparisonBoxDisableFlag = true;
                consumptionStore.setComparisonBox(false);
                setDisableTo(true);
            }
            datePickerLabel = {
                label1: 'Year',
                label2: 'Comparison Year',
            };
            disableFromDatePickerFlag = false;
        } else if (selectedType === ConsumptionDataType.YEARS) {
            setFromDate(null);
            setToDate(null);
            disableFromDatePickerFlag = true;
            comparisonBoxDisableFlag = true;
            datePickerLabel = {
                label1: `${DateFormatter.formatter(
                    DateFormatter.stringToDate(appStore?.loginData?.startDate),
                    'YYYY'
                )} - ${DateFormatter.formatter(new Date(), 'YYYY')}`,
                label2: `${DateFormatter.formatter(
                    DateFormatter.stringToDate(appStore?.loginData?.startDate),
                    'YYYY'
                )} - ${DateFormatter.formatter(new Date(), 'YYYY')}`,
            };
            consumptionStore.setComparisonBox(false);
            setDisableTo(true);
        }
        setComparisonBoxDisable(comparisonBoxDisableFlag);
        setDateLabel(datePickerLabel);
        setDisableFrom(disableFromDatePickerFlag);
    };

    const handleComparison = () => {
        handleDateChange();
        if (consumptionStore.comparisonBox) {
            setHeaderInputChange(true);
        }
    };

    const handleDateChange = (from, to) => {
        setFromDate(
            GetParamsData.getDateBasedOnType(
                from,
                consumptionStore.consumptionDataType
            )
        );

        if (!consumptionStore.comparisonBox) {
            setToDate(null);
            consumptionStore.setComparisonMode(false);
            return;
        }
        setToDate(
            GetParamsData.getToDateBasedOnType(
                consumptionStore.consumptionDataType
            )
        );
    };

    const updateRefParamObject = () => {
        rawParamObject.current = {
            date1: fromDate,
            date2: toDate,
            type: consumptionStore.consumptionDataType,
            category: consumptionStore.params.category,
        };
        setHeaderInputChange(false);
        getComparisonData();
    };

    const getComparisonData = () => {
        let paramCall = GetParamsData.rawParamsToParams(rawParamObject.current);
        if (
            consumptionStore.consumptionDataType === ConsumptionDataType.YEARS
        ) {
            paramCall = {
                ...paramCall,
                date1: appStore?.loginData?.startDate,
                date2: null,
            };
        }
        AnalyticsService.sendEvent(AnalyticEvents.CONSUMPTION_TREND, paramCall);
        consumptionStore.setParams(paramCall);
    };

    const getDatePickerType = () => {
        if (consumptionStore.consumptionDataType === ConsumptionDataType.DAYS) {
            return 'month';
        }
        if (
            consumptionStore.consumptionDataType === ConsumptionDataType.MONTHS
        ) {
            return 'year';
        }
        return undefined;
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                flexDirection: { xs: 'column', lg: 'row' },
                flexGrow: 2,
                padding: '0px !important',
                paddingBottom: '8px',
                gap: { sm: '12px', lg: '0px' },
            }}
        >
            <ToggleButtonGroup
                value={consumptionStore?.consumptionDataType}
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: { sm: 'space-around', md: 'center' },
                    alignItems: 'center',
                    flexWrap: { xs: 'wrap', md: 'nowrap' },
                    gap: '12px',
                    '& .MuiToggleButtonGroup-grouped': {
                        aspectRatio: '5/2',
                        borderRadius: '0px',

                        overflow: 'unset',
                    },
                    width: { sm: '100%', lg: 'fit-content' },
                }}
                onChange={(event) => {
                    consumptionStore.setConsumptionDataType(event.target.value);
                }}
                disabled={consumptionStore.loading}
                exclusive
            >
                {_.keys(ConsumptionDataType).map((key, index, array) => {
                    return (
                        <ToggleButton
                            value={ConsumptionDataType[key]}
                            sx={{
                                height: '36px',
                                fontSize: '16px',
                                color: '#000000',
                                fontWeight: '400',
                                textTransform: 'none',
                                borderColor: `${assets.colors.divider} !important`,
                                '&.Mui-selected': {
                                    backgroundColor: '#fff',
                                    color: assets.colors.primary,
                                    fontWeight: '700',
                                    border: 1,
                                    borderColor: `${assets.colors.primary}  !important`,
                                },
                            }}
                            key={index}
                        >
                            {key.slice(0, 1) + key.slice(1).toLowerCase()}
                        </ToggleButton>
                    );
                })}
            </ToggleButtonGroup>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: { xs: 'column', sm: 'row' },
                    flexGrow: 3,
                }}
            >
                <Tooltip
                    title={
                        comparisonBoxDisable
                            ? 'Comparison Mode is Disabled'
                            : ''
                    }
                    disableFocusListener
                    disableInteractive
                    arrow
                >
                    <Box sx={{ margin: 'auto' }}>
                        <FormControlLabel
                            label={
                                <Typography fontSize={14}>
                                    {' '}
                                    Comparison
                                </Typography>
                            }
                            labelPlacement={isMobile ? 'end' : 'bottom'}
                            sx={{
                                margin: { xs: '6px', sm: '0px 16px' },
                                '.MuiFormControlLabel-label.Mui-disabled': {
                                    color: assets.colors.disabled,
                                },
                            }}
                            control={
                                <Checkbox
                                    checked={consumptionStore.comparisonBox}
                                    sx={{
                                        padding: {
                                            xs: '12px',
                                            sm: '0px',
                                        },
                                        '&.Mui-checked': {
                                            color: assets.colors.primary,
                                        },
                                        '&.Mui-disabled': {
                                            color: assets.colors.disabled,
                                        },
                                    }}
                                    onChange={() => {
                                        consumptionStore.setComparisonBox(
                                            !consumptionStore.comparisonBox
                                        );
                                    }}
                                    disabled={
                                        comparisonBoxDisable ||
                                        consumptionStore.loading
                                    }
                                />
                            }
                        />
                    </Box>
                </Tooltip>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: { xs: 'column', sm: 'row' },
                        padding: { xs: '0px 12px', sm: '0px' },
                    }}
                >
                    <CustomMultiDateRangePicker
                        type={getDatePickerType()}
                        labelFrom={dateLabel.label1}
                        labelTo={dateLabel.label2}
                        minDate1={GetParamsData.getMinDate(
                            consumptionStore.consumptionDataType,
                            appStore?.loginData?.startDate
                        )}
                        minDate2={GetParamsData.getMinDate(
                            consumptionStore.consumptionDataType,
                            appStore?.loginData?.startDate
                        )}
                        defaultValueFrom={fromDate || moment()}
                        defaultValueTo={toDate}
                        valueFrom={fromDate}
                        valueTo={toDate}
                        disableFrom={disableFrom}
                        disableTo={disableTo}
                        loading={consumptionStore.loading}
                        restStyleFrom={{
                            borderRadius: '0px',
                            height: '36px',
                        }}
                        restStyleTo={{
                            borderRadius: '0px',
                            height: '36px',
                        }}
                        onChangeFrom={(val) => {
                            handleDatePickerInputChange(setFromDate, val);
                        }}
                        onChangeTo={(val) => {
                            handleDatePickerInputChange(setToDate, val);
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
};

const ComparisonHeader = ({ consumptionStore }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [anchorEl, setAnchorEl] = React.useState(null);

    const [dialogOpen, setDialogOpen] = useState(false);

    const handleClick = (event) => {
        setDialogOpen(true);
        setAnchorEl(event.target);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setDialogOpen(false);
    };

    useEffect(() => {
        if (!isMobile) {
            handleClose();
        }
    }, [isMobile]);

    return (
        <>
            <AppButton
                value={'Comparison Mode'}
                height={'fit-content'}
                restStyle={{
                    padding: '4px 12px',
                    position: 'absolute',
                    top: '0px',
                    right: '16px',
                    display: { xs: 'block', sm: 'none' },
                }}
                onClick={(event) => handleClick(event)}
            />

            <Popover
                open={dialogOpen}
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
                            height: '60px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingRight: '10px',
                        }}
                    >
                        <DialogTitle>Comparison</DialogTitle>
                        <AppIconButton
                            icon={
                                <CloseIcon
                                    sx={{ strokeWidth: 1 }}
                                    onClick={handleClose}
                                />
                            }
                        />
                    </Box>

                    <DialogContent>
                        <HeaderForm
                            consumptionStore={consumptionStore}
                            dialogOpen={dialogOpen}
                            handleDialogueClose={handleClose}
                        />
                    </DialogContent>
                </Paper>
            </Popover>
            <Box
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    width: '100%',
                    top: '64px',
                    zIndex: '1199',
                    padding: '0px',
                }}
            >
                <HeaderForm
                    consumptionStore={consumptionStore}
                    handleDialogueClose={handleClose}
                />
            </Box>
        </>
    );
};

export default ComparisonHeader;
