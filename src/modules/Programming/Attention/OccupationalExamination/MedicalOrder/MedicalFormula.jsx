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

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
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

import { GetEdad, ViewFormat } from 'components/helpers/Format';
import InputMultiSelects from 'components/input/InputMultiSelects';
import { DefaultValue, TitleButton } from 'components/helpers/Enums';
import AnimateButton from 'ui-component/extended/AnimateButton'
import SubCard from 'ui-component/cards/SubCard';

import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';
import AddBoxIcon from '@mui/icons-material/AddBox';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
import { InsertMedicalFormula } from 'api/clients/MedicalFormulaClient';
import { GetAllCIE11 } from 'api/clients/CIE11Client';
import { PostMedicalFormula } from 'formatdata/MedicalFormulaForm';
import { FormatDate } from 'components/helpers/Format';

const DetailIcons = [
    { title: 'Plantilla de texto', icons: <ListAltSharpIcon fontSize="small" /> },
    { title: 'Audio', icons: <SettingsVoiceIcon fontSize="small" /> },
    { title: 'Ver Historico', icons: <AddBoxIcon fontSize="small" /> },
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

    const [diagnostico, setDiagnostico] = useState([]);
    const [lsCie11, setLsCie11] = useState([]);

    const methods = useForm();
    const { handleSubmit, errors, reset } = methods;

    async function GetAll() {
        try {
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
            var saveTipoOrden = tipoOrden === 'Formula' ? DefaultValue.TIPO_ORDEN_FORMULA :
                tipoOrden === 'Laboratorio' ? DefaultValue.TIPO_ORDEN_LABORATORIO :
                    tipoOrden === 'Imagenes' ? DefaultValue.TIPO_ORDEN_IMAGEN :
                        tipoOrden === 'Examenes' ? DefaultValue.TIPO_ORDEN_EXAMEN : DefaultValue.SINREGISTRO_GLOBAL;

            const DataToInsert = PostMedicalFormula(FormatDate(new Date()), documento, DefaultValue.SINREGISTRO_GLOBAL,
                lsAtencion.id, saveTipoOrden, JSON.stringify(diagnostico), datos.descripcion,
                user.email, user.email, FormatDate(new Date()), '', FormatDate(new Date()));

            console.log("Datos = ", DataToInsert);

            if (Object.keys(datos.length !== 0)) {
                const result = await InsertMedicalFormula(DataToInsert);
                if (result.status === 200) {
                    setOpenSuccess(true);
                    setDiagnostico([]);
                    reset();
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
                title="VISTA DE PDF"
                handleClose={() => setOpenViewPdf(false)}
            >

            </FullScreenDialog>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <SubCard darkTitle title={<Typography variant="h4">DATOS DEL PACIENTE</Typography>}>
                        <Grid container justifyContent="left" alignItems="center" spacing={2}>

                            <Grid item xs={5}>
                                <Grid container justifyContent="center" alignItems="center" spacing={2}>
                                    <Grid item xs={4}>
                                        <Avatar sx={{ width: 100, height: 100 }} src={lsEmployee.imagenUrl != null ? lsEmployee.imagenUrl : User} />
                                    </Grid>

                                    <Grid item xs={2} />

                                    <Grid item xs={4}>
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
                                </Grid>
                            </Grid>

                            {lsEmployee.length != 0 ?
                                <Grid item xs={7}>
                                    <Typography variant="h2" component="div">
                                        {lsEmployee.nombres}
                                    </Typography>
                                    <Grid container spacing={1} direction="row" justifyContent="left" alignItems="center">
                                        <Grid item>
                                            <Typography variant="h5">{lsEmployee.nameGenero}</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h5">{GetEdad(new Date(lsEmployee.fechaNaci))} A??OS</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid> : <Grid item xs={7}></Grid>
                            }

                            <Grid item xs={12}>
                                <Divider />
                            </Grid>

                            <Grid item xs={12}>
                                <Grid container justifyContent="center" alignItems="center" spacing={2}>
                                    <Grid item xs={4}>
                                        <Typography variant="h5" align="center">Fecha: {ViewFormat(new Date())}</Typography>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <Typography variant="h5" align="center">Tipo Orden: {tipoOrden}</Typography>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <Typography variant="h5" align="center">Atenci??n: {lsAtencion.nameAtencion}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12}>
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
                                                rows={2}
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
                                    <Grid item xs={4}>
                                        <AnimateButton>
                                            <Button variant="contained" onClick={handleSubmit(handleClick)} fullWidth>
                                                {TitleButton.Guardar}
                                            </Button>
                                        </AnimateButton>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <AnimateButton>
                                            <Button variant="outlined" fullWidth>
                                                {TitleButton.Imprimir}
                                            </Button>
                                        </AnimateButton>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <AnimateButton>
                                            <Button variant="outlined" fullWidth onClick={() => {
                                                setUpdateMedicalFormula(false);
                                                setNewMedicalFormula(false);
                                                setListMedicalFormula(true);
                                            }}>
                                                {TitleButton.Cancelar}
                                            </Button>
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