import { Controller } from 'react-hook-form';
import {
    FormHelperText,
    Grid,
    FormControl,
    MenuItem,
    InputLabel,
    Select
} from '@mui/material';


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