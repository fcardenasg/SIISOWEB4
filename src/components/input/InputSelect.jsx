import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import {
    FormHelperText,
    Grid,
    FormControl,
    MenuItem,
    InputLabel,
    Select,
} from '@mui/material';

const InputSelect = ({ bug, onChange, value, options, size, defaultValue, label, name, ...others }) => {
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
                render={({ field }) => (
                    <FormControl fullWidth error={isError}>
                        <InputLabel htmlFor="my-input" id="demo-simple-select-label" sx={{ fontSize: 14 }}>
                            {label}
                        </InputLabel>
                        <Select
                            {...field}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label={label}
                            fullWidth
                            size={size}
                        >
                            {options.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
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

export default InputSelect;

InputSelect.propTypes = {
    bug: PropTypes.object,
    onChange: PropTypes.func,
    size: PropTypes.string,
    value: PropTypes.any,
    label: PropTypes.string,
    defaultValue: PropTypes.any,
    name: PropTypes.string,
    options: PropTypes.any,
};