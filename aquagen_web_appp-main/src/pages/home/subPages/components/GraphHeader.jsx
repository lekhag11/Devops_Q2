import React from 'react';
import { Box, Divider, Typography } from '@mui/material';
import { assets } from 'src/assets/assets';
import If from 'src/components/logical/If';

const GraphHeader = ({
    category,
    comparisonMode,
    categoryData,
    mainColor = assets.colors.secondary,
    comparisonColor = assets.colors.primary,
    labelData,
    mainValue,
    comparisonValue,
    messageComponent,
}) => {
    return (
        <Box sx={{ width: '100%' }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: { xs: 'column', md: 'row' },
                    flexWrap: 'wrap',
                }}
            >
                <Typography
                    sx={{
                        fontSize: '18px',
                        fontWeight: 500,
                    }}
                >
                    {category?.displayName}
                    {messageComponent}
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                    }}
                >
                    <Box
                        display={'flex'}
                        alignItems={'center'}
                        marginRight={'12px'}
                    >
                        <Box
                            display={'inline-block'}
                            width={8}
                            height={8}
                            mr={0.7}
                            sx={{ background: mainColor }}
                            borderRadius={'1px'}
                            textAlign={'right'}
                        />
                        <Typography
                            sx={{
                                fontSize: '16px',
                                textWrap: 'nowrap',
                                marginRight: '4px',
                            }}
                        >
                            {labelData?.dateLabel1 ||
                                labelData?.date1 ||
                                'DD/MM/YYYY'}
                        </Typography>
                        <Divider
                            orientation='vertical'
                            variant='middle'
                            flexItem
                        />
                        <Typography
                            sx={{
                                fontSize: '20px',
                                fontWeight: '600',
                                textWrap: 'nowrap',
                                marginLeft: '4px',
                            }}
                        >
                            {mainValue}
                        </Typography>
                    </Box>

                    <If condition={comparisonMode}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <Box
                                display={'inline-block'}
                                width={8}
                                height={8}
                                mr={0.7}
                                sx={{ background: comparisonColor }}
                                borderRadius={'1px'}
                            />
                            <Typography
                                sx={{
                                    fontSize: '16px',
                                    textWrap: 'nowrap',
                                    marginRight: '4px',
                                }}
                            >
                                {labelData?.dateLabel2 ||
                                    labelData?.date2 ||
                                    'DD/MM/YYYY'}
                            </Typography>
                            <Divider
                                orientation='vertical'
                                variant='middle'
                                flexItem
                            />
                            <Typography
                                sx={{
                                    fontSize: '20px',
                                    fontWeight: '600',
                                    textWrap: 'nowrap',
                                    marginLeft: '4px',
                                }}
                            >
                                {comparisonValue}
                            </Typography>
                        </Box>
                    </If>
                </Box>
            </Box>
        </Box>
    );
};

export default GraphHeader;
