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

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import InputDatePicker from 'components/input/InputDatePicker';
import { FormatDate } from 'components/helpers/Format';
import { GetByIdConceptofAptitude, UpdateConceptofAptitudes } from 'api/clients/ConceptofAptitudeClient';
import { GetAllSupplier } from 'api/clients/SupplierClient';
import { GetAllBySubTipoCatalogo, GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import InputSelect from 'components/input/InputSelect';
import { Message, DefaultValue, TitleButton, CodCatalogo, ValidationMessage } from 'components/helpers/Enums';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { PutOrderEPP } from 'formatdata/OrderEPPForm';
import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';
import SubCard from 'ui-component/cards/SubCard';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';

import ViewEmployee from 'components/views/ViewEmployee';

import Cargando from 'components/loading/Cargando';
import { GetAllUser, GetByMail } from 'api/clients/UserClient';
import { generateReportConceptofAptitude } from './ReportConceptofAptitude';
import ViewPDF from 'components/components/ViewPDF';

const validationSchema = yup.object().shape({
    idProvedor: yup.string().required(`${ValidationMessage.Requerido}`),
});


const DetailIcons = [
    { title: 'Plantilla de texto', icons: <ListAltSharpIcon fontSize="small" /> },
    { title: 'Audio', icons: <SettingsVoiceIcon fontSize="small" /> },
]

const UpdateOrderEPP = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const theme = useTheme();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [openReport, setOpenReport] = useState(false);
    const [dataPDF, setDataPDF] = useState(null);

    const [openUpdate, setOpenUpdate] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [lsProveedor, setLsProveedor] = useState([]);
    const [documento, setDocumento] = useState('');


    const [motivo, setMotivo] = useState('');

    const [lsEmployee, setLsEmployee] = useState([]);



    const [lsDataAtencion, setLsDataAtencion] = useState([]);
    const [timeWait, setTimeWait] = useState(false);

    const methods = useForm({
        resolver: yupResolver(validationSchema),
    });

    const { handleSubmit, formState: { errors }, reset } = methods;

    async function getAll() {
        try {


            const lsServerUpdate = await GetByIdConceptofAptitude(id);
            if (lsServerUpdate.status === 200) {
                setDocumento(lsServerUpdate.data.documento);
                handleLoadingDocument(lsServerUpdate.data.documento);
                setLsDataAtencion(lsServerUpdate.data);
            }


            const lsServerProveedor = await GetAllSupplier(0, 0);
            var resultProveedor = lsServerProveedor.data.entities.map((item) => ({
                value: item.codiProv,
                label: item.nombProv
            }));
            setLsProveedor(resultProveedor);


        } catch (error) {
            setOpenError(true);
            setErrorMessage(`${error}`);
        }
    }

    const handleDocumento = async (event) => {
        try {
            setDocumento(event?.target.value);
            if (event.key === 'Enter') {
                if (event?.target.value !== "") {
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

    const handleClickReport = async () => {
        try {
            setOpenReport(true);
            const lsDataReport = await GetByIdConceptofAptitude(id);
            const lsDataUser = await GetByMail(user.email);
            const dataPDFTwo = generateReportConceptofAptitude(lsDataReport.data, lsDataUser.data);
            setDataPDF(dataPDFTwo);
        } catch (err) { }
    };





    const handleLoadingDocument = async (idEmployee) => {
        try {
            var lsServerEmployee = await GetByIdEmployee(idEmployee);

            if (lsServerEmployee.status === 200)
                setLsEmployee(lsServerEmployee.data);
        } catch (error) {
            setLsEmployee([]);
            setErrorMessage(Message.ErrorDeDatos);
        }
    }

    useEffect(() => {
        getAll();
    }, [])




    const handleClick = async (datos) => {
        const DataToUpdate = PutOrderEPP(id, documento, FormatDate(datos.fecha), datos.idProvedor,
            lsDataAtencion.usuarioRegistro, lsDataAtencion.fechaRegistro, user.nameuser, FormatDate(new Date()));

        try {
            if (Object.keys(datos.length !== 0)) {
                const result = await UpdateConceptofAptitudes(DataToUpdate);
                if (result.status === 200) {
                    setOpenUpdate(true);
                }
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(`${error}`);
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
                            title="ACTUALIZAR CONCEPTOS"
                            key={lsEmployee.documento}
                            documento={documento}
                            onChange={(e) => setDocumento(e.target.value)}
                            lsEmployee={lsEmployee}
                            handleDocumento={handleDocumento}
                        />
                    </Grid>


                    <Grid item xs={12}>
                        <SubCard darkTitle title={<Typography variant="h4"></Typography>}>
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <FormProvider {...methods}>
                                        <InputDatePicker
                                            label="Fecha"
                                            name="fecha"
                                            defaultValue={lsDataAtencion.fecha}
                                        />
                                    </FormProvider>
                                </Grid>



                                <Grid item xs={3}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="idProvedor"
                                            label="Proveedor"
                                            defaultValue={lsDataAtencion.idProvedor}
                                            options={lsProveedor}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.idProvedor}
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