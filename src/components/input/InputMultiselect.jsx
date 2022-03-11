import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import {
    Autocomplete,
    TextField
} from '@mui/material';

const InputMultiselect = ({ bug, onChange, options, size, defaultValue, label, name, required, ...others }) => {
    let isError = false;
    let errorMessage = '';
    if (bug && Object.prototype.hasOwnProperty.call(bug, name)) {
        isError = true;
        errorMessage = bug[name].message;
    }

    return (
        <>
            <Autocomplete
                multiple
                options={options}
                getOptionLabel={(option) => option.label}
                defaultValue={[options[0], options[1]]}
                renderInput={(params) => <TextField {...params} />}
            />
        </>
    );
};

export default InputMultiselect;

InputMultiselect.propTypes = {
    bug: PropTypes.object,
    size: PropTypes.string,
    label: PropTypes.string,
    defaultValue: PropTypes.any,
    name: PropTypes.string,
    required: PropTypes.bool,
    options: PropTypes.any,
};