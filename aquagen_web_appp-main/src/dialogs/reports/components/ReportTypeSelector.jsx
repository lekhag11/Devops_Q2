import React from 'react';
import {
    Box,
    Typography,
    RadioGroup,
    FormControlLabel,
    Radio,
    DialogContentText,
} from '@mui/material';
import { ReportType } from 'src/enums/reportType';

const ReportTypeSelector = ({
    selectedReportType,
    handleOnReportTypeChange,
    showDaily,
    showMonthly,
    showHourly,
    showGranular,
}) => {
    return (
        <Box sx={{ pt: 1.5 }}>
            <Typography
                sx={{
                    fontSize: '16px',
                    display: 'flex',
                }}
            >
                Select Report Type
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'start',
                }}
            >
                <RadioGroup
                    defaultValue={selectedReportType}
                    onChange={handleOnReportTypeChange}
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                    }}
                >
                    {showDaily && (
                        <FormControlLabel
                            key={ReportType.DAILY}
                            sx={{ alignItems: 'start' }}
                            value={ReportType.DAILY}
                            control={<Radio size='small' />}
                            label={
                                <Box sx={{ mt: 1 }}>
                                    <Typography
                                        sx={{
                                            color: 'black',
                                            fontWeight: 500,
                                            fontSize: 14,
                                        }}
                                    >
                                        Daily
                                    </Typography>
                                    <DialogContentText
                                        fontSize={12}
                                        sx={{ color: 'gray' }}
                                    >
                                        (all units)
                                    </DialogContentText>
                                </Box>
                            }
                        />
                    )}

                    {showMonthly && (
                        <FormControlLabel
                            key={ReportType.MONTHLY}
                            sx={{ alignItems: 'start' }}
                            value={ReportType.MONTHLY}
                            control={<Radio size='small' />}
                            label={
                                <Box sx={{ mt: 1 }}>
                                    <Typography
                                        sx={{
                                            color: 'black',
                                            fontWeight: 500,
                                            fontSize: 14,
                                        }}
                                    >
                                        Monthly
                                    </Typography>
                                    <DialogContentText
                                        fontSize={12}
                                        sx={{ color: 'gray' }}
                                    >
                                        (all units)
                                    </DialogContentText>
                                </Box>
                            }
                        />
                    )}

                    {showHourly && (
                        <FormControlLabel
                            key={ReportType.HOURLY}
                            sx={{ alignItems: 'start' }}
                            value={ReportType.HOURLY}
                            control={<Radio size='small' />}
                            label={
                                <Box sx={{ mt: 1 }}>
                                    <Typography
                                        sx={{
                                            color: 'black',
                                            fontWeight: 500,
                                            fontSize: 14,
                                        }}
                                    >
                                        Hourly
                                    </Typography>
                                    <DialogContentText
                                        fontSize={12}
                                        sx={{ color: 'gray' }}
                                    ></DialogContentText>
                                </Box>
                            }
                        />
                    )}

                    {showGranular && (
                        <FormControlLabel
                            key={ReportType.GRANULAR}
                            sx={{ alignItems: 'start' }}
                            value={ReportType.GRANULAR}
                            control={<Radio size='small' />}
                            label={
                                <Box sx={{ mt: 1 }}>
                                    <Typography
                                        sx={{
                                            color: 'black',
                                            fontWeight: 500,
                                            fontSize: 14,
                                        }}
                                    >
                                        Granular
                                    </Typography>
                                    <DialogContentText
                                        fontSize={12}
                                        sx={{ color: 'gray' }}
                                    >
                                        (5 mins)
                                    </DialogContentText>
                                </Box>
                            }
                        />
                    )}
                </RadioGroup>
            </Box>
        </Box>
    );
};

export default ReportTypeSelector;
