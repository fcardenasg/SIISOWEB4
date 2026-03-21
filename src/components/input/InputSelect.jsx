import CloseIcon from '@mui/icons-material/Close';
import {
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    useMediaQuery,
    useTheme
} from '@mui/material';
import Label from 'components/label';
import { Controller } from 'react-hook-form';

const InputSelect = ({ bug, options, size, defaultValue = "", label, name, maxWidth, clearable = false, ...others }) => {
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const finalSize = size ? size : (matchesXS ? 'small' : 'medium');
    const isSmall = finalSize === 'small';

    return (
        <FormControl
            fullWidth
            error={!!bug}
            required={!!others.required}
            variant="outlined"
        >
            <Controller
                name={name}
                defaultValue={defaultValue}
                render={({ field }) => {
                    const hasValue = field.value !== "" && field.value !== null && field.value !== undefined;

                    return (
                        <>
                            <InputLabel
                                id={`select-label-${name}`}
                                shrink={hasValue || undefined}
                                sx={{
                                    fontSize: 14,
                                    maxWidth: maxWidth,
                                    backgroundColor: 'transparent',
                                    ...(isSmall && {
                                        '&:not(.MuiInputLabel-shrink)': {
                                            transform: 'translate(14px, 9px) scale(1)',
                                        },
                                        '&.MuiInputLabel-shrink': {
                                            transform: 'translate(14px, -9px) scale(0.75)',
                                        }
                                    })
                                }}
                            >
                                {label}
                            </InputLabel>

                            <Select
                                {...field}
                                value={field.value ?? null}
                                labelId={`select-label-${name}`}
                                id={`select-${name}`}
                                label={label}
                                fullWidth
                                size={finalSize}
                                sx={{
                                    '& .MuiSelect-select': {
                                        fontSize: isSmall ? '0.65rem' : 'inherit',
                                        pr: clearable && hasValue ? '65px !important' : 'inherit',
                                        display: 'flex',
                                        alignItems: 'center'
                                    },
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        legend: {
                                            fontSize: '0.75em',
                                        }
                                    }
                                }}
                                endAdornment={
                                    clearable && hasValue && (
                                        <InputAdornment
                                            position="end"
                                            sx={{
                                                position: 'absolute',
                                                right: 28,
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                zIndex: 1,
                                            }}
                                        >
                                            <IconButton
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    field.onChange(null);
                                                }}
                                                size="small"
                                            >
                                                <CloseIcon sx={{ fontSize: '1.2rem' }} />
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }
                                {...others}
                            >
                                {options?.map((option) => (
                                    <MenuItem
                                        key={option?.value}
                                        value={option?.value}
                                        sx={{ whiteSpace: 'normal', maxWidth: maxWidth }}
                                    >
                                        <Grid container direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
                                            <Grid item sx={{ fontSize: isSmall ? '0.65rem' : 'inherit' }}>
                                                {option?.label}
                                            </Grid>

                                            {(option?.codigo === 'CIE10' || option?.codigo === 'CIE11') && (
                                                <Grid item>
                                                    <Label
                                                        sx={{ mr: 1.5 }}
                                                        variant="soft"
                                                        color={option?.codigo === 'CIE10' ? "error" : "success"}
                                                    >
                                                        {option?.codigo}
                                                    </Label>
                                                </Grid>
                                            )}
                                        </Grid>
                                    </MenuItem>
                                ))}
                            </Select>
                        </>
                    );
                }}
            />
            {bug && <FormHelperText error>{bug.message}</FormHelperText>}
        </FormControl>
    );
};

export default InputSelect;