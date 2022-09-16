import { useState, useRef, useEffect, Fragment } from 'react';

import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Box,
    Chip,
    ClickAwayListener,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    Popper,
    Stack,
    Typography
} from '@mui/material';

import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';
import useAuth from 'hooks/useAuth';
import User1 from 'assets/images/users/user-round.svg';

// assets
import { IconLogout, IconSettings } from '@tabler/icons';

const ProfileSection = () => {
    const theme = useTheme();
    const customization = useSelector((state) => state.customization);
    const navigate = useNavigate();

    const { logout, user } = useAuth();
    const [open, setOpen] = useState(false);


    const anchorRef = useRef(null);
    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login");
        } catch (err) {
            console.error(err);
        }
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
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
            <Chip
                sx={{
                    height: '48px',
                    alignItems: 'center',
                    borderRadius: '27px',
                    transition: 'all .2s ease-in-out',
                    borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light,
                    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light,
                    '&[aria-controls="menu-list-grow"], &:hover': {
                        borderColor: theme.palette.primary.main,
                        background: `${theme.palette.primary.main}!important`,
                        color: theme.palette.primary.light,
                        '& svg': {
                            stroke: theme.palette.primary.light
                        }
                    },
                    '& .MuiChip-label': {
                        lineHeight: 0
                    }
                }}
                icon={
                    <Avatar
                        src={User1}
                        sx={{
                            ...theme.typography.mediumAvatar,
                            margin: '8px 0 8px 8px !important',
                            cursor: 'pointer'
                        }}
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        color="inherit"
                    />
                }
                label={<IconSettings stroke={1.5} size="1.5rem" color={theme.palette.primary.main} />}
                variant="outlined"
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                color="primary"
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

                                        <Stack>
                                            <Stack direction="row" spacing={0.5} alignItems="center">
                                                <Typography variant="h4">Buenos Días,</Typography>
                                                <Typography component="span" variant="h4" sx={{ fontWeight: 400 }}>
                                                    {user?.name}
                                                </Typography>
                                            </Stack>
                                            <Typography variant="subtitle2">Rol del Usuario</Typography>
                                        </Stack>

                                    </Box>


                                    <List
                                        sx={{
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
                                            onClick={handleLogout}
                                        >
                                            <ListItemIcon>
                                                <IconLogout stroke={1.5} size="1.3rem" />
                                            </ListItemIcon>
                                            <ListItemText primary={<Typography variant="body2">Cerrar Sesión</Typography>} />
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
