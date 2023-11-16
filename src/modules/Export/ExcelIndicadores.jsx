import { useEffect, useState, Fragment } from "react";
import { useTheme } from "@emotion/react";
import { Button, Grid, useMediaQuery } from "@mui/material";
import { ArrayMeses } from "components/Arrays";
import { Message, TitleButton } from "components/helpers/Enums";
import { ParametrosExcelIndicadores } from "formatdata/ParametrosForm";
import AnimateButton from "ui-component/extended/AnimateButton";
import { MessageError } from "components/alert/AlertAll";
import LoadingGenerate from "components/loading/LoadingGenerate";
import { ConvertStringToInt, ConvertToArregloMeses, DownloadFile } from "components/helpers/ConvertToBytes";
import { GetExcelIndicadores, GetWorkAbsenteeismHistoryComboAnio } from "api/clients/WorkAbsenteeismClient";
import InputMultiSelectCheck from "components/input/InputMultiSelectCheck";
import InputCheck from "components/input/InputCheck";

const ExcelIndicadores = ({ setLsMeses, lsMeses, setLsAnios, lsAnios, setAllMes, allMes }) => {
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [lssAnios, setLssAnios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChangeMes = (event) => {
        const {
            target: { value },
        } = event;

        setLsMeses(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleChangeAnio = (event) => {
        const {
            target: { value },
        } = event;

        setLsAnios(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleChangeAllMes = (event) => {
        setAllMes(event.target.checked);
        setLsMeses([]);
    };


    useEffect(() => {
        async function getAll() {
            try {
                const lsServerAnios = await GetWorkAbsenteeismHistoryComboAnio();
                setLssAnios(lsServerAnios.data);
            } catch (error) { }
        }

        getAll();
    }, []);

    async function getDataForExport() {
        try {
            setLoading(true);

            const lsAniosInt = ConvertStringToInt(lsAnios);
            const lsMesesInt = ConvertToArregloMeses(lsMeses);

            if (lsAniosInt.length !== 0) {
                const parametros = ParametrosExcelIndicadores(lsAniosInt.reverse(), lsMesesInt, allMes);
                const lsServerExcel = await GetExcelIndicadores(parametros);

                if (lsServerExcel.status === 200) {
                    DownloadFile(lsServerExcel.data.nombre, lsServerExcel.data.base64);

                    setTimeout(() => {
                        setLoading(false);
                    }, 1000);
                }
            } else {
                setLoading(false);
                setOpenError(true);
                setErrorMessage("Seleccione por lo menos un año");
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
                <Grid item xs={6}>
                    <InputCheck
                        onChange={handleChangeAllMes}
                        checked={allMes}
                        label="Todos los Meses"
                        size={30}
                    />
                </Grid>

                <Grid item xs={6}>
                    <InputMultiSelectCheck
                        onChange={handleChangeMes}
                        value={lsMeses}
                        label="Meses"
                        options={ArrayMeses}
                        size={matchesXS ? 'small' : 'medium'}
                        disabled={allMes}
                    />
                </Grid>

                <Grid item xs={12}>
                    <InputMultiSelectCheck
                        onChange={handleChangeAnio}
                        value={lsAnios}
                        label="Años"
                        options={lssAnios}
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

export default ExcelIndicadores;