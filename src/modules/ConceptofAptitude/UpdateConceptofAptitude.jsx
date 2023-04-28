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
import { useDispatch } from 'react-redux';
import { SNACKBAR_OPEN } from 'store/actions';
import InputDatePicker from 'components/input/InputDatePicker';
import { FormatDate } from 'components/helpers/Format';
import { GetByIdConceptofAptitude, UpdateConceptofAptitudes } from 'api/clients/ConceptofAptitudeClient';
import { GetAllCatalog } from 'api/clients/CatalogClient';
import { GetAllBySubTipoCatalogo, GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import InputSelect from 'components/input/InputSelect';
import { Message, TitleButton, CodCatalogo } from 'components/helpers/Enums';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { PutConceptofAptitude } from 'formatdata/ConceptofAptitudeForm';
import SubCard from 'ui-component/cards/SubCard';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import SelectOnChange from 'components/input/SelectOnChange';
import ViewEmployee from 'components/views/ViewEmployee';
import InputText from 'components/input/InputText';
import Cargando from 'components/loading/Cargando';
import { GetByMail } from 'api/clients/UserClient';
import { generateReportConceptofAptitude } from './ReportConceptofAptitude';
import ViewPDF from 'components/components/ViewPDF';

const UpdateOrderEPP = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const theme = useTheme();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [openReport, setOpenReport] = useState(false);
    const [dataPDF, setDataPDF] = useState(null);
    const [lsCatalogo, setLsCatalogo] = useState([]);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [documento, setDocumento] = useState('');
    const [lsConcepto, setConcepto] = useState([]);
    const [idConcepto, setIdConcepto] = useState([]);

    const [lsConceptoActitud, setConceptoActitud] = useState([]);
    const [lsCodigoFilterConceptoActitud, setCodigoConceptoActitud] = useState([]);

    const dispatch = useDispatch();

    const [lsEmployee, setLsEmployee] = useState([]);
    const [idConceptoActitud, setConceptoatp] = useState('');
    const [lsDataAtencion, setLsDataAtencion] = useState([]);
    const [timeWait, setTimeWait] = useState(false);

    const methods = useForm();
    const { handleSubmit, formState: { errors } } = methods;

    async function getAll() {
        try {
            const lsServerUpdate = await GetByIdConceptofAptitude(id);
            if (lsServerUpdate.status === 200) {
                setDocumento(lsServerUpdate.data.documento);
                setIdConcepto(lsServerUpdate.data.idConcepto);
                setLsDataAtencion(lsServerUpdate.data);

                const event = {
                    target: { value: lsServerUpdate.data.documento }
                }
                handleLoadingDocument(event);
            }

            const lsServerCatalogo = await GetAllCatalog(0, 0);
            var resultCatalogo = lsServerCatalogo.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsCatalogo(resultCatalogo);

            const lsServerConceptoActitud = await GetAllByTipoCatalogo(0, 0, CodCatalogo.TipoconceptoApAl);
            var resultConceptoActitud = lsServerConceptoActitud.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setConcepto(resultConceptoActitud);
            setCodigoConceptoActitud(lsServerConceptoActitud.data.entities);
        } catch (error) { }
    }

    const handleClickReport = async () => {
        try {
            setOpenReport(true);
            const lsDataReport = await GetByIdConceptofAptitude(id);
            const lsDataUser = await GetByMail(lsDataReport.data.usuarioRegistro);
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
                dispatch({
                    type: SNACKBAR_OPEN,
                    open: true,
                    message: 'Problemas al traer los datos de combo',
                    variant: 'alert',
                    alertSeverity: 'error',
                    close: false,
                    transition: 'SlideUp'
                })
            }
        } catch (error) { }
    }

    const handleLoadingDocument = async (idEmployee) => {
        try {
            var lsServerEmployee = await GetByIdEmployee(idEmployee.target.value);

            if (lsServerEmployee.status === 200)
                setLsEmployee(lsServerEmployee.data);
        } catch (error) {
            setLsEmployee([]);
            setErrorMessage(Message.ErrorDeDatos);
        }
    }

    useEffect(() => {
        getAll();
    }, []);

    const handleClick = async (datos) => {
        const idConceptoActitud_DATA = idConceptoActitud == '' ? datos.idConceptoActitud : idConceptoActitud;

        const DataToUpdate = PutConceptofAptitude(id, idConcepto, documento, FormatDate(datos.fecha), idConceptoActitud_DATA,
            datos.observacionesNEMTA, user.nameuser, user.nameuser, FormatDate(new Date()), user.nameuser, FormatDate(new Date()));

        try {
            const result = await UpdateConceptofAptitudes(DataToUpdate);
            if (result.status === 200) {
                setOpenUpdate(true);
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
                title="VISTA DE REPORTE"
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
                            title="Actualizar Concepto De Aptitud"
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
                                <Grid item xs={2}>
                                    <FormProvider {...methods}>
                                        <InputDatePicker
                                            label="Fecha"
                                            name="fecha"
                                            defaultValue={lsDataAtencion.fecha}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12} md={6} lg={5}>
                                    <SelectOnChange
                                        name="idConcepto"
                                        label="Tipo de Concepto"
                                        value={idConcepto}
                                        options={lsConcepto}
                                        onChange={handleChangeConcepto}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} lg={5}>
                                    {lsConceptoActitud.length !== 0 ? (
                                        <SelectOnChange
                                            name="idConceptoActitud"
                                            label="Concepto"
                                            value={idConceptoActitud}
                                            options={lsConceptoActitud}
                                            onChange={(e) => setConceptoatp(e.target.value)}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    ) : (
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="idConceptoActitud"
                                                label="Concepto"
                                                defaultValue={lsDataAtencion.idConceptoActitud}
                                                disabled
                                                options={lsCatalogo}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors.idConceptoActitud}
                                            />
                                        </FormProvider>
                                    )}
                                </Grid>

                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue={lsDataAtencion.observacionesNEMTA}
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
                                            <Button variant="outlined" fullWidth onClick={() => navigate("/conceptofaptitude/list")}>
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

export default UpdateOrderEPP;