import {
    Button,
    Grid,
    Typography,
    useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Fragment, useEffect, useState } from 'react';

import InputCheckBox from 'components/input/InputCheckBox';
import InputDatePicker from 'components/input/InputDatePicker';
import ViewEmployee from 'components/views/ViewEmployee';
import useAuth from 'hooks/useAuth';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import UploadIcon from '@mui/icons-material/Upload';
import { GetAllByCodeOrName, } from 'api/clients/CIE11Client';
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import { GetByIdParaclinics, UpdateParaclinicss } from 'api/clients/ParaclinicsClient';
import { GetAllSupplier } from 'api/clients/SupplierClient';
import { GetByMail } from 'api/clients/UserClient';
import { MessageError, MessageUpdate } from 'components/alert/AlertAll';
import ViewPDF from 'components/components/ViewPDF';
import ControlModal from 'components/controllers/ControlModal';
import ControllerListen from 'components/controllers/ControllerListen';
import { DownloadFile } from 'components/helpers/ConvertToBytes';
import { AccionMenu, CodCatalogo, DefaultValue, Message, Modulo, TitleButton } from 'components/helpers/Enums';
import { FormatDate } from 'components/helpers/Format';
import InputOnChange from 'components/input/InputOnChange';
import InputSelect from 'components/input/InputSelect';
import InputText from 'components/input/InputText';
import Cargando from 'components/loading/Cargando';
import { PutParaclinics } from 'formatdata/ParaclinicsForm';
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { generateReport } from './ReporteAudiometry';
import ValidateActionSkeleton from 'components/ValidateAction/ValidateActionSkeleton';
import InputCheck from 'components/input/InputCheck';

const UpdateAudiometry = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [extenderDescripcion, setExtenderDescripcion] = useState(false);
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

    async function downloadFile() { DownloadFile('auditoriapruebapdf.pdf', filePdf.replace("data:application/pdf;base64,", "")); }

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

            const lsServerProveedor = await GetAllSupplier();
            var resultProveedor = lsServerProveedor.data.map((item) => ({
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
            const lsDataUser = await GetByMail(user?.nameuser);
            const dataPDFTwo = generateReport(lsDataReport.data, lsDataUser.data, extenderDescripcion);
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
                savePdf, user?.nameuser, FormatDate(new Date()), '', FormatDate(new Date()));

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
    }, 500);

    return (
        <ValidateActionSkeleton idAccion={AccionMenu.actualizar} idModulo={Modulo.Audiometria}>
            <FormProvider {...methods}>
                <MainCard title="Actualizar Audiometría">
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
                                            <InputDatePicker
                                                label="Fecha"
                                                name="fecha"
                                                defaultValue={lsAudiometrics.fecha}
                                            />
                                        </Grid>

                                        <Grid item xs={4.3}>
                                            <InputSelect
                                                name="idMotivo"
                                                label="Motivo"
                                                defaultValue={lsAudiometrics.idMotivo}
                                                options={lsMotivo}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={4.3}>
                                            <InputSelect
                                                name="idProveedor"
                                                label="Proveedor"
                                                defaultValue={lsAudiometrics.idProveedor}
                                                options={lsProveedor}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>
                                    </Grid>
                                </SubCard>
                            </Grid>

                            <Grid item xs={12}>
                                <SubCard darkTitle title={<Typography variant="h4">ANTECEDENTES OTOLÓGICOS Y PERSONALES</Typography>}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={6} lg={2}>
                                            <InputCheckBox
                                                label="Otalgia"
                                                name="otalgiaAOP"
                                                size={25}
                                                defaultValue={lsAudiometrics.otalgiaAOP}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={2}>
                                            <InputCheckBox
                                                label="Otorrea"
                                                name="otorreaAOP"
                                                size={25}
                                                defaultValue={lsAudiometrics.otorreaAOP}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={2}>
                                            <InputCheckBox
                                                label="Otitis"
                                                name="otitisAOP"
                                                size={25}
                                                defaultValue={lsAudiometrics.otitisAOP}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={2}>
                                            <InputCheckBox
                                                label="Acufenos"
                                                name="acufenosAOP"
                                                size={25}
                                                defaultValue={lsAudiometrics.acufenosAOP}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={2}>
                                            <InputCheckBox
                                                label="Cirugía de Oídos"
                                                name="cirugiaAOP"
                                                size={25}
                                                defaultValue={lsAudiometrics.cirugiaAOP}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={2}>
                                            <InputCheckBox
                                                label="Vértigo"
                                                name="vertigoAOP"
                                                size={25}
                                                defaultValue={lsAudiometrics.vertigoAOP}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={2}>
                                            <InputCheckBox
                                                label="Farmacológicos"
                                                name="farmacologicosAOP"
                                                size={25}
                                                defaultValue={lsAudiometrics.farmacologicosAOP}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={2}>
                                            <InputCheckBox
                                                label="Prurito"
                                                name="luritoAOP"
                                                size={25}
                                                defaultValue={lsAudiometrics.luritoAOP}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={2}>
                                            <InputCheckBox
                                                label="Familiares"
                                                name="familiaresAOP"
                                                size={25}
                                                defaultValue={lsAudiometrics.familiaresAOP}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={2}>
                                            <InputCheckBox
                                                label="Parálisis Facial"
                                                name="paralisisAOP"
                                                size={25}
                                                defaultValue={lsAudiometrics.paralisisAOP}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={2}>
                                            <InputCheckBox
                                                label="H.T.A."
                                                name="htaaop"
                                                size={25}
                                                defaultValue={lsAudiometrics.htaaop}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={2}>
                                            <InputCheckBox
                                                label="Hipoacusia"
                                                name="tipoAcusiaAOP"
                                                size={25}
                                                defaultValue={lsAudiometrics.tipoAcusiaAOP}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={2}>
                                            <InputCheckBox
                                                label="Diabetes"
                                                name="diabetesAOP"
                                                size={25}
                                                defaultValue={lsAudiometrics.diabetesAOP}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={2}>
                                            <InputCheckBox
                                                label="Exp. A Ruido No Ind."
                                                name="expoRuidoAOP"
                                                size={25}
                                                defaultValue={lsAudiometrics.expoRuidoAOP}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={6}>
                                            <InputCheckBox
                                                label="Antecedentes Traumáticos"
                                                name="anteceTraumaticosAOP"
                                                size={25}
                                                defaultValue={lsAudiometrics.anteceTraumaticosAOP}
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <InputText
                                                defaultValue={lsAudiometrics.observacionAOP}
                                                fullWidth
                                                name="observacionAOP"
                                                label="Observaciones"
                                                size={matchesXS ? 'small' : 'medium'}
                                                multiline
                                                rows={6}
                                            />
                                        </Grid>
                                    </Grid>
                                </SubCard>
                            </Grid>

                            <Grid item xs={12}>
                                <SubCard darkTitle title={<Typography variant="h4">ANTECEDENTES OCUPACIONALES</Typography>}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={6} lg={4}>
                                            <InputSelect
                                                defaultValue={lsAudiometrics.idEmpresaAO}
                                                name="idEmpresaAO"
                                                label="Empresa"
                                                options={lsEmpresaParacli}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={4}>
                                            <InputSelect
                                                name="idCargoAO"
                                                label="Cargo"
                                                defaultValue={lsAudiometrics.idCargoAO}
                                                options={lsCargo}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={4}>
                                            <InputText
                                                defaultValue={lsAudiometrics.tiempoExpoAO}
                                                fullWidth
                                                name="tiempoExpoAO"
                                                label="Tiempo Exp."
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={4}>
                                            <InputSelect
                                                defaultValue={lsAudiometrics.idProteccionAuditivaAO}
                                                name="idProteccionAuditivaAO"
                                                label="Protección Auditiva"
                                                options={lsProteccionAuditiva1}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={4}>
                                            <InputSelect
                                                name="idSuministradaPorAO"
                                                label="Suministrada Por"
                                                defaultValue={lsAudiometrics.idSuministradaPorAO}
                                                options={lsSuministradopor}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={4}>
                                            <InputSelect
                                                name="idUsoAO"
                                                label="Uso"
                                                defaultValue={lsAudiometrics.idUsoAO}
                                                options={lsUso1}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>
                                    </Grid>
                                </SubCard>
                            </Grid>

                            <Grid item xs={12}>
                                <SubCard darkTitle title={<Typography variant="h4">AUDIOGRAMA</Typography>}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={6} lg={4}>
                                            <InputSelect
                                                name="idOdcaeAUDIO"
                                                label="OD CAE"
                                                defaultValue={lsAudiometrics.idOdcaeAUDIO}
                                                options={lsAudiograma}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={4}>
                                            <InputSelect
                                                name="idOdmtAUDIO"
                                                label="OD MT"
                                                defaultValue={lsAudiometrics.idOdmtAUDIO}
                                                options={lsAudiograma}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={4}>
                                            <InputSelect
                                                name="idOicaeAUDIO"
                                                label="OI CAE"
                                                defaultValue={lsAudiometrics.idOicaeAUDIO}
                                                options={lsAudiograma}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={4}>
                                            <InputSelect
                                                name="idOimtAUDIO"
                                                label="OI MT"
                                                defaultValue={lsAudiometrics.idOimtAUDIO}
                                                options={lsAudiograma}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={8}>
                                            <InputCheckBox
                                                label="Reposo Auditivo"
                                                name="idReposoAUDIO"
                                                size={25}
                                                defaultValue={lsAudiometrics.idReposoAUDIO}
                                            />
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
                                            <InputSelect
                                                defaultValue={lsAudiometrics.dxAUDIO}
                                                name="dxAUDIO"
                                                label="Dx"
                                                options={lsDx1}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={2}>
                                            <InputSelect
                                                defaultValue={lsAudiometrics.idConductaAUDIO}
                                                name="idConductaAUDIO"
                                                label="Conducta"
                                                options={lsConducta}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={2}>
                                            <InputCheckBox
                                                label="Cambio EPP"
                                                name="idCambioEPP"
                                                size={25}
                                                defaultValue={lsAudiometrics.idCambioEPP}
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <InputText
                                                defaultValue={lsAudiometrics.observacionAUDIO}
                                                fullWidth
                                                name="observacionAUDIO"
                                                label="Observaciones"
                                                size={matchesXS ? 'small' : 'medium'}
                                                multiline
                                                rows={6}
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <InputCheck
                                                onChange={(e) =>
                                                    setExtenderDescripcion(e.target.checked)
                                                }
                                                checked={extenderDescripcion}
                                                label="Extender Reporte"
                                                name="extenderDescripcion"
                                                size={30}
                                                defaultValue={false}
                                            />
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
                                        <ViewPDF dataPDF={filePdf} width="1000" height="500" />
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
                </MainCard>
            </FormProvider>
        </ValidateActionSkeleton >

    );
};

export default UpdateAudiometry;