import React from 'react';
import {
    Box,
    ToggleButton,
    ToggleButtonGroup,
    Tooltip,
    Typography,
} from '@mui/material';
import ConsumptionIndicator from 'src/components/consumptionIndicator/ConsumptionIndicator';
import EnergyIndicator from 'src/components/consumptionIndicator/EnergyIndicator';
import { assets } from 'src/assets/assets';
import If from 'src/components/logical/If';
import { Formatter } from 'src/utils/formatter';
import usePageTypeCheck from 'src/hooks/usePageTypeCheck';
import { StandardCategoryType } from 'src/enums/categoryType';

const UnitToggle = ({
    category,
    categoryData,
    mainColor = assets.colors.secondary,
    comparisonColor = assets.colors.primary,
    selectedUnit,
    consumptionStore,
    handleUnitChange,
}) => {
    const { check } = usePageTypeCheck(StandardCategoryType.ENERGY_CATEGORY);

    return (
        <ToggleButtonGroup
            sx={{
                width: '100%',
                display: 'grid',
                gridTemplateColumns: {
                    xs: 'repeat(1, 10fr)',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)',
                    lg: 'repeat(4, 1fr)',
                },
                rowGap: 2,
                gap: 2,
                padding: { xs: 1.5, md: '0px 12px 12px 1px' },

                '& .MuiToggleButtonGroup-grouped': {
                    overflow: 'unset',
                },
                maxHeight: { xs: 200, md: 'fit-content' },
                overflowY: { xs: 'scroll', md: 'auto' },
                border: { xs: `1px solid ${assets.colors.divider}`, md: 0 },
            }}
            value={selectedUnit}
            onChange={handleUnitChange}
            exclusive
        >
            {category.units.map((unit) => (
                <ToggleButton
                    value={unit.unitId}
                    key={unit.unitId}
                    sx={{
                        height: '60px',
                        border: `1px solid ${assets.colors.divider} !important`,
                        color: '#000000',
                        fontWeight: '500',
                        borderRadius: 0,
                        textTransform: 'none',
                        '&.Mui-selected': {
                            backgroundColor: '#fff',
                            borderColor: `${assets.colors.primary} !important`,
                        },
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '8px',
                            flexGrow: 1,
                            width: '100%',
                        }}
                    >
                        <Tooltip
                            title={unit.displayName}
                            disableFocusListener
                            disableInteractive
                            arrow
                        >
                            <Typography
                                sx={{
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    whiteSpace: 'break-spaces',
                                    textAlign: 'left',
                                    flex: 3,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: '-webkit-box',
                                    WebkitLineClamp: '2',
                                    WebkitBoxOrient: 'vertical',
                                }}
                            >
                                {unit.displayName}
                            </Typography>
                        </Tooltip>

                        <Box
                            sx={{
                                flex: 4,
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    color: mainColor,
                                    textAlign: 'right',
                                }}
                            >
                                {Formatter.valueFormatter(
                                    unit?.value1,
                                    0,
                                    undefined,
                                    !unit?.online ? '--' : undefined
                                )}{' '}
                                {categoryData?.siUnit}
                            </Typography>
                            <Typography
                                sx={{
                                    display: consumptionStore.comparisonMode
                                        ? 'block'
                                        : 'none',
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    color: comparisonColor,
                                    textAlign: 'right',
                                }}
                            >
                                {Formatter.valueFormatter(
                                    unit?.value2,
                                    0,
                                    undefined,
                                    !unit?.online ? '--' : undefined
                                )}{' '}
                                {categoryData?.siUnit}
                            </Typography>
                        </Box>
                    </Box>
                    <If condition={!check && unit.online}>
                        <Box onClick={(e) => e.stopPropagation()}>
                            <ConsumptionIndicator
                                isLoading={unit.consumption}
                            />
                        </Box>
                    </If>
                    <If condition={check && unit.online}>
                        <Box onClick={(e) => e.stopPropagation()}>
                            <EnergyIndicator isLoading={unit.consumption} />
                        </Box>
                    </If>
                </ToggleButton>
            ))}
        </ToggleButtonGroup>
    );
};

export default UnitToggle;
