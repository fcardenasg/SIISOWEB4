import {
    FormHelperText,
    Grid,
    TextField,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { Controller } from 'react-hook-form';

const InputText = ({ bug, defaultValue, label, size, fullWidth = true, name, ...others }) => {
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <>
            <Controller
                name={name}
                defaultValue={defaultValue}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label={label}
                        size={matchesXS ? 'small' : 'medium'}
                        InputLabelProps={{
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
        </>
    );
};

export default InputText;