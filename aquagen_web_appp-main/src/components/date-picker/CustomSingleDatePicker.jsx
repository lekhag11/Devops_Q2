import * as React from 'react';
import { useState } from 'react';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import moment from 'moment';
import { FormControl } from '@mui/material';
import { assets } from 'src/assets/assets';

/**
 * minDate, maxDate and defaultValue should be passed as moment format
 * @property {string} size - Allowed values are (small, medium)
 */

const CustomSingleDatePicker = ({
    type,
    value,
    onChange,
    borderRadius = '8px',
    minDate = moment('2014-01-01'),
    maxDate = moment(),
    defaultValue,
    label,
    restStyle,
    size = 'small',
    disabled,
    ...rest
}) => {
    const [open, setOpen] = useState(false);

    const handleOpenDatePicker = () => {
        if (disabled) return;
        setOpen(true);
    };

    const calendarIcon = () => <CalendarTodayIcon fontSize={'small'} />;

    const pickerComponent = () => {
        switch (type) {
            case 'month':
                return (
                    <DatePicker
                        sx={inputStyle}
                        views={['month', 'year']}
                        value={value}
                        slots={{ openPickerIcon: calendarIcon }}
                        PopperProps={popperStyle}
                        minDate={minDate}
                        maxDate={maxDate}
                        defaultValue={defaultValue}
                        disabled={disabled}
                        open={open}
                        onClose={() => setOpen(false)}
                        onChange={onChange}
                        slotProps={{
                            textField: {
                                size: size,
                                readOnly: true,
                                placeholder: label,
                                onClick: () => handleOpenDatePicker(),
                            },
                        }}
                        {...rest}
                    />
                );
            case 'year':
                return (
                    <DatePicker
                        sx={inputStyle}
                        views={['year']}
                        slots={{ openPickerIcon: calendarIcon }}
                        PopperProps={popperStyle}
                        minDate={minDate}
                        maxDate={maxDate}
                        value={value}
                        disabled={disabled}
                        defaultValue={defaultValue}
                        open={open}
                        onClose={() => setOpen(false)}
                        onChange={onChange}
                        slotProps={{
                            textField: {
                                size: size,
                                readOnly: true,
                                placeholder: label,
                                onClick: () => handleOpenDatePicker(),
                            },
                        }}
                        {...rest}
                    />
                );
            default:
                return (
                    <FormControl>
                        <DatePicker
                            sx={inputStyle}
                            views={['year', 'month', 'day']}
                            format='DD/MM/YYYY'
                            slots={{
                                openPickerIcon: calendarIcon,
                            }}
                            PopperProps={popperStyle}
                            minDate={minDate}
                            maxDate={maxDate}
                            defaultValue={defaultValue}
                            value={value}
                            open={open}
                            onClose={() => setOpen(false)}
                            onChange={onChange}
                            disabled={disabled}
                            onError={(v) => onChange(undefined)}
                            slotProps={{
                                textField: {
                                    size: size,
                                    readOnly: true,
                                    placeholder: label,
                                    onClick: () => handleOpenDatePicker(),
                                },
                            }}
                            {...rest}
                        />
                    </FormControl>
                );
        }
    };

    const inputStyle = {
        '& .MuiInputBase-root': {
            borderRadius: borderRadius,
            backgroundColor: disabled ? assets.colors.disabledLight : '#fff',
            ...restStyle,

            '& .MuiInputBase-input': {
                cursor: disabled ? 'initial' : 'pointer',
            },

            '& .MuiInputAdornment-root': {
                cursor: disabled ? 'initial' : 'pointer',
            },
        },

        '& .Mui-disabled': {
            WebkitTextFillColor: 'rgba(0,0,0,1) !important',
        },
    };

    const popperStyle = {
        '& .MuiIconButton-root': {
            zIndex: 1100,
            fill: 'red',
        },
        '& .Mui-disabled': {
            backgroundColor: assets.colors.disabled,
        },
    };

    return (
        <LocalizationProvider
            dateAdapter={AdapterMoment}
            adapterLocale='en-gb'
            sx={inputStyle}
        >
            {pickerComponent()}
        </LocalizationProvider>
    );
};

export default CustomSingleDatePicker;
