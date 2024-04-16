import CloudOffIcon from '@mui/icons-material/CloudOff';
import { Box, Typography } from '@mui/material';
function OfflineView({ restSx }) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', ...restSx }}>
            <CloudOffIcon />
            <Typography>Offline</Typography>
        </Box>
    );
}


export default OfflineView;