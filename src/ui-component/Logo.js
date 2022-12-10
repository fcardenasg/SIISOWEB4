import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types'
import logoDark from 'assets/images/logo-dark.svg';
import LogoDrummondLTD from 'assets/img/LogoDrummondLTD.png';
import LogoDrummondEnergy from 'assets/img/LogoDrummondEnergy.png';

const Logo = ({ size = 300 }) => {
    const theme = useTheme();

    return (
        <img src={theme.palette.mode === 'dark' ? logoDark : LogoDrummondLTD} alt="Drummondltd" width={size} />
    );
};

export default Logo;

Logo.propTypes = {
    size: PropTypes.string,
}