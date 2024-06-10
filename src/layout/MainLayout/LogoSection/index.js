import { Link } from 'react-router-dom';
import { ButtonBase } from '@mui/material';
import Logo from 'ui-component/Logo';

const LogoSection = () => {
    const menu = window.localStorage.getItem('systemMenu');
    const itemsMenu = JSON.parse(menu);

    return (
        <ButtonBase disableRipple component={Link} to={itemsMenu[0].children[0].url}>
            <Logo size={200} />
        </ButtonBase>
    )
};

export default LogoSection;
