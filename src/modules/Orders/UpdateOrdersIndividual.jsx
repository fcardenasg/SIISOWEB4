import PropTypes from 'prop-types';
import { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';
import {
    Box, Tab, Tabs,
    Grid, Button,
    TextField,
    useMediaQuery,
    IconButton,
    Tooltip,
    Typography,
    Avatar
} from '@mui/material';
import PersonalData from './PersonalData';

import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import { GetAllSupplier } from 'api/clients/SupplierClient';

import { GetByIdEmployee } from 'api/clients/EmployeeClient';

import { useNavigate, useParams } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import Transitions from 'ui-component/extended/Transitions';
import InputText from 'components/input/InputText';
import { TitleButton, Message } from 'components/helpers/Enums';
import { FormatDate, GetEdad } from 'components/helpers/Format';
import useAuth from 'hooks/useAuth';
import { MessageSuccess, MessageError } from 'components/alert/AlertAll';
import User from 'assets/img/user.png'
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import SelectOnChange from 'components/input/SelectOnChange';
import InputDatePicker from 'components/input/InputDatePicker';
import { CodCatalogo, DefaultValue } from 'components/helpers/Enums';
import InputSelect from 'components/input/InputSelect';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import SubCard from 'ui-component/cards/SubCard';
import InputCheckBox from 'components/input/InputCheckBox';
import { PostOrders } from 'formatdata/OrdersForm';
import { GetByIdOrders, InsertOrders } from 'api/clients/OrdersClient';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Cargando from 'components/loading/Cargando';

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

const UpdateOrdersIndividual = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const theme = useTheme();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [lsOrders, setLsOrders] = useState([]);
    const [value, setValue] = useState(0);
    const [moreFive, setMoreFive] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [openError, setOpenError] = useState(false);

    const [documento, setDocumento] = useState('');
    const [tipoExamen, setTipoExamen] = useState('');
    const [lsTipoExamen, setLsTipoExamen] = useState([]);
    const [lsEmployee, setLsEmployee] = useState([]);
    const [lsProveedor, setLsProveedor] = useState([]);
    const [lsLaboratorio, setLsLaboratorio] = useState([]);
    const [lsTipoRNM, setLsTipoRNM] = useState([]);
    const [lsCiudad, setLsCiudad] = useState([]);
    const [lsEstudioParaclinico, setLsEstudioParaclinico] = useState([]);

    const [lsProveedorCombo, setLsProveedorCombo] = useState({
        lsProveedorCombo1: [],
        lsProveedorCombo2: [],
        lsProveedorCombo3: [],
        lsProveedorCombo4: [],
        lsProveedorCombo5: [],
        lsProveedorCombo6: [],
        lsProveedorCombo7: [],
        lsProveedorCombo8: [],
        lsProveedorCombo9: [],
        lsProveedorCombo10: [],
    });
    const [paraclinicos, setParaclinicos] = useState({
        paraclinicos1: '',
        paraclinicos2: '',
        paraclinicos3: '',
        paraclinicos4: '',
        paraclinicos5: '',
        paraclinicos6: '',
        paraclinicos7: '',
        paraclinicos8: '',
        paraclinicos9: '',
        paraclinicos10: '',
    });
    const [proveedor, setProveedor] = useState({
        proveedor1: '',
        proveedor2: '',
        proveedor3: '',
        proveedor4: '',
        proveedor5: '',
        proveedor6: '',
        proveedor7: '',
        proveedor8: '',
        proveedor9: '',
        proveedor10: '',
    });
    const [ciudad, setCiudad] = useState({
        ciudad1: '',
        ciudad2: '',
        ciudad3: '',
        ciudad4: '',
        ciudad5: '',
        ciudad6: '',
        ciudad7: '',
        ciudad8: '',
        ciudad9: '',
        ciudad10: '',
    });

    /* PRIMERA */
    const handleParaclinicos1 = (event) => {
        try {
            setCiudad({ ...ciudad, ciudad1: '' });
            setParaclinicos({ ...paraclinicos, paraclinicos1: event.target.value });

            var arrayReady = lsProveedor.filter(tipo => tipo.tipoProv == event.target.value)
                .map((para) => ({
                    value: para.codiProv,
                    label: para.nombProv
                }));
            setLsProveedorCombo({ ...lsProveedorCombo, lsProveedorCombo1: arrayReady });

        } catch (error) {
            console.log(error);
        }
    }
    const handleProveedor1 = (event) => {
        try {
            setProveedor({ ...proveedor, proveedor1: event.target.value });

            var intCiudad = String(lsProveedor.filter(tipo => tipo.codiProv == event.target.value).map(prov => prov.ciudProv));
            setCiudad({ ...ciudad, ciudad1: intCiudad });
        } catch (error) {
            console.log(error);
        }
    }
    /* SEGUNDA */
    const handleParaclinicos2 = (event) => {
        try {
            setCiudad({ ...ciudad, ciudad2: '' });
            setParaclinicos({ ...paraclinicos, paraclinicos2: event.target.value });

            var arrayReady = lsProveedor.filter(tipo => tipo.tipoProv == event.target.value)
                .map((para) => ({
                    value: para.codiProv,
                    label: para.nombProv
                }));
            setLsProveedorCombo({ ...lsProveedorCombo, lsProveedorCombo2: arrayReady });

        } catch (error) {
            console.log(error);
        }
    }
    const handleProveedor2 = (event) => {
        try {
            setProveedor({ ...proveedor, proveedor2: event.target.value });

            var intCiudad = String(lsProveedor.filter(tipo => tipo.codiProv == event.target.value).map(prov => prov.ciudProv));
            setCiudad({ ...ciudad, ciudad2: intCiudad });
        } catch (error) {
            console.log(error);
        }
    }
    /* TERCERA */
    const handleParaclinicos3 = (event) => {
        try {
            setCiudad({ ...ciudad, ciudad3: '' });
            setParaclinicos({ ...paraclinicos, paraclinicos3: event.target.value });

            var arrayReady = lsProveedor.filter(tipo => tipo.tipoProv == event.target.value)
                .map((para) => ({
                    value: para.codiProv,
                    label: para.nombProv
                }));
            setLsProveedorCombo({ ...lsProveedorCombo, lsProveedorCombo3: arrayReady });

        } catch (error) {
            console.log(error);
        }
    }
    const handleProveedor3 = (event) => {
        try {
            setProveedor({ ...proveedor, proveedor3: event.target.value });

            var intCiudad = String(lsProveedor.filter(tipo => tipo.codiProv == event.target.value).map(prov => prov.ciudProv));
            setCiudad({ ...ciudad, ciudad3: intCiudad });
        } catch (error) {
            console.log(error);
        }
    }
    /* CUARTA */
    const handleParaclinicos4 = (event) => {
        try {
            setCiudad({ ...ciudad, ciudad4: '' });
            setParaclinicos({ ...paraclinicos, paraclinicos4: event.target.value });

            var arrayReady = lsProveedor.filter(tipo => tipo.tipoProv == event.target.value)
                .map((para) => ({
                    value: para.codiProv,
                    label: para.nombProv
                }));
            setLsProveedorCombo({ ...lsProveedorCombo, lsProveedorCombo4: arrayReady });

        } catch (error) {
            console.log(error);
        }
    }
    const handleProveedor4 = (event) => {
        try {
            setProveedor({ ...proveedor, proveedor4: event.target.value });

            var intCiudad = String(lsProveedor.filter(tipo => tipo.codiProv == event.target.value).map(prov => prov.ciudProv));
            setCiudad({ ...ciudad, ciudad4: intCiudad });
        } catch (error) {
            console.log(error);
        }
    }
    /* QUINTA */
    const handleParaclinicos5 = (event) => {
        try {
            setCiudad({ ...ciudad, ciudad5: '' });
            setParaclinicos({ ...paraclinicos, paraclinicos5: event.target.value });

            var arrayReady = lsProveedor.filter(tipo => tipo.tipoProv == event.target.value)
                .map((para) => ({
                    value: para.codiProv,
                    label: para.nombProv
                }));
            setLsProveedorCombo({ ...lsProveedorCombo, lsProveedorCombo5: arrayReady });

        } catch (error) {
            console.log(error);
        }
    }
    const handleProveedor5 = (event) => {
        try {
            setProveedor({ ...proveedor, proveedor5: event.target.value });

            var intCiudad = String(lsProveedor.filter(tipo => tipo.codiProv == event.target.value).map(prov => prov.ciudProv));
            setCiudad({ ...ciudad, ciudad5: intCiudad });
        } catch (error) {
            console.log(error);
        }
    }
    /* SEXTA */
    const handleParaclinicos6 = (event) => {
        try {
            setCiudad({ ...ciudad, ciudad6: '' });
            setParaclinicos({ ...paraclinicos, paraclinicos6: event.target.value });

            var arrayReady = lsProveedor.filter(tipo => tipo.tipoProv == event.target.value)
                .map((para) => ({
                    value: para.codiProv,
                    label: para.nombProv
                }));
            setLsProveedorCombo({ ...lsProveedorCombo, lsProveedorCombo6: arrayReady });

        } catch (error) {
            console.log(error);
        }
    }
    const handleProveedor6 = (event) => {
        try {
            setProveedor({ ...proveedor, proveedor6: event.target.value });

            var intCiudad = String(lsProveedor.filter(tipo => tipo.codiProv == event.target.value).map(prov => prov.ciudProv));
            setCiudad({ ...ciudad, ciudad6: intCiudad });
        } catch (error) {
            console.log(error);
        }
    }
    /* DECIMA */
    const handleParaclinicos7 = (event) => {
        try {
            setCiudad({ ...ciudad, ciudad7: '' });
            setParaclinicos({ ...paraclinicos, paraclinicos7: event.target.value });

            var arrayReady = lsProveedor.filter(tipo => tipo.tipoProv == event.target.value)
                .map((para) => ({
                    value: para.codiProv,
                    label: para.nombProv
                }));
            setLsProveedorCombo({ ...lsProveedorCombo, lsProveedorCombo7: arrayReady });

        } catch (error) {
            console.log(error);
        }
    }
    const handleProveedor7 = (event) => {
        try {
            setProveedor({ ...proveedor, proveedor7: event.target.value });

            var intCiudad = String(lsProveedor.filter(tipo => tipo.codiProv == event.target.value).map(prov => prov.ciudProv));
            setCiudad({ ...ciudad, ciudad7: intCiudad });
        } catch (error) {
            console.log(error);
        }
    }
    /* OCTAVA */
    const handleParaclinicos8 = (event) => {
        try {
            setCiudad({ ...ciudad, ciudad8: '' });
            setParaclinicos({ ...paraclinicos, paraclinicos8: event.target.value });

            var arrayReady = lsProveedor.filter(tipo => tipo.tipoProv == event.target.value)
                .map((para) => ({
                    value: para.codiProv,
                    label: para.nombProv
                }));
            setLsProveedorCombo({ ...lsProveedorCombo, lsProveedorCombo8: arrayReady });

        } catch (error) {
            console.log(error);
        }
    }
    const handleProveedor8 = (event) => {
        try {
            setProveedor({ ...proveedor, proveedor8: event.target.value });

            var intCiudad = String(lsProveedor.filter(tipo => tipo.codiProv == event.target.value).map(prov => prov.ciudProv));
            setCiudad({ ...ciudad, ciudad8: intCiudad });
        } catch (error) {
            console.log(error);
        }
    }
    /* NOVENA */
    const handleParaclinicos9 = (event) => {
        try {
            setCiudad({ ...ciudad, ciudad9: '' });
            setParaclinicos({ ...paraclinicos, paraclinicos9: event.target.value });

            var arrayReady = lsProveedor.filter(tipo => tipo.tipoProv == event.target.value)
                .map((para) => ({
                    value: para.codiProv,
                    label: para.nombProv
                }));
            setLsProveedorCombo({ ...lsProveedorCombo, lsProveedorCombo9: arrayReady });

        } catch (error) {
            console.log(error);
        }
    }
    const handleProveedor9 = (event) => {
        try {
            setProveedor({ ...proveedor, proveedor9: event.target.value });

            var intCiudad = String(lsProveedor.filter(tipo => tipo.codiProv == event.target.value).map(prov => prov.ciudProv));
            setCiudad({ ...ciudad, ciudad9: intCiudad });
        } catch (error) {
            console.log(error);
        }
    }
    /* DECIMA */
    const handleParaclinicos10 = (event) => {
        try {
            setCiudad({ ...ciudad, ciudad10: '' });
            setParaclinicos({ ...paraclinicos, paraclinicos10: event.target.value });

            var arrayReady = lsProveedor.filter(tipo => tipo.tipoProv == event.target.value)
                .map((para) => ({
                    value: para.codiProv,
                    label: para.nombProv
                }));
            setLsProveedorCombo({ ...lsProveedorCombo, lsProveedorCombo10: arrayReady });

        } catch (error) {
            console.log(error);
        }
    }
    const handleProveedor10 = (event) => {
        try {
            setProveedor({ ...proveedor, proveedor10: event.target.value });

            var intCiudad = String(lsProveedor.filter(tipo => tipo.codiProv == event.target.value).map(prov => prov.ciudProv));
            setCiudad({ ...ciudad, ciudad10: intCiudad });
        } catch (error) {
            console.log(error);
        }
    }
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

    const handleLoadingDocument = async (idEmployee) => {
        try {
            var lsServerEmployee = await GetByIdEmployee(idEmployee);

            if (lsServerEmployee.status === 200) {
                setLsEmployee(lsServerEmployee.data);
            }
        } catch (error) {
            setLsEmployee([]);
            setErrorMessage(Message.ErrorDeDatos);
        }
    }

    useEffect(() => {
        async function GetAll() {
            try {
                const lsServerProveedor = await GetAllSupplier(0, 0);
                if (lsServerProveedor.status === 200)
                    setLsProveedor(lsServerProveedor.data.entities);

                const lsServerUpdate = await GetByIdOrders(id);
                if (lsServerUpdate.status === 200) {
                    setLsOrders(lsServerUpdate.data);
                    handleLoadingDocument(lsServerUpdate.data.documento);
                    setDocumento(lsServerUpdate.data.documento);

                    setLsEmployee([]);
                    setTipoExamen(lsServerUpdate.data.idTipoExamen);

                    var arrayReady = lsServerProveedor.data.entities.filter(tipo => tipo.tipoProv == lsServerUpdate.data.idProveedor1)
                        .map((para) => ({
                            value: para.codiProv,
                            label: para.nombProv
                        }));
                    setLsProveedorCombo({ ...lsProveedorCombo, lsProveedorCombo1: arrayReady });

                    setLsProveedorCombo({
                        lsProveedorCombo1: [], lsProveedorCombo2: [], lsProveedorCombo3: [], lsProveedorCombo4: [], lsProveedorCombo5: [],
                        lsProveedorCombo6: [], lsProveedorCombo7: [], lsProveedorCombo8: [], lsProveedorCombo9: [], lsProveedorCombo10: [],
                    });
                    setParaclinicos({
                        paraclinicos1: lsServerUpdate.data.idParaclinico1, paraclinicos2: lsServerUpdate.data.idParaclinico2,
                        paraclinicos3: lsServerUpdate.data.idParaclinico3, paraclinicos4: lsServerUpdate.data.idParaclinico4,
                        paraclinicos5: lsServerUpdate.data.idParaclinico5, paraclinicos6: lsServerUpdate.data.idParaclinico6,
                        paraclinicos7: lsServerUpdate.data.idParaclinico7, paraclinicos8: lsServerUpdate.data.idParaclinico8,
                        paraclinicos9: lsServerUpdate.data.idParaclinico9, paraclinicos10: lsServerUpdate.data.idParaclinico10,
                    });
                    setProveedor({
                        proveedor1: lsServerUpdate.data.idProveedor1, proveedor2: lsServerUpdate.data.idProveedor2,
                        proveedor3: lsServerUpdate.data.idProveedor3, proveedor4: lsServerUpdate.data.idProveedor4,
                        proveedor5: lsServerUpdate.data.idProveedor5, proveedor6: lsServerUpdate.data.idProveedor6,
                        proveedor7: lsServerUpdate.data.idProveedor7, proveedor8: lsServerUpdate.data.idProveedor8,
                        proveedor9: lsServerUpdate.data.idProveedor9, proveedor10: lsServerUpdate.data.idProveedor10,
                    });
                    setCiudad({
                        ciudad1: '', ciudad2: '', ciudad3: '', ciudad4: '', ciudad5: '',
                        ciudad6: '', ciudad7: '', ciudad8: '', ciudad9: '', ciudad10: '',
                    });
                }

                const lsServerLaboratorio = await GetAllByTipoCatalogo(0, 0, CodCatalogo.LABORATORIO_ORDENES_PARACLINICOS);
                var resultLaboratorio = lsServerLaboratorio.data.entities.map((item) => ({
                    value: item.idCatalogo,
                    label: item.nombre
                }));
                setLsLaboratorio(resultLaboratorio);

                const lsServerTipoRNM = await GetAllByTipoCatalogo(0, 0, CodCatalogo.TIPORNM_ORDENES_PARACLINICOS);
                var resultTipoRNM = lsServerTipoRNM.data.entities.map((item) => ({
                    value: item.idCatalogo,
                    label: item.nombre
                }));
                setLsTipoRNM(resultTipoRNM);

                const lsServerCiudad = await GetAllByTipoCatalogo(0, 0, CodCatalogo.CIUDADES);
                if (lsServerCiudad.status === 200) {
                    var resultCiudad = lsServerCiudad.data.entities.map((item) => ({
                        value: item.idCatalogo,
                        label: item.nombre
                    }));
                    setLsCiudad(resultCiudad);
                }

                const lsServerTipoExamen = await GetAllByTipoCatalogo(0, 0, CodCatalogo.TIPO_EXAMEN_PARACLINICOS);
                var resultTipoExamen = lsServerTipoExamen.data.entities.map((item) => ({
                    value: item.idCatalogo,
                    label: item.nombre
                }));
                setLsTipoExamen(resultTipoExamen);

                const lsServerEstudioParaclinico2 = await GetAllByTipoCatalogo(0, 0, CodCatalogo.ESTUDIO_EXAMEN_PARACLINICOS);
                var resultEstudioParaclinico = lsServerEstudioParaclinico2.data.entities.map((item) => ({
                    value: item.idCatalogo,
                    label: item.nombre
                }));
                setLsEstudioParaclinico(resultEstudioParaclinico);
            } catch (error) {
                console.log(error);
            }
        }

        GetAll();
    }, [])

    const fechaExmaneFisico1 = paraclinicos.paraclinicos1 === DefaultValue.ORDENES_FECHA_EXAM_FISICO ? true : false;
    const fechaExmaneFisico2 = paraclinicos.paraclinicos2 === DefaultValue.ORDENES_FECHA_EXAM_FISICO ? true : false;
    const fechaExmaneFisico3 = paraclinicos.paraclinicos3 === DefaultValue.ORDENES_FECHA_EXAM_FISICO ? true : false;
    const fechaExmaneFisico4 = paraclinicos.paraclinicos4 === DefaultValue.ORDENES_FECHA_EXAM_FISICO ? true : false;
    const fechaExmaneFisico5 = paraclinicos.paraclinicos5 === DefaultValue.ORDENES_FECHA_EXAM_FISICO ? true : false;
    const fechaExmaneFisico6 = paraclinicos.paraclinicos6 === DefaultValue.ORDENES_FECHA_EXAM_FISICO ? true : false;
    const fechaExmaneFisico7 = paraclinicos.paraclinicos7 === DefaultValue.ORDENES_FECHA_EXAM_FISICO ? true : false;
    const fechaExmaneFisico8 = paraclinicos.paraclinicos8 === DefaultValue.ORDENES_FECHA_EXAM_FISICO ? true : false;
    const fechaExmaneFisico9 = paraclinicos.paraclinicos9 === DefaultValue.ORDENES_FECHA_EXAM_FISICO ? true : false;
    const fechaExmaneFisico10 = paraclinicos.paraclinicos10 === DefaultValue.ORDENES_FECHA_EXAM_FISICO ? true : false;

    const tipoExamenLabor1 = paraclinicos.paraclinicos1 === DefaultValue.ORDENES_LABORATORIO ? true : false;
    const tipoExamenLabor2 = paraclinicos.paraclinicos2 === DefaultValue.ORDENES_LABORATORIO ? true : false;
    const tipoExamenLabor3 = paraclinicos.paraclinicos3 === DefaultValue.ORDENES_LABORATORIO ? true : false;
    const tipoExamenLabor4 = paraclinicos.paraclinicos4 === DefaultValue.ORDENES_LABORATORIO ? true : false;
    const tipoExamenLabor5 = paraclinicos.paraclinicos5 === DefaultValue.ORDENES_LABORATORIO ? true : false;
    const tipoExamenLabor6 = paraclinicos.paraclinicos6 === DefaultValue.ORDENES_LABORATORIO ? true : false;
    const tipoExamenLabor7 = paraclinicos.paraclinicos7 === DefaultValue.ORDENES_LABORATORIO ? true : false;
    const tipoExamenLabor8 = paraclinicos.paraclinicos8 === DefaultValue.ORDENES_LABORATORIO ? true : false;
    const tipoExamenLabor9 = paraclinicos.paraclinicos9 === DefaultValue.ORDENES_LABORATORIO ? true : false;
    const tipoExamenLabor10 = paraclinicos.paraclinicos10 === DefaultValue.ORDENES_LABORATORIO ? true : false;

    const tipoExamenRNM1 = paraclinicos.paraclinicos1 === DefaultValue.ORDENES_RNM ? true : false;
    const tipoExamenRNM2 = paraclinicos.paraclinicos2 === DefaultValue.ORDENES_RNM ? true : false;
    const tipoExamenRNM3 = paraclinicos.paraclinicos3 === DefaultValue.ORDENES_RNM ? true : false;
    const tipoExamenRNM4 = paraclinicos.paraclinicos4 === DefaultValue.ORDENES_RNM ? true : false;
    const tipoExamenRNM5 = paraclinicos.paraclinicos5 === DefaultValue.ORDENES_RNM ? true : false;
    const tipoExamenRNM6 = paraclinicos.paraclinicos6 === DefaultValue.ORDENES_RNM ? true : false;
    const tipoExamenRNM7 = paraclinicos.paraclinicos7 === DefaultValue.ORDENES_RNM ? true : false;
    const tipoExamenRNM8 = paraclinicos.paraclinicos8 === DefaultValue.ORDENES_RNM ? true : false;
    const tipoExamenRNM9 = paraclinicos.paraclinicos9 === DefaultValue.ORDENES_RNM ? true : false;
    const tipoExamenRNM10 = paraclinicos.paraclinicos10 === DefaultValue.ORDENES_RNM ? true : false;

    const xsGrid1 = paraclinicos.paraclinicos1 === DefaultValue.ORDENES_LABORATORIO || paraclinicos.paraclinicos1 === DefaultValue.ORDENES_RNM || paraclinicos.paraclinicos1 === DefaultValue.ORDENES_FECHA_EXAM_FISICO ? 3 : 4;
    const xsGrid2 = paraclinicos.paraclinicos2 === DefaultValue.ORDENES_LABORATORIO || paraclinicos.paraclinicos2 === DefaultValue.ORDENES_RNM || paraclinicos.paraclinicos2 === DefaultValue.ORDENES_FECHA_EXAM_FISICO ? 3 : 4;
    const xsGrid3 = paraclinicos.paraclinicos3 === DefaultValue.ORDENES_LABORATORIO || paraclinicos.paraclinicos3 === DefaultValue.ORDENES_RNM || paraclinicos.paraclinicos3 === DefaultValue.ORDENES_FECHA_EXAM_FISICO ? 3 : 4;
    const xsGrid4 = paraclinicos.paraclinicos4 === DefaultValue.ORDENES_LABORATORIO || paraclinicos.paraclinicos4 === DefaultValue.ORDENES_RNM || paraclinicos.paraclinicos4 === DefaultValue.ORDENES_FECHA_EXAM_FISICO ? 3 : 4;
    const xsGrid5 = paraclinicos.paraclinicos5 === DefaultValue.ORDENES_LABORATORIO || paraclinicos.paraclinicos5 === DefaultValue.ORDENES_RNM || paraclinicos.paraclinicos5 === DefaultValue.ORDENES_FECHA_EXAM_FISICO ? 3 : 4;
    const xsGrid6 = paraclinicos.paraclinicos6 === DefaultValue.ORDENES_LABORATORIO || paraclinicos.paraclinicos6 === DefaultValue.ORDENES_RNM || paraclinicos.paraclinicos6 === DefaultValue.ORDENES_FECHA_EXAM_FISICO ? 3 : 4;
    const xsGrid7 = paraclinicos.paraclinicos7 === DefaultValue.ORDENES_LABORATORIO || paraclinicos.paraclinicos7 === DefaultValue.ORDENES_RNM || paraclinicos.paraclinicos7 === DefaultValue.ORDENES_FECHA_EXAM_FISICO ? 3 : 4;
    const xsGrid8 = paraclinicos.paraclinicos8 === DefaultValue.ORDENES_LABORATORIO || paraclinicos.paraclinicos8 === DefaultValue.ORDENES_RNM || paraclinicos.paraclinicos8 === DefaultValue.ORDENES_FECHA_EXAM_FISICO ? 3 : 4;
    const xsGrid9 = paraclinicos.paraclinicos9 === DefaultValue.ORDENES_LABORATORIO || paraclinicos.paraclinicos9 === DefaultValue.ORDENES_RNM || paraclinicos.paraclinicos9 === DefaultValue.ORDENES_FECHA_EXAM_FISICO ? 3 : 4;
    const xsGrid10 = paraclinicos.paraclinicos10 === DefaultValue.ORDENES_LABORATORIO || paraclinicos.paraclinicos10 === DefaultValue.ORDENES_RNM || paraclinicos.paraclinicos10 === DefaultValue.ORDENES_FECHA_EXAM_FISICO ? 3 : 4;

    const handleClick = async (datos) => {
        try {
            const DataToInsert = PostOrders(documento, FormatDate(datos.fecha), tipoExamen,
                paraclinicos.paraclinicos1, proveedor.proveedor1,
                paraclinicos.paraclinicos2, proveedor.proveedor2,
                paraclinicos.paraclinicos3, proveedor.proveedor3,
                paraclinicos.paraclinicos4, proveedor.proveedor4,
                paraclinicos.paraclinicos5, proveedor.proveedor5,
                paraclinicos.paraclinicos6, proveedor.proveedor6,
                paraclinicos.paraclinicos7, proveedor.proveedor7,
                paraclinicos.paraclinicos8, proveedor.proveedor8,
                paraclinicos.paraclinicos9, proveedor.proveedor9,
                paraclinicos.paraclinicos10, proveedor.proveedor10,

                datos.idTipoExamenLaboratorio, datos.idTipoExamenRNM, datos.fechaExamenFisico, datos.asistio, datos.consentimientoInformado, datos.observaciones,
                user.email, FormatDate(new Date()), '', FormatDate(new Date()));

            if (Object.keys(datos.length !== 0)) {
                const result = await InsertOrders(DataToInsert);
                if (result.status === 200) {
                    setOpenSuccess(true);
                    setDocumento('');
                    setLsEmployee([]);
                    reset();
                    setValue(0);
                    setTipoExamen('');
                    setLsProveedorCombo({
                        lsProveedorCombo1: [], lsProveedorCombo2: [], lsProveedorCombo3: [], lsProveedorCombo4: [], lsProveedorCombo5: [],
                        lsProveedorCombo6: [], lsProveedorCombo7: [], lsProveedorCombo8: [], lsProveedorCombo9: [], lsProveedorCombo10: [],
                    });
                    setParaclinicos({
                        paraclinicos1: '', paraclinicos2: '', paraclinicos3: '', paraclinicos4: '', paraclinicos5: '',
                        paraclinicos6: '', paraclinicos7: '', paraclinicos8: '', paraclinicos9: '', paraclinicos10: '',
                    });
                    setProveedor({
                        proveedor1: '', proveedor2: '', proveedor3: '', proveedor4: '', proveedor5: '',
                        proveedor6: '', proveedor7: '', proveedor8: '', proveedor9: '', proveedor10: '',
                    });
                    setCiudad({
                        ciudad1: '', ciudad2: '', ciudad3: '', ciudad4: '', ciudad5: '',
                        ciudad6: '', ciudad7: '', ciudad8: '', ciudad9: '', ciudad10: '',
                    });


                }
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(`${error}`);
        }
    }

    return (
        <MainCard title="ORDENES INDIVIDUALES">
            <MessageSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            {lsOrders.length != 0 ?
                <Fragment>
                    <SubCard darkTitle title={<Typography variant="h4">DATOS DEL PACIENTE</Typography>}>
                        <Grid container justifyContent="left" alignItems="center" spacing={2}>
                            <Grid item xs={5}>
                                <Grid container justifyContent="center" alignItems="center" spacing={2}>
                                    <Grid item xs={4}>
                                        <Avatar sx={{ width: 100, height: 100 }} src={lsEmployee.imagenUrl != null ? lsEmployee.imagenUrl : User} />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField value={documento} disabled={true} onChange={(e) => setDocumento(e.target.value)} onKeyDown={handleDocumento} fullWidth id="standard-basic" label="Documento" variant="standard" />
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
                                    name="idTipoExamen"
                                    label="Tipo Examen"
                                    value={tipoExamen}
                                    onChange={(e) => setTipoExamen(e.target.value)}
                                    options={lsTipoExamen}
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
                            <Tab disabled={tipoExamen === '' ? true : false} key={index} component={Link} to="#" icon={tab.icon} label={tab.label} {...a11yProps(index)} />
                        ))}
                    </Tabs>

                    <TabPanel value={value} index={0}>
                        <PersonalData lsEmployee={lsEmployee} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <SubCard title="Datos Ordenes de Paraclinicos">
                                    <Grid container spacing={2}>
                                        {/* PRIMERA */}
                                        <Grid item xs={xsGrid1}>
                                            <SelectOnChange
                                                name="idParaclinico"
                                                label="Paraclínicos"
                                                value={paraclinicos.paraclinicos1}
                                                onChange={handleParaclinicos1}
                                                options={lsEstudioParaclinico}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </Grid>

                                        {tipoExamenLabor1 ?
                                            <Grid item xs={xsGrid1}>
                                                <FormProvider {...methods}>
                                                    <InputSelect
                                                        name="idTipoExamenLaboratorio"
                                                        label="Tipo Examen"
                                                        defaultValue=""
                                                        options={lsLaboratorio}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                        bug={errors}
                                                    />
                                                </FormProvider>
                                            </Grid> : tipoExamenRNM1 ?
                                                <Grid item xs={xsGrid1}>
                                                    <FormProvider {...methods}>
                                                        <InputSelect
                                                            name="idTipoExamenRNM"
                                                            label="Tipo Examen"
                                                            defaultValue=""
                                                            options={lsTipoRNM}
                                                            size={matchesXS ? 'small' : 'medium'}
                                                            bug={errors}
                                                        />
                                                    </FormProvider>
                                                </Grid> : fechaExmaneFisico1 ?
                                                    <Grid item xs={xsGrid1}>
                                                        <FormProvider {...methods}>
                                                            <InputDatePicker
                                                                label="fechaExamenFisico"
                                                                name="fecha"
                                                                defaultValue={new Date()}
                                                            />
                                                        </FormProvider>
                                                    </Grid> : <></>
                                        }

                                        <Grid item xs={xsGrid1}>
                                            <SelectOnChange
                                                name="idProveedor"
                                                label="Proveedor"
                                                value={proveedor.proveedor1}
                                                onChange={handleProveedor1}
                                                options={lsProveedorCombo.lsProveedorCombo1}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </Grid>

                                        <Grid item xs={xsGrid1}>
                                            <SelectOnChange
                                                disabled
                                                name="idCiudad"
                                                label="Ciudad"
                                                value={ciudad.ciudad1}
                                                onChange={(e) => setCiudad({ ...ciudad, ciudad1: e.target.value })}
                                                options={lsCiudad}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </Grid>
                                        {/* SEGUNDA */}
                                        <Grid item xs={xsGrid2}>
                                            <SelectOnChange
                                                name="idParaclinico"
                                                label="Paraclínicos"
                                                value={paraclinicos.paraclinicos2}
                                                onChange={handleParaclinicos2}
                                                options={lsEstudioParaclinico}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </Grid>

                                        {tipoExamenLabor2 ?
                                            <Grid item xs={xsGrid2}>
                                                <FormProvider {...methods}>
                                                    <InputSelect
                                                        name="idTipoExamenLaboratorio"
                                                        label="Tipo Examen"
                                                        defaultValue=""
                                                        options={lsLaboratorio}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                        bug={errors}
                                                    />
                                                </FormProvider>
                                            </Grid> : tipoExamenRNM2 ?
                                                <Grid item xs={xsGrid2}>
                                                    <FormProvider {...methods}>
                                                        <InputSelect
                                                            name="idTipoExamenRNM"
                                                            label="Tipo Examen"
                                                            defaultValue=""
                                                            options={lsTipoRNM}
                                                            size={matchesXS ? 'small' : 'medium'}
                                                            bug={errors}
                                                        />
                                                    </FormProvider>
                                                </Grid> : fechaExmaneFisico2 ?
                                                    <Grid item xs={xsGrid2}>
                                                        <FormProvider {...methods}>
                                                            <InputDatePicker
                                                                label="fechaExamenFisico"
                                                                name="fecha"
                                                                defaultValue={new Date()}
                                                            />
                                                        </FormProvider>
                                                    </Grid> : <></>
                                        }

                                        <Grid item xs={xsGrid2}>
                                            <SelectOnChange
                                                name="idProveedor"
                                                label="Proveedor"
                                                value={proveedor.proveedor2}
                                                onChange={handleProveedor2}
                                                options={lsProveedorCombo.lsProveedorCombo2}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </Grid>

                                        <Grid item xs={xsGrid2}>
                                            <SelectOnChange
                                                disabled
                                                name="idCiudad"
                                                label="Ciudad"
                                                value={ciudad.ciudad2}
                                                onChange={(e) => setCiudad({ ...ciudad, ciudad2: e.target.value })}
                                                options={lsCiudad}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </Grid>
                                        {/* TERCERA */}
                                        <Grid item xs={xsGrid3}>
                                            <SelectOnChange
                                                name="idParaclinico"
                                                label="Paraclínicos"
                                                value={paraclinicos.paraclinicos3}
                                                onChange={handleParaclinicos3}
                                                options={lsEstudioParaclinico}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </Grid>

                                        {tipoExamenLabor3 ?
                                            <Grid item xs={xsGrid3}>
                                                <FormProvider {...methods}>
                                                    <InputSelect
                                                        name="idTipoExamenLaboratorio"
                                                        label="Tipo Examen"
                                                        defaultValue=""
                                                        options={lsLaboratorio}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                        bug={errors}
                                                    />
                                                </FormProvider>
                                            </Grid> : tipoExamenRNM3 ?
                                                <Grid item xs={xsGrid3}>
                                                    <FormProvider {...methods}>
                                                        <InputSelect
                                                            name="idTipoExamenRNM"
                                                            label="Tipo Examen"
                                                            defaultValue=""
                                                            options={lsTipoRNM}
                                                            size={matchesXS ? 'small' : 'medium'}
                                                            bug={errors}
                                                        />
                                                    </FormProvider>
                                                </Grid> : fechaExmaneFisico3 ?
                                                    <Grid item xs={xsGrid3}>
                                                        <FormProvider {...methods}>
                                                            <InputDatePicker
                                                                label="fechaExamenFisico"
                                                                name="fecha"
                                                                defaultValue={new Date()}
                                                            />
                                                        </FormProvider>
                                                    </Grid> : <></>
                                        }

                                        <Grid item xs={xsGrid3}>
                                            <SelectOnChange
                                                name="idProveedor"
                                                label="Proveedor"
                                                value={proveedor.proveedor3}
                                                onChange={handleProveedor3}
                                                options={lsProveedorCombo.lsProveedorCombo3}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </Grid>

                                        <Grid item xs={xsGrid3}>
                                            <SelectOnChange
                                                disabled
                                                name="idCiudad"
                                                label="Ciudad"
                                                value={ciudad.ciudad3}
                                                onChange={(e) => setCiudad({ ...ciudad, ciudad3: e.target.value })}
                                                options={lsCiudad}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </Grid>
                                        {/* CUARTA */}
                                        <Grid item xs={xsGrid4}>
                                            <SelectOnChange
                                                name="idParaclinico"
                                                label="Paraclínicos"
                                                value={paraclinicos.paraclinicos4}
                                                onChange={handleParaclinicos4}
                                                options={lsEstudioParaclinico}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </Grid>

                                        {tipoExamenLabor4 ?
                                            <Grid item xs={xsGrid4}>
                                                <FormProvider {...methods}>
                                                    <InputSelect
                                                        name="idTipoExamenLaboratorio"
                                                        label="Tipo Examen"
                                                        defaultValue=""
                                                        options={lsLaboratorio}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                        bug={errors}
                                                    />
                                                </FormProvider>
                                            </Grid> : tipoExamenRNM4 ?
                                                <Grid item xs={xsGrid4}>
                                                    <FormProvider {...methods}>
                                                        <InputSelect
                                                            name="idTipoExamenRNM"
                                                            label="Tipo Examen"
                                                            defaultValue=""
                                                            options={lsTipoRNM}
                                                            size={matchesXS ? 'small' : 'medium'}
                                                            bug={errors}
                                                        />
                                                    </FormProvider>
                                                </Grid> : fechaExmaneFisico4 ?
                                                    <Grid item xs={xsGrid4}>
                                                        <FormProvider {...methods}>
                                                            <InputDatePicker
                                                                label="fechaExamenFisico"
                                                                name="fecha"
                                                                defaultValue={new Date()}
                                                            />
                                                        </FormProvider>
                                                    </Grid> : <></>
                                        }

                                        <Grid item xs={xsGrid4}>
                                            <SelectOnChange
                                                name="idProveedor"
                                                label="Proveedor"
                                                value={proveedor.proveedor4}
                                                onChange={handleProveedor4}
                                                options={lsProveedorCombo.lsProveedorCombo4}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </Grid>

                                        <Grid item xs={xsGrid4}>
                                            <SelectOnChange
                                                disabled
                                                name="idCiudad"
                                                label="Ciudad"
                                                value={ciudad.ciudad4}
                                                onChange={(e) => setCiudad({ ...ciudad, ciudad4: e.target.value })}
                                                options={lsCiudad}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </Grid>
                                        {/* QUINTA */}
                                        <Grid item xs={xsGrid5}>
                                            <SelectOnChange
                                                name="idParaclinico"
                                                label="Paraclínicos"
                                                value={paraclinicos.paraclinicos5}
                                                onChange={handleParaclinicos5}
                                                options={lsEstudioParaclinico}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </Grid>

                                        {tipoExamenLabor5 ?
                                            <Grid item xs={xsGrid5}>
                                                <FormProvider {...methods}>
                                                    <InputSelect
                                                        name="idTipoExamenLaboratorio"
                                                        label="Tipo Examen"
                                                        defaultValue=""
                                                        options={lsLaboratorio}
                                                        size={matchesXS ? 'small' : 'medium'}
                                                        bug={errors}
                                                    />
                                                </FormProvider>
                                            </Grid> : tipoExamenRNM5 ?
                                                <Grid item xs={xsGrid5}>
                                                    <FormProvider {...methods}>
                                                        <InputSelect
                                                            name="idTipoExamenRNM"
                                                            label="Tipo Examen"
                                                            defaultValue=""
                                                            options={lsTipoRNM}
                                                            size={matchesXS ? 'small' : 'medium'}
                                                            bug={errors}
                                                        />
                                                    </FormProvider>
                                                </Grid> : fechaExmaneFisico5 ?
                                                    <Grid item xs={xsGrid5}>
                                                        <FormProvider {...methods}>
                                                            <InputDatePicker
                                                                label="fechaExamenFisico"
                                                                name="fecha"
                                                                defaultValue={new Date()}
                                                            />
                                                        </FormProvider>
                                                    </Grid> : <></>
                                        }

                                        <Grid item xs={xsGrid5}>
                                            <SelectOnChange
                                                name="idProveedor"
                                                label="Proveedor"
                                                value={proveedor.proveedor5}
                                                onChange={handleProveedor5}
                                                options={lsProveedorCombo.lsProveedorCombo5}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </Grid>

                                        <Grid item xs={xsGrid5}>
                                            <SelectOnChange
                                                disabled
                                                name="idCiudad"
                                                label="Ciudad"
                                                value={ciudad.ciudad5}
                                                onChange={(e) => setCiudad({ ...ciudad, ciudad5: e.target.value })}
                                                options={lsCiudad}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </Grid>

                                        {moreFive ?
                                            <Grid item xs={12}>
                                                <Tooltip title="Ver menos" onClick={() => setMoreFive(true)}>
                                                    <IconButton size="large">
                                                        <KeyboardArrowUpIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </Grid>
                                            :
                                            <Grid item xs={12}>
                                                <Tooltip title="Ver mas" onClick={() => setMoreFive(false)}>
                                                    <IconButton size="large">
                                                        <KeyboardArrowDownIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </Grid>
                                        }

                                        <Transitions type="collapse" in={moreFive} position="top-left" direction="up">
                                            {/* SEXTA */}
                                            <Grid item xs={xsGrid6}>
                                                <SelectOnChange
                                                    name="idParaclinico"
                                                    label="Paraclínicos"
                                                    value={paraclinicos.paraclinicos6}
                                                    onChange={handleParaclinicos6}
                                                    options={lsEstudioParaclinico}
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    bug={errors}
                                                />
                                            </Grid>
                                            {tipoExamenLabor6 ?
                                                <Grid item xs={xsGrid6}>
                                                    <FormProvider {...methods}>
                                                        <InputSelect
                                                            name="idTipoExamenLaboratorio"
                                                            label="Tipo Examen"
                                                            defaultValue=""
                                                            options={lsLaboratorio}
                                                            size={matchesXS ? 'small' : 'medium'}
                                                            bug={errors}
                                                        />
                                                    </FormProvider>
                                                </Grid> : tipoExamenRNM6 ?
                                                    <Grid item xs={xsGrid6}>
                                                        <FormProvider {...methods}>
                                                            <InputSelect
                                                                name="idTipoExamenRNM"
                                                                label="Tipo Examen"
                                                                defaultValue=""
                                                                options={lsTipoRNM}
                                                                size={matchesXS ? 'small' : 'medium'}
                                                                bug={errors}
                                                            />
                                                        </FormProvider>
                                                    </Grid> : fechaExmaneFisico6 ?
                                                        <Grid item xs={xsGrid6}>
                                                            <FormProvider {...methods}>
                                                                <InputDatePicker
                                                                    label="fechaExamenFisico"
                                                                    name="fecha"
                                                                    defaultValue={new Date()}
                                                                />
                                                            </FormProvider>
                                                        </Grid> : <></>
                                            }
                                            <Grid item xs={xsGrid6}>
                                                <SelectOnChange
                                                    name="idProveedor"
                                                    label="Proveedor"
                                                    value={proveedor.proveedor6}
                                                    onChange={handleProveedor6}
                                                    options={lsProveedorCombo.lsProveedorCombo6}
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    bug={errors}
                                                />
                                            </Grid>
                                            <Grid item xs={xsGrid6}>
                                                <SelectOnChange
                                                    disabled
                                                    name="idCiudad"
                                                    label="Ciudad"
                                                    value={ciudad.ciudad6}
                                                    onChange={(e) => setCiudad({ ...ciudad, ciudad6: e.target.value })}
                                                    options={lsCiudad}
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    bug={errors}
                                                />
                                            </Grid>
                                            {/* SEPTIMA */}
                                            <Grid item xs={xsGrid7}>
                                                <SelectOnChange
                                                    name="idParaclinico"
                                                    label="Paraclínicos"
                                                    value={paraclinicos.paraclinicos7}
                                                    onChange={handleParaclinicos7}
                                                    options={lsEstudioParaclinico}
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    bug={errors}
                                                />
                                            </Grid>
                                            {tipoExamenLabor7 ?
                                                <Grid item xs={xsGrid7}>
                                                    <FormProvider {...methods}>
                                                        <InputSelect
                                                            name="idTipoExamenLaboratorio"
                                                            label="Tipo Examen"
                                                            defaultValue=""
                                                            options={lsLaboratorio}
                                                            size={matchesXS ? 'small' : 'medium'}
                                                            bug={errors}
                                                        />
                                                    </FormProvider>
                                                </Grid> : tipoExamenRNM7 ?
                                                    <Grid item xs={xsGrid7}>
                                                        <FormProvider {...methods}>
                                                            <InputSelect
                                                                name="idTipoExamenRNM"
                                                                label="Tipo Examen"
                                                                defaultValue=""
                                                                options={lsTipoRNM}
                                                                size={matchesXS ? 'small' : 'medium'}
                                                                bug={errors}
                                                            />
                                                        </FormProvider>
                                                    </Grid> : fechaExmaneFisico7 ?
                                                        <Grid item xs={xsGrid7}>
                                                            <FormProvider {...methods}>
                                                                <InputDatePicker
                                                                    label="fechaExamenFisico"
                                                                    name="fecha"
                                                                    defaultValue={new Date()}
                                                                />
                                                            </FormProvider>
                                                        </Grid> : <></>
                                            }

                                            <Grid item xs={xsGrid7}>
                                                <SelectOnChange
                                                    name="idProveedor"
                                                    label="Proveedor"
                                                    value={proveedor.proveedor7}
                                                    onChange={handleProveedor7}
                                                    options={lsProveedorCombo.lsProveedorCombo7}
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    bug={errors}
                                                />
                                            </Grid>
                                            <Grid item xs={xsGrid7}>
                                                <SelectOnChange
                                                    disabled
                                                    name="idCiudad"
                                                    label="Ciudad"
                                                    value={ciudad.ciudad7}
                                                    onChange={(e) => setCiudad({ ...ciudad, ciudad7: e.target.value })}
                                                    options={lsCiudad}
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    bug={errors}
                                                />
                                            </Grid>
                                            {/* OCTAVA */}
                                            <Grid item xs={xsGrid8}>
                                                <SelectOnChange
                                                    name="idParaclinico"
                                                    label="Paraclínicos"
                                                    value={paraclinicos.paraclinicos8}
                                                    onChange={handleParaclinicos8}
                                                    options={lsEstudioParaclinico}
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    bug={errors}
                                                />
                                            </Grid>
                                            {tipoExamenLabor8 ?
                                                <Grid item xs={xsGrid8}>
                                                    <FormProvider {...methods}>
                                                        <InputSelect
                                                            name="idTipoExamenLaboratorio"
                                                            label="Tipo Examen"
                                                            defaultValue=""
                                                            options={lsLaboratorio}
                                                            size={matchesXS ? 'small' : 'medium'}
                                                            bug={errors}
                                                        />
                                                    </FormProvider>
                                                </Grid> : tipoExamenRNM8 ?
                                                    <Grid item xs={xsGrid8}>
                                                        <FormProvider {...methods}>
                                                            <InputSelect
                                                                name="idTipoExamenRNM"
                                                                label="Tipo Examen"
                                                                defaultValue=""
                                                                options={lsTipoRNM}
                                                                size={matchesXS ? 'small' : 'medium'}
                                                                bug={errors}
                                                            />
                                                        </FormProvider>
                                                    </Grid> : fechaExmaneFisico8 ?
                                                        <Grid item xs={xsGrid8}>
                                                            <FormProvider {...methods}>
                                                                <InputDatePicker
                                                                    label="fechaExamenFisico"
                                                                    name="fecha"
                                                                    defaultValue={new Date()}
                                                                />
                                                            </FormProvider>
                                                        </Grid> : <></>
                                            }

                                            <Grid item xs={xsGrid8}>
                                                <SelectOnChange
                                                    name="idProveedor"
                                                    label="Proveedor"
                                                    value={proveedor.proveedor8}
                                                    onChange={handleProveedor8}
                                                    options={lsProveedorCombo.lsProveedorCombo8}
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    bug={errors}
                                                />
                                            </Grid>
                                            <Grid item xs={xsGrid8}>
                                                <SelectOnChange
                                                    disabled
                                                    name="idCiudad"
                                                    label="Ciudad"
                                                    value={ciudad.ciudad8}
                                                    onChange={(e) => setCiudad({ ...ciudad, ciudad8: e.target.value })}
                                                    options={lsCiudad}
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    bug={errors}
                                                />
                                            </Grid>
                                            {/* NOVENA */}
                                            <Grid item xs={xsGrid9}>
                                                <SelectOnChange
                                                    name="idParaclinico"
                                                    label="Paraclínicos"
                                                    value={paraclinicos.paraclinicos9}
                                                    onChange={handleParaclinicos9}
                                                    options={lsEstudioParaclinico}
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    bug={errors}
                                                />
                                            </Grid>
                                            {tipoExamenLabor9 ?
                                                <Grid item xs={xsGrid9}>
                                                    <FormProvider {...methods}>
                                                        <InputSelect
                                                            name="idTipoExamenLaboratorio"
                                                            label="Tipo Examen"
                                                            defaultValue=""
                                                            options={lsLaboratorio}
                                                            size={matchesXS ? 'small' : 'medium'}
                                                            bug={errors}
                                                        />
                                                    </FormProvider>
                                                </Grid> : tipoExamenRNM9 ?
                                                    <Grid item xs={xsGrid9}>
                                                        <FormProvider {...methods}>
                                                            <InputSelect
                                                                name="idTipoExamenRNM"
                                                                label="Tipo Examen"
                                                                defaultValue=""
                                                                options={lsTipoRNM}
                                                                size={matchesXS ? 'small' : 'medium'}
                                                                bug={errors}
                                                            />
                                                        </FormProvider>
                                                    </Grid> : fechaExmaneFisico9 ?
                                                        <Grid item xs={xsGrid9}>
                                                            <FormProvider {...methods}>
                                                                <InputDatePicker
                                                                    label="fechaExamenFisico"
                                                                    name="fecha"
                                                                    defaultValue={new Date()}
                                                                />
                                                            </FormProvider>
                                                        </Grid> : <></>
                                            }
                                            <Grid item xs={xsGrid9}>
                                                <SelectOnChange
                                                    name="idProveedor"
                                                    label="Proveedor"
                                                    value={proveedor.proveedor9}
                                                    onChange={handleProveedor9}
                                                    options={lsProveedorCombo.lsProveedorCombo9}
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    bug={errors}
                                                />
                                            </Grid>
                                            <Grid item xs={xsGrid9}>
                                                <SelectOnChange
                                                    disabled
                                                    name="idCiudad"
                                                    label="Ciudad"
                                                    value={ciudad.ciudad9}
                                                    onChange={(e) => setCiudad({ ...ciudad, ciudad9: e.target.value })}
                                                    options={lsCiudad}
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    bug={errors}
                                                />
                                            </Grid>
                                            {/* DECIMA */}
                                            <Grid item xs={xsGrid10}>
                                                <SelectOnChange
                                                    name="idParaclinico"
                                                    label="Paraclínicos"
                                                    value={paraclinicos.paraclinicos10}
                                                    onChange={handleParaclinicos10}
                                                    options={lsEstudioParaclinico}
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    bug={errors}
                                                />
                                            </Grid>
                                            {tipoExamenLabor10 ?
                                                <Grid item xs={xsGrid10}>
                                                    <FormProvider {...methods}>
                                                        <InputSelect
                                                            name="idTipoExamenLaboratorio"
                                                            label="Tipo Examen"
                                                            defaultValue=""
                                                            options={lsLaboratorio}
                                                            size={matchesXS ? 'small' : 'medium'}
                                                            bug={errors}
                                                        />
                                                    </FormProvider>
                                                </Grid> : tipoExamenRNM10 ?
                                                    <Grid item xs={xsGrid10}>
                                                        <FormProvider {...methods}>
                                                            <InputSelect
                                                                name="idTipoExamenRNM"
                                                                label="Tipo Examen"
                                                                defaultValue=""
                                                                options={lsTipoRNM}
                                                                size={matchesXS ? 'small' : 'medium'}
                                                                bug={errors}
                                                            />
                                                        </FormProvider>
                                                    </Grid> : fechaExmaneFisico10 ?
                                                        <Grid item xs={xsGrid10}>
                                                            <FormProvider {...methods}>
                                                                <InputDatePicker
                                                                    label="fechaExamenFisico"
                                                                    name="fecha"
                                                                    defaultValue={new Date()}
                                                                />
                                                            </FormProvider>
                                                        </Grid> : <></>
                                            }
                                            <Grid item xs={xsGrid10}>
                                                <SelectOnChange
                                                    name="idProveedor"
                                                    label="Proveedor"
                                                    value={proveedor.proveedor10}
                                                    onChange={handleProveedor10}
                                                    options={lsProveedorCombo.lsProveedorCombo10}
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    bug={errors}
                                                />
                                            </Grid>
                                            <Grid item xs={xsGrid10}>
                                                <SelectOnChange
                                                    disabled
                                                    name="idCiudad"
                                                    label="Ciudad"
                                                    value={ciudad.ciudad10}
                                                    onChange={(e) => setCiudad({ ...ciudad, ciudad10: e.target.value })}
                                                    options={lsCiudad}
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    bug={errors}
                                                />
                                            </Grid>
                                        </Transitions>

                                        <Grid item xs={4}>
                                            <FormProvider {...methods}>
                                                <InputCheckBox
                                                    label="Asistio"
                                                    name="asistio"
                                                    size={30}
                                                    defaultValue={false}
                                                />
                                            </FormProvider>
                                        </Grid>

                                        <Grid item xs={4}>
                                            <FormProvider {...methods}>
                                                <InputCheckBox
                                                    disabled={
                                                        paraclinicos.paraclinicos1 === DefaultValue.ORDENES_FECHA_EXAM_FISICO ? false :
                                                            paraclinicos.paraclinicos2 === DefaultValue.ORDENES_FECHA_EXAM_FISICO ? false :
                                                                paraclinicos.paraclinicos3 === DefaultValue.ORDENES_FECHA_EXAM_FISICO ? false :
                                                                    paraclinicos.paraclinicos4 === DefaultValue.ORDENES_FECHA_EXAM_FISICO ? false :
                                                                        paraclinicos.paraclinicos5 === DefaultValue.ORDENES_FECHA_EXAM_FISICO ? false :
                                                                            paraclinicos.paraclinicos6 === DefaultValue.ORDENES_FECHA_EXAM_FISICO ? false :
                                                                                paraclinicos.paraclinicos7 === DefaultValue.ORDENES_FECHA_EXAM_FISICO ? false :
                                                                                    paraclinicos.paraclinicos8 === DefaultValue.ORDENES_FECHA_EXAM_FISICO ? false :
                                                                                        paraclinicos.paraclinicos9 === DefaultValue.ORDENES_FECHA_EXAM_FISICO ? false :
                                                                                            paraclinicos.paraclinicos10 === DefaultValue.ORDENES_FECHA_EXAM_FISICO ? false : true
                                                    }
                                                    label="Consentimiento Informado"
                                                    name="consentimientoInformado"
                                                    size={30}
                                                    defaultValue={false}
                                                />
                                            </FormProvider>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <FormProvider {...methods}>
                                                <InputText
                                                    multiline
                                                    rows={4}
                                                    defaultValue=""
                                                    fullWidth
                                                    name="observaciones"
                                                    label="Observaciones Generales"
                                                    size={matchesXS ? 'small' : 'medium'}
                                                    bug={errors}
                                                />
                                            </FormProvider>
                                        </Grid>
                                    </Grid>
                                </SubCard>
                            </Grid>
                        </Grid>
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
                </Fragment> : <Cargando />}
        </MainCard>
    );
};

export default UpdateOrdersIndividual;