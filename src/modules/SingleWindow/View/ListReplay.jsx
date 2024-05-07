import { Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import AnimateButton from "ui-component/extended/AnimateButton";

import { GetAllVentanillaUnicaDetalle, GetVentanillaUnicaDetalleArchivo } from "api/clients/VentanillaUnicaClient";
import useAuth from "hooks/useAuth";
import { ViewFormat } from "components/helpers/Format";

import ControlModal from "components/controllers/ControlModal";
import Chip from "ui-component/extended/Chip";
import ReplyIcon from '@mui/icons-material/Reply';
import ViewReplayPQRS from "./ViewReplayPQRS";
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import { DownloadFile } from "components/helpers/ConvertToBytes";

const ListReplay = ({ idVentanilla, getAllList, options = 0 }) => {
    const { user } = useAuth();

    const [openModalReplay, setOpenModalReplay] = useState(false);
    const [lsTipoDocumento, setLsTipoDocumento] = useState([]);
    const [idVentanillaDetalle, setIdVentanillaDetalle] = useState("");

    async function getAll() {
        try {
            if (options === 0) {
                const lsServer = await GetAllVentanillaUnicaDetalle(idVentanilla, user?.idarea, false);
                setLsTipoDocumento(lsServer.data);
            } else {
                const lsServer = await GetAllVentanillaUnicaDetalle(idVentanilla, 0, true);
                setLsTipoDocumento(lsServer.data);
            }
        } catch (error) { }
    }

    useEffect(() => {
        getAll();
    }, [idVentanilla]);

    async function downloadFileReplay(idVent, nombre) {
        try {
            var nombreFormat = nombre.toLowerCase().replace(/\s/g, "_");
            const archivoPdf = await GetVentanillaUnicaDetalleArchivo(idVent);

            if (archivoPdf.status === 200) {
                DownloadFile(`${nombreFormat}_${new Date().getTime()}.pdf`, archivoPdf.data);
            }
        } catch (error) { }
    }

    return (
        <Fragment>
            <ControlModal
                maxWidth="sm"
                open={openModalReplay}
                onClose={() => setOpenModalReplay(false)}
                title="Responder"
            >
                <ViewReplayPQRS idVentanillaDetalle={idVentanillaDetalle} getAllReplay={getAll} getAllList={getAllList} />
            </ControlModal>

            <TableContainer>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Area</TableCell>
                            <TableCell>Tipo Documento</TableCell>
                            <TableCell>Fecha Límite de Respuesta</TableCell>
                            <TableCell>Días Restantes</TableCell>
                            <TableCell>Atendido Por</TableCell>
                            <TableCell>Fecha de Atención</TableCell>
                            <TableCell>Estado de Atención</TableCell>
                            <TableCell>Acción</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {lsTipoDocumento?.map((row) => (
                            <TableRow hover sx={{ '& > *': { borderBottom: 'unset' } }}>
                                <TableCell component="th" scope="row">{row?.nameArea}</TableCell>
                                <TableCell component="th" scope="row">{row?.nameTipoDocumento}</TableCell>
                                <TableCell>{ViewFormat(row?.fechaLimite)}</TableCell>
                                <TableCell>{row?.diasRestantes}</TableCell>
                                <TableCell>{row?.usuarioModifico}</TableCell>
                                <TableCell>{row?.fechaModifico !== null ? new Date(row?.fechaModifico).toLocaleString() : null}</TableCell>
                                <TableCell>
                                    {row?.estado ? <Chip label="Atendido" size="small" chipcolor="success" />
                                        : <Chip label="Sin Atender" size="small" chipcolor="error" />}
                                </TableCell>

                                <TableCell sx={{ pr: 5 }}>
                                    <Grid container spacing={2.5}>
                                        <Grid item xs={6}>
                                            <AnimateButton>
                                                <Tooltip title="Responder" onClick={() => { setIdVentanillaDetalle(row.id); setOpenModalReplay(true); }}>
                                                    <IconButton size="small">
                                                        <ReplyIcon color="info" sx={{ fontSize: '1.6rem' }} />
                                                    </IconButton>
                                                </Tooltip>
                                            </AnimateButton>
                                        </Grid>

                                        <Grid item xs={6}>
                                            <AnimateButton>
                                                <Tooltip disabled={row?.estado ? false : true} title="Descargar archivo"
                                                    onClick={() => downloadFileReplay(row?.id, row?.nameTipoDocumento)}>
                                                    <IconButton size="small">
                                                        <DownloadForOfflineIcon color={row?.estado ? "error" : "inherit"} sx={{ fontSize: '1.6rem' }} />
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
        </Fragment>
    );
}

export default ListReplay;