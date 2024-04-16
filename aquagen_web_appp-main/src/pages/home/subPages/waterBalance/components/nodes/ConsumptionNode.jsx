import { Tooltip, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Handle, Position } from 'reactflow';
import { assets } from 'src/assets/assets';
import ConsumptionIndicator from 'src/components/consumptionIndicator/ConsumptionIndicator';
import If from 'src/components/logical/If';
import { markerStyle } from '../../style/markerStyle';

const ConsumptionNode = ({ data }) => {
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
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}
            >
                <Box
                    sx={{
                        minWidth: '150px',
                        height: '60px',
                        position: 'relative',
                        border: `2px solid ${
                            data.online
                                ? assets.colors.waterBalanceBlueColor
                                : assets.colors.greySubText3
                        }`,
                        borderRadius: '2px',
                        filter: !data.online ? 'grayScale(100%)' : '',
                        background: data?.style?.background || '#ffffff',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}
                >
                    <Typography
                        sx={{
                            p: 0,
                            fontSize: 20,
                            fontWeight: 600,
                            textAlign: 'center',
                            color: data.online
                                ? data?.style?.displayTextColor
                                : assets.colors.greySubText3,
                        }}
                    >
                        {data?.value || '--'}
                    </Typography>

                    <Typography
                        sx={{
                            p: 0,
                            display: data?.meta?.limitReached
                                ? 'block'
                                : 'none',
                            fontSize: 14,
                            fontWeight: 400,
                            textAlign: 'center',
                            color: '#525252',
                        }}
                    >
                        {data?.meta?.subTitle}
                    </Typography>

                    <ConsumptionIndicator
                        isLoading={data?.meta?.isConsumption && data.online}
                        rightPosition={false}
                    />
                </Box>
                <If condition={!data?.online}>
                    <Typography
                        sx={{
                            fontSize: 12,
                            fontWeight: 400,
                            padding: '4px 4px 0px',
                            color: assets.colors.grey,
                        }}
                    >
                        {data?.lastUpdatedTime}
                    </Typography>
                </If>
                <Tooltip title={data?.label}>
                    <Typography
                        sx={{
                            fontSize: 18,
                            fontWeight: 400,
                            padding: '4px',
                            textAlign: 'center',
                            color: !data.online
                                ? assets.colors.greySubText3
                                : '#000000',
                            width: '180px',
                            wordBreak: 'break-word',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: '2',
                            WebkitBoxOrient: 'vertical',
                        }}
                    >
                        {data?.label}
                    </Typography>
                </Tooltip>
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

export default ConsumptionNode;
