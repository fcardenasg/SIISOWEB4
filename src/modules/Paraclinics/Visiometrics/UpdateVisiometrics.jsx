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
import { GetAllByCodeOrName } from 'api/clients/CIE11Client';
import InputOnChange from 'components/input/InputOnChange';

const UpdateVisiometrics = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const theme = useTheme();
    const { id } = useParams();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [timeWait, setTimeWait] = useState(false);
    const [filePdf, setFilePdf] = useState(null);
    const [openError, setOpenError] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [lsEmployee, setLsEmployee] = useState([]);
    const [open, setOpen] = useState(false);
    const [lsVisiometrics, setLsVisiometrics] = useState([]);

    const [documento, setDocumento] = useState('');
    const [lsMotivo, setLsMotivo] = useState([]);
    const [lsProveedor, setLsProveedor] = useState([]);
    const [lsLectura, setLsLectura] = useState([]);
    const [lsControl, setLsControl] = useState([]);

    const [textDx1, setTextDx1] = useState('');
    const [lsDx1, setLsDx1] = useState([]);
    const [textDx2, setTextDx2] = useState('');
    const [lsDx2, setLsDx2] = useState([]);
    const [textDx3, setTextDx3] = useState('');
    const [lsDx3, setLsDx3] = useState([]);

    const methods = useForm();
    const { handleSubmit, errors } = methods;

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

    const handleDx2 = async (event) => {
        try {
            setTextDx2(event.target.value);

            if (event.key === 'Enter') {
                if (event.target.value !== "") {
                    var lsServerCie11 = await GetAllByCodeOrName(event.target.value);
                    setLsDx2(lsServerCie11.data);
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

    const handleDx3 = async (event) => {
        try {
            setTextDx3(event.target.value);

            if (event.key === 'Enter') {
                if (event.target.value !== "") {
                    var lsServerCie11 = await GetAllByCodeOrName(event.target.value);
                    setLsDx3(lsServerCie11.data);
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
            const lsServerMotivo = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Atencion_PARACLINICO);
            var resultMotivo = lsServerMotivo.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsMotivo(resultMotivo);

            const lsServerLectura = await GetAllByTipoCatalogo(0, 0, CodCatalogo.PARACLINICO_LECTURAADD);
            var resultLectura = lsServerLectura.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsLectura(resultLectura);

            const lsServerControl = await GetAllByTipoCatalogo(0, 0, CodCatalogo.PARACLINICO_CONTROLV);
            var resultControl = lsServerControl.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsControl(resultControl);

            const lsServerProveedor = await GetAllSupplier(0, 0);
            var resultProveedor = lsServerProveedor.data.entities.map((item) => ({
                value: item.codiProv,
                label: item.nombProv
            }));
            setLsProveedor(resultProveedor);


            const serverData = await GetByIdParaclinics(id);
            if (serverData.status === 200) {
                if (serverData.data.dxDerecho !== "") {
                    var lsServerCie11 = await GetAllByCodeOrName(serverData.data.dxDerecho);
                    setLsDx1(lsServerCie11.data);
                    setTextDx1(serverData.data.dxDerecho);
                }

                if (serverData.data.dxIzquierdo !== "") {
                    var lsServerCie112 = await GetAllByCodeOrName(serverData.data.dxIzquierdo);
                    setLsDx2(lsServerCie112.data);
                    setTextDx2(serverData.data.dxIzquierdo);
                }

                if (serverData.data.dxDiagnostico !== "") {
                    var lsServerCie113 = await GetAllByCodeOrName(serverData.data.dxDiagnostico);
                    setLsDx3(lsServerCie113.data);
                    setTextDx3(serverData.data.dxDiagnostico);
                }

                setDocumento(serverData.data.documento);
                setLsVisiometrics(serverData.data);

                const event = {
                    target: { value: serverData.data.documento }
                }
                handleLoadingDocument(event);

                if (serverData.data.url !== "") {
                    setFilePdf(serverData.data.url);
                }
            }
        } catch (error) { }
    }

    useEffect(() => {
        getAll();
    }, [])

    const handleClick = async (datos) => {
        try {
            var savePdf = filePdf === null ? "" : filePdf;

            const DataToUpdate = PutParaclinics(id, DefaultValue.PARACLINICO_VISIOMETRIA, documento,
                datos.fecha, datos.idMotivo, DefaultValue.SINREGISTRO_GLOBAL, DefaultValue.SINREGISTRO_GLOBAL, datos.idProveedor,
                datos.observacion, DefaultValue.SINREGISTRO_GLOBAL, datos.ojoDerecho, datos.DxDerecho, datos.ojoIzquierdo, datos.DxIzquierdo, datos.add1,
                datos.idLecturaAdd, datos.idControl, datos.remitidoOftalmo,
                datos.requiereLentes, datos.DxDiagnostico, DefaultValue.SINREGISTRO_GLOBAL, '', '', '', '', '', DefaultValue.SINREGISTRO_GLOBA, '', DefaultValue.SINREGISTRO_GLOBAL, '', '',
                DefaultValue.SINREGISTRO_GLOBAL, '', false, '', DefaultValue.SINREGISTRO_GLOBAL, '', '', DefaultValue.SINREGISTRO_GLOBAL,
                '', '', DefaultValue.SINREGISTRO_GLOBAL, '', '', DefaultValue.SINREGISTRO_GLOBAL, '', DefaultValue.SINREGISTRO_GLOBAL, '',
                DefaultValue.SINREGISTRO_GLOBAL, '', DefaultValue.SINREGISTRO_GLOBAL, '', DefaultValue.SINREGISTRO_GLOBAL, '', DefaultValue.SINREGISTRO_GLOBAL,
                '', DefaultValue.SINREGISTRO_GLOBAL, '', false, false, false, false, false, false, false, false, false, false, false, false,
                false, false, false, '', DefaultValue.SINREGISTRO_GLOBAL, DefaultValue.SINREGISTRO_GLOBAL,
                '', DefaultValue.SINREGISTRO_GLOBAL, DefaultValue.SINREGISTRO_GLOBAL, DefaultValue.SINREGISTRO_GLOBAL, DefaultValue.SINREGISTRO_GLOBAL,
                DefaultValue.SINREGISTRO_GLOBAL, DefaultValue.SINREGISTRO_GLOBAL, DefaultValue.SINREGISTRO_GLOBAL, false, '',
                DefaultValue.SINREGISTRO_GLOBAL, false, '', savePdf, user.nameuser, FormatDate(new Date()), '', FormatDate(new Date()));

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
        if (lsVisiometrics.length !== 0)
            setTimeWait(true);
    }, 2500);

    return (
        <MainCard title="Actualizar Visiometria">
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
                                                defaultValue={lsVisiometrics.fecha}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={4.3}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="idMotivo"
                                                label="Motivo"
                                                defaultValue={lsVisiometrics.idMotivo}
                                                options={lsMotivo}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={4.3}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="idProveedor"
                                                label="Proveedor"
                                                defaultValue={lsVisiometrics.idProveedor}
                                                options={lsProveedor}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </FormProvider>
                                    </Grid>
                                </Grid>
                            </SubCard>
                        </Grid>

                        <Grid item xs={12}>
                            <SubCard darkTitle title={<Typography variant="h4">ESTADO REFRACTIVO</Typography>}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6} lg={3}>
                                        <FormProvider {...methods}>
                                            <InputText
                                                fullWidth
                                                name="ojoDerecho"
                                                label="Ojo Derecho"
                                                defaultValue={lsVisiometrics.ojoDerecho}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={2}>
                                        <InputOnChange
                                            label="Dx Derecho"
                                            onKeyDown={handleDx1}
                                            onChange={(e) => setTextDx1(e?.target.value)}
                                            value={textDx1}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={6}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="DxDerecho"
                                                label="Dx Derecho"
                                                defaultValue={lsVisiometrics.dxDerecho}
                                                options={lsDx1}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={3}>
                                        <FormProvider {...methods}>
                                            <InputText
                                                fullWidth
                                                name="ojoIzquierdo"
                                                label="Ojo Izquierdo"
                                                defaultValue={lsVisiometrics.ojoIzquierdo}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={2}>
                                        <InputOnChange
                                            label="Dx Izquierdo"
                                            onKeyDown={handleDx2}
                                            onChange={(e) => setTextDx2(e?.target.value)}
                                            value={textDx2}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={6}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="DxIzquierdo"
                                                label="Dx Izquierdo"
                                                defaultValue={lsVisiometrics.dxIzquierdo}
                                                options={lsDx2}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </FormProvider>
                                    </Grid>
                                </Grid>
                            </SubCard>
                        </Grid>

                        <Grid item xs={12}>
                            <SubCard darkTitle title={<Typography variant="h4">LECTURA ADD</Typography>}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6} lg={2}>
                                        <FormProvider {...methods}>
                                            <InputText
                                                fullWidth
                                                name="add1"
                                                label="ADD"
                                                defaultValue={lsVisiometrics.add1}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={3}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="idLecturaAdd"
                                                label="Lectura ADD"
                                                defaultValue={lsVisiometrics.idLecturaAdd}
                                                options={lsLectura}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={3}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="idControl"
                                                label="Control"
                                                defaultValue={lsVisiometrics.idControl}
                                                options={lsControl}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={2}>
                                        <FormProvider {...methods}>
                                            <InputCheckBox
                                                label="Remitodo a Oftalmologia"
                                                name="remitidoOftalmo"
                                                size={25}
                                                defaultValue={lsVisiometrics.remitidoOftalmo}

                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={2}>
                                        <FormProvider {...methods}>
                                            <InputCheckBox
                                                label="Requiere Lentes"
                                                name="requiereLentes"
                                                size={25}
                                                defaultValue={lsVisiometrics.requiereLentes}

                                            />
                                        </FormProvider>
                                    </Grid>
                                </Grid>
                            </SubCard>
                        </Grid>

                        <Grid item xs={12}>
                            <SubCard darkTitle title={<Typography variant="h4">IMPRESIÓN DIAGNÓSTICA</Typography>}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6} lg={4}>
                                        <InputOnChange
                                            label="Dx"
                                            onKeyDown={handleDx3}
                                            onChange={(e) => setTextDx3(e?.target.value)}
                                            value={textDx3}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={8}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="DxDiagnostico"
                                                label="Dx"
                                                defaultValue={lsVisiometrics.dxDiagnostico}
                                                options={lsDx3}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </FormProvider>
                                    </Grid>
                                </Grid>
                            </SubCard>
                        </Grid>

                        <Grid item xs={12}>
                            <SubCard darkTitle>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <FormProvider {...methods}>
                                            <InputText
                                                defaultValue={lsVisiometrics.observacion}
                                                fullWidth
                                                name="observacion"
                                                label="Observación"
                                                size={matchesXS ? 'small' : 'medium'}
                                                multiline
                                                rows={6}
                                                bug={errors}
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
                            <Grid container spacing={2}>
                                <Grid item xs={2}>
                                    <AnimateButton>
                                        <Button variant="contained" onClick={handleSubmit(handleClick)} fullWidth>
                                            {TitleButton.Actualizar}
                                        </Button>
                                    </AnimateButton>
                                </Grid>

                                <Grid item xs={2}>
                                    <AnimateButton>
                                        <Button variant="outlined" fullWidth onClick={() => navigate("/paraclinics/visiometrics/list")}>
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

export default UpdateVisiometrics;