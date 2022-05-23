import { useState, useEffect } from 'react';

// Import de Material-ui
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    useMediaQuery
} from '@mui/material';

// Terceros
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as yup from "yup";
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// Import del Proyecto
import { GetAllBySubTipoCatalogo, GetAllCatalog, GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import { CodCatalogo } from 'components/helpers/Enums';
import SelectOnChange from 'components/input/SelectOnChange';
import InputSelect from 'components/input/InputSelect';
import { SNACKBAR_OPEN } from 'store/actions';
import { InsertCharges } from 'api/clients/ChargesClient';
import InputText from 'components/input/InputText';
import { Message, TitleButton, ValidationMessage } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { GetAllBySegAgrupado, GetAllBySegAfectado, GetAllSegmentoAgrupado } from 'api/clients/OthersClients';


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
const validationSchema = yup.object().shape({
    id: yup.string().required(`${ValidationMessage.Requerido}`),
    dx: yup.string().required(`${ValidationMessage.Requerido}`),
    idSubsegmento: yup.string().required(`${ValidationMessage.Requerido}`),
}).required();

const Charges = () => {
    /* ESTILO, HOOKS Y OTROS TEMAS */
    const dispatch = useDispatch();
    const theme = useTheme();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const [catalog, setCatalogo] = useState([]);

    const [lsSede, setLsSede] = useState([]);
    const [lsVersion, setLsVersion] = useState([]);
    const [lsGes, setLsGes] = useState([]);
    const [lsCargo, setLsCargo] = useState([]);
    const [lsCodigoFilterArea, setLsCodigoFilterArea] = useState([]);

    const [lsArea, setLsArea] = useState([]);
    const [area, setArea] = useState('');
    const [lsSubarea, setLsSubarea] = useState([]);

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

    const methods = useForm({
        resolver: yupResolver(validationSchema),
    });

    const { handleSubmit, errors, reset } = methods;

    //Filtro entre  combo con codigo
    const handleChangeArea = async (event) => {
        try {
            setArea(event.target.value);

            var lsResulCode = String(lsCodigoFilterArea.filter(code => code.idCatalogo == event.target.value).map(code => code.codigo));
            var resultArea = await GetSubString(lsResulCode);
            setLsSubarea(resultArea);
        } catch (error) {
            console.log(error);
        }
    };

    async function GetAll() {
        try {
            const lsCatalogo = await GetAllCatalog(0, 0);
            setLsCodigoFilterArea(lsCatalogo.data.entities);

            const lsServerArea = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Area);
            var resultArea = lsServerArea.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsArea(resultArea);
            setLsCodigoFilterArea(lsServerArea.data.entities);

            setLsSede(await MaperCatalogo(CodCatalogo.Sede));
            setLsVersion(await MaperCatalogo(CodCatalogo.Version));
            setLsGes(await MaperCatalogo(CodCatalogo.Ges));
            setLsCargo(await MaperCatalogo(CodCatalogo.RosterPosition));

        } catch (error) {
            console.log(error);
        }
    }

    /* EL useEffect QUE LLENA LA LISTA */
    useEffect(() => {
        GetAll();
    }, [])

    /* METODO DE INSERT  */
    const onSubmit = async (datos) => {

    };

    return (
        <MainCard title="Registrar Cargos">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>


                        <FormProvider {...methods}>
                            <InputSelect
                                name="IdSedeCargo"
                                label="Sede"
                                defaultValue=""
                                options={lsSede}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>


                    </Grid>

                    <Grid item xs={4}>
                        <FormProvider {...methods}>
                            <InputSelect
                                name="IdRosterCargo"
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
                            name="IdAreaCargo"
                            label="Área"
                            options={lsArea}
                            size={matchesXS ? 'small' : 'medium'}
                            value={area}
                            onChange={handleChangeArea}
                        />

                    </Grid>


                    <Grid item xs={4}>
                        <FormProvider {...methods}>
                            <InputSelect
                                name="IdSubareaCargo "
                                label="Subarea"
                                defaultValue=""
                                options={lsSubarea}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>

                    </Grid>

                    <Grid item xs={4}>
                        <FormProvider {...methods}>
                            <InputSelect
                                name="Idversion"
                                label="Versión"
                                defaultValue=""
                                options={lsVersion}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>

                    </Grid>

                    <Grid item xs={4}>
                        <FormProvider {...methods}>
                            <InputSelect
                                name="IdGES"
                                label="GES"
                                defaultValue=""
                                options={lsGes}
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
                                name="DescripcionCargo"
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
                                <Button variant="contained" fullWidth type="submit">
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
            </form>
        </MainCard>
    );
};

export default Charges;