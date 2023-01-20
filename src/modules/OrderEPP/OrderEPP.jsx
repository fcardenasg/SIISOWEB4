import { useState, useEffect, Fragment } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { ValidationMessage } from 'components/helpers/Enums';
import { yupResolver } from '@hookform/resolvers/yup';
import { MessageSuccess, MessageError } from 'components/alert/AlertAll';
import useAuth from 'hooks/useAuth';
import ControlModal from 'components/controllers/ControlModal';
import InputDatePicker from 'components/input/InputDatePicker';
import { FormatDate } from 'components/helpers/Format';
import { GetByIdOrderEPP, InsertOrderEPP } from 'api/clients/OrderEPPClient';
import InputSelect from 'components/input/InputSelect';
import { Message, DefaultValue, TitleButton, CodCatalogo } from 'components/helpers/Enums';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { PostOrderEPP } from 'formatdata/OrderEPPForm';
import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';
import SubCard from 'ui-component/cards/SubCard';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import FullScreenDialog from 'components/controllers/FullScreenDialog';
import { GetAllSupplier } from 'api/clients/SupplierClient';
import ViewEmployee from 'components/views/ViewEmployee';
import { GetAllUser, GetByMail } from 'api/clients/UserClient';
import { generateReportOrderEPP } from './ReportEPP';
import ViewPDF from 'components/components/ViewPDF';

const validationSchema = yup.object().shape({
    idProvedor: yup.string().required(`${ValidationMessage.Requerido}`),
});


const DetailIcons = [
    { title: 'Plantilla de texto', icons: <ListAltSharpIcon fontSize="small" /> },
    { title: 'Audio', icons: <SettingsVoiceIcon fontSize="small" /> },
]

const OrderEPP = () => {
    const { user } = useAuth();
    const theme = useTheme();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [openReport, setOpenReport] = useState(false);
    const [dataPDF, setDataPDF] = useState(null);
    const [lsProveedor, setLsProveedor] = useState([]);

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [documento, setDocumento] = useState('');

    const [lsEmployee, setLsEmployee] = useState([]);

    const [result, setResult] = useState([]);

    const methods = useForm({
        resolver: yupResolver(validationSchema),
    });

    const { handleSubmit, formState: { errors }, reset } = methods;

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
            const lsDataReport = await GetByIdOrderEPP(result.idOrdenesEpp);
            const lsDataUser = await GetByMail(user.email);
            const dataPDFTwo = generateReportOrderEPP(lsDataReport.data, lsDataUser.data);

            setDataPDF(dataPDFTwo);
        } catch (err) { }
    };

   // result.idOrdenesEpp

    async function GetAll() {
        try {
     
            const lsServerProveedor = await GetAllSupplier(0, 0);
            var resultProveedor = lsServerProveedor.data.entities.map((item) => ({
                value: item.codiProv,
                label: item.nombProv
            }));
            setLsProveedor(resultProveedor);
        } catch (error) { }
    }

    useEffect(() => {
        GetAll();
    }, [])



 
    const handleClick = async (datos) => {
        try {
            const DataToInsert = PostOrderEPP(documento, FormatDate(datos.fecha), datos.idProvedor,
            user.email, FormatDate(new Date()), '', FormatDate(new Date()));

            if (Object.keys(datos.length !== 0)) {
                const result = await InsertOrderEPP(DataToInsert);
                if (result.status === 200) {
                    setOpenSuccess(true);
                    setDocumento('');
                    setLsEmployee([]);
                    reset();
                    setResult(result.data)
                }
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage('Este código ya existe');
        }
    };


    return (
        <Fragment>
            <MessageSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />



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
                    <ViewEmployee
                        title="REGISTRAR ORDENES EPP"
                        key={lsEmployee.documento}
                        documento={documento}
                        onChange={(e) => setDocumento(e.target.value)}
                        lsEmployee={lsEmployee}
                        handleDocumento={handleDocumento}
                    />
                </Grid>

                <Grid item xs={12}>
                    <SubCard>
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputDatePicker
                                        label="Fecha"
                                        name="fecha"
                                        defaultValue={new Date()}
                                    />
                                </FormProvider>
                            </Grid>

        

                            <Grid item xs={3}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="idProvedor"
                                            label="Proveedor"
                                            defaultValue=""
                                            options={lsProveedor}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.idProvedor}
                                        />
                                    </FormProvider>
                                </Grid>



                       
                       \

                        </Grid>

                        <Grid item xs={12} sx={{ pt: 6 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={2}>
                                    <AnimateButton>
                                        <Button variant="contained" onClick={handleSubmit(handleClick)} fullWidth>
                                            {TitleButton.Guardar}
                                        </Button>
                                    </AnimateButton>
                                </Grid>

                                {result.length !== 0 ?
                                    <Grid item xs={2}>
                                        <AnimateButton>
                                            <Button variant="contained" onClick={handleClickReport} fullWidth>
                                                {TitleButton.Imprimir}
                                            </Button>
                                        </AnimateButton>
                                    </Grid> : null}

                                <Grid item xs={2}>
                                    <AnimateButton>
                                        <Button variant="outlined" fullWidth onClick={() => navigate("/orderepp/list")}>
                                            {TitleButton.Cancelar}
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
            </Grid >
        </Fragment >
    );
};

export default OrderEPP;