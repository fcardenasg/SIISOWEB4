import { useTheme } from "@emotion/react";
import { Button, Grid, useMediaQuery } from "@mui/material";
import { GetByTipoCatalogoCombo } from "api/clients/CatalogClient";
import { GetExcelEmployee } from "api/clients/EmployeeClient";
import { MessageError } from "components/alert/AlertAll";
import { ArrayTodoContrato } from "components/Arrays";
import ControlModal from "components/controllers/ControlModal";
import { DownloadFile } from "components/helpers/ConvertToBytes";
import { CodCatalogo, Message, TitleButton } from "components/helpers/Enums";
import { ViewFormat } from "components/helpers/Format";
import SelectOnChange from "components/input/SelectOnChange";
import LoadingGenerate from "components/loading/LoadingGenerate";
import { useEffect, useState } from "react";
import { Fragment } from "react";
import ReactExport from "react-export-excel";
import AnimateButton from "ui-component/extended/AnimateButton";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const GenerateExcel = ({ setOpenModal, openModal }) => {
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [lsContrato, setLsContrato] = useState([]);
    const [tipoContrato, setTipoContrato] = useState(0);
    const [lsEmployeeExcel, setLsEmployeeExcel] = useState([]);
    const [statusData, setStatusData] = useState(false);
    const [loading, setLoading] = useState(false);

    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    async function getAll() {
        try {
            const lsServerTipoContrato = await GetByTipoCatalogoCombo(CodCatalogo.TipoContrato);
            const arrayTipoContrato = lsServerTipoContrato.data.concat(ArrayTodoContrato);
            setLsContrato(arrayTipoContrato);
        } catch (error) { }
    }

    useEffect(() => {
        getAll();
    }, []);

    async function getDataForExport() {
        try {
            setLoading(true);
            const lsServerExcel = await GetExcelEmployee(tipoContrato);

            if (lsServerExcel.status === 200) {
                DownloadFile(lsServerExcel.data.nombre, lsServerExcel.data.base64);

                setTimeout(() => {
                    setLoading(false);
                }, 500);
            }

        } catch (error) {
            setLoading(false);

            setOpenError(true);
            setErrorMessage(Message.ErrorExcel);
        }
    }

    const handleClose = () => {
        setTipoContrato(0);
        setOpenModal(false);
    }

    return (
        <Fragment>
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            <ControlModal
                title="Generar Excel"
                open={openModal}
                onClose={handleClose}
                maxWidth="xs"
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <SelectOnChange
                            name="tipoContrato"
                            label="Tipo de Contrato"
                            value={tipoContrato}
                            options={lsContrato}
                            onChange={(e) => setTipoContrato(e.target.value)}
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
        </Fragment>
    );
}

export default GenerateExcel;