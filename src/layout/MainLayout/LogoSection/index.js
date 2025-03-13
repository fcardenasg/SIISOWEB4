import { ButtonBase } from '@mui/material';
import config from 'config';
import { Link } from 'react-router-dom';

const LogoSection = () => {
    const menu = window.localStorage.getItem('systemMenu');
    const itemsMenu = JSON.parse(menu);

    return (
        <ButtonBase disableRipple component={Link} to={itemsMenu[0]?.children[0]?.url}>
            <img src={config.logotipoblanco} alt="Logo drummondltd blanco" width={175} />
        </ButtonBase>
    )
};

export default LogoSection;
