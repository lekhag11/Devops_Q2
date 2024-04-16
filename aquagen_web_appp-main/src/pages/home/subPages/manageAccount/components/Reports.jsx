import React, { useEffect, useState } from 'react';
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import If from 'src/components/logical/If';
import _ from 'lodash';
import { assets } from 'src/assets/assets';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import servicesFrequency from 'src/enums/servicesFrequency';

const ServiceCheckboxes = ({
  service,
  formData,
  setFormData,
  accountData,
  setChangesHappened,
}) => {
  const handleCheckboxChange = (frequency) => (e) => {
    const newChecked = e.target.checked;
    const updatedServices = _.cloneDeep(formData.reports.services);
    updatedServices[service][`automated${frequency}Report`] = newChecked;
    formData.reports.services = updatedServices;
    setFormData({ ...formData });
    setChangesHappened(true);
  };

  return (
    <React.Fragment key={service}>
      <Grid item xs={4}>
        <Typography color={assets.colors.greySubtext}>
          {accountData?.meta[service]?.displayName}
        </Typography>
      </Grid>
      <Grid item xs={7} sx={{ display: 'flex' }}>
        <Box sx={{ display: 'flex' }}>
          <FormGroup sx={{ display: 'flow' }}>
            {servicesFrequency.map((frequency) => (
              <FormControlLabel
                key={frequency}
                control={
                  <Checkbox
                    checked={
                      formData?.reports?.services?.[service]?.[
                        `automated${frequency}Report`
                      ] || false
                    }
                    onChange={handleCheckboxChange(frequency)}
                    color="primary"
                  />
                }
                label={frequency}
              />
            ))}
          </FormGroup>
        </Box>
      </Grid>
    </React.Fragment>
  );
};

const ReportsEmailList = ({
  emailIds,
  emailErrors,
  handleEmailChange,
  handleEmailBlur,
  handleDeleteEmail,
}) => {
  const isValidEmail = (email) => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailPattern.test(email);
  };

  return (
    <div>
      {emailIds.map((email, index) => (
        <Box key={index} sx={{ display: 'flex', marginBottom: '10px' }}>
          <TextField
            id={`email-${index}`}
            value={email}
            size="small"
            fullWidth
            onChange={(e) => handleEmailChange(index, e.target.value)}
            error={emailErrors[index]}
            helperText={emailErrors[index] ? 'Invalid email address' : ''}
            onBlur={() => {
              if (!isValidEmail(email)) {
                handleEmailBlur(index, true);
              } else {
                handleEmailBlur(index, false);
              }
            }}
          />
          <IconButton
            onClick={() => handleDeleteEmail(index)}
            aria-label="delete"
          >
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        </Box>
      ))}
    </div>
  );
};

const Reports = ({
  settingData,
  formData,
  setFormData,
  accountData,
  setHasErrors,
  setChangesHappened,
}) => {
  const [emailEnabled, setEmailEnable] = useState(
    formData?.reports?.enabled || false
  );

  const [emailIds, setEmailIds] = useState([]);

  const [emailErrors, setEmailErrors] = useState([]);

  // eslint-disable-next-line
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    setEmailEnable(formData?.reports?.enabled);
    if (formData?.reports?.emailIds?.length > 0) {
      setEmailIds(formData?.reports?.emailIds);
    }
  }, [formData?.reports?.emailIds, formData?.reports?.enabled]);

  const handleEnableEmail = (event) => {
    const isEnabled = event.target.value === 'true';
    setEmailEnable(isEnabled);
    if (isEnabled) {
      formData.reports.enabled = isEnabled;
      setFormData({ ...formData });
    } else {
      formData.reports.enabled = isEnabled;
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
    formData.reports.emailIds = updatedEmailIds;
    setFormData({ ...formData });
    setChangesHappened(true);
  };

  const handleEmailBlur = (index, isInvalid) => {
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
    updatedEmailErrors[index] = isInvalid;
    setEmailErrors(updatedEmailErrors);
    const hasErrors = updatedEmailErrors.some((error) => error);
    setHasErrors(hasErrors);
  };

  const handleDeleteEmail = (index) => {
    const updatedEmailIds = [...emailIds];
    updatedEmailIds.splice(index, 1);
    formData.reports.emailIds = updatedEmailIds;
    setFormData({ ...formData });
    const updatedEmailErrors = [...emailErrors];
    updatedEmailErrors.splice(index, 1);
    setEmailErrors(updatedEmailErrors);
    setChangesHappened(true);
  };

  const handleAddEmail = () => {
    if (emailIds.length < 10) {
      const updatedEmailIds = [...emailIds, ''];
      formData.reports.emailIds = updatedEmailIds;
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
          <Typography color="initial" fontWeight={600} fontSize={24}>
            Reports
          </Typography>
          <Typography fontSize="14px" color="#828282">
            Reports will be sent to the designated email IDs; User can still
            download reports from the dashboard
          </Typography>
        </Box>
      </Box>
      <Box>
        <Grid container spacing={2} padding={2}>
          <Grid item xs={4}>
            <Typography color={assets.colors.greySubtext}>
              Do you want to receive <br /> Reports on email?
            </Typography>
          </Grid>
          <Grid item xs={7} sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex' }}>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={emailEnabled ? true : false}
                  onChange={handleEnableEmail}
                  sx={{ display: 'flow' }}
                >
                  <FormControlLabel
                    value={true}
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio />}
                    label="No"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          </Grid>
          <If condition={formData?.reports?.enabled}>
            <>
              {_.map(formData?.reports?.services, (service, serviceName) => (
                <ServiceCheckboxes
                  key={serviceName}
                  service={serviceName}
                  formData={formData}
                  setFormData={setFormData}
                  accountData={accountData}
                  setChangesHappened={setChangesHappened}
                />
              ))}
              <Grid item xs={6} md={4}>
                <Typography color={assets.colors.greySubtext}>
                  Email ID (max 10)
                </Typography>
              </Grid>
              <Grid
                item
                md={7}
                xs={10}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <ReportsEmailList
                  emailIds={emailIds}
                  emailErrors={emailErrors}
                  handleEmailChange={handleEmailChange}
                  handleEmailBlur={handleEmailBlur}
                  handleDeleteEmail={handleDeleteEmail}
                />
                <If
                  condition={
                    !emailErrors.some((error) => error) && emailIds.length < 10
                  }
                >
                  <Grid item xs={7} sx={{ ml: 2 }}>
                    <Typography
                      fontWeight={500}
                      color="#46B2D9"
                      onClick={handleAddEmail}
                      sx={{ cursor: 'pointer' }}
                      noWrap
                    >
                      + Add Email Id
                    </Typography>
                  </Grid>
                </If>
              </Grid>
            </>
          </If>
        </Grid>
      </Box>
    </>
  );
};

export default Reports;
