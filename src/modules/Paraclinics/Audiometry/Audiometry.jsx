import { useState, useEffect, Fragment } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery,
    Typography,
} from '@mui/material';

import { MessageSuccess, MessageError } from 'components/alert/AlertAll';
import ViewEmployee from 'components/views/ViewEmployee';
import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import InputCheckBox from 'components/input/InputCheckBox';
import InputDatePicker from 'components/input/InputDatePicker';
import ControlModal from 'components/controllers/ControlModal';
import ControllerListen from 'components/controllers/ControllerListen';

import { GetAllByCodeOrName } from 'api/clients/CIE11Client';
import { FormatDate } from 'components/helpers/Format'
import InputText from 'components/input/InputText';
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import InputSelect from 'components/input/InputSelect';
import { Message, TitleButton, CodCatalogo, DefaultValue } from 'components/helpers/Enums';
import AnimateButton from 'ui-component/extended/AnimateButton';
import SubCard from 'ui-component/cards/SubCard';
import useAuth from 'hooks/useAuth';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import { PostParaclinics } from 'formatdata/ParaclinicsForm';
import { InsertParaclinics, GetByIdParaclinics } from 'api/clients/ParaclinicsClient';
import { GetAllSupplier } from 'api/clients/SupplierClient';
import Cargando from 'components/loading/Cargando';
import MainCard from 'ui-component/cards/MainCard';
import UploadIcon from '@mui/icons-material/Upload';
import InputOnChange from 'components/input/InputOnChange';
import { generateReport } from './ReporteAudiometry';
import { GetByMail } from 'api/clients/UserClient';
import ViewPDF from 'components/components/ViewPDF';

const Audiometry = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [openSuccess, setOpenSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [openError, setOpenError] = useState(false);
    const [open, setOpen] = useState(false);
    const [filePdf, setFilePdf] = useState(null);
    const [lsEmployee, setLsEmployee] = useState([]);
    const [documento, setDocumento] = useState('');
    const [lsMotivo, setLsMotivo] = useState([]);
    const [lsProveedor, setLsProveedor] = useState([]);
    const [lsEmpresaParacli, setLsEmpresaParacli] = useState([]);
    const [dataPDF, setDataPDF] = useState(null);
    const [lsCargo, setLsCargo] = useState([]);
    const [lsProteccionAuditiva, setLsProteccionAuditiva] = useState([]);
    const [lsSuministradopor, setLsSuministradopor] = useState([]);
    const [lsUso, setLsUso] = useState([]);
    const [lsAudiograma, setLsAudiograma] = useState([]);
    const [openReport, setOpenReport] = useState(false);
    const [lsConducta, setLsConducta] = useState([]);
    const [resultData, setResultData] = useState([]);
    const [textDx1, setTextDx1] = useState('');
    const [lsDx1, setLsDx1] = useState([]);

    const methods = useForm();
    const { handleSubmit, reset } = methods;

    const handleDx1 = async (event) => {
        try {
            setTextDx1(event.target.value);

            if (event.key === 'Enter') {
                if (event.target.value !== "") {
                    var lsServerCie11 = await GetAllByCodeOrName(0, 0, event.target.value);

                    if (lsServerCie11.status === 200) {
                        var resultCie11 = lsServerCie11.data.entities.map((item) => ({
                            value: item.id,
                            label: item.dx
                        }));
                        setLsDx1(resultCie11);
                    }
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
                setErrorMessage('Este forma no es un PDF');
            }
        }
    }

    const handleDocumento = async (event) => {
        try {
            setDocumento(event?.target.value);
            if (event.key === 'Enter') {
                if (event?.target.value != "") {
                    var lsServerEmployee = await GetByIdEmployee(event?.target.value);

                    if (lsServerEmployee.status === 200) {
                        setLsEmployee(lsServerEmployee.data);
                    }
                } else {
                    setOpenError(true);
                    setErrorMessage(`${Message.ErrorDocumento}`);
                }
            }
        } catch (error) {
            setLsEmployee([]);
            setOpenError(true);
            setErrorMessage(`${Message.ErrorDeDatos}`);
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

            const lsServerMotivo = await GetAllByTipoCatalogo(0, 0, CodCatalogo.AtencionEMO);
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
        } catch (error) { }
    }

    useEffect(() => {
        getAll();
    }, [])


    const handleClickReport = async () => {
        try {
            setOpenReport(true);
            const lsDataReport = await GetByIdParaclinics(resultData.id);
            const lsDataUser = await GetByMail(user.nameuser);

            const dataPDFTwo = generateReport(lsDataReport.data, lsDataUser.data);
            setDataPDF(dataPDFTwo);
        } catch (err) { }
    };


    const handleClick = async (datos) => {
        try {
            var savePdf = filePdf === null ? "" : filePdf;

            const DataToInsert = PostParaclinics(DefaultValue.PARACLINICO_AUDIOMETRIA, documento,
                FormatDate(datos.fecha), datos.idMotivo, DefaultValue.SINREGISTRO_GLOBAL, DefaultValue.SINREGISTRO_GLOBAL,
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
                datos.idSuministradaPorAO, datos.idUsoA, datos.idOdcaeAUDIO, datos.idOdmtAUDIO, datos.idOicaeAUDIO, datos.idOimtAUDIO,
                datos.idReposoAUDIO, datos.dxAUDIO, datos.idConductaAUDIO, datos.idCambioEPP, datos.observacionAUDIO,
                savePdf, user.nameuser, FormatDate(new Date()), '', FormatDate(new Date()));


            if (Object.keys(datos.length !== 0)) {
                const result = await InsertParaclinics(DataToInsert);
                if (result.status === 200) {
                    setOpenSuccess(true);
                    /*           setDocumento(''); */
                    setLsEmployee([]);
                    setResultData(result.data);
                    reset();
                    setFilePdf(null);
                }
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(Message.RegistroNoGuardado);
        }
    };

    return (
        <MainCard title="Registrar Audiometría">
            <Fragment>
                <MessageSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} />
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
                    title="VISTA DE REPORTE"
                    open={openReport}
                    onClose={() => setOpenReport(false)}
                    maxWidth="xl"
                >
                    <ViewPDF dataPDF={dataPDF} />
                </ControlModal>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <ViewEmployee
                            key={lsEmployee.documento}
                            documento={documento}
                            onChange={(e) => setDocumento(e.target.value)}
                            lsEmployee={lsEmployee}
                            handleDocumento={handleDocumento}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <SubCard darkTitle>
                            <Grid container spacing={1}>
                                <Grid item xs={3.3}>
                                    <FormProvider {...methods}>
                                        <InputDatePicker
                                            label="Fecha"
                                            name="fecha"
                                            defaultValue={new Date()}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={4.3}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="idMotivo"
                                            label="Motivo"
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
                                            options={lsProveedor}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>


                    <Grid item xs={12}>
                        <SubCard darkTitle title={<Typography variant="h4">Antecedentes Otológicos y Personales</Typography>}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6} lg={2}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="Otalgia"
                                            name="otalgiaAOP"
                                            size={25}
                                            defaultValue={false}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12} md={6} lg={2}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="Otorrea"
                                            name="otorreaAOP"
                                            size={25}
                                            defaultValue={false}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12} md={6} lg={2}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="Otitis"
                                            name="otitisAOP"
                                            size={25}
                                            defaultValue={false}
                                        />
                                    </FormProvider>
                                </Grid>


                                <Grid item xs={12} md={6} lg={2}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="Acufenos"
                                            name="acufenosAOP"
                                            size={25}
                                            defaultValue={false}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12} md={6} lg={2}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="Cirugía de Oídos"
                                            name="cirugiaAOP"
                                            size={25}
                                            defaultValue={false}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12} md={6} lg={2}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="Vértigo"
                                            name="vertigoAOP"
                                            size={25}
                                            defaultValue={false}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12} md={6} lg={2}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="Farmacológicos"
                                            name="farmacologicosAOP"
                                            size={25}
                                            defaultValue={false}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12} md={6} lg={2}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="Prurito"
                                            name="luritoAOP"
                                            size={25}
                                            defaultValue={false}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12} md={6} lg={2}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="Familiares"
                                            name="familiaresAOP"
                                            size={25}
                                            defaultValue={false}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12} md={6} lg={2}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="Parálisis Facial"
                                            name="paralisisAOP"
                                            size={25}
                                            defaultValue={false}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12} md={6} lg={2}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="H.T.A."
                                            name="htaaop"
                                            size={25}
                                            defaultValue={false}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12} md={6} lg={2}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="Hipoacusia"
                                            name="tipoAcusiaAOP"
                                            size={25}
                                            defaultValue={false}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12} md={6} lg={2}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="Diabetes"
                                            name="diabetesAOP"
                                            size={25}
                                            defaultValue={false}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12} md={6} lg={2}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="Exp. A Ruido No Ind."
                                            name="expoRuidoAOP"
                                            size={25}
                                            defaultValue={false}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12} md={6} lg={6}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="Antecedentes Traumáticos"
                                            name="anteceTraumaticosAOP"
                                            size={25}
                                            defaultValue={false}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputText
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
                        <SubCard darkTitle title={<Typography variant="h4">Antecedentes Ocupacionales</Typography>}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6} lg={4}>
                                    <FormProvider {...methods}>
                                        <InputSelect
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
                                            options={lsCargo}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12} md={6} lg={4}>
                                    <FormProvider {...methods}>
                                        <InputText
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
                                            name="idProteccionAuditivaAO"
                                            label="Protección Auditiva"
                                            options={lsProteccionAuditiva}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12} md={6} lg={4}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="idSuministradaPorAO"
                                            label="Suministrada Por"
                                            options={lsSuministradopor}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12} md={6} lg={4}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="idUsoA"
                                            label="Uso"
                                            options={lsUso}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>

                    <Grid item xs={12}>
                        <SubCard darkTitle title={<Typography variant="h4">Audiograma</Typography>}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6} lg={4}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            defaultValue="7314"
                                            name="idOdcaeAUDIO"
                                            label="OD CAE"
                                            options={lsAudiograma}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12} md={6} lg={4}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            defaultValue="7314"
                                            name="idOdmtAUDIO"
                                            label="OD MT"
                                            options={lsAudiograma}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12} md={6} lg={4}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            defaultValue="7314"
                                            name="idOicaeAUDIO"
                                            label="OI CAE"
                                            options={lsAudiograma}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12} md={6} lg={4}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            defaultValue="7314"
                                            name="idOimtAUDIO"
                                            label="OI MT"
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
                                            defaultValue={false}
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
                                            defaultValue={false}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputText
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

                    <Grid item xs={12}>
                        <SubCard darkTitle>
                            <Grid item xs={12} sx={{ pt: 2 }}>
                                <MainCard title="Resultados">

                                    <Grid container spacing={12}>
                                        <Grid textAlign="center" item xs={12}>
                                            <Button size="large" variant="contained" component="label" startIcon={<UploadIcon fontSize="large" />}>
                                                SUBIR RESULTADO EN PDF
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
                                                {TitleButton.Guardar}
                                            </Button>
                                        </AnimateButton>
                                    </Grid>

                                    <Grid item xs={2}>
                                        <AnimateButton>
                                            <Button /* disabled={resultData.length === 0 ? true : false} */ variant="outlined" fullWidth onClick={handleClickReport}>
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
                        </SubCard>
                    </Grid>
                </Grid>
            </Fragment>
        </MainCard>
    );
};

export default Audiometry;