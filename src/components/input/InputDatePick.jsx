import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import { Fragment } from 'react';

const InputDatePick = ({ value, label, onChange, size, ...others }) => {

    return (
        <Fragment>
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
        </Fragment>
    );
};

export default InputDatePick;

InputDatePick.propTypes = {
    onChange: PropTypes.func,
    label: PropTypes.string,
    value: PropTypes.any,
};