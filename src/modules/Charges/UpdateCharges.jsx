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
import { UpdateChargess, GetByIdCharges } from 'api/clients/ChargesClient';
import InputText from 'components/input/InputText';
import { Message, TitleButton, ValidationMessage } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';

// Import del Proyecto
import { PutCargo } from 'formatdata/CargoForm';
import { GetAllBySubTipoCatalogo, GetAllCatalog, GetAllByTipoCatalogo } from 'api/clients/CatalogClient';
import { CodCatalogo } from 'components/helpers/Enums';
import { GetAllCharges } from 'api/clients/ChargesClient';

/* VALIDACIÓN CON YUP */
const validationSchema = yup.object().shape({
    id: yup.string().required(`${ValidationMessage.Requerido}`),
    dx: yup.string().required(`${ValidationMessage.Requerido}`),
    idSubsegmento: yup.string().required(`${ValidationMessage.Requerido}`),
});

const UpdateCharges = () => {
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
    const [charges, setCharges] = useState([]);

    const [lsSede, setLsSede] = useState([]);
    const [lsVersion, setLsVersion] = useState([]);
    const [lsGes, setLsGes] = useState([]);
    const [lsCargo, setLsCargo] = useState([]);
    const [lsCodigoFilterArea, setLsCodigoFilterArea] = useState([]);

    const [lsArea, setLsArea] = useState([]);
    const [area, setArea] = useState('');
    const [lsSubarea, setLsSubarea] = useState([]);
    const [subArea, setSubArea] = useState('');

    const methods = useForm();

    const { handleSubmit, errors } = methods;
    // resolver: yupResolver(validationSchema),


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
            const lsServerId = await GetByIdCharges(id);
            if (lsServerId.status === 200) {
                setCharges(lsServerId.data);
                setArea(lsServerId.data.area);
            }

            const lsServerCatalogo = await GetAllCatalog(0, 0);
            var resultArea = lsServerCatalogo.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsCatalogo(resultArea);
            setLsCodigoFilterArea(lsServerCatalogo.data.entities);

            const lsServerArea = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Area);
            var resultArea = lsServerArea.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsArea(resultArea);
            setLsCodigoFilterArea(lsServerArea.data.entities);

            const lsServerSede = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Sede);
            var resultArea = lsServerSede.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsSede(resultArea);

            const lsServerVersion = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Version);
            var resultArea = lsServerVersion.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsVersion(resultArea);

            const lsServerGes = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Ges);
            var resultArea = lsServerGes.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsGes(resultArea);

            const lsServerCargo = await GetAllByTipoCatalogo(0, 0, CodCatalogo.RosterPosition);
            var resultArea = lsServerCargo.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));
            setLsCargo(resultArea);

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
            const subArea_ = subArea == '' ? datos.subAreaDisa : subArea;

            const DataToUpdate = PutCargo(id, datos.sede, datos.rosterPosition, area,
                subArea_, datos.descripcionCargo, datos.idversion, datos.idGES);

            console.log('DataToUpdate = ', DataToUpdate)
            if (Object.keys(datos.length !== 0)) {
                const result = await UpdateChargess(DataToUpdate);
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
        <MainCard title="Actualizar Cargos">
            {charges.length != 0 ? (<>

                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <FormProvider {...methods}>
                            <InputSelect
                                name="sede"
                                label="Sede"
                                defaultValue={charges.sede}
                                options={lsSede}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={4}>
                        <FormProvider {...methods}>
                            <InputSelect
                                name="rosterPosition"
                                label="Cargo"
                                defaultValue={charges.rosterPosition}
                                options={lsCargo}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={4}>
                        <SelectOnChange
                            name="idAreaCargo"
                            label="Área"
                            options={lsArea}
                            size={matchesXS ? 'small' : 'medium'}
                            value={area}
                            onChange={handleChangeArea}
                        />
                    </Grid>

                    <Grid item xs={4}>
                        {lsSubarea.length != 0 ? (
                            <SelectOnChange
                                name="subAreaLLega"
                                label="Subarea"
                                options={lsSubarea}
                                size={matchesXS ? 'small' : 'medium'}
                                value={subArea}
                                onChange={(e) => setSubArea(e.target.value)}
                            />
                        ) : (
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="subAreaDisa"
                                    label="Subarea"
                                    defaultValue={charges.subArea}
                                    disabled
                                    options={lsCatago}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors}
                                />
                            </FormProvider>
                        )}
                    </Grid>

                    <Grid item xs={4}>
                        <FormProvider {...methods}>
                            <InputSelect
                                name="idversion"
                                label="Versión"
                                defaultValue={charges.idversion}
                                options={lsVersion}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={4}>

                        <FormProvider {...methods}>
                            <InputSelect
                                name="idGES"
                                label="GES"
                                defaultValue={charges.idGES}
                                options={lsGes}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors}
                            />
                        </FormProvider>
                    </Grid>

                    <Grid item xs={12}>
                        <FormProvider {...methods}>
                            <InputText
                                defaultValue={charges.descripcionCargo}
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
                                <Button variant="outlined" fullWidth onClick={() => navigate("/charges/list")}>
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

export default UpdateCharges;