import PropTypes from 'prop-types'
import config from 'config';
import LogoEnergy from 'assets/logos/logo-energy-vert.webp';
import LogoNegative from 'assets/logos/logo-negative.webp';
import LogoVertical from 'assets/logos/logo-vertical.webp';

const Logo = ({ size = 300 }) => {
    return (
        <img src={config.logotipo} alt={config.typeDashboard} width={size} />
    );
};

export default Logo;

Logo.propTypes = {
    size: PropTypes.string,
}

export function LogoHome({ width = 180, type, className }) {
    let logoFinal;
    switch (type) {
        case 'LogoEnergy':
            logoFinal = LogoEnergy;
            break;
        case 'LogoNegative':
            logoFinal = LogoNegative;
            break;
        case 'LogoVertical':
            logoFinal = LogoVertical;
            break;
        default:
            logoFinal = LogoEnergy;
            break;
    }

    return (
        <img
            src={logoFinal}
            alt="Drummond Logo"
            style={{ width, height: 'auto', objectFit: 'contain' }}
            className={className}
        />
    );
}