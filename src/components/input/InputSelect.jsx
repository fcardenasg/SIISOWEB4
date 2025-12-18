import { Controller } from 'react-hook-form';
import {
    FormHelperText,
    Grid,
    FormControl,
    MenuItem,
    InputLabel,
    Select,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import Label from 'components/label';

const InputSelect = ({ bug, options, size, defaultValue, label, name, maxWidth, ...others }) => {
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <>
            <Controller
                name={name}
                defaultValue={defaultValue}
                render={({ field }) => (
                    <FormControl fullWidth error={!!bug} required={!!bug}>
                        <InputLabel htmlFor="my-input" id="demo-simple-select-label" sx={{ fontSize: 14, whiteSpace: 'normal', maxWidth: maxWidth }}>
                            {label}
                        </InputLabel>

                        <Select
                            {...field}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label={label}
                            fullWidth
                            size={matchesXS ? 'small' : 'medium'}
                            sx={{
                                '& .MuiSelect-select': {
                                    fontSize: size === 'small' && '0.65rem',
                                },
                            }}
                            {...others}
                        >
                            {options?.map((option) => (
                                <MenuItem key={option?.value} value={option?.value} sx={{ whiteSpace: 'normal', maxWidth: maxWidth }}>
                                    <Grid container direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
                                        <Grid item sx={{ fontSize: size === 'small' && '0.65rem' }}>
                                            {option?.label}
                                        </Grid>

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