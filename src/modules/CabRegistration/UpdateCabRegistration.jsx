import { useState, useEffect, Fragment } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery,
    Typography,
} from '@mui/material';

import { useNavigate, useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import ControlModal from 'components/controllers/ControlModal';
import { MessageUpdate, MessageError } from 'components/alert/AlertAll';
import useAuth from 'hooks/useAuth';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputDatePicker from 'components/input/InputDatePicker';
import { FormatDate } from 'components/helpers/Format';
import { GetByIdCabRegistration, UpdateCabRegistrations } from 'api/clients/CabRegistrationClient';
import { GetAllByCodeOrName } from 'api/clients/CIE11Client';
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import InputSelect from 'components/input/InputSelect';
import { Message, DefaultValue, TitleButton, CodCatalogo, ValidationMessage } from 'components/helpers/Enums';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { PutCabRegistration } from 'formatdata/CabRegistrationForm';
import SubCard from 'ui-component/cards/SubCard';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import ViewEmployee from 'components/views/ViewEmployee';
import InputText from 'components/input/InputText';
import Cargando from 'components/loading/Cargando';
import { GetAllUser, GetByMail } from 'api/clients/UserClient';
import { generateReporteReportCabRegistration } from './ReportCabRegistration';
import ViewPDF from 'components/components/ViewPDF';
import InputOnChange from 'components/input/InputOnChange';

const validationSchema = yup.object().shape({
    idContingencia: yup.string().required(`${ValidationMessage.Requerido}`),
});

const UpdateCabRegistration = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const theme = useTheme();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [openReport, setOpenReport] = useState(false);
    const [dataPDF, setDataPDF] = useState(null);

    const [lsContingencia, setLsContingencia] = useState([]);
    const [lsRuta, setLsRuta] = useState([]);
    const [lsDestino, setLsDestino] = useState([]);
    const [lsnroTaxi, setLsnroTaxi] = useState([]);
    const [lsCargadoa, setLsCargadoa] = useState([]);
    const [lsCupo, setLsCupo] = useState([]);
    const [lsMedico, setLsMedico] = useState([]);
    const [textDx1, setTextDx1] = useState('');
    const [lsDx1, setLsDx1] = useState([]);

    const [openUpdate, setOpenUpdate] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [documento, setDocumento] = useState('');
    const [lsEmployee, setLsEmployee] = useState([]);
    const [lsDataAtencion, setLsDataAtencion] = useState([]);
    const [timeWait, setTimeWait] = useState(false);

    const methods = useForm({
        resolver: yupResolver(validationSchema),
    });

    const { handleSubmit, formState: { errors } } = methods;

    async function getAll() {
        try {
            const lsServerUpdate = await GetByIdCabRegistration(id);
            if (lsServerUpdate.status === 200) {
                setDocumento(lsServerUpdate.data.documento);
                handleLoadingDocument(lsServerUpdate.data.documento);
                setLsDataAtencion(lsServerUpdate.data);
            }

            const lsServerContingencia = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Contingencia);
            var resultContingencia = lsServerContingencia.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsContingencia(resultContingencia);

            const lsServerRuta = await GetAllByTipoCatalogo(0, 0, CodCatalogo.ORIGEN_RUTA);
            var resultRuta = lsServerRuta.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsRuta(resultRuta);

            const lsServerDestino = await GetAllByTipoCatalogo(0, 0, CodCatalogo.DESTINO_RUTA);
            var resultDestino = lsServerDestino.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsDestino(resultDestino);


            const lsServernroTaxi = await GetAllByTipoCatalogo(0, 0, CodCatalogo.NRO_TAXI);
            var resultnroTaxi = lsServernroTaxi.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsnroTaxi(resultnroTaxi);

            const lsServerCargadoa = await GetAllByTipoCatalogo(0, 0, CodCatalogo.CARGADO_A);
            var resultCargadoa = lsServerCargadoa.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsCargadoa(resultCargadoa);


            const lsServerCupo = await GetAllByTipoCatalogo(0, 0, CodCatalogo.CUPOS);
            var resultCupo = lsServerCupo.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsCupo(resultCupo);

            const lsServerMedicos = await GetAllUser(0, 0);
            var resultMedico = lsServerMedicos.data.entities.filter(user => user.idRol === DefaultValue.ROL_MEDICO)
                .map((item) => ({
                    value: item.id,
                    label: item.nombre
                }));
            setLsMedico(resultMedico);

            const lsServerAtencion = await GetByIdCabRegistration(id);
            if (lsServerAtencion.status === 200) {
                setTextDx1(lsServerAtencion.data.diagnostico);
                setLsDataAtencion(lsServerAtencion.data);
                setDocumento(lsServerAtencion.data.documento);

                const event = {
                    target: { value: lsServerAtencion.data.documento }
                }
                handleLoadingDocument(event);

                var lsServerCie11 = await GetAllByCodeOrName(0, 0, lsServerAtencion.data.diagnostico);
                var resultCie11 = lsServerCie11.data.entities.map((item) => ({
                    value: item.id,
                    label: item.dx
                }));
                setLsDx1(resultCie11);
            }
        } catch (error) { }
    }

    const handleClickReport = async () => {
        try {
            setOpenReport(true);
            const lsDataReport = await GetByIdCabRegistration(id);
            const lsDataUser = await GetByMail(lsDataReport.data.usuarioRegistro);
            const dataPDFTwo = generateReporteReportCabRegistration(lsDataReport.data, lsDataUser.data);
            setDataPDF(dataPDFTwo);
        } catch (err) { }
    };

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

    useEffect(() => {
        getAll();
    }, [])

    const handleClick = async (datos) => {
        const DataToUpdate = PutCabRegistration(id, documento, FormatDate(datos.fecha), datos.diagnostico,
            datos.motivoTraslado, datos.idContingencia, datos.idRuta, datos.idDestino, datos.nroTaxi, datos.idCargadoa, datos.idCupo, datos.idMedico,
            user.nameuser, FormatDate(new Date()), user.nameuser, FormatDate(new Date()));

        try {
            if (Object.keys(datos.length !== 0)) {
                const result = await UpdateCabRegistrations(DataToUpdate);
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
        if (lsDataAtencion.length !== 0) {
            setTimeWait(true);
        }
    }, 2000);

    return (
        <Fragment>
            <MessageUpdate open={openUpdate} onClose={() => setOpenUpdate(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

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
                            title="Actualizar Taxis"
                            disabled={true}
                            key={lsEmployee.documento}
                            documento={documento}
                            onChange={(e) => setDocumento(e.target.value)}
                            lsEmployee={lsEmployee}
                            handleDocumento={handleLoadingDocument}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <SubCard darkTitle title={<Typography variant="h4"></Typography>}>
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <FormProvider {...methods}>
                                        <InputDatePicker
                                            label="Fecha"
                                            name="fecha"
                                            defaultValue={lsDataAtencion.fecha}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={3}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="idContingencia"
                                            label="Contingencia"
                                            defaultValue={lsDataAtencion.idContingencia}
                                            options={lsContingencia}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.idContingencia}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={3}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="idRuta"
                                            label="Ruta"
                                            defaultValue={lsDataAtencion.idRuta}
                                            options={lsRuta}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.idRuta}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={3}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="idDestino"
                                            label="Destino"
                                            defaultValue={lsDataAtencion.idDestino}
                                            options={lsDestino}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.idDestino}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={3}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="idCargadoa"
                                            label="Cargado a"
                                            defaultValue={lsDataAtencion.idCargadoa}
                                            options={lsCargadoa}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.idCargadoa}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={3}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="idCupo"
                                            label="Cupo"
                                            defaultValue={lsDataAtencion.idCupo}
                                            options={lsCupo}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.idCupo}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={3}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="nroTaxi"
                                            label="Numero Taxi"
                                            defaultValue={lsDataAtencion.nroTaxi}
                                            options={lsnroTaxi}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.nroTaxi}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={3}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="idMedico"
                                            label="Asigna"
                                            defaultValue={lsDataAtencion.idMedico}
                                            options={lsMedico}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.idMedico}
                                        />
                                    </FormProvider>
                                </Grid>

                            </Grid>
                        </SubCard>
                    </Grid>

                    <Grid item xs={12}>
                        <SubCard darkTitle title={<Typography variant="h4">INDICACIÓN MÉDICA</Typography>}>
                            <Grid container spacing={2}>
                                <Grid item xs={2}>
                                    <InputOnChange
                                        label="Dx"
                                        onKeyDown={handleDx1}
                                        onChange={(e) => setTextDx1(e?.target.value)}
                                        value={textDx1}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </Grid>
                                <Grid item xs={10}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="diagnostico"
                                            label="Diagnóstico"
                                            defaultValue={lsDataAtencion.diagnostico}
                                            options={lsDx1}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue={lsDataAtencion.motivoTraslado}
                                            fullWidth
                                            multiline
                                            rows={5}
                                            name="motivoTraslado"
                                            label="Motivo de Traslado"
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.motivoTraslado}
                                        />
                                    </FormProvider>
                                </Grid>

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
                                            <Button variant="contained" onClick={handleClickReport} fullWidth>
                                                {TitleButton.Imprimir}
                                            </Button>
                                        </AnimateButton>
                                    </Grid>

                                    <Grid item xs={2}>
                                        <AnimateButton>
                                            <Button variant="outlined" fullWidth onClick={() => navigate("/cabregistration/list")}>
                                                {TitleButton.Cancelar}
                                            </Button>
                                        </AnimateButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>
                </Grid > : <Cargando />
            }
        </Fragment >
    );
};

export default UpdateCabRegistration;