import {
    Button,
    Grid,
    useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';

import { GetByTipoCatalogoCombo } from 'api/clients/CatalogClient';
import { GetByIdMedicamentosProductos, InsertMedicamentosProductos, UpdateMedicamentosProductos } from 'api/clients/MedicamentosProductosClient';
import { MessageError, MessageSuccess, MessageUpdate } from 'components/alert/AlertAll';
import { AccionMenu, CodCatalogo, Message, Modulo, TitleButton, ValidationMessage } from 'components/helpers/Enums';
import InputCheckBox from 'components/input/InputCheckBox';
import InputSelect from 'components/input/InputSelect';
import InputText from 'components/input/InputText';
import useAuth from 'hooks/useAuth';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import Cargando from 'components/loading/Cargando';
import ValidateActionSkeleton from 'components/ValidateAction/ValidateActionSkeleton';

const validationSchema = yup.object().shape({
    nombre: yup.string().required(ValidationMessage.Requerido),
    idLaboratorio: yup.string().required(ValidationMessage.Requerido),
    formaFarmaceutica: yup.string().required(ValidationMessage.Requerido)
});

const UpdateWarehouse = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [lsUnidad, setLsUnidad] = useState([]);
    const [lsLaboratorio, setLsLaboratorio] = useState([]);
    const [dataMedicamento, setDataMedicamento] = useState(null);

    const methods = useForm({ resolver: yupResolver(validationSchema) });
    const { handleSubmit, formState: { errors }, reset } = methods;

    async function getAll() {
        try {
            const datamodel = await GetByIdMedicamentosProductos(id);
            if (datamodel.status == 200) {
                setDataMedicamento(datamodel.data);
            }

            const lsServerUni = await GetByTipoCatalogoCombo(CodCatalogo.UNIDAD);
            setLsUnidad(lsServerUni.data);

            const lsServerLab = await GetByTipoCatalogoCombo(CodCatalogo.LABORATORIO);
            setLsLaboratorio(lsServerLab.data);
        } catch (error) { }
    }

    useEffect(() => {
        getAll();
    }, [])

    const handleClick = async (datos) => {
        try {
            datos.id = id;
            datos.usuarioModifico = user?.nameuser;
            datos.concentracion = datos.concentracion || null;
            datos.presentacionComercial = datos.presentacionComercial || null;

            const result = await UpdateMedicamentosProductos(datos);
            if (result.data.exito) {
                setOpenSuccess(true);
            } else {
                setOpenError(true);
                setErrorMessage(result.data.mensaje);
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(Message.RegistroNoGuardado);
        }
    };

    return (
        <ValidateActionSkeleton idAccion={AccionMenu.actualizar} idModulo={Modulo.Productos}>
            <MainCard title="Actualizar producto de medicamento">
                <MessageUpdate open={openSuccess} onClose={() => setOpenSuccess(false)} />
                <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

                {dataMedicamento !== null ?
                    <>
                        <FormProvider {...methods}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6} lg={4}>
                                    <InputText
                                        defaultValue={dataMedicamento.nombre}
                                        name="nombre"
                                        label="Nombre"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.nombre}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} lg={4}>
                                    <InputSelect
                                        name="idLaboratorio"
                                        label="Laboratorio"
                                        defaultValue={dataMedicamento.idLaboratorio}
                                        options={lsLaboratorio}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.idLaboratorio}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} lg={4}>
                                    <InputSelect
                                        name="formaFarmaceutica"
                                        label="Forma farmacéutica"
                                        defaultValue={dataMedicamento.formaFarmaceutica}
                                        options={lsUnidad}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.formaFarmaceutica}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} lg={4}>
                                    <InputText
                                        defaultValue={dataMedicamento.codInvima}
                                        name="codInvima"
                                        label="Código invima"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.codInvima}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} lg={4}>
                                    <InputText
                                        defaultValue={dataMedicamento.concentracion}
                                        name="concentracion"
                                        label="Concentración"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.concentracion}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} lg={4}>
                                    <InputText
                                        defaultValue={dataMedicamento.presentacionComercial}
                                        name="presentacionComercial"
                                        label="Presentación comercial"
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.presentacionComercial}
                                    />
                                </Grid>

                                <Grid item alignItems="center" xs={12} md={6} lg={4}>
                                    <InputCheckBox
                                        label="Estado"
                                        name="estado"
                                        size={30}
                                        defaultValue={dataMedicamento.estado}
                                    />
                                </Grid>
                            </Grid>
                        </FormProvider>

                        <Grid item xs={12} sx={{ pt: 4 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={2}>
                                    <AnimateButton>
                                        <Button variant="contained" fullWidth onClick={handleSubmit(handleClick)}>
                                            {TitleButton.Actualizar}
                                        </Button>
                                    </AnimateButton>
                                </Grid>

                                <Grid item xs={2}>
                                    <AnimateButton>
                                        <Button variant="outlined" fullWidth onClick={() => navigate("/warehouse/list")}>
                                            {TitleButton.Cancelar}
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </> : <Cargando />
                }
            </MainCard>
        </ValidateActionSkeleton>
    );
};

export default UpdateWarehouse;