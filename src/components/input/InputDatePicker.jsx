import {
    FormHelperText,
    Grid,
    TextField,
    useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FormatDate } from 'components/helpers/Format';
import { Controller } from 'react-hook-form';

const InputDatePicker = ({ label, name, defaultValue, noWriting = false, size, bug, ...others }) => {
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <>
            <Controller
                name={name}
                defaultValue={FormatDate(defaultValue)}
                render={({ field }) => (
                    <TextField
                        {...field}
                        id="fecha"
                        label={label}
                        type="date"
                        size={size ? size : matchesXS ? 'small' : 'medium'}
                        InputLabelProps={{
                            shrink: true,
                            className: bug ? 'required-label' : '',
                            required: bug || false
                        }}
                        inputProps={{
                            onKeyDown: noWriting ? (e) => e.preventDefault() : undefined
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
        </>
    );
};

export default InputDatePicker;