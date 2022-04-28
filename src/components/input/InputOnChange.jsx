import { TextField, InputAdornment } from '@mui/material';
import PropTypes from 'prop-types';

const InputOnChange = ({ label, value, startAdornment = false, onChange, onKeyDown, size, required, ...others }) => {
    return (
        <>
            <TextField
                label={label}
                fullWidth
                value={value}
                onChange={onChange}
                size={size}
                onKeyDown={onKeyDown}
                InputLabelProps={{
                    className: required ? 'required-label' : '',
                    required: required || false
                }}
                InputProps={{
                    startAdornment: startAdornment ? <InputAdornment position="start"></InputAdornment> : '',
                }}
                {...others}
            />
        </>
    );
}

export default InputOnChange;

InputOnChange.propTypes = {
    onChange: PropTypes.func,
    startAdornment: PropTypes.bool,
    size: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.any,
    onKeyDown: PropTypes.any,
    required: PropTypes.bool
};