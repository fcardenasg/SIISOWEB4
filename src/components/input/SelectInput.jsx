import React from "react";
import { Controller } from "react-hook-form";
import PropTypes from 'prop-types';
import {
    MenuItem,
    Select
} from '@mui/material';
import SelectRender from './SelectRender';

const SelectInput = ({ bug, options, size, label, name, defaultValue }) => {
    let isError = false;
    let errorMessage = '';
    if (bug && Object.prototype.hasOwnProperty.call(bug, name)) {
        isError = true;
        errorMessage = bug[name].message;
    }

    return (
        <Controller
            as={
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
            }
            name={name}
            defaultValue={defaultValue}
        />
    );
}

export default SelectInput;

SelectInput.propTypes = {
    bug: PropTypes.object,
    defaultValue: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    options: PropTypes.any,
    size: PropTypes.string
};