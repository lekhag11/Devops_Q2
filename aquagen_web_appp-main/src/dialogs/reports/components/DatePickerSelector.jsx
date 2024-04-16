import React, { useContext } from 'react';
import { Box, Typography } from '@mui/material';
import CustomSingleDatePicker from 'src/components/date-picker/CustomSingleDatePicker';
import CustomMultiDateRangePicker from 'src/components/date-picker/CustomMultiDateRangePicker';
import moment from 'moment';
import { AppStoreContext } from 'src/store/AppStore';
import { ReportType } from 'src/enums/reportType';
import If from 'src/components/logical/If';

const DatePickerSelector = ({
    selectedReportType,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
}) => {
    const appStore = useContext(AppStoreContext);

    return (
        <Box sx={{ mt: 3 }}>
            <If condition={selectedReportType === ReportType.DAILY}>
                <Box>
                    <Typography
                        sx={{
                            fontSize: '14px',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            mb: 1,
                        }}
                    >
                        Select Date
                    </Typography>
                    <CustomSingleDatePicker
                        type='day'
                        value={startDate}
                        borderRadius={1}
                        onChange={(date) => setStartDate(date)}
                        label='Select Date'
                    />
                </Box>
            </If>
            <If condition={selectedReportType === ReportType.MONTHLY}>
                <Box>
                    <Typography
                        sx={{
                            fontSize: '14px',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            mb: 1,
                        }}
                    >
                        Select Month
                    </Typography>

                    <CustomSingleDatePicker
                        type='month'
                        value={startDate}
                        onChange={(date) => setStartDate(date)}
                        label='Select Month'
                        borderRadius={1}
                    />
                </Box>
            </If>
            <If
                condition={
                    selectedReportType === ReportType.HOURLY ||
                    selectedReportType === ReportType.GRANULAR
                }
            >
                <Box>
                    <Typography
                        sx={{
                            fontSize: '14px',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            mb: 1,
                        }}
                    >
                        Select Date (Max 7 days)
                    </Typography>

                    <CustomMultiDateRangePicker
                        labelFrom='From'
                        labelTo='To'
                        borderRadius={1}
                        defaultValueFrom={startDate}
                        defaultValueTo={endDate}
                        valueFrom={startDate}
                        valueTo={endDate}
                        minDate1={moment(
                            appStore?.loginData?.startDate,
                            'DD/MM/YYYY'
                        )}
                        maxDate1={moment().subtract(1, 'days')}
                        minDate2={
                            startDate ||
                            moment(appStore?.loginData?.startDate, 'DD/MM/YYYY')
                        }
                        maxDate2={
                            startDate
                                ? moment().diff(
                                      moment(startDate).add(7, 'days'),
                                      'days'
                                  ) >= 0
                                    ? moment(startDate).add(6, 'day')
                                    : moment()
                                : moment()
                        }
                        onChangeFrom={(val) => {
                            setStartDate(val);
                            setEndDate(null);
                        }}
                        onChangeTo={(val) => {
                            setEndDate(val);
                        }}
                    />

                    <If
                        condition={
                            startDate === undefined ||
                            startDate === '' ||
                            startDate === null ||
                            ((selectedReportType === ReportType.HOURLY ||
                                selectedReportType === ReportType.GRANULAR) &&
                                (endDate === undefined ||
                                    endDate === '' ||
                                    endDate === null))
                        }
                    >
                        <Typography
                            variant='caption'
                            sx={{ color: 'red', marginTop: '8px' }}
                        >
                            Please select valid date
                        </Typography>
                    </If>
                </Box>
            </If>
        </Box>
    );
};

export default DatePickerSelector;
