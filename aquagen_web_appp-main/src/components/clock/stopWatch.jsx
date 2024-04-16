import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';

const StopWatch = ({ totalSeconds, sx }) => {
    const [minutes, setMinutes] = useState(Math.floor(totalSeconds / 60));
    const [seconds, setSeconds] = useState(totalSeconds % 60);

    useEffect(() => {
        const interval = setInterval(() => {
            if (minutes === 0 && seconds === 0) {
                clearInterval(interval);
            } else if (seconds === 0) {
                setMinutes((prevMinutes) => prevMinutes - 1);
                setSeconds(59);
            } else {
                setSeconds((prevSeconds) => prevSeconds - 1);
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [minutes, seconds]);

    return (
        <Typography
            component={'span'}
            sx={sx}
        >
            {String(minutes).padStart(2, '0')}:
            {String(seconds).padStart(2, '0')}
        </Typography>
    );
};

export default StopWatch;
