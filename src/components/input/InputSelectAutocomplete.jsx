import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useMediaQuery, useTheme } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

export default function InputSelectAutocomplete({
    name,
    label,
    defaultValue,
    placeholder,
    options,
    size,
    bug,
    maxWidth,
    ...other
}) {
    const { control, setValue } = useFormContext();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const finalSize = size || (matchesXS ? 'small' : 'medium');
    const isSmall = finalSize === 'small';

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue || null}
            render={({ field, fieldState: { error } }) => {
                const hasValue = field.value !== "" && field.value !== null && field.value !== undefined;
                const finalError = bug || error;

                return (
                    <Autocomplete
                        {...field}
                        id={`autocomplete-${name}`}
                        options={options || []}
                        size={finalSize}
                        getOptionLabel={(option) => option?.label || ""}
                        isOptionEqualToValue={(option, value) =>
                            value?.value !== undefined ? option.value === value.value : option.value === value
                        }
                        onChange={(_, newValue) => {
                            setValue(name, newValue, { shouldValidate: true });
                        }}
                        fullWidth
                        sx={{
                            ...(isSmall && {
                                '& .MuiInputBase-root': {
                                    fontSize: '0.75rem',
                                    minHeight: '40px',
                                    paddingTop: '0px !important',
                                    paddingBottom: '0px !important',
                                },
                                '& .MuiOutlinedInput-input': {
                                    padding: '8px 4px !important',
                                },
                                '& .MuiInputLabel-root': {
                                    fontSize: '0.85rem',
                                    '&:not(.MuiInputLabel-shrink)': {
                                        transform: 'translate(14px, 10px) scale(1)',
                                    },
                                    '&.MuiInputLabel-shrink': {
                                        transform: 'translate(14px, -9px) scale(0.75)',
                                    }
                                },
                                '& .MuiOutlinedInput-notchedOutline legend': {
                                    fontSize: '0.6rem',
                                }
                            }),
                            ...(!isSmall && {
                                '& .MuiInputBase-root': {
                                    fontSize: '0.78rem',
                                    minHeight: 'unset',
                                }
                            })
                        }}
                        renderOption={(props, option) => (
                            <li {...props} key={option.value} style={{ fontSize: isSmall ? '0.75rem' : '0.9rem' }}>
                                {option?.label}
                            </li>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={label}
                                placeholder={placeholder}
                                error={!!finalError}
                                helperText={finalError ? finalError?.message : ''}
                                InputLabelProps={{
                                    ...params.InputLabelProps,
                                    ...(hasValue && { shrink: true })
                                }}
                            />
                        )}
                        {...other}
                    />
                );
            }}
        />
    );
}

export function InputSelectAutocompleteControl({ label, options, onChange, value, ...other }) {
    return (
        <Autocomplete
            disablePortal
            fullWidth
            options={options}
            renderInput={(params) => <TextField {...params} label={label} />}
            onChange={onChange}
            value={value}
            {...other}
        />
    );
}