import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { assets } from 'src/assets/assets';
import FileInput from 'src/components/input/FileInput';
import { AccountController } from 'src/controllers/account/accountController';
import { AnalyticEvents } from 'src/enums/analyticsEnum';
import {
  MeasurementUnitValues,
  MeasurementUnits,
} from 'src/enums/measurementUnits';
import { AnalyticsService } from 'src/services/analytics/analyticsService';

const Account = ({
  settingData,
  formData,
  setFormData,
  setHasErrors,
  setChangesHappened,
  ...props
}) => {
  const [selectedButton, setSelectedButton] = useState();

  useEffect(() => {
    if (formData?.account?.siUnit?.SOURCE_CATEGORY) {
      if (formData?.account?.siUnit?.SOURCE_CATEGORY === MeasurementUnits.KL) {
        setSelectedButton(MeasurementUnits.KL);
      } else if (
        formData?.account?.siUnit?.SOURCE_CATEGORY === MeasurementUnits.M3
      ) {
        setSelectedButton(MeasurementUnits.M3);
      } else {
        setSelectedButton(null);
      }
    }
  }, [formData]);

  const handleButtonClick = (value) => {
    setSelectedButton(value);
    formData.account.siUnit.SOURCE_CATEGORY = value;
    setChangesHappened(true);
    setFormData({ ...formData });
  };

  const handleLogoChange = async (e) => {
    let response = await AccountController.handleLogoChange(e);
    if (response) {
      formData.account.logo = response.logourl;
      AnalyticsService.sendEvent(AnalyticEvents.ACCOUNT_SETTINGS_ICON_CHANGE);
      setChangesHappened(true);
      setFormData({
        ...formData,
      });
    }
  };
  const handleNameChange = (e) => {
    formData.account.industryName = e.target.value;
    setChangesHappened(true);
    setFormData({
      ...formData,
    });
    if (e.target.value.trim() === '') {
      setHasErrors(true);
    } else {
      setHasErrors(false);
    }
  };

  const handleShitTime = (e) => {
    const selectedTime = e.target.value;
    formData.account.shift.startAt = selectedTime;
    formData.account.shift.endAt = selectedTime;
    const hour = parseInt(selectedTime.split(':')[0], 10);
    const shiftName = hour >= 1 && hour <= 11 ? 'Day shift' : 'Night shift';
    formData.account.shift.shiftName = shiftName;

    setChangesHappened(true);
    setFormData({
      ...formData,
    });
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          p: 2,
          pt: '4px',
          alignItems: 'center',
        }}
      >
        <Typography color="initial" fontWeight={600} fontSize={24}>
          Account
        </Typography>
      </Box>
      <Box>
        <Grid container spacing={2} padding={2}>
          <Grid item xs={12} md={3}>
            <Typography>Logo</Typography>
          </Grid>
          <Grid item xs={12} md={9} sx={{ display: 'flex' }}>
            <img
              src={formData?.account?.logo}
              sx={{
                maxWidth: '120px',
                minHeight: '20px',
                border: '1px solid #80808078',
                padding: '2px',
              }}
              alt="logo"
            />
            <Box sx={{ margin: '0 12px' }}>
              <FileInput
                accept="image/jpeg, image/png"
                maxSize={2 * 1024 * 1024} //   bytes (2MB)
                onFileSelect={handleLogoChange}
              />
              <Typography fontSize={12} color="#828282">
                Logo format: JPG, PNG
                <br />
                Size: 400*200 (Max 2MB)
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography>Company Name*</Typography>
          </Grid>
          <Grid item xs={12} md={9}>
            <TextField
              id="logo"
              value={formData?.account?.industryName || ''}
              size="small"
              fullWidth
              onChange={(e) => handleNameChange(e)}
              required={true}
              error={!formData?.account?.industryName}
              helperText={
                !formData?.account?.industryName
                  ? 'Compnay name is required'
                  : ''
              }
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography>Password</Typography>
          </Grid>
          <Grid item xs={12} md={9}>
            <Grid
              sx={{
                padding: '6px',
                border: '1px solid #8080808f',
                borderRadius: '6px',
              }}
            >
              <Typography>
                Please contact{' '}
                <Link href="mailto:projectsupport@fluxgen.com">
                  projectsupport@fluxgen.com
                </Link>{' '}
                to change your password
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} md={3} sx={{ my: 1 }}>
            <Typography>Measurement Unit</Typography>
          </Grid>
          <Grid item xs={12} md={9} sx={{ my: 1 }}>
            <div>
              <ButtonGroup
                variant="contained"
                color="primary"
                aria-label="button group"
                sx={{ margin: 0, padding: 0 }}
              >
                <Button
                  onClick={() => handleButtonClick(MeasurementUnits.KL)}
                  sx={{
                    backgroundColor:
                      selectedButton === MeasurementUnits.KL
                        ? assets.colors.primary
                        : 'transparent',
                    color:
                      selectedButton === MeasurementUnits.KL
                        ? 'white'
                        : 'black',
                  }}
                >
                  {MeasurementUnitValues[MeasurementUnits.KL]}
                </Button>
                <Button
                  onClick={() => handleButtonClick(MeasurementUnits.M3)}
                  sx={{
                    backgroundColor:
                      selectedButton === MeasurementUnits.M3
                        ? assets.colors.primary
                        : 'transparent',
                    color:
                      selectedButton === MeasurementUnits.M3
                        ? 'white'
                        : 'black',
                  }}
                >
                  {MeasurementUnitValues[MeasurementUnits.M3]}
                </Button>
              </ButtonGroup>
            </div>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography>Shift Time*</Typography>
            <Typography fontSize={12}> (based on 24:00:00hr)</Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <TextField
              id="end_time"
              variant="outlined"
              type="time"
              className={`w-100`}
              value={formData?.account?.shift?.startAt || ''}
              onChange={(e) => handleShitTime(e)}
              name="end_time"
              inputProps={{ step: 1 }}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Account;
