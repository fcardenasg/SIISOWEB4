import { useState, useEffect, Fragment } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery,
    Typography
} from '@mui/material';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';

import ViewEmployee from 'components/views/ViewEmployee';
import { MessageSuccess, MessageError } from 'components/alert/AlertAll';
import useAuth from 'hooks/useAuth';
import InputText from 'components/input/InputText';
import DetailedIcon from 'components/controllers/DetailedIcon';
import ControlModal from 'components/controllers/ControlModal';
import ControllerListen from 'components/controllers/ControllerListen';
import FullScreenDialog from 'components/controllers/FullScreenDialog';
import ListPlantillaAll from 'components/template/ListPlantillaAll';

import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import InputMultiSelects from 'components/input/InputMultiSelects';
import InputSelect from 'components/input/InputSelect';
import InputDatePicker from 'components/input/InputDatePicker';
import { CodCatalogo, Message, TitleButton } from 'components/helpers/Enums';
import AnimateButton from 'ui-component/extended/AnimateButton'
import SubCard from 'ui-component/cards/SubCard';

import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';
import AddBoxIcon from '@mui/icons-material/AddBox';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import { InsertMedicalFormula } from 'api/clients/MedicalFormulaClient';
import { GetAllCIE11 } from 'api/clients/CIE11Client';
import { PostMedicalFormula } from 'formatdata/MedicalFormulaForm';
import { FormatDate } from 'components/helpers/Format';

const DetailIcons = [
    { title: 'Plantilla de texto', icons: <ListAltSharpIcon fontSize="small" /> },
    { title: 'Audio', icons: <SettingsVoiceIcon fontSize="small" /> },
    { title: 'Ver Historico', icons: <AddBoxIcon fontSize="small" /> },
]

const MedicalFormula = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [openSuccess, setOpenSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [openError, setOpenError] = useState(false);
    const [open, setOpen] = useState(false);
    const [openTemplate, setOpenTemplate] = useState(false);
    const [openViewPdf, setOpenViewPdf] = useState(false);

    const [documento, setDocumento] = useState('');
    const [diagnostico, setDiagnostico] = useState([]);
    const [lsEmployee, setLsEmployee] = useState([]);
    const [lsCie11, setLsCie11] = useState([]);
    const [lsTipoOrden, setLsTipoOrden] = useState([]);
    const [lsContingencia, setLsContingencia] = useState([]);

    const methods = useForm();
    const { handleSubmit, errors, reset } = methods;
    /* { resolver: yupResolver(validationSchema) } */

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

    async function GetAll() {
        try {
            const lsServerTipoOrden = await GetAllByTipoCatalogo(0, 0, CodCatalogo.RECE_TIPORDEN);
            var resultTipoOrden = lsServerTipoOrden.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsTipoOrden(resultTipoOrden);

            const lsServerContingencia = await GetAllByTipoCatalogo(0, 0, CodCatalogo.RECE_CONTINGENCIA);
            var resultContingencia = lsServerContingencia.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsContingencia(resultContingencia);

            const lsServerCie11 = await GetAllCIE11(0, 0);
            var resultCie11 = lsServerCie11.data.entities.map((item) => ({
                value: item.id,
                label: item.dx
            }));
            setLsCie11(resultCie11);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        GetAll();
    }, [])

    const handleClick = async (datos) => {
        try {
            const DataToInsert = PostMedicalFormula(FormatDate(datos.fecha), documento, datos.idContingencia,
                datos.numeroHistoria, datos.idTipoRemision, JSON.stringify(diagnostico), datos.descripcion,
                user.email, user.email, FormatDate(new Date()), '', FormatDate(new Date()));

            console.log("Datos = ", DataToInsert);

            if (Object.keys(datos.length !== 0)) {
                const result = await InsertMedicalFormula(DataToInsert);
                if (result.status === 200) {
                    setOpenSuccess(true);
                    setDocumento('');
                    setLsEmployee([]);
                    setDiagnostico([]);
                    reset();
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
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

            <FullScreenDialog
                open={openTemplate}
                title="LISTADO DE PLANTILLA"
                handleClose={() => setOpenTemplate(false)}
            >
                <ListPlantillaAll />
            </FullScreenDialog>

            <FullScreenDialog
                open={openViewPdf}
                title="VISTA DE PDF"
                handleClose={() => setOpenViewPdf(false)}
            >

            </FullScreenDialog>

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
                    <SubCard darkTitle title={<Typography variant="h4">GENERAR ORDEN</Typography>}>
                        <Grid container justifyContent="center" alignItems="center" spacing={2}>
                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha"
                                        name="fecha"
                                        defaultValue={new Date()}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="idTipoRemision"
                                        label="Tipo de Orden"
                                        defaultValue=""
                                        options={lsTipoOrden}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="idContingencia"
                                        label="Contingencia"
                                        defaultValue=""
                                        options={lsContingencia}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>

                <Grid item xs={12}>
                    <SubCard darkTitle title={<Typography variant="h4">INDICACIÓN MÉDICA</Typography>}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <InputMultiSelects
                                    fullWidth
                                    onChange={(event, value) => setDiagnostico(value)}
                                    value={diagnostico}
                                    label="Diagnostico"
                                    options={lsCie11}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormProvider {...methods}>
                                    <InputText
                                        multiline
                                        rows={4}
                                        defaultValue=""
                                        fullWidth
                                        name="descripcion"
                                        label="Descripcion"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid container spacing={2} justifyContent="left" alignItems="center" sx={{ pt: 2 }}>
                                <DetailedIcon
                                    title={DetailIcons[0].title}
                                    onClick={() => setOpenTemplate(true)}
                                    icons={DetailIcons[0].icons}
                                />

                                <DetailedIcon
                                    title={DetailIcons[1].title}
                                    onClick={() => setOpen(true)}
                                    icons={DetailIcons[1].icons}
                                />

                                <DetailedIcon
                                    title={DetailIcons[2].title}
                                    onClick={() => setOpenViewPdf(true)}
                                    icons={DetailIcons[2].icons}
                                />
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sx={{ pt: 4 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <AnimateButton>
                                        <Button variant="contained" onClick={handleSubmit(handleClick)} fullWidth>
                                            {TitleButton.Guardar}
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                                <Grid item xs={6}>
                                    <AnimateButton>
                                        <Button variant="outlined" fullWidth onClick={() => navigate("/medicalformula/list")}>
                                            {TitleButton.Cancelar}
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
            </Grid>
        </Fragment >
    );
};

export default MedicalFormula;