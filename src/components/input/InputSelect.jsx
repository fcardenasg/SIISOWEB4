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

const InputSelect = ({ bug, options, size, defaultValue, label, name, ...others }) => {

    return (
        <>
            <Controller
                name={name}
                defaultValue={defaultValue}
                render={({ field }) => (
                    <FormControl fullWidth error={bug ? true : false} required={bug ? true : false}>
                        <InputLabel htmlFor="my-input" id="demo-simple-select-label">
                            {label}
                        </InputLabel>

                        <Select
                            {...field}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label={label}
                            {...others}
                            fullWidth
                            size={size}
                        >
                            {options?.map((option) => (
                                <MenuItem key={option?.value} value={option?.value}>
                                    {option?.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}
            />
            {bug && (
                <Grid item xs={12}>
                    <FormHelperText error>{bug.message}</FormHelperText>
                </Grid>
            )}

        </>
    );
};

export default InputSelect;

InputSelect.propTypes = {
    bug: PropTypes.object,
    size: PropTypes.string,
    label: PropTypes.string,
    defaultValue: PropTypes.any,
    name: PropTypes.string,
    options: PropTypes.any,
};