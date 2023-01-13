import { useState, useEffect } from 'react';

import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    Typography,
    useMediaQuery
} from '@mui/material';

import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FormProvider, useForm } from 'react-hook-form';

import InputMultiSelects from 'components/input/InputMultiSelects';
import useAuth from 'hooks/useAuth';
import { FormatDate } from 'components/helpers/Format';
import { PostPanorama } from 'formatdata/PanoramaForm';
import { GetAllBySubTipoCatalogo,  GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import { CodCatalogo } from 'components/helpers/Enums';
import SelectOnChange from 'components/input/SelectOnChange';
import InputSelect from 'components/input/InputSelect';
import { SNACKBAR_OPEN } from 'store/actions';
import { InsertPanorama } from 'api/clients/PanoramaClient';
import InputText from 'components/input/InputText';
import { Message, TitleButton } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { GetByIdCharges } from 'api/clients/ChargesClient';

const Panorama = () => {
    const { user } = useAuth();
    const dispatch = useDispatch();
    const theme = useTheme();
    const navigate = useNavigate();
    const { id } = useParams();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [lsRiesgo, setLsRiesgo] = useState([]);
    const [riesgo, setRiesgo] = useState('');
    const [lsClase, setLsClase] = useState([]);
    const [lsExposicion, setLsExposicion] = useState([]);
    const [lsGradoConSinEPP, setLsGradoConSinEPP] = useState([]);
    const [lsMedidascontrol, setLsMedidasControl] = useState([]);
    const [medicaControl, setMedicaControl] = useState([]);

    const [lsCodigoFilterArea, setLsCodigoFilterRiesgo] = useState([]);

    async function GetSubString(codigo) {
        try {
            const lsServerCatalog = await GetAllBySubTipoCatalogo(0, 0, codigo, 5);
            if (lsServerCatalog.status === 200) {
                var result = lsServerCatalog.data.entities.map((item) => ({
                    value: item.idCatalogo,
                    label: item.nombre
                }));
                return result;
            } else {
                dispatch({
                    type: SNACKBAR_OPEN,
                    open: true,
                    message: 'Problemas al traer los datos de combo',
                    variant: 'alert',
                    alertSeverity: 'error',
                    close: false,
                    transition: 'SlideUp'
                })
            }
        } catch (error) {
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: `${error}`,
                variant: 'alert',
                alertSeverity: 'error',
                close: false,
                transition: 'SlideUp'
            })
        }
    }

    const [cargo, setCargo] = useState([]);

    const methods = useForm();

    const { handleSubmit, errors, reset } = methods;

    const handlePanoramaRiesgo = async (event) => {
        try {
            setRiesgo(event.target.value);

            var lsResulCode = String(lsCodigoFilterArea.filter(code => code.idCatalogo == event.target.value).map(code => code.codigo));
            var lresultRiesgo = await GetSubString(lsResulCode);
            setLsClase(lresultRiesgo);
        } catch (error) {
        }
    };

    async function GetAll() {
        try {
            const lsServerCargo = await GetByIdCharges(id);
            if (lsServerCargo.status === 200)
                setCargo(lsServerCargo.data);

            const lsServerRiesgo = await GetAllByTipoCatalogo(0, 0, CodCatalogo.PANO_RIESGO);
            var lresultRiesgo = lsServerRiesgo.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsRiesgo(lresultRiesgo);
            setLsCodigoFilterRiesgo(lsServerRiesgo.data.entities);

            const lsServerExposicion = await GetAllByTipoCatalogo(0, 0, CodCatalogo.PANO_EXPOSICIÓN);
            var lsResultExposicion = lsServerExposicion.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsExposicion(lsResultExposicion);

            const lsServerMedidasControl = await GetAllByTipoCatalogo(0, 0, CodCatalogo.PANO_MEDIDASCONTROL);
            var lsResultMedidasControl = lsServerMedidasControl.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsMedidasControl(lsResultMedidasControl);

            const lsServerGradoConSinEPP = await GetAllByTipoCatalogo(0, 0, CodCatalogo.PANO_GRADO_CONSINEPP);
            var lresultGradoConSinEPP = lsServerGradoConSinEPP.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsGradoConSinEPP(lresultGradoConSinEPP);
        } catch (error) {
        }
    }

    useEffect(() => {
        GetAll();
    }, []);

    const handleClick = async (datos) => {
        try {
            const DataToInsert = PostPanorama(cargo.rosterPosition, riesgo, datos.clase, datos.exposicion, datos.gradoconEPP, datos.gradosinEPP,
                JSON.stringify(medicaControl), datos.descripcionCargo, user.email,
                FormatDate(new Date()), '', FormatDate(new Date()));

            if (Object.keys(datos.length !== 0)) {
                const result = await InsertPanorama(DataToInsert);
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
                    setMedicaControl([]);
                    setRiesgo('');
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
        <MainCard title="Registrar Panoramas de Riesgos ">
            <Grid container spacing={2}>
                {cargo.length != 0 ?
                   <Grid item xs={12} md={6} lg={4}>
                        <Typography>
                            ID: {cargo.rosterPosition}
                            Cargo: {cargo.nameRosterPosition}
                        </Typography> </Grid> : <></>}

                        <Grid item xs={12} md={6} lg={4}>
                    <SelectOnChange
                        name="idRiesgo"
                        label="Riesgo"
                        options={lsRiesgo}
                        size={matchesXS ? 'small' : 'medium'}
                        value={riesgo}
                        onChange={handlePanoramaRiesgo}
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                    <FormProvider {...methods}>
                        <InputSelect
                            name="clase"
                            label="Clase"
                            defaultValue=""
                            options={lsClase}
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors}
                        />
                    </FormProvider>
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                    <FormProvider {...methods}>
                        <InputSelect
                            name="exposicion"
                            label="Exposición"
                            defaultValue=""
                            options={lsExposicion}
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors}
                        />
                    </FormProvider>
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                    <FormProvider {...methods}>
                        <InputSelect
                            name="gradoconEPP"
                            label="Grado con EPP"
                            defaultValue=""
                            options={lsGradoConSinEPP}
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors}
                        />
                    </FormProvider>
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                    <FormProvider {...methods}>
                        <InputSelect
                            name="gradosinEPP"
                            label="Grado sin EPP"
                            defaultValue=""
                            options={lsGradoConSinEPP}
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors}
                        />
                    </FormProvider>
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                    <InputMultiSelects
                        fullWidth
                        onChange={(event, value) => setMedicaControl(value)}
                        value={medicaControl}
                        label="Medidas de control"
                        options={lsMedidascontrol}
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                    <FormProvider {...methods}>
                        <InputText
                            defaultValue=""
                            multiline
                            rows={3}
                            name="descripcionCargo"
                            label="Descripción"
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors}
                        />
                    </FormProvider>
                </Grid>

                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <AnimateButton>
                                <Button variant="contained" onClick={handleSubmit(handleClick)} fullWidth>
                                    {TitleButton.Guardar}
                                </Button>
                            </AnimateButton>
                        </Grid>
                        <Grid item xs={4}>
                            <AnimateButton>
                                <Button variant="outlined" fullWidth onClick={() => navigate("/charges/list")}>
                                    {TitleButton.RegresarACargos}
                                </Button>
                            </AnimateButton>
                        </Grid>
                        <Grid item xs={4}>
                            <AnimateButton>
                                <Button variant="outlined" fullWidth onClick={() => navigate("/panorama/list")}>
                                    {TitleButton.Cancelar}
                                </Button>
                            </AnimateButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default Panorama;