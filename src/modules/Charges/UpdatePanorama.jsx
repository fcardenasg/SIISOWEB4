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
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// Import del Proyecto
import Cargando from 'components/Cargando';
import SelectOnChange from 'components/input/SelectOnChange';
import InputSelect from 'components/input/InputSelect';
import { SNACKBAR_OPEN } from 'store/actions';
import { UpdatePanoramas, GetByIdPanorama, GetAllPanorama } from 'api/clients/PanoramaClient';
import InputText from 'components/input/InputText';
import { Message, TitleButton, ValidationMessage } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';

// Import del Proyecto
import { PutPanorama } from 'formatdata/PanoramaForm';
import { GetAllBySubTipoCatalogo, GetAllCatalog, GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import { CodCatalogo } from 'components/helpers/Enums';


/* VALIDACIÓN CON YUP */
const validationSchema = yup.object().shape({
    id: yup.string().required(`${ValidationMessage.Requerido}`),
    dx: yup.string().required(`${ValidationMessage.Requerido}`),
    idSubsegmento: yup.string().required(`${ValidationMessage.Requerido}`),
});

const UpdatePanorama = () => {
    /* ESTILO, HOOKS Y OTROS TEMAS */
    const { id } = useParams();
    const dispatch = useDispatch();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();

    const [lsCatago, setLsCatalogo] = useState([]);

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
    const [panorama, setPanorama] = useState([]);
    const [lsCargo, setLsCargo] = useState([]);
    const [lsRiesgo, setLsRiesgo] = useState([]);
    const [riesgo, setRiesgo] = useState('');
    const [lsClase, setLsClase] = useState([]);
    const [clase, setClase] = useState('');

    const [lsExposicion, setLsExposicion] = useState([]);

    const [lsGradoconEPP, setLsGradoconEPP] = useState([]);
    const [lsGradosinEPP, setLsGradosinEPP] = useState([]);
    const [lsMedidascontrol, setLsMedidascontrol] = useState([]);
    const [lsAnalisisMPI, setLsAnalisisMPI] = useState([]);
    const [lsAnalisisRuido, setLsAnalisisRuido] = useState([]);

    const [lsCodigoFilterArea, setLsCodigoFilterArea] = useState([]);



    const methods = useForm();

    const { handleSubmit, errors } = methods;
    // resolver: yupResolver(validationSchema),


    //Filtro entre  combo con codigo
    const handleChangeArea = async (event) => {
        try {
            setRiesgo(event.target.value);

            var lsResulCode = String(lsCodigoFilterArea.filter(code => code.idCatalogo == event.target.value).map(code => code.codigo));
            var resultArea = await GetSubString(lsResulCode);
            setLsClase(resultArea);
        } catch (error) {
            console.log(error);
        }
    };

    async function GetAll() {
        try {
            const lsServerId = await GetByIdPanorama(id);
            if (lsServerId.status === 200) {
                setPanorama(lsServerId.data);
                setRiesgo(lsServerId.data.riesgo);
            }

            const lsServerCatalogo = await GetAllCatalog(0, 0);
            var resultArea = lsServerCatalogo.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsCatalogo(resultArea);
            setLsCodigoFilterArea(lsServerCatalogo.data.entities);

            const lsServerRiesgo = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Riesgo);
            var resultArea = lsServerRiesgo.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsRiesgo(resultArea);
            setLsCodigoFilterArea(lsServerRiesgo.data.entities);

            const lsServerExposicion = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Exposicion);
            var resultArea = lsServerExposicion.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsExposicion(resultArea);

            const lsServerGradoconEPP = await GetAllByTipoCatalogo(0, 0, CodCatalogo.GradoconEPP);
            var resultArea = lsServerGradoconEPP.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsGradoconEPP(resultArea);

            const lsServerGradosinEPP = await GetAllByTipoCatalogo(0, 0, CodCatalogo.GradosinEPP);
            var resultArea = lsServerGradosinEPP.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsGradosinEPP(resultArea);

            const lsServerMedidascontrol = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Medidascontrol);
            var resultArea = lsServerMedidascontrol.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsMedidascontrol(resultArea);


            const lsServerAnalisisMPI = await GetAllByTipoCatalogo(0, 0, CodCatalogo.AnalisisMPI);
            var resultArea = lsServerAnalisisMPI.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsAnalisisMPI(resultArea);

            const lsServerAnasisRuido = await GetAllByTipoCatalogo(0, 0, CodCatalogo.AnalisisRuido);
            var resultArea = lsServerAnasisRuido.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsAnalisisRuido(resultArea);



        } catch (error) {
            console.log(error);
        }
    }

    /* EL useEffect QUE LLENA LA LISTA */
    useEffect(() => {
        GetAll();
    }, [])


    /* METODO DE UPDATE  */
    const handleClick = async (datos) => {
        try {
            const clase_ = clase == '' ? datos.claseDisa : clase;

            const DataToUpdate = PutPanorama(id, datos.idCargo, riesgo, clase_, datos.exposicion, datos.gradoconEPP, datos.gradosinEPP,
                datos.medidascontrol, datos.analisisMPI, datos.analisisRuido, datos.descripcionCargo);

            console.log('DataToUpdate = ', DataToUpdate)
            if (Object.keys(datos.length !== 0)) {
                const result = await UpdatePanoramas(DataToUpdate);
                if (result.status === 200) {
                    dispatch({
                        type: SNACKBAR_OPEN,
                        open: true,
                        message: `${Message.Actualizar}`,
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
                message: `${error}`,
                variant: 'alert',
                alertSeverity: 'error',
                close: false,
                transition: 'SlideUp'
            })
        }
    };

    return (
        <MainCard title="Actualizar Panorama de riesgos">
            {panorama.length != 0 ? (<>

                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <FormProvider {...methods}>
                            <InputSelect
                                name="idCargo"
                                label="Cargo"
                                defaultValue=""
                                options={lsCargo}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>



                    <Grid item xs={4}>
                        <SelectOnChange
                            name="idRiesgo"
                            label="Riesgo"
                            options={lsRiesgo}
                            size={matchesXS ? 'small' : 'medium'}
                            value={riesgo}
                            onChange={handleChangeArea}
                        />
                    </Grid>

                    <Grid item xs={4}>
                        {lsClase.length != 0 ? (
                            <SelectOnChange
                                name="clase"
                                label="Clase"
                                options={lsClase}
                                size={matchesXS ? 'small' : 'medium'}
                                value={clase}
                                onChange={(e) => setClase(e.target.value)}
                            />
                        ) : (
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="claseDisa"
                                    label="Clase"
                                    defaultValue={panorama.clase}
                                    disabled
                                    options={lsClase}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        )}
                    </Grid>

                    <Grid item xs={4}>
                        <FormProvider {...methods}>
                            <InputSelect
                                name="exposicion"
                                label="Exposición"
                                defaultValue={panorama.exposicion}
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
                                defaultValue={panorama.gradoconEPP}
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
                                defaultValue={panorama.gradosinEPP}
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
                                defaultValue={panorama.medidascontrol}
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
                                defaultValue={panorama.analisisMPI}
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
                                defaultValue={panorama.analisisRuido}
                                options={lsAnalisisRuido}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>


                    <Grid item xs={12}>
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue={panorama.descripcionCargo}
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
                                <Button variant="contained" fullWidth onClick={handleSubmit(handleClick)}>
                                    {TitleButton.Actualizar}
                                </Button>
                            </AnimateButton>
                        </Grid>
                        <Grid item xs={6}>
                            <AnimateButton>
                                <Button variant="outlined" fullWidth onClick={() => navigate("/charges/listp")}>
                                    {TitleButton.Cancelar}
                                </Button>
                            </AnimateButton>
                        </Grid>
                    </Grid>
                </Grid>
            </>) : <Cargando />}
        </MainCard>
    );
};

export default UpdatePanorama;