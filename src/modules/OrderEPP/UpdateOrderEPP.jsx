import {
    Button,
    Grid,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';

import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { MessageError, MessageUpdate } from 'components/alert/AlertAll';
import ControlModal from 'components/controllers/ControlModal';
import useAuth from 'hooks/useAuth';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import { GetByIdOrderEPP, UpdateOrderEPPs } from 'api/clients/OrderEPPClient';
import { GetAllSupplier } from 'api/clients/SupplierClient';
import { AccionMenu, Message, Modulo, TitleButton, ValidationMessage } from 'components/helpers/Enums';
import { FormatDate } from 'components/helpers/Format';
import InputDatePicker from 'components/input/InputDatePicker';
import InputSelect from 'components/input/InputSelect';
import { PutOrderEPP } from 'formatdata/OrderEPPForm';
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';

import { GetByMail } from 'api/clients/UserClient';
import ViewPDF from 'components/components/ViewPDF';
import Cargando from 'components/loading/Cargando';
import ValidateActionSkeleton from 'components/ValidateAction/ValidateActionSkeleton';
import ViewEmployee from 'components/views/ViewEmployee';
import { generateReportOrderEPP } from './ReportEPP';

const validationSchema = yup.object().shape({
    idProvedor: yup.string().required(ValidationMessage.Requerido),
});

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

    const [lsEmployee, setLsEmployee] = useState([]);
    const [lsDataAtencion, setLsDataAtencion] = useState([]);
    const [timeWait, setTimeWait] = useState(false);

    const methods = useForm({
        resolver: yupResolver(validationSchema),
    });

    const { handleSubmit, formState: { errors } } = methods;

    async function getAll() {
        try {
            const lsServerUpdate = await GetByIdOrderEPP(id);
            if (lsServerUpdate.status === 200) {
                setDocumento(lsServerUpdate.data.documento);
                setLsDataAtencion(lsServerUpdate.data);

                const event = {
                    target: { value: lsServerUpdate.data.documento }
                }
                handleLoadingDocument(event);
            }

            const lsServerProveedor = await GetAllSupplier();
            var resultProveedor = lsServerProveedor.data.map((item) => ({
                value: item.codiProv,
                label: item.nombProv
            }));
            setLsProveedor(resultProveedor);
        } catch (error) { }
    }

    const handleClickReport = async () => {
        try {
            setOpenReport(true);
            const lsDataReport = await GetByIdOrderEPP(id);
            const lsDataUser = await GetByMail(lsDataReport.data.usuarioModifico === "" ? lsDataReport.data.usuarioRegistro : lsDataReport.data.usuarioModifico);
            const dataPDFTwo = generateReportOrderEPP(lsDataReport.data, lsDataUser.data);
            setDataPDF(dataPDFTwo);
        } catch (err) { }
    };

    const handleLoadingDocument = async (idEmployee) => {
        try {
            var lsServerEmployee = await GetByIdEmployee(idEmployee.target.value);

            if (lsServerEmployee?.data.status === 200) {
                setLsEmployee(lsServerEmployee.data.data);
            } else {
                setLsEmployee(lsServerEmployee?.data.data);
                setOpenError(true);
                setErrorMessage(lsServerEmployee?.data.message);
            }
        } catch (error) {
            setLsEmployee([]);
            setErrorMessage(Message.ErrorDeDatos);
        }
    }

    useEffect(() => {
        getAll();
    }, []);

    const handleClick = async (datos) => {
        const DataToUpdate = PutOrderEPP(id, documento, datos.fecha, datos.idProvedor,
            lsDataAtencion.usuarioRegistro, lsDataAtencion.fechaRegistro, user?.nameuser, FormatDate(new Date()));

        try {
            if (Object.keys(datos.length !== 0)) {
                const result = await UpdateOrderEPPs(DataToUpdate);
                if (result.status === 200) {
                    setOpenUpdate(true);
                }
            }
        } catch (error) { }
    };

    setTimeout(() => {
        if (lsDataAtencion.length !== 0) {
            setTimeWait(true);
        }
    }, 500);

    return (
        <ValidateActionSkeleton idAccion={AccionMenu.actualizar} idModulo={Modulo.OrdenesEPP}>
            <MessageUpdate open={openUpdate} onClose={() => setOpenUpdate(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

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
                            title="Actualizar Ordenes EPP"
                            disabled={true}
                            key={lsEmployee.documento}
                            documento={documento}
                            onChange={(e) => setDocumento(e.target.value)}
                            lsEmployee={lsEmployee}
                            handleDocumento={handleLoadingDocument}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <SubCard darkTitle title={<Typography variant="h4"></Typography>}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <FormProvider {...methods}>
                                        <InputDatePicker
                                            label="Fecha"
                                            name="fecha"
                                            defaultValue={lsDataAtencion.fecha}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={12} md={6}>
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
                                            <Button variant="outlined" fullWidth onClick={() => navigate("/orderepp/list")}>
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
        </ValidateActionSkeleton>
    );
};

export default UpdateOrderEPP;