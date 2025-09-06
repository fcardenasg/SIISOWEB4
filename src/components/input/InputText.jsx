import {
    FormHelperText,
    Grid,
    TextField,
} from '@mui/material';
import { Controller } from 'react-hook-form';

const InputText = ({ bug, defaultValue, label, size, fullWidth = true, name, ...others }) => {
    return (
        <>
            <Controller
                name={name}
                defaultValue={defaultValue}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label={label}
                        size={size}
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