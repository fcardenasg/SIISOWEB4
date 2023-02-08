import { useState } from 'react';
import ReactExport from 'react-export-excel';
import { Grid, Button } from '@mui/material';
import { ViewFormat } from 'components/helpers/Format';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { ParametrosExcel } from 'formatdata/ParametrosForm';
import { GetExcelOccupationalMedicine } from 'api/clients/OccupationalMedicineClient';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const MedicionaLaboralExport = ({ sede, fechaInicio, fechaFin }) => {
    const [lsData, setLsData] = useState([]);
    const [statusData, setStatusData] = useState(false);

    async function getDataForExport() {
        try {
            var validarSede = 0;
            if (sede === '') validarSede = 0;
            else validarSede = sede;

            const parametros = ParametrosExcel(validarSede, fechaInicio, fechaFin);
            const lsServerExcel = await GetExcelOccupationalMedicine(parametros);

            if (lsServerExcel.status === 200) {
                setLsData(lsServerExcel.data);
                setStatusData(true);
            }

        } catch (error) { }
    }

    return (
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <Grid container spacing={3}>
                <Grid item xs={0} md={3.5} />

                <Grid item xs={12} md={5} sx={{ textAlign: 'center' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <AnimateButton>
                                <Button disabled={
                                    fechaInicio === null ? true : fechaFin === null ? true : false
                                } onClick={getDataForExport} size="large" variant="contained" fullWidth>
                                    GENERAR EXPORTACIÓN
                                </Button>
                            </AnimateButton>
                        </Grid>

                        <Grid item xs={6}>
                            {statusData ?
                                <ExcelFile element={
                                    <AnimateButton>
                                        <Button onClick={() => setStatusData(false)} size="large" variant="outlined" fullWidth>
                                            DESCARGAR EXCEL
                                        </Button>
                                    </AnimateButton>
                                } filename="ACCIDENTE DE TRABAJO">
                                    <ExcelSheet data={lsData} name="Lista de AT">
                                        <ExcelColumn label="ID" value="id" />
                                        <ExcelColumn label="Documento" value="documento" />
                                        <ExcelColumn label="Nombre" value="nombre" />
                                        <ExcelColumn label="Fecha Nacimiento" value={(fe) => ViewFormat(fe.fechaNacimiento)} />
                                        <ExcelColumn label="Fecha Ingreso" value={(fe) => ViewFormat(fe.fechaIngreso)} />
                                        <ExcelColumn label="Antiguedad" value="antiguedad" />
                                        <ExcelColumn label="Sucursal" value="sucursal" />
                                        <ExcelColumn label="Dpto Actual" value="dptoActual" />
                                        <ExcelColumn label="Area Actual" value="areaActual" />
                                        <ExcelColumn label="Cargo Actual" value="cargoActual" />
                                        <ExcelColumn label="General Position" value="generalPosition" />
                                        <ExcelColumn label="Grupo Actual" value="grupoActual" />
                                        <ExcelColumn label="Pay Status" value="payStatus" />
                                        <ExcelColumn label="Eps" value="eps" />
                                        <ExcelColumn label="Fecha Atencion" value="fechaAtencion" />
                                        <ExcelColumn label="Situación Contractual" value="situacionContractual" />
                                        <ExcelColumn label="Resumen Caso" value="resumenCaso" />
                                        <ExcelColumn label="Situación Empleado" value="situacionEmpleado" />
                                        <ExcelColumn label="Codigo Dx" value="codigoDx" />
                                        <ExcelColumn label="Diagnostico" value="diagnostico" />
                                        <ExcelColumn label="Entidad Donde Envia" value="entidadDondeEnvia" />
                                        <ExcelColumn label="Entidad Que Motiva Envio" value="entidadQueMotivaEnvio" />
                                        <ExcelColumn label="Fecha Entrega" value="fechaEntrega" />
                                        <ExcelColumn label="Fecha Envio" value="fechaEnvio" />
                                        <ExcelColumn label="Segmento Agrupado" value="nameSegmentoAgrupado" />
                                        <ExcelColumn label="Segmento Afectado" value="nameSegmentoAfectado" />
                                        <ExcelColumn label="Subsegmento" value="nameSubsegmento" />
                                        <ExcelColumn label="Region" value="region" />
                                        <ExcelColumn label="Lateralidad" value="lateralidad" />
                                        <ExcelColumn label="Fecha Calificación Origen Eps" value="fechaCalificacionOrigenEps" />
                                        <ExcelColumn label="Nro Furel" value="nroFurel" />
                                        <ExcelColumn label="origen Eps" value="origenEps" />
                                        <ExcelColumn label="No Solicitud" value="noSolicitud" />
                                        <ExcelColumn label="Fecha Califica Origen ARL" value="fechaCalificaOrigenARL" />
                                        <ExcelColumn label="Origen ARL" value="origenARL" />
                                        <ExcelColumn label="Fecha Califica Origen JRC" value="fechaCalificaOrigenJRC" />
                                        <ExcelColumn label="Junta Califica" value="juntaCalifica" />
                                        <ExcelColumn label="No Dictamen JRC" value="noDictamenJRC" />
                                        <ExcelColumn label="OrigenJRC" value="origenJRC" />
                                        <ExcelColumn label="Controversia" value="controversia" />
                                        <ExcelColumn label="Conclusión" value="conclusion" />
                                        <ExcelColumn label="Fecha Califica Origen JNC" value="fechacalificaOrigenJNC" />
                                        <ExcelColumn label="No Dictamen JNC" value="noDictamenJNC" />
                                        <ExcelColumn label="Origen JNC" value="origenJNC" />
                                        <ExcelColumn label="Origen Final" value="origenFinal" />
                                        <ExcelColumn label="Fecha Estructuración Origen Final" value="fechaEstructuracionOrigenFinal" />
                                        <ExcelColumn label="Instancia Origen Final" value="instanciaOrigenFinal" />
                                        <ExcelColumn label="Junta ReCalificación JRC" value="juntaReCalificacionJRC" />
                                        <ExcelColumn label="Fecha Calificación PCL ARL" value="fechaCalificacionPCLARL" />
                                        <ExcelColumn label="Pcl ARL" value="pclARL" />
                                        <ExcelColumn label="Fecha Estructa ARL" value="fechaEstructaARL" />
                                        <ExcelColumn label="Fecha Calificación Pcl JRC" value="fechaCalificacionPclJRC" />
                                        <ExcelColumn label="No Dictamen Pcl JRC" value="nodictamenPclJRC" />
                                        <ExcelColumn label="Pcl JRC" value="pclJRC" />
                                        <ExcelColumn label="Fecha Estructa JRC" value="fechaEstructaJRC" />
                                        <ExcelColumn label="Fecha Calificación Pcl JNC" value="fechaCalificacionPclJNC" />
                                        <ExcelColumn label="No Dictamen Pcl JNC" value="noDictamenPclJNC" />
                                        <ExcelColumn label="Pcl JNC" value="pclJNC" />
                                        <ExcelColumn label="Fecha Estructura JNC" value="fechaestructuraJNC" />
                                        <ExcelColumn label="Pcl Final" value="pclFinal" />
                                        <ExcelColumn label="Instancia Final" value="instanciaFinal" />
                                        <ExcelColumn label="Fecha Calificación Pcl Final" value="fechaCalificacionPclFinal" />
                                        <ExcelColumn label="Fecha Estructuración Pcl Final" value="fechaEstructuracionPclFinal" />
                                        <ExcelColumn label="Indemnizado" value="indemnizado" />



                                        <ExcelColumn label="fechaPago" value="fechaPago" />
                                        <ExcelColumn label="entregadoMin" value="entregadoMin" />
                                        <ExcelColumn label="fechaRecalificacionpclARL" value="fechaRecalificacionpclARL" />
                                        <ExcelColumn label="pclRecalificadaARL" value="pclRecalificadaARL" />
                                        <ExcelColumn label="fechaEstructaRecalificionPclARL" value="fechaEstructaRecalificionPclARL" />
                                        <ExcelColumn label="fechaRecalificacionPclJRC" value="fechaRecalificacionPclJRC" />
                                        <ExcelColumn label="noDictamenRecalificacionJRC" value="noDictamenRecalificacionJRC" />
                                        <ExcelColumn label="pclRecalificacionJRC" value="pclRecalificacionJRC" />
                                        <ExcelColumn label="fechaEstructuracionPclRecalificadaJRC" value="fechaEstructuracionPclRecalificadaJRC" />
                                        <ExcelColumn label="fechaRecalificacionPclJNC" value="fechaRecalificacionPclJNC" />
                                        <ExcelColumn label="noDictamenRecalificacionJNC" value="noDictamenRecalificacionJNC" />
                                        <ExcelColumn label="fechaEstructuracionPclRecalificadaJRC2" value="fechaEstructuracionPclRecalificadaJRC2" />
                                        <ExcelColumn label="pclRecalificadaJNC" value="pclRecalificadaJNC" />
                                        <ExcelColumn label="indemnizadoRecalificado" value="indemnizadoRecalificado" />
                                        <ExcelColumn label="fechaPagoRecalificado" value="fechaPagoRecalificado" />
                                        <ExcelColumn label="investigado" value="investigado" />
                                        <ExcelColumn label="usuario" value="usuario" />
                                        <ExcelColumn label="observaciones" value="observaciones" />
                                    </ExcelSheet>
                                </ExcelFile> : ''
                            }
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={0} md={3.5} />
            </Grid>
        </Grid>
    );

}

export default MedicionaLaboralExport;