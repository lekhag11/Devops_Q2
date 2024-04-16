import React, { useEffect, useState } from 'react';
import {
    Box,
    FormControl,
    FormControlLabel,
    Grid,
    IconButton,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { assets } from 'src/assets/assets';
import If from 'src/components/logical/If';

const AlertEmailList = ({
    emailIds,
    emailErrors,
    handleEmailChange,
    handleEmailBlur,
    handleDeleteEmail,
    errMsg,
}) => {
    const isValidEmail = (email) => {
        const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        return emailPattern.test(email);
    };
    return (
        <>
            {emailIds.map((email, index) => (
                <Box
                    key={index}
                    sx={{ display: 'flex', marginBottom: '10px' }}
                >
                    <TextField
                        id={`email-${index}`}
                        value={email}
                        size='small'
                        fullWidth
                        onChange={(e) =>
                            handleEmailChange(index, e.target.value)
                        }
                        error={emailErrors[index]}
                        helperText={
                            emailErrors[index]
                                ? errMsg
                                    ? errMsg
                                    : 'Invalid email address'
                                : ''
                        }
                        onBlur={() => {
                            if (!isValidEmail(email)) {
                                handleEmailBlur(index, true, email);
                            } else {
                                handleEmailBlur(index, false, email);
                            }
                        }}
                    />
                    <IconButton
                        onClick={() => handleDeleteEmail(index)}
                        aria-label='delete'
                        sx={{ cursor: 'pointer' }}
                    >
                        <DeleteOutlineOutlinedIcon />
                    </IconButton>
                </Box>
            ))}
        </>
    );
};

const AlertEmails = ({
    settingData,
    formData,
    setFormData,
    setHasErrors,
    setChangesHappened,
    ...props
}) => {
    const [emailEnabled, setEmailEnable] = useState(
        formData?.alerts?.email?.enabled || false
    );

    const [emailIds, setMails] = useState([]);

    const [emailErrors, setEmailErrors] = useState([]);

    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        setEmailEnable(formData?.alerts?.email?.enabled);
        if (formData?.alerts?.email?.emailIds.length > 0) {
            setMails(formData?.alerts?.email?.emailIds);
        }
    }, [formData]);

    const handleEnableEmail = (event) => {
        const isEnabled = event.target.value === 'true';
        if (isEnabled) {
            setEmailEnable(isEnabled);
            formData.alerts.email.enabled = isEnabled;
            setFormData({ ...formData });
        } else {
            setEmailEnable(isEnabled);
            formData.alerts.email.enabled = isEnabled;
            setFormData({ ...formData });
        }
        setChangesHappened(true);
    };

    const handleEmailChange = (index, newValue) => {
        const updatedEmailIds = [...emailIds];
        const updatedEmailErrors = [...emailErrors];
        if (updatedEmailIds.includes(newValue)) {
            updatedEmailErrors[index] = true;
            setErrMsg('Email Id already exists');
        } else {
            updatedEmailErrors[index] = false;
            setErrMsg('');
        }
        setEmailErrors(updatedEmailErrors);
        updatedEmailIds[index] = newValue;
        formData.alerts.email.emailIds = updatedEmailIds;
        setFormData({ ...formData });
        setChangesHappened(true);
    };

    const handleEmailBlur = (index, isInvalid, email) => {
        const updatedEmailErrors = [...emailErrors];
        const updatedEmailIds = [...emailIds];
        updatedEmailErrors[index] = isInvalid;
        if (!isInvalid) {
            const email = updatedEmailIds[index];
            const emailExists = updatedEmailIds
                .filter((id, i) => i !== index)
                .includes(email);

            if (emailExists) {
                updatedEmailErrors[index] = true;
                setErrMsg('Email Id already exists');
            }
        }

        setEmailErrors(updatedEmailErrors);
        const hasErrors = updatedEmailErrors.some((error) => error);
        setHasErrors(hasErrors);
    };

    const handleDeleteEmail = (index) => {
        const updatedEmailIds = [...emailIds];
        updatedEmailIds.splice(index, 1);
        formData.alerts.email.emailIds = updatedEmailIds;
        setFormData({ ...formData });
        const updatedEmailErrors = [...emailErrors];
        updatedEmailErrors.splice(index, 1);
        setEmailErrors(updatedEmailErrors);
        setChangesHappened(true);
    };

    const handleAddEmail = () => {
        if (emailIds.length < 10) {
            const updatedEmailIds = [...emailIds, ''];
            formData.alerts.email.emailIds = updatedEmailIds;
            setFormData({ ...formData });
            const updatedEmailErrors = [...emailErrors, false];
            setEmailErrors(updatedEmailErrors);
        }
        setChangesHappened(true);
    };

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    p: 2,
                    alignItems: 'center',
                }}
            >
                <Box>
                    <Typography
                        color='initial'
                        fontWeight={600}
                        fontSize={24}
                    >
                        Alerts Email
                    </Typography>
                    <Typography
                        fontSize='14px'
                        color={assets.colors.greySubText2}
                    >
                        Alerts will be sent to the designated email IDs ; User
                        can still see alerts on the dashboard
                    </Typography>
                </Box>
            </Box>
            <Box>
                <Grid
                    container
                    spacing={2}
                    padding={2}
                >
                    <Grid
                        item
                        xs={4}
                    >
                        <Typography color={assets.colors.greySubtext}>
                            Do you want to recieve
                            <br /> alerts on email?
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={7}
                        sx={{ display: 'flex' }}
                    >
                        <Box sx={{ display: 'flex' }}>
                            <FormControl>
                                <RadioGroup
                                    aria-labelledby='demo-controlled-radio-buttons-group'
                                    name='controlled-radio-buttons-group'
                                    value={emailEnabled ? true : false}
                                    onChange={handleEnableEmail}
                                    sx={{ display: 'flow' }}
                                >
                                    <FormControlLabel
                                        value={true}
                                        control={<Radio />}
                                        label='Yes'
                                        color='default'
                                    />
                                    <FormControlLabel
                                        value={false}
                                        control={<Radio />}
                                        label='No'
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Box>
                    </Grid>
                    <If condition={formData?.alerts?.email?.enabled}>
                        <>
                            <Grid
                                item
                                xs={12}
                                md={4}
                            >
                                <Typography color={assets.colors.greySubtext}>
                                    Email ID (max 10)
                                </Typography>
                            </Grid>
                            {emailIds.length ? (
                                <>
                                    <Grid
                                        item
                                        xs={10}
                                        md={7}
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                        }}
                                    >
                                        <AlertEmailList
                                            emailIds={emailIds}
                                            emailErrors={emailErrors}
                                            handleEmailChange={
                                                handleEmailChange
                                            }
                                            handleEmailBlur={handleEmailBlur}
                                            handleDeleteEmail={
                                                handleDeleteEmail
                                            }
                                            errMsg={errMsg}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        xs={1}
                                        md={4}
                                    ></Grid>
                                </>
                            ) : null}
                            <If
                                condition={
                                    !emailErrors.some((error) => error) &&
                                    emailIds.length < 10
                                }
                            >
                                <Grid
                                    item
                                    xs={8}
                                    md={4}
                                    sx={{ ml: 2 }}
                                >
                                    <Typography
                                        fontWeight={500}
                                        color='#46B2D9'
                                        onClick={handleAddEmail}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        + Add Email Id
                                    </Typography>
                                </Grid>
                            </If>
                        </>
                    </If>
                </Grid>
            </Box>
        </>
    );
};

export default AlertEmails;
