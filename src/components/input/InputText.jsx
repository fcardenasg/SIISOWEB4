import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import {
    FormHelperText,
    Grid,
    TextField,
} from '@mui/material';

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

InputText.propTypes = {
    bug: PropTypes.object,
    size: PropTypes.string,
    label: PropTypes.string,
    defaultValue: PropTypes.any,
    name: PropTypes.string,
    required: PropTypes.bool,
    fullWidth: PropTypes.bool
};

{/* <Controller render={({ field, formState }) => (
    <TextField
        {...field}
        label="display name"
        error={!!formState.errors?.displayName}
        helperText={!!formState.errors?.displayName ? formState.errors?.displayName.message : null}
    />

)} name="displayName" control={control} defaultValue=""
/> */}