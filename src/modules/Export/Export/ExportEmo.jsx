import { useState } from 'react';
import ReactExport from 'react-export-excel';
import { Grid, Button } from '@mui/material';
import { GetAllAdvice } from 'api/clients/AdviceClient';
import { GetEdad, ViewFormat } from 'components/helpers/Format';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { GetAllOccupationalExamination } from 'api/clients/OccupationalExaminationClient';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const ExportConsulting = ({ sede, atencion, fechaInicio, fechaFin }) => {
    const [lsData, setLsData] = useState([]);
    const [statusData, setStatusData] = useState(false);

    async function getDataForExport() {
        try {
            const lsDataExport = await GetAllOccupationalExamination(0, 0);
            if (lsDataExport.status === 200) {
                var result = [];

                if (sede === '' && atencion === '') {
                    result = lsDataExport.data.entities.filter(asesoria => ViewFormat(asesoria.fecha) >= ViewFormat(fechaInicio)
                        && ViewFormat(asesoria.fecha) <= ViewFormat(fechaFin)).map(datos => datos);
                    setLsData(result);
                }

                if (sede !== '' && atencion === '') {
                    result = lsDataExport.data.entities.filter(asesoria => ViewFormat(asesoria.fecha) >= ViewFormat(fechaInicio)
                        && ViewFormat(asesoria.fecha) <= ViewFormat(fechaFin) && asesoria.idSede === sede).map(datos => datos);
                    setLsData(result);
                }

                if (sede === '' && atencion !== '') {
                    result = lsDataExport.data.entities.filter(asesoria => ViewFormat(asesoria.fecha) >= ViewFormat(fechaInicio)
                        && ViewFormat(asesoria.fecha) <= ViewFormat(fechaFin) && asesoria.idAtencion === atencion).map(datos => datos);
                    setLsData(result);
                }

                if (sede !== '' && atencion !== '') {
                    result = lsDataExport.data.entities.filter(asesoria => ViewFormat(asesoria.fecha) >= ViewFormat(fechaInicio)
                        && ViewFormat(asesoria.fecha) <= ViewFormat(fechaFin) && asesoria.idSede === sede && asesoria.idAtencion === atencion).map(datos => datos);
                    setLsData(result);
                }

                console.log(result);
                setStatusData(true);
            }
        } catch (error) { }
    }

    return (
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <Grid container spacing={3}>
                <Grid item xs={3.5} />

                <Grid item xs={5} sx={{ textAlign: 'center' }}>
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
                                } filename="EMO">
                                    <ExcelSheet data={lsData} name="Listado de EMO">
                                        <ExcelColumn label="Nro Atencion" value="id" />
                                        <ExcelColumn label="Fecha" value={(fe) => ViewFormat(fe.fecha)} />
                                        <ExcelColumn label="Documento" value="documento" />
                                        <ExcelColumn label="Nombre" value="nameEmpleado" />
                                        <ExcelColumn label="Edad" value={(fe) => GetEdad(fe.fechaNacimiento)} />
                                        <ExcelColumn label="Tipo Contrato" value="nameTipoContrato" />
                                        <ExcelColumn label="Departamento" value="nameDepartamentoTrabajo" />
                                        <ExcelColumn label="Area" value="nameArea" />
                                        <ExcelColumn label="Roster Position" value="nameCargo" />
                                        <ExcelColumn label="General Position" value="namePosicion" />
                                        <ExcelColumn label="Grupo" value="nameGrupo" />
                                        <ExcelColumn label="EPS" value="nameEps" />
                                        <ExcelColumn label="Genero" value="nameGenero" />
                                        <ExcelColumn label="Empresa" value="nameEmpresa" />
                                        <ExcelColumn label="Cotingencia" value="" />
                                        <ExcelColumn label="Estado Caso" value="" />
                                        <ExcelColumn label="Estado Paciente" value="" />
                                        <ExcelColumn label="Turno" value="nameTurno" />
                                        <ExcelColumn label="Dia de Turno" value="" />
                                        <ExcelColumn label="Motivo" value="" />
                                        <ExcelColumn label="Conducta" value="" />
                                        <ExcelColumn label="Causa" value="" />
                                        <ExcelColumn label="Fecha Asesoría" value="" />
                                        <ExcelColumn label="Sede Atención" value="" />
                                        <ExcelColumn label="Tipo Asesoría" value="" />
                                        <ExcelColumn label="Descripción" value="" />
                                        <ExcelColumn label="Recomendaciones" value="" />
                                        <ExcelColumn label="Usuario Registro" value="usuarioRegistro" />
                                        <ExcelColumn label="Fecha Registro" value="fechaRegistro" />
                                        <ExcelColumn label="Usuario Asesoria" value="" />
                                        <ExcelColumn label="Fecha Digitacion" value="" />
                                    </ExcelSheet>
                                </ExcelFile> : ''
                            }
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={3.5} />
            </Grid>
        </Grid>
    );

}

export default ExportConsulting;