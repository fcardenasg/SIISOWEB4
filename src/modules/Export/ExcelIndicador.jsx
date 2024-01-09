import { useEffect, useState, Fragment } from "react";
import { useTheme } from "@emotion/react";
import { Button, Grid, useMediaQuery } from "@mui/material";
import { Message, TitleButton } from "components/helpers/Enums";
import AnimateButton from "ui-component/extended/AnimateButton";
import { MessageError } from "components/alert/AlertAll";
import LoadingGenerate from "components/loading/LoadingGenerate";
import { DownloadFile } from "components/helpers/ConvertToBytes";
import { GetWorkAbsenteeismHistoryComboAnio } from "api/clients/WorkAbsenteeismClient";
import SelectOnChange from "components/input/SelectOnChange";
import { GenerateExcelIndicadores } from "api/clients/IndicadoresClient";

const ExcelIndicador = ({ setSede, sede }) => {
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [lsAnios, setLsAnios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        async function getAll() {
            try {
                const lsServerAnios = await GetWorkAbsenteeismHistoryComboAnio();
                setLsAnios(lsServerAnios.data);
                setSede(new Date().getFullYear());
            } catch (error) { }
        }

        getAll();
    }, []);

    async function getDataForExport() {
        try {
            setLoading(true);
            const lsServerExcel = await GenerateExcelIndicadores(sede);

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
                        name="anio"
                        label="Año"
                        value={sede}
                        options={lsAnios}
                        onChange={(e) => setSede(e.target.value)}
                        size={matchesXS ? 'small' : 'medium'}
                    />
                </Grid>

                <Grid item xs={12}>
                    <AnimateButton>
                        <Button disabled={loading} onClick={getDataForExport} size="large" variant="contained" fullWidth>
                            {TitleButton.Excel}
                        </Button>
                    </AnimateButton>
                </Grid>

                {loading ?
                    <Grid item xs={12}>
                        <LoadingGenerate title="Generando Excel..." />
                    </Grid> : null
                }
            </Grid>
        </Fragment>
    );
}

export default ExcelIndicador;