import { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import { Button, Grid, useMediaQuery } from "@mui/material";
import { GetByTipoCatalogoCombo } from "api/clients/CatalogClient";
import { ArrayTodoPeticion } from "components/Arrays";
import { CodCatalogo, Message, TitleButton } from "components/helpers/Enums";
import SelectOnChange from "components/input/SelectOnChange";
import { ParametrosExcel } from "formatdata/ParametrosForm";
import AnimateButton from "ui-component/extended/AnimateButton";

import { MessageError } from "components/alert/AlertAll";
import LoadingGenerate from "components/loading/LoadingGenerate";
import { GetExcelOccupationalExamination } from "api/clients/OccupationalExaminationClient";
import { DownloadFile } from "components/helpers/ConvertToBytes";
import ControlModal from "components/controllers/ControlModal";
import { GenerateExcelVentanillaUnica } from "api/clients/VentanillaUnicaClient";

const ExcelVentanilla = () => {
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [lsTipoVentanilla, setLsTipoVentanilla] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [tipoVentanilla, setTipoVentanilla] = useState('');

    const handleClose = () => {
        setTipoVentanilla(0);
        setOpenModal(false);
    }

    useEffect(() => {
        async function getAll() {
            try {
                const lsServerTipo = await GetByTipoCatalogoCombo(CodCatalogo.VentanillaTipoPeticion);
                setLsTipoVentanilla(lsServerTipo.data);
                const arrayTipo = lsServerSede.data.concat(ArrayTodoPeticion);
                setLsSede(arrayTipo);
            } catch (error) { }
        }

        getAll();
    }, []);

    

    return (
        <ControlModal
            title="Generar Excel"
            open={openModal}
            onClose={handleClose}
            maxWidth="xs"
        >
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <SelectOnChange
                        name="tipoAtencion"
                        label="Tipo de atención"
                        value={tipoVentanilla}
                        options={lsTipoVentanilla}
                        onChange={(e) => setTipoVentanilla(e.target.value)}
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
        </ControlModal>
    );
}

export default ExcelVentanilla;