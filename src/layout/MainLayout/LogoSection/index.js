import { Link } from 'react-router-dom';
import { ButtonBase } from '@mui/material';
import LogoWhite from 'assets/img/LogoWhite.png'

const LogoSection = () => {
    const menu = window.localStorage.getItem('systemMenu');
    const itemsMenu = JSON.parse(menu);

    return (
        <ButtonBase disableRipple component={Link} to={itemsMenu[0]?.children[0]?.url}>
            <img src={LogoWhite} alt="Logo drummondltd blanco" width={175} />
        </ButtonBase>
    )
};

export default LogoSection;
