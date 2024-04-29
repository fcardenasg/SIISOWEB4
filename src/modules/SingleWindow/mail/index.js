import { Fragment, useEffect, useState } from 'react';

import { styled, useTheme } from '@mui/material/styles';
import { Box, Button, Grid, Typography, useMediaQuery } from '@mui/material';

import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import MailDetails from './MailDetails';
import MailList from './MailList';
import { openDrawer } from 'store/slices/menu';
import { appDrawerWidth as drawerWidth, gridSpacing } from 'store/constant';
import { useDispatch, useSelector } from 'store';
import { getMails, filterMails, setImportant, setStarred, setRead } from 'store/slices/mail';

import { ConsultMail } from 'api/clients/MailClient';
import AnimateButton from 'ui-component/extended/AnimateButton';
import AddSingleWindow from '../Form/AddSingleWindow';
import SubCard from 'ui-component/cards/SubCard';
import { TitleButton } from 'components/helpers/Enums';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    width: 'calc(100% - 320px)',
    flexGrow: 1,
    paddingLeft: open ? theme.spacing(3) : 0,
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.shorter
    }),
    marginLeft: `-${drawerWidth}px`,
    [theme.breakpoints.down('xl')]: {
        paddingLeft: 0,
        marginLeft: 0
    },
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.shorter
        }),
        marginLeft: 0
    })
}));

const MailPage = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('xl'));
    const dispatch = useDispatch();

    const [userEdit, setUserEdit] = useState(false);
    const [emailDetails, setEmailDetailsValue] = useState(false);
    const [selectedMail, setSelectedMail] = useState(null);
    const [search, setSearch] = useState('');

    const handleUserChange = async (data) => {
        if (data) {
            await dispatch(setRead(data.id));
            await dispatch(getMails());
        }
        setSelectedMail(data);
        setEmailDetailsValue((prev) => !prev);
    };

    const [openMailSidebar, setOpenMailSidebar] = useState(true);
    const handleDrawerOpen = () => {
        setOpenMailSidebar((prevState) => !prevState);
    };

    useEffect(() => {
        if (matchDownSM) {
            setOpenMailSidebar(false);
        } else {
            setOpenMailSidebar(true);
        }
    }, [matchDownSM]);

    const [data, setData] = useState([]);
    const [unreadCounts, setUnreadCounts] = useState();
    const mailState = useSelector((state) => state.mail);

    useEffect(() => {
        async function getAllMail() {
            try {
                /* const lsServer = await ConsultMail();
                if (lsServer.status === 200) {
                    setData(lsServer?.data);
                } */
            } catch (error) { }
        }

        getAllMail();
    }, [mailState]);

    useEffect(() => {
        dispatch(openDrawer(false));
        dispatch(getMails());
    }, []);

    const [filter, setFilter] = useState('all');
    const handleFilter = async (string) => {
        setEmailDetailsValue(false);
        setFilter(string);
        await dispatch(filterMails(string));
    };

    const handleImportantChange = async (event, dataImportant) => {
        if (dataImportant) {
            await dispatch(setImportant(dataImportant.id));
            handleFilter(filter);
        }
    };

    const handleStarredChange = async (event, dataStarred) => {
        if (dataStarred) {
            await dispatch(setStarred(dataStarred.id));
            handleFilter(filter);
        }
    };

    const handleSearch = (event) => {
        const newString = event.target.value;
        setSearch(newString);

        if (newString) {
            const newRows = data.filter((row) => {
                let matches = true;

                const properties = ['name'];
                let containsQuery = false;

                properties.forEach((property) => {
                    if (row.profile[property].toString().toLowerCase().includes(newString.toString().toLowerCase())) {
                        containsQuery = true;
                    }
                });

                if (!containsQuery) {
                    matches = false;
                }
                return matches;
            });
            setData(newRows);
        } else {
            handleFilter(filter);
        }
    };

    return (
        <Fragment>
            <SubCard
                title={<Typography variant="h3">Ventanilla Única Digital</Typography>}
                secondary={
                    <Fragment>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <AnimateButton>
                                    <Button
                                        variant="contained"
                                        startIcon={<AddCircleOutlineOutlinedIcon />}
                                        sx={{ px: 2.75, py: 1.5 }}
                                        onClick={() => setUserEdit(!userEdit)}
                                        size="small"
                                    >
                                        Indexar
                                    </Button>
                                </AnimateButton>
                            </Grid>

                            <Grid item xs={6}>
                                <AnimateButton>
                                    <Button
                                        variant="contained"
                                        startIcon={<ArrowBackIosIcon />}
                                        sx={{ px: 2.75, py: 1.5 }}
                                        onClick={() => navigate("/single-window/view")}
                                        size="small"
                                    >
                                        {TitleButton.Cancelar}
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </Fragment>
                }
            >
                <Grid container spacing={gridSpacing}>
                    <Grid item xs zeroMinWidth sx={{ display: userEdit ? { xs: 'none', md: 'block' } : 'block' }}>
                        <Grid container alignItems="center" spacing={gridSpacing}>
                            <Box sx={{ display: 'flex' }}>

                                <Main theme={theme} open={openMailSidebar}>
                                    <Grid container spacing={gridSpacing}>
                                        <Grid item xs={12}>
                                            {emailDetails ? (
                                                <MailDetails
                                                    data={selectedMail}
                                                    handleUserDetails={(e, d) => handleUserChange(d)}
                                                    handleImportantChange={handleImportantChange}
                                                    handleStarredChange={handleStarredChange}
                                                />
                                            ) : (
                                                <MailList
                                                    handleUserDetails={(e, d) => handleUserChange(d)}
                                                    handleDrawerOpen={handleDrawerOpen}
                                                    handleImportantChange={handleImportantChange}
                                                    handleStarredChange={handleStarredChange}
                                                    data={data}
                                                    search={search}
                                                    handleSearch={handleSearch}
                                                />
                                            )}
                                        </Grid>
                                    </Grid>
                                </Main>
                            </Box>
                        </Grid>
                    </Grid>

                    {userEdit && (
                        <Grid item sx={{ width: 550, margin: { xs: '0 auto' } }}>
                            <AddSingleWindow onCancel={() => setUserEdit(false)} />
                        </Grid>
                    )}
                </Grid>
            </SubCard>
        </Fragment>
    );
};

export default MailPage;
