import { Controller } from 'react-hook-form';
import {
    FormHelperText,
    Grid,
    FormControl,
    MenuItem,
    InputLabel,
    Select
} from '@mui/material';
import Label from 'components/label';

const InputSelect = ({ bug, options, size, defaultValue, label, name, ...others }) => {
    return (
        <>
            <Controller
                name={name}
                defaultValue={defaultValue}
                render={({ field }) => (
                    <FormControl fullWidth error={bug ? true : false} required={bug ? true : false}>
                        <InputLabel htmlFor="my-input" id="demo-simple-select-label">
                            {label}
                        </InputLabel>

                        <Select
                            {...field}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label={label}
                            fullWidth
                            size={size}
                            {...others}
                        >
                            {options?.map((option) => (
                                <MenuItem key={option?.value} value={option?.value}>
                                    <Grid container direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
                                        <Grid item>{option?.label}</Grid>

                                        {option?.codigo === 'CIE10' || option?.codigo === 'CIE11' ?
                                            (<Grid item><Label sx={{ mr: 1.5 }} variant="soft" color={option?.codigo === 'CIE10' ? "error" : "success"}>{option?.codigo}</Label></Grid>) : null
                                        }
                                    </Grid>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
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

export default InputSelect;