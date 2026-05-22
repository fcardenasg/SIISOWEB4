import { Box, Checkbox, Chip, FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import { Controller } from "react-hook-form";

export default function InputMultiselectTwo({
    name,
    chip,
    label,
    options,
    checkbox,
    defaultValue = [],
    placeholder,
    helperText,
    showSelectAll = false,
    ...other
}) {
    const checkIsAllSelected = (currentValues) => {
        if (!options.length) return false;
        return options.every(opt => currentValues.includes(opt.value));
    };

    const renderValues = (selectedIds) => {
        const isAllSelected = checkIsAllSelected(selectedIds);
        if (isAllSelected && showSelectAll) {
            return chip ? <Chip size="small" label="TODOS" color="primary" /> : "TODOS";
        }

        const selectedItems = options.filter((item) => selectedIds.includes(item.value));

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
                const isAllSelected = checkIsAllSelected(value);

                const handleChange = (event) => {
                    const { value: newValue } = event.target;
                    if (newValue.includes("all_options_selected")) {
                        if (isAllSelected) {
                            field.onChange([]);
                        } else {
                            const allIds = options.map(opt => opt.value);
                            field.onChange(allIds);
                        }
                        return;
                    }

                    field.onChange(newValue);
                };

                return (
                    <FormControl fullWidth error={!!error} {...other}>
                        {label && <InputLabel id={name}> {label} </InputLabel>}

                        <Select
                            {...field}
                            value={value}
                            onChange={handleChange}
                            multiple
                            displayEmpty={!!placeholder}
                            id={`multiple-${name}`}
                            labelId={name}
                            label={label}
                            renderValue={renderValues}
                        >
                            {showSelectAll && (
                                <MenuItem value="all_options_selected">
                                    {checkbox && (
                                        <Checkbox
                                            size="small"
                                            checked={isAllSelected}
                                        />
                                    )}
                                    <strong>TODOS</strong>
                                </MenuItem>
                            )}

                            {options.map(option => (
                                <MenuItem
                                    key={option.value}
                                    value={option.value}
                                    disabled={isAllSelected && showSelectAll}
                                >
                                    {checkbox && (
                                        <Checkbox
                                            size="small"
                                            disableRipple
                                            checked={value.includes(option.value)}
                                        />
                                    )}
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>

                        {(!!error || helperText) && (
                            <FormHelperText error={!!error}>
                                {error ? error?.message : helperText}
                            </FormHelperText>
                        )}
                    </FormControl>
                );
            }}
        />
    );
}