import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import {
    FormHelperText,
    Grid,
    TextField,
} from '@mui/material';

const InputText = ({ bug, onChange, value, control, rows, defaultValue, multiline, label, size, fullWidth = true, name, required, ...others }) => {
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
                value={value}
                onChange={onChange}
                size={size}
                rows={rows}
                fullWidth={fullWidth}
                multiline={multiline}
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
    onChange: PropTypes.func,
    multiline: PropTypes.bool,
    size: PropTypes.string,
    rows: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.any,
    defaultValue: PropTypes.any,
    name: PropTypes.string,
    required: PropTypes.bool,
    fullWidth: PropTypes.bool,
    control: PropTypes.any
};