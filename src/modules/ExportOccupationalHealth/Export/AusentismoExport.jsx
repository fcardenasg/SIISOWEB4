import { useState } from 'react';
import { Grid, Button } from '@mui/material';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { ParametrosExcel } from 'formatdata/ParametrosForm';
import { GetExcelWorkAbsenteeism, GetExcelWorkAbsenteeismHistory } from 'api/clients/WorkAbsenteeismClient';
import { Message } from 'components/helpers/Enums';
import { MessageError } from 'components/alert/AlertAll';
import { DownloadFile } from 'components/helpers/ConvertToBytes';

import ReactExport from 'react-export-excel';
import { ViewFormatMesDiaAnio } from 'components/helpers/Format';
import LoadingGenerate from 'components/loading/LoadingGenerate';

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
            const parametros = ParametrosExcel(sede, fechaInicio, fechaFin);

            if (fechaInicio !== null && fechaFin !== null) {
                setStatusData(false); setLoading(true);
                setLoading(true);

                if (tipoExcelAusentismo === 0) {
                    const lsServerExcel = await GetExcelWorkAbsenteeism(parametros);

                    if (lsServerExcel.status === 200) {
                        setLsData(lsServerExcel.data);
                        
                        setTimeout(() => {
                            setStatusData(true);
                            setLoading(false);
                        }, 1500);
                    }
                } else {
                    const lsServerExcel = await GetExcelWorkAbsenteeismHistory(parametros);

                    if (lsServerExcel.status === 200) {
                        DownloadFile(lsServerExcel.data.nombre, lsServerExcel.data.base64);

                        setTimeout(() => {
                            setStatusData(true);
                            setLoading(false);
                        }, 1000);
                    }
                }
            } else {
                setOpenError(true);
                setErrorMessage("Debe seleccionar un rango de fechas");
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
                                } filename={`Ausentismo${new Date().toLocaleString()}`}>
                                    {tipoExcelAusentismo === 0 ?
                                        <ExcelSheet data={lsData} name="Ausentismo Laboral">
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
                                        </ExcelSheet> : null
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