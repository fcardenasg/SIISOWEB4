import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import {
    TextField,
} from '@mui/material';
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { LocalizationProvider, MobileDatePicker } from "@mui/lab";

const InputDatePick = ({ bug, disabled, value, label, onChange, name, required, ...others }) => {

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDatePicker
                    label={label}
                    inputFormat="yyyy/MM/dd"
                    value={value}
                    disabled={disabled}
                    onChange={onChange}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                    KeyboardButtonProps={{
                        "aria-label": "change date"
                    }}
                    {...others}
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