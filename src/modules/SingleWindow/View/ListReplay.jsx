import { Divider, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import AnimateButton from "ui-component/extended/AnimateButton";

import { GetAllVentanillaUnicaDetalle, GetFileVentanillaUnica, GetVentanillaUnicaDetalleArchivo } from "api/clients/VentanillaUnicaClient";
import useAuth from "hooks/useAuth";
import { ViewFormat } from "components/helpers/Format";

import ControlModal from "components/controllers/ControlModal";
import Chip from "ui-component/extended/Chip";
import ReplyIcon from '@mui/icons-material/Reply';
import ViewReplayPQRS from "./ViewReplayPQRS";
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import { DownloadFile } from "components/helpers/ConvertToBytes";
import ViewPDF from "components/components/ViewPDF";

const ListReplay = ({ idVentanilla, getAllList, options = 0, monitoreo = false }) => {
    const { user } = useAuth();

    const [openModalReplay, setOpenModalReplay] = useState(false);
    const [lsTipoDocumento, setLsTipoDocumento] = useState([]);
    const [idVentanillaDetalle, setIdVentanillaDetalle] = useState("");
    const [archivoVent, setArchivoVent] = useState(null);

    async function getAll() {
        try {
            if (idVentanilla) {
                if (options === 0) {
                    const lsServer = await GetAllVentanillaUnicaDetalle(idVentanilla, user?.idarea, false);
                    setLsTipoDocumento(lsServer.data);
                } else {
                    const lsServer = await GetAllVentanillaUnicaDetalle(idVentanilla, 0, true);
                    setLsTipoDocumento(lsServer.data);
                }

                const lsServerFile = await GetFileVentanillaUnica(idVentanilla);
                if (lsServerFile.status === 200)
                    setArchivoVent(lsServerFile.data);
            }
        } catch (error) { }
    }

    useEffect(() => {
        getAll();
    }, [idVentanilla]);

    async function downloadFileReplay(idVent) {
        try {
            const archivoPdf = await GetVentanillaUnicaDetalleArchivo(idVent);
            if (archivoPdf.status === 200) {
                DownloadFile(`${idVent}archivosventanillaunica.zip`, archivoPdf.data);
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

            <Grid container spacing={2}>
                <Grid item xs={12} md={7.5}>
                    <TableContainer>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Area</TableCell>
                                    <TableCell>Tipo Documento</TableCell>
                                    <TableCell>Fecha Límite de Respuesta</TableCell>
                                    {/* <TableCell>Días Restantes</TableCell> */}
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
                                        {/* <TableCell>{row?.diasRestantes}</TableCell> */}
                                        <TableCell>{row?.usuarioModifico}</TableCell>
                                        <TableCell>{row?.fechaModifico !== null ? new Date(row?.fechaModifico).toLocaleString() : null}</TableCell>
                                        <TableCell>
                                            {row?.estado ? <Chip label="Atendido" size="small" chipcolor="success" />
                                                : <Chip label="Sin Atender" size="small" chipcolor="error" />}
                                        </TableCell>

                                        <TableCell sx={{ pr: 5 }}>
                                            <Grid container spacing={2.5}>
                                                {monitoreo ?
                                                    <Grid item xs={6}>
                                                        <AnimateButton>
                                                            <Tooltip disabled={row?.estado ? false : true} title="Descargar archivos"
                                                                onClick={() => downloadFileReplay(row?.id)}>
                                                                <IconButton size="small">
                                                                    <DownloadForOfflineIcon color={row?.estado ? "error" : "inherit"} sx={{ fontSize: '1.6rem' }} />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </AnimateButton>
                                                    </Grid> :
                                                    <>
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
                                                    </>
                                                }

                                            </Grid>
                                        </TableCell>
                                    </TableRow>))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>

                <Grid item xs={12} md={4.5}>
                    <Grid container spacing={2} sx={{ py: 2, px: 2 }}>
                        <Grid item xs={12}>
                            <Typography sx={{ pb: 1 }} variant='h4'>Visualización del archivo de solicitud</Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Divider />
                        </Grid>

                        {archivoVent ?
                            <ViewPDF dataPDF={archivoVent} height={440} width={510} /> :

                            <Grid item xs={12}>
                                <Typography sx={{ pt: 20 }} variant="h4">No existe una solicitud registrada para visualizar</Typography>
                            </Grid>
                        }
                    </Grid>
                </Grid>
            </Grid>
        </Fragment>
    );
}

export default ListReplay;