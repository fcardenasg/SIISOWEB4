import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import LockOpenIcon from '@mui/icons-material/LockOpen';
import PreviewIcon from '@mui/icons-material/Preview';

import { Typography } from '@mui/material';


const ITEM_HEIGHT = 48;

const MenuOptions = ({ setAnchorEl, anchorEl, onClickEnable, onClickTurno}) => {
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
            >
                <MenuItem onClick={onClickTurno} disableRipple>
                    <PreviewIcon /> <Typography sx={{ pl: 2 }} variant='h5'>Turno</Typography>
                </MenuItem>

                <MenuItem onClick={onClickEnable} disableRipple>
                    <LockOpenIcon /> <Typography sx={{ pl: 2 }} variant='h5'>Habilitar</Typography>
                </MenuItem>
            </Menu>
        </div>
    );
}

export default MenuOptions;