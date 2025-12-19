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
    IconButton,
    InputAdornment,
    Tooltip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Label from 'components/label';

const InputSelect = ({ bug, options, size, defaultValue, label, name, maxWidth, clearable = false, ...others }) => {
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <>
            <Controller
                name={name}
                defaultValue={defaultValue}
                render={({ field }) => (
                    <FormControl fullWidth error={!!bug} required={!!bug}>
                        <InputLabel htmlFor={`select-label-${name}`} id={`select-label-${name}`} sx={{ fontSize: 14, whiteSpace: 'normal', maxWidth: maxWidth }}>
                            {label}
                        </InputLabel>

                        <Select
                            {...field}
                            labelId={`select-label-${name}`}
                            id={`select-${name}`}
                            label={label}
                            fullWidth
                            size={matchesXS ? 'small' : 'medium'}
                            sx={{
                                '& .MuiSelect-select': {
                                    fontSize: size === 'small' && '0.65rem',
                                    pr: clearable && field.value ? '32px' : undefined,
                                },
                            }}
                            endAdornment={
                                clearable && field.value ? (
                                    <Tooltip placement="top" title="Limpiar" disableInteractive>
                                        <InputAdornment position="end" sx={{
                                            position: 'absolute',
                                            right: 9,
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            zIndex: 1,
                                            mr: 2.5
                                        }}>
                                            <IconButton
                                                aria-label="clear selection"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    field.onChange(null);
                                                }}
                                                edge="end"
                                                size="small"
                                            >
                                                <CloseIcon fontSize="small" />
                                            </IconButton>
                                        </InputAdornment>
                                    </Tooltip>
                                ) : null
                            }
                            {...others}
                        >
                            {options?.map((option) => (
                                <MenuItem key={option?.value} value={option?.value} sx={{ whiteSpace: 'normal', maxWidth: maxWidth }}>
                                    <Grid container direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
                                        <Grid item sx={{ fontSize: size === 'small' && '0.65rem' }}>
                                            {option?.label}
                                        </Grid>

                                        {(option?.codigo === 'CIE10' || option?.codigo === 'CIE11') &&
                                            <Grid item>
                                                <Label
                                                    sx={{ mr: 1.5 }}
                                                    variant="soft"
                                                    color={option?.codigo === 'CIE10' ? "error" : "success"}
                                                >
                                                    {option?.codigo}
                                                </Label>
                                            </Grid>
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