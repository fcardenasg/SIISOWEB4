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

const InputDate = ({ bug, onChange, control, value, options, size, defaultValue, label, name, required, ...others }) => {


    let isError = false;
    let errorMessage = '';
    if (bug && Object.prototype.hasOwnProperty.call(bug, name)) {
        isError = true;
        errorMessage = bug[name].message;
    }

    return (
        <>
            <Controller
                as={
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    margin="none"
                                    fullWidth
                                /* inputProps={{ style: { fontSize: 14 } }} */
                                /* InputLabelProps={{ style: { fontSize: 14 } }} */
                                />
                            )}
                            mask="____/__/__"
                            label={label}
                            value={value}
                            inputFormat="yyyy/MM/dd"
                            onChange={onChange}
                        />
                    </LocalizationProvider>
                }
                name={name}
                defaultValue={defaultValue}
                {...others}
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
    size: PropTypes.string,
    value: PropTypes.string,
    label: PropTypes.string,
    defaultValue: PropTypes.any,
    name: PropTypes.string,
    required: PropTypes.bool,
    control: PropTypes.any
};