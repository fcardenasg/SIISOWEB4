import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import {
    FormHelperText,
    Grid,
    TextField,
} from '@mui/material';

const InputText = ({ bug, control, onChange, value, defaultValue, label, size, fullWidth = true, name, required, ...others }) => {
    let isError = false;
    let errorMessage = '';
    if (bug && Object.prototype.hasOwnProperty.call(bug, name)) {
        isError = true;
        errorMessage = bug[name].message;
    }

    return (
        <>
            <Controller
                as={TextField}
                name={name}
                control={control}
                defaultValue={defaultValue}
                label={label}
                onChange={onChange}
                value={value}
                size={size}
                fullWidth={fullWidth}
                InputLabelProps={{
                    className: required ? 'required-label' : '',
                    required: required || false
                }}
                error={isError}
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

export default InputText;

InputText.propTypes = {
    bug: PropTypes.object,
    value: PropTypes.string,
    onChange: PropTypes.func,
    size: PropTypes.string,
    label: PropTypes.string,
    defaultValue: PropTypes.string,
    name: PropTypes.string,
    required: PropTypes.bool,
    fullWidth: PropTypes.bool,
    control: PropTypes.any
};