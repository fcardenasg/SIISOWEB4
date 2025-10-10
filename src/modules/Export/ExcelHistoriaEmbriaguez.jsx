import { useTheme } from "@emotion/react";
import { Button, Grid, useMediaQuery } from "@mui/material";
import { GetByTipoCatalogoCombo } from "api/clients/CatalogClient";
import { GetExcelHistoryDrunkenness } from "api/clients/HistoryDrunkenness";
import { GetExcelParaclinics } from "api/clients/ParaclinicsClient";
import { ArrayTodaSede } from "components/Arrays";
import { DownloadFile } from "components/helpers/ConvertToBytes";
import { CodCatalogo, Message, TitleButton } from "components/helpers/Enums";
import InputDatePick from "components/input/InputDatePick";
import InputOnChange from "components/input/InputOnChange";
import SelectOnChange from "components/input/SelectOnChange";
import LoadingGenerate from "components/loading/LoadingGenerate";
import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import AnimateButton from "ui-component/extended/AnimateButton";

const lsTipoBusqueda = [
    { value: 0, label: 'DOCUMENTO' },
    { value: 1, label: 'SEDE' },
    { value: 2, label: 'SEDE Y RANGO DE FECHA' }
]

const ExcelHistoriaEmbriaguez = ({ setSede, sede, setFechaInicio, fechaInicio, setFechaFin, fechaFin,
    setOpcionBusqueda, opcionBusqueda, setDocumento, documento }) => {
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [lsSede, setLsSede] = useState([]);
    const [loading, setLoading] = useState(false);

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
            setLoading(true);

            const parametros = {
                opcionBusqueda: opcionBusqueda,
                sede: sede,
                fechaInicio: fechaInicio,
                fechaFin: fechaFin,
                documento: documento
            }

            const lsServerExcel = await GetExcelHistoryDrunkenness(parametros);
            console.log(lsServerExcel.data);
            if (lsServerExcel.data.exito) {
                DownloadFile(lsServerExcel.data.datos.nombre, lsServerExcel.data.datos.base64);

                setTimeout(() => {
                    setLoading(false);
                }, 500);

                toast.success("Excel generado correctamente");
            } else {
                setLoading(false);
                toast.error(lsServerExcel.data.mensaje);
            }
        } catch (error) {
            setLoading(false);
            toast.error(Message.ErrorExcel);
        }
    }

    return (
        <Fragment>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <SelectOnChange
                        name="busqueda"
                        label="Opción de Busqueda"
                        value={opcionBusqueda}
                        options={lsTipoBusqueda}
                        onChange={(e) => setOpcionBusqueda(e.target.value)}
                        size={matchesXS ? 'small' : 'medium'}
                    />
                </Grid>

                {(opcionBusqueda === 0) &&
                    <Grid item xs={12}>
                        <InputOnChange
                            fullWidth
                            type="number"
                            label="Documento"
                            onChange={(e) => setDocumento(e.target.value)}
                            value={documento}
                            size={matchesXS ? 'small' : 'medium'}
                        />
                    </Grid>
                }

                {(opcionBusqueda === 1) &&
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
                }

                {(opcionBusqueda === 2) &&
                    <Fragment>
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
                    </Fragment>
                }

                <Grid item xs={12}>
                    <AnimateButton>
                        <Button disabled={loading} onClick={getDataForExport} size="large" variant="contained" fullWidth>
                            {TitleButton.Excel}
                        </Button>
                    </AnimateButton>
                </Grid>

                {loading &&
                    <Grid item xs={12}>
                        <LoadingGenerate title="Generando Excel..." />
                    </Grid>
                }
            </Grid>
        </Fragment>
    );
}

export default ExcelHistoriaEmbriaguez;