import { useState, useEffect, Fragment } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery,
    Typography,
} from '@mui/material';

import { MessageSuccess, MessageError } from 'components/alert/AlertAll';
import ViewEmployee from 'components/views/ViewEmployee';
import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import InputCheckBox from 'components/input/InputCheckBox';

import InputDatePicker from 'components/input/InputDatePicker';
import ControlModal from 'components/controllers/ControlModal';
import ControllerListen from 'components/controllers/ControllerListen';
import { FormatDate } from 'components/helpers/Format'
import InputText from 'components/input/InputText';

import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import InputSelect from 'components/input/InputSelect';
import { Message, TitleButton, CodCatalogo, DefaultValue, AccionMenu, Modulo } from 'components/helpers/Enums';
import AnimateButton from 'ui-component/extended/AnimateButton';
import SubCard from 'ui-component/cards/SubCard';
import useAuth from 'hooks/useAuth';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import { PostParaclinics } from 'formatdata/ParaclinicsForm';
import { InsertParaclinics } from 'api/clients/ParaclinicsClient';
import { GetAllSupplier } from 'api/clients/SupplierClient';
import Cargando from 'components/loading/Cargando';
import MainCard from 'ui-component/cards/MainCard';
import UploadIcon from '@mui/icons-material/Upload';
import ViewPDF from 'components/components/ViewPDF';
import ValidateActionSkeleton from 'components/ValidateAction/ValidateActionSkeleton';

const Laboratory = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [openSuccess, setOpenSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [openError, setOpenError] = useState(false);
    const [open, setOpen] = useState(false);
    const [filePdf, setFilePdf] = useState(null);
    const [lsEmployee, setLsEmployee] = useState([]);
    const [documento, setDocumento] = useState('');
    const [lsMotivo, setLsMotivo] = useState([]);
    const [lsProveedor, setLsProveedor] = useState([]);

    const [lsInterpretacion, setLsInterpretacion] = useState([]);
    const [lsInterpretacionColes, setLsInterpretacionColes] = useState([]);
    const [lsInterpretacionTrigli, setLsInterpretacionTrigli] = useState([]);
    const [lsInterpretacionGlicemia, setLsInterpretacionGlicemia] = useState([]);

    const methods = useForm();
    const { handleSubmit, reset } = methods;

    const allowedFiles = ['application/pdf'];
    const handleFile = (event) => {
        let selectedFile = event.target.files[0];

        if (selectedFile) {
            if (selectedFile && allowedFiles.includes(selectedFile.type)) {
                let reader = new FileReader();
                reader.readAsDataURL(selectedFile);
                reader.onloadend = (e) => {
                    setFilePdf(e.target.result);
                }
            }
            else {
                setFilePdf('');
                setOpenError(true);
                setErrorMessage('Este forma no es un PDF');
            }
        }
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

    async function getAll() {
        try {
            const lsServerMotivo = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Atencion_PARACLINICO);
            var resultMotivo = lsServerMotivo.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsMotivo(resultMotivo);

            const lsServerInterpretacion = await GetAllByTipoCatalogo(0, 0, CodCatalogo.PARACLINICO_IINTER_COLESTEROL);
            var resultInterpretacion = lsServerInterpretacion.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsInterpretacion(resultInterpretacion);

            const lsServerInterpretacionn = await GetAllByTipoCatalogo(0, 0, CodCatalogo.PARACLINICO_RESULTADOAUDIOGRAMA);
            var resultInterpretacionn = lsServerInterpretacionn.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsInterpretacionColes(resultInterpretacionn);

            const lsServerInterpretacionTri = await GetAllByTipoCatalogo(0, 0, CodCatalogo.PARACLINICO_INTER_TRIGLICE);
            var resultInterpretacionTri = lsServerInterpretacionTri.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsInterpretacionTrigli(resultInterpretacionTri);

            const lsServerProveedor = await GetAllSupplier();
            var resultProveedor = lsServerProveedor.data.map((item) => ({
                value: item.codiProv,
                label: item.nombProv
            }));
            setLsProveedor(resultProveedor);
        } catch (error) { }
    }

    useEffect(() => {
        getAll();
    }, []);

    const handleClick = async (datos) => {
        try {
            const DataToInsert = {
                // Identificación y Generales
                idTipoParaclinico: DefaultValue.PARACLINICO_LABORATORIO,
                documento: documento || null,
                fecha: datos.fecha || null,
                idMotivo: datos.idMotivo || null,
                idProveedor: datos.idProveedor || null,

                // Oftalmología (Incluidos en tu llamada de laboratorio)
                ojoDerecho: datos.ojoDerecho || null,
                ojoIzquierdo: datos.ojoIzquierdo || null,
                add1: datos.add1 || null,
                remitidoOftalmo: datos.remitidoOftalmo || false,
                requiereLentes: datos.requiereLentes || false,

                // Perfil Lipídico (Colesterol y Triglicéridos)
                resultadoColesterol: datos.resultadoColesterol || null,
                interpretacionColeste: datos.interpretacionColeste || null,
                observacionColeste: datos.observacionColeste || null,
                resultadoColesteHDL: datos.resultadoColesteHDL || null,
                interpretacionColesteHDL: datos.interpretacionColesteHDL || null,
                observacionColesteHDL: datos.observacionColesteHDL || null,
                dislipidemiaHDL: datos.dislipidemiaHDL || false,
                resultadoTrigli: datos.resultadoTrigli || null,
                interpretacionTrigli: datos.interpretacionTrigli || null,
                observacionTrigli: datos.observacionTrigli || null,

                // Glicemia, Creatinina y BUN
                resultadoGlicemia: datos.resultadoGlicemia || null,
                interpretacionGlicemia: datos.interpretacionGlicemia || null,
                observacionGlicemia: datos.observacionGlicemia || null,
                resultadoCreatinina: datos.resultadoCreatinina || null,
                interpretacionCreatinina: datos.interpretacionCreatinina || null,
                observacionCreatinina: datos.observacionCreatinina || null,
                resultadoBUN: datos.resultadoBUN || null,
                interpretacionBUN: datos.interpretacionBUN || null,
                observacionBUN: datos.observacionBUN || null,

                // Otros Laboratorios
                idParcialOrina: datos.idParcialOrina || null,
                observacionParcialOrina: datos.observacionParcialOrina || null,
                hemograma: datos.hemograma || null,
                observacionHemograma: datos.observacionHemograma || null,
                gpt: datos.gpt || null,
                observacionGPT: datos.observacionGPT || null,
                got: datos.got || null,
                observacionGOT: datos.observacionGOT || null,
                bilirrubina: datos.bilirrubina || null,
                observacionBilirrubina: datos.observacionBilirrubina || null,
                bilirrubinaDirecta: datos.bilirrubinaDirecta || null,
                observacionBilirrubinaDirecta: datos.observacionBilirrubinaDirecta || null,

                // Archivo y Auditoría
                url: filePdf || null,
            };

            const result = await InsertParaclinics(DataToInsert);
            if (result.status === 200) {
                setOpenSuccess(true);
                setDocumento('');
                setLsEmployee([]);
                setFilePdf(null);
                reset();
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(Message.RegistroNoGuardado);
        }
    };

    return (
        <ValidateActionSkeleton idAccion={AccionMenu.agregar} idModulo={Modulo.Laboratorio}>
            <MainCard title="Registrar Laboratorios">
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

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <ViewEmployee
                            key={lsEmployee?.documento}
                            documento={documento}
                            onChange={(e) => setDocumento(e.target.value)}
                            lsEmployee={lsEmployee}
                            handleDocumento={handleDocumento}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <SubCard darkTitle>
                            <Grid container spacing={1}>
                                <Grid item xs={3.3}>
                                    <FormProvider {...methods}>
                                        <InputDatePicker
                                            label="Fecha"
                                            name="fecha"
                                            defaultValue={new Date()}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={4.3}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="idMotivo"
                                            label="Motivo"
                                            options={lsMotivo}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={4.3}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="idProveedor"
                                            label="Proveedor"
                                            options={lsProveedor}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>

                    <Grid item xs={12}>
                        <SubCard darkTitle title={<Typography variant="h4">COLESTEROL (REF: 0-200 MG/DL)</Typography>}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            fullWidth
                                            name="resultadoColesterol"
                                            label="Resultado mg/dl"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="interpretacionColeste"
                                            label="Interpretación"
                                            options={lsInterpretacion}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            fullWidth
                                            name="observacionColeste"
                                            label="Observaciones"
                                            size={matchesXS ? 'small' : 'medium'}
                                            multiline
                                            rows={6}
                                        />
                                    </FormProvider>
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>

                    <Grid item xs={12}>
                        <SubCard darkTitle title={<Typography variant="h4">COLESTEROL HDL (REF: HOMBRE=NORMAL  MAYOR A 35 MG/DL - MUJER =NORMAL MAYOR A 45 MG/DL)</Typography>}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6} lg={5}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            fullWidth
                                            name="resultadoColesteHDL"
                                            label="Resultado mg/dl"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12} md={6} lg={5}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="interpretacionColesteHDL"
                                            label="Interpretación"
                                            options={lsInterpretacionColes}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12} md={6} lg={2}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="Dislipidemia HDL"
                                            name="dislipidemiaHDL"
                                            size={25}
                                            defaultValue={false}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            fullWidth
                                            name="observacionColesteHDL"
                                            label="Observaciones"
                                            size={matchesXS ? 'small' : 'medium'}
                                            multiline
                                            rows={6}
                                        />
                                    </FormProvider>
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>

                    <Grid item xs={12}>
                        <SubCard darkTitle title={<Typography variant="h4">TRIGLICÉRIDOS (REF: 0 - 200 MG/DL)</Typography>}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            fullWidth
                                            name="resultadoTrigli"
                                            label="Resultado mg/dl"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="interpretacionTrigli"
                                            label="Interpretación"
                                            options={lsInterpretacionTrigli}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            fullWidth
                                            name="observacionTrigli"
                                            label="Observaciones"
                                            size={matchesXS ? 'small' : 'medium'}
                                            multiline
                                            rows={6}
                                        />
                                    </FormProvider>
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>

                    <Grid item xs={12}>
                        <SubCard darkTitle title={<Typography variant="h4">GLICEMIA (REF: 70 - 100 MG/DL)</Typography>}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            fullWidth
                                            name="resultadoGlicemia"
                                            label="Resultado mg/dl"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="interpretacionGlicemia"
                                            label="Interpretación"
                                            options={lsInterpretacionColes}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            fullWidth
                                            name="observacionGlicemia"
                                            label="Observaciones"
                                            size={matchesXS ? 'small' : 'medium'}
                                            multiline
                                            rows={6}
                                        />
                                    </FormProvider>
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>

                    <Grid item xs={12}>
                        <SubCard darkTitle title={<Typography variant="h4">CREATININA (REF: 0,5 - 1,5 MG/DL)</Typography>}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            fullWidth
                                            name="resultadoCreatinina"
                                            label="Resultado mg/dl"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="interpretacionCreatinina"
                                            label="Interpretación"
                                            options={lsInterpretacionColes}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            fullWidth
                                            name="observacionCreatinina"
                                            label="Observaciones"
                                            size={matchesXS ? 'small' : 'medium'}
                                            multiline
                                            rows={6}
                                        />
                                    </FormProvider>
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>

                    <Grid item xs={12}>
                        <SubCard darkTitle title={<Typography variant="h4">BUN (Ref: 5 - 25 mg/dl)</Typography>}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            fullWidth
                                            name="resultadoBUN"
                                            label="Resultado mg/dl"
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="interpretacionBUN"
                                            label="Interpretación"
                                            options={lsInterpretacionColes}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            fullWidth
                                            name="observacionBUN"
                                            label="Observaciones"
                                            size={matchesXS ? 'small' : 'medium'}
                                            multiline
                                            rows={6}
                                        />
                                    </FormProvider>
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6} lg={4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="idParcialOrina"
                                        label="Parcial de Orina"
                                        options={lsInterpretacionColes}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={12} md={6} lg={8}>
                                <FormProvider {...methods}>
                                    <InputText
                                        fullWidth
                                        name="observacionParcialOrina"
                                        label="Observaciones"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6} lg={4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="hemograma"
                                        label="Hemograma"
                                        options={lsInterpretacionColes}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={12} md={6} lg={8}>
                                <FormProvider {...methods}>
                                    <InputText
                                        fullWidth
                                        name="observacionHemograma"
                                        label="Observaciones"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6} lg={4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="gpt"
                                        label="GPT - (Ref: 7 - 33 Normal)"
                                        options={lsInterpretacionColes}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={12} md={6} lg={8}>
                                <FormProvider {...methods}>
                                    <InputText
                                        fullWidth
                                        name="observacionGPT"
                                        label="Observaciones"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6} lg={4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="got"
                                        label="GoT - (Ref: 5 - 32 Normal)"
                                        options={lsInterpretacionColes}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={12} md={6} lg={8}>
                                <FormProvider {...methods}>
                                    <InputText
                                        fullWidth
                                        name="observacionGOT"
                                        label="Observaciones"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6} lg={4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="bilirrubina"
                                        label="Bilirrubina Total"
                                        options={lsInterpretacionColes}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={12} md={6} lg={8}>
                                <FormProvider {...methods}>
                                    <InputText
                                        fullWidth
                                        name="observacionBilirrubina"
                                        label="Observaciones"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6} lg={4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="bilirrubinaDirecta"
                                        label="Bilirrubina Directa"
                                        options={lsInterpretacionColes}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={12} md={6} lg={8}>
                                <FormProvider {...methods}>
                                    <InputText
                                        fullWidth
                                        name="observacionBilirrubinaDirecta"
                                        label="Observaciones"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <SubCard darkTitle>
                            <Grid item xs={12} sx={{ pt: 2 }}>
                                <MainCard title="Resultados">
                                    <Grid container spacing={12}>
                                        <Grid textAlign="center" item xs={12}>
                                            <Button size="large" variant="contained" component="label" startIcon={<UploadIcon fontSize="large" />}>
                                                SUBIR RESULTADO EN PDF
                                                <input hidden accept="application/pdf" type="file" onChange={handleFile} />
                                            </Button>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={12} sx={{ pt: 4 }}>
                                        <ViewPDF dataPDF={filePdf} width="1180" height="500" />
                                    </Grid>
                                </MainCard>
                            </Grid>

                            <Grid item xs={12} sx={{ pt: 4 }}>
                                <Grid container spacing={2} >
                                    <Grid item xs={2}>
                                        <AnimateButton>
                                            <Button variant="contained" fullWidth onClick={handleSubmit(handleClick)}>
                                                {TitleButton.Guardar}
                                            </Button>
                                        </AnimateButton>
                                    </Grid>

                                    <Grid item xs={2}>
                                        <AnimateButton>
                                            <Button variant="outlined" fullWidth onClick={() => navigate("/paraclinics/laboratory/list")}>
                                                {TitleButton.Cancelar}
                                            </Button>
                                        </AnimateButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>
                </Grid>
            </MainCard>
        </ValidateActionSkeleton>
    );
};

export default Laboratory;