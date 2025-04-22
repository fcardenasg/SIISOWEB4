import { useEffect, useState } from 'react';

import {
    Button,
    Grid,
    useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { FormatDate } from 'components/helpers/Format';
import useAuth from 'hooks/useAuth';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import { InsertCharges } from 'api/clients/ChargesClient';
import { AccionMenu, CodCatalogo, Message, Modulo, TitleButton } from 'components/helpers/Enums';
import InputSelect from 'components/input/InputSelect';
import InputText from 'components/input/InputText';
import { PostCargo } from 'formatdata/CargoForm';
import { SNACKBAR_OPEN } from 'store/actions';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import ValidateActionSkeleton from 'components/ValidateAction/ValidateActionSkeleton';

const Charges = () => {
    const { user } = useAuth();
    const dispatch = useDispatch();
    const theme = useTheme();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [lsSede, setLsSede] = useState([]);
    const [lsGes, setLsGes] = useState([]);
    const [lsCargo, setLsCargo] = useState([]);

    const [lsArea, setLsArea] = useState([]);
    const [lsSubarea, setLsSubarea] = useState([]);

    const methods = useForm();
    // resolver: yupResolver(validationSchema),
    const { handleSubmit, errors, reset } = methods;

    async function GetAll() {
        try {
            const lsServerArea = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Area);
            var resultArea = lsServerArea.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsArea(resultArea);

            const lsServerSede = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Sede);
            var resultSede = lsServerSede.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsSede(resultSede);

            const lsServerSubArea = await GetAllByTipoCatalogo(0, 0, CodCatalogo.SubArea);
            var resultSubArea = lsServerSubArea.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsSubarea(resultSubArea);

            const lsServerGes = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Ges);
            var resultGes = lsServerGes.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsGes(resultGes);

            const lsServerCargo = await GetAllByTipoCatalogo(0, 0, CodCatalogo.RosterPosition);
            var resultCargo = lsServerCargo.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsCargo(resultCargo);
        } catch (error) {
        }
    }

    useEffect(() => {
        GetAll();
    }, []);

    const handleClick = async (datos) => {
        try {
            const DataToInsert = PostCargo(datos.sede, datos.rosterPosition, datos.area, datos.subArea,
                datos.descripcionCargo, datos.idGES, user?.nameuser, FormatDate(new Date()), '', FormatDate(new Date()));

            if (Object.keys(datos.length !== 0)) {
                const result = await InsertCharges(DataToInsert);
                if (result.status === 200) {
                    dispatch({
                        type: SNACKBAR_OPEN,
                        open: true,
                        message: `${Message.Guardar}`,
                        variant: 'alert',
                        alertSeverity: 'success',
                        close: false,
                        transition: 'SlideUp'
                    })
                    reset();
                }
            }
        } catch (error) {
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Error al consumir el servicio de POST ',
                variant: 'alert',
                alertSeverity: 'error',
                close: false,
                transition: 'SlideUp'
            })
        }
    };

    return (
        <ValidateActionSkeleton idAccion={AccionMenu.agregar} idModulo={Modulo.Panoramadecargo}>
            <MainCard title="Registrar Cargos">
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} lg={4}>
                        <FormProvider {...methods}>
                            <InputSelect
                                name="sede"
                                label="Sede"
                                defaultValue=""
                                options={lsSede}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        <FormProvider {...methods}>
                            <InputSelect
                                name="rosterPosition"
                                label="Cargo"
                                defaultValue=""
                                options={lsCargo}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <FormProvider {...methods}>
                            <InputSelect
                                name="area"
                                label="Área"
                                defaultValue=""
                                options={lsArea}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        <FormProvider {...methods}>
                            <InputSelect
                                name="subArea"
                                label="Subarea"
                                defaultValue=""
                                options={lsSubarea}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        <FormProvider {...methods}>
                            <InputSelect
                                name="idGES"
                                label="GES"
                                defaultValue=""
                                options={lsGes}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue=""
                                name="descripcionCargo"
                                label="Descripción"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>
                </Grid>

                <Grid sx={{ pb: 2, pt: 3 }} item xs={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <AnimateButton>
                                <Button variant="contained" onClick={handleSubmit(handleClick)} fullWidth>
                                    {TitleButton.Guardar}
                                </Button>
                            </AnimateButton>
                        </Grid>
                        <Grid item xs={6}>
                            <AnimateButton>
                                <Button variant="outlined" fullWidth onClick={() => navigate("/charges/list")}>
                                    {TitleButton.Cancelar}
                                </Button>
                            </AnimateButton>
                        </Grid>
                    </Grid>
                </Grid>
            </MainCard>
        </ValidateActionSkeleton>
    );
};

export default Charges;