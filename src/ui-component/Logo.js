import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types'
import LogoDrummondLTD from 'assets/img/LogoDrummondLTD.png';
import LogoDrummondEnergy from 'assets/img/LogoDrummondEnergy.png';
import config from 'config';

const Logo = ({ size = 300 }) => {
    const theme = useTheme();

    return (
        <img src={config.typeDashboard === 'ltd' ? LogoDrummondLTD : LogoDrummondEnergy}
            alt={config.typeDashboard === 'ltd' ? 'DrummondLTD' : 'DrummondEnergy'} width={size} />
    );
};

export default Logo;

Logo.propTypes = {
    size: PropTypes.string,
}