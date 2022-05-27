import PropTypes from 'prop-types';
import {
    Checkbox,
    FormControlLabel
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

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
                            color: theme.palette.primary,
                            '&.Mui-checked': {
                                color: theme.palette.primary
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
    checked: PropTypes.bool,
    defaultValue: PropTypes.string,
    onClick: PropTypes.func,
    size: PropTypes.number,
    label: PropTypes.string
};