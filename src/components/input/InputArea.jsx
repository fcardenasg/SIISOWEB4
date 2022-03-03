import { TextField, InputAdornment } from '@mui/material';
import PropTypes from 'prop-types';

const InputArea = ({ size, rows, label, defaultValue, name, placeholder }) => {
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
                defaultValue={defaultValue}
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
    rows: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    defaultValue: PropTypes.any,
    name: PropTypes.string,
    fullWidth: PropTypes.bool
};