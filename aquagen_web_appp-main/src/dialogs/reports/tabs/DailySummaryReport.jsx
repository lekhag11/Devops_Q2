import React, { useState, useContext } from 'react';
import { Box, Typography } from '@mui/material';
import CustomSingleDatePicker from 'src/components/date-picker/CustomSingleDatePicker';
import moment from 'moment';

import { StandardCategoryReportType } from 'src/enums/categoryType';
import { ReportType } from 'src/enums/reportType';
import { ReportFormat } from 'src/enums/reportFormat';
import { AppStoreContext } from 'src/store/AppStore';
import ReportController from 'src/controllers/report/ReportController';
import AppButton from 'src/components/button/AppButton';

const DailySummaryReport = () => {
    const [selectedDate, setSelectedDate] = useState(
        moment().subtract(1, 'days')
    );

    const appStore = useContext(AppStoreContext);
    const summaryDownloadClick = () => {
        ReportController.downloadReport(
            StandardCategoryReportType.SUMMARY,
            ReportType.DAILY,
            ReportFormat.PDF,
            selectedDate,
            selectedDate, //Dummy
            '',
            appStore
        );
    };

    return (
        <Box sx={{ mx: '16px' }}>
            <Typography
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    fontSize: 18,
                    fontWeight: 'bold',
                }}
            >
                Daily Summary Report (pdf)
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    gap: '16px',
                    my: 1,
                    width: 1,
                }}
            >
                <CustomSingleDatePicker
                    type='day'
                    value={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    label='Select Date'
                    display='flex'
                    flexGrow='1'
                    borderRadius='1'
                />
                <AppButton
                    value={'Download Report'}
                    borderRadius={1}
                    onClick={summaryDownloadClick}
                    my={0}
                    height='40'
                    width={0.5}
                />
            </Box>
        </Box>
    );
};

export default DailySummaryReport;
