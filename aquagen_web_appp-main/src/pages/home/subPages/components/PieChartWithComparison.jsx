import {
    Box,
    ToggleButtonGroup,
    ToggleButton,
    Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import PieGraph from 'src/components/pieChart/PieGraph';
import { getPieChartDataBasedTopThreeValues } from 'src/utils/graphData';
import { assets } from 'src/assets/assets';
import If from 'src/components/logical/If';
import usePageTypeCheck from 'src/hooks/usePageTypeCheck';
import { StandardCategoryType } from 'src/enums/categoryType';

const PieChartWithComparison = ({
    units,
    comparisonMode,
    labelData,
    siUnit,
    mainColor = assets.colors.secondary,
    comparisonColor = assets.colors.primary,
}) => {
    const PieChoice = {
        MAIN: 'main',
        COMPARISON: 'comparison',
    };
    Object.freeze(PieChoice);

    const { check } = usePageTypeCheck(StandardCategoryType.ENERGY_CATEGORY);

    const [selectedPie, setSelectedPie] = useState(PieChoice.MAIN);

    useEffect(() => {
        setSelectedPie(PieChoice.MAIN);
    }, [comparisonMode, PieChoice.MAIN]);

    function fixedShuffleArray(array) {
        const evens = [];
        const odds = [];

        // Split the array into even and odd elements
        for (let i = 0; i < array.length; i++) {
            if (i % 2 === 0) {
                evens.push(array[i]);
            } else {
                odds.push(array[i]);
            }
        }

        // Combine the even and odd elements
        const shuffledArray = [...evens, ...odds];

        // Replace the original array with the shuffled one
        for (let i = 0; i < array.length; i++) {
            array[i] = shuffledArray[i];
        }
        return array;
    }

    function getPieChartColorPalette() {
        let color = assets.colors.consumptionBaseColor;
        if (check) {
            color = assets.colors.energyBaseColor;
        }
        let colors = [];
        for (let i = 255; i >= 80; i -= 20) {
            colors.push(`${color}${i.toString(16)}`);
        }

        return fixedShuffleArray(colors);
    }

    return (
        <>
            <Typography
                sx={{
                    padding: '10px',
                    pl: 0,
                    fontSize: '24px',
                    fontWeight: '500',
                    background: '#fff',
                    textAlign: 'center',
                    margin: 'auto',
                }}
            >
                Units
            </Typography>
            <Box
                display={selectedPie === PieChoice.MAIN ? 'block' : 'none'}
                sx={{
                    width: 'fit-content',
                    overflow: 'hidden',
                    margin: 'auto',
                }}
            >
                <PieGraph
                    data={getPieChartDataBasedTopThreeValues(units, 'value1')}
                    fillColor={mainColor}
                    siUnit={siUnit}
                    colorPalette={getPieChartColorPalette()}
                />
            </Box>
            <If condition={comparisonMode}>
                <Box
                    display={
                        selectedPie === PieChoice.COMPARISON ? 'block' : 'none'
                    }
                    sx={{
                        width: 'fit-content',
                        overflow: 'hidden',
                        margin: 'auto',
                    }}
                >
                    <PieGraph
                        data={getPieChartDataBasedTopThreeValues(
                            units,
                            'value2'
                        )}
                        fillColor={comparisonColor}
                        siUnit={siUnit}
                        colorPalette={getPieChartColorPalette()}
                    />
                </Box>
            </If>
            <Box
                sx={{
                    margin: 'auto',
                    width: 'fit-content',
                    top: '10px',
                    paddingLeft: '12px',
                    position: 'relative',
                }}
            >
                <ToggleButtonGroup
                    color={!check ? 'primaryTheme' : 'energyTheme'}
                    sx={{
                        '& .MuiToggleButtonGroup-grouped': {
                            padding: '16px 20px 6px',
                            border: 'none',
                            background: 'none',
                            borderRadius: '0px',
                            borderBottom: `4px solid ${assets.colors.divider}`,
                            '&.Mui-selected': {
                                borderBottom: `5px solid ${
                                    !check
                                        ? assets.colors.primary
                                        : assets.colors.orange
                                }`,
                                background: 'none',

                                '&.Mui-selected:hover': {
                                    background: 'none',
                                },
                            },
                        },
                    }}
                    onChange={(e) => {
                        setSelectedPie(e.target?.value);
                    }}
                    value={selectedPie}
                    exclusive
                >
                    <ToggleButton value={PieChoice.MAIN}>
                        {labelData?.dateLabel1 ||
                            labelData?.date1 ||
                            'DD/MM/YYYY'}
                    </ToggleButton>
                    <ToggleButton
                        value={PieChoice.COMPARISON}
                        sx={{ display: comparisonMode ? 'block' : 'none' }}
                    >
                        {labelData?.dateLabel2 ||
                            labelData?.date2 ||
                            'DD/MM/YYYY'}
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>
        </>
    );
};

export default PieChartWithComparison;
