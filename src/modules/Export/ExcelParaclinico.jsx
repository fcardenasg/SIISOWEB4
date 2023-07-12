import { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import { Button, Grid, useMediaQuery } from "@mui/material";
import { GetByTipoCatalogoCombo } from "api/clients/CatalogClient";
import { ArrayTodaSede } from "components/Arrays";
import { CodCatalogo, Message } from "components/helpers/Enums";
import InputDatePick from "components/input/InputDatePick";
import SelectOnChange from "components/input/SelectOnChange";
import { ParametrosExcel } from "formatdata/ParametrosForm";
import AnimateButton from "ui-component/extended/AnimateButton";
import ReactExport from "react-export-excel";
import { ViewFormat } from "components/helpers/Format";
import { Fragment } from "react";
import { MessageError } from "components/alert/AlertAll";
import LoadingGenerate from "components/loading/LoadingGenerate";
import { GetExcelParaclinics } from "api/clients/ParaclinicsClient";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const ExcelParaclinico = ({ setSede, sede, setFechaInicio, fechaInicio, setFechaFin, fechaFin }) => {
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [lsSede, setLsSede] = useState([]);
    const [lsDataExport, setLsDataExport] = useState([]);
    const [statusData, setStatusData] = useState(false);
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

            const parametros = ParametrosExcel(sede, fechaInicio, fechaFin, undefined);
            const lsServerExcel = await GetExcelParaclinics(parametros);

            if (lsServerExcel.status === 200) {
                setLsDataExport(lsServerExcel.data);
                setTimeout(() => {
                    setStatusData(true);
                    setLoading(false);
                }, 1500);
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
                        <Button disabled={loading} onClick={getDataForExport} size="large" variant="contained" fullWidth>
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
                        } filename={`LISTA_DE_PARACLINICO_${new Date().toLocaleString()}`}>
                            <ExcelSheet data={lsDataExport} name="Registro De Paraclinicos">
                                <ExcelColumn label="Id" value="id" />
                                <ExcelColumn label="Documento" value="documento" />
                                <ExcelColumn label="Nombres" value="nombres" />
                                <ExcelColumn label="Fecha De Nacimiento" value={(fe) => ViewFormat(fe.fechaNaci)} />
                                <ExcelColumn label="Departamento" value="nameDepartamento" />
                                <ExcelColumn label="Area" value="nameArea" />
                                <ExcelColumn label="Grupo" value="nameGrupo" />
                                <ExcelColumn label="Fecha De Contrato" value={(fe) => ViewFormat(fe.fechaContrato)} />
                                <ExcelColumn label="Roster Position" value="nameRosterPosition" />
                                <ExcelColumn label="General Position" value="nameGeneralPosition" />
                                <ExcelColumn label="Genero" value="nameGenero" />
                                <ExcelColumn label="Sede" value="nameSede" />
                                <ExcelColumn label="Celular" value="celular" />
                                <ExcelColumn label="Email" value="email" />
                                <ExcelColumn label="Empresa" value="empresa" />
                                <ExcelColumn label="Oficio" value="nameOficio" />
                                <ExcelColumn label="Municipio De Nacimiento" value="nameMunicipioNacido" />

                                <ExcelColumn label="Fecha" value={(fe) => ViewFormat(fe.fecha)} />
                                <ExcelColumn label="Tipo De Paraclinico" value="idTipoParaclinico" />
                                <ExcelColumn label="Motivo" value="motivo" />
                                <ExcelColumn label="Conducta" value="conducta" />
                                <ExcelColumn label="Conclusion" value="conclusion" />
                                <ExcelColumn label="Proveedor" value="proveedor" />
                           
                                <ExcelColumn label="Usuario Registro" value="usuarioRegistro" />
                                <ExcelColumn label="Fecha Registro" value={(fe) => ViewFormat(fe.fechaRegistro)} />
                                <ExcelColumn label="Usuario Modifico" value="usuarioModifico" />
                                <ExcelColumn label="Fecha Modifico" value={(fe) => ViewFormat(fe.fechaModifico)} />
                            </ExcelSheet>
                        </ExcelFile> : loading ? <LoadingGenerate title="Generando..." /> : null
                    }
                </Grid>
            </Grid>
        </Fragment>
    );
}

export default ExcelParaclinico;