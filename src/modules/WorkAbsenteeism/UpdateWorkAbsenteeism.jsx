// Import de Material-ui
import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery,
    Typography,
    Divider,
} from '@mui/material';

// Terceros
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FormProvider, useForm } from 'react-hook-form';

// Import del Proyecto
import Cargando from 'components/loading/Cargando';
import { PutWorkAbsenteeism } from 'formatdata/WorkAbsenteeismForm';
import { GetAllBySegAfectado, GetAllBySegAgrupado } from 'api/clients/OthersClients';
import SelectOnChange from 'components/input/SelectOnChange';
import InputDatePick from 'components/input/InputDatePick';
import { FormatDate } from 'components/helpers/Format';
import Accordion from 'components/accordion/Accordion';
import PhotoModel from 'components/form/PhotoModel';
import { SNACKBAR_OPEN } from 'store/actions';
import {  GetByIdWorkAbsenteeism, UpdateWorkAbsenteeisms } from 'api/clients/WorkAbsenteeismClient';
import { GetAllBySubTipoCatalogo, GetAllByTipoCatalogo, GetAllCatalog } from 'api/clients/CatalogClient';
import { GetAllCompany } from 'api/clients/CompanyClient';
import InputText from 'components/input/InputText';
import InputSelect from 'components/input/InputSelect';
import { Message, TitleButton, CodCatalogo } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import SubCard from 'ui-component/cards/SubCard';
import InputOnChange from 'components/input/InputOnChange';

import DomainTwoToneIcon from '@mui/icons-material/DomainTwoTone';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import RadioButtonCheckedTwoToneIcon from '@mui/icons-material/RadioButtonCheckedTwoTone';
import UserCountCard from 'ui-component/cards/UserCountCard';
import AccountCircleTwoTone from '@mui/icons-material/AccountCircleTwoTone';
import { GetAllSegmentoAgrupado } from 'api/clients/OthersClients';
import { GetByIdCIE11 } from 'api/clients/CIE11Client';

// Audio
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = 'es-ES';

const UpdateWorkAbsenteeism = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const navigate = useNavigate();
    const { id } = useParams();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [document, setDocument] = useState('');
    const [catalog, setCatalog] = useState([]);
    const [company, setCompany] = useState([]);

    const [lsSegmentoAgrupado, setLsSegmentoAgrupado] = useState([]);
    const [segmentoAgrupado, setSegmentoAgrupado] = useState('');
    const [lsSegmentoAfectado, setLsSegmentoAfectado] = useState([]);
    const [segmentoAfectado, setSegmentoAfectado] = useState('');
    const [lsSubsegmento, setLsSubsegmento] = useState([]);

    const [dx, setDx] = useState('');
    const [lsCIE11, setLsCIE11] = useState([]);

    const [departa, setDeparta] = useState('');
    const [lsDeparta, setLsDeparta] = useState([]);
    const [departamentoIPS, setDepartaMedico] = useState('');
    const [diasSinLaborar, setDiasSinLaborar] = useState('');

    const [municipio, setMunicipioE] = useState('');
    const [lsMunicipio, setLsMunicipioE] = useState([]);
    const [municipioMedico, setMunicipioMedico] = useState('');
    const [lsMunicipioMedico, setLsMunicipioMedico] = useState([]);

    const [lsCodigoFilterDpto, setCodigoFilterDpto] = useState([]);

    const [lsTipoInca, setLsTipoInca] = useState([]);
    const [lsEstadoCaso, setLsEstadoCaso] = useState([]);
    const [lsIncapacidad, setLsIncapacidad] = useState([]);
    const [lsContingencia, setLsContingencia] = useState([]);
    const [lsTipoSoporte, setLsTipoSoporte] = useState([]);
    const [lsCategoria, setLsCategoria] = useState([]);
    const [lsTipoAtencion, setLsTipoAtencion] = useState([]);
    const [lsRedExpide, setLsRedExpide] = useState([]);
    const [lsCumplimientoRequisito, setLsCumplimientoRequisito] = useState([]);

    const [lsWorkAbsenteeism, setLsWorkAbsenteeism] = useState([]);

    const [imgSrc, setImgSrc] = useState(null);

    const [nombres, setNombres] = useState('');
    const [email, setEmail] = useState('');
    const [celular, setCelular] = useState('');
    const [escolaridad, setEscolaridad] = useState('');
    const [empresa, setEmpresa] = useState('');
    const [sede, setSede] = useState('');
    const [fechaNaci, setFechaNaci] = useState(null);
    const [genero, setGenero] = useState('');
    const [estadoCivil, setEstadoCivil] = useState('');
    const [contacto, setContacto] = useState('');
    const [telefonoContacto, setTelefonoContacto] = useState('');
    const [fechaContrato, setFechaContrato] = useState(null);
    const [tipoContrato, setTipoContrato] = useState('');
    const [payStatus, setPayStatus] = useState('');
    const [type, setType] = useState('');
    const [rosterPosition, setRosterPosition] = useState('');
    const [generalPosition, setGeneralPosition] = useState('');
    const [departamento, setDepartamento] = useState('');
    const [area, setArea] = useState('');
    const [subArea, setSubArea] = useState('');
    const [grupo, setGrupo] = useState('');
    const [turno, setTurno] = useState('');
    const [direccionResidencia, setDireccionResidencia] = useState('');
    const [dptoResidencia, setDptoResidencia] = useState('');
    const [municipioResidencia, setMunicipioResidencia] = useState('');
    const [municipioNacido, setMunicipioNacido] = useState('');
    const [dptoNacido, setDptoNacido] = useState('');
    const [eps, setEps] = useState('');
    const [afp, setAfp] = useState('');

    const [fechaExpedicion, setFechaExpedicion] = useState(new Date());
    const [fechaInicio, setFechaInicio] = useState(null);
    const [fechaFin, setFechaFin] = useState(null);
    const [fechaModifica, setFechaModifica] = useState(null);

    const [isListening, setIsListening] = useState(false);
    const [note, setNote] = useState(null);

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

    const methods = useForm();
    /* { resolver: yupResolver(validationSchema) } */
    const { handleSubmit, errors, reset } = methods;

    async function GetAll() {
        try {
            const lsServerAll = await GetByIdWorkAbsenteeism(id);
            if (lsServerAll.status === 200) {
                setLsWorkAbsenteeism(lsServerAll.data);
                handleLoadingDocument(lsServerAll.data.cedula);
                setFechaExpedicion(lsServerAll.data.fechaExpedicion); setFechaInicio(lsServerAll.data.fechaInicio);
                setFechaFin(lsServerAll.data.fechaFin); setFechaModifica(lsServerAll.data.fechaModificacion);
                setDepartaMedico(lsServerAll.data.departamentoIPS);
                setDeparta(lsServerAll.data.departamento);
                setSegmentoAgrupado(lsServerAll.data.segmentoAgrupado);
                setSegmentoAfectado(lsServerAll.data.segmentoAfectado);
                setDx(lsServerAll.data.dx);
                setDiasSinLaborar(lsServerAll.data.diasSinLaborar);

                const lsServerCIE11 = await GetByIdCIE11(lsServerAll.data.dx);
                if (lsServerCIE11.status === 200) {
                    var resultCIE11 = [{ value: lsServerCIE11.data.id, label: lsServerCIE11.data.dx }]
                    setLsCIE11(resultCIE11);
                }

                const lsServerSegAfectado = await GetAllBySegAgrupado(lsServerAll.data.segmentoAgrupado, 0, 0);
                var resultSegAfectado = lsServerSegAfectado.data.entities.map((item) => ({
                    value: item.id,
                    label: item.descripcion
                }));
                setLsSegmentoAfectado(resultSegAfectado);

                const lsServerSubsegmento = await GetAllBySegAfectado(lsServerAll.data.segmentoAfectado, 0, 0);
                var resultSubsegmento = lsServerSubsegmento.data.entities.map((item) => ({
                    value: item.id,
                    label: item.descripcion
                }));
                setLsSubsegmento(resultSubsegmento);
            }

            const lsServerSegAgrupado = await GetAllSegmentoAgrupado(0, 0);
            var resultSegAgrupado = lsServerSegAgrupado.data.entities.map((item) => ({
                value: item.id,
                label: item.nombre
            }));
            setLsSegmentoAgrupado(resultSegAgrupado);

            const lsServerCatalog = await GetAllCatalog(0, 0);
            var resultCatalogo = lsServerCatalog.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setCatalog(resultCatalogo);

            const lsServerSegmentoAgrupado = await GetAllSegmentoAgrupado(0, 0);
            var resultSegmentoAgrupadoo = lsServerSegmentoAgrupado.data.entities.map((item) => ({
                value: item.id,
                label: item.nombre
            }));
            setLsSegmentoAgrupado(resultSegmentoAgrupadoo);

            const lsServerDepartamento = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Departamento);
            var resultDepartamento = lsServerDepartamento.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsDeparta(resultDepartamento);
            setCodigoFilterDpto(lsServerDepartamento.data.entities);

            const lsServerIncapacidad = await GetAllByTipoCatalogo(0, 0, CodCatalogo.AUSLAB_INC);
            var resultIncapacidad = lsServerIncapacidad.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsIncapacidad(resultIncapacidad);

            const lsServerTipoSoporte = await GetAllByTipoCatalogo(0, 0, CodCatalogo.AUSLAB_TISOPOR);
            var resultTipoSoporte = lsServerTipoSoporte.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsTipoSoporte(resultTipoSoporte);

            const lsServerCategoria = await GetAllByTipoCatalogo(0, 0, CodCatalogo.AUSLAB_CATEGORIA);
            var resultCategoria = lsServerCategoria.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsCategoria(resultCategoria);

            const lsServerTipoAtencion = await GetAllByTipoCatalogo(0, 0, CodCatalogo.AUSLAB_TIPOATEN);
            var resultTipoAtencion = lsServerTipoAtencion.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsTipoAtencion(resultTipoAtencion);

            const lsServerRedExpide = await GetAllByTipoCatalogo(0, 0, CodCatalogo.AUSLAB_REDEXP);
            var resultRedExpide = lsServerRedExpide.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsRedExpide(resultRedExpide);

            const lsServerCumplimientoRequisito = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Opciones_SINO);
            var resultCumplimientoRequisito = lsServerCumplimientoRequisito.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsCumplimientoRequisito(resultCumplimientoRequisito);

            const lsServerTipoInca = await GetAllByTipoCatalogo(0, 0, CodCatalogo.AUSLAB_TIPOINCA);
            var resultTipoInca = lsServerTipoInca.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsTipoInca(resultTipoInca);

            const lsServerContingencia = await GetAllByTipoCatalogo(0, 0, CodCatalogo.AUSLAB_CONT);
            var resultContingencia = lsServerContingencia.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsContingencia(resultContingencia);

            const lsServerEstadoCaso = await GetAllByTipoCatalogo(0, 0, CodCatalogo.AUSLAB_ESTCAS);
            var resultEstadoCaso = lsServerEstadoCaso.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsEstadoCaso(resultEstadoCaso);

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

    const handleLoadingDocument = async (idEmployee) => {
        try {
            var lsQuestionnaire = await GetByIdEmployee(idEmployee);
            if (lsQuestionnaire.status === 200) {
                setImgSrc(lsQuestionnaire.data.imagenUrl);
                setDocument(lsQuestionnaire.data.documento);
                setNombres(lsQuestionnaire.data.nombres);
                setEmail(lsQuestionnaire.data.email);
                setCelular(lsQuestionnaire.data.celular);
                setEscolaridad(lsQuestionnaire.data.escolaridad);
                setEmpresa(lsQuestionnaire.data.empresa);
                setSede(lsQuestionnaire.data.sede);
                setFechaNaci(lsQuestionnaire.data.fechaNaci);
                setGenero(lsQuestionnaire.data.genero);
                setEstadoCivil(lsQuestionnaire.data.estadoCivil);
                setContacto(lsQuestionnaire.data.contacto);
                setTelefonoContacto(lsQuestionnaire.data.telefonoContacto);
                setFechaContrato(lsQuestionnaire.data.fechaContrato);
                setTipoContrato(lsQuestionnaire.data.tipoContrato);
                setPayStatus(lsQuestionnaire.data.payStatus);
                setType(lsQuestionnaire.data.type);
                setRosterPosition(lsQuestionnaire.data.rosterPosition);
                setGeneralPosition(lsQuestionnaire.data.generalPosition);
                setDepartamento(lsQuestionnaire.data.departamento);
                setArea(lsQuestionnaire.data.area);
                setSubArea(lsQuestionnaire.data.subArea);
                setGrupo(lsQuestionnaire.data.grupo);
                setTurno(lsQuestionnaire.data.turno);
                setDireccionResidencia(lsQuestionnaire.data.direccionResidencia);
                setDptoResidencia(lsQuestionnaire.data.dptoResidencia);
                setMunicipioResidencia(lsQuestionnaire.data.municipioResidencia);
                setMunicipioNacido(lsQuestionnaire.data.municipioNacido);
                setDptoNacido(lsQuestionnaire.data.dptoNacido);
                setEps(lsQuestionnaire.data.eps);
                setAfp(lsQuestionnaire.data.afp);
            }
        } catch (error) {
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: `${Message.ErrorDeDatos}`,
                variant: 'alert',
                alertSeverity: 'error',
                close: false,
                transition: 'SlideUp'
            })
        }
    }

    const handleChangeDepartamentoIncapa = async (event) => {
        try {
            setDeparta(event.target.value);

            var lsResulCode = String(lsCodigoFilterDpto.filter(code => code.idCatalogo == event.target.value).map(code => code.codigo));
            var lsServerDepartamento = await GetAllBySubTipoCatalogo(0, 0, lsResulCode, 2);

            var resultMunicipio = lsServerDepartamento.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsMunicipioE(resultMunicipio);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChangeDepartamentoMedico = async (event) => {
        try {
            setDepartaMedico(event.target.value);

            var lsResulCode = String(lsCodigoFilterDpto.filter(code => code.idCatalogo == event.target.value).map(code => code.codigo));
            var lsServerDepartamento = await GetAllBySubTipoCatalogo(0, 0, lsResulCode, 2);

            var resultMunicipio = lsServerDepartamento.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsMunicipioMedico(resultMunicipio);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChangeSegAgrupado = async (event) => {
        try {
            setLsSegmentoAfectado([]); setLsSubsegmento([]); setSegmentoAfectado('');
            setSegmentoAfectado(''); setSegmentoAgrupado('');
            setSegmentoAgrupado(event.target.value);

            const lsServerSegAfectado = await GetAllBySegAgrupado(event.target.value, 0, 0);
            var resultSegAfectado = lsServerSegAfectado.data.entities.map((item) => ({
                value: item.id,
                label: item.descripcion
            }));
            setLsSegmentoAfectado(resultSegAfectado);
        } catch (error) {
            console.log(error);
            setLsSegmentoAfectado([]);
        }
    }

    const handleChangeSegAfectado = async (event) => {
        try {
            setLsSubsegmento([]);
            setSegmentoAfectado(event.target.value);

            const lsServerSubsegmento = await GetAllBySegAfectado(event.target.value, 0, 0);
            var resultSubsegmento = lsServerSubsegmento.data.entities.map((item) => ({
                value: item.id,
                label: item.descripcion
            }));
            setLsSubsegmento(resultSubsegmento);
        } catch (error) {
            console.log(error);
            setLsSubsegmento([]);
        }
    }

    const handleChangeDx = async (event) => {
        try {
            setDx(event.target.value);

            const lsServerCIE11 = await GetByIdCIE11(event.target.value);
            if (lsServerCIE11.status === 200) {
                var resultCIE11 = [{ value: lsServerCIE11.data.id, label: lsServerCIE11.data.dx }]
                setLsCIE11(resultCIE11);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleFechaFin = (event) => {
        setFechaFin(event);

        let fechaIni = new Date(fechaInicio);
        let fechaFinn = new Date(event);

        let milisegundosDia = 24 * 60 * 60 * 1000;
        let milisegundosTranscurridos = Math.abs(fechaIni.getTime() - fechaFinn.getTime());
        let diasTranscurridos = Math.round(milisegundosTranscurridos / milisegundosDia);
        setDiasSinLaborar(diasTranscurridos);
    }


    useEffect(() => {
        GetAll();
        handleListen();
    }, [isListening])

    const handleClick = async (datos) => {
        try {
            const usuario = "Manuel Vásquez";
            const dateNow = FormatDate(new Date());

            const municipioExpide_DATA = municipio == '' ? datos.ciudadExpedicion : municipio;
            const municipioIPS_DATA = municipioMedico == '' ? datos.ciudadIPS : municipioMedico;

            const DataToUpdate = PutWorkAbsenteeism(id, document, datos.incapacidad, datos.nroIncapacidad, FormatDate(fechaExpedicion), departa,
                municipioExpide_DATA, datos.tipoIncapacidad, datos.contingencia, FormatDate(fechaInicio), FormatDate(fechaFin), diasSinLaborar,
                dx, datos.dxFinal, datos.estadoCaso, segmentoAgrupado, segmentoAfectado, datos.subsegmento, datos.idTipoSoporte, datos.idCategoria,

                datos.proveedor, departamentoIPS, municipioIPS_DATA, datos.nombreProfesional, datos.especialidad, datos.registroProfesional, datos.tipoAtencion,
                datos.cumplimientoRequisito, datos.expideInCapacidad, datos.observacionCumplimiento,

                datos.observacion, usuario, FormatDate(fechaModifica), usuario, dateNow, tipoContrato, type, dateNow, usuario);

            console.log("DataToUpdate = ", DataToUpdate);

            if (Object.keys(datos.length !== 0)) {
                const result = await UpdateWorkAbsenteeisms(DataToUpdate);
                if (result.status === 200) {
                    dispatch({
                        type: SNACKBAR_OPEN,
                        open: true,
                        message: `${Message.Actualizar}`,
                        variant: 'alert',
                        alertSeverity: 'success',
                        close: false,
                        transition: 'SlideUp'
                    })
                }
            }
        } catch (error) {
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: `${error}`,
                variant: 'alert',
                alertSeverity: 'error',
                close: false,
                transition: 'SlideUp'
            })
        }
    };

    const dias = 200;

    return (
        <MainCard>
            {lsWorkAbsenteeism.length != 0 ? <>
                <SubCard darkTitle title={<><Typography variant="h4">DATOS DEL PACIENTE</Typography></>}>
                    <Grid container xs={12} spacing={2} sx={{ pb: 3, pt: 3 }}>
                        <Grid item xs={3}>
                            <PhotoModel
                                disabledCapture
                                disabledDelete
                                EstadoImg={imgSrc}
                            />
                        </Grid>
                        <Grid container spacing={2} item xs={9}>
                            <Grid item xs={4}>
                                <InputOnChange
                                    label="N° Documento"
                                    onChange={(e) => setDocument(e?.target.value)}
                                    value={document}
                                    disabled
                                    size={matchesXS ? 'small' : 'medium'}
                                    required={true}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <InputOnChange
                                    label="Nombres"
                                    value={nombres}
                                    onChange={(e) => setNombres(e?.target.value)}
                                    disabled
                                    size={matchesXS ? 'small' : 'medium'}
                                    required={true}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <InputOnChange
                                    label="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e?.target.value)}
                                    disabled
                                    size={matchesXS ? 'small' : 'medium'}
                                    required={true}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <InputOnChange
                                    label="Celular"
                                    value={celular}
                                    onChange={(e) => setCelular(e?.target.value)}
                                    disabled
                                    size={matchesXS ? 'small' : 'medium'}
                                    required={true}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <SelectOnChange
                                    name="escolaridad"
                                    label="Escolaridad"
                                    disabled
                                    options={catalog}
                                    value={escolaridad}
                                    onChange={(e) => setEscolaridad(e?.target.value)}
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <SelectOnChange
                                    name="empresa"
                                    label="Empresa"
                                    disabled
                                    options={company}
                                    value={empresa}
                                    onChange={(e) => setEmpresa(e?.target.value)}
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <SelectOnChange
                                    name="sede"
                                    label="Sede"
                                    disabled
                                    options={catalog}
                                    value={sede}
                                    onChange={(e) => setSede(e?.target.value)}
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <InputDatePick
                                    label="Fecha de Nacimiento"
                                    value={fechaNaci}
                                    disabled
                                    onChange={(e) => setFechaNaci(e)}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <SelectOnChange
                                    name="genero"
                                    label="Genero"
                                    disabled
                                    options={catalog}
                                    value={genero}
                                    onChange={(e) => setGenero(e?.target.value)}
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <SelectOnChange
                                    name="estadoCivil"
                                    label="Estado Civil"
                                    disabled
                                    options={catalog}
                                    value={estadoCivil}
                                    onChange={(e) => setEstadoCivil(e?.target.value)}
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <InputOnChange
                                    label="Contacto"
                                    value={contacto}
                                    onChange={(e) => setContacto(e?.target.value)}
                                    disabled
                                    size={matchesXS ? 'small' : 'medium'}
                                    required={true}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <InputOnChange
                                    label="Teléfono de Contacto"
                                    value={telefonoContacto}
                                    onChange={(e) => setTelefonoContacto(e?.target.value)}
                                    disabled
                                    size={matchesXS ? 'small' : 'medium'}
                                    required={true}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </SubCard>

                <Accordion title={<><DomainTwoToneIcon fontSize="small" color="primary" sx={{ mr: 0.5 }} />
                    <Typography variant="subtitle1" color="inherit">Ver mas...</Typography></>}>
                    <Grid item xs={12} sx={{ pt: 2, pb: 2 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <AnimateButton>
                                    <InputDatePick
                                        label="Fecha de Contrato"
                                        value={fechaContrato}
                                        disabled
                                        onChange={(e) => setFechaContrato(e)}
                                    />
                                </AnimateButton>
                            </Grid>
                            <Grid item xs={3}>
                                <AnimateButton>
                                    <SelectOnChange
                                        name="tipoContrato"
                                        label="Tipo de Contrato"
                                        disabled
                                        options={catalog}
                                        value={tipoContrato}
                                        onChange={(e) => setTipoContrato(e?.target.value)}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </AnimateButton>
                            </Grid>
                            <Grid item xs={3}>
                                <AnimateButton>
                                    <SelectOnChange
                                        name="estado"
                                        label="Estado"
                                        disabled
                                        options={catalog}
                                        value={payStatus}
                                        onChange={(e) => setPayStatus(e?.target.value)}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </AnimateButton>
                            </Grid>
                            <Grid item xs={3}>
                                <AnimateButton>
                                    <SelectOnChange
                                        name="Rol"
                                        label="Rol"
                                        disabled
                                        options={catalog}
                                        value={type}
                                        onChange={(e) => setType(e?.target.value)}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </AnimateButton>
                            </Grid>
                            <Grid item xs={3}>
                                <AnimateButton>
                                    <SelectOnChange
                                        name="rosterPosition"
                                        label="Roster Position"
                                        disabled
                                        options={catalog}
                                        value={rosterPosition}
                                        onChange={(e) => setRosterPosition(e?.target.value)}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </AnimateButton>
                            </Grid>
                            <Grid item xs={3}>
                                <AnimateButton>
                                    <SelectOnChange
                                        name="generalPosition"
                                        label="General Position"
                                        disabled
                                        options={catalog}
                                        value={generalPosition}
                                        onChange={(e) => setGeneralPosition(e?.target.value)}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </AnimateButton>
                            </Grid>
                            <Grid item xs={3}>
                                <AnimateButton>
                                    <SelectOnChange
                                        name="Departamento"
                                        label="Departamento"
                                        disabled
                                        options={catalog}
                                        value={departamento}
                                        onChange={(e) => setDepartamento(e?.target.value)}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </AnimateButton>
                            </Grid>
                            <Grid item xs={3}>
                                <AnimateButton>
                                    <SelectOnChange
                                        name="Area"
                                        label="Area"
                                        disabled
                                        options={catalog}
                                        value={area}
                                        onChange={(e) => setArea(e?.target.value)}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </AnimateButton>
                            </Grid>
                            <Grid item xs={3}>
                                <AnimateButton>
                                    <SelectOnChange
                                        name="Subarea"
                                        label="Subarea"
                                        disabled
                                        options={catalog}
                                        value={subArea}
                                        onChange={(e) => setSubArea(e?.target.value)}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </AnimateButton>
                            </Grid>
                            <Grid item xs={3}>
                                <AnimateButton>
                                    <SelectOnChange
                                        name="Grupo"
                                        label="Grupo"
                                        disabled
                                        options={catalog}
                                        value={grupo}
                                        onChange={(e) => setGrupo(e?.target.value)}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </AnimateButton>
                            </Grid>
                            <Grid item xs={3}>
                                <AnimateButton>
                                    <SelectOnChange
                                        name="Turno"
                                        label="Turno"
                                        disabled
                                        options={catalog}
                                        value={turno}
                                        onChange={(e) => setTurno(e?.target.value)}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </AnimateButton>
                            </Grid>
                            <Grid item xs={3}>
                                <AnimateButton>
                                    <InputOnChange
                                        label="Dirección de Residencia"
                                        value={direccionResidencia}
                                        onChange={(e) => setDireccionResidencia(e?.target.value)}
                                        disabled
                                        size={matchesXS ? 'small' : 'medium'}
                                        required={true}
                                    />
                                </AnimateButton>
                            </Grid>
                            <Grid item xs={3}>
                                <AnimateButton>
                                    <SelectOnChange
                                        name="dptoResidencia"
                                        label="Departamento de Residencia"
                                        disabled
                                        options={catalog}
                                        value={dptoResidencia}
                                        onChange={(e) => setDptoResidencia(e?.target.value)}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </AnimateButton>
                            </Grid>
                            <Grid item xs={3}>
                                <AnimateButton>
                                    <SelectOnChange
                                        name="municipioResidencia"
                                        label="Municipio de Residencia"
                                        disabled
                                        options={catalog}
                                        value={municipioResidencia}
                                        onChange={(e) => setMunicipioResidencia(e?.target.value)}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </AnimateButton>
                            </Grid>
                            <Grid item xs={3}>
                                <AnimateButton>
                                    <SelectOnChange
                                        name="municipioNacido"
                                        label="Municipio de Nacimiento"
                                        disabled
                                        options={catalog}
                                        value={municipioNacido}
                                        onChange={(e) => setMunicipioNacido(e?.target.value)}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </AnimateButton>
                            </Grid>
                            <Grid item xs={3}>
                                <AnimateButton>
                                    <SelectOnChange
                                        name="dptoNacido"
                                        label="Departamento de Nacimiento"
                                        disabled
                                        options={catalog}
                                        value={dptoNacido}
                                        onChange={(e) => setDptoNacido(e?.target.value)}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </AnimateButton>
                            </Grid>
                            <Grid item xs={3}>
                                <AnimateButton>
                                    <SelectOnChange
                                        name="EPS"
                                        label="EPS"
                                        disabled
                                        options={catalog}
                                        value={eps}
                                        onChange={(e) => setEps(e?.target.value)}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </AnimateButton>
                            </Grid>
                            <Grid item xs={3}>
                                <AnimateButton>
                                    <SelectOnChange
                                        name="AFP"
                                        label="AFP"
                                        disabled
                                        options={catalog}
                                        value={afp}
                                        onChange={(e) => setAfp(e?.target.value)}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Accordion>
                <Divider />

                <Typography sx={{ pb: 2, pt: 3 }} variant="h4">DATOS DE LA EMPRESA QUE EXPIDE</Typography>

                <Grid container spacing={2} sx={{ pb: 2 }}>
                    <Grid item xs={4}>
                        <FormProvider {...methods}>
                            <InputSelect
                                name="incapacidad"
                                label="Incapacidad"
                                defaultValue={lsWorkAbsenteeism.incapacidad}
                                options={lsIncapacidad}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                    <Grid item xs={4}>
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue={lsWorkAbsenteeism.nroIncapacidad}
                                fullWidth
                                name="nroIncapacidad"
                                label="Nro. de Incapacidad"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                    <Grid item xs={4}>
                        <InputDatePick
                            label="Fecha de Expedición"
                            value={fechaExpedicion}
                            onChange={(e) => setFechaExpedicion(e)}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <SelectOnChange
                            name="departamento"
                            label="Departamento"
                            options={lsDeparta}
                            size={matchesXS ? 'small' : 'medium'}
                            value={departa}
                            onChange={handleChangeDepartamentoIncapa}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        {lsMunicipio.length != 0 ? (
                            <SelectOnChange
                                name="ciudadExpedicion"
                                label="Ciudad de Expedición"
                                value={municipio}
                                options={lsMunicipio}
                                onChange={(e) => setMunicipioE(e.target.value)}
                                size={matchesXS ? 'small' : 'medium'}
                            />
                        ) : (
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="ciudadExpedicion"
                                    label="Ciudad de Expedición"
                                    disabled
                                    defaultValue={lsWorkAbsenteeism.ciudadExpedicion}
                                    options={catalog}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        )}
                    </Grid>
                </Grid>

                <Typography sx={{ pb: 2, pt: 3 }} variant="h4">DATOS DE INCAPACIDAD O LICENCIA</Typography>

                <Grid container spacing={2} sx={{ pb: 2 }}>
                    <Grid item xs={2.4}>
                        <FormProvider {...methods}>
                            <InputSelect
                                name="tipoIncapacidad"
                                label="Tipo de Incapacidad"
                                defaultValue={lsWorkAbsenteeism.tipoIncapacidad}
                                options={lsTipoInca}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                    <Grid item xs={2.4}>
                        <FormProvider {...methods}>
                            <InputSelect
                                name="contingencia"
                                label="Contingencia"
                                defaultValue={lsWorkAbsenteeism.contingencia}
                                options={lsContingencia}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                    <Grid item xs={2.4}>
                        <InputDatePick
                            label="Fecha de Inicio"
                            value={fechaInicio}
                            onChange={(e) => setFechaInicio(e)}
                        />
                    </Grid>
                    <Grid item xs={2.4}>
                        <InputDatePick
                            label="Fecha Fin"
                            value={fechaFin}
                            onChange={handleFechaFin}
                        />
                    </Grid>
                    <Grid item xs={2.4}>
                        <InputOnChange
                            defaultValue=""
                            fullWidth
                            disabled
                            name="diasSinLaborar"
                            label="Días de Incapacidad"
                            onChange={(e) => setDiasSinLaborar(e.target.event)}
                            value={diasSinLaborar}
                            size={matchesXS ? 'small' : 'medium'}
                        />
                    </Grid>
                    <Grid item xs={2.4}>
                        <InputOnChange
                            label="Código Dx"
                            /* onKeyDown={handleChangeDx} */
                            onChange={handleChangeDx}
                            value={dx}
                            size={matchesXS ? 'small' : 'medium'}
                            required={true}
                        />
                    </Grid>
                    <Grid item xs={9.6}>
                        <FormProvider {...methods}>
                            <InputSelect
                                name="dxFinal"
                                label="Diagnóstico"
                                defaultValue={lsWorkAbsenteeism.dxFinal}
                                options={lsCIE11}
                                disabled={lsCIE11.length != 0 ? false : true}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                    <Grid item xs={4}>
                        <FormProvider {...methods}>
                            <InputSelect
                                name="estadoCaso"
                                label="Estado de Caso"
                                defaultValue={lsWorkAbsenteeism.estadoCaso}
                                options={lsEstadoCaso}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                    <Grid item xs={4}>
                        <SelectOnChange
                            name="segmentoAgrupado"
                            label="Segmento Agrupado"
                            options={lsSegmentoAgrupado}
                            size={matchesXS ? 'small' : 'medium'}
                            value={segmentoAgrupado}
                            onChange={handleChangeSegAgrupado}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <SelectOnChange
                            name="segmentoAfectado"
                            label="Segmento Afectado"
                            options={lsSegmentoAfectado}
                            size={matchesXS ? 'small' : 'medium'}
                            value={segmentoAfectado}
                            disabled={lsSegmentoAfectado.length != 0 ? false : true}
                            onChange={handleChangeSegAfectado}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <FormProvider {...methods}>
                            <InputSelect
                                name="subsegmento"
                                label="Subsegmento"
                                defaultValue={lsWorkAbsenteeism.subsegmento}
                                options={lsSubsegmento}
                                disabled={lsSubsegmento.length != 0 ? false : true}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                    <Grid item xs={4}>
                        <FormProvider {...methods}>
                            <InputSelect
                                name="idTipoSoporte"
                                label="Tipo de Soporte"
                                defaultValue={lsWorkAbsenteeism.idTipoSoporte}
                                options={lsTipoSoporte}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                    <Grid item xs={4}>
                        <FormProvider {...methods}>
                            <InputSelect
                                name="idCategoria"
                                label="Categoria"
                                defaultValue={lsWorkAbsenteeism.idCategoria}
                                options={lsCategoria}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                </Grid>

                <Typography sx={{ pb: 2, pt: 3 }} variant="h4">DATOS DEL MÉDICO O IPS PRESTADORA DEL SERVICIO</Typography>

                <Grid container spacing={2} sx={{ pb: 2 }}>
                    <Grid item xs={4.8}>
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue={lsWorkAbsenteeism.proveedor}
                                fullWidth
                                name="proveedor"
                                label="Proveedor"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                    <Grid item xs={2.4}>
                        <SelectOnChange
                            name="departamentoIPS"
                            label="Departamento"
                            options={lsDeparta}
                            size={matchesXS ? 'small' : 'medium'}
                            value={departamentoIPS}
                            onChange={handleChangeDepartamentoMedico}
                        />
                    </Grid>
                    <Grid item xs={2.4}>
                        {lsMunicipioMedico.length != 0 ? (
                            <SelectOnChange
                                name="ciudadIPS"
                                label="CiudadIPS"
                                value={municipioMedico}
                                options={lsMunicipioMedico}
                                onChange={(e) => setMunicipioMedico(e.target.value)}
                                size={matchesXS ? 'small' : 'medium'}
                            />
                        ) : (
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="ciudadIPS"
                                    label="Ciudad"
                                    defaultValue={lsWorkAbsenteeism.ciudadIPS}
                                    options={catalog}
                                    disabled
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        )}
                    </Grid>
                    <Grid item xs={2.4}>
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue={lsWorkAbsenteeism.nombreProfesional}
                                fullWidth
                                name="nombreProfesional"
                                label="Nombre de Profesional"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                    <Grid item xs={2.4}>
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue={lsWorkAbsenteeism.especialidad}
                                fullWidth
                                name="especialidad"
                                label="Profesión/Especialidad"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                    <Grid item xs={2.4}>
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue={lsWorkAbsenteeism.registroProfesional}
                                fullWidth
                                name="registroProfesional"
                                label="Reg. Profesional"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                    <Grid item xs={2.4}>
                        <FormProvider {...methods}>
                            <InputSelect
                                name="tipoAtencion"
                                label="Tipo de Atención"
                                defaultValue={lsWorkAbsenteeism.tipoAtencion}
                                options={lsTipoAtencion}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                    <Grid item xs={2.4}>
                        <FormProvider {...methods}>
                            <InputSelect
                                name="cumplimientoRequisito"
                                label="Cumplimiento Requisito"
                                defaultValue={lsWorkAbsenteeism.cumplimientoRequisito}
                                options={lsCumplimientoRequisito}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                    <Grid item xs={2.4}>
                        <FormProvider {...methods}>
                            <InputSelect
                                name="expideInCapacidad"
                                label="Red que expide"
                                defaultValue={lsWorkAbsenteeism.expideInCapacidad}
                                options={lsRedExpide}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                    <Grid item xs={12}>
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue={lsWorkAbsenteeism.observacionCumplimiento}
                                fullWidth
                                name="observacionCumplimiento"
                                label="Observacion Cumplimiento"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                                multiline
                                rows={4}
                            />
                        </FormProvider>
                    </Grid>
                </Grid>

                <Typography sx={{ pb: 2, pt: 3 }} variant="h4">OBSERVACIÓN/DESCRIPCIÓN DE LA NOVEDAD</Typography>

                <Grid container spacing={2} sx={{ pb: 2 }}>
                    <Grid item xs={12}>
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue={lsWorkAbsenteeism.observacion}
                                fullWidth
                                name="observacion"
                                label="Observación/Descripción"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                                multiline
                                rows={4}
                            />
                        </FormProvider>
                    </Grid>
                    <Grid item xs={4}>
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue={lsWorkAbsenteeism.usuarioModificacion}
                                fullWidth
                                name="usuarioModificacion"
                                label="Usuario Modifica"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                    <Grid item xs={4}>
                        <InputDatePick
                            label="Fecha de Modificicación"
                            value={fechaModifica}
                            disabled
                            onChange={(e) => setFechaModifica(e)}
                        />
                    </Grid>
                </Grid>

                <Typography sx={{ pb: 2, pt: 3 }} variant="h4">MONITOR DE EVENTOS</Typography>

                <Grid container spacing={2} sx={{ pb: 2, pl: 4 }}>
                    <Grid item xs={2}>
                        <RadioButtonCheckedTwoToneIcon sx={{ color: theme.palette.warning.main }} />
                        <Typography variant="h6">De 75 a 90 Días</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <RadioButtonCheckedTwoToneIcon sx={{ color: theme.palette.warning.dark }} />
                        <Typography variant="h6">De 90 a 180 Días</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <RadioButtonCheckedTwoToneIcon color='error' />
                        <Typography variant="h6">{'> 180 Días'}</Typography>
                    </Grid>
                </Grid>

                <Grid container spacing={2} sx={{ pb: 2, pt: 3, pl: 4 }}>
                    <Grid item xs={6}>
                        <UserCountCard
                            primary="TOTAL DÍAS ACUMULADO EN INCAPACIDAD"
                            secondary="0"
                            iconPrimary={AccountCircleTwoTone}
                            color={dias <= 90 ? theme.palette.warning.main : dias <= 180 ? theme.palette.warning.dark : theme.palette.error.main}
                        />
                    </Grid>
                </Grid>

                <Grid item xs={12} sx={{ pb: 3, pt: 3 }}>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <AnimateButton>
                                <Button variant="contained" onClick={handleSubmit(handleClick)} fullWidth>
                                    {TitleButton.Actualizar}
                                </Button>
                            </AnimateButton>
                        </Grid>
                        <Grid item xs={6}>
                            <AnimateButton>
                                <Button variant="outlined" fullWidth onClick={() => navigate("/work-absenteeism/list")}>
                                    {TitleButton.Cancelar}
                                </Button>
                            </AnimateButton>
                        </Grid>
                    </Grid>
                </Grid>
            </> : <Cargando />}
        </MainCard>
    );
};

export default UpdateWorkAbsenteeism;