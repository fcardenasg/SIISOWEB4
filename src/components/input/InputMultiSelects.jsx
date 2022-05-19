import PropTypes from 'prop-types';
import {
    Autocomplete,
    TextField
} from '@mui/material';

const InputMultiSelects = ({ onChange, renderTags, value, options, label, ...others }) => {

    return (
        <>
            <Autocomplete
                multiple
                onChange={onChange}
                value={value}
                options={options}
                renderInput={(params) => <TextField
                    {...params} label={label} />
                }
                {...others}
            />
        </>
    );
};

export default InputMultiSelects;

InputMultiSelects.propTypes = {
    onChange: PropTypes.func,
    renderTags: PropTypes.any,
    label: PropTypes.string,
    value: PropTypes.string,
    options: PropTypes.any,
};