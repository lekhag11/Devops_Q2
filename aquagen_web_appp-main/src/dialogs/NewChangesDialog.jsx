import {
    Box,
    ButtonBase,
    Dialog,
    DialogContent,
    DialogTitle,
    Paper,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import { assets } from 'src/assets/assets';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import AppButton from 'src/components/button/AppButton';
import { LocalDBInstance, LocalDBKeys } from 'src/services/localdb/localdb';
import { constants } from 'src/constants/constants';
import { useNavigate } from 'react-router-dom';

function NewChangesDialog() {
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();

    const handleClose = () => {
        setOpen(false);
    };

    const openDemo = () => {
        navigate(`/video/${constants.demoVideoUrl}`);
    };

    return (
        <Dialog open={open}>
            <Paper sx={{ overflow: 'auto' }}>
                <Box
                    sx={{
                        minWidth: { xs: 1, md: 400 },
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <DialogTitle
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <img
                            src={assets.images.fullLogoText}
                            height={40}
                            alt='logo'
                        />
                    </DialogTitle>
                    <DialogContent sx={{ py: 0 }}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <WarningAmberRoundedIcon />
                            <Typography
                                fontWeight={'bold'}
                                fontSize={22}
                                ml={2}
                            >
                                Introducing New Updates
                            </Typography>
                        </Box>
                        <Typography
                            fontSize={16}
                            my={2}
                        >
                            We are happy to announce the launch of new updates
                            <br />
                            to provide you a better & smoother experience
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <ButtonBase
                                onClick={() => {
                                    LocalDBInstance.setItem(
                                        LocalDBKeys.showNewChangesDialog,
                                        false
                                    );
                                    handleClose();
                                }}
                            >
                                <Typography
                                    fontSize={16}
                                    my={2}
                                    display={{ xs: 'none', md: 'block' }}
                                    color={assets.colors.primary}
                                    fontWeight={'bold'}
                                >
                                    <u>Learn about the updates</u>
                                </Typography>
                            </ButtonBase>
                            <AppButton
                                value={'Watch Demo'}
                                height={36}
                                onClick={() => {
                                    LocalDBInstance.setItem(
                                        LocalDBKeys.showNewChangesDialog,
                                        false
                                    );
                                    handleClose();
                                    openDemo();
                                }}
                            />
                        </Box>
                    </DialogContent>
                </Box>
            </Paper>
        </Dialog>
    );
}

export default NewChangesDialog;
