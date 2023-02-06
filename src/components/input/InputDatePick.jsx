import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { LocalizationProvider, MobileDatePicker } from "@mui/lab";
import { Fragment } from 'react';

const InputDatePick = ({ value, label, onChange, required, size, ...others }) => {

    return (
        <Fragment>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDatePicker
                    label={label}
                    inputFormat="dd/MM/yyyy"
                    value={value}
                    onChange={onChange}
                    renderInput={(params) => <TextField size={size} {...params} fullWidth />}
                    KeyboardButtonProps={{
                        "aria-label": "change date"
                    }}
                    {...others}
                />
            </LocalizationProvider>
        </Fragment>
    );
};

export default InputDatePick;

InputDatePick.propTypes = {
    onChange: PropTypes.func,
    label: PropTypes.string,
    value: PropTypes.any,
};