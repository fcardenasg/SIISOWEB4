import { Button, Checkbox, Grid, IconButton, ListItemText, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Tooltip, Typography } from '@mui/material';
import { Message, TitleButton, ValidationMessage } from 'components/helpers/Enums';
import { useCallback, useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { FormProvider, useForm } from 'react-hook-form';
import swal from 'sweetalert';
import AnimateButton from 'ui-component/extended/AnimateButton';
import * as yup from 'yup';
import SearchProduct from '../SearchProduct';

import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { DeleteMedicinesPedidoDetalle, GetAllMedicinesPedidoDetalle, InsertMedicinesPedidoDetalle, UpdateMedicinesPedidoDetalleCantidades } from 'api/clients/MedicamentosPedidoClient';
import { MessageDelete, MessageError, MessageSuccess, ParamDelete } from 'components/alert/AlertAll';
import { ViewFormat } from 'components/helpers/Format';
import InputCheckBox from 'components/input/InputCheckBox';
import InputDatePicker from 'components/input/InputDatePicker';
import InputText from 'components/input/InputText';
import useAuth from 'hooks/useAuth';
import SubCard from 'ui-component/cards/SubCard';
import { CheckBox } from '@mui/icons-material';
import { useBoolean } from 'hooks/use-boolean';
import { parse } from 'date-fns';

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
    order === 'desc' ? (a, b) => descendingComparator(a[0], b[0], orderBy) : (a, b) => -descendingComparator(a[0], b[0], orderBy);

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
    registroSanitario: yup.string().required(ValidationMessage.Requerido),
    cantidadPedida: yup
        .string()
        .required(ValidationMessage.Requerido)
        .test('is-greater-than-zero', 'La cantidad debe ser mayor a cero', (value) => {
            return parseInt(value, 10) > 0;
        }),
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

export default function AddMedicinesOrders({ idPedido }) {
    const theme = useTheme();
    const { user } = useAuth();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [dataProducto, setDataProducto] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [cantidadRecibida, setCantidadRecibida] = useState({});
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [llegoLaCantidadPedida, setLlegoLaCantidadPedida] = useState(false);
    const [dataModel, setDataModel] = useState([]);
    const [editingRowId, setEditingRowId] = useState(null);

    const methods = useForm({ resolver: yupResolver(validationSchema) });
    const { handleSubmit, setValue, formState: { errors }, reset } = methods;

    async function getAll() {
        try {
            cleanDate();

            const lsServer = await GetAllMedicinesPedidoDetalle(idPedido);
            console.log(lsServer);
            if (lsServer.status == 200)
                setDataModel(lsServer.data);
        } catch (error) { }
    }

    useEffect(() => {
        getAll();
    }, []);

    function cleanDate() {
        setValue("fechaVencimiento", "");
        setValue("fechaLote", "");
    }

    const handleDelete = async (idPedidoDetalle) => {
        try {
            swal(ParamDelete).then(async (willDelete) => {
                if (willDelete) {
                    const result = await DeleteMedicinesPedidoDetalle(idPedidoDetalle);
                    if (result.status === 200) {
                        getAll();
                        setOpenDelete(true);
                    }
                }
            });
        } catch (error) {

        }
    }

    const handleClick = async (datos) => {
        try {
            if (dataProducto == null) {
                setOpenError(true);
                setErrorMessage("Debe seleccionar un producto para registrar el medicamento al pedido");
                return;
            }

            datos.idMedicamentos = dataProducto.id;
            datos.idMedicamentosPedido = parseInt(idPedido);
            datos.referencia = datos.referencia || null;
            datos.lote = datos.lote || null;
            datos.fechaLote = datos.fechaLote || null;
            datos.cantidadPedida = parseInt(datos.cantidadPedida);
            datos.usuarioRegistro = user?.nameuser;

            const result = await InsertMedicinesPedidoDetalle(datos);
            if (result.data.exito) {
                getAll();
                setOpenSuccess(true);
                reset();
                setDataProducto(null);
            } else {
                setOpenError(true);
                setErrorMessage(result.data.mensaje);
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(Message.RegistroNoGuardado);
        }
    };

    const handleCantidadRecibidaChange = (idPedidoDetalle, value) => {
        setCantidadRecibida((prevState) => ({
            ...prevState,
            [idPedidoDetalle]: value
        }));
    };

    const handleClickRecibida = async (idPedidoDetalle) => {
        try {
            if (!cantidadRecibida[idPedidoDetalle]) {
                setOpenError(true);
                setErrorMessage("Debe registrar una cantidad recibida");
                return;
            } else if (cantidadRecibida[idPedidoDetalle] <= 0) {
                setOpenError(true);
                setErrorMessage("La cantidad no puede ser menor o igual a cero");
                return;
            }

            const model = {
                id: idPedidoDetalle,
                llegoLaCantidadPedida: false,
                cantidadRecibida: parseInt(cantidadRecibida[idPedidoDetalle]),
                usuarioModifico: user?.nameuser
            }

            const result = await UpdateMedicinesPedidoDetalleCantidades(model);
            if (result.status === 200) {
                getAll();
                setEditingRowId(null);
                setOpenSuccess(true);
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(Message.RegistroNoGuardado);
        }
    };

    const handleClickCheckboxRecibida = useCallback(async (event, idPedidoDetalle) => {
        try {
            const model = {
                id: idPedidoDetalle,
                llegoLaCantidadPedida: true,
                usuarioModifico: user?.nameuser
            }

            const result = await UpdateMedicinesPedidoDetalleCantidades(model);
            if (result.status === 200) {
                setLlegoLaCantidadPedida(event.target.checked);
                getAll();
                setOpenSuccess(true);
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(Message.RegistroNoGuardado);
        }
    }, [llegoLaCantidadPedida]);

    return (
        <SubCard title="Agregar medicamentos">
            <MessageDelete open={openDelete} onClose={() => setOpenDelete(false)} />
            <MessageSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            <Grid container spacing={2} direction="row" sx={{ pb: 3, alignItems: "center" }}>
                <FormProvider {...methods}>
                    <Grid item xs={12}>
                        <SearchProduct captureData={setDataProducto} dataProducto={dataProducto} />
                    </Grid>

                    <Grid item xs={12} md={6} lg={3}>
                        <InputText
                            defaultValue=""
                            name="registroSanitario"
                            label="Registro sanitario"
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors.registroSanitario}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={3}>
                        <InputText
                            defaultValue=""
                            name="referencia"
                            label="Referencia"
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors.referencia}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={3}>
                        <InputText
                            defaultValue=""
                            name="lote"
                            label="Lote"
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors.lote}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={3}>
                        <InputDatePicker
                            label="Fecha de lote"
                            name="fechaLote"
                            defaultValue=""
                            bug={errors.fechaLote}
                            size={matchesXS ? 'small' : 'medium'}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={3}>
                        <InputDatePicker
                            label="Fecha de vencimiento"
                            name="fechaVencimiento"
                            defaultValue=""
                            bug={errors.fechaVencimiento}
                            size={matchesXS ? 'small' : 'medium'}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={3}>
                        <InputText
                            defaultValue=""
                            type="number"
                            name="cantidadPedida"
                            label="Cantidad pedida"
                            size={matchesXS ? 'small' : 'medium'}
                            bug={errors.cantidadPedida}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={1.5}>
                        <InputCheckBox
                            label="Estado"
                            name="estado"
                            size={30}
                            defaultValue={true}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={1.5}>
                        <AnimateButton>
                            <Button variant="contained" fullWidth onClick={handleSubmit(handleClick)}>
                                {TitleButton.AgregarOrden}
                            </Button>
                        </AnimateButton>
                    </Grid>
                </FormProvider>
            </Grid>

            <SubCard title="Lista de pedidos">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TableContainer>
                            <Table aria-label="collapsible table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Medicamento</TableCell>
                                        <TableCell>Fecha de vencimiento</TableCell>
                                        <TableCell>Can. solicitada</TableCell>
                                        <TableCell>Can. recibida</TableCell>
                                        <TableCell>Bitácora</TableCell>
                                        <TableCell>Acción</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {dataModel.map((row) => (
                                        <TableRow hover sx={{ '& > *': { borderBottom: 'unset' } }} key={row.id}>
                                            <TableCell>
                                                <ListItemText
                                                    primary={row?.nameMedicamentos}
                                                    secondary={`R. sanitario: ${row?.registroSanitario}`.toUpperCase()}
                                                    primaryTypographyProps={{ typography: 'body2' }}
                                                    secondaryTypographyProps={{
                                                        mt: 0.5,
                                                        component: 'span',
                                                        typography: 'caption',
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell>{ViewFormat(row?.fechaVencimiento)}</TableCell>
                                            <TableCell align='center'>{row?.cantidadPedida}</TableCell>
                                            <TableCell align='center'>
                                                <Grid container spacing={1} alignItems="center">
                                                    {editingRowId === row.id ? (
                                                        <>
                                                            <Grid item>
                                                                <TextField
                                                                    sx={{ width: 70 }}
                                                                    id={`cantidad-recibida-${row.id}`}
                                                                    type="number"
                                                                    size="small"
                                                                    defaultValue={row?.cantidadRecibida}
                                                                    value={cantidadRecibida[row.id] || ''}
                                                                    onChange={(e) => handleCantidadRecibidaChange(row.id, e.target.value)}
                                                                />
                                                            </Grid>

                                                            <Grid item>
                                                                <Tooltip title="Registrar" onClick={() => handleClickRecibida(row.id)}>
                                                                    <IconButton color="info" size="small">
                                                                        <SaveIcon sx={{ fontSize: '1.5rem' }} />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </Grid>

                                                            <Grid item>
                                                                <Tooltip title={TitleButton.Cancelar} onClick={() => {
                                                                    setEditingRowId(null);
                                                                    setCantidadRecibida((prevState) => ({ ...prevState, [row.id]: '' }));
                                                                }}>
                                                                    <IconButton color="error" size="small">
                                                                        <HighlightOffIcon sx={{ fontSize: '1.5rem' }} />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </Grid>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Grid item>
                                                                {row?.cantidadRecibida}
                                                            </Grid>

                                                            <Grid item>
                                                                <Tooltip
                                                                    title="Editar: Esta opción es para colocar la cantidad que recibió, esta misma es diferente a la solicitada"
                                                                    onClick={() => setEditingRowId(row.id)}
                                                                >
                                                                    <IconButton color="info" size="small">
                                                                        <EditIcon sx={{ fontSize: '1.3rem' }} />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </Grid>

                                                            {row?.cantidadRecibida === 0 && (
                                                                <Grid item>
                                                                    <Tooltip title="Indicaciones: Al marcar el Checkbox indica que la cantidad que solicito llego completa">
                                                                        <Checkbox
                                                                            onChange={(event) => handleClickCheckboxRecibida(event, row.id)}
                                                                            checked={llegoLaCantidadPedida}
                                                                            sx={{
                                                                                color: theme.palette.primary,
                                                                                '&.Mui-checked': {
                                                                                    color: theme.palette.primary
                                                                                },
                                                                                '& .MuiSvgIcon-root': { fontSize: '1.3rem' }
                                                                            }}
                                                                        />
                                                                    </Tooltip>
                                                                </Grid>
                                                            )}
                                                        </>
                                                    )}
                                                </Grid>
                                            </TableCell>
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
                                                <Tooltip disabled={row?.cantidadRecibida !== 0} title="Eliminar" onClick={() => handleDelete(row?.id)}>
                                                    <IconButton color="error" size="small">
                                                        <HighlightOffIcon sx={{ fontSize: '2rem' }} />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </SubCard>
        </SubCard>
    );
}