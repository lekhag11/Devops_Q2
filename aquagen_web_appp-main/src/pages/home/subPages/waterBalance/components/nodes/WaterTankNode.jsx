import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Handle, Position } from 'reactflow';
import WaterTank from 'src/components/waterTank/WaterTank';
import { markerStyle } from '../../style/markerStyle';
import { assets } from 'src/assets/assets';
import If from 'src/components/logical/If';
import { Formatter } from 'src/utils/formatter';

const WaterTankNode = ({ data }) => {
    return (
        <>
            <Handle
                type='target'
                position={Position.Top}
                style={markerStyle}
            />
            <Handle
                type='target'
                position={Position.Left}
                style={markerStyle}
            />
            <Box
                sx={{
                    maxWidth: '200px',
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                }}
            >
                <Box
                    sx={{
                        filter: !data.online ? 'grayScale(90%)' : '',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                    }}
                >
                    <WaterTank
                        maxWidth={150}
                        maxHeight={70}
                        text={
                            data.online
                                ? Formatter.defaultValue(data?.value)
                                : '--'
                        }
                        textColor={
                            data.online
                                ? data?.style?.displayTextColor
                                : assets.colors.greySubText3
                        }
                        fontSize={20}
                        showPercentage={false}
                        percentage={data.online ? data?.meta?.percentage : 0}
                        borderThickness={2}
                        borderColor={
                            data.online
                                ? assets.colors.waterBalanceBlueColor
                                : assets.colors.greySubText3
                        }
                        tankReading={false}
                        thresholdThickness={1}
                        thresholdLineColor={data?.style?.displayTextColor}
                        thresholdLine={data?.meta?.thresholdReached}
                        emptyline={data?.meta?.thresholdReached}
                    />
                    <If condition={!data.online}>
                        <Typography
                            sx={{
                                fontSize: 12,
                                fontWeight: 400,
                                padding: '4px 4px 0px',
                                textAlign: 'center',
                                color: assets.colors.grey,
                            }}
                        >
                            {data?.lastUpdatedTime}
                        </Typography>
                    </If>
                    <Typography
                        sx={{
                            wordBreak: 'break-word',
                            fontSize: 18,
                            fontWeight: 400,
                            textAlign: 'center',
                            color: !data.online
                                ? assets.colors.greySubText3
                                : '#000000',
                        }}
                    >
                        {data?.label}
                    </Typography>
                </Box>
            </Box>
            <Handle
                type='source'
                position={Position.Bottom}
                style={markerStyle}
            />
            <Handle
                type='source'
                position={Position.Right}
                style={markerStyle}
            />
        </>
    );
};

export default WaterTankNode;
