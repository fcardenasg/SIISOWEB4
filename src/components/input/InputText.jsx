import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import {
    FormHelperText,
    Grid,
    TextField,
} from '@mui/material';

const InputText = ({ bug, rows, multiline, defaultValue, disabled, label, size,
    fullWidth = true, name, required, ...others }) => {
    /* let isError = false;
    let errorMessage = '';
    if (bug && Object.prototype.hasOwnProperty.call(bug, name)) {
        isError = true;
        errorMessage = bug[name].message;
    } */

    return (
        <>
            <Controller
                name={name}
                defaultValue={defaultValue}
                render={({ field }) => (
                    <TextField
                        {...field}
                        /*   onChange={onChangeInput} */
                        label={label}
                        size={size}
                        disabled={disabled}
                        multiline={multiline}
                        rows={rows}
                        InputLabelProps={{
                            className: required ? 'required-label' : '',
                            required: required || false
                        }}
                        error={bug ? true : false}
                        fullWidth={fullWidth}
                    />
                )}
            />
            {bug && (
                <Grid item xs={12}>
                    <FormHelperText error>{bug}</FormHelperText>
                </Grid>
            )}
        </>
    );
};

export default InputText;

InputText.propTypes = {
    bug: PropTypes.object,
    size: PropTypes.string,
    disabled: PropTypes.bool,
    label: PropTypes.string,
    rows: PropTypes.string,
    defaultValue: PropTypes.any,
    multiline: PropTypes.any,
    name: PropTypes.string,
    required: PropTypes.bool,
    fullWidth: PropTypes.bool
};