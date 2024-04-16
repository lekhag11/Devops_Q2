import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine,
    CartesianGrid,
} from 'recharts';

import GenericInfo from 'src/components/info/GenericInfo';
import { assets } from 'src/assets/assets';
import DefaultTooltip from 'src/components/graph/DefaultTooltip';
import RenderCustomTick from 'src/components/barGraph/CustomTick';
import HoursTooltip from '../graph/HoursTooltip';
import { ConsumptionDataType } from 'src/enums/consumptionDataType';

/**
 * give height to parent container for graphs
 * graph is by default at 100% height
 */

// TODO - Break Bar when value difference is high.
// TODO - Custom Label for both X-axis (am-pm values) as well as Threshold line

const CustomizedAxisTick = ({ x, y, payload, xAxisLabelFontSize }) => {
    const hour = payload.value - 1;
    const amPm = hour >= 12 ? 'pm' : 'am';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;

    return (
        <g transform={`translate(${x},${y})`}>
            <text
                dx={-13}
                dy={7}
                fontSize={xAxisLabelFontSize}
                textAnchor='middle'
                fill='#666'
                transform='rotate(0)'
            >
                {displayHour}
            </text>
            <text
                dx={-13}
                dy={20}
                fontSize={xAxisLabelFontSize}
                textAnchor='middle'
                fill='#666'
                transform='rotate(0)'
            >
                {amPm}
            </text>
        </g>
    );
};

const BarGraph = ({
    data,
    comparisonMode,
    mainColor = assets.colors.secondary,
    comparisonColor = assets.colors.primary,
    minWidth = 700,
    xAxisLabel = 'x-Axis',
    yAxisFontSize = 12,
    xAxisLabelFontSize = 11,
    mainValue,
    comparisonValue,
    tooltipBackgroundColor,
    tootltipPadding,
    tooltipContentStyle,
    tooltipBorderRadius,
    tooltipBoxShadow,
    tooltipWrapperStyle,
    siUnit = 'kL',
    threshold,
    tooltipfontColor,
    thresholdStrokeColor = assets.colors.red,
    thresholdStrokeDasharray = 5,
    thresholdStrokeWidth = 2,
    cursor = 'pointer',
    aspect = 3,
    marginObject = { left: -10, top: 30 },
    onBarDoubleClick,
    consumptionDataType,
}) => {
    if (!data) {
        return (
            <GenericInfo
                lottieHeight={'0px'}
                subTitle={'Data Not Found'}
                subTitleFontSize={20}
            />
        );
    }

    return (
        <ResponsiveContainer
            height={240}
            minWidth={minWidth}
            debounce={15}
        >
            <BarChart
                margin={marginObject}
                padding={{ left: 0 }}
                data={data}
                barGap={1}
                barCategoryGap={1.6}
                style={{
                    userSelect: 'none',
                }}
            >
                <CartesianGrid
                    strokeDasharray='3 3'
                    horizontal={true}
                    vertical={false}
                />
                <XAxis
                    height={56}
                    dataKey='x'
                    tickMargin={8}
                    interval={0}
                    tickLine={false}
                    fontSize={xAxisLabelFontSize}
                    label={{
                        value:
                            xAxisLabel.slice(0, 1) +
                            xAxisLabel.slice(1).toLowerCase(),
                        position: 'insideBottom',
                    }}
                    tick={
                        consumptionDataType === ConsumptionDataType.HOURS ? (
                            <CustomizedAxisTick
                                xAxisLabelFontSize={xAxisLabelFontSize}
                            />
                        ) : (
                            true
                        )
                    }
                />
                <XAxis
                    height={1}
                    dataKey='x'
                    axisLine={false}
                    tickLine={false}
                    interval={0}
                    tick={RenderCustomTick}
                    xAxisId='customTick'
                />
                <YAxis
                    axisLine={false}
                    tickLine={false}
                    fontSize={yAxisFontSize}
                    tickFormatter={(val) => `${val} ${siUnit}`}
                    width={70}
                    overflow={'visible'}
                />

                <Tooltip
                    cursor={false}
                    content={
                        consumptionDataType === ConsumptionDataType.HOURS ? (
                            <HoursTooltip
                                siUnit={siUnit}
                                tooltipWrapperStyle={{
                                    padding: 2,
                                    borderRadius: tooltipBorderRadius,
                                }}
                                tooltipBoxShadow={tooltipBoxShadow}
                                tooltipBackgroundColor='white'
                                tootltipPadding={tootltipPadding}
                                tooltipBorderRadius={tooltipBorderRadius}
                                tooltipfontColor={tooltipfontColor}
                                mainValue={mainValue}
                                comparisonMode={comparisonMode}
                                comparisonValue={comparisonValue}
                                active={true}
                                mainColor={mainColor}
                                comparisonColor={comparisonColor}
                            />
                        ) : (
                            <DefaultTooltip
                                tooltipBoxShadow={tooltipBoxShadow}
                                tooltipBackgroundColor={tooltipBackgroundColor}
                                tootltipPadding={tootltipPadding}
                                tooltipBorderRadius={tooltipBorderRadius}
                                tooltipContentStyle={tooltipContentStyle}
                                tooltipWrapperStyle={tooltipWrapperStyle}
                                siUnit={siUnit}
                            />
                        )
                    }
                />

                <Bar
                    dataKey='y1'
                    fill={mainColor}
                    barSize={50}
                    radius={[1, 1, 0, 0]}
                    style={{ cursor: onBarDoubleClick ? cursor : 'auto' }}
                    onDoubleClick={onBarDoubleClick}
                />
                {comparisonMode && (
                    <Bar
                        dataKey='y2'
                        fill={comparisonColor}
                        barSize={50}
                        radius={[1, 1, 0, 0]}
                        style={{ cursor: onBarDoubleClick ? cursor : 'auto' }}
                        onDoubleClick={onBarDoubleClick}
                    />
                )}
                <ReferenceLine
                    type='linear'
                    label={{
                        value: `${threshold} ${siUnit}`,
                        position: 'insideTopRight',
                        fill: thresholdStrokeColor,
                        fontSize: 14,
                        height: '200px',
                    }}
                    y={threshold}
                    stroke={thresholdStrokeColor}
                    strokeDasharray={thresholdStrokeDasharray}
                    strokeWidth={thresholdStrokeWidth}
                    ifOverflow='extendDomain'
                />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default BarGraph;
