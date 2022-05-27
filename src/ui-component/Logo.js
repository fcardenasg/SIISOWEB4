import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types'
import logoDark from 'assets/images/logo-dark.svg';
import LogoD from 'assets/images/LogoD.svg';

const Logo = ({ size = 70 }) => {
    const theme = useTheme();

    return (
        <img src={theme.palette.mode === 'dark' ? logoDark : LogoD} alt="Drummondltd" width={size} />
    );
};

export default Logo;

Logo.propTypes = {
    size: PropTypes.string,
}