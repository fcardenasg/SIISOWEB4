import { TextField } from '@mui/material';

const InputDatePick = ({ value, label, noWriting = false, onChange, size, ...others }) => {

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
            inputProps={{
                onKeyDown: noWriting ? (e) => e.preventDefault() : undefined
            }}
            fullWidth
            {...others}
        />
    );
};

export default InputDatePick;