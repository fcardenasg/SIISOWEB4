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

const InputSelect = ({ bug, control, onChange, value, options, size, defaultValue, label, name, required, ...others }) => {
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
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label={label}
                        fullWidth
                        size={size}
                    >
                        {options.map((option) => (
                            <MenuItem value={option.value}>
                                <span>
                                    {option.label}
                                </span>
                            </MenuItem>
                        ))}
                    </Select>
                }
                name={name}
                control={control}
                defaultValue={defaultValue}
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
    value: PropTypes.string,
    label: PropTypes.string,
    defaultValue: PropTypes.any,
    name: PropTypes.string,
    required: PropTypes.bool,
    options: PropTypes.any,
    control: PropTypes.any
};