import React from 'react';
import { Box, Typography } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import AppButton from 'src/components/button/AppButton';
import { assets } from 'src/assets/assets';
import { ReportFormat } from 'src/enums/reportFormat';

const ReportFormatSelector = ({ reportFormat, setReportFormat }) => {
    return (
        <Box sx={{ mt: 2 }}>
            <Typography
                sx={{
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                Select Type
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    py: 0,
                }}
            >
                <AppButton
                    key={ReportFormat.EXCEL}
                    variant='outlined'
                    value='Excel'
                    onClick={() => setReportFormat(ReportFormat.EXCEL)}
                    restStyle={{
                        border: 2,
                        px: 4,
                    }}
                    borderRadius={1}
                    width={{ xs: 1, md: 0.5 }}
                    my={1}
                    backgroundColor={
                        reportFormat === ReportFormat.EXCEL &&
                        assets.colors.lightGreen + '40'
                    }
                    borderColor={
                        reportFormat === ReportFormat.EXCEL
                            ? assets.colors.black
                            : assets.colors.divider
                    }
                    startIcon={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <DoneIcon
                                sx={{
                                    stroke: assets.colors.black,
                                    strokeWidth: 1,
                                    mr: 1,
                                    opacity:
                                        reportFormat === ReportFormat.EXCEL
                                            ? 1
                                            : 0,
                                }}
                            />

                            <img
                                src={assets.images[`${ReportFormat.EXCEL}Icon`]}
                                height={22}
                                alt='icon'
                            />
                        </Box>
                    }
                />

                <Box sx={{ width: '8px' }} />

                <AppButton
                    key={ReportFormat.PDF}
                    variant='outlined'
                    value='PDF'
                    onClick={() => setReportFormat(ReportFormat.PDF)}
                    restStyle={{
                        border: 2,
                        px: 4,
                    }}
                    my={1}
                    borderRadius={1}
                    width={{ xs: 1, md: 0.5 }}
                    backgroundColor={
                        reportFormat === ReportFormat.PDF &&
                        assets.colors.lightGreen + '40'
                    }
                    borderColor={
                        reportFormat === ReportFormat.PDF
                            ? assets.colors.black
                            : assets.colors.divider
                    }
                    startIcon={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <DoneIcon
                                sx={{
                                    stroke: assets.colors.black,
                                    strokeWidth: 1,
                                    mr: 1,
                                    opacity:
                                        reportFormat === ReportFormat.PDF
                                            ? 1
                                            : 0,
                                }}
                            />

                            <img
                                src={assets.images[`${ReportFormat.PDF}Icon`]}
                                height={22}
                                alt='icon'
                            />
                        </Box>
                    }
                />
            </Box>
        </Box>
    );
};

export default ReportFormatSelector;
