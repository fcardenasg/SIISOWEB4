import { TextField } from '@mui/material';
import PropTypes from 'prop-types';

const InputOnChange = ({ label, value, onChange, onKeyDown, size, required }) => {
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
            />
        </>
    );
}

export default InputOnChange;

InputOnChange.propTypes = {
    onChange: PropTypes.func,
    size: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.any,
    onKeyDown: PropTypes.any,
    required: PropTypes.bool
};