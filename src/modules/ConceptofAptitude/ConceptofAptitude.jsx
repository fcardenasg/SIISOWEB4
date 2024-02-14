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
import { Message, TitleButton, CodCatalogo } from 'components/helpers/Enums';
import { GetAllByTipoCatalogo, GetAllBySubTipoCatalogo } from 'api/clients/CatalogClient';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { PostConceptofAptitude } from 'formatdata/ConceptofAptitudeForm';
import SubCard from 'ui-component/cards/SubCard';
import InputText from 'components/input/InputText';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import ViewEmployee from 'components/views/ViewEmployee';
import { GetByMail } from 'api/clients/UserClient';
import { generateReportConceptofAptitude } from './ReportConceptofAptitude';
import ViewPDF from 'components/components/ViewPDF';
import SelectOnChange from 'components/input/SelectOnChange';

const validationSchema = yup.object().shape({
    idConceptoActitud: yup.string().required(`${ValidationMessage.Requerido}`),
});

const ConceptofAptitude = () => {
    const { user } = useAuth();
    const theme = useTheme();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [openReport, setOpenReport] = useState(false);
    const [dataPDF, setDataPDF] = useState(null);

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [lsConcepto, setConcepto] = useState([]);
    const [idConcepto, setIdConcepto] = useState([]);
    const [lsConceptoActitud, setConceptoActitud] = useState([]);
    const [lsCodigoFilterConceptoActitud, setCodigoConceptoActitud] = useState([]);

    const [documento, setDocumento] = useState('');
    const [lsEmployee, setLsEmployee] = useState([]);
    const [resultData, setResultData] = useState('');

    const methods = useForm({
        resolver: yupResolver(validationSchema),
    });

    const { handleSubmit, formState: { errors }, reset } = methods;

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
                        setOpenError(true);
                        setErrorMessage(lsServerEmployee?.data.message);
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
            const lsDataReport = await GetByIdConceptofAptitude(resultData);
            const lsDataUser = await GetByMail(user.nameuser);
            const dataPDFTwo = generateReportConceptofAptitude(lsDataReport.data, lsDataUser.data);

            setDataPDF(dataPDFTwo);
        } catch (err) { }
    };

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

    async function getAll() {
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
        getAll();
    }, []);

    const handleClick = async (datos) => {
        try {
            const DataToInsert = PostConceptofAptitude(idConcepto, documento, datos.fecha, datos.idConceptoActitud,
                datos.observacionesNEMTA, user.nameuser, user.nameuser, FormatDate(new Date()), '', FormatDate(new Date()));

            if (Object.keys(datos.length !== 0)) {
                const result = await InsertConceptofAptitude(DataToInsert);
                if (result.status === 200) {
                    if (result.data === Message.NoExisteDocumento) {
                        setOpenError(true);
                        setErrorMessage(result.data);
                    } else if (result.data === Message.ErrorDocumento) {
                        setOpenError(true);
                        setErrorMessage(result.data);
                    } else {
                        setOpenSuccess(true);
                        setResultData(result.data);
                    }
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
                        title="Registrar Concepto De Aptitud"
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
                        </Grid>

                        <Grid item xs={12} sx={{ pt: 6 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={2}>
                                    <AnimateButton>
                                        <Button disabled={resultData === '' ? false : true} variant="contained" onClick={handleSubmit(handleClick)} fullWidth>
                                            {TitleButton.Guardar}
                                        </Button>
                                    </AnimateButton>
                                </Grid>

                                <Grid item xs={2}>
                                    <AnimateButton>
                                        <Button disabled={resultData !== '' ? false : true} variant="outlined" onClick={handleClickReport} fullWidth>
                                            {TitleButton.Imprimir}
                                        </Button>
                                    </AnimateButton>
                                </Grid>

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
            </Grid>
        </Fragment>
    );
};

export default ConceptofAptitude;