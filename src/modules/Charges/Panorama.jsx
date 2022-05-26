import { useState, useEffect } from 'react';

// Import de Material-ui
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery
} from '@mui/material';

// Terceros
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as yup from "yup";
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// Import del Proyecto
import { PostPanorama } from 'formatdata/PanoramaForm';
import { GetAllBySubTipoCatalogo, GetAllCatalog, GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import { CodCatalogo } from 'components/helpers/Enums';
import SelectOnChange from 'components/input/SelectOnChange';
import InputSelect from 'components/input/InputSelect';
import { SNACKBAR_OPEN } from 'store/actions';
import { InsertPanorama } from 'api/clients/PanoramaClient';
import { GetAllPanorama } from 'api/clients/PanoramaClient';
import InputText from 'components/input/InputText';
import { Message, TitleButton, ValidationMessage } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { GetAllBySegAgrupado, GetAllBySegAfectado, GetAllSegmentoAgrupado } from 'api/clients/OthersClients';
import { GetByIdCharges } from 'api/clients/ChargesClient';


//filtrar combos
const MaperCatalogo = async (idTipoCatalogo) => {
    try {
        const lsServerCatalog = await GetAllByTipoCatalogo(0, 0, idTipoCatalogo);
        if (lsServerCatalog.status === 200) {
            var resultCatalogo = lsServerCatalog.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            return resultCatalogo;
        }
    } catch (error) {
        console.log(error);
    }
}



/* VALIDACIÓN CON YUP */
// const validationSchema = yup.object().shape({
// }).required();

const Panorama = () => {
    /* ESTILO, HOOKS Y OTROS TEMAS */
    const dispatch = useDispatch();
    const theme = useTheme();
    const navigate = useNavigate();
    const { id } = useParams();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const [catalog, setCatalogo] = useState([]);

    const [lsCargo, setLsCargo] = useState([]);
    const [lsRiesgo, setLsRiesgo] = useState([]);
    const [riesgo, setRiesgo] = useState('');
    const [lsClase, setLsClase] = useState([]);

    const [lsExposicion, setLsExposicion] = useState([]);

    const [lsGradoconEPP, setLsGradoconEPP] = useState([]);
    const [lsGradosinEPP, setLsGradosinEPP] = useState([]);
    const [lsMedidascontrol, setLsMedidascontrol] = useState([]);
    const [lsAnalisisMPI, setLsAnalisisMPI] = useState([]);
    const [lsAnalisisRuido, setLsAnalisisRuido] = useState([]);



    const [lsCodigoFilterArea, setLsCodigoFilterRiesgo] = useState([]);



    async function GetSubString(codigo) {
        try {
            const lsServerCatalog = await GetAllBySubTipoCatalogo(0, 0, codigo, 3);
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


    /* NUESTROS USESTATE */
    const [lsSegmentoAgrupado, setLsSegmentoAgrupado] = useState([]);
    const [segmentoAgrupado, setSegmentoAgrupado] = useState('');

    const [lsSegmentoAfectado, setLsSegmentoAfectado] = useState([]);
    const [segmentoAfectado, setSegmentoAfectado] = useState('');

    const [subsegmento, setSubsegmento] = useState([]);
    const [cargo, setCargo] = useState([]);

    const methods = useForm();
    // resolver: yupResolver(validationSchema),


    const { handleSubmit, errors, reset } = methods;

    //Filtro entre  combo con codigo
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
            const lsServerCargo = await GetByIdCharges(id);
            if (lsServerCargo.status === 200)
                setCargo(lsServerCargo.data);


            const lsCatalogo = await GetAllCatalog(0, 0);
            setLsCodigoFilterRiesgo(lsCatalogo.data.entities);

            const lsServerRiesgo = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Area);
            var lresultRiesgo = lsServerRiesgo.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsRiesgo(lresultRiesgo);
            setLsCodigoFilterRiesgo(lsServerRiesgo.data.entities);

            setLsExposicion(await MaperCatalogo(CodCatalogo.Exposicion));
            setLsGradoconEPP(await MaperCatalogo(CodCatalogo.GradoconEPP));
            setLsGradosinEPP(await MaperCatalogo(CodCatalogo.GradosinEPP));
            setLsMedidascontrol(await MaperCatalogo(CodCatalogo.Medidascontrol));
            setLsAnalisisMPI(await MaperCatalogo(CodCatalogo.AnalisisMPI));
            setLsAnalisisRuido(await MaperCatalogo(CodCatalogo.AnalisisRuido));


        } catch (error) {
            console.log(error);
        }
    }

    /* EL useEffect QUE LLENA LA LISTA */
    useEffect(() => {
        GetAll();

    }, [])



    /* METODO DE INSERT  */
    const handleClick = async (datos) => {
        try {
            const DataToInsert = PostPanorama(datos.idCargo, riesgo, datos.clase, datos.exposicion, datos.gradoconEPP, datos.gradosinEPP,
                datos.medidascontrol, datos.analisisMPI, datos.analisisRuido, datos.descripcionCargo);

            console.log('DataToInsert = ', DataToInsert)
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
        <MainCard title="Registrar Panoramas de riesgos ">
            <Grid container spacing={2}>

            {cargo.length != 0 ?
                    <Grid item xs={2}>
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue={`ID: ${cargo.idCargo}`}
                                disabled
                                fullWidth
                                name="idCargo"
                                label="Cargo"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid> : <></>}

               
               
                {cargo.length != 0 ?
                    <Grid item xs={10}>
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue={`ID: ${cargo.idCargo}  ` + `Nombre: ${cargo.nameRosterPosition}`}
                                disabled
                                fullWidth
                                name="idCargo"
                                label="Cargo"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid> : <></>}




                <Grid item xs={4}>
                    <SelectOnChange
                        name="idRiesgo"
                        label="Riesgo"
                        options={lsRiesgo}
                        size={matchesXS ? 'small' : 'medium'}
                        value={riesgo}
                        onChange={handlePanoramaRiesgo}
                    />

                </Grid>


                <Grid item xs={4}>
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


                <Grid item xs={4}>

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



                <Grid item xs={4}>
                    <FormProvider {...methods}>
                        <InputSelect
                            name="gradoconEPP"
                            label="Grado con EPP"
                            defaultValue=""
                            options={lsGradoconEPP}
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
                            defaultValue=""
                            options={lsGradosinEPP}
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
                            defaultValue=""
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
                            defaultValue=""
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
                            defaultValue=""
                            options={lsAnalisisRuido}
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors}
                        />
                    </FormProvider>

                </Grid>




                <Grid item xs={12}>
                    <FormProvider {...methods}>
                        <InputText
                            defaultValue=""
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
                            <Button variant="outlined" fullWidth onClick={() => navigate("/charges/list")}>
                                {TitleButton.Cancelar}
                            </Button>
                        </AnimateButton>
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default Panorama;