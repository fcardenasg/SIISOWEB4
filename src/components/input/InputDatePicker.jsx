import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import {
    FormHelperText,
    Grid,
    TextField,
    useMediaQuery,
} from '@mui/material';
import { Fragment } from 'react';
import { FormatDate } from 'components/helpers/Format';
import { useTheme } from '@mui/material/styles';

const InputDatePicker = ({ label, name, defaultValue, size, bug, ...others }) => {

    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Fragment>
            <Controller
                name={name}
                defaultValue={FormatDate(defaultValue)}
                render={({ field }) => (
                    <TextField
                        {...field}
                        id="fecha"
                        label={label}
                        type="date"
                        size={matchesXS ? 'small' : 'medium'}
                        InputLabelProps={{
                            shrink: true,
                            className: bug ? 'required-label' : '',
                            required: bug || false
                        }}
                        error={bug ? true : false}
                        fullWidth
                        {...others}
                    />
                )}
            />
            {bug && (
                <Grid item xs={12}>
                    <FormHelperText error>{bug.message}</FormHelperText>
                </Grid>
            )}
        </Fragment>
    );
};

export default InputDatePicker;

InputDatePicker.propTypes = {
    label: PropTypes.string,
    defaultValue: PropTypes.any,
    name: PropTypes.string
};