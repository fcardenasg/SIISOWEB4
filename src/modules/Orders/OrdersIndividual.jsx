import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';
import {
    Box, Tab, Tabs,
    Grid, Button,
    TextField,
    useMediaQuery,
    Typography,
    Avatar
} from '@mui/material';

import PersonalData from './PersonalData';

import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import LibraryBooksTwoToneIcon from '@mui/icons-material/LibraryBooksTwoTone';

import { GetByIdEmployee } from 'api/clients/EmployeeClient';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { TitleButton } from 'components/helpers/Enums';
import { GetEdad } from 'components/helpers/Format';
import useAuth from 'hooks/useAuth';
import User from 'assets/img/user.png'
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import SelectOnChange from 'components/input/SelectOnChange';
import InputDatePicker from 'components/input/InputDatePicker';
import { CodCatalogo } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import SubCard from 'ui-component/cards/SubCard';
import GenerateOrder from './GenerateOrder';

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
        label: 'Generar Orden',
        icon: <DescriptionTwoToneIcon sx={{ fontSize: '1.3rem' }} />
    }
];

const OrdersIndividual = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [value, setValue] = useState(0);

    const [documento, setDocumento] = useState('');
    const [atencion, setAtencion] = useState('');
    const [lsAtencionEMO, setLsAtencionEMO] = useState([]);
    const [lsEmployee, setLsEmployee] = useState([]);


    const handleDocumento = async (event) => {
        try {
            setDocumento(event.target.value);
            const lsServerDataEmployee = await GetByIdEmployee(event.target.value);
            if (lsServerDataEmployee.status === 200)
                setLsEmployee(lsServerDataEmployee.data);
        } catch (error) {
            setLsEmployee([]);
            console.log(error);
        }
    }

    const methods = useForm();
    const { handleSubmit, errors, reset } = methods;
    /* { resolver: yupResolver(validationSchema) } */

    useEffect(() => {
        async function GetAll() {
            try {
                const lsServerAtencionEMO = await GetAllByTipoCatalogo(0, 0, CodCatalogo.AtencionEMO);
                var resultAtencionEMO = lsServerAtencionEMO.data.entities.map((item) => ({
                    value: item.idCatalogo,
                    label: item.nombre
                }));
                setLsAtencionEMO(resultAtencionEMO);
            } catch (error) {
                console.log(error);
            }
        }

        GetAll();
    }, [])

    const handleClick = (datos) => {
        try {
            console.log(datos);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <MainCard>
            <SubCard darkTitle title={<Typography variant="h4">DATOS DEL PACIENTE</Typography>}>
                <Grid container justifyContent="left" alignItems="center" spacing={2}>
                    <Grid item xs={5}>
                        <Grid container justifyContent="center" alignItems="center" spacing={2}>
                            <Grid item xs={4}>
                                <Avatar sx={{ width: 100, height: 100 }} src={lsEmployee.imagenUrl != null ? lsEmployee.imagenUrl : User} />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField value={documento} onChange={(e) => setDocumento(e.target.value)} onKeyDown={handleDocumento} fullWidth id="standard-basic" label="Documento" variant="standard" />
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
                                    <Typography variant="h5">{lsEmployee.nameGenero}</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h5">{GetEdad(new Date(lsEmployee.fechaNaci))}</Typography>
                                </Grid>
                            </Grid>
                        </Grid> : <Grid item xs={7}></Grid>
                    }
                </Grid>

                <Grid container sx={{ pt: 6 }} spacing={2}>
                    <Grid item xs={6}>
                        <FormProvider {...methods}>
                            <InputDatePicker
                                label="Fecha"
                                name="fecha"
                                defaultValue={new Date()}
                            />
                        </FormProvider>
                    </Grid>
                    <Grid item xs={6}>
                        <SelectOnChange
                            name="idAtencion"
                            label="Atención"
                            value={atencion}
                            onChange={(e) => setAtencion(e.target.value)}
                            options={lsAtencionEMO}
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors}
                        />
                    </Grid>
                </Grid>
            </SubCard>
            <Grid sx={{ pb: 2 }} />

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
                    <Tab disabled={atencion === '' ? true : false} key={index} component={Link} to="#" icon={tab.icon} label={tab.label} {...a11yProps(index)} />
                ))}
            </Tabs>

            <TabPanel value={value} index={0}>
                <PersonalData lsEmployee={lsEmployee} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <GenerateOrder lsEmployee={lsEmployee} />
            </TabPanel>

            <Grid container spacing={1} sx={{ pt: 5 }}>
                <Grid item xs={6}>
                    <AnimateButton>
                        <Button variant="contained" fullWidth onClick={handleSubmit(handleClick)}>
                            {TitleButton.Guardar}
                        </Button>
                    </AnimateButton>
                </Grid>
                <Grid item xs={6}>
                    <AnimateButton>
                        <Button variant="outlined" fullWidth onClick={() => navigate("/occupational-examination/list")}>
                            {TitleButton.Cancelar}
                        </Button>
                    </AnimateButton>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default OrdersIndividual;