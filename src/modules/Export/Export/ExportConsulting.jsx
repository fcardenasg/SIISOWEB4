import { useState } from 'react';
import ReactExport from 'react-export-excel';
import { Grid, Button } from '@mui/material';
import { GetAllAdvice } from 'api/clients/AdviceClient';
import { ViewFormat, GetEdad } from 'components/helpers/Format';
import AnimateButton from 'ui-component/extended/AnimateButton';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const ExportConsulting = ({ sede, atencion, fechaInicio, fechaFin }) => {
    const [lsData, setLsData] = useState([]);
    const [statusData, setStatusData] = useState(false);

    async function getDataForExport() {
        try {
            const lsDataExport = await GetAllAdvice(0, 0);
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
                        && ViewFormat(asesoria.fecha) <= ViewFormat(fechaFin) && asesoria.idTipoAtencion === atencion).map(datos => datos);
                    setLsData(result);
                }

                if (sede !== '' && atencion !== '') {
                    result = lsDataExport.data.entities.filter(asesoria => ViewFormat(asesoria.fecha) >= ViewFormat(fechaInicio)
                        && ViewFormat(asesoria.fecha) <= ViewFormat(fechaFin) && asesoria.idSede === sede &&
                        asesoria.idTipoAtencion === atencion).map(datos => datos);
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
                                } filename="ASESORÍAS">
                                    <ExcelSheet data={lsData} name="Listado de Asesorías">
                                        <ExcelColumn label="Nro Atencion" value="id" />
                                        <ExcelColumn label="Fecha" value={(fe) => ViewFormat(fe.fecha)} />
                                        <ExcelColumn label="Documento" value="documento" />
                                        <ExcelColumn label="Nombre" value="nameEmpleado" />
                                        <ExcelColumn label="Tipo Atención" value="nameTiAtencion" />
                                        <ExcelColumn label="Edad" value={(fe) => GetEdad(fe.fechaNacimi)} />
                                        <ExcelColumn label="Tipo Contrato" value="nameTipoContrato" />
                                        <ExcelColumn label="Departamento" value="nameDepartamento" />
                                        <ExcelColumn label="Area" value="nameArea" />
                                        <ExcelColumn label="Roster Position" value="nameCargo" />
                                        <ExcelColumn label="General Position" value="nameGeneralPosition" />
                                        <ExcelColumn label="Grupo" value="nameGrupo" />
                                        <ExcelColumn label="EPS" value="nameEps" />
                                        <ExcelColumn label="Genero" value="nameGenero" />
                                        <ExcelColumn label="Empresa" value="nameEmpresa" />
                                        <ExcelColumn label="Motivo" value="nameMotivo" />
                                        <ExcelColumn label="Sede Atención" value="nameSede" />
                                        <ExcelColumn label="Tipo Asesoría" value="nameTipoAsesoria" />
                                        <ExcelColumn label="Descripción" value="motivo" />
                                        <ExcelColumn label="Recomendaciones" value="recomendaciones" />
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

export default ExportConsulting;