import { TextField, InputAdornment } from '@mui/material';
import PropTypes from 'prop-types';

const InputOnChange = ({ label, helperText, autoFocus, value, startAdornment = false, disabled, onChange, onKeyDown, size, required }) => {
    return (
        <>
            <TextField
                label={label}
                fullWidth
                value={value}
                onChange={onChange}
                disabled={disabled}
                size={size}
                autoFocus={autoFocus}
                helperText={helperText}
                onKeyDown={onKeyDown}
                InputLabelProps={{
                    className: required ? 'required-label' : '',
                    required: required || false
                }}
                InputProps={{
                    startAdornment: startAdornment ? <InputAdornment position="start"></InputAdornment> : '',
                }}
            />
        </>
    );
}

export default InputOnChange;

InputOnChange.propTypes = {
    onChange: PropTypes.func,
    startAdornment: PropTypes.bool,
    autoFocus: PropTypes.bool,
    size: PropTypes.string,
    disabled: PropTypes.string,
    helperText: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.any,
    onKeyDown: PropTypes.any,
    required: PropTypes.bool
};