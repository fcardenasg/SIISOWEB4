import * as React from 'react';
import Radio from '@mui/material/Radio';
import { FormControlLabel } from '@mui/material';

export default function RadioButton({ onChange, valueString, value, label, ...other }) {

    return (
        <FormControlLabel
            value={valueString}
            control={<Radio onChange={onChange} value={value} {...other} />}
            label={label}
            labelPlacement={label}
        />
    );
}
