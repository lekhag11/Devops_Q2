import React from 'react';
import { CloudOff } from '@mui/icons-material';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import GenericInfo from 'src/components/info/GenericInfo';
import { assets } from 'src/assets/assets';

const PieGraph = ({
    data,
    width = 150,
    height = 150,
    outerRadius = 70,
    fillColor = assets.colors.primary,
    tooltipWidth = 140,
    tooltipFontSize = 14,
    tooltipTextWrap = 'wrap',
    tooltipBorderRadius = 4,
    rest,
    siUnit = 'kL',
    colorPalette,
}) => {
    const hasData = data?.some((entry) => entry.value > 0);
    if (!hasData) {
        return (
            <GenericInfo
                lottieHeight={'0px'}
                height={120}
                title={<CloudOff fontSize={'large'} />}
                subTitle={'Data Not Found'}
                subTitleFontSize={20}
            />
        );
    }

    const renderCustomizedLabel = (props) => {
        const { cx, cy, midAngle, innerRadius, outerRadius, index } =
            props.props;

        const { data } = props;
        const percentage = data[index].percentage;
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.37;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.5;

        return (
            <text
                x={x}
                y={y}
                fill='white'
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline='central'
                fontSize={12}
            >
                {percentage > 5 ? ` ${percentage.toFixed(0)}%` : ''}
            </text>
        );
    };

    const tooltipStyle = {
        width: tooltipWidth,
        fontSize: tooltipFontSize,
        textWrap: tooltipTextWrap,
        borderRadius: tooltipBorderRadius,
        overflowWrap: 'break-word',
        whiteSpace: 'break-spaces',
    };
    return (
        <PieChart
            width={width}
            height={height}
        >
            <Tooltip
                contentStyle={tooltipStyle}
                formatter={(label) => {
                    return `${label} ${siUnit}`;
                }}
            />
            <Pie
                cx='50%'
                cy='50%'
                data={data}
                dataKey='value'
                outerRadius={outerRadius}
                fill={fillColor}
                labelLine={false}
                label={(props) =>
                    renderCustomizedLabel({
                        props,
                        data,
                    })
                }
                style={{
                    outline: 'none',
                }}
                {...rest}
            >
                {data.map((entry, index) => (
                    <Cell
                        key={`cell-${index}`}
                        fill={colorPalette[index % colorPalette?.length]}
                    />
                ))}
            </Pie>
        </PieChart>
    );
};

export default PieGraph;
