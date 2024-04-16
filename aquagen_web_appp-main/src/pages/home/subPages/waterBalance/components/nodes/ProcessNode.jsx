import React from 'react';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { assets } from 'src/assets/assets';
import { Handle, Position } from 'reactflow';
import { markerStyle } from '../../style/markerStyle';

const ProcessNode = ({ data }) => {
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
                    justifyContent: 'center',
                    flexDirection: 'column',
                    padding: '2px',
                }}
            >
                <Box
                    sx={{
                        maxWidth: '160px',
                        padding: '10px',
                        position: 'relative',
                        aspectRatio: '2',
                        border: `2px solid ${assets.colors.waterBalanceBlueColor}`,
                        borderRadius: '1px',
                        background:
                            data?.style?.background || assets.colors.primary,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Typography
                        sx={{ fontSize: 18, fontWeight: 500, color: '#FFFFFF' }}
                    >
                        {data?.value}
                    </Typography>
                    <Typography
                        sx={{ fontSize: 20, fontWeight: 500, color: '#FFFFFF' }}
                    >
                        {data?.label}
                    </Typography>
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
            </Box>
        </>
    );
};

export default ProcessNode;
