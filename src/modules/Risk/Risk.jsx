import {
    Box,
    Button,
    Grid,
    InputAdornment,
    TextField,
    useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import * as yup from 'yup';

import SearchIcon from '@mui/icons-material/Search';
import { GetAllBySubTipoCatalogo, GetByTipoCatalogoCombo } from 'api/clients/CatalogClient';
import { DeleteRisk, GetAllRisk, InsertRisk } from 'api/clients/RiskClient';
import { ParamDelete } from 'components/alert/AlertAll';
import { AccionMenu, CodCatalogo, Message, Modulo, TitleButton, ValidationMessage } from 'components/helpers/Enums';
import InputSelect from 'components/input/InputSelect';
import InputText from 'components/input/InputText';
import ValidateActionSkeleton from 'components/ValidateAction/ValidateActionSkeleton';
import toast from 'react-hot-toast';
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import DetailsRisk from './DetailsRisk';

const validationSchema = yup.object().shape({
    tipoRiesgo: yup.string().required(ValidationMessage.Requerido),
    grupo: yup.string().required(ValidationMessage.Requerido),
    clase: yup.string().required(ValidationMessage.Requerido),
});

const Risk = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [rows, setRows] = useState([]);
    const [lsData, setLsData] = useState([]);
    const [search, setSearch] = useState('');
    const [lsGrupoRiesgoFilter, setLsGrupoRiesgoFilter] = useState([]);
    const [lsTipoRiesgo, setLsTipoRiesgo] = useState([]);
    const [lsGrupoRiesgo, setLsGrupoRiesgo] = useState([]);

    const methods = useForm({ resolver: yupResolver(validationSchema) });
    const { handleSubmit, watch, formState: { errors }, reset } = methods;
    const values = watch();

    async function getAll() {
        try {
            const lsServer = await GetAllRisk(values.idGrupoRiesgoFiltro || 0);
            if (lsServer.status === 200) {
                setLsData(lsServer.data);
                setRows(lsServer.data);
            }
        } catch (error) { }
    }

    useEffect(() => {
        getAll();
    }, [values.idGrupoRiesgoFiltro]);

    useEffect(() => {
        if (values.tipoRiesgo) {
            const valueTipoRiesgo = lsTipoRiesgo.find((item) => item.value === values.tipoRiesgo);

            async function getTipoRiesgo() {
                var lsGrupos = await GetAllBySubTipoCatalogo(0, 0, valueTipoRiesgo.codigo, 6);
                if (lsGrupos.status === 200) {
                    const sortedDataGrupoRiesgo = lsGrupos.data.entities.sort((a, b) => a.idCatalogo - b.idCatalogo);
                    setLsGrupoRiesgo(sortedDataGrupoRiesgo.map((item) => ({ value: item.idCatalogo, label: item.nombre })));
                }
            }

            getTipoRiesgo();
        }
    }, [values.tipoRiesgo]);

    useEffect(() => {
        async function getCombo() {
            try {
                const lsServerTipoRiesgo = await GetByTipoCatalogoCombo(CodCatalogo.TIPO_RIESGO);
                const sortedDataTipoRiesgo = lsServerTipoRiesgo.data.sort((a, b) => a.value - b.value);
                setLsTipoRiesgo(sortedDataTipoRiesgo);

                const lsServerGrupoRiesgo = await GetByTipoCatalogoCombo(CodCatalogo.GRUPO_RIESGO);
                const sortedDataGrupoRiesgo = lsServerGrupoRiesgo.data.sort((a, b) => a.value - b.value);
                setLsGrupoRiesgoFilter(sortedDataGrupoRiesgo);
            } catch (error) {

            }
        }

        getCombo();
    }, []);

    const handleClick = async (datos) => {
        try {
            const result = await InsertRisk(datos);
            if (result.data.exito) {
                toast.success(result.data.mensaje);
                /* setLsGrupoRiesgo([]);
                reset(); */
                getAll();
            } else {
                toast.error(result.data.mensaje);
            }
        } catch (error) {
            toast.error(Message.RegistroNoGuardado);
        }
    };

    const handleClickRemoveList = async (idRiesgo) => {
        try {
            swal(ParamDelete).then(async (willDelete) => {
                if (willDelete) {
                    const result = await DeleteRisk(idRiesgo);
                    if (result.status === 200) {
                        toast.success(Message.Eliminar);
                        setSearch('');
                        getAll();
                    }
                }
            });
        } catch (error) {
            toast.error(error.message || "Error al eliminar el procedimiento o tratamiento de la lista");
        }
    }

    const handleSearch = (event) => {
        const newString = event?.target.value.trim();
        setSearch(newString || '');

        const lowerCaseQuery = newString.toLowerCase();

        const newRows = newString
            ? rows.filter((row) =>
                ['nameGrupo', 'clase'].some((property) =>
                    row[property]?.toString().toLowerCase().includes(lowerCaseQuery)
                )
            ) : rows;

        setLsData(newRows);
    };

    return (
        <ValidateActionSkeleton idAccion={AccionMenu.agregar} idModulo={Modulo.Productos}>
            <MainCard title="Registrar riesgo">
                <FormProvider {...methods}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6} lg={5}>
                            <InputSelect
                                name="tipoRiesgo"
                                label="Tipo de riesgo"
                                defaultValue=""
                                options={lsTipoRiesgo}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors.tipoRiesgo}
                            />
                        </Grid>

                        <Grid item xs={12} md={6} lg={5}>
                            <InputSelect
                                name="grupo"
                                label="Grupo o dominio"
                                defaultValue=""
                                options={lsGrupoRiesgo}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors.grupo}
                            />
                        </Grid>

                        <Grid item xs={6} md={4} lg={2}>
                            <AnimateButton>
                                <Button variant="outlined" size="large" fullWidth onClick={handleSubmit(handleClick)}>
                                    Agregar
                                </Button>
                            </AnimateButton>
                        </Grid>

                        <Grid item xs={12}>
                            <InputText
                                defaultValue=""
                                name="clase"
                                label="Clase de riesgo"
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors.clase}
                            />
                        </Grid>

                        <Grid item xs={12} sx={{ mt: 2 }}>
                            <SubCard
                                darkTitle
                                container
                                title="Clases de riesgo"
                                secondary={
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            maxWidth: '330px',
                                            minWidth: '330px',
                                            flexShrink: 0,
                                        }}
                                    >
                                        <InputSelect
                                            name="idGrupoRiesgoFiltro"
                                            label="Filtrar por riesgo"
                                            defaultValue="0"
                                            options={[{ value: 0, label: 'TODOS LOS RIESGOS' }, ...(lsGrupoRiesgoFilter || [])]}
                                            size="small"
                                            bug={errors.idGrupoRiesgoFiltro}
                                            maxWidth="330px"
                                        />
                                    </Box>
                                }
                            >
                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                        <TextField
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <SearchIcon fontSize="small" />
                                                    </InputAdornment>
                                                )
                                            }}
                                            onChange={handleSearch}
                                            placeholder="Buscar"
                                            value={search}
                                            size="small"
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <DetailsRisk lsData={lsData} onDelete={handleClickRemoveList} />
                                    </Grid>
                                </Grid>
                            </SubCard>
                        </Grid>

                        <Grid item xs={6} md={4} lg={2} sx={{ mt: 2 }}>
                            <AnimateButton>
                                <Button variant="outlined" fullWidth onClick={() => navigate("/risk/list")}>
                                    {TitleButton.Cancelar}
                                </Button>
                            </AnimateButton>
                        </Grid>
                    </Grid>
                </FormProvider>
            </MainCard>
        </ValidateActionSkeleton>
    );
};

export default Risk;