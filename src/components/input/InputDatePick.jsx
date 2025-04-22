import { TextField } from '@mui/material';

const InputDatePick = ({ value, label, onChange, size, ...others }) => {

    return (
        <TextField
            id="fecha"
            label={label}
            value={value}
            onChange={onChange}
            type="date"
            size={size}
            InputLabelProps={{
                shrink: true
            }}
            fullWidth
            {...others}
        />
    );
};

export default InputDatePick;