import { useState, useEffect, Fragment } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    Typography,
    useMediaQuery,
} from '@mui/material';

import { useNavigate, useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import {
    FormatDate, GetEdad, EdadFramigan, GetRiesgos, FrHdl, FrGlicemia, FrFuma, PuntajeFr, FrColesterol, FrTension, FrLdl_FrRelacion
} from 'components/helpers/Format';

import { MessageSuccess, MessageError, MessageUpdate } from 'components/alert/AlertAll';
import useAuth from 'hooks/useAuth';
import InputOnChange from 'components/input/InputOnChange';
import SelectOnChange from 'components/input/SelectOnChange';
import ControlModal from 'components/controllers/ControlModal';
import InputDatePicker from 'components/input/InputDatePicker';
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import { Message, TitleButton, CodCatalogo, DefaultValue } from 'components/helpers/Enums';
import AnimateButton from 'ui-component/extended/AnimateButton';
import SubCard from 'ui-component/cards/SubCard';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import ViewEmployee from 'components/views/ViewEmployee';
import { GetByMail } from 'api/clients/UserClient';
import { generateReportFramingham } from './ReportFramingham';
import ViewPDF from 'components/components/ViewPDF';
import { PostFramingham, PutFramingham } from 'formatdata/FraminghamForm';
import ViewFramingham from 'modules/Programming/Attention/OccupationalExamination/Framingham/ViewFramingham';
import DetailedIcon from 'components/controllers/DetailedIcon';
import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
import AddBoxIcon from '@mui/icons-material/AddBox';
import InputText from 'components/input/InputText';
import ControllerListen from 'components/controllers/ControllerListen';
import FullScreenDialog from 'components/controllers/FullScreenDialog';
import ListPlantillaAll from 'components/template/ListPlantillaAll';
import TableAntecedentes from 'modules/Programming/Attention/OccupationalExamination/TableEmo/TableAntecedentes';
import { GetByIdFramingham, InsertFramingham, UpdateFraminghams } from 'api/clients/FraminghamClient';
import Cargando from 'components/loading/Cargando';

const DetailIcons = [
    { title: 'Plantilla de texto', icons: <ListAltSharpIcon fontSize="small" /> },
    { title: 'Audio', icons: <SettingsVoiceIcon fontSize="small" /> },
    { title: 'Ver Historico', icons: <AddBoxIcon fontSize="small" /> },
]

const UpdateFramingham = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const theme = useTheme();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [openReport, setOpenReport] = useState(false);
    const [timeWait, setTimeWait] = useState(false);
    const [dataPDF, setDataPDF] = useState(null);
    const [result, setResult] = useState('');
    const [lsData, setLsData] = useState([]);

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [documento, setDocumento] = useState('');
    const [lsEmployee, setLsEmployee] = useState([]);

    const [open, setOpen] = useState(false);
    const [openTemplate, setOpenTemplate] = useState(false);
    const [lsOpcion, setLsOpcion] = useState([]);

    const [fuma, setFuma] = useState(undefined);
    const [colesterol, setColesterol] = useState(undefined);
    const [glicemia, setGlicemia] = useState(undefined);
    const [tencion, setTencion] = useState(undefined);

    const [frFuma, setFrFuma] = useState(undefined);
    const [frLdl, setFrLdl] = useState(undefined);
    const [relacion, setRelacion] = useState(undefined);

    const [frColesterol, setFrColesterol] = useState(undefined);
    const [frGlicemia, setFrGlicemia] = useState(undefined);
    const [frTencion, setFrTencion] = useState(undefined);
    const [frPuntaje, setFrPuntaje] = useState(undefined);

    const [trigliceridos, setTrigliceridos] = useState(undefined);
    const [frHdl, setFrHdl] = useState(undefined);
    const [hdl, setHdl] = useState(undefined);
    const [frEdad, setFrEdad] = useState(undefined);
    const [riesgo, setRiesgo] = useState({
        riesgoAbsoluto: undefined,
        riesgoRelativo: undefined,
        dxRiesgo: undefined
    });

    const [openHistory, setOpenHistory] = useState(false);
    const [cadenaHistory, setCadenaHistory] = useState('');

    const methods = useForm();

    const { handleSubmit } = methods;

    const handleLoadingDocument = async (idEmployee) => {
        try {
            var lsServerEmployee = await GetByIdEmployee(idEmployee.target.value);

            if (lsServerEmployee.status === 200) {
                setLsEmployee(lsServerEmployee.data);


            }
        } catch (error) {
            setLsEmployee([]);
            setErrorMessage(Message.ErrorDeDatos);
        }
    }

    useEffect(() => {
        async function getAll() {
            try {
                const lsServerOpcion = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Opciones_SINO);
                var resultOpcion = lsServerOpcion.data.entities.map((item) => ({
                    value: item.idCatalogo,
                    label: item.nombre
                }));
                setLsOpcion(resultOpcion);

                const lsServe = await GetByIdFramingham(id);
                if (lsServe.status === 200) {
                    setDocumento(lsServe.data.documento);
                    setLsData(lsServe.data);

                    const event = {
                        target: { value: lsServe.data.documento }
                    }
                    handleLoadingDocument(event);

                    setFuma(lsServe.data.idFumaFRA);
                    setTencion(lsServe.data.tencionFRA);
                    setColesterol(lsServe.data.colesterolTotalFRA);
                    setHdl(lsServe.data.hdlfra);
                    setTrigliceridos(lsServe.data.triglicericosFRA);
                    setGlicemia(lsServe.data.glisemiaFRA);

                    setFrLdl(lsServe.data.ldlfra);
                    setRelacion(lsServe.data.relacionFRA);
                    setFrEdad(lsServe.data.frlEdadFRA);
                    setFrColesterol(lsServe.data.frlColesterolFRA);
                    setFrHdl(lsServe.data.frhdlfra);
                    setFrGlicemia(lsServe.data.frGlisemiaFRA);
                    setFrTencion(lsServe.data.frTencionFRA);
                    setFrFuma(lsServe.data.frTabaquismoFRA);
                    setFrPuntaje(lsServe.data.puntajeFRA);

                    setRiesgo({
                        dxRiesgo: lsServe.data.interpretacionFRA,
                        riesgoAbsoluto: lsServe.data.riesgoAbsolutoFRA,
                        riesgoRelativo: lsServe.data.riesgoRelativoFRA
                    });
                }
            } catch (error) { }
        }

        getAll();
    }, []);

    const calculoFramingham = () => {
        try {
            if (lsEmployee.length !== 0) {
                if (fuma && tencion && colesterol && hdl && trigliceridos && glicemia) {
                    const frFumaa = FrFuma(fuma);
                    setFrFuma(frFumaa);

                    const frColes = FrColesterol(colesterol, lsEmployee.nameGenero);
                    setFrColesterol(frColes);

                    const frGlice = FrGlicemia(glicemia, lsEmployee.nameGenero);
                    setFrGlicemia(frGlice);

                    const frTensi = FrTension(tencion, lsEmployee.nameGenero);
                    setFrTencion(frTensi);

                    const frPunta = PuntajeFr(frEdad, frColes, frHdl, frGlice, frTensi, frFumaa);
                    setFrPuntaje(frPunta);

                    const frRelaci = FrLdl_FrRelacion(hdl, colesterol, trigliceridos);
                    setRelacion(frRelaci.relacion);
                    setFrLdl(frRelaci.ldl);

                    const frRies = GetRiesgos(frPunta, GetEdad(lsEmployee.fechaNaci), lsEmployee.nameGenero);
                    setRiesgo({
                        dxRiesgo: frRies.dxRiesgo,
                        riesgoAbsoluto: lsEmployee.nameGenero === 'MASCULINO' ? frRies.riesgoAbsolutoH : frRies.riesgoAbsolutoM,
                        riesgoRelativo: frRies.riesgoRelativo
                    });
                } else {
                    setOpenError(true);
                    setErrorMessage('Por favor, coloque todos los datos');
                }
            } else {
                setOpenError(true);
                setErrorMessage(Message.ErrorNoHayDatos);
            }
        } catch (error) { }
    }

    const handleClickReport = async () => {
        try {
            setOpenReport(true);
            const lsDataReport = await GetByIdFramingham(id);
            const lsDataUser = await GetByMail(lsDataReport.data.usuarioRegistro);

            const dataPDFTwo = generateReportFramingham(lsDataReport.data, lsDataUser.data);
            setDataPDF(dataPDFTwo);
        } catch (err) { }
    };

    const handleClick = async (datos) => {
        try {
            const DataToInsert = PutFramingham(id, documento, FormatDate(datos.fecha), tencion, FormatDate(datos.fechaLaboratorioFRA), colesterol,
                hdl, trigliceridos, glicemia, fuma, datos.observacionFRA, frLdl, relacion, frEdad, frColesterol, frHdl,
                frGlicemia, frTencion, frFuma, frPuntaje, riesgo.riesgoAbsoluto, riesgo.riesgoRelativo, riesgo.dxRiesgo,
                undefined, undefined, user.nameuser, undefined);

            if (lsEmployee.length !== 0) {
                if (fuma && tencion && colesterol && hdl && trigliceridos && glicemia) {

                    const result = await UpdateFraminghams(DataToInsert);
                    if (result.status === 200) {
                        setOpenSuccess(true);
                        setResult(result.data);
                    }

                } else {
                    setOpenError(true);
                    setErrorMessage('Por favor, coloque todos los datos');
                }
            } else {
                setOpenError(true);
                setErrorMessage(Message.ErrorNoHayDatos);
            }

        } catch (error) {
            setOpenError(true);
            setErrorMessage(Message.RegistroNoGuardado);
        }
    };

    setTimeout(() => {
        if (lsData.length !== 0)
            setTimeWait(true);
    }, 1500);

    return (
        <Fragment>
            <MessageUpdate open={openSuccess} onClose={() => setOpenSuccess(false)} />
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
                open={openHistory}
                title="VISTA DE HISTÓRICO"
                handleClose={() => setOpenHistory(false)}
            >
                <TableAntecedentes documento={documento} param={cadenaHistory} />
            </FullScreenDialog>

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
                            disabled={true}
                            title="Actualizar Framingham"
                            key={lsEmployee.documento}
                            documento={documento}
                            onChange={(e) => setDocumento(e.target.value)}
                            lsEmployee={lsEmployee}
                            handleDocumento={handleLoadingDocument}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <SubCard>
                            <Grid container spacing={2}>
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
                                    <SelectOnChange
                                        name="fumaFRA"
                                        label="Fuma"
                                        value={fuma}
                                        onChange={(e) => setFuma(e.target.value)}
                                        options={lsOpcion}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </Grid>

                                <Grid item xs={4}>
                                    <InputOnChange
                                        name="tencionFRA"
                                        label="Tensión Arterial"
                                        onChange={(e) => setTencion(e.target.value)}
                                        value={tencion}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </Grid>

                                <Grid item xs={4}>
                                    <FormProvider {...methods}>
                                        <InputDatePicker
                                            label="Fecha Laboratorio"
                                            name="fechaLaboratorioFRA"
                                            defaultValue={new Date()}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={4}>
                                    <InputOnChange
                                        type="number"
                                        name="colesterolTotalFRA"
                                        label="Colesterol Total"
                                        onChange={(e) => setColesterol(e.target.value)}
                                        value={colesterol}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </Grid>

                                <Grid item xs={4}>
                                    <InputOnChange
                                        name="hDLFRA"
                                        label="HDL"
                                        onChange={(e) => setHdl(e.target.value)}
                                        value={hdl}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </Grid>

                                <Grid item xs={4}>
                                    <InputOnChange
                                        name="triglicericosFRA"
                                        label="Trigliceridos"
                                        onChange={(e) => setTrigliceridos(e.target.value)}
                                        value={trigliceridos}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </Grid>

                                <Grid item xs={4}>
                                    <InputOnChange
                                        type="number"
                                        name="glisemiaFRA"
                                        label="Glicemia"
                                        onChange={(e) => setGlicemia(e.target.value)}
                                        value={glicemia}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </Grid>

                                <Grid item xs={4}>
                                    <Typography align='center'>
                                        <Button variant='contained' fullWidth onClick={calculoFramingham}>
                                            CALCULAR
                                        </Button>
                                    </Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <ViewFramingham
                                        ldl={frLdl}
                                        relacion={relacion}
                                        frEdad={frEdad}
                                        frColesterol={frColesterol}
                                        frHdl={frHdl}
                                        frGlicemia={frGlicemia}
                                        frTensionArterial={frTencion}
                                        frTabaquismo={frFuma}
                                        puntaje={frPuntaje}
                                        riesgoAbsoluto={riesgo.riesgoAbsoluto}
                                        riesgoRelativo={riesgo.riesgoRelativo}
                                        interpretacion={riesgo.dxRiesgo}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            multiline
                                            rows={4}
                                            defaultValue={lsData.observacionFRA}
                                            fullWidth
                                            name="observacionFRA"
                                            label="Observación"
                                            size={matchesXS ? 'small' : 'medium'}
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
                                        onClick={() => { setOpenHistory(true); setCadenaHistory('INFORMACION_CARDIOVASCULAR') }}
                                        icons={DetailIcons[2].icons}
                                    />
                                </Grid>
                            </Grid>


                            <Grid item xs={12} sx={{ pt: 6 }}>
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
                                            <Button variant="outlined" onClick={handleClickReport} fullWidth>
                                                {TitleButton.Imprimir}
                                            </Button>
                                        </AnimateButton>
                                    </Grid>

                                    <Grid item xs={2}>
                                        <AnimateButton>
                                            <Button variant="outlined" fullWidth onClick={() => navigate("/framingham/list")}>
                                                {TitleButton.Cancelar}
                                            </Button>
                                        </AnimateButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>
                </Grid> : <Cargando />
            }
        </Fragment>
    );
};

export default UpdateFramingham;