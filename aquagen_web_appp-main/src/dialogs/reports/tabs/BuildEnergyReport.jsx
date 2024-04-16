import React, { useContext, useState, useEffect } from 'react';
import { Box, Typography, FormControl, Select, MenuItem } from '@mui/material';

import {
    StandardCategoryReportType,
    StandardCategoryTypeUppercase,
} from 'src/enums/categoryType';
import ReportFormatSelector from 'src/dialogs/reports/components/ReportFormatSelector';
import ReportTypeSelector from 'src/dialogs/reports/components/ReportTypeSelector';
import DatePickerSelector from '../components/DatePickerSelector';
import ReportController from 'src/controllers/report/ReportController';
import { AppStoreContext } from 'src/store/AppStore';
import ReportDownloadButton from 'src/dialogs/reports/components/ReportDownloadButton';
import { ReportType } from 'src/enums/reportType';
import { ReportFormat } from 'src/enums/reportFormat';
import If from 'src/components/logical/If';
import moment from 'moment';

const BuildEnergyReport = () => {
    const [selectedReportType, setSelectedReportType] = useState(
        ReportType.DAILY
    );
    const [unitId, setUnitId] = useState('');

    const [startDate, setStartDate] = useState(moment().subtract(1, 'days'));
    const [endDate, setEndDate] = useState(null);
    const appStore = useContext(AppStoreContext);
    const [reportFormat, setReportFormat] = useState(ReportFormat.EXCEL);
    const [isIrFrIncluded, setIsIrFrIncluded] = useState(true);
    useEffect(() => {
        if (
            appStore.loginData.categoryUnits[
                StandardCategoryTypeUppercase.ENERGY_CATEGORY
            ]?.length > 0
        ) {
            setUnitId(
                appStore.loginData.categoryUnits[
                    StandardCategoryTypeUppercase.ENERGY_CATEGORY
                ][0].id
            );
        } else {
            setUnitId('');
        }
        setIsIrFrIncluded(true);
        // eslint-disable-next-line
    }, [selectedReportType]);

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

    const reportsDownloadClick = () => {
        ReportController.downloadReport(
            isIrFrIncluded
                ? StandardCategoryReportType.ENERGY_CATEGORY
                : StandardCategoryReportType.CONSOLIDATED,
            selectedReportType.toLowerCase(),
            isIrFrIncluded ? reportFormat : ReportFormat.EXCEL,

            startDate,
            endDate,
            unitId,
            appStore
        );
    };

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

    return (
        <Box sx={{ marginLeft: '16px', marginRight: '16px' }}>
            <Box>
                <ReportTypeSelector
                    selectedReportType={selectedReportType}
                    handleOnReportTypeChange={(event) =>
                        setSelectedReportType(event.target.value)
                    }
                    showDaily={true}
                    showMonthly={true}
                    showHourly={true}
                    showGranular={true}
                />
                <DatePickerSelector
                    selectedReportType={selectedReportType}
                    startDate={startDate}
                    endDate={endDate}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                />

                <If
                    condition={
                        selectedReportType === ReportType.HOURLY ||
                        selectedReportType === ReportType.GRANULAR
                    }
                >
                    <Box marginTop={1}>
                        <Typography
                            sx={commonStyles.typography}
                            mt={2}
                            mb={1}
                        >
                            Select Unit
                        </Typography>

                        <FormControl
                            sx={{
                                ...commonStyles.formControl,
                                width: 1,
                            }}
                        >
                            <Box marginTop={1}>
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
                                            .ENERGY_CATEGORY
                                    ]?.map((unit, index) => (
                                        <MenuItem
                                            key={`MENU_ITEM_${index}`}
                                            value={unit.id}
                                        >
                                            {unit.displayName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Box>
                        </FormControl>
                    </Box>
                </If>

                <Box marginTop={1}></Box>
                <ReportFormatSelector
                    reportFormat={reportFormat}
                    setReportFormat={setReportFormat}
                    xlsx={ReportFormat.EXCEL}
                    pdf={ReportFormat.PDF}
                />
            </Box>

            <ReportDownloadButton
                onClick={reportsDownloadClick}
                disabled={!checkDataValidity()}
            />
        </Box>
    );
};

export default BuildEnergyReport;
