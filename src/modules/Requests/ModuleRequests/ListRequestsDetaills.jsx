import { useState, useEffect, Fragment } from 'react';

import { useTheme } from '@mui/material/styles';
import {
    Grid, Button,
    useMediaQuery,
    Typography,
    TableCell,
    TableRow,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    Stack,
    Tooltip,
    IconButton
} from '@mui/material';

import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { Message, ValidationMessage } from 'components/helpers/Enums';

import { FormProvider, useForm } from 'react-hook-form';
import Transitions from 'ui-component/extended/Transitions';
import useAuth from 'hooks/useAuth';
import { MessageSuccess, MessageError, ParamDelete } from 'components/alert/AlertAll';
import { GetByTipoCatalogoCombo } from 'api/clients/CatalogClient';
import { CodCatalogo } from 'components/helpers/Enums';
import InputSelect from 'components/input/InputSelect';

import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import swal from 'sweetalert';
import { DeleteRequestsDetaills, GetAllRequestsDetaillsByIdSolicitud, InsertRequestsDetaills } from 'api/clients/RequestsClient';
import { PostRequestsDetalle } from 'formatdata/RequestsForm';
import InputText from 'components/input/InputText';
import Chip from 'ui-component/extended/Chip';
import AnimateButton from 'ui-component/extended/AnimateButton';

const validationSchema = yup.object().shape({
    idTipoSolicitud: yup.string().required(`${ValidationMessage.Requerido}`),
    idAreaRespuesta: yup.string().required(`${ValidationMessage.Requerido}`),
});

const ListRequestsDetaills = ({ lsEmployee, idSolicitud }) => {
    const { user } = useAuth();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [addItemClickedEmpresa, setAddItemClickedEmpresa] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [openError, setOpenError] = useState(false);

    const [lsSolicitudes, setLsSolicitudes] = useState([]);
    const [lsResponsable, setLsResponsable] = useState([]);
    const [lsOrdenesParaclinicos, setLsOrdenesParaclinicos] = useState([]);

    useEffect(() => {
        async function getAll() {
            try {
                const lsServerTipoSolicitud = await GetByTipoCatalogoCombo(CodCatalogo.TIPO_SOLICITUD_DEREPETICION);
                setLsSolicitudes(lsServerTipoSolicitud.data);

                const lsServerResponsable = await GetByTipoCatalogoCombo(CodCatalogo.RESPONSABLE_RESPUESTA_DEREPETICION);
                setLsResponsable(lsServerResponsable.data);
            } catch (error) { }
        }

        getAll();
    }, []);

    async function getAllListSolicitudes() {
        try {
            const lsServer = await GetAllRequestsDetaillsByIdSolicitud(idSolicitud);

            if (lsServer.status === 200) {
                setLsOrdenesParaclinicos(lsServer.data);
            }
        } catch (error) { }
    }

    useEffect(() => {
        getAllListSolicitudes();
    }, [idSolicitud]);

    const methods = useForm({
        resolver: yupResolver(validationSchema),
    });
    const { handleSubmit, formState: { errors }, reset } = methods;

    const handleDelete = async (idSolicitudDetaills) => {
        try {
            if (idSolicitudDetaills !== null) {
                swal(ParamDelete).then(async (willDelete) => {
                    if (willDelete) {
                        const result = await DeleteRequestsDetaills(idSolicitudDetaills);
                        if (result.status === 200) {
                            setOpenError(true);
                            setErrorMessage(Message.Eliminar);
                            getAllListSolicitudes();
                        }
                    }
                });
            }
        } catch (error) { }
    };

    const handleClick = async (datos) => {
        try {
            const DataToInsert = PostRequestsDetalle(idSolicitud, datos.idTipoSolicitud, datos.idAreaRespuesta, null,
                datos.observacion, user.nameuser, null, null, null, false, null);

            if (Object.keys(datos.length !== 0)) {
                const result = await InsertRequestsDetaills(DataToInsert);
                if (result.status === 200) {
                    if (result.data.message === 'Esta solicitud ya esta registrada') {
                        setOpenError(true);
                        setErrorMessage(result.data.message);
                    } else {
                        setAddItemClickedEmpresa(false);
                        setOpenSuccess(true);
                        getAllListSolicitudes();
                        reset();
                    }
                }
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(Message.RegistroNoGuardado);
        }
    };

    return (
        <Fragment>
            <MessageSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TableContainer>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Solicitud</TableCell>
                                    <TableCell>Responsable Respuesta</TableCell>
                                    <TableCell>Estado Respuesta</TableCell>
                                    <TableCell>Fecha Registro</TableCell>
                                    <TableCell>Acción</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {lsOrdenesParaclinicos.map((row) => (
                                    <TableRow hover sx={{ '& > *': { borderBottom: 'unset' } }}>
                                        <TableCell component="th" scope="row">{row.nameTipoSolicitud}</TableCell>
                                        <TableCell>{row.nameAreaRespuesta}</TableCell>
                                        <TableCell>
                                            <Chip
                                                size="small"
                                                label={row.estadoRespuesta ? 'RESPONDIDA' : 'SIN RESPUESTA'}
                                                chipcolor={row.estadoRespuesta ? 'success' : 'error'}
                                            />
                                        </TableCell>
                                        <TableCell>{new Date(row.fechaRegistro).toLocaleString()}</TableCell>

                                        <TableCell>
                                            <Grid container spacing={2}>
                                                <Grid item xs={6}>
                                                    <AnimateButton>
                                                        <Tooltip disabled={row.estadoRespuesta ? true : false} title="Eliminar" onClick={() => handleDelete(row.id)}>
                                                            <IconButton color="error" size="small">
                                                                <HighlightOffIcon sx={{ fontSize: '2rem' }} />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </AnimateButton>
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                    </TableRow>))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>

                <Grid item xs={12}>
                    <Transitions type="collapse" in={addItemClickedEmpresa} position="top-left" direction="up">
                        <Grid container sx={{ pt: 5 }} spacing={2}>

                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        defaultValue=""
                                        name="idTipoSolicitud"
                                        label="Tipo de Solicitud"
                                        options={lsSolicitudes}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.idTipoSolicitud}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={3}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        defaultValue=""
                                        name="idAreaRespuesta"
                                        label="Responsable de Respuesta"
                                        options={lsResponsable}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors.idAreaRespuesta}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={6}>
                                <FormProvider {...methods}>
                                    <InputText
                                        fullWidth
                                        defaultValue=""
                                        name="observacion"
                                        label="Observación"
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </FormProvider>
                            </Grid>
                        </Grid>

                        <Grid container sx={{ pr: 0.5, pt: 3 }} justifyContent="flex-end">
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Button color="error" onClick={() => { setAddItemClickedEmpresa(false); reset(); }}>
                                    Cancelar
                                </Button>

                                <Button variant="contained" size="small" onClick={handleSubmit(handleClick)}>
                                    Adicionar
                                </Button>
                            </Stack>
                        </Grid>
                    </Transitions>

                    {!addItemClickedEmpresa ?
                        <Grid item sx={{ pl: 2, pt: 3 }}>
                            <Button disabled={lsEmployee.length === 0 ? true : false} variant="text" onClick={() => setAddItemClickedEmpresa(true)}>
                                + Agregar Solicitud
                            </Button>
                        </Grid> : null}
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default ListRequestsDetaills;