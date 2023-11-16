import PropTypes from 'prop-types';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default function InputMultiSelectCheck({ onChange, value, label, options, size, ...other }) {

    return (
        <>
            <FormControl fullWidth>
                <InputLabel id="demo-multiple-checkbox-label">{label}</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={value}
                    fullWidth
                    onChange={onChange}
                    input={<OutlinedInput label={label} />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                    size={size}
                    {...other}
                >
                    {options?.map((name) => (
                        <MenuItem key={name.label} value={name.label}>
                            <Checkbox checked={value.indexOf(name.label) > -1} />
                            <ListItemText primary={name.label} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    );
}

InputMultiSelectCheck.propTypes = {
    bug: PropTypes.object,
    onChange: PropTypes.func,
    size: PropTypes.string,
    value: PropTypes.any,
    label: PropTypes.string,
    defaultValue: PropTypes.any,
    name: PropTypes.string,
    options: PropTypes.any,
};