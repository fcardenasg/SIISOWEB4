import React from "react";
import { Controller } from "react-hook-form";
import PropTypes from 'prop-types';
import {
    Autocomplete,
    TextField
} from '@mui/material';

const SelectOnChange = ({ bug, options, value, onChange, size, label, name, defaultValue }) => {
    let isError = false;
    let errorMessage = '';
    if (bug && Object.prototype.hasOwnProperty.call(bug, name)) {
        isError = true;
        errorMessage = bug[name].message;
    }

    return (
        <Controller
            as={
                <Autocomplete
                    disableClearable
                    options={options}
                    inputValue={value}
                    defaultValue={defaultValue}
                    onChange={onChange}
                    renderInput={(params) => <TextField {...params} label={label} />}
                />
            }
            name={name}
            defaultValue={defaultValue}
        />
    );
}

export default SelectOnChange;

SelectOnChange.propTypes = {
    bug: PropTypes.object,
    onChange: PropTypes.func,
    defaultValue: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    options: PropTypes.any,
    size: PropTypes.string
};