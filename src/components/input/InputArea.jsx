import { TextField, InputAdornment } from '@mui/material';
import PropTypes from 'prop-types';

const InputArea = ({ size, onChange, rows, label, value, name, placeholder }) => {
    return (
        <>
            <TextField
                id="outlined-basic"
                multiline
                fullWidth
                placeholder={placeholder}
                rows={rows}
                label={label}
                name={name}
                size={size}
                value={value}
                onChange={onChange}
                InputProps={{
                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                }}
            />
        </>
    );
}

export default InputArea;

InputArea.propTypes = {
    size: PropTypes.string,
    onChange: PropTypes.func,
    rows: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.any,
    name: PropTypes.string,
    fullWidth: PropTypes.bool
};