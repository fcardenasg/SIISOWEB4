import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { LocalizationProvider, MobileDatePicker } from "@mui/lab";
import { Fragment } from 'react';

const InputDatePick = ({ value, label, onChange, required, ...others }) => {

    return (
        <Fragment>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDatePicker
                    label={label}
                    inputFormat="yyyy/MM/dd"
                    value={value}
                    onChange={onChange}
                    renderInput={(params) => <TextField {...params} fullWidth />}
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