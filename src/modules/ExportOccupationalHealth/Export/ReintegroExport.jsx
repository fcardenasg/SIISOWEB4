import { useState } from 'react';
import ReactExport from 'react-export-excel';
import { Grid, Button } from '@mui/material';
import { GetEdad, ViewFormat } from 'components/helpers/Format';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { ParametrosExcel } from 'formatdata/ParametrosForm';
import { GetExcelRefund } from 'api/clients/RefundClient';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const ReintegroExport = ({ sede, fechaInicio, fechaFin }) => {
    const [lsData, setLsData] = useState([]);
    const [statusData, setStatusData] = useState(false);

    async function getDataForExport() {
        try {
            const parametros = ParametrosExcel(sede, fechaInicio, fechaFin);
            const lsServerExcel = await GetExcelRefund(parametros);

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
                                } filename="REINTEGRO">
                                    <ExcelSheet data={lsData} name="Lista de Reintegro">
                                        <ExcelColumn label="Nro Documento" value="nroDocumento" />
                                        <ExcelColumn label="Nombre" value="nombre" />
                                        <ExcelColumn label="Edad" value={(fe) => GetEdad(fe.edad)} />
                                        <ExcelColumn label="Fecha Ingreso" value={(fe) => ViewFormat(fe.fechaIngreso)} />
                                        <ExcelColumn label="Antiguedad" value={(fe) => ViewFormat(fe.antiguedad)} />
                                        <ExcelColumn label="Sucursal" value="sucursal" />
                                        <ExcelColumn label="Dpto Actual" value="dptoActual" />
                                        <ExcelColumn label="Area Actual" value="areaActual" />
                                        <ExcelColumn label="Cargo Actual" value="cargoActual" />
                                        <ExcelColumn label="General Position" value="generalPosition" />
                                        <ExcelColumn label="Grupo Actual" value="grupoActual" />
                                        <ExcelColumn label="Pay Status" value="payStatus" />
                                        <ExcelColumn label="Ges" value="ges" />
                                        <ExcelColumn label="Estado Caso" value="estadoCaso" />
                                        <ExcelColumn label="Código DX 1" value="codDX1" />
                                        <ExcelColumn label="Diagnostico 1" value="diagnostico1" />
                                        <ExcelColumn label="Origen 1" value="origen1" />
                                        <ExcelColumn label="Diagnostico 2" value="diagnostico2" />
                                        <ExcelColumn label="Código DX 2" value="codDX2" />
                                        <ExcelColumn label="Origen 2" value="origen2" />
                                        <ExcelColumn label="Estado Actual" value="estadoActual" />
                                        <ExcelColumn label="Tipo Restricción" value="tipoRestriccion" />
                                        <ExcelColumn label="Fecha Inicio Restricción" value={(fe) => ViewFormat(fe.fechaInicioRestricciones)} />
                                        <ExcelColumn label="Fecha Final Restricción" value={(fe) => ViewFormat(fe.fechaFinalRestricciones)} />
                                        <ExcelColumn label="Días Restringidos" value="diasRestringidos" />
                                        <ExcelColumn label="Estado Restricción" value="estadoRestriccion" />
                                        <ExcelColumn label="Ordenado Por" value="ordenadoPor" />
                                        <ExcelColumn label="Medico DLTD" value="medicoDLTD" />
                                        <ExcelColumn label="PCL" value="pcl" />
                                        <ExcelColumn label="Inicio Reubicación" value={(fe) => ViewFormat(fe.inicioReubicacion)} />
                                        <ExcelColumn label="Fin Reubicación" value={(fe) => ViewFormat(fe.finReubicacion)} />
                                        <ExcelColumn label="Concepto Reintegro Ocupacional" value="conceptoReintegroOcupacional" />
                                        <ExcelColumn label="Tipo Reducción" value="tipoReduccion" />
                                        <ExcelColumn label="Ordenada Por" value="ordenadaPorSinHorario" />
                                        <ExcelColumn label="Fecha Inicio Reducción" value={(fe) => ViewFormat(fe.fechaInicioReduccion)} />
                                        <ExcelColumn label="Fecha Fin Reducción" value={(fe) => ViewFormat(fe.fechaFinReduccion)} />
                                        <ExcelColumn label="Fecha Sistema" value={(fe) => ViewFormat(fe.fechaSistema)} />
                                        <ExcelColumn label="Usuario" value="usuario" />
                                        <ExcelColumn label="Funciones" value="funciones" />
                                        <ExcelColumn label="Observación DX" value="observacionDX" />
                                        <ExcelColumn label="Recomendaciones" value="recomendaciones" />
                                    </ExcelSheet>
                                </ExcelFile> : null
                            }
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={0} md={3.5} />
            </Grid>
        </Grid>
    );

}

export default ReintegroExport;