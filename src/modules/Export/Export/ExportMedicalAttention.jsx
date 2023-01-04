import { useState } from 'react';
import ReactExport from 'react-export-excel';
import { Grid, Button } from '@mui/material';
import { GetEdad, ViewFormat } from 'components/helpers/Format';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { GetAllMedicalHistory } from 'api/clients/MedicalHistoryClient';
import { GetAllEvolutionNote } from 'api/clients/EvolutionNoteClient';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const ExportMedicalAttention = ({ sede, atencion, fechaInicio, fechaFin }) => {
    const [lsDataHistory, setLsDataHistory] = useState([]);
    const [lsDataNote, setLsDataNote] = useState([]);
    const [statusData, setStatusData] = useState(false);

    async function getDataForExport() {
        try {
            const lsDataExportHistory = await GetAllMedicalHistory(0, 0);
            const lsDataExporNote = await GetAllEvolutionNote(0, 0);
            

            if (lsDataExportHistory.status === 200 && lsDataExporNote.status === 200) {
                var resultHistory = [];
                var resultNote = [];

                if (sede === '' && atencion === '') {
                    resultHistory = lsDataExportHistory.data.entities.filter(
                        atenMedica => ViewFormat(atenMedica.fecha) >= ViewFormat(fechaInicio)
                            && ViewFormat(atenMedica.fecha) <= ViewFormat(fechaFin))
                        .map(datos => datos);

                    resultNote = lsDataExporNote.data.entities.filter(
                        atenMedica => ViewFormat(atenMedica.fecha) >= ViewFormat(fechaInicio)
                            && ViewFormat(atenMedica.fecha) <= ViewFormat(fechaFin))
                        .map(datos => datos);

                    setLsDataNote(resultNote);
                    setLsDataHistory(resultHistory);
                }

                if (sede !== '' && atencion === '') {
                    resultHistory = lsDataExportHistory.data.entities.filter(
                        atenMedica => ViewFormat(atenMedica.fecha) >= ViewFormat(fechaInicio)
                            && ViewFormat(atenMedica.fecha) <= ViewFormat(fechaFin) && atenMedica.idSede === sede)
                        .map(datos => datos);

                    resultNote = lsDataExporNote.data.entities.filter(
                        atenMedica => ViewFormat(atenMedica.fecha) >= ViewFormat(fechaInicio)
                            && ViewFormat(atenMedica.fecha) <= ViewFormat(fechaFin) && atenMedica.idSede === sede)
                        .map(datos => datos);

                    setLsDataNote(resultNote);
                    setLsDataHistory(resultHistory);
                }

                if (sede === '' && atencion !== '') {
                    resultHistory = lsDataExportHistory.data.entities.filter(
                        atenMedica => ViewFormat(atenMedica.fecha) >= ViewFormat(fechaInicio)
                            && ViewFormat(atenMedica.fecha) <= ViewFormat(fechaFin) && atenMedica.idAtencion === atencion)
                        .map(datos => datos);

                    resultNote = lsDataExporNote.data.entities.filter(
                        atenMedica => ViewFormat(atenMedica.fecha) >= ViewFormat(fechaInicio)
                            && ViewFormat(atenMedica.fecha) <= ViewFormat(fechaFin) && atenMedica.idAtencion === atencion)
                        .map(datos => datos);

                    setLsDataNote(resultNote);
                    setLsDataHistory(resultHistory);
                }

                if (sede !== '' && atencion !== '') {
                    resultHistory = lsDataExportHistory.data.entities.filter
                        (atenMedica => ViewFormat(atenMedica.fecha) >= ViewFormat(fechaInicio)
                            && ViewFormat(atenMedica.fecha) <= ViewFormat(fechaFin) && atenMedica.idSede === sede &&
                            atenMedica.idAtencion === atencion)
                        .map(datos => datos);

                    resultNote = lsDataExporNote.data.entities.filter
                        (atenMedica => ViewFormat(atenMedica.fecha) >= ViewFormat(fechaInicio)
                            && ViewFormat(atenMedica.fecha) <= ViewFormat(fechaFin) && atenMedica.idSede === sede &&
                            atenMedica.idAtencion === atencion)
                        .map(datos => datos);

                    setLsDataNote(resultNote);
                    setLsDataHistory(resultHistory);
                }

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
                                } filename="LISTADO DE HISTORIA CLÍNICA">
                                    <ExcelSheet data={lsDataHistory} name="Historia Clínica">
                                        <ExcelColumn label="Nro Atencion" value="id" />
                                        <ExcelColumn label="Fecha" value={(fe) => ViewFormat(fe.fecha)} />
                                        <ExcelColumn label="Atención" value="nameAtencion" />
                                        <ExcelColumn label="Tipo Atención" value="nameTiAtencion" />
                                        <ExcelColumn label="Contingencia" value="nameContingencia" />  
                                        <ExcelColumn label="Documento" value="documento" />
                                        <ExcelColumn label="Nombre" value="nameEmpleado" />
                                        <ExcelColumn label="Genero" value="nameGenero" />
                                        <ExcelColumn label="Motivo" value="nameMotivo" />
                                        <ExcelColumn label="Edad" value={(fe) => GetEdad(fe.fechaNacimi)} />
                                        <ExcelColumn label="EPS" value="nameEps" />
                                        <ExcelColumn label="Sede Atención" value="nameSede" />
                                        <ExcelColumn label="Empresa" value="nameEmpresa" />   
                                        <ExcelColumn label="Tipo Contrato" value="nameTipoContrato" />
                                        <ExcelColumn label="Departamento" value="nameDepartamento" />
                                        <ExcelColumn label="Area" value="nameArea" />
                                        <ExcelColumn label="Roster Position" value="nameCargo" />
                                        <ExcelColumn label="General Position" value="nameGeneralPosition" />
                                        <ExcelColumn label="Grupo" value="nameGrupo" />                                                  
                                        <ExcelColumn label="Nombre Dx1" value="nameDx1" />                          
                                        <ExcelColumn label="Nombre Dx2" value="nameDx2" />               
                                        <ExcelColumn label="Nombre Dx3" value="nameDx3" />
                                        <ExcelColumn label="Concepto" value="nameConceptoActitud" />
                                        <ExcelColumn label="Enfermedad Actual" value="enfermedadActual" />
                                        <ExcelColumn label="Usuario Registro" value="usuarioRegistro" />
                                        <ExcelColumn label="Fecha Registro" value={(fe) => ViewFormat(fe.fechaRegistro)} />
                                    </ExcelSheet>

                                    <ExcelSheet data={lsDataNote} name="Nota de Evolución">
                                    <ExcelColumn label="Nro Atencion" value="id" />
                                        <ExcelColumn label="Fecha" value={(fe) => ViewFormat(fe.fecha)} />
                                        <ExcelColumn label="Atención" value="nameAtencion" />
                                        <ExcelColumn label="Documento" value="documento" />
                                        <ExcelColumn label="Nombre" value="nameEmpleado" />
                                        <ExcelColumn label="Genero" value="nameGenero" />
                                        <ExcelColumn label="Motivo" value="nameMotivo" />
                                        <ExcelColumn label="Edad" value={(fe) => GetEdad(fe.fechaNacimi)} />
                                        <ExcelColumn label="EPS" value="nameEps" />
                                        <ExcelColumn label="Sede Atención" value="nameSede" />
                                        <ExcelColumn label="Tipo Atención" value="nameTiAtencion" />
                                        <ExcelColumn label="Empresa" value="nameEmpresa" />   
                                        <ExcelColumn label="Tipo Contrato" value="nameTipoContrato" />
                                        <ExcelColumn label="Departamento" value="nameDepartamento" />
                                        <ExcelColumn label="Area" value="nameArea" />
                                        <ExcelColumn label="Roster Position" value="nameCargo" />
                                        <ExcelColumn label="General Position" value="nameGeneralPosition" />
                                        <ExcelColumn label="Grupo" value="nameGrupo" />               
                                        <ExcelColumn label="Contingencia" value="nameContingencia" />                                     
                                        <ExcelColumn label="Nombre Dx1" value="nameDx1" />                          
                                        <ExcelColumn label="Nombre Dx2" value="nameDx2" />               
                                        <ExcelColumn label="Nombre Dx3" value="nameDx3" />
                                        <ExcelColumn label="Concepto" value="nameConceptoActitud" />
                                        <ExcelColumn label="Enfermedad Actual" value="enfermedadActual" />
                                        <ExcelColumn label="Usuario Registro" value="usuarioRegistro" />
                                        <ExcelColumn label="Fecha Registro" value={(fe) => ViewFormat(fe.fechaRegistro)} />

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

export default ExportMedicalAttention;