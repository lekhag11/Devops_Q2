import { Box } from "@mui/material";

function Expanded({ children, extraSx }) {
    return (
        <Box
            sx={{
                display: 'flex',
                height: '100%',
                ...extraSx,
            }}
        >
            {children}
        </Box>
    );
}

export default Expanded;