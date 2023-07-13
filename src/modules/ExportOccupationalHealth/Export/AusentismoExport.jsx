import { Fragment, useState } from 'react';
import ReactExport from 'react-export-excel';
import { Grid, Button } from '@mui/material';
import { ViewFormat, ViewFormatMesDiaAnio } from 'components/helpers/Format';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { ParametrosExcel } from 'formatdata/ParametrosForm';
import { GetExcelWorkAbsenteeism } from 'api/clients/WorkAbsenteeismClient';
import LoadingGenerate from 'components/loading/LoadingGenerate';
import { Message } from 'components/helpers/Enums';
import { MessageError } from 'components/alert/AlertAll';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const AusentismoExport = ({ sede, fechaInicio, fechaFin, tipoExcelAusentismo }) => {
    const [lsData, setLsData] = useState([]);
    const [statusData, setStatusData] = useState(false);

    const [loading, setLoading] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    async function getDataForExport() {
        try {
            setLoading(true);

            const parametros = ParametrosExcel(sede, fechaInicio, fechaFin);
            const lsServerExcel = await GetExcelWorkAbsenteeism(parametros);

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
                                } filename={`LISTA_DE_AUSENTISMO_${new Date().toLocaleString()}`}>
                                    {tipoExcelAusentismo === 0 ?
                                        <ExcelSheet data={lsData} name="Lista de Ausentismo Laboral">
                                            <ExcelColumn label="ID" value="idEmpleado" />
                                            <ExcelColumn label="Cedula" value="documento" />
                                            <ExcelColumn label="Nombre" value="nombres" />
                                            <ExcelColumn label="TipoEmpleado" value="nameTipoEmpleado" />
                                            <ExcelColumn label="Tipo_de_Nomina" value="nameTipoNomina" />
                                            <ExcelColumn label="Fecha_Inicio" value={(fe) => ViewFormatMesDiaAnio(fe.fechaInicio)} />
                                            <ExcelColumn label="Fecha_Fin" value={(fe) => ViewFormatMesDiaAnio(fe.fechaFin)} />
                                            <ExcelColumn label="Dias" value="diasSinLaborar" />
                                            <ExcelColumn label="Tipo_Soporte" value="nameIdTipoSoporte" />
                                            <ExcelColumn label="Categoria" value="nameIdCategoria" />
                                            <ExcelColumn label="Comentario" value="observacion" />
                                            <ExcelColumn label="Usuario_Registro" value="usuarioRegistro" />
                                            <ExcelColumn label="Fecha_Registro" value={(fe) => ViewFormatMesDiaAnio(fe.fechaRegistro)} />
                                            <ExcelColumn label="Hora_Registro" value="horaRegistro" />
                                        </ExcelSheet>
                                        :
                                        <ExcelSheet data={lsData} name="Lista de Ausentismo Laboral">
                                            <ExcelColumn label="Id" value="id" />
                                            <ExcelColumn label="Documento" value="documento" />
                                            <ExcelColumn label="Nombres" value="nombres" />
                                            <ExcelColumn label="Fecha De Nacimiento" value={(fe) => ViewFormat(fe.fechaNaci)} />
                                            <ExcelColumn label="Departamento" value="nameDepartamento" />
                                            <ExcelColumn label="Area" value="nameArea" />
                                            <ExcelColumn label="Grupo" value="nameGrupo" />
                                            <ExcelColumn label="Fecha De Contrato" value={(fe) => ViewFormat(fe.fechaContrato)} />
                                            <ExcelColumn label="Roster Position" value="nameRosterPosition" />
                                            <ExcelColumn label="General Position" value="nameGeneralPosition" />
                                            <ExcelColumn label="Genero" value="nameGenero" />
                                            <ExcelColumn label="Sede" value="nameSede" />
                                            <ExcelColumn label="Celular" value="celular" />
                                            <ExcelColumn label="Email" value="email" />
                                            <ExcelColumn label="Empresa" value="empresa" />
                                            <ExcelColumn label="Oficio" value="nameOficio" />
                                            <ExcelColumn label="Municipio De Nacimiento" value="nameMunicipioNacido" />

                                            <ExcelColumn label="Incapacidad" value="nameIncapacidad" />
                                            <ExcelColumn label="Nro Incapacidad" value="nroIncapacidad" />
                                            <ExcelColumn label="Fecha De Expedición" value={(fe) => ViewFormat(fe.fechaExpedicion)} />
                                            <ExcelColumn label="Departamento De Expedición" value="nameDepartamentoExpedicion" />
                                            <ExcelColumn label="Ciudad De Expedición" value="nameCiudadExpedicion" />
                                            <ExcelColumn label="Tipo Incapacidad" value="nameTipoIncapacidad" />
                                            <ExcelColumn label="Contingencia" value="nameContingencia" />
                                            <ExcelColumn label="Fecha Inicio" value={(fe) => ViewFormat(fe.fechaInicio)} />
                                            <ExcelColumn label="Fecha Fin" value={(fe) => ViewFormat(fe.fechaFin)} />
                                            <ExcelColumn label="Días Sin Laborar" value="diasSinLaborar" />
                                            <ExcelColumn label="Código Dx" value="dx" />
                                            <ExcelColumn label="Dx" value="nameDx" />
                                            <ExcelColumn label="Estado Caso" value="nameEstadoCaso" />
                                            <ExcelColumn label="Segmento Agrupado" value="nameSegmentoAgrupado" />
                                            <ExcelColumn label="Subsegmento" value="nameSubsegmento" />
                                            <ExcelColumn label="Tipo De Soporte" value="nameIdTipoSoporte" />
                                            <ExcelColumn label="Categoria" value="nameIdCategoria" />

                                            <ExcelColumn label="Departamento IPS" value="nameDepartamentoIPS" />
                                            <ExcelColumn label="Ciudad IPS" value="nameCiudadIPS" />
                                            <ExcelColumn label="Nombre Profesional" value="nombreProfesional" />
                                            <ExcelColumn label="Especialidad" value="especialidad" />
                                            <ExcelColumn label="RegistroProfesional" value="registroProfesional" />
                                            <ExcelColumn label="Tipo De Atención" value="nameTipoAtencion" />
                                            <ExcelColumn label="Cumplimiento De Requisito" value="nameCumplimientoRequisito" />
                                            <ExcelColumn label="Expide InCapacidad" value="nameExpideInCapacidad" />
                                            <ExcelColumn label="Observación Cumplimiento" value="observacionCumplimiento" />

                                            <ExcelColumn label="Usuario De Modificación" value="usuarioModificacion" />
                                            <ExcelColumn label="Fecha De Modificación" value={(fe) => ViewFormat(fe.fechaModificacion)} />
                                            <ExcelColumn label="Usuario Registro" value="usuarioRegistro" />
                                            <ExcelColumn label="Fecha Registro" value={(fe) => ViewFormat(fe.fechaRegistro)} />
                                            <ExcelColumn label="Tipo De Empleado" value="nameTipoEmpleado" />
                                            <ExcelColumn label="Tipo De Nomina" value="nameTipoNomina" />
                                            <ExcelColumn label="Fecha Confirmacion" value={(fe) => ViewFormat(fe.fechaConfirmacion)} />
                                            <ExcelColumn label="Usuario Confirma" value="usuarioConfirma" />
                                            <ExcelColumn label="Hora Registro" value="horaRegistro" />
                                        </ExcelSheet>
                                    }
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

export default AusentismoExport;