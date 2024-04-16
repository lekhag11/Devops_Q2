import { Box, Divider, Typography } from '@mui/material';
import Wave from 'react-wavify';
import { assets } from 'src/assets/assets';
import If from 'src/components/logical/If';

function WaterTank({
    maxHeight = 100,
    maxWidth = 100,
    percentage = 0,
    amplitude = 3,
    speed = 0.2,
    points = 5,
    borderThickness = 6,
    textColor = assets.colors.primary,
    fontWeight = 'bold',
    borderColor = '#BDE4F3',
    text,
    textView,
    fontSize,
    percentageFontSize,
    showPercentage = true,
    maxCapacity = 200,
    siUnit = 'KL',
    tankReading = true,
    thresholdThickness = 2,
    thresholdLine = false,
    thresholdLinePosition = 10,
    thresholdLineColor = 'red',
    emptyline = false,
    emptyLinePositon = 10,
}) {
    return (
        <Box sx={{ display: 'flex' }}>
            <Box
                width={maxWidth}
                height={maxHeight}
                sx={{
                    display: 'flex',
                    position: 'relative',
                }}
            >
                <Wave
                    fill={assets.colors.secondary}
                    options={{
                        height:
                            maxHeight -
                            borderThickness -
                            (percentage * (maxHeight - borderThickness)) / 100,
                        amplitude: amplitude,
                        speed: speed,
                        points: points,
                    }}
                    mask={`url(#mask_${maxWidth}_${maxHeight})`}
                >
                    <svg
                        style={{ position: 'absolute' }}
                        width={maxWidth}
                        height={maxHeight}
                    >
                        <path
                            d={`M${maxWidth * 0},${maxHeight * 0} L${
                                maxWidth * 0
                            },${maxHeight} ${maxWidth},${maxHeight} ${maxWidth},0 ${
                                maxWidth - borderThickness
                            },0 ${maxWidth - borderThickness},${
                                maxHeight - borderThickness
                            } ${borderThickness},${
                                maxHeight - borderThickness
                            } ${borderThickness},${maxHeight * 0}Z`}
                            fill={borderColor}
                        />
                    </svg>

                    <mask id={`mask_${maxWidth}_${maxHeight}`}>
                        <path
                            d={`M${borderThickness},${
                                maxHeight * 0
                            } L${borderThickness},${
                                maxHeight - borderThickness
                            } ${maxWidth - borderThickness},${
                                maxHeight - borderThickness
                            } ${maxWidth - borderThickness},${maxHeight * 0} Z`}
                            fill='white'
                        />
                    </mask>
                </Wave>

                <Divider
                    sx={{
                        display: thresholdLine ? 'block' : 'none',
                        width: maxWidth - 2 * borderThickness,
                        position: 'absolute',
                        left: borderThickness,
                        top: thresholdLinePosition,
                        border: `${thresholdThickness}px dashed ${thresholdLineColor}`,
                    }}
                />
                <Box
                    height={maxHeight}
                    width={maxWidth}
                    sx={{
                        position: 'absolute',
                        justifyContent: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    {textView}
                    <Typography
                        fontSize={fontSize}
                        fontWeight={fontWeight}
                        color={textColor}
                        textAlign={'center'}
                    >
                        {text}
                    </Typography>
                    <If condition={showPercentage}>
                        <Typography
                            fontSize={percentageFontSize}
                            fontWeight={fontWeight}
                            color={textColor}
                            textAlign={'center'}
                        >
                            {percentage.toFixed(0)}
                            {'%'}
                        </Typography>
                    </If>
                </Box>
                <Divider
                    sx={{
                        display: emptyline ? 'block' : 'none',
                        width: maxWidth - 2 * borderThickness,
                        position: 'absolute',
                        left: borderThickness,
                        top: maxHeight - emptyLinePositon - borderThickness,
                        border: `${thresholdThickness}px dashed ${thresholdLineColor}`,
                    }}
                />
            </Box>
            <Box
                sx={{
                    display: tankReading ? 'flex' : 'none',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    ml: 1,
                }}
            >
                <Typography fontSize={12}>
                    {maxCapacity}
                    {siUnit}
                </Typography>
                <Typography fontSize={12}>
                    {(maxCapacity / 2).toFixed(0)}
                    {siUnit}
                </Typography>
                <Typography fontSize={12}>Empty</Typography>
            </Box>
        </Box>
    );
}

export default WaterTank;
