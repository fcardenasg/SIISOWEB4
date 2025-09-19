import { TextField } from '@mui/material';

const InputOnChange = ({ label, value, onChange, onKeyDown, size, required, ...others }) => {
    return (
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
            autoComplete="off"
            {...others}
        />
    );
}

export default InputOnChange;