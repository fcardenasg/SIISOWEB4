import PropTypes from 'prop-types';
import {
    FormControl,
    MenuItem,
    InputLabel,
    Select,
    Box
} from '@mui/material';

const SelectRender = ({ error, options, size, label }) => {
    return (
        <Box>
            <FormControl error={error}>
                <InputLabel id="demo-simple-select-label" sx={{ fontSize: 16 }}>
                    {label}
                </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label={label}
                    fullWidth
                    size={size}
                >
                    {options.map((option) => (
                        <MenuItem value={option.value}>
                            <span>
                                {option.label}
                            </span>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export default SelectRender;

SelectRender.propTypes = {
    error: PropTypes.bool,
    label: PropTypes.string,
    size: PropTypes.string,
    options: PropTypes.any
};