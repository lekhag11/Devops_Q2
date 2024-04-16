import { Backdrop, CircularProgress } from "@mui/material";
import { assets } from "src/assets/assets";

function FullScreenLoader(
    color = assets.colors.primary,
    backgroundColor = 'white'
) {
    return (
        <Backdrop
            sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1,
                backgroundColor: 'white',
            }}
            open={true}
        >
            <CircularProgress color="primaryTheme" />
        </Backdrop>
    );
}
export default FullScreenLoader;