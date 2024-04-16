import AppGesture from '../gesture/AppGesture';

const { Box, Typography, Badge } = require('@mui/material');

const AppIconButton = ({
    icon,
    iconUrl,
    iconSize = 24,
    label,
    labelColor,
    labelSize = 12,
    onClick,
    extraSx,
    badgeContent,
}) => {
    return (
        <AppGesture onClick={onClick}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    px: 1,
                    ...extraSx,
                }}
            >
                <Badge
                    badgeContent={badgeContent}
                    color='error'
                >
                    {iconUrl && (
                        <img
                            alt=''
                            src={iconUrl}
                            height={iconSize}
                            width={iconSize}
                        />
                    )}
                    {icon && icon}
                </Badge>
                {label && (
                    <Typography
                        sx={{
                            fontSize: labelSize,
                            color: labelColor,
                        }}
                    >
                        {label}
                    </Typography>
                )}
            </Box>
        </AppGesture>
    );
};

export default AppIconButton;
