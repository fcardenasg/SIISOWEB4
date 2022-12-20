import { useState, useEffect, Fragment } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery,
    Typography,
} from '@mui/material';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { MessageSuccess, MessageError } from 'components/alert/AlertAll';
import ViewEmployee from 'components/views/ViewEmployee';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FormProvider, useForm } from 'react-hook-form';
import InputCheckBox from 'components/input/InputCheckBox';
import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import { GetAllCIE11 } from 'api/clients/CIE11Client';
import InputDatePicker from 'components/input/InputDatePicker';
import ControlModal from 'components/controllers/ControlModal';
import ControllerListen from 'components/controllers/ControllerListen';
import FullScreenDialog from 'components/controllers/FullScreenDialog';
import ListPlantillaAll from 'components/template/ListPlantillaAll';
import DetailedIcon from 'components/controllers/DetailedIcon';
import { FormatDate } from 'components/helpers/Format'
import InputText from 'components/input/InputText';
import { SNACKBAR_OPEN } from 'store/actions';
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import InputSelect from 'components/input/InputSelect';
import { Message, TitleButton, CodCatalogo, DefaultValue } from 'components/helpers/Enums';
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

import InputMultiSelects from 'components/input/InputMultiSelects';


const DetailIcons = [
    { title: 'Audio', icons: <SettingsVoiceIcon fontSize="small" /> },
]

const Laboratory = () => {
    const { user } = useAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
 

    const [openSuccess, setOpenSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [openError, setOpenError] = useState(false);
    const [buttonReport, setButtonReport] = useState(false);
    const [open, setOpen] = useState(false);
    const [openTemplate, setOpenTemplate] = useState(false);
    const [filePdf, setFilePdf] = useState(null);
    const [lsEmployee, setLsEmployee] = useState([]);
    const [documento, setDocumento] = useState('');
    const [lsMotivo, setLsMotivo] = useState([]);
    const [lsProveedor, setLsProveedor] = useState([]);

    const [lsInterpretacion, setLsInterpretacion] = useState([]);


    const methods = useForm();
    /* { resolver: yupResolver(validationSchema) } */
    const { handleSubmit, errors, reset } = methods;

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

            const lsServerMotivo = await GetAllByTipoCatalogo(0, 0, CodCatalogo.AtencionEMO);
            var resultMotivo = lsServerMotivo.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsMotivo(resultMotivo);


            const lsServerInterpretacion = await GetAllByTipoCatalogo(0, 0, CodCatalogo.PARACLINICO_Interpretacion);
            var resultInterpretacion = lsServerInterpretacion.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsInterpretacion(resultInterpretacion);


            const lsServerProveedor = await GetAllSupplier(0, 0);
            var resultProveedor = lsServerProveedor.data.entities.map((item) => ({
                value: item.codiProv,
                label: item.nombProv
            }));
            setLsProveedor(resultProveedor);




        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        GetAll();
    }, [])

    const handleClick = async (datos) => {
        try {
            const DataToInsert = PostParaclinics(DefaultValue.PARACLINICO_LABORATORIO, documento,
                FormatDate(datos.fecha), datos.idMotivo, DefaultValue.SINREGISTRO_GLOBAL, DefaultValue.SINREGISTRO_GLOBAL, datos.idProveedor,
                '', DefaultValue.SINREGISTRO_GLOBAL, datos.ojoDerecho,'',
                datos.ojoIzquierdo, '', datos.add1, DefaultValue.SINREGISTRO_GLOBAL, DefaultValue.SINREGISTRO_GLOBAL,
                datos.remitidoOftalmo,datos.requiereLentes, '', DefaultValue.SINREGISTRO_GLOBAL,
                '', '', '', '', '', DefaultValue.SINREGISTRO_GLOBAL, datos.resultadoColesterol,
                datos.interpretacionColeste, datos.observacionColeste, datos.resultadoColesteHDL,
                datos.interpretacionColesteHDL, datos.observacionColesteHDL, datos.dislipidemiaHDL, datos.resultadoTrigli,
                datos.interpretacionTrigli, datos.observacionTrigli, datos.resultadoGlicemia, datos.interpretacionGlicemia,
                datos.observacionGlicemia, datos.resultadoCreatinina, datos.interpretacionCreatinina, datos.observacionCreatinina, datos.resultadoBUN,
                datos.interpretacionBUN, datos.observacionBUN, datos.idParcialOrina, datos.observacionParcialOrina,
                datos.hemograma, datos.observacionHemograma, datos.gpt, datos.observacionGPT, datos.got, datos.observacionGOT, datos.bilirrubina,
                datos.observacionBilirrubina, datos.bilirrubinaDirecta, datos.observacionBilirrubinaDirecta, false, false, false, false, false, false, false, false, false, false, false, false,
                false, false, false, '','', DefaultValue.SINREGISTRO_GLOBAL,
                '', DefaultValue.SINREGISTRO_GLOBAL, DefaultValue.SINREGISTRO_GLOBAL, DefaultValue.SINREGISTRO_GLOBAL, DefaultValue.SINREGISTRO_GLOBAL,
                DefaultValue.SINREGISTRO_GLOBAL, DefaultValue.SINREGISTRO_GLOBAL, DefaultValue.SINREGISTRO_GLOBAL, false,'',
                DefaultValue.SINREGISTRO_GLOBAL, false, '', filePdf, user.email, FormatDate(new Date()), '', FormatDate(new Date()));
          
                console.log("DataToInsert =", DataToInsert);

            if (Object.keys(datos.length !== 0)) {
                if (filePdf) {
                    const result = await InsertParaclinics(DataToInsert);
                    if (result.status === 200) {
                        setOpenSuccess(true);
                        setDocumento('');
                        setLsEmployee([]);
                        reset();
                        setFilePdf(null);
                        setButtonReport(true);
                    }

                } else {
                    setOpenError(true);
                    setErrorMessage('Por favor ingresar el Nro. de Documento');
                }
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage('Este código ya existe');
        }
    };

    return (
        <MainCard title="Registrar Laboratorios">
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
                                            defaultValue=""
                                            options={lsMotivo}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={4.3}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="idProveedor"
                                            label="Proveedor"
                                            defaultValue=""
                                            options={lsProveedor}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>



                            </Grid>
                        </SubCard>
                    </Grid>


                    <Grid item xs={12}>
                        <SubCard darkTitle title={<Typography variant="h4">COLESTEROL (REF: 0-200 MG/DL)</Typography>}>
                            <Grid container spacing={2}>

                                <Grid item xs={12} md={1} lg={6}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue=""
                                            fullWidth
                                            name="ResultadoColesterol"
                                            label="Resultado mg/dl"
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>



                                <Grid item xs={12} md={1} lg={6}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="interpretacionColeste"
                                            label="Interpretación"
                                            defaultValue=""
                                            options={lsInterpretacion}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>


                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue=""
                                            fullWidth
                                            name="observacionColeste"
                                            label="Observaciones"
                                            size={matchesXS ? 'small' : 'medium'}
                                            multiline
                                            rows={6}
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


                                </Grid>


                            </Grid>
                        </SubCard>
                    </Grid>


                    <Grid item xs={12}>
                        <SubCard darkTitle title={<Typography variant="h4">COLESTEROL HDL (REF: HOMBRE=NORMAL  MAYOR A 35 MG/DL - MUJER =NORMAL MAYOR A 45 MG/DL)</Typography>}>
                            <Grid container spacing={2}>

                                <Grid item xs={12} md={1} lg={5}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue=""
                                            fullWidth
                                            name="resultadoColesteHDL"
                                            label="Resultado mg/dl"
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>



                                <Grid item xs={12} md={1} lg={5}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="interpretacionColesteHDL"
                                            label="Interpretación"
                                            defaultValue=""
                                            options={lsInterpretacion}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>


                                <Grid item xs={12} md={1} lg={2}>
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
                                            defaultValue=""
                                            fullWidth
                                            name="observacionColesteHDL"
                                            label="Observaciones"
                                            size={matchesXS ? 'small' : 'medium'}
                                            multiline
                                            rows={6}
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


                                </Grid>


                            </Grid>
                        </SubCard>
                    </Grid>




                    <Grid item xs={12}>
                        <SubCard darkTitle title={<Typography variant="h4">TRIGLICÉRIDOS (REF: 0 - 200 MG/DL)</Typography>}>
                            <Grid container spacing={2}>

                                <Grid item xs={12} md={1} lg={6}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue=""
                                            fullWidth
                                            name="resultadoTrigli"
                                            label="Resultado mg/dl"
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>



                                <Grid item xs={12} md={1} lg={6}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="interpretacionTrigli"
                                            label="Interpretación"
                                            defaultValue=""
                                            options={lsInterpretacion}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>


                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue=""
                                            fullWidth
                                            name="observacionTrigli"
                                            label="Observaciones"
                                            size={matchesXS ? 'small' : 'medium'}
                                            multiline
                                            rows={6}
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


                                </Grid>


                            </Grid>
                        </SubCard>
                    </Grid>




                    <Grid item xs={12}>
                        <SubCard darkTitle title={<Typography variant="h4">GLICEMIA (REF: 70 - 100 MG/DL)</Typography>}>
                            <Grid container spacing={2}>

                                <Grid item xs={12} md={1} lg={6}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue=""
                                            fullWidth
                                            name="resultadoGlicemia"
                                            label="Resultado mg/dl"
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>



                                <Grid item xs={12} md={1} lg={6}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="interpretacionGlicemia"
                                            label="Interpretacion"
                                            defaultValue=""
                                            options={lsInterpretacion}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>


                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue=""
                                            fullWidth
                                            name="observacionGlicemia"
                                            label="Observaciones"
                                            size={matchesXS ? 'small' : 'medium'}
                                            multiline
                                            rows={6}
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


                                </Grid>


                            </Grid>
                        </SubCard>
                    </Grid>



                    <Grid item xs={12}>
                        <SubCard darkTitle title={<Typography variant="h4">CREATININA (REF: 0,5 - 1,5 MG/DL)</Typography>}>
                            <Grid container spacing={2}>

                                <Grid item xs={12} md={1} lg={6}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue=""
                                            fullWidth
                                            name="resultadoCreatinina"
                                            label="Resultado mg/dl"
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>



                                <Grid item xs={12} md={1} lg={6}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="interpretacionCreatinina"
                                            label="Interpretacion"
                                            defaultValue=""
                                            options={lsInterpretacion}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>


                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue=""
                                            fullWidth
                                            name="observacionCreatinina"
                                            label="Observaciones"
                                            size={matchesXS ? 'small' : 'medium'}
                                            multiline
                                            rows={6}
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


                                </Grid>


                            </Grid>
                        </SubCard>
                    </Grid>


                    ,



                    <Grid item xs={12}>
                        <SubCard darkTitle title={<Typography variant="h4">BUN (Ref: 5 - 25 mg/dl)</Typography>}>
                            <Grid container spacing={2}>

                                <Grid item xs={12} md={1} lg={6}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue=""
                                            fullWidth
                                            name="resultadoBUN"
                                            label="Resultado mg/dl"
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>



                                <Grid item xs={12} md={1} lg={6}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="interpretacionBUN"
                                            label="Interpretacion"
                                            defaultValue=""
                                            options={lsInterpretacion}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>


                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue=""
                                            fullWidth
                                            name="observacionBUN"
                                            label="Observaciones"
                                            size={matchesXS ? 'small' : 'medium'}
                                            multiline
                                            rows={6}
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


                                </Grid>


                            </Grid>
                        </SubCard>
                    </Grid>




                    <Grid item xs={12}>

                        <Grid container spacing={2}>

                            <Grid item xs={12} md={1} lg={4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="idParcialOrina"
                                        label="Parcial de Orina"
                                        defaultValue=""
                                        options={lsInterpretacion}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={12} md={1} lg={8}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="observacionParcialOrina"
                                        label="Observaciones"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>



                        </Grid>

                    </Grid>

                    <Grid item xs={12}>

                        <Grid container spacing={2}>

                            <Grid item xs={12} md={1} lg={4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="hemograma"
                                        label="Hemograma"
                                        defaultValue=""
                                        options={lsInterpretacion}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={12} md={1} lg={8}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="observacionHemograma"
                                        label="Observaciones"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>



                        </Grid>

                    </Grid>

                    <Grid item xs={12}>

                        <Grid container spacing={2}>

                            <Grid item xs={12} md={1} lg={4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="gpt"
                                        label="GPT - (Ref: 7 - 33 Normal)"
                                        defaultValue=""
                                        options={lsInterpretacion}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={12} md={1} lg={8}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="observacionGPT"
                                        label="Observaciones"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>



                        </Grid>

                    </Grid>




                    <Grid item xs={12}>

                        <Grid container spacing={2}>

                            <Grid item xs={12} md={1} lg={4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="got"
                                        label="GoT - (Ref: 5 - 32 Normal)"
                                        defaultValue=""
                                        options={lsInterpretacion}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={12} md={1} lg={8}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="observacionGOT"
                                        label="Observaciones"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>



                        </Grid>

                    </Grid>

                    <Grid item xs={12}>



                        <Grid container spacing={2}>

                            <Grid item xs={12} md={1} lg={4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="bilirrubina"
                                        label="Bilirrubina Total"
                                        defaultValue=""
                                        options={lsInterpretacion}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={12} md={1} lg={8}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="observacionBilirrubina"
                                        label="Observaciones"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>



                        </Grid>

                    </Grid>

                    <Grid item xs={12}>

                        <Grid container spacing={2}>

                            <Grid item xs={12} md={1} lg={4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="bilirrubinaDirecta"
                                        label="Bilirrubina Directa"
                                        defaultValue=""
                                        options={lsInterpretacion}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={12} md={1} lg={8}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue=""
                                        fullWidth
                                        name="observacionBilirrubinaDirecta"
                                        label="Observaciones"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
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
                                        {filePdf && (
                                            <object type="application/pdf"
                                                data={filePdf}
                                                width="1180"
                                                height="500"
                                                onLoad={<Cargando />}
                                            />
                                        )}
                                    </Grid>

                                </MainCard>
                            </Grid>

                            <Grid item xs={12} sx={{ pt: 4 }}>
                                <Grid container spacing={2} >
                                    <Grid item xs={6}>
                                        <AnimateButton>
                                            <Button variant="contained" fullWidth onClick={handleSubmit(handleClick)}>
                                                {TitleButton.Guardar}
                                            </Button>
                                        </AnimateButton>
                                    </Grid>



                                    <Grid item xs={6}>
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
            </Fragment>
        </MainCard>
    );
};

export default Laboratory;