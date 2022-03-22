import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import {
    FormHelperText,
    Grid,
    FormControl,
    InputAdornment,
    TextField,
} from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/lab';

const InputDate = ({ bug, defaultValue, label, name, required, ...others }) => {

    let isError = false;
    let errorMessage = '';
    if (bug && Object.prototype.hasOwnProperty.call(bug, name)) {
        isError = true;
        errorMessage = bug[name].message;
    }

    return (
        <>
            <Controller
                name={name}
                defaultValue={defaultValue}
                {...others}
                render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            {...field}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    fullWidth
                                />
                            )}
                            mask="____/__/__"
                            label={label}
                            inputFormat="yyyy/MM/dd"
                        />
                    </LocalizationProvider>
                )}
            />


            {errorMessage && (
                <Grid item xs={12}>
                    <FormHelperText error>{errorMessage}</FormHelperText>
                </Grid>
            )}
        </>
    );
};

export default InputDate;

InputDate.propTypes = {
    bug: PropTypes.object,
    onChange: PropTypes.func,
    label: PropTypes.string,
    defaultValue: PropTypes.any,
    name: PropTypes.string,
    required: PropTypes.bool,
    control: PropTypes.any,
    defaultCalendarMonth: PropTypes.any
};