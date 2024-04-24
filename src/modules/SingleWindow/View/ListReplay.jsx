import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import AnimateButton from "ui-component/extended/AnimateButton";

import { GetAllVentanillaUnicaDetalle } from "api/clients/VentanillaUnicaClient";
import useAuth from "hooks/useAuth";
import { ViewFormat } from "components/helpers/Format";

import ControlModal from "components/controllers/ControlModal";
import Chip from "ui-component/extended/Chip";
import ReplyIcon from '@mui/icons-material/Reply';
import ViewReplayPQRS from "./ViewReplayPQRS";

const ListReplay = ({ idVentanilla }) => {
    const { user } = useAuth();
    const [openModalReplay, setOpenModalReplay] = useState(false);

    const [lsTipoDocumento, setLsTipoDocumento] = useState([]);
    const [idVentanillaDetalle, setIdVentanillaDetalle] = useState("");

    async function getAll() {
        try {
            const lsServer = await GetAllVentanillaUnicaDetalle(idVentanilla, user?.idarea, false);
            setLsTipoDocumento(lsServer.data);
        } catch (error) { }
    }

    useEffect(() => {
        getAll();
    }, [idVentanilla]);

    return (
        <Fragment>
            <ControlModal
                maxWidth="sm"
                open={openModalReplay}
                onClose={() => setOpenModalReplay(false)}
                title="Responder"
            >
                <ViewReplayPQRS idVentanillaDetalle={idVentanillaDetalle} getAllReplay={getAll} />
            </ControlModal>

            <TableContainer>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Tipo Documento</TableCell>
                            <TableCell>Fecha Limite / Días Restantes</TableCell>
                            <TableCell>Usuario Respondio</TableCell>
                            <TableCell>Fecha de Respuesta</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Acción</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {lsTipoDocumento?.map((row) => (
                            <TableRow hover sx={{ '& > *': { borderBottom: 'unset' } }}>
                                <TableCell component="th" scope="row">{row?.nameTipoDocumento}</TableCell>
                                <TableCell>{ViewFormat(row?.fechaLimite)} / {row?.diasRestantes}</TableCell>
                                <TableCell>{row?.usuarioModifico}</TableCell>
                                <TableCell>{new Date(row?.fechaModifico).toLocaleString()}</TableCell>
                                <TableCell>
                                    {row?.estado ?
                                        <Tooltip title={row?.usuarioModifico}>
                                            <Chip label="Respondido" size="small" chipcolor="success" />
                                        </Tooltip>
                                        : <Chip label="Sin Respuesta" size="small" chipcolor="error" />
                                    }
                                </TableCell>

                                <TableCell>
                                    <AnimateButton>
                                        <Tooltip title="Responder" onClick={() => { setIdVentanillaDetalle(row.id); setOpenModalReplay(true); }}>
                                            <IconButton size="small">
                                                <ReplyIcon sx={{ fontSize: '1.6rem' }} />
                                            </IconButton>
                                        </Tooltip>
                                    </AnimateButton>
                                </TableCell>
                            </TableRow>))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Fragment>
    );
}

export default ListReplay;