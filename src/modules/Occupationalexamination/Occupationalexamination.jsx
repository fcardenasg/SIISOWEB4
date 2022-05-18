import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';
import {
    Box, Tab, Tabs,
    Grid,
    TextField,
    useMediaQuery,
    Typography,
    Avatar
} from '@mui/material';

import PersonalData from './PersonalData';
import WorkHistory from './WorkHistory';
import Emo from './Emo';

import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import LibraryBooksTwoToneIcon from '@mui/icons-material/LibraryBooksTwoTone';

import { GetByIdEmployee } from 'api/clients/EmployeeClient';

// Terceros
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// Import del Proyectot
import { FormatDate } from 'components/helpers/Format';
import User from 'assets/img/user.png'
import { GetAllCatalog, GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import { GetAllCompany } from 'api/clients/CompanyClient';
import InputSelect from 'components/input/InputSelect';
import InputDatePick from 'components/input/InputDatePick';
import { CodCatalogo } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { PostEmployee } from 'formatdata/EmployeeForm';
import SelectOnChange from 'components/input/SelectOnChange';
import SubCard from 'ui-component/cards/SubCard';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = 'es-ES';


function TabPanel({ children, value, index, ...other }) {
    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

const tabsOption = [
    {
        label: 'Datos Laborales',
        icon: <AccountCircleTwoToneIcon sx={{ fontSize: '1.3rem' }} />
    },
    {
        label: 'Historia Laboral',
        icon: <DescriptionTwoToneIcon sx={{ fontSize: '1.3rem' }} />
    },
    {
        label: 'Historia Ocupacional',
        icon: <LibraryBooksTwoToneIcon sx={{ fontSize: '1.3rem' }} />
    },



];

const Occupationalexamination = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [value, setValue] = useState(0);

    const [fecha, setFecha] = useState(new Date());

    const [lsEmployee, setLsEmployee] = useState([]);
    const [document, setDocument] = useState('');
    const [catalog, setCatalog] = useState([]);
    const [company, setCompany] = useState([]);
    const [lsAtencionEMO, setLsAtencionEMO] = useState([]);
    const [lsDepartamento, setDepartamento] = useState([]);
    const [lsCodigoFilter, setCodigoFilter] = useState([]);


    const [isListening, setIsListening] = useState(false)
    const [note, setNote] = useState(null)

    const handleListen = () => {
        if (isListening) {
            mic.start()
            mic.onend = () => {
                console.log('continue..')
                mic.start()
            }
        } else {
            mic.stop()
            mic.onend = () => {
                console.log('Stopped Mic on Click')
            }
        }
        mic.onstart = () => {
            console.log('Mics on')
        }

        mic.onresult = event => {
            const transcript = Array.from(event.results)
                .map(result => result[0])
                .map(result => result.transcript)
                .join('')
            console.log(transcript)
            setNote(transcript)
            mic.onerror = event => {
                console.log(event.error)
            }
        }
    }

    const handleDocumento = async (event) => {
        try {
            setDocument(event.target.value);
            const lsServer = await GetByIdEmployee(event.target.value);
            if (lsServer.status === 200) {
                setLsEmployee(lsServer.data);
            }
        } catch (error) {
            console.log(error);
        }
    }


    const methods = useForm();
    /* { resolver: yupResolver(validationSchema) } */

    const { handleSubmit, errors, reset } = methods;


    async function GetAll() {
        try {
            const lsServerCatalog = await GetAllCatalog(0, 0);
            var resultCatalogo = lsServerCatalog.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setCatalog(resultCatalogo);

            const lsServerDepartamento = await GetAllByTipoCatalogo(0, 0, 1077);
            var resultDepartamento = lsServerDepartamento.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setDepartamento(resultDepartamento);
            setCodigoFilter(lsServerDepartamento.data.entities);

            const lsServerAtencionEMO = await GetAllByTipoCatalogo(0, 0, CodCatalogo.AtencionEMO);
            var resultAtencionEMO = lsServerAtencionEMO.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsAtencionEMO(resultAtencionEMO);

            const lsServerCompany = await GetAllCompany(0, 0);
            var resultCompany = lsServerCompany.data.entities.map((item) => ({
                value: item.codigo,
                label: item.descripcionSpa
            }));
            setCompany(resultCompany);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        GetAll();
        handleListen();
    }, [isListening])

    const handleClick = async (datos) => {
        try {

            /* if (Object.keys(datos.length !== 0)) {
                const result = await InsertEmployee(datos);
                if (result.status === 200) {
                    dispatch({
                        type: SNACKBAR_OPEN,
                        open: true,
                        message: `${Message.Guardar}`,
                        variant: 'alert',
                        alertSeverity: 'success',
                        close: false,
                        transition: 'SlideUp'
                    })
                    reset();
                    CleanCombo();
                }
            } */
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <MainCard>
            <form onSubmit={handleSubmit(handleClick)}>
                <SubCard darkTitle title={<><Typography variant="h4">DATOS DEL PACIENTE</Typography></>}>
                    <Grid container justifyContent="left" alignItems="center" xs={12} spacing={2}>
                        <Grid item xs={5}>
                            <Grid container justifyContent="center" alignItems="center" spacing={2} xs={12}>
                                <Grid item xs={4}>
                                    <Avatar sx={{ width: 100, height: 100 }} src={lsEmployee.imagenUrl != null ? lsEmployee.imagenUrl : User} />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField value={document} onChange={handleDocumento} fullWidth id="standard-basic" label="Documento" variant="standard" />
                                </Grid>
                            </Grid>
                        </Grid>
                        {lsEmployee.length != 0 ?
                            <Grid item xs={7}>
                                <Typography variant="h2" component="div">
                                    {lsEmployee.nombres}
                                </Typography>
                                <Grid container spacing={1} direction="row" justifyContent="left" alignItems="center">
                                    <Grid item>
                                        <Typography variant="h6">{lsEmployee.genero}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="h6">{FormatDate(lsEmployee.fechaNaci)}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid> : <Grid item xs={7}></Grid>}
                    </Grid>
                </SubCard>
                <Grid sx={{ pb: 2 }} />

                <SubCard darkTitle title={<Typography variant="h3">REGISTRAR LA  ATENCIÓN</Typography>}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <InputDatePick
                                label="Fecha"
                                value={fecha}
                                onChange={(e) => setFecha(e)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="atencion"
                                    label="Atención"
                                    defaultValue=""
                                    options={lsAtencionEMO}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>
                    </Grid>
                </SubCard>
                <Grid sx={{ pb: 2 }} />

                <Grid item xs={12} justifyContent="center" alignItems="center">
                    <Tabs
                        value={value}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={(event, newValue) => setValue(newValue)}
                        aria-label="simple tabs example"
                        variant="scrollable"
                        sx={{
                            mb: 3,
                            '& a': {
                                minHeight: 'auto',
                                minWidth: 10,
                                py: 1.5,
                                px: 1,
                                mr: 2.25,
                                color: theme.palette.grey[600],
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center'
                            },
                            '& a.Mui-selected': {
                                color: theme.palette.primary.main
                            },
                            '& .MuiTabs-indicator': {
                                bottom: 2
                            },
                            '& a > svg': {
                                marginBottom: '0px !important',
                                mr: 1.25
                            }
                        }}
                    >
                        {tabsOption.map((tab, index) => (
                            <Tab key={index} component={Link} to="#" icon={tab.icon} label={tab.label} {...a11yProps(index)} />
                        ))}
                    </Tabs>

                    <TabPanel value={value} index={0}>
                        <PersonalData lsEmployee={lsEmployee} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <WorkHistory />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <Emo />
                    </TabPanel>
                </Grid>
            </form>
        </MainCard>
    );
};

export default Occupationalexamination;
