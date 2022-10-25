import PropTypes from 'prop-types';
import { useState, useEffect, Fragment } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery,
    Divider,
    Avatar,
    TextField,
    Typography
} from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';

import User from 'assets/img/user.png';
import { MessageSuccess, MessageError } from 'components/alert/AlertAll';
import useAuth from 'hooks/useAuth';
import InputText from 'components/input/InputText';
import DetailedIcon from 'components/controllers/DetailedIcon';
import ControlModal from 'components/controllers/ControlModal';
import ControllerListen from 'components/controllers/ControllerListen';
import FullScreenDialog from 'components/controllers/FullScreenDialog';
import ListPlantillaAll from 'components/template/ListPlantillaAll';
import ListMedicalFormula from 'components/template/ListMedicalFormula';

import { GetEdad, ViewFormat } from 'components/helpers/Format';
import InputMultiSelects from 'components/input/InputMultiSelects';
import { DefaultValue, TitleButton } from 'components/helpers/Enums';
import AnimateButton from 'ui-component/extended/AnimateButton'
import SubCard from 'ui-component/cards/SubCard';

import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';
import AddBoxIcon from '@mui/icons-material/AddBox';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
import { GetByIdMedicalFormula, InsertMedicalFormula } from 'api/clients/MedicalFormulaClient';
import { GetAllByCodeOrName, GetAllCIE11 } from 'api/clients/CIE11Client';
import { PostMedicalFormula } from 'formatdata/MedicalFormulaForm';
import { FormatDate } from 'components/helpers/Format';
import ViewPDF from 'components/components/ViewPDF';
import { GetByMail } from 'api/clients/UserClient';
import { generateReport } from './Report';
import InputOnChange from 'components/input/InputOnChange';
import InputSelect from 'components/input/InputSelect';

const DetailIcons = [
    { title: 'Plantilla de texto', icons: <ListAltSharpIcon fontSize="small" /> },
    { title: 'Audio', icons: <SettingsVoiceIcon fontSize="small" /> },
    { title: 'Ver Medicamentos', icons: <AddBoxIcon fontSize="small" /> },
]

const MedicalFormula = ({ setListMedicalFormula, setNewMedicalFormula, setUpdateMedicalFormula, tipoOrden, lsEmployee, setDocumento, documento, lsAtencion }) => {
    const { user } = useAuth();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [openSuccess, setOpenSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [openError, setOpenError] = useState(false);
    const [open, setOpen] = useState(false);
    const [openTemplate, setOpenTemplate] = useState(false);
    const [openViewPdf, setOpenViewPdf] = useState(false);

    const [resultData, setResultData] = useState([]);
    const [openReport, setOpenReport] = useState(false);
    const [dataPDF, setDataPDF] = useState(null);

    const [lsDx, setLsDx] = useState([]);
    const [textDx, setTextDx] = useState('');

    const methods = useForm();
    const { handleSubmit, errors, reset } = methods;

    const handleDx = async (event) => {
        try {
            setTextDx(event.target.value);

            if (event.key === 'Enter') {
                if (event.target.value !== "") {
                    var lsServerCie11 = await GetAllByCodeOrName(0, 0, event.target.value);

                    if (lsServerCie11.status === 200) {
                        var resultCie11 = lsServerCie11.data.entities.map((item) => ({
                            value: item.id,
                            label: item.dx
                        }));
                        setLsDx(resultCie11);
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

    const handleClickReport = async () => {
        try {
            setOpenReport(true);
            const lsDataReport = await GetByIdMedicalFormula(resultData.idRecetario);
            const lsDataUser = await GetByMail(user.email);

            const dataPDFTwo = generateReport(lsDataReport.data, lsDataUser.data);
            setDataPDF(dataPDFTwo);
        } catch (err) { }
    };

    const handleClick = async (datos) => {
        try {
            var saveTipoOrden = tipoOrden === 'Formula' ? DefaultValue.TIPO_ORDEN_FORMULA :
                tipoOrden === 'Laboratorio' ? DefaultValue.TIPO_ORDEN_LABORATORIO :
                    tipoOrden === 'Imagenes' ? DefaultValue.TIPO_ORDEN_IMAGEN :
                        tipoOrden === 'Examenes' ? DefaultValue.TIPO_ORDEN_EXAMEN : DefaultValue.SINREGISTRO_GLOBAL;

            const DataToInsert = PostMedicalFormula(FormatDate(new Date()), documento, lsAtencion.motivo,
                lsAtencion.id, saveTipoOrden, datos.diagnostico, datos.descripcion,
                user.email, user.email, FormatDate(new Date()), '', FormatDate(new Date()));

            if (Object.keys(datos.length !== 0)) {
                const result = await InsertMedicalFormula(DataToInsert);
                if (result.status === 200) {
                    setOpenSuccess(true);
                    setTextDx('');
                    reset();
                    setResultData(result.data)
                }
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(`${error}`);
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
                title="LISTA DE MEDICAMENTOS"
                handleClose={() => setOpenViewPdf(false)}
            >
                <ListMedicalFormula />
            </FullScreenDialog>

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
                    <SubCard darkTitle title={<Typography variant="h4">DATOS DEL PACIENTE</Typography>}>
                        <Grid container justifyContent="left" alignItems="center" spacing={2}>

                            <Grid item xs={12}>
                                <Grid container justifyContent="center" alignItems="center" spacing={2}>
                                    <Grid item xs={2}>
                                        <Avatar sx={{ width: 80, height: 80 }} src={lsEmployee.imagenUrl !== null ? lsEmployee.imagenUrl : User} />
                                    </Grid>

                                    <Grid item xs={2}>
                                        <TextField
                                            value={documento}
                                            onChange={(e) => setDocumento(e.target.value)}
                                            fullWidth
                                            disabled={true}
                                            id="standard-basic"
                                            label="Documento"
                                            variant="standard"
                                        />
                                    </Grid>

                                    <Grid item xs={5}>
                                        <Typography variant="h4" component="div">
                                            {lsEmployee.nombres}
                                        </Typography>
                                        <Grid container spacing={1} direction="row" justifyContent="left" alignItems="center">
                                            <Grid item>
                                                <Typography variant="h6">{lsEmployee.nameGenero}</Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="h6">{GetEdad(new Date(lsEmployee.fechaNaci))} AÑOS</Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <Grid container spacing={1}>
                                            <Grid item xs={12}>
                                                <Typography variant="h5" align="left"><b>Fecha:</b> {ViewFormat(new Date())}</Typography>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <Typography variant="h5" align="left"><b>Tipo Orden:</b> {tipoOrden.toUpperCase()}</Typography>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <Typography variant="h5" align="left"><b>Atención:</b> {lsAtencion.nameAtencion}</Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12}>
                                <Divider />
                            </Grid>

                            <Grid item xs={12}>
                                <Grid container spacing={2}>
                                    <Grid item xs={3}>
                                        <InputOnChange
                                            label="Dx"
                                            onKeyDown={handleDx}
                                            onChange={(e) => setTextDx(e?.target.value)}
                                            value={textDx}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </Grid>
                                    <Grid item xs={9}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="diagnostico"
                                                label="Dx"
                                                defaultValue=""
                                                options={lsDx}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </FormProvider>
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
                            </Grid>

                            <Grid item xs={12}>
                                <Grid container spacing={2}>
                                    <Grid item xs={3}>
                                        <AnimateButton>
                                            <Button disabled={resultData.length !== 0 ? true : false} variant="contained" onClick={handleSubmit(handleClick)} fullWidth>
                                                {TitleButton.Guardar}
                                            </Button>
                                        </AnimateButton>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <AnimateButton>
                                            <Button disabled={resultData.length === 0 ? true : false} variant="outlined" onClick={handleClickReport} fullWidth>
                                                {TitleButton.Imprimir}
                                            </Button>
                                        </AnimateButton>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <AnimateButton>
                                            <Button variant="outlined" fullWidth onClick={() => {
                                                setUpdateMedicalFormula(false);
                                                setNewMedicalFormula(false);
                                                setListMedicalFormula(true);
                                            }}>
                                                {TitleButton.Cancelar}</Button>
                                        </AnimateButton>
                                    </Grid>
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

MedicalFormula.propTypes = {
    setListMedicalFormula: PropTypes.func,
    setNewMedicalFormula: PropTypes.func,
    setUpdateMedicalFormula: PropTypes.func,
    tipoOrden: PropTypes.any,
    lsEmployee: PropTypes.any,
    setDocumento: PropTypes.any,
    documento: PropTypes.any,
    lsAtencion: PropTypes.any,
};