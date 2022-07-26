import PropTypes from 'prop-types';
import { Switch } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';

const InputSwitch = ({ label, onChange, checked }) => {
    const theme = useTheme();
    return (
        <>
            <FormControlLabel control={
                <Switch
                    onChange={onChange}
                    checked={checked}
                    sx={{
                        color: theme.palette.error.main,
                        '& .Mui-checked': { color: `${theme.palette.error.main} !important` },
                        '& .Mui-checked+.MuiSwitch-track': { bgcolor: `${theme.palette.error.light} !important` }
                    }}
                />
            } label={label} />
        </>
    );
}

export default InputSwitch;

InputSwitch.propTypes = {
    label: PropTypes.string,
    checked: PropTypes.string,
    onChange: PropTypes.func
};