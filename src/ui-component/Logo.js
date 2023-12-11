import PropTypes from 'prop-types'
import config from 'config';

const Logo = ({ size = 300 }) => {
    return (
        <img src={config.logotipo}
            alt={config.typeDashboard} width={size} />
    );
};

export default Logo;

Logo.propTypes = {
    size: PropTypes.string,
}