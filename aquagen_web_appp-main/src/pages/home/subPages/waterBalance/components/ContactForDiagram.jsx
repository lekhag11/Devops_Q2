import React from 'react';
import { Box, Typography } from '@mui/material';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';

const ContactForDiagram = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'start',
                gap: '20px',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: '10',
            }}
        >
            <Box>
                <WarningAmberRoundedIcon fontSize='large' />
            </Box>
            <Box>
                <Typography
                    sx={{
                        fontSize: 26,
                        fontWeight: 500,
                        lineHeight: '140%',
                    }}
                >
                    Water Balance Diagram not Created
                </Typography>
                <Typography
                    sx={{
                        marginTop: '4px',
                        fontSize: 18,
                        fontWeight: 400,
                        lineHeight: '140%',
                    }}
                >
                    Contact us at{' '}
                    <a
                        href='mailto:projectsupport@fluxgen.com'
                        target='_blank'
                        rel='noopener noreferrer'
                        style={{
                            color: '#4176FF',
                        }}
                    >
                        projectsupport@fluxgen.com
                    </a>{' '}
                    to
                    <br />
                    create your customised Water Balance Diagram
                </Typography>
            </Box>
        </Box>
    );
};

export default ContactForDiagram;
