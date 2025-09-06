import { Button, Grid, IconButton, Tooltip, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import InputDatePicker from 'components/input/InputDatePicker';
import ViewEmployee from 'components/views/ViewEmployee';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import HistoryIcon from '@mui/icons-material/History';
import { GetByTipoCatalogoCombo } from 'api/clients/CatalogClient';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import { GetByIdSpirometry, UpdateSpirometrys } from 'api/clients/ParaclinicsClient';
import { GetSupplierByTipo } from 'api/clients/SupplierClient';
import { AccionMenu, CodCatalogo, IdTipoProveedor, Message, Modulo, TitleButton } from 'components/helpers/Enums';
import InputSelect from 'components/input/InputSelect';
import InputText from 'components/input/InputText';
import UploadPdfFile from 'components/input/UploadPdfFile';
import Cargando from 'components/loading/Cargando';
import ValidateActionSkeleton from 'components/ValidateAction/ValidateActionSkeleton';
import toast from 'react-hot-toast';
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import TableResult from './TableResult';

const UpdateSpirometry = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const { id } = useParams();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [lsEmployee, setLsEmployee] = useState([]);
    const [modelSpirometry, setLsSpirometry] = useState(null);
    const [lsParametro, setLsParametro] = useState([]);

    const [lsMotivo, setLsMotivo] = useState([]);
    const [lsProveedor, setLsProveedor] = useState([]);
    const [lsTipoEPP, setLsTipoEPP] = useState([]);
    const [lsResultado, setLsResultado] = useState([]);

    const methods = useForm();
    const { handleSubmit, watch, setValue, formState: { errors } } = methods;
    const values = watch();

    const handleLoadingDocument = async (idEmployee) => {
        try {
            var lsServerEmployee = await GetByIdEmployee(idEmployee.target.value);

            if (lsServerEmployee?.data.status === 200) {
                setLsEmployee(lsServerEmployee.data.data);
            } else {
                setLsEmployee(lsServerEmployee?.data.data);
                toast.error(lsServerEmployee?.data.message);
            }
        } catch (error) {
            setLsEmployee([]);
            toast.error(Message.ErrorDeDatos);
        }
    }

    useEffect(() => {
        async function getCombo() {
            try {
                const lsServerMotivo = await GetByTipoCatalogoCombo(CodCatalogo.Atencion_PARACLINICO);
                setLsMotivo(lsServerMotivo.data);

                const lsServerTipoEPP = await GetByTipoCatalogoCombo(CodCatalogo.PARACLINICO_TIPOEPP);
                setLsTipoEPP(lsServerTipoEPP.data);

                const lsServerResultado = await GetByTipoCatalogoCombo(CodCatalogo.PARACLINICO_RESULTADO);
                setLsResultado(lsServerResultado.data);

                const lsServerProveedor = await GetSupplierByTipo(IdTipoProveedor.Espirometria);
                setLsProveedor(lsServerProveedor.data);

                const lsServerParametro = await GetByTipoCatalogoCombo(CodCatalogo.PARAMETRO_ESPIRO);
                const sortedParametros = lsServerParametro.data.sort((a, b) => a.value - b.value);
                setLsParametro(sortedParametros);

                sortedParametros.forEach((param, index) => {
                    setValue(`detalle[${index}].idParametro`, param.value);
                });
            } catch (error) { }
        }

        getCombo();
    }, []);

    useEffect(() => {
        async function getDataModel() {
            try {
                setValue('id', id);

                const serverData = await GetByIdSpirometry(id);
                if (serverData.data.exito) {
                    const { datos } = serverData.data;

                    const event = { target: { value: datos.documento } };
                    handleLoadingDocument(event);
                    setValue('documento', datos.documento);

                    if (datos?.detalle?.length) {
                        setValue('detalle', datos.detalle);
                    }

                    if (datos.urlFile)
                        setValue('urlFile', datos.urlFile);

                    setTimeout(() => {
                        setLsSpirometry(datos);
                    }, 700);
                }
            } catch (error) { }
        }

        getDataModel();
    }, [values.refreshData]);

    const handleClick = async (datos) => {
        try {
            const result = await UpdateSpirometrys(datos);
            if (result.data.exito) {
                toast.success(result.data.mensaje);

                if (result.data.datos)
                    setValue('refreshData', !values.refreshData);
            } else
                toast.error(result.data.mensaje);
        } catch (error) {
            toast.error(Message.RegistroNoGuardado);
        }
    };

    return (
        <ValidateActionSkeleton idAccion={AccionMenu.actualizar} idModulo={Modulo.Espirometria}>
            {modelSpirometry ?
                <FormProvider {...methods}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <ViewEmployee
                                disabled
                                title="Actualizar espirometría"
                                key={lsEmployee?.documento}
                                documento={values.documento}
                                onChange={(e) => setValue('documento', e.target.value)}
                                lsEmployee={lsEmployee}
                                handleDocumento={handleLoadingDocument}
                                errors={errors}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <SubCard darkTitle>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6} lg={3}>
                                        <InputDatePicker
                                            label="Fecha"
                                            name="fecha"
                                            defaultValue={modelSpirometry.fecha}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={3}>
                                        <InputSelect
                                            defaultValue={modelSpirometry.idMotivo}
                                            name="idMotivo"
                                            label="Motivo"
                                            options={lsMotivo}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.idMotivo}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={3}>
                                        <InputSelect
                                            defaultValue={modelSpirometry.idProveedor}
                                            name="idProveedor"
                                            label="Proveedor"
                                            options={lsProveedor}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.idProveedor}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={3}>
                                        <InputSelect
                                            defaultValue={modelSpirometry.idTipoEPP}
                                            name="idTipoEPP"
                                            label="Tipo EPP"
                                            options={lsTipoEPP}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.idTipoEPP}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sx={{ mt: 2 }}>
                                        <SubCard title="Resultados de la prueba" secondary={
                                            <Grid container spacing={2}>
                                                {/* <Grid item xs={6}>
                                                    <Tooltip title="Resultados anteriores" placement="top">
                                                        <IconButton
                                                            onClick={(e) => { e.stopPropagation(); setValue('urlFile', null); }}
                                                            sx={{ backgroundColor: 'primary.dark', '&:hover': { backgroundColor: 'primary.main' } }}
                                                        >
                                                            <HistoryIcon sx={{ color: 'white', fontSize: '14px' }} />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Grid> */}

                                                <Grid item xs={6}>
                                                    {values.urlFile && (
                                                        <Tooltip title="Remover archivo PDF" placement="top">
                                                            <IconButton
                                                                onClick={(e) => { e.stopPropagation(); setValue('urlFile', null); }}
                                                                sx={{ backgroundColor: 'primary.dark', '&:hover': { backgroundColor: 'primary.main' } }}
                                                            >
                                                                <CloseIcon sx={{ color: 'white', fontSize: '14px' }} />
                                                            </IconButton>
                                                        </Tooltip>
                                                    )}
                                                </Grid>
                                            </Grid>
                                        }>

                                            <Grid container spacing={2}>
                                                <Grid item xs={12} md={6} textAlign="left">
                                                    <TableResult methods={methods} lsParametro={lsParametro} />
                                                </Grid>

                                                <Grid item xs={12} md={6}>
                                                    <UploadPdfFile name="urlFile" defaultValue={modelSpirometry.urlFile} />
                                                </Grid>
                                            </Grid>
                                        </SubCard>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4}>
                                        <InputSelect
                                            name="resultado"
                                            label="Resultado"
                                            defaultValue={modelSpirometry.resultado}
                                            options={lsResultado}
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors.resultado}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sx={{ mt: 2 }}>
                                        <InputText
                                            fullWidth
                                            defaultValue={modelSpirometry.observacion}
                                            name="observacion"
                                            label="Observaciones"
                                            size={matchesXS ? 'small' : 'medium'}
                                            multiline
                                            rows={6}
                                            bug={errors.observacion}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sx={{ mt: 4 }}>
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
                                                    <Button variant="outlined" fullWidth onClick={() => navigate("/paraclinics/spirometry/list")}>
                                                        {TitleButton.Cancelar}
                                                    </Button>
                                                </AnimateButton>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </SubCard>
                        </Grid>
                    </Grid>
                </FormProvider> : <Cargando />
            }
        </ValidateActionSkeleton>
    );
};

export default UpdateSpirometry;