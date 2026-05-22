import {
    Button,
    Grid,
    useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';

import { MessageError, MessageSuccess } from 'components/alert/AlertAll';
import ViewEmployee from 'components/views/ViewEmployee';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import UploadIcon from '@mui/icons-material/Upload';
import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import { InsertParaclinics } from 'api/clients/ParaclinicsClient';
import { GetAllSupplier } from 'api/clients/SupplierClient';
import ViewPDF from 'components/components/ViewPDF';
import ControllerListen from 'components/controllers/ControllerListen';
import ControlModal from 'components/controllers/ControlModal';
import { AccionMenu, CodCatalogo, DefaultValue, Message, Modulo, TitleButton } from 'components/helpers/Enums';
import { FormatDate } from 'components/helpers/Format';
import InputDatePicker from 'components/input/InputDatePicker';
import InputSelect from 'components/input/InputSelect';
import InputText from 'components/input/InputText';
import ValidateActionSkeleton from 'components/ValidateAction/ValidateActionSkeleton';
import { PostParaclinics } from 'formatdata/ParaclinicsForm';
import useAuth from 'hooks/useAuth';
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';

const Electro = () => {
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
    const [lsConclusion, setLsConclusion] = useState([]);
    const [lsConducta, setLsConducta] = useState([]);

    const methods = useForm();
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
        } catch (error) { }
    }

    useEffect(() => {
        getAll();
    }, [])

    const handleClick = async (datos) => {
        try {
            const DataToInsert = {
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

            const result = await InsertParaclinics(DataToInsert);
            if (result.status === 200) {
                setOpenSuccess(true);
                setDocumento('');
                setLsEmployee([]);
                reset();
                setFilePdf(null);
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(Message.RegistroNoGuardado);
        }
    };

    return (
        <ValidateActionSkeleton idAccion={AccionMenu.agregar} idModulo={Modulo.Electrocardiograma}>
            <MainCard title="Registrar ElectroCardiograma">
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
                            <Grid container spacing={2}>
                                <Grid item xs={2.4}>
                                    <FormProvider {...methods}>
                                        <InputDatePicker
                                            label="Fecha"
                                            name="fecha"
                                            defaultValue={new Date()}
                                        />
                                    </FormProvider>
                                </Grid>

                                <Grid item xs={2.4}>
                                    <FormProvider {...methods}>
                                        <InputSelect
                                            name="idMotivo"
                                            label="Motivo"
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
                                            fullWidth
                                            name="observacion"
                                            label="Observaciones"
                                            size={matchesXS ? 'small' : 'medium'}
                                            multiline
                                            rows={6}
                                        />
                                    </FormProvider>
                                </Grid>
                            </Grid>
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
                                            <Button variant="outlined" fullWidth onClick={() => navigate("/paraclinics/electro/list")}>
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

export default Electro;