import { Alert, Box, Grid, TextField, Typography } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import React, { useEffect, useState } from 'react';
import If from 'src/components/logical/If';
import { assets } from 'src/assets/assets';

const UserList = ({
    user,
    index,
    nameError,
    phoneNoError,
    handleNameChange,
    handlePhoneNoChange,
    handleNameBlur,
    handlePhoneNoBlur,
    handleUserDeactivation,
    erromsg,
}) => {
    return (
        <Grid
            key={index}
            sx={{
                display: { md: 'flex', xs: 'block' },
                alignItems: 'base',
                mb: 2,
            }}
        >
            <Box sx={{ margin: '0 0.8rem' }}>
                <Typography
                    fontWeight={500}
                    color='#828282'
                >
                    Name*
                </Typography>
                <TextField
                    id='name'
                    value={user.username}
                    size='small'
                    fullWidth
                    error={nameError}
                    onBlur={() => handleNameBlur(index)}
                    onChange={(e) => {
                        const newValue = e.target.value
                            .replace(/[^a-zA-Z ]/g, '')
                            .slice(0, 32);
                        handleNameChange(index, newValue);
                    }}
                    inputProps={{
                        maxLength: 32,
                    }}
                    helperText={nameError ? 'Name is required' : ''}
                />
            </Box>
            <Box sx={{ margin: '0 0.8rem' }}>
                <Typography
                    fontWeight={500}
                    color='#828282'
                    noWrap
                >
                    Mobile Number*
                </Typography>
                <TextField
                    id='phone_number'
                    value={user.phoneNo}
                    size='small'
                    fullWidth
                    error={phoneNoError}
                    onBlur={() => handlePhoneNoBlur(index)}
                    onChange={(e) => {
                        handlePhoneNoChange(index, e.target.value);
                    }}
                    helperText={phoneNoError ? erromsg && erromsg : ''}
                    type='number'
                    inputProps={{
                        maxLength: 10,
                    }}
                />
            </Box>
            <Box>
                <DeleteOutlineOutlinedIcon
                    sx={{ mx: 2, mt: 3, cursor: 'pointer' }}
                    onClick={() => handleUserDeactivation(index)}
                />
            </Box>
        </Grid>
    );
};

const Users = ({
    settingData,
    formData,
    setFormData,
    industryId,
    setHasErrors,
    setChangesHappened,
    ...props
}) => {
    const [usersData, setUsersData] = useState([]);

    const [showAlert, setShowAlert] = useState(false);

    const [nameErrors, setNameErrors] = useState([]);

    const [phoneNoErrors, setPhoneNoErrors] = useState([]);

    const [phoneNumers, setPhoneNumbers] = useState([]);

    const [erromsg, setErrorMsg] = useState('');

    useEffect(() => {
        if (formData?.user?.length > 0) {
            setUsersData(formData.user);
            const enteredPhoneNumbers = Array.from(
                new Set(
                    (formData.user || [])
                        .filter((user) => user.active)
                        .map((user) => user.phoneNo)
                )
            );
            setPhoneNumbers(enteredPhoneNumbers);
        }
    }, [formData]);

    const handleNameChange = (index, newName) => {
        const updatedUsersData = [...usersData];
        updatedUsersData[index].username = newName;
        formData.user = updatedUsersData;
        setFormData({
            ...formData,
        });
        setChangesHappened(true);
    };

    const handlePhoneNoChange = (index, newPhoneNo) => {
        const updatedPhoneNoErrors = [...phoneNoErrors];
        const updatedUsersData = [...usersData];
        const updatedPhoneNumers = [...phoneNumers];
        updatedUsersData[index].phoneNo = newPhoneNo;
        updatedUsersData[index].id = newPhoneNo;
        updatedUsersData[index].userId = newPhoneNo;
        formData.user = updatedUsersData;
        setFormData({
            ...formData,
        });
        updatedPhoneNumers[index] = newPhoneNo;
        if (newPhoneNo.length > 10) {
            updatedPhoneNoErrors[index] = true;
            setErrorMsg('Please enter a valid 10-digit mobile number');
            setPhoneNoErrors(updatedPhoneNoErrors);
        } else if (phoneNumers.includes(newPhoneNo)) {
            updatedPhoneNoErrors[index] = true;
            setErrorMsg('Phone number already exists');
            setPhoneNoErrors(updatedPhoneNoErrors);
        } else {
            updatedPhoneNoErrors[index] = false;
            setErrorMsg('');
            setPhoneNoErrors(updatedPhoneNoErrors);
        }

        setChangesHappened(true);
    };

    const handleUserDeactivation = (index) => {
        const updatedUsersData = [...usersData];
        updatedUsersData[index].active = false;
        setUsersData(updatedUsersData);
        formData.user = updatedUsersData;
        setFormData({
            ...formData,
        });
        const updatedNameErrors = [...nameErrors];
        updatedNameErrors[index] = false;
        const updatedPhoneNoErrors = [...phoneNoErrors];
        updatedPhoneNoErrors[index] = false;
        setNameErrors(updatedNameErrors);
        setPhoneNoErrors(updatedPhoneNoErrors);
        setErrorMsg('');
        setChangesHappened(true);
    };

    const handleAddUser = () => {
        if (usersData.filter((user) => user.active).length < 5) {
            const newUser = {
                id: '',
                username: '',
                phoneNo: '',
                userId: '',
                active: true,
            };

            setUsersData([...usersData, newUser]);
        } else {
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 5000);
        }
        setChangesHappened(true);
    };

    const handleNameBlur = (index) => {
        const updatedNameErrors = [...nameErrors];
        if (!usersData[index].username) {
            updatedNameErrors[index] = true;
        } else {
            updatedNameErrors[index] = false;
        }
        setNameErrors(updatedNameErrors);
        const hasErrors = updatedNameErrors.some((error) => error);
        setHasErrors(hasErrors);
    };

    const handlePhoneNoBlur = (index) => {
        const updatedPhoneNoErrors = [...phoneNoErrors];
        if (!usersData[index].phoneNo) {
            updatedPhoneNoErrors[index] = true;
            setErrorMsg('Phone number is required');
        } else if (usersData[index].phoneNo.length < 10) {
            updatedPhoneNoErrors[index] = true;
            setErrorMsg('invalid Phone number');
        }

        const hasErrors = updatedPhoneNoErrors.some((error) => error);
        setHasErrors(hasErrors);
        setPhoneNoErrors(updatedPhoneNoErrors);
    };

    return (
        <>
            <If condition={showAlert}>
                <Alert severity='error'>user limit reached</Alert>
            </If>
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
                        Users
                    </Typography>
                    <Typography
                        fontSize='14px'
                        color='#828282'
                    >
                        Add mobile number of users to login with OTP
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
                        xs={12}
                        md={4}
                    >
                        <Typography
                            fontSize={16}
                            color={assets.colors.greySubtext}
                        >
                            Users (max 5)
                        </Typography>
                    </Grid>

                    {usersData.map((user, index) => {
                        return user.active ? (
                            <React.Fragment key={index}>
                                <Grid
                                    item
                                    xs={10}
                                    md={8}
                                    sx={{
                                        border: '1px solid grey',
                                        borderWidth: { xs: 1, md: 0 },
                                        borderRadius: 2,
                                        my: { xs: 2, md: 0 },
                                    }}
                                >
                                    <UserList
                                        user={user}
                                        index={index}
                                        nameError={nameErrors[index]}
                                        phoneNoError={phoneNoErrors[index]}
                                        handleNameChange={handleNameChange}
                                        handlePhoneNoChange={
                                            handlePhoneNoChange
                                        }
                                        handleNameBlur={handleNameBlur}
                                        handlePhoneNoBlur={handlePhoneNoBlur}
                                        handleUserDeactivation={
                                            handleUserDeactivation
                                        }
                                        erromsg={erromsg}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={1}
                                    md={4}
                                ></Grid>
                            </React.Fragment>
                        ) : null;
                    })}
                    <If
                        condition={
                            usersData.filter((user) => user.active).length <
                                5 &&
                            !nameErrors.some((error) => error) &&
                            !phoneNoErrors.some((error) => error)
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
                                onClick={handleAddUser}
                                sx={{ cursor: 'pointer' }}
                            >
                                + Add User
                            </Typography>
                        </Grid>
                    </If>
                </Grid>
            </Box>
        </>
    );
};

export default Users;
