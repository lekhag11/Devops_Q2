const { Box } = require("@mui/material")

const AppGesture = ({ children, onClick, restSx }) => {
    return (
        <Box onClick={onClick} sx={{ cursor: 'pointer', ...restSx }}>
            {children}
        </Box>
    );
}


export default AppGesture;