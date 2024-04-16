import { Box } from '@mui/material';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { assets } from 'src/assets/assets';

function FixedBar({ children, width = '100%', bar, padding = 0 }) {
    const ref = useRef(null);

    const [height, setHeight] = useState(0);
    useLayoutEffect(() => {
        setHeight(ref.current.clientHeight);
    }, []);

    useEffect(() => {
        function handleWindowResize() {
            setHeight(ref.current.clientHeight);
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    return (
        <>
            <Box
                ref={ref}
                sx={{
                    backgroundColor: assets.colors.background,
                    zIndex: 1200,
                    position: 'fixed',
                    width: width,
                }}
            >
                {bar}
            </Box>
            <Box mt={`${height + padding}px`}>{children}</Box>
        </>
    );
}

export default FixedBar;
