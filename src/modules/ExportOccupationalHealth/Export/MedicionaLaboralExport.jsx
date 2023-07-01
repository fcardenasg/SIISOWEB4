import { useState } from 'react';
import ReactExport from 'react-export-excel';
import { Grid, Button, useMediaQuery, Tooltip, IconButton } from '@mui/material';
import { GetEdad, ViewFormat } from 'components/helpers/Format';
import AnimateButton from 'ui-component/extended/AnimateButton';

import { GetByTipoCatalogoCombo } from 'api/clients/CatalogClient';
import SelectOnChange from 'components/input/SelectOnChange';
import { useTheme } from '@mui/material/styles';
import { CodCatalogo, Message } from 'components/helpers/Enums';
import { useEffect } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import InputDatePick from 'components/input/InputDatePick';
import InputOnChange from 'components/input/InputOnChange';
import ViewEmployee from 'components/views/ViewEmployee';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import ControlModal from 'components/controllers/ControlModal';
import { ParametrosExcel } from 'formatdata/ParametrosForm';
import { GetExcelOccupationalMedicine } from 'api/clients/OccupationalMedicineClient';
import { MessageError } from 'components/alert/AlertAll';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const lsFiltrarPor = [{ value: 0, label: 'DOCUMENTO' }, { value: 1, label: 'SEDE' }, { value: 2, label: 'RANGO DE FECHA' }]

const MedicionaLaboralExport = () => {
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [sede, setSede] = useState(null);
    const [filtrarPor, setFiltrarPor] = useState(0);
    const [documento, setDocumento] = useState('');

    const [lsEmployee, setLsEmployee] = useState([]);
    const [lsSede, setLsSede] = useState([]);
    const [lsData, setLsData] = useState([]);

    const [fechaInicio, setFechaInicio] = useState(null);
    const [fechaFin, setFechaFin] = useState(null);

    const [openModal, setOpenModal] = useState(false);
    const [statusData, setStatusData] = useState(false);

    const handleDocumento = async (event) => {
        try {
            setDocumento(event?.target.value);

            if (event.key === 'Enter') {
                if (event?.target.value != "") {
                    var lsServerEmployee = await GetByIdEmployee(event?.target.value);

                    if (lsServerEmployee.status === 200) {
                        setLsEmployee(lsServerEmployee.data);
                    }
                } else { }
            }
        } catch (error) {
            setLsEmployee([]);
        }
    }

    useEffect(() => {
        async function getAll() {
            try {
                const lsServerSede = await GetByTipoCatalogoCombo(CodCatalogo.Sede);
                setLsSede(lsServerSede.data);
            } catch (error) { }
        }

        getAll();
    }, []);

    async function getDataForExport() {
        try {

            const parametros = ParametrosExcel(sede, fechaInicio, fechaFin, documento);
            const lsServerExcel = await GetExcelOccupationalMedicine(parametros);

            if (lsServerExcel.data.message !== undefined) {
                setOpenError(true);
                setErrorMessage(lsServerExcel.data.message);
            } else {
                setLsData(lsServerExcel.data);
                setStatusData(true);
            }

        } catch (error) {
            setOpenError(true);
            setErrorMessage(Message.ExcelNoGenerado);
        }
    }

    const handleFilter = async (event) => {
        setSede(null);
        setFechaInicio(null);
        setFechaFin(null);
        setDocumento('');

        setFiltrarPor(event?.target.value);
    }

    return (
        <Grid item xs={12}>
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            <ControlModal
                title="Información Empleado"
                open={openModal}
                onClose={() => setOpenModal(false)}
                maxWidth="lg"
            >
                <ViewEmployee
                    title="Información del Empleado"
                    disabled={true}
                    key={lsEmployee.documento}
                    documento={documento}
                    onChange={(e) => setDocumento(e.target.value)}
                    lsEmployee={lsEmployee}
                    handleDocumento={handleDocumento}
                />
            </ControlModal>

            <Grid container spacing={2}>
                <Grid item xs={12} md={6} lg={2}>
                    <SelectOnChange
                        name="filtrarPor"
                        label="Filtrar por"
                        value={filtrarPor}
                        options={lsFiltrarPor}
                        onChange={handleFilter}
                        size={matchesXS ? 'small' : 'medium'}
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={2}>
                    <SelectOnChange
                        disabled={filtrarPor === 0 || filtrarPor === 2 ? true : false}
                        name="sede"
                        label="Sede de Atención"
                        value={sede}
                        options={lsSede}
                        onChange={(e) => setSede(e.target.value)}
                        size={matchesXS ? 'small' : 'medium'}
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={2}>
                    <InputDatePick
                        disabled={filtrarPor === 0 || filtrarPor === 1 ? true : false}
                        label="Fecha Inicio"
                        onChange={(e) => setFechaInicio(e.target.value)}
                        value={fechaInicio}
                        size={matchesXS ? 'small' : 'medium'}
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={2}>
                    <InputDatePick
                        disabled={filtrarPor === 0 || filtrarPor === 1 ? true : false}
                        label="Fecha Fin"
                        onChange={(e) => setFechaFin(e.target.value)}
                        value={fechaFin}
                        size={matchesXS ? 'small' : 'medium'}
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={3}>
                    <InputOnChange
                        disabled={filtrarPor === 1 || filtrarPor === 2 ? true : false}
                        helperText="Dar enter para verificar el empleado"
                        type="number"
                        name="documento"
                        label="Documento"
                        value={documento}
                        onChange={(e) => {
                            setLsEmployee([]);
                            setDocumento(e.target.value);
                        }}
                        onKeyDown={handleDocumento}
                        size={matchesXS ? 'small' : 'medium'}
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={1}>
                    <AnimateButton>
                        <Tooltip disabled={lsEmployee.length === 0 ? true : false} title="Verificar Empleado" onClick={() => setOpenModal(true)}>
                            <IconButton size="large">
                                <VisibilityIcon sx={{ fontSize: '1.3rem' }} />
                            </IconButton>
                        </Tooltip>
                    </AnimateButton>
                </Grid>


                <Grid item xs={12} md={5} sx={{ textAlign: 'center' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <AnimateButton>
                                <Button onClick={getDataForExport} size="large" variant="contained" fullWidth>
                                    Generar Exportación
                                </Button>
                            </AnimateButton>
                        </Grid>

                        <Grid item xs={6}>
                            {statusData ?
                                <ExcelFile element={
                                    <AnimateButton>
                                        <Button onClick={() => setStatusData(false)} size="large" variant="outlined" fullWidth>
                                            Descargar Excel
                                        </Button>
                                    </AnimateButton>
                                } filename={`LISTA_DE_MEDICINA_LABORAL_${new Date().toLocaleString()}`}>
                                    <ExcelSheet data={lsData} name="Lista de Medicina Laboral">
                                        <ExcelColumn label="ID" value="id" />
                                        <ExcelColumn label="Documento" value="documento" />
                                        <ExcelColumn label="Nombre" value="nombre" />
                                        <ExcelColumn label="Fecha Nacimiento" value={(fe) => ViewFormat(fe.fechaNacimiento)} />
                                        <ExcelColumn label="Fecha Ingreso" value={(fe) => ViewFormat(fe.fechaIngreso)} />
                                        <ExcelColumn label="Antiguedad" value={(fe) => GetEdad(fe.antiguedad)} />
                                        <ExcelColumn label="Sucursal" value="sucursal" />
                                        <ExcelColumn label="Dpto Actual" value="dptoActual" />
                                        <ExcelColumn label="Area Actual" value="areaActual" />
                                        <ExcelColumn label="Cargo Actual" value="cargoActual" />
                                        <ExcelColumn label="General Position" value="generalPosition" />
                                        <ExcelColumn label="Grupo Actual" value="grupoActual" />
                                        <ExcelColumn label="Pay Status" value="payStatus" />
                                        <ExcelColumn label="Eps" value="eps" />
                                        <ExcelColumn label="Fecha Atencion" value={(fe) => ViewFormat(fe.fechaAtencion)} />
                                        <ExcelColumn label="Situación Contractual" value="situacionContractual" />
                                        <ExcelColumn label="Resumen Caso" value="resumenCaso" />
                                        <ExcelColumn label="Situación Empleado" value="situacionEmpleado" />
                                        <ExcelColumn label="Código Dx" value="codigoDx" />
                                        <ExcelColumn label="Diagnostico" value="diagnostico" />
                                        <ExcelColumn label="Entidad Donde Envia" value="entidadDondeEnvia" />
                                        <ExcelColumn label="Entidad Que Motiva Envio" value="entidadQueMotivaEnvio" />
                                        <ExcelColumn label="Fecha Entrega" value={(fe) => ViewFormat(fe.fechaEntrega)} />
                                        <ExcelColumn label="Fecha Envio" value={(fe) => ViewFormat(fe.fechaEnvio)} />
                                        <ExcelColumn label="Segmento Agrupado" value="nameSegmentoAgrupado" />
                                        <ExcelColumn label="Segmento Afectado" value="nameSegmentoAfectado" />
                                        <ExcelColumn label="Subsegmento" value="nameSubsegmento" />
                                        <ExcelColumn label="Region" value="region" />
                                        <ExcelColumn label="Lateralidad" value="lateralidad" />
                                        <ExcelColumn label="Fecha Calificación Origen Eps" value={(fe) => ViewFormat(fe.fechaCalificacionOrigenEps)} />
                                        <ExcelColumn label="Nro Furel" value="nroFurel" />
                                        <ExcelColumn label="origen Eps" value="origenEps" />
                                        <ExcelColumn label="No Solicitud" value="noSolicitud" />
                                        <ExcelColumn label="Fecha Califica Origen ARL" value={(fe) => ViewFormat(fe.fechaCalificaOrigenARL)} />
                                        <ExcelColumn label="Origen ARL" value="origenARL" />
                                        <ExcelColumn label="Fecha Califica Origen JRC" value={(fe) => ViewFormat(fe.fechaCalificaOrigenJRC)} />
                                        <ExcelColumn label="Junta Califica" value="juntaCalifica" />
                                        <ExcelColumn label="No Dictamen JRC" value="noDictamenJRC" />
                                        <ExcelColumn label="OrigenJRC" value="origenJRC" />
                                        <ExcelColumn label="Controversia" value="controversia" />
                                        <ExcelColumn label="Conclusión" value="conclusion" />
                                        <ExcelColumn label="Fecha Califica Origen JNC" value={(fe) => ViewFormat(fe.fechacalificaOrigenJNC)} />
                                        <ExcelColumn label="No Dictamen JNC" value="noDictamenJNC" />
                                        <ExcelColumn label="Origen JNC" value="origenJNC" />
                                        <ExcelColumn label="Origen Final" value="origenFinal" />
                                        <ExcelColumn label="Fecha Estructuración Origen Final" value={(fe) => ViewFormat(fe.fechaEstructuracionOrigenFinal)} />
                                        <ExcelColumn label="Instancia Origen Final" value="instanciaOrigenFinal" />
                                        <ExcelColumn label="Junta ReCalificación JRC" value="juntaReCalificacionJRC" />
                                        <ExcelColumn label="Fecha Calificación PCL ARL" value={(fe) => ViewFormat(fe.fechaCalificacionPCLARL)} />
                                        <ExcelColumn label="Pcl ARL" value="pclARL" />
                                        <ExcelColumn label="Fecha Estructa ARL" value={(fe) => ViewFormat(fe.fechaEstructaARL)} />
                                        <ExcelColumn label="Fecha Calificación Pcl JRC" value={(fe) => ViewFormat(fe.fechaCalificacionPclJRC)} />
                                        <ExcelColumn label="No Dictamen Pcl JRC" value="nodictamenPclJRC" />
                                        <ExcelColumn label="Pcl JRC" value="pclJRC" />
                                        <ExcelColumn label="Fecha Estructa JRC" value={(fe) => ViewFormat(fe.fechaEstructaJRC)} />
                                        <ExcelColumn label="Fecha Calificación Pcl JNC" value={(fe) => ViewFormat(fe.fechaCalificacionPclJNC)} />
                                        <ExcelColumn label="No Dictamen Pcl JNC" value="noDictamenPclJNC" />
                                        <ExcelColumn label="Pcl JNC" value="pclJNC" />
                                        <ExcelColumn label="Fecha Estructura JNC" value={(fe) => ViewFormat(fe.fechaestructuraJNC)} />
                                        <ExcelColumn label="Pcl Final" value="pclFinal" />
                                        <ExcelColumn label="Instancia Final" value="instanciaFinal" />
                                        <ExcelColumn label="Fecha Calificación Pcl Final" value={(fe) => ViewFormat(fe.fechaCalificacionPclFinal)} />
                                        <ExcelColumn label="Fecha Estructuración Pcl Final" value={(fe) => ViewFormat(fe.fechaEstructuracionPclFinal)} />
                                        <ExcelColumn label="Indemnizado" value="indemnizado" />
                                        <ExcelColumn label="Fecha Pago" value={(fe) => ViewFormat(fe.fechaPago)} />
                                        <ExcelColumn label="Entregado MIN" value="entregadoMin" />
                                        <ExcelColumn label="Fecha Recalificacion Pcl ARL" value={(fe) => ViewFormat(fe.fechaRecalificacionpclARL)} />
                                        <ExcelColumn label="Pcl Recalificada ARL" value="pclRecalificadaARL" />
                                        <ExcelColumn label="Fecha Estructa Recalifición Pcl ARL" value={(fe) => ViewFormat(fe.fechaEstructaRecalificionPclARL)} />
                                        <ExcelColumn label="Fecha Recalificación Pcl JRC" value={(fe) => ViewFormat(fe.fechaRecalificacionPclJRC)} />
                                        <ExcelColumn label="No Dictamen Recalificación JRC" value="noDictamenRecalificacionJRC" />
                                        <ExcelColumn label="Pcl Recalificación JRC" value="pclRecalificacionJRC" />
                                        <ExcelColumn label="Fecha Estructuración Pcl Recalificada JRC" value={(fe) => ViewFormat(fe.fechaEstructuracionPclRecalificadaJRC)} />
                                        <ExcelColumn label="Fecha Recalificación Pcl JNC" value={(fe) => ViewFormat(fe.fechaRecalificacionPclJNC)} />
                                        <ExcelColumn label="No Dictamen Recalificación JNC" value="noDictamenRecalificacionJNC" />
                                        <ExcelColumn label="Fecha Estructuración Pcl Recalificada JRC2" value={(fe) => ViewFormat(fe.fechaEstructuracionPclRecalificadaJRC2)} />
                                        <ExcelColumn label="Pcl Recalificada JNC" value="pclRecalificadaJNC" />
                                        <ExcelColumn label="Indemnizado Recalificado" value="indemnizadoRecalificado" />
                                        <ExcelColumn label="Fecha Pago Recalificado" value={(fe) => ViewFormat(fe.fechaPagoRecalificado)} />
                                        <ExcelColumn label="Investigado" value="investigado" />
                                        <ExcelColumn label="Usuario" value="usuario" />
                                        <ExcelColumn label="Observaciones" value="observaciones" />

                                        <ExcelColumn label="Aplica" value="aplica" />
                                        <ExcelColumn label="Motivo Investigación Enfermedad Laboral" value="motivoIE" />
                                        <ExcelColumn label="Estado Enfermedad Laboral" value="estadoEnfermedadLaboral" />
                                        <ExcelColumn label="Resultado Del Origen" value="resultadoOrigen" />
                                        <ExcelColumn label="Fecha Calificación Última Instancia" value="fechaCalificacionUltimaInstancia" />
                                        <ExcelColumn label="Fecha Investigación" value={(fe) => ViewFormat(fe.fechaInvestigacion)} />
                                        <ExcelColumn label="Origen Investigación" value="origenInvestigacion" />
                                        <ExcelColumn label="Diferencia Día" value="diferenciaDia" />
                                        <ExcelColumn label="Resumen WR" value="resumenWR" />
                                        <ExcelColumn label="ACC Trabajador" value="accTrabajador" />
                                        <ExcelColumn label="Resumen SG" value="resumenSG" />
                                        <ExcelColumn label="ACC Sistema" value="accSistema" />
                                        <ExcelColumn label="Peligro Asociado Enfermedad" value="peligroAsociadoEnfermedad" />
                                        <ExcelColumn label="Fecha Entrega Min" value={(fe) => ViewFormat(fe.fechaEntregaMIN)} />
                                    </ExcelSheet>
                                </ExcelFile> : null
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid >
    );

}

export default MedicionaLaboralExport;