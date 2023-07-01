import ReactExport from 'react-export-excel';
import { useState } from 'react';
import { Grid, Button } from '@mui/material';
import { ViewFormatMesDiaAnio } from 'components/helpers/Format';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { ParametrosExcel } from 'formatdata/ParametrosForm';
import { GetExcelWorkAbsenteeism, GetExcelWorkAbsenteeismHistory } from 'api/clients/WorkAbsenteeismClient';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const AusentismoExport = ({ sede, fechaInicio, fechaFin, ausentismo = 0, documento = '', opcionFiltro }) => {
    const [lsData, setLsData] = useState([]);
    const [statusData, setStatusData] = useState(false);

    async function getDataForExport() {
        try {
            const parametros = ParametrosExcel(sede, fechaInicio, fechaFin, documento, opcionFiltro);


            if (ausentismo === 0) {
                const lsServerExcelNuevo = await GetExcelWorkAbsenteeism(parametros);

                if (lsServerExcelNuevo.status === 200) {
                    setLsData(lsServerExcelNuevo.data);
                    setStatusData(true);
                }
            } else {
                const lsServerExcelHistorico = await GetExcelWorkAbsenteeismHistory(parametros);

                if (lsServerExcelHistorico.status === 200) {
                    setLsData(lsServerExcelHistorico.data);
                    setStatusData(true);
                }
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
                                <Button onClick={getDataForExport} size="large" variant="contained" fullWidth>
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
                                } filename="Ausentismo Laboral">
                                    <ExcelSheet data={lsData} name="Lista de Ausentismo Laboral">
                                        <ExcelColumn label="ID" value="idEmpleado" />
                                        <ExcelColumn label="Cedula" value="documento" />
                                        <ExcelColumn label="Nombre" value="nombre" />
                                        <ExcelColumn label="TipoEmpleado" value="tipoEmpleado" />
                                        <ExcelColumn label="Tipo_de_Nomina" value="tipoNomina" />
                                        <ExcelColumn label="Fecha_Inicio" value={(fe) => ViewFormatMesDiaAnio(fe.fechaInicio)} />
                                        <ExcelColumn label="Fecha_Fin" value={(fe) => ViewFormatMesDiaAnio(fe.fechaFin)} />
                                        <ExcelColumn label="Dias" value="diasSinLaborar" />
                                        <ExcelColumn label="Tipo_Soporte" value="tipoSoporte" />
                                        <ExcelColumn label="Categoria" value="categoria" />
                                        <ExcelColumn label="Comentario" value="observacion" />
                                        <ExcelColumn label="Usuario_Registro" value="usuarioRegistro" />
                                        <ExcelColumn label="Fecha_Registro" value={(fe) => ViewFormatMesDiaAnio(fe.fechaRegistro)} />
                                        <ExcelColumn label="Hora_Registro" value="horaRegistro" />

                                        {/* <ExcelColumn label="Departamento Residencia" value="departamentoResidencia" />
                                        <ExcelColumn label="Municipio Residencia" value="municipioResidencia" />
                                        <ExcelColumn label="Sede" value="sede" />
                                        <ExcelColumn label="Departamento" value="departamento" />
                                        <ExcelColumn label="Area" value="area" />
                                        <ExcelColumn label="Subarea" value="subarea" />
                                        <ExcelColumn label="Grupo" value="grupo" />
                                        <ExcelColumn label="General Position" value="generalPosition" />
                                        <ExcelColumn label="Genero" value="genero" />
                                        <ExcelColumn label="Eps" value="eps" />
                                        <ExcelColumn label="Afp" value="afp" />
                                        <ExcelColumn label="Turno" value="turno" />
                                        <ExcelColumn label="Empresa" value="empresa" />
                                        <ExcelColumn label="Fecha Expedición" value={(fe) => ViewFormatMesDiaAnio(fe.fechaExpedicion)} />
                                        <ExcelColumn label="Nro Incapacidad" value="nroIncapacidad" />
                                        <ExcelColumn label="Ciudad Expedición" value="ciudadExpedicion" />
                                        <ExcelColumn label="Tipo Incapacidad" value="tipoIncapacidad" />
                                        <ExcelColumn label="Contigencia" value="contigencia" />
                                        <ExcelColumn label="Estado Caso" value="estadoCaso" />
                                        <ExcelColumn label="Código Dx" value="cod_Dx" />
                                        <ExcelColumn label="Diagnostico" value="dx" />
                                        <ExcelColumn label="Segmento Agrupado" value="nameSegmentoAgrupado" />
                                        <ExcelColumn label="Segmento" value="segmento" />
                                        <ExcelColumn label="Ciudad" value="ciudad" />
                                        <ExcelColumn label="Nombre Profesional" value="nombreProfesional" />
                                        <ExcelColumn label="Especialidad" value="especialidad" />
                                        <ExcelColumn label="Registro Profesional" value="registroProfesional" />
                                        <ExcelColumn label="Tipo Atencion" value="tipoAtencion" />
                                        <ExcelColumn label="Cumplimiento Requisito" value="cumplimientoRequisito" />
                                        <ExcelColumn label="Regimen" value="regimen" />
                                        <ExcelColumn label="Usuario Modifica" value="usuarioModifica" />
                                        <ExcelColumn label="Fecha Modificación" value={(fe) => ViewFormatMesDiaAnio(fe.fechaModificación)} />
                                        <ExcelColumn label="Ips Expide" value="ipsExpide" /> */}
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

export default AusentismoExport;