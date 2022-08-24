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
import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import DetailedIcon from 'components/controllers/DetailedIcon';
import ControlModal from 'components/controllers/ControlModal';
import ControllerListen from 'components/controllers/ControllerListen';
import FullScreenDialog from 'components/controllers/FullScreenDialog';
import ListPlantillaAll from 'components/template/ListPlantillaAll';
import { FormatDate } from 'components/helpers/Format'
import InputMultiSelects from 'components/input/InputMultiSelects';
import InputText from 'components/input/InputText';
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import InputSelect from 'components/input/InputSelect';
import { Message, TitleButton, CodCatalogo, DefaultValue } from 'components/helpers/Enums';
import AnimateButton from 'ui-component/extended/AnimateButton';
import SubCard from 'ui-component/cards/SubCard';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import { GetAllCIE11 } from 'api/clients/CIE11Client';
import { PutParaclinics } from 'formatdata/ParaclinicsForm';
import { UpdateParaclinicss, GetByIdParaclinics } from 'api/clients/ParaclinicsClient';
import { GetAllSupplier } from 'api/clients/SupplierClient';
import Cargando from 'components/loading/Cargando';
import { MessageUpdate, MessageError } from 'components/alert/AlertAll';
import MainCard from 'ui-component/cards/MainCard';
import UploadIcon from '@mui/icons-material/Upload';


const DetailIcons = [

    { title: 'Audio', icons: <SettingsVoiceIcon fontSize="small" /> },


]

const UpdateSpirometry = () => {
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
    const [lsSpirometry, setLsSpirometry] = useState([]);

    const [diagnosticoArray, setDiagnosticoArray] = useState([]);
    const [diagnosticoArray1, setDiagnosticoArray1] = useState([]);
    const [diagnosticoArray2, setDiagnosticoArray2] = useState([]);

    const [documento, setDocumento] = useState('');

    const [lsMotivo, setLsMotivo] = useState([]);
    const [lsProveedor, setLsProveedor] = useState([]);
    const [lsTipoEPP, setLsTipoEPP] = useState([]);
    const [lsResultado, setLsResultado] = useState([]);




    const [lsOjoDerecho, setLsOjoDerecho] = useState([]);
    const [lsOjoIzquierdo, setLsOjoIzquierdo] = useState([]);
    const [lsAdd1, setLsAdd1] = useState([]);




    const methods = useForm();
    /* { resolver: yupResolver(validationSchema) } */

    const { handleSubmit, errors } = methods;

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

    async function GetAll() {
        try {



            const serverData = await GetByIdParaclinics(id);
            if (serverData.status === 200) {
                setDocumento(serverData.data.documento);
                setLsSpirometry(serverData.data);
                setDiagnosticoArray(JSON.parse(serverData.data.dxDerecho));
                setDiagnosticoArray1(JSON.parse(serverData.data.dxIzquierdo));
                setDiagnosticoArray2(JSON.parse(serverData.data.dxDiagnostico));
                handleLoadingDocument(serverData.data.documento);
                setFilePdf(serverData.data.url);
            }

            const lsServerCie11 = await GetAllCIE11(0, 0);
            var resultCie11 = lsServerCie11.data.entities.map((item) => ({
                value: item.id,
                label: item.dx
            }));
            setLsCie11(resultCie11);





            const lsServerMotivo = await GetAllByTipoCatalogo(0, 0, CodCatalogo.AtencionEMO);
            var resultMotivo = lsServerMotivo.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsMotivo(resultMotivo);



            const lsServerTipoEPP = await GetAllByTipoCatalogo(0, 0, CodCatalogo.PARACLINICO_TIPOEPP);
            var resultTipoEPP = lsServerTipoEPP.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsTipoEPP(resultTipoEPP);



            const lsServerResultado = await GetAllByTipoCatalogo(0, 0, CodCatalogo.PARACLINICO_RESULTADO);
            var resultResultado = lsServerResultado.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsResultado(resultResultado);



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
            const DataToUpdate = PutParaclinics(id, DefaultValue.PARACLINICO_ESPIROMETRIA, documento,
                FormatDate(datos.fecha), datos.idMotivo, DefaultValue.SINREGISTRO_GLOBAL, DefaultValue.SINREGISTRO_GLOBAL, datos.idProveedor,
                datos.observacion, DefaultValue.SINREGISTRO_GLOBAL, '', '', '', '', '', DefaultValue.SINREGISTRO_GLOBAL, DefaultValue.SINREGISTRO_GLOBAL, false,
                false, '', datos.idTipoEPP, datos.fvc, datos.feV1, datos.fevfvc, datos.feV2575, datos.pef, datos.resultado, '', DefaultValue.SINREGISTRO_GLOBAL, '', '',
                DefaultValue.SINREGISTRO_GLOBAL, '', false, '', DefaultValue.SINREGISTRO_GLOBAL, '', '', DefaultValue.SINREGISTRO_GLOBAL,
                '', '', DefaultValue.SINREGISTRO_GLOBAL, '', '', DefaultValue.SINREGISTRO_GLOBAL, '', DefaultValue.SINREGISTRO_GLOBAL, '',
                DefaultValue.SINREGISTRO_GLOBAL, '', DefaultValue.SINREGISTRO_GLOBAL, '', DefaultValue.SINREGISTRO_GLOBAL, '', DefaultValue.SINREGISTRO_GLOBAL,
                '', DefaultValue.SINREGISTRO_GLOBAL, '', false, false, false, false, false, false, false, false, false, false, false, false,
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
        <MainCard title="Actualizar Espirometría">
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



                {lsSpirometry.length != 0 ?
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
                                    <Grid item xs={3.0}>
                                        <FormProvider {...methods}>
                                            <InputDatePicker
                                                label="Fecha"
                                                name="fecha"
                                                defaultValue={lsSpirometry.fecha}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={3.0}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="idMotivo"
                                                label="Motivo"
                                                defaultValue={lsSpirometry.idMotivo}
                                                options={lsMotivo}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={3.0}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="idProveedor"
                                                label="Proveedor"
                                                defaultValue={lsSpirometry.idProveedor}
                                                options={lsProveedor}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </FormProvider>
                                    </Grid>


                                    <Grid item xs={3.0}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="idTipoEPP"
                                                label="Tipo EPP"
                                                defaultValue={lsSpirometry.idTipoEPP}
                                                options={lsTipoEPP}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </FormProvider>
                                    </Grid>


                                </Grid>
                            </SubCard>
                        </Grid>


                        <Grid item xs={12}>
                            <SubCard darkTitle title={<Typography variant="h4"></Typography>}>
                                <Grid container spacing={2}>


                                    <Grid item xs={12} md={1} lg={2}>
                                        <FormProvider {...methods}>
                                            <InputText
                                                fullWidth
                                                name="fvc"
                                                label="FVC"
                                                defaultValue={lsSpirometry.fvc}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </FormProvider>
                                    </Grid>



                                    <Grid item xs={12} md={1} lg={2}>
                                        <FormProvider {...methods}>
                                            <InputText
                                                fullWidth
                                                name="feV1"
                                                label="FEV1"
                                                defaultValue={lsSpirometry.feV1}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={1} lg={2}>
                                        <FormProvider {...methods}>
                                            <InputText

                                                fullWidth
                                                name="fevfvc"
                                                label="FEV1/FVC"
                                                defaultValue={lsSpirometry.fevfvc}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={1} lg={2}>
                                        <FormProvider {...methods}>
                                            <InputText
                                                fullWidth
                                                name="feV2575"
                                                label="FEV25/75"
                                                defaultValue={lsSpirometry.feV2575}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={1} lg={2}>
                                        <FormProvider {...methods}>
                                            <InputText
                                                fullWidth
                                                name="pef"
                                                label="PEF"
                                                defaultValue={lsSpirometry.pef}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={12} md={1} lg={2}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="resultado"
                                                label="Resultado"
                                                defaultValue=""
                                                options={lsResultado}
                                                size={matchesXS ? 'small' : 'medium'}
                                                bug={errors}
                                            />
                                        </FormProvider>
                                    </Grid>


                                </Grid>
                            </SubCard>
                        </Grid>



                        <Grid item xs={12}>
                            <SubCard darkTitle>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <FormProvider {...methods}>
                                            <InputText
                                                defaultValue={lsSpirometry.observacion}
                                                fullWidth
                                                name="observacion"
                                                label="Observación"
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
                                        <Button variant="outlined" fullWidth onClick={() => navigate("/paraclinics/spirometry/list")}>
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

export default UpdateSpirometry;