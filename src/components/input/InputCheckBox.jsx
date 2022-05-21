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

const InputCheckBox = ({ bug, label, name, size, defaultValue, ...others }) => {
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
                    defaultValue={defaultValue}
                    render={({ field }) => (
                        <FormControlLabel
                            control={
                                <Checkbox
                                    onChange={(e) => field.onChange(e.target.checked)}
                                    checked={field.value}
                                    sx={{
                                        color: theme.palette.primary,
                                        '&.Mui-checked': {
                                            color: theme.palette.primary
                                        },
                                        '& .MuiSvgIcon-root': { fontSize: size }
                                    }}
                                    {...others}
                                />
                            }
                            label={label}
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
    size: PropTypes.number,
    label: PropTypes.string,
};