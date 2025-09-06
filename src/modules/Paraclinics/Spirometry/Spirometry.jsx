import { Button, Grid, IconButton, Tooltip, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import { GetByTipoCatalogoCombo } from 'api/clients/CatalogClient';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import { InsertSpirometry } from 'api/clients/ParaclinicsClient';
import { GetSupplierByTipo } from 'api/clients/SupplierClient';
import { AccionMenu, CodCatalogo, IdTipoProveedor, Message, Modulo, TitleButton } from 'components/helpers/Enums';
import InputDatePicker from 'components/input/InputDatePicker';
import InputSelect from 'components/input/InputSelect';
import InputText from 'components/input/InputText';
import UploadPdfFile from 'components/input/UploadPdfFile';
import ValidateActionSkeleton from 'components/ValidateAction/ValidateActionSkeleton';
import ViewEmployee from 'components/views/ViewEmployee';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import * as yup from 'yup';
import TableResult from './TableResult';

const validationSchema = yup.object().shape({
    documento: yup.string().required("Por favor debe registrar el documento del paciente"),
    idMotivo: yup.string().required("Por favor debe registrar el motivo"),
    idProveedor: yup.string().required("Por favor debe registrar el proveedor"),
    idTipoEPP: yup.string().required("Por favor debe registrar el tipo de EPP"),
    resultado: yup.string().required("Por favor debe registrar el resultado"),
});

const Spirometry = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [lsEmployee, setLsEmployee] = useState([]);
    const [lsMotivo, setLsMotivo] = useState([]);
    const [lsProveedor, setLsProveedor] = useState([]);
    const [lsTipoEPP, setLsTipoEPP] = useState([]);
    const [lsResultado, setLsResultado] = useState([]);

    const methods = useForm({ resolver: yupResolver(validationSchema) });
    const { handleSubmit, formState: { errors }, setValue, reset, watch } = methods;
    const values = watch();

    const [lsParametro, setLsParametro] = useState([]);

    const fetchData = async () => {
        try {
            const lsServerParametro = await GetByTipoCatalogoCombo(CodCatalogo.PARAMETRO_ESPIRO);
            const sortedParametros = lsServerParametro.data.sort((a, b) => a.value - b.value);
            setLsParametro(sortedParametros);

            sortedParametros.forEach((param, index) => {
                setValue(`detalle[${index}].idParametro`, param.value);
            });
        } catch (error) {

        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDocumento = async (event) => {
        try {
            setValue('documento', event?.target.value, { shouldValidate: true });

            if (event?.target.value !== '') {
                if (event.key === 'Enter') {
                    var lsServerEmployee = await GetByIdEmployee(event?.target.value);

                    if (lsServerEmployee?.data.status === 200) {
                        setLsEmployee(lsServerEmployee.data.data);
                    } else {
                        setLsEmployee(lsServerEmployee?.data.data);
                        toast.error(lsServerEmployee?.data.message);
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

    useEffect(() => {
        async function getAll() {
            try {
                const lsServerMotivo = await GetByTipoCatalogoCombo(CodCatalogo.Atencion_PARACLINICO);
                setLsMotivo(lsServerMotivo.data);

                const lsServerTipoEPP = await GetByTipoCatalogoCombo(CodCatalogo.PARACLINICO_TIPOEPP);
                setLsTipoEPP(lsServerTipoEPP.data);

                const lsServerResultado = await GetByTipoCatalogoCombo(CodCatalogo.PARACLINICO_RESULTADO);
                setLsResultado(lsServerResultado.data);

                const lsServerProveedor = await GetSupplierByTipo(IdTipoProveedor.Espirometria);
                setLsProveedor(lsServerProveedor.data);
            } catch (error) { }
        }

        getAll();
    }, []);

    const handleClick = async (datos) => {
        try {
            const result = await InsertSpirometry(datos);
            if (result.data.exito) {
                toast.success(result.data.mensaje);

                setLsEmployee([]);
                setValue('documento', "");
                fetchData();
                reset();
            } else
                toast.error(result.data.mensaje);
        } catch (error) {
            toast.error(Message.RegistroNoGuardado);
        }
    };

    return (
        <ValidateActionSkeleton idAccion={AccionMenu.agregar} idModulo={Modulo.Espirometria}>
            <FormProvider {...methods}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <ViewEmployee
                            title="Registrar espirometría"
                            key={lsEmployee?.documento}
                            documento={values.documento}
                            onChange={(e) => setValue('documento', e.target.value)}
                            lsEmployee={lsEmployee}
                            handleDocumento={handleDocumento}
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
                                        defaultValue={new Date()}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} lg={3}>
                                    <InputSelect
                                        defaultValue=""
                                        name="idMotivo"
                                        label="Motivo"
                                        options={lsMotivo}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.idMotivo}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} lg={3}>
                                    <InputSelect
                                        defaultValue=""
                                        name="idProveedor"
                                        label="Proveedor"
                                        options={lsProveedor}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.idProveedor}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} lg={3}>
                                    <InputSelect
                                        defaultValue=""
                                        name="idTipoEPP"
                                        label="Tipo EPP"
                                        options={lsTipoEPP}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.idTipoEPP}
                                    />
                                </Grid>

                                <Grid item xs={12} sx={{ mt: 2 }}>
                                    <SubCard title="Resultados de la prueba" secondary={
                                        <>
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
                                        </>
                                    }>

                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={6} textAlign="left">
                                                <TableResult methods={methods} lsParametro={lsParametro} />
                                            </Grid>

                                            <Grid item xs={12} md={6}>
                                                <UploadPdfFile name="urlFile" defaultValue={null} />
                                            </Grid>
                                        </Grid>
                                    </SubCard>
                                </Grid>

                                <Grid item xs={12} md={6} lg={4}>
                                    <InputSelect
                                        name="resultado"
                                        label="Resultado"
                                        defaultValue=""
                                        options={lsResultado}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.resultado}
                                    />
                                </Grid>

                                <Grid item xs={12} sx={{ mt: 2 }}>
                                    <InputText
                                        fullWidth
                                        defaultValue=""
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
            </FormProvider>
        </ValidateActionSkeleton>
    );
};

export default Spirometry;