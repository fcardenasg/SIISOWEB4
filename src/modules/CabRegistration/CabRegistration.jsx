import { useState, useEffect, Fragment } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery,
    Typography,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { ValidationMessage } from 'components/helpers/Enums';
import { yupResolver } from '@hookform/resolvers/yup';
import { MessageSuccess, MessageError } from 'components/alert/AlertAll';
import useAuth from 'hooks/useAuth';
import ControlModal from 'components/controllers/ControlModal';
import InputDatePicker from 'components/input/InputDatePicker';
import { FormatDate } from 'components/helpers/Format';
import { GetByIdCabRegistration, InsertCabRegistration } from 'api/clients/CabRegistrationClient';
import InputSelect from 'components/input/InputSelect';
import { Message, DefaultValue, TitleButton, CodCatalogo } from 'components/helpers/Enums';
import { GetAllByTipoCatalogo, GetAllBySubTipoCatalogo } from 'api/clients/CatalogClient';
import InputText from 'components/input/InputText';
import DetailedIcon from 'components/controllers/DetailedIcon';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { PostCabRegistration } from 'formatdata/CabRegistrationForm';
import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';
import SubCard from 'ui-component/cards/SubCard';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import FullScreenDialog from 'components/controllers/FullScreenDialog';
import ViewEmployee from 'components/views/ViewEmployee';
import { GetAllUser, GetByMail } from 'api/clients/UserClient';
import { generateReporteReportCabRegistration } from './ReportCabRegistration';
import ViewPDF from 'components/components/ViewPDF';
import { GetAllByCodeOrName } from 'api/clients/CIE11Client';
import InputOnChange from 'components/input/InputOnChange';

const validationSchema = yup.object().shape({
    idContingencia: yup.string().required(`${ValidationMessage.Requerido}`),
});


const DetailIcons = [
    { title: 'Plantilla de texto', icons: <ListAltSharpIcon fontSize="small" /> },
    { title: 'Audio', icons: <SettingsVoiceIcon fontSize="small" /> },
]

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
    const [openTemplate, setOpenTemplate] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [textDx1, setTextDx1] = useState('');
    const [lsDx1, setLsDx1] = useState([]);
    const [documento, setDocumento] = useState('');
    const [open, setOpen] = useState(false);
    const [lsEmployee, setLsEmployee] = useState([]);

    const [result, setResult] = useState([]);

    const methods = useForm({
        resolver: yupResolver(validationSchema),
    });

    const { handleSubmit, formState: { errors }, reset } = methods;

    const handleDocumento = async (event) => {
        try {
            setDocumento(event?.target.value);
            if (event.key === 'Enter') {
                if (event?.target.value !== "") {
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




    const handleClickReport = async () => {
        try {
            setOpenReport(true);
            const lsDataReport = await GetByIdCabRegistration(result.idRegistroTaxi);
            const lsDataUser = await GetByMail(user.nameuser);
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





    async function GetAll() {
        try {

      

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





        } catch (error) { }
    }

    useEffect(() => {
        GetAll();
    }, [])




    const handleClick = async (datos) => {
        try {
            const DataToInsert = PostCabRegistration(documento, FormatDate(datos.fecha), datos.diagnostico,
                datos.motivoTraslado, datos.idContingencia, datos.idRuta, datos.idDestino, datos.nroTaxi, datos.idCargadoa, datos.idCupo, datos.idMedico,
                user.nameuser, FormatDate(new Date()), '', FormatDate(new Date()));

            if (Object.keys(datos.length !== 0)) {
                const result = await InsertCabRegistration(DataToInsert);

                if (result.status === 200) {
                    setOpenSuccess(true);
                    setDocumento('');
                    setLsEmployee([]);
                    reset();
                    setResult(result.data)
                }
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage('Este código ya existe');
        }
    };


    return (
        <Fragment>
            <MessageSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />



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
                        title="REGISTRAR TAXIS"
                        key={lsEmployee.documento}
                        documento={documento}
                        onChange={(e) => setDocumento(e.target.value)}
                        lsEmployee={lsEmployee}
                        handleDocumento={handleDocumento}
                    />
                </Grid>

                <Grid item xs={12}>
                    <SubCard>
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha"
                                        name="fecha"
                                        defaultValue={new Date()}
                                    />
                                </FormProvider>
                            </Grid>



                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="idContingencia"
                                        label="Contingencia"
                                        defaultValue=""
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
                                        defaultValue=""
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
                                        defaultValue=""
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
                                        defaultValue=""
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
                                        defaultValue=""
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
                                        defaultValue=""
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
                                        defaultValue=""
                                        options={lsMedico}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.idMedico}
                                    />
                                </FormProvider>
                            </Grid>
                          
                        </Grid>
                        </SubCard>

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

                                {result.length !== 0 ?
                                    <Grid item xs={2}>
                                        <AnimateButton>
                                            <Button variant="contained" onClick={handleClickReport} fullWidth>
                                                {TitleButton.Imprimir}
                                            </Button>
                                        </AnimateButton>
                                    </Grid> : null}

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
            </Grid >
        </Fragment >
    );
};

export default CabRegistration;