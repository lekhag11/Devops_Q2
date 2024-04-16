import React from 'react';
import { Box, Typography } from '@mui/material';
import BarGraph from 'src/components/barGraph/BarGraph';
import GraphHeader from 'src/pages/home/subPages/components/GraphHeader';
import GraphPopup from 'src/pages/home/subPages/components/GraphPopup';
import { getBarGraphData } from 'src/utils/graphData';
import { assets } from 'src/assets/assets';
import { ConsumptionDataType } from 'src/enums/consumptionDataType';
import { Formatter } from 'src/utils/formatter';
import UnitToggle from 'src/pages/home/subPages/components/UnitToggle';

const MessageComponent = ({ show = false }) => {
    return (
        <Typography
            component={'span'}
            sx={{
                display: show ? 'auto' : 'none',
                color: assets.colors.grey,
                marginTop: { xs: '0px', sm: '12px' },
                marginLeft: '10px',
            }}
        >
            {`(Currently Offline)`}
        </Typography>
    );
};

const Units = ({
    consumptionStore,
    category,
    categoryData,
    labelData,
    mainColor = assets.colors.secondary,
    comparisonColor = assets.colors.primary,
    selectedUnit,
    setSelectedUnit,
    handleUnitChange,
}) => {
    return (
        <>
            <Box
                sx={{
                    paddingBottom: '14px',
                    overflowX: 'auto',
                    overflowY: 'unset',
                }}
            >
                <Typography
                    sx={{
                        fontSize: '22px',
                        fontWeight: '500',
                        marginBottom: '12px',
                    }}
                >
                    Units
                </Typography>
                <UnitToggle
                    category={category}
                    mainColor={mainColor}
                    comparisonColor={comparisonColor}
                    selectedUnit={selectedUnit}
                    setSelectedUnit={setSelectedUnit}
                    consumptionStore={consumptionStore}
                    categoryData={categoryData}
                    handleUnitChange={handleUnitChange}
                />
            </Box>
            <Box>
                {category.units.map((unit) => (
                    <Box
                        key={unit.unitId}
                        border={`1px solid ${assets.colors.primary}`}
                        mb={20}
                        pr={3}
                        display={
                            selectedUnit === unit.unitId ? 'block' : 'none'
                        }
                        sx={{
                            marginBottom: '32px',
                            position: 'relative',
                            overflow: 'hidden',
                            backgroundColor: '#fff',
                        }}
                    >
                        <Box
                            sx={{
                                margin: '16px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                flexDirection: 'column',
                            }}
                        >
                            <GraphHeader
                                category={unit}
                                comparisonMode={consumptionStore.comparisonMode}
                                categoryData={categoryData}
                                labelData={labelData}
                                mainColor={mainColor}
                                comparisonColor={comparisonColor}
                                messageComponent={
                                    <MessageComponent show={!unit.online} />
                                }
                                mainValue={`${Formatter.valueFormatter(
                                    unit?.value1,
                                    0,
                                    undefined,
                                    !unit.online ? '--' : undefined
                                )} ${categoryData.siUnit}`}
                                comparisonValue={`${Formatter.valueFormatter(
                                    unit?.value2,
                                    0,
                                    undefined,
                                    !unit.online ? '--' : undefined
                                )}${categoryData.siUnit}`}
                            />
                            <Typography
                                sx={{
                                    color: assets.colors.grey,
                                    marginTop: { xs: '0px' },
                                }}
                            >
                                Last Updated :{' '}
                                {unit.lastUpdatedAt || '00/00/00 00:00'}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                overflowX: 'auto',
                                overflowY: 'hidden',
                                paddingBottom: '12px',
                            }}
                        >
                            <GraphPopup
                                mainColor={mainColor}
                                comparisonColor={comparisonColor}
                                categoryData={categoryData}
                                // graphPopupOpen={graphPopupOpen}
                                // setGraphPopupOpen={setGraphPopupOpen}
                            />
                            <BarGraph
                                data={getBarGraphData(unit)}
                                comparisonMode={consumptionStore.comparisonMode}
                                xAxisLabel={labelData?.label || labelData?.type}
                                mainColor={mainColor}
                                comparisonColor={comparisonColor}
                                mainValue={labelData?.date1}
                                aspect={5}
                                comparisonValue={labelData?.date2}
                                threshold={
                                    consumptionStore?.consumptionData?.labelData
                                        ?.type === ConsumptionDataType.DAYS
                                        ? unit?.meta?.threshold
                                        : undefined
                                }
                                siUnit={categoryData.siUnit}
                                consumptionDataType={
                                    consumptionStore.consumptionDataType
                                }

                                //TODO : clickable Graph feature uncomment below
                                // onBarDoubleClick={(val) => {
                                //     clickableGraphStore.unitGraphElementId.current =
                                //         unit.unitId;
                                //     clickableGraphStore.categoryGraphElementId.current =
                                //         category.id;
                                //     handleClickableGraphPopup(val);
                                // }}
                            />
                        </Box>
                    </Box>
                ))}
            </Box>
        </>
    );
};

export default Units;
