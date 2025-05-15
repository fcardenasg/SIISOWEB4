import {
    FormControl,
    InputLabel,
    MenuItem,
    Select
} from '@mui/material';

const SelectOnChange = ({ disabled, defaultValue, options, value, onChange, size, label, name, maxWidth, ...others }) => {

    return (
        <FormControl fullWidth>
            <InputLabel
                htmlFor="my-input"
                id="demo-simple-select-label"
                sx={{ fontSize: 14, whiteSpace: 'normal', maxWidth: maxWidth }}
            >
                {label}
            </InputLabel>
            <Select
                defaultValue={defaultValue}
                labelId="demo-simple-select-label"
                id={`${name}-demo-simple-select`}
                label={label}
                onChange={onChange}
                value={value}
                fullWidth
                size={size}
                disabled={disabled}
                {...others}
            >
                {options.map((option) => (
                    <MenuItem
                        key={option.value}
                        value={option.value}
                        sx={{ whiteSpace: 'normal', maxWidth: maxWidth }}
                    >
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>

    );
}

export default SelectOnChange;