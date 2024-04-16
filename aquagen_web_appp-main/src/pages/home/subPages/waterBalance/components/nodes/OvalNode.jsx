import { Box, Typography } from '@mui/material';
import React from 'react';
import { Handle, Position } from 'reactflow';
import { assets } from 'src/assets/assets';
import { markerStyle } from 'src/pages/home/subPages/waterBalance/style/markerStyle';

const OvalNode = ({ data }) => {
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
                        maxWidth: '240px',
                        minWidth: '160px',
                        padding: '10px 18px',
                        aspectRatio: '3',
                        position: 'relative',
                        border: `2px solid ${assets.colors.waterBalanceBlueColor}`,
                        borderRadius: '30px',
                        background: data?.style?.background || '#ffffff',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Typography sx={{ fontSize: 18, fontWeight: 400 }}>
                        {data?.value}
                    </Typography>

                    <Typography sx={{ fontSize: 18, fontWeight: 400 }}>
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

export default OvalNode;
