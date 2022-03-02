import PropTypes from 'prop-types';
import {
    Checkbox,
    FormControlLabel
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

const InputCheck = ({ onChange, label, size }) => {
    const theme = useTheme();
    return (
        <>
            <FormControlLabel control={
                <Checkbox
                    onChange={onChange}
                    sx={{
                        color: theme.palette.error.main,
                        '&.Mui-checked': {
                            color: theme.palette.error.main
                        }
                    }}
                    sx={{ '& .MuiSvgIcon-root': { fontSize: size } }}
                />
            } label={label} />
        </>
    );

}

export default InputCheck;

InputCheck.propTypes = {
    onClick: PropTypes.func,
    size: PropTypes.string,
    label: PropTypes.string
};