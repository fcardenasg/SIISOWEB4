import React, { Fragment, useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Grid,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    useMediaQuery
} from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import InputSelect from 'components/input/InputSelect';
import { FormProvider, useForm } from 'react-hook-form';
import InputText from 'components/input/InputText';
import { DeleteVentanillaUnicaDetalle, GetAllVentanillaUnicaDetalle, InsertVentanillaUnicaDetalle } from 'api/clients/VentanillaUnicaClient';
import { MessageError, MessageSuccess, ParamDelete } from 'components/alert/AlertAll';
import { CodCatalogo, Message, ValidationMessage } from 'components/helpers/Enums';
import useAuth from 'hooks/useAuth';

import AnimateButton from 'ui-component/extended/AnimateButton';
import { GetAllBySubTipoCatalogo, GetByTipoCatalogoCombo } from 'api/clients/CatalogClient';
import swal from 'sweetalert';
import SelectOnChange from 'components/input/SelectOnChange';
import { GetAllComboArea } from 'api/clients/UserClient';
import InputMultiSelects from 'components/input/InputMultiSelects';

const validationSchema = yup.object().shape({
    idUsuario: yup.string().required(ValidationMessage.Requerido)
});

const ListAddSingleWindow = ({ documento, idResult }) => {
    const theme = useTheme();
    const { user } = useAuth();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [lsPeticiones, setLsPeticiones] = useState([]);
    const [lsArea, setLsArea] = useState([]);
    const [lsUsuario, setLsUsuario] = useState([]);
    const [lsAreaFiltro, setLsAreaFiltro] = useState([]);
    const [lsTipoDocumento, setLsTipoDocumento] = useState([]);
    const [area, setArea] = useState([]);
    const [tipoDocumento, setTipoDocumento] = useState([]);

    const methods = useForm({
        resolver: yupResolver(validationSchema),
    });
    const { handleSubmit, setValue, formState: { errors }, reset } = methods;

    useEffect(() => {
        async function getAll() {
            try {
                const lsServerTipoSolicitud = await GetByTipoCatalogoCombo(CodCatalogo.VentanillaArea);
                setLsArea(lsServerTipoSolicitud.data);
                setLsAreaFiltro(lsServerTipoSolicitud.data);
            } catch (error) { }
        }

        getAll();
    }, []);

    async function getAllListSolicitudes() {
        try {
            const lsServer = await GetAllVentanillaUnicaDetalle(idResult, 0, true);
            if (lsServer.status === 200) {
                setLsPeticiones(lsServer.data);
            }
        } catch (error) { }
    }

    useEffect(() => {
        getAllListSolicitudes();
    }, [idResult]);

    const handleDelete = async (idSolicitudDetaills) => {
        try {
            if (idSolicitudDetaills !== null) {
                swal(ParamDelete).then(async (willDelete) => {
                    if (willDelete) {
                        const result = await DeleteVentanillaUnicaDetalle(idSolicitudDetaills);
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
            const DataToInsert = {
                documento: documento,
                idVentanillaUnica: idResult,
                idArea: area,
                idTipoDocumento: tipoDocumento,
                idUsuario: datos.idUsuario !== "" ? datos.idUsuario : null,
                observaciones: datos.observaciones !== "" ? datos.observaciones : null,

                usuarioRegistro: user.nameuser,
            }

            const result = await InsertVentanillaUnicaDetalle(DataToInsert);
            if (result.status === 200) {
                if (result.data === Message.Guardar) {
                    getAllListSolicitudes();
                    setOpenSuccess(true);

                    setArea("");
                    setTipoDocumento([]);
                    setLsTipoDocumento([]);
                    setLsUsuario([]);
                    reset();
                } else {
                    setOpenError(true);
                    setErrorMessage(result.data);
                }
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(Message.RegistroNoGuardado);
        }
    };

    const handleChangeArea = async (event) => {
        setTipoDocumento([]);
        setLsTipoDocumento([]);
        reset();
        setArea(event.target.value);
        setValue("idUsuario", "")

        var codigoDocumento = lsAreaFiltro.filter(code => code.value === event.target.value)[0].codigo;

        var lsTipo = await GetAllBySubTipoCatalogo(0, 0, codigoDocumento, 7);
        if (lsTipo.status === 200) {
            var resultMapsTipo = lsTipo.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));

            setLsTipoDocumento(resultMapsTipo);
        }

        const lsServerUsuario = await GetAllComboArea(event.target.value);
        setLsUsuario(lsServerUsuario.data);
    }

    return (
        <Fragment>
            <MessageSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            <Grid item xs={12} md={6}>
                <SelectOnChange
                    name="idArea"
                    label="Area"
                    value={area}
                    options={lsArea}
                    onChange={handleChangeArea}
                    size={matchesXS ? 'small' : 'medium'}
                />
            </Grid>

            <Grid item xs={12} md={6}>
                <FormProvider {...methods}>
                    <InputSelect
                        defaultValue=""
                        name="idUsuario"
                        label="Usuario responsable"
                        options={lsUsuario}
                        size={matchesXS ? 'small' : 'medium'}
                        bug={errors.idUsuario}
                    />
                </FormProvider>
            </Grid>

            <Grid item xs={12}>
                <InputMultiSelects
                    fullWidth
                    onChange={(event, value) => setTipoDocumento(value)}
                    value={tipoDocumento}
                    label="Tipo de documento"
                    options={lsTipoDocumento}
                />
            </Grid>

            <Grid item xs={12}>
                <FormProvider {...methods}>
                    <InputText
                        defaultValue=""
                        multiline
                        rows={3}
                        fullWidth
                        name="observaciones"
                        label="Observaciones"
                        size={matchesXS ? 'small' : 'medium'}
                        bug={errors.observaciones}
                    />
                </FormProvider>
            </Grid>

            <Grid item xs={2}>
                <Button variant="contained" fullWidth size="medium" onClick={handleSubmit(handleClick)}>
                    Agregar
                </Button>
            </Grid>

            <Grid item xs={12}>
                <TableContainer>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Area</TableCell>
                                <TableCell>Tipo de documento</TableCell>
                                <TableCell>Acción</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {lsPeticiones.map((row) => (
                                <TableRow hover sx={{ '& > *': { borderBottom: 'unset' } }}>
                                    <TableCell component="th" scope="row">{row.nameArea}</TableCell>
                                    <TableCell>{row.nameTipoDocumento}</TableCell>

                                    <TableCell>
                                        <Grid container spacing={2}>
                                            <Grid item xs={6}>
                                                <AnimateButton>
                                                    <Tooltip disabled={row.estado ? true : false} title="Eliminar" onClick={() => handleDelete(row.id)}>
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
        </Fragment>
    );
};

export default ListAddSingleWindow;