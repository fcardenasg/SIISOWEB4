import { useTheme } from "@emotion/react";
import { Button, Grid, useMediaQuery } from "@mui/material";
import { GetAllByTipoCatalogo } from "api/clients/CatalogClient";
import { GetExcelRequests } from "api/clients/RequestsClient";
import { ArrayTodaSede } from "components/Arrays";
import ControlModal from "components/controllers/ControlModal";
import { CodCatalogo } from "components/helpers/Enums";
import { ViewFormat } from "components/helpers/Format";
import InputDatePick from "components/input/InputDatePick";
import SelectOnChange from "components/input/SelectOnChange";
import config from "config";
import { ParametrosExcel } from "formatdata/ParametrosForm";
import { useEffect, useState } from "react";
import { Fragment } from "react";
import ReactExport from "react-export-excel";
import AnimateButton from "ui-component/extended/AnimateButton";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const GenerateExcel = ({ setOpenModal, openModal }) => {
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [lsSede, setLsSede] = useState([]);
    const [sede, setSede] = useState(0);
    const [lsCabRegistration, setLsCabRegistration] = useState([]);

    const [statusData, setStatusData] = useState(false);
    const [fechaInicio, setFechaInicio] = useState(null);
    const [fechaFin, setFechaFin] = useState(null);

    async function getAll() {
        try {
            const lsServerSede = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Sede);
            var resultSede = lsServerSede.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));

            const arraySede = resultSede.concat(ArrayTodaSede);
            setLsSede(arraySede);
        } catch (error) { }
    }

    useEffect(() => {
        getAll();
    }, []);

    async function getDataForExport() {
        try {
            const parametros = ParametrosExcel(sede, fechaInicio, fechaFin);
            const lsServerExcel = await GetExcelRequests(parametros);

            if (lsServerExcel.status === 200) {
                setLsCabRegistration(lsServerExcel.data);
                setStatusData(true);
            }

        } catch (error) { }
    }

    const handleClose = () => {
        setSede(0);
        setOpenModal(false);
        setFechaInicio(null);
        setFechaFin(null);
    }

    return (
        <Fragment>
            <ControlModal
                title="Generar Excel"
                open={openModal}
                onClose={handleClose}
                maxWidth="xs"
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <SelectOnChange
                            name="sede"
                            label="Sede de Atención"
                            value={sede}
                            options={lsSede}
                            onChange={(e) => setSede(e.target.value)}
                            size={matchesXS ? 'small' : 'medium'}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <InputDatePick
                            label="Fecha Inicio"
                            onChange={(e) => setFechaInicio(e.target.value)}
                            value={fechaInicio}
                            size={matchesXS ? 'small' : 'medium'}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <InputDatePick
                            label="Fecha Fin"
                            onChange={(e) => setFechaFin(e.target.value)}
                            value={fechaFin}
                            size={matchesXS ? 'small' : 'medium'}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <AnimateButton>
                            <Button disabled={
                                fechaInicio === null ? true : fechaFin === null ? true : false
                            } onClick={getDataForExport} size="large" variant="contained" fullWidth>
                                Generar Exportación
                            </Button>
                        </AnimateButton>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        {statusData ?
                            <ExcelFile element={
                                <AnimateButton>
                                    <Button onClick={() => setStatusData(false)} size="large" variant="outlined" fullWidth>
                                        Descargar Excel
                                    </Button>
                                </AnimateButton>
                            } filename="LISTA DE REGISTRO DE TAXIS">
                                <ExcelSheet data={lsCabRegistration} name="Registro De Taxi">
                                    <ExcelColumn label="Id" value="id" />
                                    <ExcelColumn label="Documento" value="documento" />

                                    <ExcelColumn label="Nombre" value="nameEmpleado" />
                                    <ExcelColumn label="Sede" value="nameSede" />

                                    <ExcelColumn label={`Fecha que recibio D. ${config.typeDashboard}`} value={(fe) => ViewFormat(fe.fechaReciboDLTD)} />
                                    <ExcelColumn label={`Usuario que recibio en D. ${config.typeDashboard}`} value="usuarioReciboDLTD" />
                                    <ExcelColumn label="Fecha de recibido" value={(fe) => ViewFormat(fe.fechaRecibido)} />
                                    <ExcelColumn label="Fecha limite de respuesta" value={(fe) => ViewFormat(fe.fechaLimiteRespuesta)} />
                                    <ExcelColumn label="Dirección" value="direccion" />
                                    <ExcelColumn label="Correo" value="correo" />
                                    <ExcelColumn label="Telefono" value="telefono" />
                                    <ExcelColumn label="Observacion" value="observacion" />
                                    <ExcelColumn label="Cantidad de solicitudes" value="cantidadSolicitudes" />

                                    <ExcelColumn label="Fecha de entrega" value={(fe) => ViewFormat(fe.fechaEntrega)} />
                                    <ExcelColumn label="Metodo utilizado" value="metodoUtilizado" />
                                    <ExcelColumn label="Numero guía" value="numeroGuia" />
                                    <ExcelColumn label="Entidad del solicitante" value="entidadSolicitante" />
                                    <ExcelColumn label="Usuario que registro" value="usuarioRegistro" />
                                    <ExcelColumn label="Fecha de registro" value="fechaRegistro" />
                                    <ExcelColumn label="Usuario que modifico" value="usuarioModifico" />
                                    <ExcelColumn label="Fecha de modifico" value="fechaModifico" />
                                </ExcelSheet>
                            </ExcelFile> : null
                        }
                    </Grid>
                </Grid>
            </ControlModal>
        </Fragment>
    );
}

export default GenerateExcel;