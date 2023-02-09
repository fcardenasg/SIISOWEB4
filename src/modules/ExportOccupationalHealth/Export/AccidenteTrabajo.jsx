import { useState } from 'react';
import ReactExport from 'react-export-excel';
import { Grid, Button } from '@mui/material';
import { ViewFormat } from 'components/helpers/Format';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { ParametrosExcel } from 'formatdata/ParametrosForm';
import { GetExcelAccidentRate } from 'api/clients/AccidentRateClient';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const AccidenteTrabajo = ({ sede, fechaInicio, fechaFin }) => {
    const [lsData, setLsData] = useState([]);
    const [statusData, setStatusData] = useState(false);

    async function getDataForExport() {
        try {
            var validarSede = 0;
            if (sede === '') validarSede = 0;
            else validarSede = sede;

            const parametros = ParametrosExcel(validarSede, fechaInicio, fechaFin);
            const lsServerExcel = await GetExcelAccidentRate(parametros);

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
                                } filename="ACCIDENTE DE TRABAJO">
                                    <ExcelSheet data={lsData} name="Lista de AT">
                                        <ExcelColumn label="Fecha" value={(fe) => ViewFormat(fe.fecha)} />
                                        <ExcelColumn label="Empresa" value="empresa" />
                                        <ExcelColumn label="Tipo Contrato" value="tipoContrato" />
                                        <ExcelColumn label="Documento" value="documento" />
                                        <ExcelColumn label="Nombre" value="nombre" />
                                        <ExcelColumn label="Departamento" value="departamento" />
                                        <ExcelColumn label="Area" value="area" />
                                        <ExcelColumn label="Posicion" value="posicion" />
                                        <ExcelColumn label="Grupo" value="grupo" />
                                        <ExcelColumn label="Fecha Contrato" value={(fe) => ViewFormat(fe.fechaContrato)} />
                                        <ExcelColumn label="Eps" value="eps" />
                                        <ExcelColumn label="Ges" value="ges" />
                                        <ExcelColumn label="Sede" value="sede" />
                                        <ExcelColumn label="PayStatus" value="payStatus" />
                                        <ExcelColumn label="Segmento Agrupado" value="segmentoAgrupado" />
                                        <ExcelColumn label="Segmento" value="segmento" />
                                        <ExcelColumn label="SubTipo Consecutivo" value="subTipoConsecutivo" />
                                        <ExcelColumn label="Código Dx Inicial" value="codDxInicial" />
                                        <ExcelColumn label="Dx Inicial" value="dxInicial" />
                                        <ExcelColumn label="Código Dx Final" value="codDxFinal" />
                                        <ExcelColumn label="Dx Final" value="dxFinal" />
                                        <ExcelColumn label="Px" value="px" />
                                        <ExcelColumn label="Conducta Inicial" value="conductaInicial" />
                                        <ExcelColumn label="Conducta Fin" value="conductaFin" />
                                        <ExcelColumn label="Dias TW" value="diasTW" />
                                        <ExcelColumn label="Días Incapacidad" value="diasIncapacidad" />
                                        <ExcelColumn label="Clase" value="clase" />
                                        <ExcelColumn label="Causa" value="causa" />
                                        <ExcelColumn label="Seguimiento" value="seguimiento" />
                                        <ExcelColumn label="Remitido" value="remitido" />
                                        <ExcelColumn label="Usuario" value="usuario" />
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

export default AccidenteTrabajo;