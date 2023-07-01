import { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import { Button, Grid, useMediaQuery } from "@mui/material";
import { GetExcelCabRegistration } from "api/clients/CabRegistrationClient";
import { GetByTipoCatalogoCombo } from "api/clients/CatalogClient";
import { ArrayTodaSede } from "components/Arrays";
import { CodCatalogo } from "components/helpers/Enums";
import InputDatePick from "components/input/InputDatePick";
import SelectOnChange from "components/input/SelectOnChange";
import { ParametrosExcel } from "formatdata/ParametrosForm";
import AnimateButton from "ui-component/extended/AnimateButton";
import ReactExport from "react-export-excel";
import { GetExcelAttention } from "api/clients/AttentionClient";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const ExcelRegistroAtencion = ({ setSede, sede, setFechaInicio, fechaInicio, setFechaFin, fechaFin }) => {
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [lsSede, setLsSede] = useState([]);
    const [lsDataExport, setLsDataExport] = useState([]);
    const [statusData, setStatusData] = useState(false);

    useEffect(() => {
        async function getAll() {
            try {
                const lsServerSede = await GetByTipoCatalogoCombo(CodCatalogo.Sede);
                const arraySede = lsServerSede.data.concat(ArrayTodaSede);
                setLsSede(arraySede);
            } catch (error) { }
        }

        getAll();
    }, []);

    async function getDataForExport() {
        try {
            const parametros = ParametrosExcel(sede, fechaInicio, fechaFin, undefined);
            const lsServerExcel = await GetExcelAttention(parametros);

            if (lsServerExcel.status === 200) {
                setLsDataExport(lsServerExcel.data);
                setStatusData(true);
            }

        } catch (error) { }
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <SelectOnChange
                    name="sede"
                    label="Sede de Atención"
                    value={sede}
                    options={lsSede}
                    onChange={(e) => setSede(e.target.value)}
                    size={matchesXS ? 'small' : 'medium'}
                />
            </Grid>

            <Grid item xs={6}>
                <InputDatePick
                    label="Fecha Inicio"
                    onChange={(e) => setFechaInicio(e.target.value)}
                    value={fechaInicio}
                    size={matchesXS ? 'small' : 'medium'}
                />
            </Grid>

            <Grid item xs={6}>
                <InputDatePick
                    label="Fecha Fin"
                    onChange={(e) => setFechaFin(e.target.value)}
                    value={fechaFin}
                    size={matchesXS ? 'small' : 'medium'}
                />
            </Grid>

            <Grid item xs={12} md={6}>
                <AnimateButton>
                    <Button onClick={getDataForExport} size="large" variant="contained" fullWidth>
                        Generar Exportación
                    </Button>
                </AnimateButton>
            </Grid>

            <Grid item xs={12} md={6}>
                {statusData ?
                    <ExcelFile element={
                        <AnimateButton>
                            <Button onClick={() => setStatusData(false)} size="large" variant="outlined" fullWidth>
                                Descargar Excel
                            </Button>
                        </AnimateButton>
                    } filename={`LISTA_DE_REGISTRO_ATENCIÓN_${new Date().toLocaleString()}`}>
                        <ExcelSheet data={lsDataExport} name="Registro De Atención">
                            <ExcelColumn label="Documento" value="documento" />
                            <ExcelColumn label="Documento" value="documento" />
                            <ExcelColumn label="Documento" value="documento" />
                            <ExcelColumn label="Documento" value="documento" />
                            <ExcelColumn label="Documento" value="documento" />
                        </ExcelSheet>
                    </ExcelFile> : null
                }
            </Grid>
        </Grid>
    );
}

export default ExcelRegistroAtencion;