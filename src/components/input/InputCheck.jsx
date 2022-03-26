import PropTypes from 'prop-types';
import {
    Checkbox,
    FormControlLabel
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Controller } from 'react-hook-form';

const InputCheck = ({ onChange, checked, label, size }) => {
    const theme = useTheme();
    return (
        <>
            <FormControlLabel
                control={
                    <Checkbox
                        onChange={onChange}
                        checked={checked}
                        sx={{
                            color: theme.palette.error.main,
                            '&.Mui-checked': {
                                color: theme.palette.error.main
                            },
                            '& .MuiSvgIcon-root': { fontSize: size }
                        }}
                    />
                }
                label={label}
            />
        </>
    );

}

export default InputCheck;

InputCheck.propTypes = {
    name: PropTypes.string,
    checked: PropTypes.bool,
    defaultValue: PropTypes.string,
    onClick: PropTypes.func,
    size: PropTypes.string,
    label: PropTypes.string
};