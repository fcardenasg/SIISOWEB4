import { useState, useEffect, Fragment } from 'react';

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
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import Cargando from 'components/Cargando';
import { GetByIdPanorama } from 'api/clients/PanoramaClient';
import { PutPanorama } from 'formatdata/PanoramaForm';
import { GetAllBySubTipoCatalogo, GetAllCatalog, GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import { CodCatalogo } from 'components/helpers/Enums';
import SelectOnChange from 'components/input/SelectOnChange';
import InputSelect from 'components/input/InputSelect';
import { SNACKBAR_OPEN } from 'store/actions';
import { UpdatePanoramas } from 'api/clients/PanoramaClient';
import InputText from 'components/input/InputText';
import { Message, TitleButton } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';

const Panorama = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const theme = useTheme();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [lsPanorama, setLsPanorama] = useState([]);
    const [lsCatalogo, setLsCatalogo] = useState([]);
    const [lsRiesgo, setLsRiesgo] = useState([]);
    const [riesgo, setRiesgo] = useState('');
    const [clase, setClase] = useState('');
    const [lsClase, setLsClase] = useState([]);
    const [lsExposicion, setLsExposicion] = useState([]);
    const [lsGradoConSinEPP, setLsGradoConSinEPP] = useState([]);
    const [lsMedidascontrol, setLsMedidasControl] = useState([]);
    const [lsAnalisisMPI, setLsAnalisisMPI] = useState([]);
    const [lsAnalisisRuido, setLsAnalisisRuido] = useState([]);
    const [lsCodigoFilterArea, setLsCodigoFilterRiesgo] = useState([]);
    console.log("Dato = ", lsPanorama);

    async function GetSubString(codigo) {
        try {
            const lsServerCatalog = await GetAllBySubTipoCatalogo(0, 0, codigo, 4);
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

    const methods = useForm();
    // resolver: yupResolver(validationSchema),

    const { handleSubmit, errors, reset } = methods;

    const handlePanoramaRiesgo = async (event) => {
        try {
            setRiesgo(event.target.value);

            var lsResulCode = String(lsCodigoFilterArea.filter(code => code.idCatalogo == event.target.value).map(code => code.codigo));
            var lresultRiesgo = await GetSubString(lsResulCode);
            setLsClase(lresultRiesgo);
        } catch (error) {
            console.log(error);
        }
    };

    async function GetAll() {
        try {
            const lsServerPanorama = await GetByIdPanorama(id);
            if (lsServerPanorama.status === 200) {
                setLsPanorama(lsServerPanorama.data);
                setRiesgo(lsServerPanorama.data.riesgo);
            }

            const lsServerCatalogo = await GetAllCatalog(0, 0);
            var lsResultCatalogo = lsServerCatalogo.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsCatalogo(lsResultCatalogo);

            const lsServerRiesgo = await GetAllByTipoCatalogo(0, 0, CodCatalogo.PANO_RIESGO);
            var lsResultRiesgo = lsServerRiesgo.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsRiesgo(lsResultRiesgo);
            setLsCodigoFilterRiesgo(lsServerRiesgo.data.entities);

            const lsServerExposicion = await GetAllByTipoCatalogo(0, 0, CodCatalogo.PANO_EXPOSICIÓN);
            var lsResultExposicion = lsServerExposicion.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsExposicion(lsResultExposicion);

            const lsServerAnalisisMPI = await GetAllByTipoCatalogo(0, 0, CodCatalogo.PANO_ANALISISMPI);
            var lresultAnalisisMPI = lsServerAnalisisMPI.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsAnalisisMPI(lresultAnalisisMPI);

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

            const lsServerAnalisisRuido = await GetAllByTipoCatalogo(0, 0, CodCatalogo.PANO_ANALISISRUIDO);
            var lresultAnalisisRuido = lsServerAnalisisRuido.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsAnalisisRuido(lresultAnalisisRuido);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        GetAll();
    }, []);

    const handleClick = async (datos) => {
        try {
            const DataClase = clase == '' ? datos.clase : clase;

            const DataToInsert = PutPanorama(id, lsPanorama.idCargo, riesgo, DataClase,
                datos.exposicion, datos.gradoconEPP, datos.gradosinEPP,
                datos.medidascontrol, datos.analisisMPI, datos.analisisRuido, datos.descripcionCargo);

            console.log("datos = ", DataToInsert);

            if (Object.keys(datos.length !== 0)) {
                const result = await UpdatePanoramas(DataToInsert);
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
            {lsPanorama.length != 0 ?
                <Fragment>
                    <Grid container spacing={2}>
                        {lsPanorama.length != 0 ?
                            <Grid item xs={12}>
                                <Typography>
                                    ID: {lsPanorama.idCargo}
                                    Cargo: {lsPanorama.nameRoster}
                                </Typography> </Grid> : <></>}

                        <Grid item xs={6}>
                            <SelectOnChange
                                name="idRiesgo"
                                label="Riesgo"
                                options={lsRiesgo}
                                size={matchesXS ? 'small' : 'medium'}
                                value={riesgo}
                                onChange={handlePanoramaRiesgo}
                            />
                        </Grid>

                        {lsClase.length != 0 ?
                            <Grid item xs={6}>
                                <SelectOnChange
                                    name="clase"
                                    label="Clase"
                                    options={lsClase}
                                    size={matchesXS ? 'small' : 'medium'}
                                    value={clase}
                                    onChange={(e) => setClase(e.target.value)}
                                />
                            </Grid> :
                            <Grid item xs={6}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="clase"
                                        label="Clase"
                                        defaultValue={lsPanorama.clase}
                                        options={lsCatalogo}
                                        disabled
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>}

                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="exposicion"
                                    label="Exposición"
                                    defaultValue={lsPanorama.exposicion}
                                    options={lsExposicion}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="gradoconEPP"
                                    label="Grado con EPP"
                                    defaultValue={lsPanorama.gradoconEPP}
                                    options={lsGradoConSinEPP}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="gradosinEPP"
                                    label="Grado sin EPP"
                                    defaultValue={lsPanorama.gradosinEPP}
                                    options={lsGradoConSinEPP}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="medidascontrol"
                                    label="Medidas de control"
                                    defaultValue={lsPanorama.medidascontrol}
                                    options={lsMedidascontrol}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="analisisMPI"
                                    label="Análisis MPI"
                                    defaultValue={lsPanorama.analisisMPI}
                                    options={lsAnalisisMPI}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={4}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="analisisRuido"
                                    label="Análisis Ruido"
                                    defaultValue={lsPanorama.analisisRuido}
                                    options={lsAnalisisRuido}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputText
                                    defaultValue={lsPanorama.descripcionCargo}
                                    fullWidth
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
                                    <Button variant="outlined" fullWidth onClick={() => navigate("/panorama/list")}>
                                        {TitleButton.Cancelar}
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Fragment> : <Cargando />}
        </MainCard>
    );
};

export default Panorama;