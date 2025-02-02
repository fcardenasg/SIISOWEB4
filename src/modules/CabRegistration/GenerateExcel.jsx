import { useTheme } from "@emotion/react";
import { Button, Grid, useMediaQuery } from "@mui/material";
import { GetExcelCabRegistration } from "api/clients/CabRegistrationClient";
import { GetAllByTipoCatalogo } from "api/clients/CatalogClient";
import { MessageError } from "components/alert/AlertAll";
import { ArrayTodaSede } from "components/Arrays";
import ControlModal from "components/controllers/ControlModal";
import { DownloadFile } from "components/helpers/ConvertToBytes";
import { CodCatalogo, Message, TitleButton } from "components/helpers/Enums";
import InputDatePick from "components/input/InputDatePick";
import SelectOnChange from "components/input/SelectOnChange";
import LoadingGenerate from "components/loading/LoadingGenerate";
import { ParametrosExcel } from "formatdata/ParametrosForm";
import { Fragment, useEffect, useState } from "react";
import AnimateButton from "ui-component/extended/AnimateButton";

const GenerateExcel = ({ setOpenModal, openModal }) => {
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [lsSede, setLsSede] = useState([]);
    const [sede, setSede] = useState(0);

    const [errorMessage, setErrorMessage] = useState('');
    const [openError, setOpenError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [fechaInicio, setFechaInicio] = useState(null);
    const [fechaFin, setFechaFin] = useState(null);

    async function getAll() {
        try {
            const lsServerSede = await GetAllByTipoCatalogo(0, 0, CodCatalogo.Sede);
            var resultSede = lsServerSede.data.entities.map((item) => ({
                value: item.idCatalogo,
                label: item.nombre
            }));

            const arraySede = resultSede.concat(ArrayTodaSede);
            setLsSede(arraySede);
        } catch (error) { }
    }

    useEffect(() => {
        getAll();
    }, []);

    async function getDataForExport() {
        try {
            setLoading(true);

            const parametros = ParametrosExcel(sede, fechaInicio, fechaFin, undefined);
            const lsServerExcel = await GetExcelCabRegistration(parametros);

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

    /* async function getDataForExport() {
        try {
            const parametros = ParametrosExcel(sede, fechaInicio, fechaFin);
            const lsServerExcel = await GetExcelCabRegistration(parametros);

            if (lsServerExcel.status === 200) {
                setLsCabRegistration(lsServerExcel.data);
                setStatusData(true);
            }

        } catch (error) { }
    } */

    const handleClose = () => {
        setSede(0);
        setOpenModal(false);
        setFechaInicio(null);
        setFechaFin(null);
    }

    return (
        <Fragment>
            <ControlModal
                title="Generar Excel"
                open={openModal}
                onClose={handleClose}
                maxWidth="xs"
            >
                <Fragment>
                    <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

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
            </ControlModal>
        </Fragment>
    );
}

export default GenerateExcel;