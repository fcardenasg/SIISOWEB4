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
import { DeleteVentanillaUnicaDetalle, GetByIdVentanillaUnicaDetalle, InsertVentanillaUnicaDetalle } from 'api/clients/VentanillaUnicaClient';
import { MessageError, MessageSuccess, ParamDelete } from 'components/alert/AlertAll';
import { CodCatalogo, Message, ValidationMessage } from 'components/helpers/Enums';
import useAuth from 'hooks/useAuth';

import AnimateButton from 'ui-component/extended/AnimateButton';
import { GetByTipoCatalogoCombo } from 'api/clients/CatalogClient';
import swal from 'sweetalert';

const validationSchema = yup.object().shape({
    idArea: yup.number().required(ValidationMessage.Requerido),
    idTipoDocumento: yup.number().required(ValidationMessage.Requerido)
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
    const [lsTipoDocumento, setLsTipoDocumento] = useState([]);

    const methods = useForm({
        resolver: yupResolver(validationSchema),
    });
    const { handleSubmit, formState: { errors }, reset } = methods;

    useEffect(() => {
        async function getAll() {
            try {
                const lsServerTipoSolicitud = await GetByTipoCatalogoCombo(CodCatalogo.VentanillaArea);
                setLsArea(lsServerTipoSolicitud.data);

                const lsServerResponsable = await GetByTipoCatalogoCombo(CodCatalogo.VentanillaTipoDocumento);
                setLsTipoDocumento(lsServerResponsable.data);
            } catch (error) { }
        }

        getAll();
    }, []);

    async function getAllListSolicitudes() {
        try {
            const lsServer = await GetByIdVentanillaUnicaDetalle(idResult);

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
                idArea: datos.idArea,
                idTipoDocumento: datos.idTipoDocumento,
                observaciones: datos.observaciones,

                usuarioRegistro: user.nameuser,
            }

            const result = await InsertVentanillaUnicaDetalle(DataToInsert);
            if (result.status === 200) {
                getAllListSolicitudes();
                setOpenSuccess(true);
                reset();
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

            <Grid item xs={6}>
                <FormProvider {...methods}>
                    <InputSelect
                        name="idArea"
                        label="Area"
                        options={lsArea}
                        size={matchesXS ? 'small' : 'medium'}
                        bug={errors.idArea}
                    />
                </FormProvider>
            </Grid>

            <Grid item xs={6}>
                <FormProvider {...methods}>
                    <InputSelect
                        name="idTipoDocumento"
                        label="Tipo De Documento"
                        options={lsTipoDocumento}
                        size={matchesXS ? 'small' : 'medium'}
                        bug={errors.idTipoDocumento}
                    />
                </FormProvider>
            </Grid>

            <Grid item xs={10}>
                <FormProvider {...methods}>
                    <InputText
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
                                <TableCell>Tipo De Documento</TableCell>
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
                                                    <Tooltip title="Eliminar" onClick={() => handleDelete(row.id)}>
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