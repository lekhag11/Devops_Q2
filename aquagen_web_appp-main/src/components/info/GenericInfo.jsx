import { Box, Typography } from "@mui/material";
import Lottie from 'react-lottie';


function GenericInfo({ title, subTitle, lottieData, lottieWidth, lottieHeight,
    width = '100%',
    height = '100%',
    titleFontSize = 18,
    titleColor = 'GrayText',
    titleWeight = 'bold',
    subTitleFontSize = 16,
    subTitleColor = 'Gray',
    subTitleWeight = 'semi-bold',
    scaleX,
    scaleY,
}) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                my: 2,
                width: width,
                height: height,
                scaleX: scaleX,
                scaleY: scaleY
            }}
        >
            <Box
                sx={{
                    width: lottieWidth || 0.5,
                    height: lottieHeight || 0.5,

                }}
            >
                <Lottie
                    options={{ animationData: lottieData }}
                />
            </Box>
            {title && <Typography fontWeight={titleWeight} fontSize={titleFontSize} color={titleColor}>{title}</Typography>}
            {subTitle && <Typography fontWeight={subTitleWeight} color={subTitleColor} fontSize={subTitleFontSize}>{subTitle}</Typography>}
        </Box>
    );
}

export default GenericInfo;