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
import InputDatePicker from 'components/input/InputDatePicker';
import ControlModal from 'components/controllers/ControlModal';
import ControllerListen from 'components/controllers/ControllerListen';
import FullScreenDialog from 'components/controllers/FullScreenDialog';
import ListPlantillaAll from 'components/template/ListPlantillaAll';


import { GetAllByCodeOrName, GetAllCIE11 } from 'api/clients/CIE11Client';
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
import InputOnChange from 'components/input/InputOnChange';
import InputMultiSelects from 'components/input/InputMultiSelects';


const DetailIcons = [
    { title: 'Audio', icons: <SettingsVoiceIcon fontSize="small" /> },
]

const Audiometry = () => {
    const { user } = useAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const [diagnosticoArray, setDiagnosticoArray] = useState([]);
    const [diagnosticoArray1, setDiagnosticoArray1] = useState([]);
    const [diagnosticoArray2, setDiagnosticoArray2] = useState([]);

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

    const [lsCargo, setLsCargo] = useState([]);
    const [lsProteccionAuditiva, setLsProteccionAuditiva] = useState([]);
    const [lsSuministradopor, setLsSuministradopor] = useState([]);
    const [lsUso, setLsUso] = useState([]);
    const [lsAudiograma, setLsAudiograma] = useState([]);

    const [lsConducta, setLsConducta] = useState([]);

    const [textDx1, setTextDx1] = useState('');
    const [lsDx1, setLsDx1] = useState([]);

    const methods = useForm();
    /* { resolver: yupResolver(validationSchema) } */
    const { handleSubmit, errors, reset } = methods;



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

            //aqui


            const lsServerCargo = await GetAllByTipoCatalogo(0, 0, CodCatalogo.RosterPosition);
            var resultCargo = lsServerCargo.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsCargo(resultCargo);



            const lsServerProteccionAuditiva = await GetAllByTipoCatalogo(0, 0, CodCatalogo.PARACLINICO_PROTECCIÓNAUDITIVA);
            var resultProteccionAuditiva = lsServerProteccionAuditiva.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsProteccionAuditiva(resultProteccionAuditiva);


            const lsServerSuministradopor = await GetAllByTipoCatalogo(0, 0, CodCatalogo.PARACLINICO_SUMINISTRADOPOR);
            var resultSuministradopor = lsServerSuministradopor.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsSuministradopor(resultSuministradopor);



            const lsServerUso = await GetAllByTipoCatalogo(0, 0, CodCatalogo.PARACLINICO_USO);
            var resultUso = lsServerUso.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsUso(resultUso);

            const lsServerAudiograma = await GetAllByTipoCatalogo(0, 0, CodCatalogo.PARACLINICO_RESULTADOAUDIOGRAMA);
            var resultAudiograma = lsServerAudiograma.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsAudiograma(resultAudiograma);




            const lsServerConducta = await GetAllByTipoCatalogo(0, 0, CodCatalogo.PARACLINICO_CONDUCTAAUDIOMETRIA);
            var resultConducta = lsServerConducta.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsConducta(resultConducta);



            
            



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
            const DataToInsert = PostParaclinics(DefaultValue.PARACLINICO_AUDIOMETRIA, documento,
                FormatDate(datos.fecha), datos.idMotivo, DefaultValue.SINREGISTRO_GLOBAL, DefaultValue.SINREGISTRO_GLOBAL, datos.idProveedor,
                '', DefaultValue.SINREGISTRO_GLOBAL, datos.ojoDerecho, JSON.stringify(diagnosticoArray),
                datos.ojoIzquierdo, JSON.stringify(diagnosticoArray1), datos.add1, DefaultValue.SINREGISTRO_GLOBAL, DefaultValue.SINREGISTRO_GLOBAL,
                datos.remitidoOftalmo,
                datos.requiereLentes, JSON.stringify(diagnosticoArray2), DefaultValue.SINREGISTRO_GLOBAL,
                '', '', '', '', '', '', datos.resultadoColesterol,
                datos.interpretacionColeste, datos.observacionColeste, datos.resultadoColesteHDL,
                datos.interpretacionColesteHDL, datos.observacionColesteHDL, datos.dislipidemiaHDL, datos.resultadoTrigli,
                datos.interpretacionTrigli, datos.observacionTrigli, datos.resultadoGlicemia, datos.interpretacionGlicemia,
                datos.observacionGlicemia, datos.resultadoCreatinina, datos.interpretacionCreatinina, datos.observacionCreatinina, datos.resultadoBUN,
                datos.interpretacionBUN, datos.observacionBUN, datos.idParcialOrina, datos.observacionParcialOrina,
                datos.hemograma, datos.observacionHemograma, datos.gpt, datos.observacionGPT, datos.got, datos.observacionGOT, datos.bilirrubina,
                datos.observacionBilirrubina, datos.bilirrubinaDirecta, datos.observacionBilirrubinaDirecta, datos.otalgiaAOP, datos.otorreaAOP, datos.otitisAOP, datos.acufenosAOP, datos.cirugiaAOP,
                datos.vertigoAOP, datos.farmacologicosAOP, datos.luritoAOP, datos.familiaresAOP, datos.paralisisAOP,
                datos.htaaop, datos.tipoAcusiaAOP, datos.diabetesAOP, datos.expoRuidoAOP, datos.anteceTraumaticosAOP,
                datos.observacionAOP, datos.idEmpresaAO, datos.idCargoAO, datos.tiempoExpoAO, datos.idProteccionAuditivaAO,
                datos.idSuministradaPorAO, datos.idUsoA, datos.idOdcaeAUDIO,
                datos.idOdmtAUDIO, datos.idOicaeAUDIO, datos.idOimtAUDIO, datos.idReposoAUDIO, datos.dxAUDIO, datos.idCambioEPP, datos.observacionAUDIO,
                filePdf, user.email, FormatDate(new Date()), '', FormatDate(new Date()));

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
        <MainCard title="Registrar Audiometría">
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
                        <SubCard darkTitle title={<Typography variant="h4">ANTECEDENTES OTOLÓGICOS Y PERSONALES</Typography>}>
                            <Grid container spacing={2}>



                                <Grid item xs={12} md={1} lg={2}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="Otalgia"
                                            name="otalgiaAOP"
                                            size={25}
                                            defaultValue={false}
                                        />
                                    </FormProvider>
                                </Grid>



                                <Grid item xs={12} md={1} lg={2}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="Otorrea"
                                            name="otorreaAOP"
                                            size={25}
                                            defaultValue={false}
                                        />
                                    </FormProvider>
                                </Grid>


                                <Grid item xs={12} md={1} lg={2}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="Otitis"
                                            name="otitisAOP"
                                            size={25}
                                            defaultValue={false}
                                        />
                                    </FormProvider>
                                </Grid>


                                <Grid item xs={12} md={1} lg={2}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="Acufenos"
                                            name="acufenosAOP"
                                            size={25}
                                            defaultValue={false}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12} md={1} lg={2}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="Cirugía de Oídos"
                                            name="cirugiaAOP"
                                            size={25}
                                            defaultValue={false}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12} md={1} lg={2}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="Vértigo"
                                            name="vertigoAOP"
                                            size={25}
                                            defaultValue={false}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12} md={1} lg={2}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="Farmacológicos"
                                            name="farmacologicosAOP"
                                            size={25}
                                            defaultValue={false}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12} md={1} lg={2}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="Prurito"
                                            name="luritoAOP"
                                            size={25}
                                            defaultValue={false}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12} md={1} lg={2}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="Familiares"
                                            name="familiaresAOP"
                                            size={25}
                                            defaultValue={false}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12} md={1} lg={2}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="Parálisis Facial"
                                            name="paralisisAOP"
                                            size={25}
                                            defaultValue={false}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12} md={1} lg={2}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="H.T.A."
                                            name="htaaop"
                                            size={25}
                                            defaultValue={false}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12} md={1} lg={2}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="Hipoacusia"
                                            name="tipoAcusiaAOP"
                                            size={25}
                                            defaultValue={false}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12} md={1} lg={2}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="Diabetes"
                                            name="diabetesAOP"
                                            size={25}
                                            defaultValue={false}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12} md={1} lg={2}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="Exp. A Ruido No Ind."
                                            name="expoRuidoAOP"
                                            size={25}
                                            defaultValue={false}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12} md={1} lg={6}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="Antecedentes Traumáticos"
                                            name="anteceTraumaticosAOP"
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
                                            name="observacionAOP"
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
                        <SubCard darkTitle title={<Typography variant="h4">ANTECEDENTES OCUPACIONALES</Typography>}>
                            <Grid container spacing={2}>

                                <Grid item xs={12} md={1} lg={4}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue=""
                                            fullWidth
                                            name="idEmpresaAO"
                                            label="Empresa"
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>



                                <Grid item xs={12} md={1} lg={4}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="idCargoAO"
                                            label="Cargo"
                                            defaultValue=""
                                            options={lsCargo}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12} md={1} lg={4}>
                                    <FormProvider {...methods}>
                                        <InputText
                                            defaultValue=""
                                            fullWidth
                                            name="tiempoExpoAO"
                                            label="Tiempo Exp."
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>


                                <Grid item xs={12} md={1} lg={4}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="idProteccionAuditivaAO"
                                            label="Protección Auditiva"
                                            defaultValue=""
                                            options={lsProteccionAuditiva}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12} md={1} lg={4}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="idSuministradaPorAO"
                                            label="Suministrada Por"
                                            defaultValue=""
                                            options={lsSuministradopor}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12} md={1} lg={4}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="idUsoAO"
                                            label="Uso"
                                            defaultValue=""
                                            options={lsUso}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>


                            </Grid>
                        </SubCard>
                    </Grid>




                    <Grid item xs={12}>
                        <SubCard darkTitle title={<Typography variant="h4">AUDIOGRAMA</Typography>}>
                            <Grid container spacing={2}>

                                <Grid item xs={12} md={1} lg={4}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="idOdcaeAUDIO"
                                            label="OD CAE"
                                            defaultValue=""
                                            options={lsAudiograma}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>



                                <Grid item xs={12} md={1} lg={4}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="idOdmtAUDIO"
                                            label="OD MT"
                                            defaultValue=""
                                            options={lsAudiograma}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12} md={1} lg={4}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="idOicaeAUDIO"
                                            label="OI CAE"
                                            defaultValue=""
                                            options={lsAudiograma}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12} md={1} lg={4}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="idOimtAUDIO"
                                            label="OI MT"
                                            defaultValue=""
                                            options={lsAudiograma}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12} md={1} lg={8}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="Reposo Auditivo"
                                            name="idReposoAUDIO"
                                            size={25}
                                            defaultValue={false}
                                        />
                                    </FormProvider>
                                </Grid>


                                {/* // DX AQUIIIIIIIIIIIIIIII// */}

                                <Grid item xs={12} md={1} lg={2}>
                                    <InputOnChange
                                        label="Dx "
                                        onKeyDown={handleDx1}
                                        onChange={(e) => setTextDx1(e?.target.value)}
                                        value={textDx1}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </Grid>
                                <Grid item xs={12} md={1} lg={6}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="dxAUDIO"
                                            label="Dx"
                                            defaultValue=""
                                            options={lsDx1}
                                            size={matchesXS ? 'small' : 'medium'}
                                        />
                                    </FormProvider>
                                </Grid>



                                <Grid item xs={12} md={1} lg={2}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="idConductaClasificacion"
                                            label="Conducta"
                                            defaultValue=""
                                            options={lsConducta}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12} md={1} lg={2}>
                                    <FormProvider {...methods}>
                                        <InputCheckBox
                                            label="Cambio EPP"
                                            name="idCambioEPP"
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
                                            name="observacionAUDIO"
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

export default Audiometry;