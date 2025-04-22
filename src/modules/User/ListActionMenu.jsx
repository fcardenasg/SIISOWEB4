import { useCallback, useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import {
    Box,
    Button,
    Grid,
    IconButton,
    InputAdornment,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Tooltip,
    Typography,
    useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { GetPermiso, GetPermisosUser, InsertPermisoIndividual, InsertPermisosUser, UpdatePermiso } from 'api/clients/UserClient';
import ControlModal from 'components/controllers/ControlModal';
import { AccionMenu, Message, TitleButton, ValidationMessage } from 'components/helpers/Enums';
import Iconify from 'components/iconify/iconify';
import InputSelect from 'components/input/InputSelect';
import { useBoolean } from 'hooks/use-boolean';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import SubCard from 'ui-component/cards/SubCard';
import * as yup from 'yup';
import InputCheckBox from 'components/input/InputCheckBox';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { MessageError } from 'components/alert/AlertAll';

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

const getComparator = (order, orderBy) =>
    order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const validationSchema = yup.object().shape({
    idModulo: yup.string().required(ValidationMessage.Requerido)
});

const ListActionMenu = () => {
    const { id } = useParams();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const openModal = useBoolean();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(4);
    const [lsPermisos, setLsPermisos] = useState([]);
    const [lsComboPermisos, setLsComboPermisos] = useState([]);
    const [rows, setRows] = useState([]);

    const [search, setSearch] = useState("");
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const methods = useForm({
        resolver: yupResolver(validationSchema),
    });

    const { handleSubmit, reset, formState: { errors } } = methods;

    useEffect(() => {
        async function getAll() {
            const lsServerPermisos = await GetPermiso();
            setLsComboPermisos(lsServerPermisos.data);
        }

        getAll();
    }, []);

    const handleChangeRowsPerPage = (event) => {
        if (event?.target.value) setRowsPerPage(parseInt(event?.target.value, 10));
        setPage(0);
    };

    async function getAllModulo() {
        try {
            const lsPermi = await GetPermisosUser(id);
            if (lsPermi.status == 200) {
                setRows(lsPermi.data);
                setLsPermisos(lsPermi.data);
            }
        } catch (error) { }
    }

    useEffect(() => {
        getAllModulo();
    }, []);

    async function getDataModule() {
        try {
            const lsData = await InsertPermisosUser(id);
            if (lsData.status == 200)
                getAllModulo();
        } catch (error) {
        }
    }

    const handleUpdateState = useCallback(async (event, idActionMenu, action) => {
        try {
            const FormatData = {
                id: idActionMenu,
                estado: event.target.checked,
                accion: action
            };

            const result = await UpdatePermiso(FormatData);
            if (result.data) {
                getAllModulo();
            }
        } catch (error) {
        }
    }, []);

    const handleClick = async (datos) => {
        try {
            datos.idUsuario = parseInt(id);
            datos.idModulo = parseInt(datos.idModulo);

            const result = await InsertPermisoIndividual(datos);
            if (result.data.exito) {
                reset();
                getAllModulo();
            } else {
                setOpenError(true);
                setErrorMessage(result.data.mensaje);
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(Message.RegistroNoGuardado);
        }
    };

    const handleSearch = (event) => {
        const newString = event?.target.value;
        setSearch(newString || '');

        if (newString) {
            const newRows = rows.filter((row) => {
                let matches = true;

                const properties = ['modulo'];
                let containsQuery = false;

                properties.forEach((property) => {
                    if (row[property].toString().toLowerCase().includes(newString.toString().toLowerCase())) {
                        containsQuery = true;
                    }
                });

                if (!containsQuery) {
                    matches = false;
                }
                return matches;
            });
            setLsPermisos(newRows);
        } else {
            setLsPermisos(rows);
        }
    };

    return (
        <SubCard
            title={<Typography variant='h4'>Acciones permitidas para el usuario</Typography>}
            secondary={
                <>
                    {lsPermisos.length === 0 ?
                        <Tooltip title="Cargar modulos" onClick={getDataModule}>
                            <IconButton color="error" size="small">
                                <Iconify icon="ci:list-add" width={26} />
                            </IconButton>
                        </Tooltip> :
                        <Tooltip title="Agregar modulos" onClick={openModal.onTrue}>
                            <IconButton color="error" size="small">
                                <Iconify icon="gridicons:add" width={30} />
                            </IconButton>
                        </Tooltip>
                    }
                </>
            }
        >
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            <ControlModal
                title="Agregar módulo"
                open={openModal.value}
                onClose={() => { openModal.onFalse(); reset(); }}
                maxWidth="md"
            >
                <FormProvider {...methods}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <InputSelect
                                name="idModulo"
                                label="Módulo"
                                defaultValue=""
                                options={lsComboPermisos}
                                size={matchesXS ? 'small' : 'medium'}
                                bug={errors.idModulo}
                            />
                        </Grid>

                        <Grid item xs={12} sx={{ mb: 2 }}>
                            <SubCard title="Registrar acciones">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6} lg={4}>
                                        <InputCheckBox
                                            name="puedeAgregar"
                                            defaultValue={false}
                                            label="¿Puede agregar?"
                                            size={30}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4}>
                                        <InputCheckBox
                                            name="puedeActualizar"
                                            defaultValue={false}
                                            label="¿Puede actualizar?"
                                            size={30}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4}>
                                        <InputCheckBox
                                            name="puedeEliminar"
                                            defaultValue={false}
                                            label="¿Puede eliminar?"
                                            size={30}
                                        />
                                    </Grid>
                                </Grid>
                            </SubCard>
                        </Grid>

                        <Grid item xs={6} md={4} lg={2}>
                            <AnimateButton>
                                <Button variant="contained" fullWidth onClick={handleSubmit(handleClick)}>
                                    {TitleButton.Guardar}
                                </Button>
                            </AnimateButton>
                        </Grid>

                        <Grid item xs={6} md={4} lg={2}>
                            <AnimateButton>
                                <Button variant="outlined" fullWidth onClick={() => { openModal.onFalse(); reset(); }}>
                                    {TitleButton.Cancelar}
                                </Button>
                            </AnimateButton>
                        </Grid>
                    </Grid>
                </FormProvider>
            </ControlModal>

            <Grid container spacing={2}>
                <Grid item xs={5}>
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
                    <TableContainer>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Módulo</TableCell>
                                    <TableCell>Agregar</TableCell>
                                    <TableCell>Actualizar</TableCell>
                                    <TableCell>Eliminar</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {stableSort(lsPermisos, getComparator('asc', 'fechaVencimiento'))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                        <TableRow hover sx={{ '& > *': { borderBottom: 'unset' } }}>
                                            <TableCell>{row.modulo}</TableCell>
                                            <TableCell>
                                                <Switch
                                                    checked={row.puedeAgregar}
                                                    onChange={(event) => handleUpdateState(event, row.id, AccionMenu.agregar)}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Switch
                                                    checked={row.puedeActualizar}
                                                    onChange={(event) => handleUpdateState(event, row.id, AccionMenu.actualizar)}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Switch
                                                    checked={row.puedeEliminar}
                                                    onChange={(event) => handleUpdateState(event, row.id, AccionMenu.eliminar)}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>

                <Grid item xs={12}>
                    <TablePagination
                        rowsPerPageOptions={[4, 12, 24]}
                        component="div"
                        count={lsPermisos.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={(event, newPage) => setPage(newPage)}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Grid>
            </Grid>
        </SubCard>
    )
}

export default ListActionMenu;