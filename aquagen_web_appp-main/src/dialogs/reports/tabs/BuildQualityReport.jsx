import React, { useContext, useState, useEffect } from 'react';
import { Box } from '@mui/material';

import { AppStoreContext } from 'src/store/AppStore';
import {
    StandardCategoryReportType,
    StandardCategoryTypeUppercase,
} from 'src/enums/categoryType';
import DatePickerSelector from 'src/dialogs/reports/components/DatePickerSelector';
import ReportTypeSelector from 'src/dialogs/reports/components/ReportTypeSelector';
import ReportFormatSelector from 'src/dialogs/reports/components/ReportFormatSelector';
import ReportController from 'src/controllers/report/ReportController';
import ReportDownloadButton from 'src/dialogs/reports/components/ReportDownloadButton';
import { ReportType } from 'src/enums/reportType';
import { ReportFormat } from 'src/enums/reportFormat';
import moment from 'moment';

const BuildQualityReport = () => {
    const [selectedReportType, setSelectedReportType] = useState(
        ReportType.DAILY
    );

    const [startDate, setStartDate] = useState(moment().subtract(1, 'days'));
    const [endDate, setEndDate] = useState(null);

    const appStore = useContext(AppStoreContext);
    const [reportFormat, setReportFormat] = useState(ReportFormat.EXCEL);
    const [unitId, setUnitId] = useState('');
    const [isIrFrIncluded, setIsIrFrIncluded] = useState(true);
    useEffect(() => {
        if (
            appStore.loginData.categoryUnits[
                StandardCategoryTypeUppercase.QUALITY_CATEGORY
            ]?.length > 0
        ) {
            setUnitId(
                appStore.loginData.categoryUnits[
                    StandardCategoryTypeUppercase.QUALITY_CATEGORY
                ][0].id
            );
        } else {
            setUnitId('');
        }
        setIsIrFrIncluded(true);
        // eslint-disable-next-line
    }, [selectedReportType]);

    const handleOnReportTypeChange = (event) => {
        setSelectedReportType(event.target.value);
    };

    const reportsDownloadClick = () => {
        ReportController.downloadReport(
            isIrFrIncluded
                ? StandardCategoryReportType.QUALITY_CATEGORY
                : StandardCategoryReportType.CONSOLIDATED,
            selectedReportType.toLowerCase(),
            isIrFrIncluded ? reportFormat : ReportFormat.EXCEL,

            startDate,
            endDate,
            unitId,
            appStore
        );
    };

    return (
        <Box sx={{ marginLeft: '16px', marginRight: '16px' }}>
            <Box>
                <ReportTypeSelector
                    selectedReportType={selectedReportType}
                    handleOnReportTypeChange={handleOnReportTypeChange}
                    showDaily={true}
                    showMonthly={true}
                />

                <DatePickerSelector
                    selectedReportType={selectedReportType}
                    startDate={startDate}
                    endDate={endDate}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                />

                <Box marginTop={1}></Box>

                <ReportFormatSelector
                    reportFormat={reportFormat}
                    setReportFormat={setReportFormat}
                    xlsx={ReportFormat.EXCEL}
                    pdf={ReportFormat.PDF}
                />

                <ReportDownloadButton onClick={reportsDownloadClick} />
            </Box>
        </Box>
    );
};

export default BuildQualityReport;
