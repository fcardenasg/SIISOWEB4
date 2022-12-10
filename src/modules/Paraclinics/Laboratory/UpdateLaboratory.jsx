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
import ViewEmployee from 'components/views/ViewEmployee';
import InputDatePicker from 'components/input/InputDatePicker';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from 'hooks/useAuth';
import InputCheckBox from 'components/input/InputCheckBox';
import { FormProvider, useForm } from 'react-hook-form';

import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
import DetailedIcon from 'components/controllers/DetailedIcon';
import ControlModal from 'components/controllers/ControlModal';
import ControllerListen from 'components/controllers/ControllerListen';

import { FormatDate } from 'components/helpers/Format'
import InputText from 'components/input/InputText';
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import InputSelect from 'components/input/InputSelect';
import { Message, TitleButton, CodCatalogo, DefaultValue } from 'components/helpers/Enums';
import AnimateButton from 'ui-component/extended/AnimateButton';
import SubCard from 'ui-component/cards/SubCard';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import { PutParaclinics } from 'formatdata/ParaclinicsForm';
import { UpdateParaclinicss, GetByIdParaclinics } from 'api/clients/ParaclinicsClient';
import { GetAllSupplier } from 'api/clients/SupplierClient';
import Cargando from 'components/loading/Cargando';
import { MessageUpdate, MessageError } from 'components/alert/AlertAll';
import MainCard from 'ui-component/cards/MainCard';
import UploadIcon from '@mui/icons-material/Upload';
import { GetAllByCodeOrName } from 'api/clients/CIE11Client';
import InputOnChange from 'components/input/InputOnChange';
import InputMultiSelects from 'components/input/InputMultiSelects';


const DetailIcons = [

    { title: 'Audio', icons: <SettingsVoiceIcon fontSize="small" /> },


]

const UpdateLaboratory = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const theme = useTheme();
    const { id } = useParams();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const [filePdf, setFilePdf] = useState(null);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [lsEmployee, setLsEmployee] = useState([]);
    const [buttonReport, setButtonReport] = useState(false);
    const [open, setOpen] = useState(false);
    const [openTemplate, setOpenTemplate] = useState(false);
    const [lsCie11, setLsCie11] = useState([]);
    const [lsVisiometrics, setLsVisiometrics] = useState([]);
    const [lsInterpretacion, setLsInterpretacion] = useState([]);

    const [documento, setDocumento] = useState('');

    const [lsMotivo, setLsMotivo] = useState([]);
    const [lsProveedor, setLsProveedor] = useState([]);


    const [lsLectura, setLsLectura] = useState([]);
    const [lsControl, setLsControl] = useState([]);


    const [lsOjoDerecho, setLsOjoDerecho] = useState([]);
    const [lsOjoIzquierdo, setLsOjoIzquierdo] = useState([]);
    const [lsAdd1, setLsAdd1] = useState([]);

    const [textDx1, setTextDx1] = useState('');
    const [lsDx1, setLsDx1] = useState([]);

    const [textDx2, setTextDx2] = useState('');
    const [lsDx2, setLsDx2] = useState([]);

    const [textDx3, setTextDx3] = useState('');
    const [lsDx3, setLsDx3] = useState([]);



    const methods = useForm();
    /* { resolver: yupResolver(validationSchema) } */

    const { handleSubmit, errors } = methods;

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

    const handleDx2 = async (event) => {
        try {
            setTextDx2(event.target.value);

            if (event.key === 'Enter') {
                if (event.target.value !== "") {
                    var lsServerCie11 = await GetAllByCodeOrName(0, 0, event.target.value);

                    if (lsServerCie11.status === 200) {
                        var resultCie11 = lsServerCie11.data.entities.map((item) => ({
                            value: item.id,
                            label: item.dx
                        }));
                        setLsDx2(resultCie11);
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


    const handleDx3 = async (event) => {
        try {
            setTextDx3(event.target.value);

            if (event.key === 'Enter') {
                if (event.target.value !== "") {
                    var lsServerCie11 = await GetAllByCodeOrName(0, 0, event.target.value);

                    if (lsServerCie11.status === 200) {
                        var resultCie11 = lsServerCie11.data.entities.map((item) => ({
                            value: item.id,
                            label: item.dx
                        }));
                        setLsDx3(resultCie11);
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
                setErrorMessage('Este formato no es un PDF');
            }
        }
    }



    const handleLoadingDocument = async (idEmployee) => {
        try {
            var lsServerEmployee = await GetByIdEmployee(idEmployee);

            if (lsServerEmployee.status === 200) {
                setLsEmployee(lsServerEmployee.data);
            }
        } catch (error) {
            setLsEmployee([]);
            setErrorMessage(Message.ErrorDeDatos);
        }
    }

    const handleGetCie11 = async (dx) => {
        try {
            var lsServerCie11 = await GetAllByCodeOrName(0, 0, dx);
            if (lsServerCie11.status === 200) {
                var resultCie11 = lsServerCie11.data.entities.map((item) => ({
                    value: item.id,
                    label: item.dx
                }));
                return resultCie11;
            }
        } catch (err) { }
    }

    async function GetAll() {
        try {
            const serverData = await GetByIdParaclinics(id);
            if (serverData.status === 200) {
                var lsDxDerecho = await handleGetCie11(serverData.data.dxDerecho);
                setTextDx1(serverData.data.dxDerecho);
                setLsDx1(lsDxDerecho);

                var lsdxIzquierdo = await handleGetCie11(serverData.data.dxIzquierdo);
                setTextDx2(serverData.data.dxIzquierdo);
                setLsDx2(lsdxIzquierdo);

                var lsdxDiagnostico = await handleGetCie11(serverData.data.dxDiagnostico);
                setTextDx3(serverData.data.dxDiagnostico);
                setLsDx3(lsdxDiagnostico);


                

                setDocumento(serverData.data.documento);
                setLsVisiometrics(serverData.data);
                handleLoadingDocument(serverData.data.documento);
                setFilePdf(serverData.data.url);
            }

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
            const DataToUpdate = PutParaclinics(id, DefaultValue.PARACLINICO_LABORATORIO,  documento,
                FormatDate(datos.fecha), datos.idMotivo, DefaultValue.SINREGISTRO_GLOBAL, DefaultValue.SINREGISTRO_GLOBAL, datos.idProveedor,
                '', DefaultValue.SINREGISTRO_GLOBAL, datos.ojoDerecho, '',
                datos.ojoIzquierdo, '', datos.add1, DefaultValue.SINREGISTRO_GLOBAL, DefaultValue.SINREGISTRO_GLOBAL,
                datos.remitidoOftalmo,
                datos.requiereLentes, '', DefaultValue.SINREGISTRO_GLOBAL,
                '', '', '', '', '', '', datos.resultadoColesterol,
                datos.interpretacionColeste, datos.observacionColeste, datos.resultadoColesteHDL,
                datos.interpretacionColesteHDL, datos.observacionColesteHDL, datos.dislipidemiaHDL, datos.resultadoTrigli,
                datos.interpretacionTrigli, datos.observacionTrigli, datos.resultadoGlicemia, datos.interpretacionGlicemia,
                datos.observacionGlicemia, datos.resultadoCreatinina, datos.interpretacionCreatinina, datos.observacionCreatinina, datos.resultadoBUN,
                datos.interpretacionBUN, datos.observacionBUN, datos.idParcialOrina, datos.observacionParcialOrina,
                datos.hemograma, datos.observacionHemograma, datos.gpt, datos.observacionGPT, datos.got, datos.observacionGOT, datos.bilirrubina,
                datos.observacionBilirrubina, datos.bilirrubinaDirecta, datos.observacionBilirrubinaDirecta, false, false, false, false, false, false, false, false, false, false, false, false,
                false, false, false, '', DefaultValue.SINREGISTRO_GLOBAL, DefaultValue.SINREGISTRO_GLOBAL,
                '', DefaultValue.SINREGISTRO_GLOBAL, DefaultValue.SINREGISTRO_GLOBAL, DefaultValue.SINREGISTRO_GLOBAL, DefaultValue.SINREGISTRO_GLOBAL,
                DefaultValue.SINREGISTRO_GLOBAL, DefaultValue.SINREGISTRO_GLOBAL, DefaultValue.SINREGISTRO_GLOBAL, DefaultValue.SINREGISTRO_GLOBAL,
                '', DefaultValue.SINREGISTRO_GLOBAL, '', filePdf, user.email, FormatDate(new Date()), '', FormatDate(new Date()));

            if (Object.keys(datos.length !== 0)) {

                const result = await UpdateParaclinicss(DataToUpdate);
                if (result.status === 200) {
                    setOpenUpdate(true);

                    setButtonReport(true);
                }
            }

        } catch (error) {
            setOpenError(true);
            setErrorMessage('Este código ya existe');
        }
    };

    return (
        <MainCard title="Actualizar Laboratorios">
            <Fragment>
                <MessageUpdate open={openUpdate} onClose={() => setOpenUpdate(false)} />
                <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

                <ControlModal
                    maxWidth="md"
                    open={open}
                    onClose={() => setOpen(false)}
                    title="DICTADO POR VOZ"
                >
                    <ControllerListen />
                </ControlModal>



                {lsVisiometrics.length != 0 ?
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <ViewEmployee
                                disabled={true}
                                key={lsEmployee.documento}
                                documento={documento}
                                onChange={(e) => setDocumento(e.target.value)}
                                lsEmployee={lsEmployee}
                                handleDocumento={handleLoadingDocument}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <SubCard darkTitle>
                                <Grid container spacing={2}>
                                    <Grid item xs={3.3}>
                                        <FormProvider {...methods}>
                                            <InputDatePicker
                                                label="Fecha"
                                                name="fecha"
                                                defaultValue={lsVisiometrics.fecha}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={4.3}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="idMotivo"
                                                label="Motivo"
                                                defaultValue={lsVisiometrics.idMotivo}
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
                                                defaultValue={lsVisiometrics.idProveedor}
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
                                            defaultValue={lsVisiometrics.resultadoColesterol}
                                            fullWidth
                                            name="resultadoColesterol"
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
                                            defaultValue={lsVisiometrics.interpretacionColeste}
                                            options={lsInterpretacion}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>


                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputText
                                             defaultValue={lsVisiometrics.observacionColeste}
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
                                            defaultValue={lsVisiometrics.resultadoColesteHDL}
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
                                            defaultValue={lsVisiometrics.interpretacionColesteHDL}
                                            options={lsInterpretacion}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>


                                <Grid item xs={12} md={1} lg={2}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                           defaultValue={lsVisiometrics.dislipidemiaHDL}
                                            label="Dislipidemia HDL"
                                            name="dislipidemiaHDL"
                                            size={25}
                                        />
                                    </FormProvider>
                                </Grid>


                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputText
                                          defaultValue={lsVisiometrics.observacionColesteHDL}
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
                                            defaultValue={lsVisiometrics.resultadoTrigli}
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
                                            defaultValue={lsVisiometrics.interpretacionTrigli}
                                            options={lsInterpretacion}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>


                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue={lsVisiometrics.observacionTrigli}
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
                                            defaultValue={lsVisiometrics.resultadoGlicemia}
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
                                            defaultValue={lsVisiometrics.interpretacionGlicemia}
                                            options={lsInterpretacion}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>


                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue={lsVisiometrics.observacionGlicemia}
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
                                           defaultValue={lsVisiometrics.resultadoCreatinina}
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
                                            label="lsInterpretacion"
                                            defaultValue={lsVisiometrics.interpretacionCreatinina}
                                            options={lsInterpretacion}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>


                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputText
                                              defaultValue={lsVisiometrics.observacionCreatinina}
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
                                              defaultValue={lsVisiometrics.resultadoBUN}
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
                                            label="lsInterpretacion"
                                            defaultValue={lsVisiometrics.interpretacionBUN}
                                            options={lsInterpretacion}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>


                                <Grid item xs={12}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue={lsVisiometrics.observacionBUN}
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
                                        defaultValue={lsVisiometrics.idParcialOrina}
                                        options={lsInterpretacion}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={12} md={1} lg={8}>
                                <FormProvider {...methods}>
                                    <InputText
                                     defaultValue={lsVisiometrics.observacionParcialOrina}
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
                                        defaultValue={lsVisiometrics.hemograma}
                                        options={lsInterpretacion}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={12} md={1} lg={8}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue={lsVisiometrics.observacionHemograma}
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
                                        defaultValue={lsVisiometrics.gpt}
                                        options={lsInterpretacion}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={12} md={1} lg={8}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue={lsVisiometrics.observacionGPT}
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
                                        defaultValue={lsVisiometrics.got}
                                        options={lsInterpretacion}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={12} md={1} lg={8}>
                                <FormProvider {...methods}>
                                    <InputText
                                          defaultValue={lsVisiometrics.observacionGOT}
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
                                        defaultValue={lsVisiometrics.bilirrubina}
                                        options={lsInterpretacion}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={12} md={1} lg={8}>
                                <FormProvider {...methods}>
                                    <InputText
                                         defaultValue={lsVisiometrics.observacionBilirrubina}
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
                                        defaultValue={lsVisiometrics.bilirrubinaDirecta}
                                        options={lsInterpretacion}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={12} md={1} lg={8}>
                                <FormProvider {...methods}>
                                    <InputText
                                        defaultValue={lsVisiometrics.observacionBilirrubinaDirecta}
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




                        <Grid item xs={12} sx={{ pt: 2 }}>
                            <MainCard title="Resultados">

                                <Grid container spacing={12}>
                                    <Grid textAlign="center" item xs={12}>
                                        <Button size="large" variant="contained" component="label" startIcon={<UploadIcon fontSize="large" />}>
                                            ACTUALIZAR RESULTADO EN PDF
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
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <AnimateButton>
                                        <Button variant="contained" onClick={handleSubmit(handleClick)} fullWidth>
                                            {TitleButton.Actualizar}
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

                    </Grid> : <Cargando />
                }

            </Fragment >
        </MainCard>

    );
};

export default UpdateLaboratory;