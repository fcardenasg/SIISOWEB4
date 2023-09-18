import { useState } from 'react';
import ReactExport from 'react-export-excel';
import { Grid, Button } from '@mui/material';
import { GetEdad } from 'components/helpers/Format';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { ParametrosExcel } from 'formatdata/ParametrosForm';
import { GetExcelOccupationalMedicine } from 'api/clients/OccupationalMedicineClient';
import LoadingGenerate from 'components/loading/LoadingGenerate';
import { MessageError } from 'components/alert/AlertAll';
import { Message } from 'components/helpers/Enums';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const MedicionaLaboralExport = ({ sede, fechaInicio, fechaFin }) => {
    const [lsData, setLsData] = useState([]);
    const [statusData, setStatusData] = useState(false);

    const [loading, setLoading] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    async function getDataForExport() {
        try {
            setStatusData(false); setLoading(true);

            const parametros = ParametrosExcel(sede, fechaInicio, fechaFin);
            const lsServerExcel = await GetExcelOccupationalMedicine(parametros);

            if (lsServerExcel.status === 200) {
                setLsData(lsServerExcel.data);
                setTimeout(() => {
                    setStatusData(true);
                    setLoading(false);
                }, 1500);
            }
        } catch (error) {
            setLoading(false);

            setOpenError(true);
            setErrorMessage(Message.ErrorExcel);
        }
    }

    return (
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            <Grid container spacing={3}>
                <Grid item xs={0} md={3.5} />

                <Grid item xs={12} md={5} sx={{ textAlign: 'center' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <AnimateButton>
                                <Button disabled={loading} onClick={getDataForExport} size="large" variant="contained" fullWidth>
                                    Generar Exportación
                                </Button>
                            </AnimateButton>
                        </Grid>

                        <Grid item xs={6}>
                            {statusData ?
                                <ExcelFile element={
                                    <AnimateButton>
                                        <Button onClick={() => setStatusData(false)} size="large" variant="outlined" fullWidth>
                                            Descargar Excel
                                        </Button>
                                    </AnimateButton>
                                } filename={`LISTA_DE_MEDICINA_LABORAL_${new Date().toLocaleString()}`}>
                                    <ExcelSheet data={lsData} name="Lista de Medicina Laboral">
                                        <ExcelColumn label="ID" value="id" />
                                        <ExcelColumn label="Documento" value="documento" />
                                        <ExcelColumn label="Nombre" value="nombre" />
                                        <ExcelColumn label="Fecha Nacimiento" value={(fe) => new Date(fe.fechaNacimiento)} />
                                        {/* <ExcelColumn label="Fecha Ingreso" value={(fe) => new Date(fe.fechaIngreso)} /> */}
                                        <ExcelColumn label="Antiguedad" value={(fe) => GetEdad(fe.antiguedad)} />
                                        <ExcelColumn label="Sucursal" value="sucursal" />
                                        <ExcelColumn label="Dpto Actual" value="dptoActual" />
                                        <ExcelColumn label="Area Actual" value="areaActual" />
                                        <ExcelColumn label="Cargo Actual" value="cargoActual" />
                                        <ExcelColumn label="General Position" value="generalPosition" />
                                        <ExcelColumn label="Grupo Actual" value="grupoActual" />
                                        <ExcelColumn label="Pay Status" value="payStatus" />
                                        <ExcelColumn label="Eps" value="eps" />
                                        <ExcelColumn label="Fecha Atencion" value={(fe) => new Date(fe.fechaAtencion)} />
                                        <ExcelColumn label="Situación Contractual" value="situacionContractual" />
                                        <ExcelColumn label="Resumen Caso" value="resumenCaso" />
                                        <ExcelColumn label="Situación Empleado" value="situacionEmpleado" />
                                        <ExcelColumn label="Código Dx" value="codigoDx" />
                                        <ExcelColumn label="Diagnostico" value="diagnostico" />
                                        <ExcelColumn label="Entidad Donde Envia" value="entidadDondeEnvia" />

                                        {/* <ExcelColumn label="Entidad Que Motiva Envio" value="entidadQueMotivaEnvio" />
                                        <ExcelColumn label="Fecha Entrega" value={(fe) => new Date(fe.fechaEntrega)} />
                                        <ExcelColumn label="Fecha Envio" value={(fe) => new Date(fe.fechaEnvio)} /> */}

                                        <ExcelColumn label="Segmento Agrupado" value="nameSegmentoAgrupado" />
                                        {/* <ExcelColumn label="Segmento Afectado" value="nameSegmentoAfectado" /> */}
                                        <ExcelColumn label="Subsegmento" value="nameSubsegmento" />
                                        <ExcelColumn label="Region" value="region" />
                                        <ExcelColumn label="Lateralidad" value="lateralidad" />
                                        <ExcelColumn label="Fecha Calificación Origen Eps" value={(fe) => new Date(fe.fechaCalificacionOrigenEps)} />
                                        <ExcelColumn label="Nro Furel" value="nroFurel" />
                                        <ExcelColumn label="origen Eps" value="origenEps" />
                                        <ExcelColumn label="No Solicitud" value="noSolicitud" />
                                        <ExcelColumn label="Fecha Califica Origen ARL" value={(fe) => new Date(fe.fechaCalificaOrigenARL)} />
                                        <ExcelColumn label="Origen ARL" value="origenARL" />
                                        <ExcelColumn label="Fecha Califica Origen JRC" value={(fe) => new Date(fe.fechaCalificaOrigenJRC)} />
                                        <ExcelColumn label="Junta Califica" value="juntaCalifica" />
                                        <ExcelColumn label="No Dictamen JRC" value="noDictamenJRC" />
                                        <ExcelColumn label="OrigenJRC" value="origenJRC" />
                                        {/* <ExcelColumn label="Controversia" value="controversia" /> */}
                                        <ExcelColumn label="Conclusión" value="conclusion" />
                                        <ExcelColumn label="Fecha Califica Origen JNC" value={(fe) => new Date(fe.fechacalificaOrigenJNC)} />
                                        <ExcelColumn label="No Dictamen JNC" value="noDictamenJNC" />
                                        <ExcelColumn label="Origen JNC" value="origenJNC" />
                                        <ExcelColumn label="Origen Final" value="origenFinal" />
                                        <ExcelColumn label="Fecha Estructuración Origen Final" value={(fe) => new Date(fe.fechaEstructuracionOrigenFinal)} />
                                        <ExcelColumn label="Instancia Origen Final" value="instanciaOrigenFinal" />
                                        <ExcelColumn label="Junta ReCalificación JRC" value="juntaReCalificacionJRC" />
                                        <ExcelColumn label="Fecha Calificación PCL ARL" value={(fe) => new Date(fe.fechaCalificacionPCLARL)} />
                                        <ExcelColumn label="Pcl ARL" value="pclARL" />
                                        <ExcelColumn label="Fecha Estructa ARL" value={(fe) => new Date(fe.fechaEstructaARL)} />
                                        <ExcelColumn label="Fecha Calificación Pcl JRC" value={(fe) => new Date(fe.fechaCalificacionPclJRC)} />
                                        <ExcelColumn label="No Dictamen Pcl JRC" value="nodictamenPclJRC" />
                                        {/* <ExcelColumn label="Pcl JRC" value="pclJRC" /> */}
                                        <ExcelColumn label="Fecha Estructa JRC" value={(fe) => new Date(fe.fechaEstructaJRC)} />
                                        <ExcelColumn label="Fecha Calificación Pcl JNC" value={(fe) => new Date(fe.fechaCalificacionPclJNC)} />
                                        <ExcelColumn label="No Dictamen Pcl JNC" value="noDictamenPclJNC" />
                                        <ExcelColumn label="Pcl JNC" value="pclJNC" />
                                        <ExcelColumn label="Fecha Estructura JNC" value={(fe) => new Date(fe.fechaestructuraJNC)} />
                                        <ExcelColumn label="Pcl Final" value="pclFinal" />
                                        <ExcelColumn label="Instancia Final" value="instanciaFinal" />

                                        <ExcelColumn label="Sala Calificadora" value="nameSalaCalificadoraJNC" />
                                        <ExcelColumn label="Médico Calificador" value="medicoCalificadorJNC" />

                                        {/* <ExcelColumn label="Fecha Calificación Pcl Final" value={(fe) => new Date(fe.fechaCalificacionPclFinal)} />
                                        <ExcelColumn label="Fecha Estructuración Pcl Final" value={(fe) => new Date(fe.fechaEstructuracionPclFinal)} />
                                        <ExcelColumn label="Indemnizado" value="indemnizado" />
                                        <ExcelColumn label="Fecha Pago" value={(fe) => new Date(fe.fechaPago)} />
                                        <ExcelColumn label="Entregado MIN" value="entregadoMin" /> */}
                                        <ExcelColumn label="Fecha Recalificacion Pcl ARL" value={(fe) => new Date(fe.fechaRecalificacionpclARL)} />
                                        <ExcelColumn label="Fecha Recalificación Pcl JRC" value={(fe) => new Date(fe.fechaRecalificacionPclJRC)} />

                                        <ExcelColumn label="Pcl Recalificada ARL" value="pclRecalificadaARL" />
                                        <ExcelColumn label="Fecha Estructa Recalifición Pcl ARL" value={(fe) => new Date(fe.fechaEstructaRecalificionPclARL)} />
                                        <ExcelColumn label="Fecha Estructuración Pcl Recalificada JRC" value={(fe) => new Date(fe.fechaEstructuracionPclRecalificadaJRC)} />


                                        {/* <ExcelColumn label="No Dictamen Recalificación JRC" value="noDictamenRecalificacionJRC" /> */}
                                        <ExcelColumn label="Pcl Recalificación JRC" value="pclRecalificacionJRC" />

                                        <ExcelColumn label="Fecha Recalificación Pcl JNC" value={(fe) => new Date(fe.fechaRecalificacionPclJNC)} />
                                        {/* <ExcelColumn label="No Dictamen Recalificación JNC" value="noDictamenRecalificacionJNC" /> */}
                                        <ExcelColumn label="Fecha Estructuración Pcl Recalificada JRC2" value={(fe) => new Date(fe.fechaEstructuracionPclRecalificadaJRC2)} />

                                        {/* <ExcelColumn label="Pcl Recalificada JNC" value="pclRecalificadaJNC" /> */}
                                        {/* <ExcelColumn label="Indemnizado Recalificado" value="indemnizadoRecalificado" /> */}
                                        {/* <ExcelColumn label="Fecha Pago Recalificado" value={(fe) => new Date(fe.fechaPagoRecalificado)} /> */}
                                        {/* <ExcelColumn label="Investigado" value="investigado" /> */}
                                        <ExcelColumn label="Usuario" value="usuario" />
                                        <ExcelColumn label="Observaciones" value="observaciones" />

                                        {/* <ExcelColumn label="Aplica" value="aplica" /> */}
                                        {/* <ExcelColumn label="Motivo Investigación Enfermedad Laboral" value="motivoIE" /> */}
                                        <ExcelColumn label="Estado Enfermedad Laboral" value="estadoEnfermedadLaboral" />
                                        <ExcelColumn label="Resultado Del Origen" value="resultadoOrigen" />
                                        {/* <ExcelColumn label="Fecha Calificación Última Instancia" value="fechaCalificacionUltimaInstancia" /> */}
                                        <ExcelColumn label="Fecha Investigación" value={(fe) => new Date(fe.fechaInvestigacion)} />
                                        <ExcelColumn label="Origen Investigación" value="origenInvestigacion" />
                                        <ExcelColumn label="Diferencia Día" value="diferenciaDia" />
                                        <ExcelColumn label="Resumen WR" value="resumenWR" />
                                        <ExcelColumn label="ACC Trabajador" value="accTrabajador" />
                                        <ExcelColumn label="Resumen SG" value="resumenSG" />
                                        <ExcelColumn label="ACC Sistema" value="accSistema" />
                                        <ExcelColumn label="Peligro Asociado Enfermedad" value="peligroAsociadoEnfermedad" />
                                        {/* <ExcelColumn label="Fecha Entrega Min" value={(fe) => new Date(fe.fechaEntregaMIN)} /> */}
                                    </ExcelSheet>
                                </ExcelFile> : loading ? <LoadingGenerate title="Generando..." /> : null
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