import { useState, useEffect, Fragment } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery,
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
import { GetByIdConceptofAptitude, InsertConceptofAptitude } from 'api/clients/ConceptofAptitudeClient';
import InputSelect from 'components/input/InputSelect';
import { Message, DefaultValue, TitleButton, CodCatalogo } from 'components/helpers/Enums';
import { GetAllByTipoCatalogo, GetAllBySubTipoCatalogo } from 'api/clients/CatalogClient';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { PostConceptofAptitude } from 'formatdata/ConceptofAptitudeForm';
import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';
import SubCard from 'ui-component/cards/SubCard';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
import InputText from 'components/input/InputText';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import FullScreenDialog from 'components/controllers/FullScreenDialog';
import { GetAllSupplier } from 'api/clients/SupplierClient';
import ViewEmployee from 'components/views/ViewEmployee';
import { GetAllUser, GetByMail } from 'api/clients/UserClient';
import { generateReportConceptofAptitude } from './ReportConceptofAptitude';
import ViewPDF from 'components/components/ViewPDF';
import SelectOnChange from 'components/input/SelectOnChange';

const validationSchema = yup.object().shape({
    idConceptoActitud: yup.string().required(`${ValidationMessage.Requerido}`),
});


const DetailIcons = [
    { title: 'Plantilla de texto', icons: <ListAltSharpIcon fontSize="small" /> },
    { title: 'Audio', icons: <SettingsVoiceIcon fontSize="small" /> },
]

const ConceptofAptitude = () => {
    const { user } = useAuth();
    const theme = useTheme();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [openReport, setOpenReport] = useState(false);
    const [dataPDF, setDataPDF] = useState(null);
    const [lsProveedor, setLsProveedor] = useState([]);

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [lsConcepto, setConcepto] = useState([]);
    const [idConcepto, setIdConcepto] = useState([]);

    const [lsConceptoActitud, setConceptoActitud] = useState([]);
    const [lsCodigoFilterConceptoActitud, setCodigoConceptoActitud] = useState([]);

    const [documento, setDocumento] = useState('');

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
            const lsDataReport = await GetByIdConceptofAptitude(result.idTrabajoenAltura);
            const lsDataUser = await GetByMail(user.nameuser);
            const dataPDFTwo = generateReportConceptofAptitude(lsDataReport.data, lsDataUser.data);

            setDataPDF(dataPDFTwo);
        } catch (err) { }
    };

    // result.idOrdenesEpp

    const handleChangeConcepto = async (event) => {
        setIdConcepto(event.target.value);

        var lsResulCode = String(lsCodigoFilterConceptoActitud.filter(code => code.idCatalogo == event.target.value).map(code => code.codigo));
        var resultConceptoA = await GetSubString(lsResulCode);
        setConceptoActitud(resultConceptoA);
    };

    async function GetSubString(codigo) {
        try {
            const lsServerCatalog = await GetAllBySubTipoCatalogo(0, 0, codigo, 5);
            if (lsServerCatalog.status === 200) {
                var resultConceptoActitud = lsServerCatalog.data.entities.map((item) => ({
                    value: item.idCatalogo,
                    label: item.nombre
                }));
                return resultConceptoActitud;
            } else {
                setOpenError(true);
                setErrorMessage('Problemas al traer los datos de combo');
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(`${error}`);
        }
    }


    async function GetAll() {
        try {



            const lsServerConceptoActitud = await GetAllByTipoCatalogo(0, 0, CodCatalogo.TipoconceptoApAl);
            var resultConceptoActitud = lsServerConceptoActitud.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setConcepto(resultConceptoActitud);

            setCodigoConceptoActitud(lsServerConceptoActitud.data.entities);


        } catch (error) { }
    }

    useEffect(() => {
        GetAll();
    }, [])




    const handleClick = async (datos) => {
        try {
            const DataToInsert = PostConceptofAptitude(idConcepto, documento, FormatDate(datos.fecha), datos.idConceptoActitud,
                datos.observacionesNEMTA, user.nameuser, FormatDate(new Date()), '', FormatDate(new Date()));


            if (Object.keys(datos.length !== 0)) {
                const result = await InsertConceptofAptitude(DataToInsert);
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
            setErrorMessage(Message.RegistroNoGuardado);
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
                        title="REGISTRAR CONCEPTOS"
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
                            <Grid item xs={2}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha"
                                        name="fecha"
                                        defaultValue={new Date()}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4} md={6} lg={4}>
                                <SelectOnChange
                                    name="idConcepto"
                                    label="Tipo de Concepto"
                                    value={idConcepto}
                                    options={lsConcepto}
                                    onChange={handleChangeConcepto}
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </Grid>
                            <Grid item xs={6} md={6} lg={6}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="idConceptoActitud"
                                        label="Concepto"
                                        options={lsConceptoActitud}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.idConceptoActitud}
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
                                        name="observacionesNEMTA"
                                        label="Observación"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.observacionesNEMTA}
                                    />
                                </FormProvider>
                            </Grid>


                            \

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
                                        <Button variant="outlined" fullWidth onClick={() => navigate("/conceptofaptitude/list")}>
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

export default ConceptofAptitude;