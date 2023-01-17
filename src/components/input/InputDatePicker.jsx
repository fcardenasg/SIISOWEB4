import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import {
    TextField,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

const InputDatePicker = ({ label, name, defaultValue, size, ...others }) => {

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Controller
                    name={name}
                    defaultValue={defaultValue}
                    render={({ field }) => (
                        <MobileDatePicker
                            mask="__/__/____"
                            onChange={(newValue) => field.onChange(newValue)}
                            value={field.value}
                            label={label}
                            inputFormat="dd/MM/yyyy"
                            renderInput={(params) => <TextField {...params} fullWidth />}
                            KeyboardButtonProps={{
                                "aria-label": "change date"
                            }}
                            {...others}
                        />
                    )}
                />
            </LocalizationProvider>
        </>
    );
};

export default InputDatePicker;

InputDatePicker.propTypes = {
    label: PropTypes.string,
    defaultValue: PropTypes.any,
    name: PropTypes.string
};