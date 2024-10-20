import { useState, useEffect, Fragment } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery,
    Typography
} from '@mui/material';

import ViewEmployee from 'components/views/ViewEmployee';
import InputDatePicker from 'components/input/InputDatePicker';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from 'hooks/useAuth';
import InputCheckBox from 'components/input/InputCheckBox';
import { FormProvider, useForm } from 'react-hook-form';

import ControlModal from 'components/controllers/ControlModal';
import ControllerListen from 'components/controllers/ControllerListen';
import { FormatDate } from 'components/helpers/Format'
import InputText from 'components/input/InputText';
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import InputSelect from 'components/input/InputSelect';
import { Message, TitleButton, CodCatalogo, DefaultValue } from 'components/helpers/Enums';
import AnimateButton from 'ui-component/extended/AnimateButton';
import SubCard from 'ui-component/cards/SubCard';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import { PutParaclinics } from 'formatdata/ParaclinicsForm';
import { UpdateParaclinicss, GetByIdParaclinics } from 'api/clients/ParaclinicsClient';
import { GetAllSupplier } from 'api/clients/SupplierClient';
import Cargando from 'components/loading/Cargando';
import { MessageUpdate, MessageError } from 'components/alert/AlertAll';
import MainCard from 'ui-component/cards/MainCard';
import UploadIcon from '@mui/icons-material/Upload';
import InputOnChange from 'components/input/InputOnChange';
import { GetAllByCodeOrName, } from 'api/clients/CIE11Client';
import { GetByMail } from 'api/clients/UserClient';
import { generateReport } from './ReporteAudiometry';
import ViewPDF from 'components/components/ViewPDF';

const UpdateAudiometry = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [dataPDF, setDataPDF] = useState(false);
    const [openReport, setOpenReport] = useState(false);
    const [timeWait, setTimeWait] = useState(false);
    const [filePdf, setFilePdf] = useState(null);
    const [openError, setOpenError] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [lsEmployee, setLsEmployee] = useState([]);
    const [open, setOpen] = useState(false);
    const [lsAudiometrics, setLsAudiometrics] = useState([]);

    const [documento, setDocumento] = useState('');
    const [lsMotivo, setLsMotivo] = useState([]);
    const [lsProveedor, setLsProveedor] = useState([]);
    const [lsCargo, setLsCargo] = useState([]);
    const [lsSuministradopor, setLsSuministradopor] = useState([]);
    const [lsConducta, setLsConducta] = useState([]);

    const [lsEmpresaParacli, setLsEmpresaParacli] = useState([]);
    const [lsProteccionAuditiva1, setLsProteccionAuditiva] = useState([]);
    const [lsUso1, setLsUso] = useState([]);
    const [lsAudiograma, setLsAudiograma] = useState([]);
    const [textDx1, setTextDx1] = useState('');
    const [lsDx1, setLsDx1] = useState([]);

    const methods = useForm();
    const { handleSubmit } = methods;

    const handleDx1 = async (event) => {
        try {
            setTextDx1(event.target.value);

            if (event.key === 'Enter') {
                if (event.target.value !== "") {
                    var lsServerCie11 = await GetAllByCodeOrName(event.target.value);
                    setLsDx1(lsServerCie11.data);
                } else {
                    setOpenError(true);
                    setErrorMessage('Por favor, ingrese un Código o Nombre de Diagnóstico');
                }
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage('Hubo un problema al buscar el Diagnóstico');
        }
    }

    const allowedFiles = ['application/pdf'];
    const handleFile = (event) => {
        let selectedFile = event.target.files[0];

        if (selectedFile) {
            if (selectedFile && allowedFiles.includes(selectedFile.type)) {
                let reader = new FileReader();
                reader.readAsDataURL(selectedFile);
                reader.onloadend = (e) => {
                    setFilePdf(e.target.result);
                }
            }
            else {
                setFilePdf('');
                setOpenError(true);
                setErrorMessage('Este formato no es un PDF');
            }
        }
    }

    const handleLoadingDocument = async (idEmployee) => {
        try {
            var lsServerEmployee = await GetByIdEmployee(idEmployee.target.value);

            if (lsServerEmployee?.data.status === 200) {
                setLsEmployee(lsServerEmployee.data.data);
            } else {
                setLsEmployee(lsServerEmployee?.data.data);
                setOpenError(true);
                setErrorMessage(lsServerEmployee?.data.message);
            }
        } catch (error) {
            setLsEmployee([]);
            setErrorMessage(Message.ErrorDeDatos);
        }
    }

    async function getAll() {
        try {
            const lsServerEmpresas = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Empresas_Paraclinicos);
            var resultEmpresas = lsServerEmpresas.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsEmpresaParacli(resultEmpresas);

            const lsServerMotivo = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Atencion_PARACLINICO);
            var resultMotivo = lsServerMotivo.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsMotivo(resultMotivo);

            const lsServerCargo = await GetAllByTipoCatalogo(0, 0, CodCatalogo.RosterPosition);
            var resultCargo = lsServerCargo.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsCargo(resultCargo);

            const lsServerProteccionAuditiva = await GetAllByTipoCatalogo(0, 0, CodCatalogo.PARACLINICO_PROTECCIÓNAUDITIVA);
            var resultProteccionAuditiva = lsServerProteccionAuditiva.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsProteccionAuditiva(resultProteccionAuditiva);

            const lsServerSuministradopor = await GetAllByTipoCatalogo(0, 0, CodCatalogo.PARACLINICO_SUMINISTRADOPOR);
            var resultSuministradopor = lsServerSuministradopor.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsSuministradopor(resultSuministradopor);

            const lsServerUso = await GetAllByTipoCatalogo(0, 0, CodCatalogo.PARACLINICO_USO);
            var resultUso = lsServerUso.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsUso(resultUso);

            const lsServerAudiograma = await GetAllByTipoCatalogo(0, 0, CodCatalogo.PARACLINICO_RESULTADOAUDIOGRAMA);
            var resultAudiograma = lsServerAudiograma.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsAudiograma(resultAudiograma);

            const lsServerConducta = await GetAllByTipoCatalogo(0, 0, CodCatalogo.PARACLINICO_CONDUCTAAUDIOMETRIA);
            var resultConducta = lsServerConducta.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsConducta(resultConducta);

            const lsServerProveedor = await GetAllSupplier(0, 0);
            var resultProveedor = lsServerProveedor.data.entities.map((item) => ({
                value: item.codiProv,
                label: item.nombProv
            }));
            setLsProveedor(resultProveedor);

            const serverData = await GetByIdParaclinics(id);
            if (serverData.status === 200) {
                setLsAudiometrics(serverData.data);
                setTextDx1(serverData.data.dxAUDIO);
                setDocumento(serverData.data.documento);

                const event = {
                    target: { value: serverData.data.documento }
                }
                handleLoadingDocument(event);

                if (serverData.data.dxAUDIO !== "") {
                    var lsServerCie11 = await GetAllByCodeOrName(serverData.data.dxAUDIO);
                    setLsDx1(lsServerCie11.data);
                }

                if (serverData.data.url !== "") {
                    setFilePdf(serverData.data.url);
                }
            }
        } catch (error) { }
    }

    useEffect(() => {
        getAll();
    }, []);

    const handleClickReport = async () => {
        try {
            setOpenReport(true);
            const lsDataReport = await GetByIdParaclinics(id);
            const lsDataUser = await GetByMail(user.nameuser);
            const dataPDFTwo = generateReport(lsDataReport.data, lsDataUser.data);
            setDataPDF(dataPDFTwo);
        } catch (err) { }
    };

    const handleClick = async (datos) => {
        try {
            var savePdf = filePdf === null ? "" : filePdf;

            const DataToUpdate = PutParaclinics(id, DefaultValue.PARACLINICO_AUDIOMETRIA, documento,
                datos.fecha, datos.idMotivo, DefaultValue.SINREGISTRO_GLOBAL, DefaultValue.SINREGISTRO_GLOBAL,
                datos.idProveedor, '', DefaultValue.SINREGISTRO_GLOBAL, '', '', '', '', '', DefaultValue.SINREGISTRO_GLOBAL,
                DefaultValue.SINREGISTRO_GLOBAL, false, false, '', DefaultValue.SINREGISTRO_GLOBAL, '', '', '', '', '', DefaultValue.SINREGISTRO_GLOBAL, '',
                DefaultValue.SINREGISTRO_GLOBAL, '', '', DefaultValue.SINREGISTRO_GLOBAL, '', false, '',
                DefaultValue.SINREGISTRO_GLOBAL, '', '', DefaultValue.SINREGISTRO_GLOBAL, '', '', DefaultValue.SINREGISTRO_GLOBAL,
                '', '', DefaultValue.SINREGISTRO_GLOBAL, '', DefaultValue.SINREGISTRO_GLOBAL, '', DefaultValue.SINREGISTRO_GLOBAL, '',
                DefaultValue.SINREGISTRO_GLOBAL, '', DefaultValue.SINREGISTRO_GLOBAL, '', DefaultValue.SINREGISTRO_GLOBAL,
                '', DefaultValue.SINREGISTRO_GLOBAL, '', datos.otalgiaAOP, datos.otorreaAOP, datos.otitisAOP, datos.acufenosAOP,
                datos.cirugiaAOP, datos.vertigoAOP, datos.farmacologicosAOP, datos.luritoAOP, datos.familiaresAOP, datos.paralisisAOP,
                datos.htaaop, datos.tipoAcusiaAOP, datos.diabetesAOP, datos.expoRuidoAOP, datos.anteceTraumaticosAOP,
                datos.observacionAOP, datos.idEmpresaAO, datos.idCargoAO, datos.tiempoExpoAO, datos.idProteccionAuditivaAO,
                datos.idSuministradaPorAO, datos.idUsoAO, datos.idOdcaeAUDIO, datos.idOdmtAUDIO, datos.idOicaeAUDIO, datos.idOimtAUDIO,
                datos.idReposoAUDIO, datos.dxAUDIO, datos.idConductaAUDIO, datos.idCambioEPP, datos.observacionAUDIO,
                savePdf, user.nameuser, FormatDate(new Date()), '', FormatDate(new Date()));

            if (Object.keys(datos.length !== 0)) {

                const result = await UpdateParaclinicss(DataToUpdate);
                if (result.status === 200) {
                    setOpenUpdate(true);
                }
            }

        } catch (error) {
            setOpenError(true);
            setErrorMessage(Message.RegistroNoGuardado);
        }
    };

    setTimeout(() => {
        if (lsAudiometrics.length !== 0)
            setTimeWait(true);
    }, 2500);

    return (
        <MainCard title="Actualizar Audiometría">
            <Fragment>
                <MessageUpdate open={openUpdate} onClose={() => setOpenUpdate(false)} />
                <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

                <ControlModal
                    maxWidth="md"
                    open={open}
                    onClose={() => setOpen(false)}
                    title="DICTADO POR VOZ"
                >
                    <ControllerListen />
                </ControlModal>

                <ControlModal
                    title={Message.VistaReporte}
                    open={openReport}
                    onClose={() => setOpenReport(false)}
                    maxWidth="xl"
                >
                    <ViewPDF dataPDF={dataPDF} />
                </ControlModal>

                {timeWait ?
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <ViewEmployee
                                disabled={true}
                                key={lsEmployee.documento}
                                documento={documento}
                                onChange={(e) => setDocumento(e.target.value)}
                                lsEmployee={lsEmployee}
                                handleDocumento={handleLoadingDocument}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <SubCard darkTitle>
                                <Grid container spacing={2}>
                                    <Grid item xs={3.3}>
                                        <FormProvider {...methods}>
                                            <InputDatePicker
                                                label="Fecha"
                                                name="fecha"
                                                defaultValue={lsAudiometrics.fecha}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={4.3}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="idMotivo"
                                                label="Motivo"
                                                defaultValue={lsAudiometrics.idMotivo}
                                                options={lsMotivo}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={4.3}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="idProveedor"
                                                label="Proveedor"
                                                defaultValue={lsAudiometrics.idProveedor}
                                                options={lsProveedor}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </FormProvider>
                                    </Grid>
                                </Grid>
                            </SubCard>
                        </Grid>

                        <Grid item xs={12}>
                            <SubCard darkTitle title={<Typography variant="h4">ANTECEDENTES OTOLÓGICOS Y PERSONALES</Typography>}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6} lg={2}>
                                        <FormProvider {...methods}>
                                            <InputCheckBox
                                                label="Otalgia"
                                                name="otalgiaAOP"
                                                size={25}
                                                defaultValue={lsAudiometrics.otalgiaAOP}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={2}>
                                        <FormProvider {...methods}>
                                            <InputCheckBox
                                                label="Otorrea"
                                                name="otorreaAOP"
                                                size={25}
                                                defaultValue={lsAudiometrics.otorreaAOP}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={2}>
                                        <FormProvider {...methods}>
                                            <InputCheckBox
                                                label="Otitis"
                                                name="otitisAOP"
                                                size={25}
                                                defaultValue={lsAudiometrics.otitisAOP}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={2}>
                                        <FormProvider {...methods}>
                                            <InputCheckBox
                                                label="Acufenos"
                                                name="acufenosAOP"
                                                size={25}
                                                defaultValue={lsAudiometrics.acufenosAOP}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={2}>
                                        <FormProvider {...methods}>
                                            <InputCheckBox
                                                label="Cirugía de Oídos"
                                                name="cirugiaAOP"
                                                size={25}
                                                defaultValue={lsAudiometrics.cirugiaAOP}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={2}>
                                        <FormProvider {...methods}>
                                            <InputCheckBox
                                                label="Vértigo"
                                                name="vertigoAOP"
                                                size={25}
                                                defaultValue={lsAudiometrics.vertigoAOP}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={2}>
                                        <FormProvider {...methods}>
                                            <InputCheckBox
                                                label="Farmacológicos"
                                                name="farmacologicosAOP"
                                                size={25}
                                                defaultValue={lsAudiometrics.farmacologicosAOP}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={2}>
                                        <FormProvider {...methods}>
                                            <InputCheckBox
                                                label="Prurito"
                                                name="luritoAOP"
                                                size={25}
                                                defaultValue={lsAudiometrics.luritoAOP}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={2}>
                                        <FormProvider {...methods}>
                                            <InputCheckBox
                                                label="Familiares"
                                                name="familiaresAOP"
                                                size={25}
                                                defaultValue={lsAudiometrics.familiaresAOP}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={2}>
                                        <FormProvider {...methods}>
                                            <InputCheckBox
                                                label="Parálisis Facial"
                                                name="paralisisAOP"
                                                size={25}
                                                defaultValue={lsAudiometrics.paralisisAOP}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={2}>
                                        <FormProvider {...methods}>
                                            <InputCheckBox
                                                label="H.T.A."
                                                name="htaaop"
                                                size={25}
                                                defaultValue={lsAudiometrics.htaaop}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={2}>
                                        <FormProvider {...methods}>
                                            <InputCheckBox
                                                label="Hipoacusia"
                                                name="tipoAcusiaAOP"
                                                size={25}
                                                defaultValue={lsAudiometrics.tipoAcusiaAOP}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={2}>
                                        <FormProvider {...methods}>
                                            <InputCheckBox
                                                label="Diabetes"
                                                name="diabetesAOP"
                                                size={25}
                                                defaultValue={lsAudiometrics.diabetesAOP}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={2}>
                                        <FormProvider {...methods}>
                                            <InputCheckBox
                                                label="Exp. A Ruido No Ind."
                                                name="expoRuidoAOP"
                                                size={25}
                                                defaultValue={lsAudiometrics.expoRuidoAOP}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={6}>
                                        <FormProvider {...methods}>
                                            <InputCheckBox
                                                label="Antecedentes Traumáticos"
                                                name="anteceTraumaticosAOP"
                                                size={25}
                                                defaultValue={lsAudiometrics.anteceTraumaticosAOP}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <FormProvider {...methods}>
                                            <InputText
                                                defaultValue={lsAudiometrics.observacionAOP}
                                                fullWidth
                                                name="observacionAOP"
                                                label="Observaciones"
                                                size={matchesXS ? 'small' : 'medium'}
                                                multiline
                                                rows={6}
                                            />
                                        </FormProvider>
                                    </Grid>
                                </Grid>
                            </SubCard>
                        </Grid>

                        <Grid item xs={12}>
                            <SubCard darkTitle title={<Typography variant="h4">ANTECEDENTES OCUPACIONALES</Typography>}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6} lg={4}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                defaultValue={lsAudiometrics.idEmpresaAO}
                                                name="idEmpresaAO"
                                                label="Empresa"
                                                options={lsEmpresaParacli}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="idCargoAO"
                                                label="Cargo"
                                                defaultValue={lsAudiometrics.idCargoAO}
                                                options={lsCargo}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4}>
                                        <FormProvider {...methods}>
                                            <InputText
                                                defaultValue={lsAudiometrics.tiempoExpoAO}
                                                fullWidth
                                                name="tiempoExpoAO"
                                                label="Tiempo Exp."
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                defaultValue={lsAudiometrics.idProteccionAuditivaAO}
                                                name="idProteccionAuditivaAO"
                                                label="Protección Auditiva"
                                                options={lsProteccionAuditiva1}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="idSuministradaPorAO"
                                                label="Suministrada Por"
                                                defaultValue={lsAudiometrics.idSuministradaPorAO}
                                                options={lsSuministradopor}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="idUsoAO"
                                                label="Uso"
                                                defaultValue={lsAudiometrics.idUsoAO}
                                                options={lsUso1}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </FormProvider>
                                    </Grid>
                                </Grid>
                            </SubCard>
                        </Grid>

                        <Grid item xs={12}>
                            <SubCard darkTitle title={<Typography variant="h4">AUDIOGRAMA</Typography>}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6} lg={4}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="idOdcaeAUDIO"
                                                label="OD CAE"
                                                defaultValue={lsAudiometrics.idOdcaeAUDIO}
                                                options={lsAudiograma}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="idOdmtAUDIO"
                                                label="OD MT"
                                                defaultValue={lsAudiometrics.idOdmtAUDIO}
                                                options={lsAudiograma}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="idOicaeAUDIO"
                                                label="OI CAE"
                                                defaultValue={lsAudiometrics.idOicaeAUDIO}
                                                options={lsAudiograma}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="idOimtAUDIO"
                                                label="OI MT"
                                                defaultValue={lsAudiometrics.idOimtAUDIO}
                                                options={lsAudiograma}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={8}>
                                        <FormProvider {...methods}>
                                            <InputCheckBox
                                                label="Reposo Auditivo"
                                                name="idReposoAUDIO"
                                                size={25}
                                                defaultValue={lsAudiometrics.idReposoAUDIO}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={2}>
                                        <InputOnChange
                                            label="Dx "
                                            onKeyDown={handleDx1}
                                            onChange={(e) => setTextDx1(e?.target.value)}
                                            value={textDx1}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={6}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                defaultValue={lsAudiometrics.dxAUDIO}
                                                name="dxAUDIO"
                                                label="Dx"
                                                options={lsDx1}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={2}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                defaultValue={lsAudiometrics.idConductaAUDIO}
                                                name="idConductaAUDIO"
                                                label="Conducta"
                                                options={lsConducta}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={2}>
                                        <FormProvider {...methods}>
                                            <InputCheckBox
                                                label="Cambio EPP"
                                                name="idCambioEPP"
                                                size={25}
                                                defaultValue={lsAudiometrics.idCambioEPP}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <FormProvider {...methods}>
                                            <InputText
                                                defaultValue={lsAudiometrics.observacionAUDIO}
                                                fullWidth
                                                name="observacionAUDIO"
                                                label="Observaciones"
                                                size={matchesXS ? 'small' : 'medium'}
                                                multiline
                                                rows={6}
                                            />
                                        </FormProvider>
                                    </Grid>
                                </Grid>
                            </SubCard>
                        </Grid>

                        <Grid item xs={12} sx={{ pt: 2 }}>
                            <MainCard title="Resultados">
                                <Grid container spacing={12}>
                                    <Grid textAlign="center" item xs={12}>
                                        <Button size="large" variant="contained" component="label" startIcon={<UploadIcon fontSize="large" />}>
                                            ACTUALIZAR RESULTADO EN PDF
                                            <input hidden accept="application/pdf" type="file" onChange={handleFile} />
                                        </Button>
                                    </Grid>
                                </Grid>

                                <Grid item xs={12} sx={{ pt: 4 }}>
                                    {filePdf && (
                                        <object type="application/pdf"
                                            data={filePdf}
                                            width="1180"
                                            height="500"
                                            onLoad={<Cargando />}
                                        />
                                    )}
                                </Grid>
                            </MainCard>
                        </Grid>

                        <Grid item xs={12} sx={{ pt: 4 }}>
                            <Grid container spacing={2} >
                                <Grid item xs={2}>
                                    <AnimateButton>
                                        <Button variant="contained" fullWidth onClick={handleSubmit(handleClick)}>
                                            {TitleButton.Actualizar}
                                        </Button>
                                    </AnimateButton>
                                </Grid>

                                <Grid item xs={2}>
                                    <AnimateButton>
                                        <Button variant="outlined" fullWidth onClick={handleClickReport}>
                                            {TitleButton.Imprimir}
                                        </Button>
                                    </AnimateButton>
                                </Grid>

                                <Grid item xs={2}>
                                    <AnimateButton>
                                        <Button variant="outlined" fullWidth onClick={() => navigate("/paraclinics/audiometry/list")}>
                                            {TitleButton.Cancelar}
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid> : <Cargando />
                }
            </Fragment >
        </MainCard>

    );
};

export default UpdateAudiometry;