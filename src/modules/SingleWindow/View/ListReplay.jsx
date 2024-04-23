import { Button, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material";
import { Fragment, useCallback, useEffect, useState } from "react";
import AnimateButton from "ui-component/extended/AnimateButton";

import { GetAllVentanillaUnicaDetalle, GetVentanillaUnicaDetalleArchivo, UpdateVentanillaUnicaDetalle } from "api/clients/VentanillaUnicaClient";
import useAuth from "hooks/useAuth";
import { ViewFormat } from "components/helpers/Format";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Upload from "components/UploadDocument/Upload";
import ControlModal from "components/controllers/ControlModal";
import { MessageError, MessageSuccess } from "components/alert/AlertAll";
import ViewPDF from "components/components/ViewPDF";
import Chip from "ui-component/extended/Chip";
import VisibilityIcon from '@mui/icons-material/Visibility';

const ListReplay = ({ idVentanilla }) => {
    const { user } = useAuth();
    const [openModal, setOpenModal] = useState(false);
    const [openModalView, setOpenModalView] = useState(false);
    const [lsTipoDocumento, setLsTipoDocumento] = useState([]);
    const [infoArchivoAdjunto, setInfoArchivoAdjunto] = useState(null);
    const [archivoAdjunto, setArchivoAdjunto] = useState("");
    const [archivoConsulta, setArchivoConsulta] = useState("");
    const [idVentanillaDetalle, setIdVentanillaDetalle] = useState("");

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    async function getAll() {
        try {
            const lsServer = await GetAllVentanillaUnicaDetalle(idVentanilla, user?.idarea, false);
            setLsTipoDocumento(lsServer.data);
        } catch (error) { }
    }

    useEffect(() => {
        getAll();
    }, [idVentanilla])

    const allowedFiles = ['application/pdf'];
    const handleDrop = useCallback(
        (event) => {
            setInfoArchivoAdjunto(null);
            let selectedFile = event[0];
            setInfoArchivoAdjunto(selectedFile);

            if (selectedFile) {
                if (selectedFile && allowedFiles.includes(selectedFile.type)) {
                    let reader = new FileReader();
                    reader.readAsDataURL(selectedFile);
                    reader.onloadend = async (e) => {
                        setArchivoAdjunto(e.target.result);
                    }
                }
                else {
                    setOpenError(true);
                    setErrorMessage('Este forma no es un PDF');
                }
            }
        },
        [infoArchivoAdjunto]
    );

    const handleClick = async () => {
        try {
            const DataToInsert = {
                id: Number(idVentanillaDetalle),
                archivoRespuesta: archivoAdjunto,
                usuarioModifico: user?.nameuser
            }

            const result = await UpdateVentanillaUnicaDetalle(DataToInsert);
            if (result.status === 200) {
                setTimeout(() => {
                    setOpenModal(false);
                    setArchivoAdjunto("");
                }, 500);

                setOpenSuccess(true);
                getAll();
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage("No se pudo guardar el archivo");
        }
    };

    const handleClickView = async (idVentanilla) => {
        try {
            const result = await GetVentanillaUnicaDetalleArchivo(idVentanilla);
            if (result.status === 200) {
                setArchivoConsulta(result.data);
                setOpenModalView(true);
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage("No se pudo cargar el archivo");
        }
    };

    return (
        <Fragment>
            <MessageSuccess message="Archivo subido y guardado con éxito" open={openSuccess} onClose={() => setOpenSuccess(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            <ControlModal
                maxWidth="sm"
                open={openModal}
                onClose={() => { setOpenModal(false); setArchivoAdjunto(""); }}
                title={
                    <Fragment>
                        <Grid
                            container
                            spacing={2}
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center"
                        >
                            <Grid item>
                                <Typography variant="h3">Responder</Typography>
                            </Grid>

                            {archivoAdjunto !== "" ?
                                <Fragment>
                                    <Grid item>
                                        <AnimateButton>
                                            <Button variant="contained" size="medium" onClick={handleClick}>
                                                Guardar
                                            </Button>
                                        </AnimateButton>
                                    </Grid>

                                    <Grid item>
                                        <AnimateButton>
                                            <Button variant="outlined" color="error" size="medium" onClick={() => setArchivoAdjunto("")}>
                                                Remover Archivo
                                            </Button>
                                        </AnimateButton>
                                    </Grid>
                                </Fragment> : null
                            }
                        </Grid>
                    </Fragment>
                }
            >
                {archivoAdjunto === "" ? <Upload files={infoArchivoAdjunto} onDrop={handleDrop} /> : <ViewPDF dataPDF={archivoAdjunto} height={490} width={550} />}
            </ControlModal>

            <ControlModal
                maxWidth="sm"
                open={openModalView}
                onClose={() => { setOpenModalView(false); setArchivoConsulta(""); }}
                title="Vista de Archivo"
            >
                <ViewPDF dataPDF={archivoConsulta} height={490} width={550} />
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
                                <TableCell>{new Date(row?.fechaModifico).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    {row?.estado ?
                                        <Fragment>
                                            <Tooltip title={
                                                <>
                                                    <Typography variant="h5">{row?.usuarioModifico}</Typography>
                                                    <Typography variant="h5">{new Date(row?.fechaModifico).toLocaleDateString()}</Typography>
                                                </>
                                            }>
                                                <Chip label="Respondido" size="small" chipcolor="success" />
                                            </Tooltip>
                                        </Fragment>
                                        : <Chip label="Sin Respuesta" size="small" chipcolor="error" />
                                    }
                                </TableCell>

                                <TableCell>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <AnimateButton>
                                                <Tooltip disabled={row?.estado ? true : false} title="Subir Archivo"
                                                    onClick={() => { setIdVentanillaDetalle(row.id); setOpenModal(true); }}
                                                >
                                                    <IconButton size="small">
                                                        <FileUploadIcon sx={{ fontSize: '2rem' }} />
                                                    </IconButton>
                                                </Tooltip>
                                            </AnimateButton>
                                        </Grid>

                                        <Grid item xs={6}>
                                            <AnimateButton>
                                                <Tooltip disabled={!row?.estado ? true : false} title="Ver Archivo" onClick={() => handleClickView(row.id)}>
                                                    <IconButton size="small">
                                                        <VisibilityIcon sx={{ fontSize: '2rem' }} />
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