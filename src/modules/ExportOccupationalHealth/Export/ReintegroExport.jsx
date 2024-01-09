import { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import { Button, Grid, useMediaQuery } from "@mui/material";
import { GetByTipoCatalogoCombo } from "api/clients/CatalogClient";
import { ArrayTodaSede } from "components/Arrays";
import { CodCatalogo, Message, TitleButton } from "components/helpers/Enums";
import InputDatePick from "components/input/InputDatePick";
import SelectOnChange from "components/input/SelectOnChange";
import AnimateButton from "ui-component/extended/AnimateButton";
import { Fragment } from "react";
import { MessageError } from "components/alert/AlertAll";
import LoadingGenerate from "components/loading/LoadingGenerate";
import { DownloadFile } from "components/helpers/ConvertToBytes";
import InputOnChange from "components/input/InputOnChange";
import { GetExcelRefund } from 'api/clients/RefundClient';

const ReintegroExport = ({ setOpcionBusqueda, opcionBusqueda, setSede, sede, setDocumento, documento, parametroConsulta, tipoExcelAusentismo,
    setFechaInicio, fechaInicio, setFechaFin, fechaFin, lsBusqueda, lsTipoExcelAusentismo, setTipoExcelAusentismo }) => {
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [lsSede, setLsSede] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

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
                sede: sede,
                fechaInicio: fechaInicio,
                fechaFin: fechaFin,
                documento: documento,
                opcionBusqueda: opcionBusqueda,
                tipoExcelAusentismo: tipoExcelAusentismo
            }

            const lsServerExcel = await GetExcelRefund(parametros);

            if (lsServerExcel.status === 200) {
                DownloadFile(lsServerExcel.data.nombre, lsServerExcel.data.base64);

                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            }

        } catch (error) {
            setLoading(false);

            setOpenError(true);
            setErrorMessage(Message.ErrorExcel);
        }
    }

    return (
        <Fragment>
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <SelectOnChange
                        name="busqueda"
                        label="Opción de Busqueda"
                        value={opcionBusqueda}
                        options={lsBusqueda}
                        onChange={(e) => setOpcionBusqueda(e.target.value)}
                        size={matchesXS ? 'small' : 'medium'}
                    />
                </Grid>

                {parametroConsulta === 'AUSENTI' ?
                    <Grid item xs={12}>
                        <SelectOnChange
                            name="busqueda"
                            label="Tipo De Excel"
                            value={tipoExcelAusentismo}
                            options={lsTipoExcelAusentismo}
                            onChange={(e) => setTipoExcelAusentismo(e.target.value)}
                            size={matchesXS ? 'small' : 'medium'}
                        />
                    </Grid> : null
                }

                {opcionBusqueda === 0 ?
                    <Grid item xs={12}>
                        <InputOnChange
                            fullWidth
                            type="number"
                            label="Documento"
                            onChange={(e) => setDocumento(e.target.value)}
                            value={documento}
                            size={matchesXS ? 'small' : 'medium'}
                        />
                    </Grid> : null}

                {opcionBusqueda === 1 ?
                    <Grid item xs={12}>
                        <SelectOnChange
                            name="sede"
                            label="Sede de Atención"
                            value={sede}
                            options={lsSede}
                            onChange={(e) => setSede(e.target.value)}
                            size={matchesXS ? 'small' : 'medium'}
                        />
                    </Grid> : null}

                {opcionBusqueda === 2 ?
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
                    </Fragment> : null}

                <Grid item xs={12}>
                    <AnimateButton>
                        <Button disabled={loading} onClick={getDataForExport} size="large" variant="contained" fullWidth>
                            {TitleButton.Excel}
                        </Button>
                    </AnimateButton>
                </Grid>

                {
                    loading ?
                        <Grid item xs={12}>
                            <LoadingGenerate title="Generando Excel..." />
                        </Grid> : null
                }
            </Grid>
        </Fragment>
    );
}

export default ReintegroExport;