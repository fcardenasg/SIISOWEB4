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
import { GetExcelOccupationalExamination } from "api/clients/OccupationalExaminationClient";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const ExcelEmo = ({ setSede, sede, setFechaInicio, fechaInicio, setFechaFin, fechaFin }) => {
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
            setStatusData(false); setLoading(true);

            const parametros = ParametrosExcel(sede, fechaInicio, fechaFin, undefined);
            const lsServerExcel = await GetExcelOccupationalExamination(parametros);

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
                        } filename={`LISTA_DE_HISTORIA_CLINICA_OCUPACIONAL_${new Date().toLocaleString()}`}>
                            <ExcelSheet data={lsDataExport} name="Registro De HCO">
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
                                <ExcelColumn label="Atención" value="nameAtencion" />
                                <ExcelColumn label="Concepto Aptitud Psicofísica" value="nameConceptoAptitudPsicofisica" />
                                <ExcelColumn label="Concepto De Trabajo En Altura" value="nameConceptoTrabajoAltura" />
                                <ExcelColumn label="Concepto De Trabajo En Espacio Confinado" value="nameConceptoTrabajoEspacioConfinado" />
                                <ExcelColumn label="Código Dx1" value="dx1" />
                                <ExcelColumn label="Dx 1" value="nameDx1" />
                                <ExcelColumn label="Código Dx2" value="dx2" />
                                <ExcelColumn label="Dx 2" value="nameDx2" />
                                <ExcelColumn label="Código Dx3" value="dx3" />
                                <ExcelColumn label="Dx 3" value="nameDx3" />
                                <ExcelColumn label="Observaciones Diagnóstico" value="observacionesDiagnostica" />
                                <ExcelColumn label="Recomendaciones Diagnóstico" value="recomendacionesDiagnostica" />

                                <ExcelColumn label="Usuario Registro" value="usuarioRegistro" />
                                <ExcelColumn label="Fecha Registro" value={(fe) => ViewFormat(fe.fechaRegistro)} />
                                <ExcelColumn label="Usuario Modifica" value="usuarioModifica" />
                                <ExcelColumn label="Fecha Modifica" value={(fe) => ViewFormat(fe.fechaModifica)} />
                            </ExcelSheet>
                        </ExcelFile> : loading ? <LoadingGenerate title="Generando..." /> : null
                    }
                </Grid>
            </Grid>
        </Fragment>
    );
}

export default ExcelEmo;