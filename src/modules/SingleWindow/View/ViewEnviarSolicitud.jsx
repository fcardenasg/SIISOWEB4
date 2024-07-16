import { Fragment, useEffect, useState } from "react";
import { Button, Divider, Grid, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { MessageError, MessageSuccess } from "components/alert/AlertAll";

import { CodCatalogo } from "components/helpers/Enums";
import { GetByIdVentanillaUnica, UpdateVentanillaUnicaEnvio } from "api/clients/VentanillaUnicaClient";
import { FormProvider, useForm } from "react-hook-form";
import InputSelect from "components/input/InputSelect";
import InputText from "components/input/InputText";
import Cargando from "components/loading/Cargando";
import useAuth from "hooks/useAuth";
import { GetByTipoCatalogoCombo } from "api/clients/CatalogClient";
import AnimateButton from "ui-component/extended/AnimateButton";
import ViewMail from "./ViewMail";
import ControlModal from "components/controllers/ControlModal";
import ListReplay from "./ListReplay";
import FullScreenDialog from "components/controllers/FullScreenDialog";
import ListIndexNotes from "components/template/ListIndexNotes";
import ViewPDF from "components/components/ViewPDF";
import { generateReportGuiaEnvio } from "./Reportes";

const ViewEnviarSolicitud = ({ idVentanilla }) => {
    const { user } = useAuth();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [lsData, setLsData] = useState(null);
    const [lsMedioIngreso, setLsMedioIngreso] = useState([]);
    const [lsEmpresaMensajeria, setLsEmpresaMensajeria] = useState([]);

    const [dataPDF, setDataPDF] = useState(null);
    const [openModalApuntes, setOpenModalApuntes] = useState(false);
    const [openReport, setOpenReport] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const methods = useForm();
    const { handleSubmit, formState: { errors } } = methods;

    useEffect(() => {
        async function getAll() {
            try {
                const lsServer = await GetByIdVentanillaUnica(idVentanilla);
                if (lsServer.status === 200) {
                    setLsData(lsServer.data);
                }

                const lsServerMedioIngreso = await GetByTipoCatalogoCombo(CodCatalogo.VentanillaMedioIngreso);
                setLsMedioIngreso(lsServerMedioIngreso.data);

                const lsServerEmpresaMensajeria = await GetByTipoCatalogoCombo(CodCatalogo.VentanillaEmpresaMensajeria);
                setLsEmpresaMensajeria(lsServerEmpresaMensajeria.data);
            } catch (error) { }
        }

        getAll();
    }, [idVentanilla]);

    const handleClick = async (datos) => {
        try {
            datos.id = idVentanilla;
            datos.usuarioModifico = user?.nameuser;

            const result = await UpdateVentanillaUnicaEnvio(datos);
            if (result.status === 200) {
                if (result.data) {
                    setTimeout(() => {
                        setOpenSuccess(true);
                        lsData.descripcionEnvio = datos.descripcionEnvio;
                    }, 500);
                } else {
                    setOpenError(true);
                    setErrorMessage("No se pudo enviar el correo");
                }
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage("No se pudo guardar el registro");
        }
    };

    const handleClickReport = async () => {
        try {
            setOpenReport(true);
            const dataPDFTwo = generateReportGuiaEnvio(lsData);
            setDataPDF(dataPDFTwo);
        } catch (error) {
            setOpenError(true);
            setErrorMessage(`${error}`);
        }
    };

    return (
        <Fragment>
            <MessageSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            <ControlModal
                title="Guía generada"
                open={openReport}
                onClose={() => setOpenReport(false)}
                maxWidth="sm"
            >
                <ViewPDF dataPDF={dataPDF} height={490} width={550} />
            </ControlModal>

            <ControlModal
                maxWidth="xl"
                open={openModal}
                onClose={() => setOpenModal(false)}
                title="Solicitudes atendidas"
            >
                <ListReplay idVentanilla={idVentanilla} options={1} monitoreo={true} />
            </ControlModal>

            <FullScreenDialog
                open={openModalApuntes}
                title="Apuntes de indexación"
                handleClose={() => setOpenModalApuntes(false)}
            >
                <ListIndexNotes />
            </FullScreenDialog>

            {lsData !== null ?
                <Fragment>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6} lg={3}>
                            <Grid container spacing={1}>
                                <Grid item>
                                    <Typography variant="h4">N° Radicado:</Typography>
                                </Grid>

                                <Grid item>
                                    <Typography variant="h5">{lsData?.numRadicado}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} md={6} lg={3}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="idMedioEnvio"
                                    defaultValue={lsData?.idMedioEnvio}
                                    label="Medio Envío"
                                    options={lsMedioIngreso}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.idMedioEnvio}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12} md={6} lg={3}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="idEmpresaMensajeria"
                                    defaultValue={lsData?.idEmpresaMensajeria}
                                    label="Empresa Mensajería"
                                    options={lsEmpresaMensajeria}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.idEmpresaMensajeria}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12} md={6} lg={3}>
                            <FormProvider {...methods}>
                                <InputText
                                    fullWidth
                                    name="numGuia"
                                    defaultValue={lsData?.numGuia}
                                    label="Número Guía"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.numGuia}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <Divider />
                        </Grid>

                        <Grid item xs={12} md={6} lg={4}>
                            <FormProvider {...methods}>
                                <InputText
                                    fullWidth
                                    name="solicitadoPor"
                                    defaultValue={lsData?.solicitadoPor}
                                    label="Solicitado Por"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.solicitadoPor}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12} md={6} lg={4}>
                            <FormProvider {...methods}>
                                <InputText
                                    fullWidth
                                    name="telefonoNotificion"
                                    defaultValue={lsData?.telefonoNotificion}
                                    label="Teléfono de Envío"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.telefonoNotificion}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12} md={6} lg={4}>
                            <FormProvider {...methods}>
                                <InputText
                                    fullWidth
                                    name="direccionSolicitante"
                                    defaultValue={lsData?.direccionSolicitante}
                                    label="Dirección de Envío"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.direccionSolicitante}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12} md={6} lg={4}>
                            <FormProvider {...methods}>
                                <InputText
                                    fullWidth
                                    name="ciudadEnvio"
                                    defaultValue={lsData?.ciudadEnvio}
                                    label="Ciudad de Envío"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.ciudadEnvio}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12} md={6} lg={4}>
                            <FormProvider {...methods}>
                                <InputText
                                    fullWidth
                                    name="correoSolicitante"
                                    defaultValue={lsData?.correoSolicitante}
                                    label="Correo Solicitante"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.correoSolicitante}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <FormProvider {...methods}>
                                <InputText
                                    multiline
                                    rows={8}
                                    fullWidth
                                    defaultValue={lsData?.descripcionEnvio}
                                    name="descripcionEnvio"
                                    label="Observación (Describir aquí los datos del remitentes para la generación de la guía)"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.descripcionEnvio}
                                />
                            </FormProvider>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} sx={{ pt: 2 }}>
                        <Grid item>
                            <AnimateButton>
                                <Button variant="contained" onClick={handleSubmit(handleClick)}>
                                    Guardar
                                </Button>
                            </AnimateButton>
                        </Grid>

                        <Grid item>
                            <AnimateButton>
                                <Button variant="contained" onClick={handleClickReport}>
                                    Generar Guía
                                </Button>
                            </AnimateButton>
                        </Grid>

                        <Grid item>
                            <AnimateButton>
                                <ViewMail lsData={lsData} />
                            </AnimateButton>
                        </Grid>

                        <Grid item>
                            <AnimateButton>
                                <Button variant="contained" onClick={() => setOpenModal(true)}>
                                    Ver solicitud atendida
                                </Button>
                            </AnimateButton>
                        </Grid>

                        <Grid item>
                            <AnimateButton>
                                <Button variant="contained" onClick={() => setOpenModalApuntes(true)}>
                                    Apuntes de indexación
                                </Button>
                            </AnimateButton>
                        </Grid>
                    </Grid>
                </Fragment> : <Cargando />
            }
        </Fragment>
    );
};

export default ViewEnviarSolicitud;