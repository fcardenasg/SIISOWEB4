import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import {
    TextField,
} from '@mui/material';
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { LocalizationProvider, MobileDatePicker } from "@mui/lab";

const InputDatePick = ({ bug, disabled, value, label, onChange, name, required, ...others }) => {

    let isError = false;
    let errorMessage = '';
    if (bug && Object.prototype.hasOwnProperty.call(bug, name)) {
        isError = true;
        errorMessage = bug[name].message;
    }

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDatePicker
                    id="date-picker-dialog"
                    label={label}
                    inputFormat="yyyy/MM/dd"
                    value={value}
                    disabled={disabled}
                    onChange={onChange}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                    KeyboardButtonProps={{
                        "aria-label": "change date"
                    }}
                />
            </LocalizationProvider>
        </>
    );
};

export default InputDatePick;

InputDatePick.propTypes = {
    bug: PropTypes.object,
    onChange: PropTypes.func,
    label: PropTypes.string,
    value: PropTypes.any,
    disabled: PropTypes.any,
    name: PropTypes.string
};