import { Fragment, useEffect, useState } from 'react';

import {
    Button,
    Grid,
    IconButton,
    ListItemText,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Tooltip,
    Typography,
    useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { yupResolver } from '@hookform/resolvers/yup';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { GetByIdMedicinesDetalle, InsertMedicinesDetalle } from 'api/clients/MedicinesClient';
import { DeleteOrdersParaclinicos } from 'api/clients/OrdersClient';
import { GetAllSupplier } from 'api/clients/SupplierClient';
import { MessageError, MessageSuccess, ParamDelete } from 'components/alert/AlertAll';
import { DefaultValue, Message, ValidationMessage } from 'components/helpers/Enums';
import { FormatDate, ViewFormat } from 'components/helpers/Format';
import InputDatePicker from 'components/input/InputDatePicker';
import InputSelect from 'components/input/InputSelect';
import InputText from 'components/input/InputText';
import useAuth from 'hooks/useAuth';
import { FormProvider, useForm } from 'react-hook-form';
import swal from 'sweetalert';
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import Transitions from 'ui-component/extended/Transitions';
import * as yup from 'yup';
import Iconify from 'components/iconify/iconify';

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
    idProveedor: yup.string().required(`${ValidationMessage.Requerido}`),
    cantidad: yup.string().required(`${ValidationMessage.Requerido}`),
    fechaCompra: yup.string().required(`${ValidationMessage.Requerido}`),
    fechaVencimiento: yup.string().required(`${ValidationMessage.Requerido}`)
        .matches(/^\d{4}-\d{2}-\d{2}$/, 'Formato de fecha inválido (YYYY-MM-DD)')
        .test('is-not-past-date', 'La fecha de vencimiento no puede ser anterior o actual', (value) => {
            if (!value) return true;
            const inputDate = new Date(value);
            const currentDate = new Date();

            inputDate.setHours(0, 0, 0, 0);
            currentDate.setHours(0, 0, 0, 0);

            return inputDate >= currentDate;
        })
        .test('valid-year', 'Año de vencimiento inválido', (value) => {
            const year = new Date(value).getFullYear();
            return year <= new Date().getFullYear() + 20;
        }),
});

const ListDetails = ({ idMedicamento }) => {
    const { user } = useAuth();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [openTransition, setOpenTransition] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [openError, setOpenError] = useState(false);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(4);

    const [lsProveedor, setLsProveedor] = useState([]);
    const [lsDataMedical, setLsDataMedical] = useState([]);

    const methods = useForm({ resolver: yupResolver(validationSchema) });
    const { handleSubmit, setValue, formState: { errors }, reset } = methods;

    useEffect(() => {
        async function getAll() {
            try {
                cleanDate();

                const lsServerProveedor = await GetAllSupplier(0, 0);
                var resultProveedor = lsServerProveedor.data.entities.filter(fil => fil.tipoProv == DefaultValue.PROVEEDOR_MEDICAMENTO).map((item) => ({
                    value: item.codiProv,
                    label: item?.nombProv?.toUpperCase()
                }));
                setLsProveedor(resultProveedor);
            } catch (error) { }
        }

        getAll();
    }, []);

    async function getAllListParaclinicos() {
        try {
            const lsServer = await GetByIdMedicinesDetalle(idMedicamento);
            if (lsServer.data.exito) {
                console.log(lsServer.data.datos);
                setLsDataMedical(lsServer.data.datos);
            } else {
                setOpenError(true);
                setErrorMessage(lsServer.data.mensaje);
            }
        } catch (error) { }
    }

    useEffect(() => {
        getAllListParaclinicos();
    }, [idMedicamento]);

    const handleDelete = async (idOrdenenParaclinico) => {
        try {
            if (idOrdenenParaclinico !== null) {
                swal(ParamDelete).then(async (willDelete) => {
                    if (willDelete) {
                        const result = await DeleteOrdersParaclinicos(idOrdenenParaclinico);
                        if (result.status === 200) {
                            setOpenError(true);
                            setErrorMessage(Message.Eliminar);
                            getAllListParaclinicos();
                        }
                    }
                });
            }
        } catch (error) { }
    };

    function cleanDate() {
        setValue("fechaVencimiento", "");
        setValue("fechaCompra", "");
        setValue("fechaLote", "");
    }

    const handleClick = async (datos) => {
        try {
            console.log(datos.fechaLote);
            datos.idMedicamento = parseInt(idMedicamento);
            datos.fechaLote = FormatDate(datos.fechaLote);
            console.log(datos.fechaLote);
            datos.cantidad = parseInt(datos.cantidad);
            datos.lote = datos.lote || null;
            datos.usuarioRegistro = user?.nameuser;

            console.log(datos);

            const result = await InsertMedicinesDetalle(datos);
            if (result.data.exito) {
                getAllListParaclinicos();
                setOpenSuccess(true);
                setErrorMessage(result.data.mensaje);
                setOpenTransition(false);
                reset();
                cleanDate();
            } else {
                setOpenError(true);
                setErrorMessage(result.data.mensaje);
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(Message.RegistroNoGuardado);
        }
    };

    const handleChangeRowsPerPage = (event) => {
        if (event?.target.value) setRowsPerPage(parseInt(event?.target.value, 10));
        setPage(0);
    };

    return (
        <Fragment>
            <MessageSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            <SubCard title={<Typography variant='h4'>Entrada de medicamento</Typography>}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TableContainer>
                            <Table aria-label="collapsible table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell />
                                        <TableCell>Proveedor</TableCell>
                                        <TableCell>Fecha de compra</TableCell>
                                        <TableCell>Fecha de vencimiento</TableCell>
                                        <TableCell>Cantidad</TableCell>
                                        <TableCell>Bitácora</TableCell>
                                        <TableCell>Acción</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {stableSort(lsDataMedical, getComparator('asc', 'fechaVencimiento'))
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                            <TableRow hover sx={{ '& > *': { borderBottom: 'unset' } }}>
                                                <TableCell>
                                                    <Iconify width={20} icon="hugeicons:medicine-02" />
                                                </TableCell>

                                                <TableCell>{row?.nameProveedor}</TableCell>
                                                <TableCell>{ViewFormat(row?.fechaCompra)}</TableCell>
                                                <TableCell>{ViewFormat(row?.fechaVencimiento)}</TableCell>
                                                <TableCell>{row?.cantidad}</TableCell>
                                                <TableCell sx={{ whiteSpace: 'nowrap' }}>
                                                    <ListItemText
                                                        primary={row?.usuarioRegistro}
                                                        secondary={new Date(row?.fechaRegistro).toLocaleString()}
                                                        primaryTypographyProps={{ typography: 'body2' }}
                                                        secondaryTypographyProps={{
                                                            mt: 0.5,
                                                            component: 'span',
                                                            typography: 'caption',
                                                        }}
                                                    />
                                                </TableCell>

                                                <TableCell>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={6}>
                                                            <Tooltip title="Eliminar" onClick={() => handleDelete(row?.id)}>
                                                                <IconButton color="error" size="small">
                                                                    <HighlightOffIcon sx={{ fontSize: '2rem' }} />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </Grid>
                                                    </Grid>
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
                            count={lsDataMedical.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={(event, newPage) => setPage(newPage)}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Grid>
                </Grid>
            </SubCard>
        </Fragment>
    );
};

export default ListDetails;