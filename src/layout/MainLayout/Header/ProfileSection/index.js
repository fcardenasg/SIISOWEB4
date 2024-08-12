import { useState, useRef, useEffect, Fragment } from 'react';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Box,
    Chip,
    ClickAwayListener,
    Divider,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    Popper,
    Stack,
    Typography
} from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';
import useAuth from 'hooks/useAuth';

// assets
import { IconLogout, IconSettings, IconHome } from '@tabler/icons';
import ControlModal from 'components/controllers/ControlModal';
import ChangeSede from './ChangeSede';
import { ColorDrummondltd } from 'themes/colors';

// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = () => {
    const theme = useTheme();
    const customization = useSelector((state) => state.customization);
    const navigate = useNavigate();

    const [selectedIndex, setSelectedIndex] = useState(-1);
    const { logout, user } = useAuth();
    const [open, setOpen] = useState(false);
    const [openModalSede, setOpenModalSede] = useState(false);


    const anchorRef = useRef(null);
    const handleLogout = async () => {
        try {
            await logout();
        } catch (err) { }
    };

    const handleLogoutHome = async () => {
        try {
            navigate("/");
            await logout();
        } catch (err) { }
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const handleOpenModal = () => {
        setOpenModalSede(true);
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <Fragment>
            <ControlModal
                title="Cambiar De Sede De Atención"
                open={openModalSede}
                onClose={() => setOpenModalSede(false)}
                maxWidth="xs"
            >
                <ChangeSede />
            </ControlModal>

            <Chip
                sx={{
                    height: '48px',
                    alignItems: 'center',
                    borderRadius: '27px',
                    transition: 'all .2s ease-in-out',
                    borderColor: theme.palette.error.light,
                    backgroundColor: theme.palette.error.light,
                    '&[aria-controls="menu-list-grow"], &:hover': {
                        borderColor: theme.palette.grey[100],
                        background: `${theme.palette.grey[100]}!important`,
                        color: theme.palette.grey[100],
                        '& svg': {
                            stroke: theme.palette.error.main
                        }
                    },
                    '& .MuiChip-label': {
                        lineHeight: 0
                    }
                }}
                icon={
                    <Avatar
                        sx={{
                            ...theme.typography.mediumAvatar,
                            margin: '8px 0 8px 8px !important',
                            cursor: 'pointer',
                            bgcolor: theme.palette.grey[100]
                        }}
                        ref={anchorRef}
                        aria-haspopup="true"
                    >
                        <Typography variant="h4" sx={{ color: ColorDrummondltd.RedDrummond }} >{user?.nameuser.charAt(0)}</Typography>
                    </Avatar>
                }
                variant="outlined"
                label={<IconSettings stroke={1.5} size="1.5rem" color={ColorDrummondltd.RedDrummond} />}
                ref={anchorRef}
                onClick={handleToggle}
            />

            <Popper
                placement="bottom-end"
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 14]
                            }
                        }
                    ]
                }}
            >
                {({ TransitionProps }) => (
                    <Transitions in={open} {...TransitionProps}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                                    <Box sx={{ p: 2 }}>
                                        <Typography component="span" variant="h4" sx={{ fontWeight: 400 }}>Bienvenido {user?.nameuser}</Typography>
                                        <Typography sx={{ mt: 2 }} variant="subtitle2">Rol: {user?.namerol}</Typography>
                                        <Typography variant="subtitle2">Sede: {user?.namesede}</Typography>
                                        <Typography variant="subtitle2">Area: {user?.namearea}</Typography>
                                    </Box>

                                    <Divider />

                                    <List
                                        component="nav"
                                        sx={{
                                            pl: 1,
                                            width: '100%',
                                            maxWidth: 350,
                                            minWidth: 300,
                                            backgroundColor: theme.palette.background.paper,
                                            borderRadius: '10px',
                                            [theme.breakpoints.down('md')]: {
                                                minWidth: '100%'
                                            },
                                            '& .MuiListItemButton-root': {
                                                mt: 0.5
                                            }
                                        }}
                                    >
                                        <ListItemButton
                                            sx={{ borderRadius: `${customization.borderRadius}px` }}
                                            selected={selectedIndex === 0}
                                            onClick={handleOpenModal}
                                        >
                                            <ListItemIcon>
                                                <IconSettings stroke={1.5} size="1.3rem" />
                                            </ListItemIcon>
                                            <ListItemText primary={<Typography variant="body2">Cambiar de Sede</Typography>} />
                                        </ListItemButton>

                                        <ListItemButton
                                            sx={{ borderRadius: `${customization.borderRadius}px` }}
                                            selected={selectedIndex === 1}
                                            onClick={handleLogout}
                                        >
                                            <ListItemIcon>
                                                <IconLogout stroke={1.5} size="1.3rem" />
                                            </ListItemIcon>
                                            <ListItemText primary={<Typography variant="body2">Cerrar Sesión</Typography>} />
                                        </ListItemButton>

                                        <ListItemButton
                                            sx={{ borderRadius: `${customization.borderRadius}px` }}
                                            selected={selectedIndex === 2}
                                            onClick={handleLogoutHome}
                                        >
                                            <ListItemIcon>
                                                <IconHome stroke={1.5} size="1.3rem" />
                                            </ListItemIcon>
                                            <ListItemText primary={<Typography variant="body2">Inicio Portal</Typography>} />
                                        </ListItemButton>

                                    </List>
                                </MainCard>
                            </ClickAwayListener>
                        </Paper>
                    </Transitions>
                )}
            </Popper>
        </Fragment>
    );
};

export default ProfileSection;
