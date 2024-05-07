import { Fragment, useEffect, useState } from "react";
import { Button, Divider, Grid, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { MessageError, MessageSuccess } from "components/alert/AlertAll";

import { CodCatalogo } from "components/helpers/Enums";
import ControlModal from "components/controllers/ControlModal";
import ViewPDF from "components/components/ViewPDF";

import { GetByIdVentanillaUnica, UpdateVentanillaUnicaEnvio } from "api/clients/VentanillaUnicaClient";
import { FormProvider, useForm } from "react-hook-form";
import InputSelect from "components/input/InputSelect";
import InputText from "components/input/InputText";
import Cargando from "components/loading/Cargando";
import useAuth from "hooks/useAuth";
import { GetByTipoCatalogoCombo } from "api/clients/CatalogClient";

const ViewEnviarSolicitud = ({ idVentanilla }) => {
    const { user } = useAuth();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [lsData, setLsData] = useState([]);
    const [lsMedioIngreso, setLsMedioIngreso] = useState([]);
    const [lsEmpresaMensajeria, setLsEmpresaMensajeria] = useState([]);

    const [archivoAdjunto, setArchivoAdjunto] = useState("");
    const [openError, setOpenError] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const methods = useForm();
    const { handleSubmit, formState: { errors }, reset } = methods;

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
            const DataToInsert = {
                id: idVentanilla,
                idMedioEnvio: datos.idMedioEnvio,
                idEmpresaMensajeria: datos.idEmpresaMensajeria,
                numGuia: datos.numGuia,
                solicitadoPor: datos.solicitadoPor,
                telefonoNotificion: datos.telefonoNotificion,
                direccionSolicitante: datos.direccionSolicitante,
                ciudadEnvio: datos.ciudadEnvio,
                correoSolicitante: datos.correoSolicitante,
                descripcionEnvio: datos.descripcionEnvio,
                usuarioModifico: user?.nameuser
            };

            const result = await UpdateVentanillaUnicaEnvio(DataToInsert);
            if (result.status === 200) {
                if (result.data) {
                    setTimeout(() => {
                        setOpenSuccess(true);
                        reset();
                    }, 500);

                    setOpenSuccess(true);
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

    return (
        <Fragment>
            <ControlModal
                maxWidth="sm"
                open={openModal}
                onClose={() => setOpenModal(false)}
                title="Vista del Archivo"
            >
                <ViewPDF dataPDF={archivoAdjunto} height={490} width={550} />
            </ControlModal>

            <MessageSuccess message="Archivo subido y guardado con éxito" open={openSuccess} onClose={() => setOpenSuccess(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            {lsData.length !== 0 ?
                <Fragment>
                    <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Grid container spacing={1}>
                                <Grid item>
                                    <Typography variant="h4">N° Radicado:</Typography>
                                </Grid>

                                <Grid item>
                                    <Typography variant="h5">{lsData?.numRadicado}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="idMedioEnvio"
                                    label="Medio Envío"
                                    options={lsMedioIngreso}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.idMedioEnvio}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormProvider {...methods}>
                                <InputSelect
                                    name="idEmpresaMensajeria"
                                    label="Empresa Mensajería"
                                    options={lsEmpresaMensajeria}
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.idEmpresaMensajeria}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormProvider {...methods}>
                                <InputText
                                    fullWidth
                                    name="numGuia"
                                    label="Número Guía"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.numGuia}
                                />
                            </FormProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <Divider />
                        </Grid>

                        <Grid item xs={12} md={6}>
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

                        <Grid item xs={12} md={6}>
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

                        <Grid item xs={12} md={6}>
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

                        <Grid item xs={12} md={6}>
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

                        <Grid item xs={12}>
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

                        <Grid item xs={11.8}>
                            <FormProvider {...methods}>
                                <InputText
                                    multiline
                                    rows={3}
                                    fullWidth
                                    name="descripcionEnvio"
                                    label="Observación"
                                    size={matchesXS ? 'small' : 'medium'}
                                    bug={errors.descripcionEnvio}
                                />
                            </FormProvider>
                        </Grid>
                    </Grid>

                    <Grid item xs={4} sx={{ pt: 2 }}>
                        <Button variant="contained" onClick={handleSubmit(handleClick)}>
                            Guardar
                        </Button>
                    </Grid>
                </Fragment> : <Cargando />
            }
        </Fragment>
    );
};

export default ViewEnviarSolicitud;