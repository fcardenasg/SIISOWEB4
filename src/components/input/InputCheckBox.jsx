import PropTypes from 'prop-types';
import {
    Checkbox,
    FormHelperText,
    FormControl,
    Grid,
    FormControlLabel,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Controller } from 'react-hook-form';

const InputCheckBox = ({ bug, control, label, name, size, defaultValue, ...others }) => {
    const theme = useTheme();

    let isError = false;
    let errorMessage = '';
    if (bug && Object.prototype.hasOwnProperty.call(bug, name)) {
        isError = true;
        errorMessage = bug[name].message;
    }
    return (
        <>
            <FormControl error={isError}>
                <Controller
                    name={name}
                    control={control}
                    defaultValue={defaultValue}
                    render={({ field }) => (
                        <Checkbox
                            {...field}
                        />
                    )}
                />
                {errorMessage && (
                    <Grid item xs={12}>
                        <FormHelperText error>{errorMessage}</FormHelperText>
                    </Grid>
                )}
            </FormControl>
        </>
    );

}

export default InputCheckBox;

InputCheckBox.propTypes = {
    bug: PropTypes.object,
    name: PropTypes.string,
    defaultValue: PropTypes.string,
    onClick: PropTypes.func,
    size: PropTypes.string,
    label: PropTypes.string,
    control: PropTypes.any,
};