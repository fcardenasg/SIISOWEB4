import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';

export default function InputSelectAutocomplete({
    name,
    label,
    defaultValue,
    type,
    helperText,
    placeholder,
    options,
    ...other
}) {
    const { control, setValue } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({ field, fieldState: { error } }) => (
                <Autocomplete
                    {...field}
                    id={`autocomplete-${name}`}
                    options={options}
                    getOptionLabel={(option) => option?.label}
                    isOptionEqualToValue={(option, value) => option.value === value.value}
                    onChange={(event, newValue) => {
                        setValue(name, newValue, { shouldValidate: true });
                    }}
                    fullWidth
                    renderOption={(props, option) => (
                        <li {...props} key={option.value}>
                            {option?.label}
                        </li>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={label}
                            placeholder={placeholder}
                            error={!!error}
                            helperText={error ? error?.message : helperText}
                            inputProps={{
                                ...params.inputProps
                            }}
                        />
                    )}
                    {...other}
                />
            )}
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