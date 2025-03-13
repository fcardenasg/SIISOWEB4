import { yupResolver } from '@hookform/resolvers/yup';
import {
    Button,
    Grid,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { MessageError, MessageSuccess } from 'components/alert/AlertAll';
import ViewPDF from 'components/components/ViewPDF';
import ControlModal from 'components/controllers/ControlModal';
import {
    CodCatalogo,
    DefaultValue,
    Message,
    TitleButton,
    ValidationMessage
} from 'components/helpers/Enums';
import InputDatePicker from 'components/input/InputDatePicker';
import InputOnChange from 'components/input/InputOnChange';
import InputSelect from 'components/input/InputSelect';
import InputText from 'components/input/InputText';
import ViewEmployee from 'components/views/ViewEmployee';
import { PostCabRegistration } from 'formatdata/CabRegistrationForm';
import useAuth from 'hooks/useAuth';
import { Fragment, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import * as yup from 'yup';
import { generateReporteReportCabRegistration } from './ReportCabRegistration';
import { GetByTipoCatalogoCombo } from 'api/clients/CatalogClient';
import { GetAllComboRegTaxi, GetByMail } from 'api/clients/UserClient';
import { GetByIdCabRegistration, InsertCabRegistration } from 'api/clients/CabRegistrationClient';
import { GetAllByCodeOrName } from 'api/clients/CIE11Client';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';

const validationSchema = yup.object().shape({
    idContingencia: yup.string().required(`${ValidationMessage.Requerido}`),
});

const CabRegistration = () => {
    const { user } = useAuth();
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
    const [lsTipoTransporte, setLsTipoTransporte] = useState([]);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [textDx1, setTextDx1] = useState('');
    const [lsDx1, setLsDx1] = useState([]);
    const [documento, setDocumento] = useState('');
    const [lsEmployee, setLsEmployee] = useState([]);
    const [result, setResult] = useState([]);

    const methods = useForm({
        resolver: yupResolver(validationSchema),
    });

    const { handleSubmit, formState: { errors }, reset, watch } = methods;
    const idTipoTransporte = watch("idTipoTransporte");

    const handleError = (message) => {
        setOpenError(true);
        setErrorMessage(message);
    }

    const handleDocumento = async (event) => {
        try {
            setDocumento(event?.target.value);

            if (event?.target.value !== '') {
                if (event.key === 'Enter') {
                    var lsServerEmployee = await GetByIdEmployee(event?.target.value);

                    if (lsServerEmployee?.data.status === 200) {
                        setLsEmployee(lsServerEmployee.data.data);
                    } else {
                        setLsEmployee(lsServerEmployee?.data.data);
                        handleError(lsServerEmployee?.data.message);
                    }

                } else {
                    var lsServerEmployee = await GetByIdEmployee(event?.target.value);

                    if (lsServerEmployee.data.status === 200) {
                        setLsEmployee(lsServerEmployee.data.data);
                    }
                }
            } else setLsEmployee([]);
        } catch (error) { }
    }

    const handleClickReport = async () => {
        try {
            setOpenReport(true);
            const lsDataReport = await GetByIdCabRegistration(result.idRegistroTaxi);
            const lsDataUser = await GetByMail(user?.nameuser);
            const dataPDFTwo = generateReporteReportCabRegistration(lsDataReport.data, lsDataUser.data);
            setDataPDF(dataPDFTwo);
        } catch (err) {
            handleError('Error al generar el reporte.');
        }
    };

    const handleDx1 = async (event) => {
        const value = event.target.value;
        setTextDx1(value);

        if (event.key === 'Enter' && value) {
            try {
                const lsServerCie11 = await GetAllByCodeOrName(value);
                setLsDx1(lsServerCie11.data);
            } catch (error) {
                handleError('Hubo un problema al buscar el Diagnóstico');
            }
        } else if (event.key === 'Enter') {
            handleError('Por favor, ingrese un Código o Nombre de Diagnóstico');
        }
    }

    const fetchCatalogs = async () => {
        try {
            const catalogs = await Promise.all([
                GetByTipoCatalogoCombo(CodCatalogo.Contingencia),
                GetByTipoCatalogoCombo(CodCatalogo.ORIGEN_RUTA),
                GetByTipoCatalogoCombo(CodCatalogo.DESTINO_RUTA),
                GetByTipoCatalogoCombo(CodCatalogo.NRO_TAXI),
                GetByTipoCatalogoCombo(CodCatalogo.CARGADO_A),
                GetByTipoCatalogoCombo(CodCatalogo.CUPOS),
                GetByTipoCatalogoCombo(CodCatalogo.TipoTransporte),
                GetAllComboRegTaxi()
            ]);
            setLsContingencia(catalogs[0].data);
            setLsRuta(catalogs[1].data);
            setLsDestino(catalogs[2].data);
            setLsnroTaxi(catalogs[3].data);
            setLsCargadoa(catalogs[4].data);
            setLsCupo(catalogs[5].data);

            const sortedTransporte = catalogs[6].data.sort((a, b) => { return a.value - b.value; });
            setLsTipoTransporte(sortedTransporte);

            setLsMedico(catalogs[7].data);
        } catch (error) {
            handleError('Error al cargar los catálogos.');
        }
    }

    useEffect(() => {
        fetchCatalogs();
    }, [])

    const handleClick = async (datos) => {
        try {
            const DataToInsert = PostCabRegistration(
                documento,
                datos.fecha,
                datos.diagnostico,
                datos.motivoTraslado,
                datos.idContingencia,
                datos.idRuta,
                datos.idDestino,
                datos.nroTaxi,
                datos.idCargadoa,
                datos.idCupo,
                datos.idMedico,
                datos.idTipoTransporte,
                datos.cualTransporte,
                user?.nameuser
            );

            if (Object.keys(datos).length !== 0) {
                const result = await InsertCabRegistration(DataToInsert);
                if (result.status === 200) {
                    setOpenSuccess(true);
                    reset();
                    setTextDx1('');
                    setLsDx1([]);
                    setDocumento('');
                    setLsEmployee([]);
                    setResult(result.data);
                }
            }
        } catch (error) {
            handleError(Message.RegistroNoGuardado);
        }
    };

    return (
        <Fragment>
            <MessageSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />
            <ControlModal
                title={Message.VistaReporte}
                open={openReport}
                onClose={() => setOpenReport(false)}
                maxWidth="xl"
            >
                <ViewPDF dataPDF={dataPDF} />
            </ControlModal>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <ViewEmployee
                        title="Registrar solicitud de taxi"
                        key={lsEmployee?.documento}
                        documento={documento}
                        onChange={(e) => setDocumento(e.target.value)}
                        lsEmployee={lsEmployee}
                        handleDocumento={handleDocumento}
                    />
                </Grid>

                <Grid item xs={12}>
                    <SubCard>
                        <Grid container spacing={2}>
                            <FormProvider {...methods}>
                                <Grid item xs={12} md={6} lg={4}>
                                    <InputDatePicker
                                        label="Fecha"
                                        name="fecha"
                                        defaultValue={new Date()}
                                    />
                                </Grid>

                                {[
                                    { name: "idContingencia", label: "Contingencia", options: lsContingencia },
                                    { name: "idRuta", label: "Ruta", options: lsRuta },
                                    { name: "idDestino", label: "Destino", options: lsDestino },
                                    { name: "idCargadoa", label: "Cargado a", options: lsCargadoa },
                                    { name: "idCupo", label: "Cupo", options: lsCupo },
                                    { name: "nroTaxi", label: "Numero Taxi", options: lsnroTaxi },
                                    { name: "idMedico", label: "Asigna", options: lsMedico },
                                    { name: "idTipoTransporte", label: "Tipo de transporte", options: lsTipoTransporte },
                                ].map(({ name, label, options }) => (
                                    <Grid item xs={12} md={6} lg={4} key={name}>
                                        <InputSelect
                                            name={name}
                                            label={label}
                                            defaultValue=""
                                            options={options}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors[name]}
                                        />
                                    </Grid>
                                ))}

                                {idTipoTransporte === DefaultValue.TIPO_TRANSPORTE_OTRO && (
                                    <Grid item xs={12} md={6} lg={4}>
                                        <InputText
                                            defaultValue=""
                                            fullWidth
                                            name="cualTransporte"
                                            label="¿Cuál es el transporte?"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>
                                )}
                            </FormProvider>
                        </Grid>
                    </SubCard>
                </Grid>

                <Grid item xs={12}>
                    <SubCard darkTitle title={<Typography variant="h4">INDICACIÓN MÉDICA</Typography>}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={4} lg={3}>
                                <InputOnChange
                                    label="Dx"
                                    onKeyDown={handleDx1}
                                    onChange={(e) => setTextDx1(e.target.value)}
                                    value={textDx1}
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </Grid>
                            <Grid item xs={12} md={8} lg={9}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="diagnostico"
                                        label="Diagnóstico"
                                        defaultValue=""
                                        options={lsDx1}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={12}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
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

                        <Grid item xs={12} sx={{ pt: 6 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={2}>
                                    <AnimateButton>
                                        <Button variant="contained" onClick={handleSubmit(handleClick)} fullWidth>
                                            {TitleButton.Guardar}
                                        </Button>
                                    </AnimateButton>
                                </Grid>

                                <Grid item xs={2}>
                                    <AnimateButton>
                                        <Button disabled={result.length === 0} variant="contained" onClick={handleClickReport} fullWidth>
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
            </Grid>
        </Fragment>
    );
};

export default CabRegistration;