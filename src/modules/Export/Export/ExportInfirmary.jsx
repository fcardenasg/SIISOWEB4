import { useState } from 'react';
import ReactExport from 'react-export-excel';
import { Grid, Button } from '@mui/material';
import { GetEdad, FormatDate } from 'components/helpers/Format';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { GetAllNoteInfirmary } from 'api/clients/NoteInfirmaryClient';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const ExportInfirmary = ({ sede, atencion, fechaInicio, fechaFin }) => {
    const [lsData, setLsData] = useState([]);
    const [statusData, setStatusData] = useState(false);

    async function getDataForExport() {
        try {
            const lsDataExport = await GetAllNoteInfirmary(0, 0);
            if (lsDataExport.status === 200) {
                var result = [];

                if (sede === '' && atencion === '') {
                    result = lsDataExport.data.entities.filter(notaEnfer => FormatDate(notaEnfer.fecha) >= FormatDate(fechaInicio)
                        && FormatDate(notaEnfer.fecha) <= FormatDate(fechaFin)).map(datos => datos);

                    setLsData(result);
                }

                if (sede !== '' && atencion === '') {
                    result = lsDataExport.data.entities.filter(notaEnfer => FormatDate(notaEnfer.fecha) >= FormatDate(fechaInicio)
                        && FormatDate(notaEnfer.fecha) <= FormatDate(fechaFin) && notaEnfer.idSede === sede).map(datos => datos);

                    setLsData(result);
                }

                if (sede === '' && atencion !== '') {
                    result = lsDataExport.data.entities.filter(notaEnfer => FormatDate(notaEnfer.fecha) >= FormatDate(fechaInicio)
                        && FormatDate(notaEnfer.fecha) <= FormatDate(fechaFin) && notaEnfer.idTipoAtencion === atencion)
                        .map(datos => datos);

                    setLsData(result);
                }

                if (sede !== '' && atencion !== '') {
                    result = lsDataExport.data.entities.filter(notaEnfer => FormatDate(notaEnfer.fecha) >= FormatDate(fechaInicio)
                        && FormatDate(notaEnfer.fecha) <= FormatDate(fechaFin) && notaEnfer.idSede === sede &&
                        notaEnfer.idTipoAtencion === atencion).map(datos => datos);

                    setLsData(result);
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
                                } filename="NOTA ENFERMERÍA">
                                    <ExcelSheet data={lsData} name="Listado de Nota de Enfermería">
                                        <ExcelColumn label="Nro Atencion" value="id" />
                                        <ExcelColumn label="Fecha" value={(fe) => FormatDate(fe.fecha)} />
                                        <ExcelColumn label="Tipo Atención" value="nameTiAtencion" />
                                        <ExcelColumn label="Atención" value="nameAtencion" />
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
                                        <ExcelColumn label="Procedimientos" value="procedimientos" />
                                        <ExcelColumn label="Nota Enfermedad" value="notaEnfermedad" />
                                        <ExcelColumn label="Usuario Registro" value="usuarioRegistro" />
                                        <ExcelColumn label="Fecha Registro" value={(fe) => FormatDate(fe.fechaRegistro)} />
                                    </ExcelSheet>
                                </ExcelFile> : null
                            }
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={3.5} />
            </Grid>
        </Grid>
    );

}

export default ExportInfirmary;