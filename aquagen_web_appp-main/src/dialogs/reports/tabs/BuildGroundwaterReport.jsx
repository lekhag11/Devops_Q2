import React, { useContext, useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Tabs,
    Tab,
    FormControl,
    Select,
    MenuItem,
} from '@mui/material';

import { AppStoreContext } from 'src/store/AppStore';
import {
    StandardCategoryReportType,
    StandardCategoryTypeUppercase,
} from 'src/enums/categoryType';
import ReportFormatSelector from 'src/dialogs/reports/components/ReportFormatSelector';
import DatePickerSelector from 'src/dialogs/reports/components/DatePickerSelector';
import ReportTypeSelector from 'src/dialogs/reports/components/ReportTypeSelector';
import ReportController from 'src/controllers/report/ReportController';
import ReportDownloadButton from 'src/dialogs/reports/components/ReportDownloadButton';
import { ReportType } from 'src/enums/reportType';
import { ReportFormat } from 'src/enums/reportFormat';
import If from 'src/components/logical/If';
import moment from 'moment';

const commonStyles = {
    typography: {
        fontSize: '14px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    formControl: {
        width: '94%',
    },
};

const BuildGroundwaterReport = () => {
    const appStore = useContext(AppStoreContext);
    const [startDate, setStartDate] = useState(moment().subtract(1, 'days'));
    const [endDate, setEndDate] = useState(null);
    const [unitId, setUnitId] = useState('');
    const [tabValue, setTabValue] = useState(0);

    const [reportFormat, setReportFormat] = useState(ReportFormat.EXCEL);
    const xlsx = ReportFormat.EXCEL;
    const pdf = ReportFormat.PDF;

    const [selectedReportType, setSelectedReportType] = useState(
        ReportType.DAILY
    );
    const [isIrFrIncluded, setIsIrFrIncluded] = useState(true);

    useEffect(() => {
        if (
            appStore.loginData.categoryUnits[
                StandardCategoryTypeUppercase.GROUND_WATER_LEVEL
            ]?.length > 0
        ) {
            setUnitId(
                appStore.loginData.categoryUnits[
                    StandardCategoryTypeUppercase.GROUND_WATER_LEVEL
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
                ? StandardCategoryReportType.GROUND_WATER_LEVEL
                : StandardCategoryReportType.CONSOLIDATED,
            selectedReportType.toLowerCase(),
            isIrFrIncluded ? reportFormat : ReportFormat.EXCEL,

            startDate,
            endDate,
            unitId,
            appStore
        );
    };

    const checkDataValidity = () => {
        if (
            selectedReportType !== ReportType.HOURLY &&
            selectedReportType !== ReportType.GRANULAR
        ) {
            return true;
        }

        if (!endDate) {
            return false;
        }

        if (startDate && !startDate) {
            return false;
        }

        if (startDate && endDate) {
            if (startDate.diff(endDate, 'day') > 7) {
                return false;
            }
        }

        return true;
    };

    const renderDownloadButtons = () => (
        <>
            <Box marginTop={1}></Box>

            <ReportFormatSelector
                reportFormat={reportFormat}
                setReportFormat={setReportFormat}
                xlsx={xlsx}
                pdf={pdf}
            />
        </>
    );

    const renderReportContent = () => (
        <>
            <ReportTypeSelector
                selectedReportType={selectedReportType}
                handleOnReportTypeChange={handleOnReportTypeChange}
                showDaily={true}
                showMonthly={true}
                showGranular={true}
            />

            <DatePickerSelector
                selectedReportType={selectedReportType}
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
            />

            <If condition={selectedReportType === ReportType.GRANULAR}>
                <Box marginTop={1}>
                    <Typography
                        sx={commonStyles.typography}
                        mt={2}
                        mb={1}
                    >
                        Select Unit
                    </Typography>

                    <Box marginTop={1}>
                        <FormControl
                            sx={{
                                ...commonStyles.formControl,
                                width: 1,
                            }}
                        >
                            <Select
                                labelId='demo-simple-select-label'
                                id='demo-simple-select'
                                value={unitId}
                                onChange={(event) =>
                                    setUnitId(event.target.value)
                                }
                            >
                                {appStore.loginData.categoryUnits[
                                    StandardCategoryTypeUppercase
                                        .GROUND_WATER_LEVEL
                                ]?.map((unit, index) => (
                                    <MenuItem
                                        key={`MENU_ITEM_${index}`}
                                        value={unit.id}
                                    >
                                        {unit.displayName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
            </If>
            {renderDownloadButtons()}
        </>
    );
    const renderReportContentWithdrawal = () => (
        <>
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

            <If condition={selectedReportType === ReportType.GRANULAR}>
                <Box marginTop={1}>
                    <Typography
                        sx={commonStyles.typography}
                        mt={2}
                        mb={1}
                    >
                        Select Unit
                    </Typography>

                    <Box marginTop={1}>
                        <FormControl
                            sx={{
                                ...commonStyles.formControl,
                                width: 1,
                            }}
                        >
                            <Select
                                labelId='demo-simple-select-label'
                                id='demo-simple-select'
                                value={unitId}
                                onChange={(event) =>
                                    setUnitId(event.target.value)
                                }
                            >
                                {appStore.loginData.categoryUnits[
                                    StandardCategoryTypeUppercase
                                        .GROUND_WATER_LEVEL
                                ]?.map((unit, index) => (
                                    <MenuItem
                                        key={`MENU_ITEM_${index}`}
                                        value={unit.id}
                                    >
                                        {unit.displayName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
            </If>
            {renderDownloadButtons()}
        </>
    );
    return (
        <Box
            elevation={3}
            sx={{ padding: '16px', background: 'white', marginTop: '0px' }}
        >
            <Tabs
                value={tabValue}
                onChange={(event, newValue) => setTabValue(newValue)}
                variant='fullWidth'
            >
                <Tab label='Level' />
                <If condition={false}>
                    <Tab label='Withdrawal' />
                </If>
            </Tabs>

            <If condition={tabValue === 0}>{renderReportContent()}</If>
            <If condition={tabValue === 1 && false}>
                {renderReportContentWithdrawal()}
            </If>

            <ReportDownloadButton
                onClick={reportsDownloadClick}
                disabled={!checkDataValidity()}
            />
        </Box>
    );
};
export default BuildGroundwaterReport;
