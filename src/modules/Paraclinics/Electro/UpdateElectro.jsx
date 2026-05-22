import {
    Button,
    Grid,
    useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';

import InputDatePicker from 'components/input/InputDatePicker';
import ViewEmployee from 'components/views/ViewEmployee';
import useAuth from 'hooks/useAuth';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import UploadIcon from '@mui/icons-material/Upload';
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import { GetByIdParaclinics, UpdateParaclinicss } from 'api/clients/ParaclinicsClient';
import { GetAllSupplier } from 'api/clients/SupplierClient';
import { MessageError, MessageUpdate } from 'components/alert/AlertAll';
import ViewPDF from 'components/components/ViewPDF';
import ControllerListen from 'components/controllers/ControllerListen';
import ControlModal from 'components/controllers/ControlModal';
import { AccionMenu, CodCatalogo, DefaultValue, Message, Modulo, TitleButton } from 'components/helpers/Enums';
import InputSelect from 'components/input/InputSelect';
import InputText from 'components/input/InputText';
import Cargando from 'components/loading/Cargando';
import ValidateActionSkeleton from 'components/ValidateAction/ValidateActionSkeleton';
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';

const UpdateElectro = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const { id } = useParams();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [filePdf, setFilePdf] = useState(null);
    const [timeWait, setTimeWait] = useState(false);

    const [openError, setOpenError] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [lsEmployee, setLsEmployee] = useState([]);
    const [open, setOpen] = useState(false);

    const [lsElectro, setLsElectro] = useState([]);
    const [documento, setDocumento] = useState('');
    const [lsMotivo, setLsMotivo] = useState([]);
    const [lsProveedor, setLsProveedor] = useState([]);
    const [lsConclusion, setLsConclusion] = useState([]);
    const [lsConducta, setLsConducta] = useState([]);

    const methods = useForm();
    const { handleSubmit } = methods;

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

    async function getAll() {
        try {
            const lsServerMotivo = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Atencion_PARACLINICO);
            var resultMotivo = lsServerMotivo.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsMotivo(resultMotivo);

            const lsServerConducta = await GetAllByTipoCatalogo(0, 0, CodCatalogo.HCO_RESULTADO);
            var resultConducta = lsServerConducta.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsConducta(resultConducta);

            const lsServerConclusion = await GetAllByTipoCatalogo(0, 0, CodCatalogo.HCO_RESULTADO);
            var resultConclusion = lsServerConclusion.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsConclusion(resultConclusion);

            const lsServerProveedor = await GetAllSupplier();
            var resultProveedor = lsServerProveedor.data.map((item) => ({
                value: item.codiProv,
                label: item.nombProv
            }));
            setLsProveedor(resultProveedor);

            const serverData = await GetByIdParaclinics(id);
            if (serverData.status === 200) {
                setDocumento(serverData.data.documento);
                setLsElectro(serverData.data);

                const event = {
                    target: { value: serverData.data.documento }
                }
                handleLoadingDocument(event);

                if (serverData.data.url !== "") {
                    setFilePdf(serverData.data.url);
                }
            }
        } catch (error) { }
    }

    useEffect(() => {
        getAll();
    }, []);

    const handleClick = async (datos) => {
        try {
            const DataToUpdate = {
                id: id,
                idTipoParaclinico: DefaultValue.PARACLINICO_ELECTRO,
                documento: documento || null,
                fecha: datos.fecha || null,
                idMotivo: datos.idMotivo || null,
                idConductaClasificacion: datos.idConductaClasificacion || null,
                idConclusion: datos.idConclusion || null,
                idProveedor: datos.idProveedor || null,
                observacion: datos.observacion || null,
                url: filePdf || null
            };

            const result = await UpdateParaclinicss(DataToUpdate);
            if (result.status === 200) {
                setOpenUpdate(true);
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(Message.RegistroNoGuardado);
        }
    };

    setTimeout(() => {
        if (lsElectro.length !== 0)
            setTimeWait(true);
    }, 500);

    return (
        <MainCard title="Actualizar ElectroCardiograma">
            <ValidateActionSkeleton idAccion={AccionMenu.actualizar} idModulo={Modulo.Electrocardiograma}>
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

                {timeWait ?
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
                                    <Grid item xs={2.4}>
                                        <FormProvider {...methods}>
                                            <InputDatePicker
                                                label="Fecha"
                                                name="fecha"
                                                defaultValue={lsElectro.fecha}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={2.4}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="idMotivo"
                                                label="Motivo"
                                                defaultValue={lsElectro.idMotivo}
                                                options={lsMotivo}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={2.4}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="idConductaClasificacion"
                                                label="Conducta"
                                                defaultValue={lsElectro.idConductaClasificacion}
                                                options={lsConducta}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={2.4}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="idConclusion"
                                                label="Conclusión"
                                                defaultValue={lsElectro.idConclusion}
                                                options={lsConclusion}
                                                size={matchesXS ? 'small' : 'medium'}
                                            />
                                        </FormProvider>
                                    </Grid>

                                    <Grid item xs={2.4}>
                                        <FormProvider {...methods}>
                                            <InputSelect
                                                name="idProveedor"
                                                label="Proveedor"
                                                defaultValue={lsElectro.idProveedor}
                                                options={lsProveedor}
                                                size={matchesXS ? 'small' : 'medium'}
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
                                                defaultValue={lsElectro.observacion}
                                                fullWidth
                                                name="observacion"
                                                label="Observación"
                                                size={matchesXS ? 'small' : 'medium'}
                                                multiline
                                                rows={6}
                                            />
                                        </FormProvider>
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
                                    <ViewPDF dataPDF={filePdf} width="1180" height="500" />
                                </Grid>
                            </MainCard>
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
                                        <Button variant="outlined" fullWidth onClick={() => navigate("/paraclinics/electro/list")}>
                                            {TitleButton.Cancelar}
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid> : <Cargando />
                }
            </ValidateActionSkeleton>
        </MainCard>
    );
};

export default UpdateElectro;