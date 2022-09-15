import { useState } from 'react';
import ReactExport from 'react-export-excel';
import { Grid, Button } from '@mui/material';
import { GetAllAdvice } from 'api/clients/AdviceClient';
import { ViewFormat } from 'components/helpers/Format';
import AnimateButton from 'ui-component/extended/AnimateButton';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const ExportInfirmary = ({ sede, atencion, fechaInicio, fechaFin }) => {
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
                        && ViewFormat(asesoria.fecha) <= ViewFormat(fechaFin) && asesoria.idSede === sede && asesoria.idTipoAtencion === atencion).map(datos => datos);
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
                                } filename="ASESORÍAS">
                                    <ExcelSheet data={lsData} name="Listado de Asesorías">
                                        <ExcelColumn label="ID" value="id" />
                                        <ExcelColumn label="Documento" value="documento" />
                                        <ExcelColumn label="Fecha" value={(fe) => ViewFormat(fe.fecha)} />
                                        <ExcelColumn label="Sede" value="idSede" />
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

export default ExportInfirmary;