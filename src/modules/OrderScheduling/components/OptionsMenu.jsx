import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { Menu, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Iconify from 'components/iconify/iconify';

const OptionsMenu = ({ setAnchorEl, anchorEl, onClickPhone, onClickWhatsApp, onClickMessage, onClickMail, onClickPrint }) => {
    const theme = useTheme();

    return (
        <>
            <MoreVertOutlinedIcon
                fontSize="small"
                sx={{ cursor: 'pointer' }}
                aria-controls="menu-user-details-card"
                aria-haspopup="true"
                onClick={(event) => setAnchorEl(event?.currentTarget)}
            />

            {anchorEl && (
                <Menu
                    id="menu-user-details-card"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                    variant="selectedMenu"
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                    }}
                    transformOrigin={{
                        vertical: 'right',
                        horizontal: 'right'
                    }}
                >
                    <MenuItem onClick={onClickMail}>
                        <Iconify sx={{ mr: 1.5 }} icon="fluent:mail-24-filled" />
                        Correo
                    </MenuItem>
                    <MenuItem onClick={onClickPhone}>
                        <Iconify sx={{ mr: 1.5 }} icon="solar:phone-bold" />
                        Teléfono
                    </MenuItem>
                    <MenuItem onClick={onClickMessage}>
                        <Iconify sx={{ mr: 1.5 }} icon="ic:baseline-whatsapp" />
                        Mensaje
                    </MenuItem>
                    <MenuItem onClick={onClickWhatsApp}>
                        <Iconify sx={{ mr: 1.5 }} icon="hugeicons:message-02" />
                        WhatsApp
                    </MenuItem>
                    <MenuItem onClick={onClickPrint}>
                        <Iconify sx={{ mr: 1.5 }} icon="solar:printer-outline" />
                        Imprimir
                    </MenuItem>
                </Menu>
            )}
        </>
    );
};
export default OptionsMenu;
