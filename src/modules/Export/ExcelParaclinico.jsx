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
            setStatusData(false); setLoading(true);

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
                                <ExcelColumn label="Fecha De Nacimiento" value={(fe) => new Date(fe.fechaNaci)} />
                                <ExcelColumn label="Departamento" value="nameDepartamento" />
                                <ExcelColumn label="Area" value="nameArea" />
                                <ExcelColumn label="Grupo" value="nameGrupo" />
                                <ExcelColumn label="Fecha De Contrato" value={(fe) => new Date(fe.fechaContrato)} />
                                <ExcelColumn label="Roster Position" value="nameRosterPosition" />
                                <ExcelColumn label="General Position" value="nameGeneralPosition" />
                                <ExcelColumn label="Genero" value="nameGenero" />
                                <ExcelColumn label="Sede" value="nameSede" />
                                <ExcelColumn label="Celular" value="celular" />
                                <ExcelColumn label="Email" value="email" />
                                <ExcelColumn label="Empresa" value="empresa" />
                                <ExcelColumn label="Oficio" value="nameOficio" />
                                <ExcelColumn label="Municipio De Nacimiento" value="nameMunicipioNacido" />

                                <ExcelColumn label="Fecha" value={(fe) => new Date(fe.fecha)} />
                                <ExcelColumn label="Tipo De Paraclinico" value="idTipoParaclinico" />
                                <ExcelColumn label="Motivo" value="motivo" />
                                <ExcelColumn label="Conducta" value="conducta" />
                                <ExcelColumn label="Conclusión" value="conclusion" />
                                <ExcelColumn label="Proveedor" value="proveedor" />

                                <ExcelColumn label="Observación" value="observacion" />
                                <ExcelColumn label="Ojo Derecho" value="ojoDerecho" />
                                <ExcelColumn label="Ex Derecho" value="dxDerecho" />
                                <ExcelColumn label="Dx Derecho" value="nameDxDerecho" />
                                <ExcelColumn label="Ojo Izquierdo" value="ojoIzquierdo" />
                                <ExcelColumn label="Dx Izquierdo" value="dxIzquierdo" />
                                <ExcelColumn label="Dx Izquierdo" value="nameDxIzquierdo" />
                                <ExcelColumn label="Add" value="add1" />
                                <ExcelColumn label="Lectura Add" value="nameIdLecturaAdd" />
                                <ExcelColumn label="Control" value="nameIdControl" />
                                <ExcelColumn label="Remitido Oftalmología" value="remitidoOftalmo" />
                                <ExcelColumn label="Requiere Lentes" value="requiereLentes" />
                                <ExcelColumn label="Dx Diagnostico" value="dxDiagnostico" />
                                <ExcelColumn label="Tipo EPP" value="nameIdTipoEPP" />
                                <ExcelColumn label="Fvc" value="fvc" />
                                <ExcelColumn label="FeV1" value="feV1" />
                                <ExcelColumn label="Fevfvc" value="fevfvc" />
                                <ExcelColumn label="FeV2575" value="feV2575" />
                                <ExcelColumn label="Pef" value="pef" />
                                <ExcelColumn label="Resultado" value="nameResultado" />
                                <ExcelColumn label="Resultado Colesterol" value="resultadoColesterol" />
                                <ExcelColumn label="Interpretacion Coleste" value="nameInterpretacionColeste" />
                                <ExcelColumn label="Observación Coleste" value="observacionColeste" />
                                <ExcelColumn label="Resultado Coleste HDL" value="resultadoColesteHDL" />
                                <ExcelColumn label="Interpretacion Coleste HDL" value="nameInterpretacionColesteHDL" />
                                <ExcelColumn label="Observación Coleste HDL" value="observacionColesteHDL" />
                                <ExcelColumn label="Dislipidemia HDL" value="dislipidemiaHDL" />
                                <ExcelColumn label="Resultado Trigli" value="resultadoTrigli" />
                                <ExcelColumn label="Interpretacion Trigli" value="nameInterpretacionTrigli" />
                                <ExcelColumn label="Observación Trigli" value="observacionTrigli" />
                                <ExcelColumn label="Resultado Glicemia" value="resultadoGlicemia" />
                                <ExcelColumn label="Interpretacion Glicemia" value="nameInterpretacionGlicemia" />
                                <ExcelColumn label="Observación Glicemia" value="observacionGlicemia" />
                                <ExcelColumn label="Resultado Creatinina" value="resultadoCreatinina" />
                                <ExcelColumn label="Interpretacion Creatinina" value="nameInterpretacionCreatinina" />
                                <ExcelColumn label="Observación Creatinina" value="observacionCreatinina" />
                                <ExcelColumn label="Resultado BUN" value="resultadoBUN" />
                                <ExcelColumn label="Interpretacion BUN" value="nameInterpretacionBUN" />
                                <ExcelColumn label="Observación BUN" value="observacionBUN" />
                                <ExcelColumn label="Parcial Orina" value="nameIdParcialOrina" />
                                <ExcelColumn label="Observación Parcial Orina" value="observacionParcialOrina" />
                                <ExcelColumn label="Hemograma" value="nameHemograma" />
                                <ExcelColumn label="Observación Hemograma" value="observacionHemograma" />
                                <ExcelColumn label="GPT" value="nameGPT" />
                                <ExcelColumn label="Observación GPT" value="observacionGPT" />
                                <ExcelColumn label="GOT" value="nameGOT" />
                                <ExcelColumn label="Observación GOT" value="observacionGOT" />
                                <ExcelColumn label="Bilirrubina" value="nameBilirrubina" />
                                <ExcelColumn label="Observación Bilirrubina" value="observacionBilirrubina" />
                                <ExcelColumn label="Bilirrubina Directa" value="nameBilirrubinaDirecta" />
                                <ExcelColumn label="Observación Bilirrubina Directa" value="observacionBilirrubinaDirecta" />
                                <ExcelColumn label="Otalgia AOP" value="otalgiaAOP" />
                                <ExcelColumn label="Otorrea AOP" value="otorreaAOP" />
                                <ExcelColumn label="Otitis AOP" value="otitisAOP" />
                                <ExcelColumn label="Acufenos AOP" value="acufenosAOP" />
                                <ExcelColumn label="Cirugia AOP" value="cirugiaAOP" />
                                <ExcelColumn label="Vertigo AOP" value="vertigoAOP" />
                                <ExcelColumn label="Farmacologicos AOP" value="farmacologicosAOP" />
                                <ExcelColumn label="Lurito AOP" value="luritoAOP" />
                                <ExcelColumn label="Familiares AOP" value="familiaresAOP" />
                                <ExcelColumn label="Paralisis AOP" value="paralisisAOP" />
                                <ExcelColumn label="Htaaop" value="htaaop" />
                                <ExcelColumn label="TipoAcusia AOP" value="tipoAcusiaAOP" />
                                <ExcelColumn label="Diabetes AOP" value="diabetesAOP" />
                                <ExcelColumn label="ExpoRuido AOP" value="expoRuidoAOP" />
                                <ExcelColumn label="AnteceTraumaticos AOP" value="anteceTraumaticosAOP" />
                                <ExcelColumn label="Observación AOP" value="observacionAOP" />
                                <ExcelColumn label="Empresa AO" value="nameIdEmpresaAO" />
                                <ExcelColumn label="Cargo AO" value="nameIdCargoAO" />
                                <ExcelColumn label="Tiempo Expo AO" value="tiempoExpoAO" />
                                <ExcelColumn label="Proteccion Auditiva AO" value="nameIdProteccionAuditivaAO" />
                                <ExcelColumn label="Suministrada Por AO" value="nameIdSuministradaPorAO" />
                                <ExcelColumn label="Uso AO" value="nameIdUsoAO" />
                                <ExcelColumn label="Odcae AUDIO" value="nameIdOdcaeAUDIO" />
                                <ExcelColumn label="Odmt AUDIO" value="nameIdOdmtAUDIO" />
                                <ExcelColumn label="Oicae AUDIO" value="nameIdOicaeAUDIO" />
                                <ExcelColumn label="Oimt AUDIO" value="nameIdOimtAUDIO" />
                                <ExcelColumn label="Reposo AUDIO" value="idReposoAUDIO" />
                                <ExcelColumn label="Dx AUDIO" value="dxAUDIO" />
                                <ExcelColumn label="Nombre Dx AUDIO" value="nameDxAUDIO" />
                                <ExcelColumn label="Conducta AUDIO" value="nameIdConductaAUDIO" />
                                <ExcelColumn label="Cambio EPP" value="idCambioEPP" />
                                <ExcelColumn label="Observación AUDIO" value="observacionAUDIO" />

                                <ExcelColumn label="Usuario Registro" value="usuarioRegistro" />
                                <ExcelColumn label="Fecha Registro" value={(fe) => new Date(fe.fechaRegistro)} />
                                <ExcelColumn label="Usuario Modifico" value="usuarioModifico" />
                                <ExcelColumn label="Fecha Modifico" value={(fe) => new Date(fe.fechaModifico)} />
                            </ExcelSheet>
                        </ExcelFile> : loading ? <LoadingGenerate title="Generando..." /> : null
                    }
                </Grid>
            </Grid>
        </Fragment>
    );
}

export default ExcelParaclinico;