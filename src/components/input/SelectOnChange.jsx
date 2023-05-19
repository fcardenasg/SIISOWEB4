import PropTypes from 'prop-types';
import {
    Select,
    FormControl,
    InputLabel,
    MenuItem
} from '@mui/material';
import { Fragment } from 'react';

const SelectOnChange = ({ disabled, options, value, onChange, size, label, name }) => {

    return (
        <Fragment>
            <FormControl fullWidth>
                <InputLabel htmlFor="my-input" id="demo-simple-select-label" sx={{ fontSize: 14 }}>
                    {label}
                </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label={label}
                    onChange={onChange}
                    value={value}
                    fullWidth
                    size={size}
                    disabled={disabled}
                >
                    {options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Fragment>
    );
}

export default SelectOnChange;

SelectOnChange.propTypes = {
    onChange: PropTypes.func,
    name: PropTypes.string,
    disabled: PropTypes.bool,
    label: PropTypes.string,
    value: PropTypes.any,
    options: PropTypes.any,
    size: PropTypes.any
};