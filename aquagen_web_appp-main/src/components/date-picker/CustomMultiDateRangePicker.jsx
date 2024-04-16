import moment from 'moment';
import { Box, Tooltip } from '@mui/material';
import CustomSingleDatePicker from './CustomSingleDatePicker';

function CustomMultiDateRangePicker({
    type,
    valueFrom = null,
    valueTo = null,
    onChangeFrom,
    borderRadius = '8px',
    onChangeTo,
    minDate1 = moment('2014-01-01'),
    maxDate1 = moment(),
    minDate2 = moment('2014-01-01'),
    maxDate2 = moment(),
    gap = '10px',
    defaultValueFrom,
    defaultValueTo,
    labelFrom,
    labelTo,
    disableFrom,
    disableTo,
    restStyleFrom,
    restStyleTo,
    loading,
}) {
    return (
        <Box sx={{ display: 'flex', gap: { gap } }}>
            <Tooltip
                title={disableFrom && !loading ? 'Select Comparison Mode' : ''}
                disableFocusListener
                disableInteractive
                arrow
            >
                <span>
                    <CustomSingleDatePicker
                        type={type}
                        minDate={minDate1}
                        maxDate={maxDate1}
                        borderRadius={borderRadius}
                        defaultValue={defaultValueFrom}
                        onChange={onChangeFrom}
                        value={valueFrom}
                        label={labelFrom}
                        disabled={disableFrom || loading}
                        restStyle={restStyleFrom}
                    />
                </span>
            </Tooltip>
            <Tooltip
                title={disableTo && !loading ? 'Select Comparison Mode' : ''}
                disableFocusListener
                disableInteractive
                arrow
            >
                <span>
                    <CustomSingleDatePicker
                        type={type}
                        minDate={minDate2}
                        maxDate={maxDate2}
                        borderRadius={borderRadius}
                        defaultValue={defaultValueTo}
                        onChange={onChangeTo}
                        value={valueTo}
                        label={labelTo}
                        disabled={disableTo || loading}
                        restStyle={restStyleTo}
                    />
                </span>
            </Tooltip>
        </Box>
    );
}

export default CustomMultiDateRangePicker;
