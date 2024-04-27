import * as React from 'react';
import Radio from '@mui/material/Radio';

export default function RadioButton({ onChange, value, label, ...other }) {

    return (
        <FormControlLabel
            value="start"
            control={<Radio onChange={onChange} value={value} {...other} />}
            label={label}
            labelPlacement={label}
        />
    );
}
