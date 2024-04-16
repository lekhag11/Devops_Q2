import { Box } from '@mui/material';
import React from 'react';
import BarGraph from 'src/components/barGraph/BarGraph';
import If from 'src/components/logical/If';
import GraphHeader from 'src/pages/home/subPages/components/GraphHeader';
import GraphPopup from 'src/pages/home/subPages/components/GraphPopup';
import { Formatter } from 'src/utils/formatter';
import { getBarGraphData } from 'src/utils/graphData';

const GraphComponent = ({
    consumptionStore,
    comparisonMode,
    category,
    categoryData,
    labelData,
    mainColor,
    comparisonColor,
    endAdorment,
    isCollapse,
    startAdorment,
}) => {
    return (
        <Box
            sx={{
                marginLeft: { xs: '2px', sm: '0px' },
                padding: '12px',
                maxWidth: { xs: '100%', md: 'min-content' },
                overflow: 'hidden',
                position: 'relative',
                backgroundColor: '#ffffff',
            }}
        >
            <If condition={startAdorment}>{startAdorment}</If>
            <Box
                sx={{
                    position: 'relative',
                    display: 'flex',
                    gap: '0px',
                    alignItems: 'flex-start',
                    background: '#fff',
                    width: '100%',
                    marginTop: { xs: '12px', sm: '2px' },
                    paddingLeft: '8px',
                }}
            >
                <GraphHeader
                    category={category}
                    comparisonMode={comparisonMode}
                    categoryData={categoryData}
                    labelData={labelData}
                    mainColor={mainColor}
                    comparisonColor={comparisonColor}
                    mainValue={`${Formatter.valueFormatter(category?.total1)} ${
                        categoryData?.siUnit
                    }`}
                    comparisonValue={`${Formatter.valueFormatter(
                        category?.total2
                    )} ${categoryData?.siUnit}`}
                />
                <If condition={endAdorment}>{endAdorment}</If>
            </Box>
            <Box
                sx={{
                    width: '100%',
                    overflowX: 'auto',
                    overflowY: 'hidden',
                    height: 'fit-content',
                    display: isCollapse ? 'none' : 'block',
                }}
            >
                <GraphPopup
                    mainColor={mainColor}
                    comparisonColor={comparisonColor}
                    // graphPopupOpen={graphPopupOpen}
                    // setGraphPopupOpen={setGraphPopupOpen}
                />

                <BarGraph
                    data={getBarGraphData(category)}
                    comparisonMode={comparisonMode}
                    xAxisLabel={labelData?.label || labelData?.type}
                    mainColor={mainColor}
                    comparisonColor={comparisonColor}
                    mainValue={labelData?.date1}
                    comparisonValue={labelData?.date2}
                    siUnit={categoryData?.siUnit}
                    consumptionDataType={consumptionStore.consumptionDataType}
                    // TODO : clickable Graph Feature Remove False from condition
                    // onBarDoubleClick={
                    //     store.consumptionDataType !==
                    //         ConsumptionDataType.HOURS && false
                    //         ? (val) => {
                    //               clickableGraphStore.categoryGraphElementId.current =
                    //                   category.id;
                    //               handleClickableGraphPopup(val);
                    //           }
                    //         : null
                    // }
                />
            </Box>
        </Box>
    );
};

export default GraphComponent;
