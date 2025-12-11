import { Box, Checkbox, Chip, FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import { Controller } from "react-hook-form";

export default function InputMultiselectTwo({ name, chip, label, options, checkbox, defaultValue = [], placeholder, helperText, ...other }) {
    const renderValues = (selectedIds) => {
        const selectedItems = Array.isArray(selectedIds)
            ? options.filter((item) => selectedIds.includes(item.value))
            : [];

        if (!selectedItems.length && placeholder) {
            return <Box sx={{ color: 'text.disabled' }}>{placeholder}</Box>;
        }

        if (chip) {
            return (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selectedItems.map((item) => (
                        <Chip key={item.value} size="small" label={item.label} />
                    ))}
                </Box>
            );
        }

        return selectedItems.map((item) => item.label).join(', ');
    };

    return (
        <Controller
            name={name}
            defaultValue={defaultValue || []}
            render={({ field, fieldState: { error } }) => {
                const value = Array.isArray(field.value) ? field.value : [];

                return (
                    <FormControl fullWidth error={!!error} {...other}>
                        {label && <InputLabel id={name}> {label} </InputLabel>}

                        <Select
                            {...field}
                            value={value}
                            multiple
                            displayEmpty={!!placeholder}
                            id={`multiple-${name}`}
                            labelId={name}
                            label={label}
                            renderValue={renderValues}
                        >
                            {options.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                    {/* Checkbox sincronizado con el estado de selección */}
                                    {checkbox && (
                                        <Checkbox
                                            size="small"
                                            disableRipple
                                            checked={value.includes(option.value)} // Verifica si el valor está seleccionado
                                        />
                                    )}
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>

                        {(!!error || helperText) && (
                            <FormHelperText error={!!error}>{error ? error?.message : helperText}</FormHelperText>
                        )}
                    </FormControl>
                );
            }}
        />
    );
}