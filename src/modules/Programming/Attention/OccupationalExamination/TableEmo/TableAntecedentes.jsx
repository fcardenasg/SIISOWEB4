import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { GetAllByDocumento } from 'api/clients/OccupationalExaminationClient';

///
const columnsAntecedentesPatologicos = [
    { field: 'formatFecha', headerName: 'Fecha', width: 80 },
    { field: 'nameAtencion', headerName: 'Atención', width: 180 },
    { field: 'especifiqueAP', headerName: 'Especificación', width: 1000 },
];
///
const columnsAccidenteTrabajo = [
    { field: 'formatFecha', headerName: 'Fecha', width: 80 },
    { field: 'nameAtencion', headerName: 'Atención', width: 180 },
    { field: 'anioAT', headerName: 'Año 1', width: 80 },
    { field: 'especifiqueAT', headerName: 'Especificación', width: 550 },
    { field: 'anio1AT', headerName: 'Año 2', width: 80 },
    { field: 'especifique1AT', headerName: 'Especificación', width: 550 },
];
///
const columnsRevisionSistema = [
    { field: 'formatFecha', headerName: 'Fecha', width: 80 },
    { field: 'nameAtencion', headerName: 'Atención', width: 180 },
    { field: 'observacionRS', headerName: 'Observación', width: 1200 },
];
///
const columnsExploracionMorfologica = [
    { field: 'formatFecha', headerName: 'Fecha', width: 80 },
    { field: 'nameAtencion', headerName: 'Atención', width: 180 },
    { field: 'especifiqueEMEFU', headerName: 'Observación', width: 400 },
];
///
const columnsExploracionFuncional = [
    { field: 'formatFecha', headerName: 'Fecha', width: 80 },
    { field: 'nameAtencion', headerName: 'Atención', width: 180 },
    { field: 'especifiqueEMEFU', headerName: 'Observación', width: 400 },
];
///
const columnsRxTorax = [
    { field: 'formatFecha', headerName: 'Fecha', width: 80 },
    { field: 'nameAtencion', headerName: 'Atención', width: 180 },
    { field: 'fechaRxToraxEPA', headerName: 'Fecha Rx Torax', width: 150 },
    { field: 'resultadoRxToraxEPA', headerName: 'Resultado', width: 150 },
    { field: 'observacionesRxToraxEPA', headerName: 'Observación', width: 400 },
];
///
const columnsEspirometria = [
    { field: 'formatFecha', headerName: 'Fecha', width: 80 },
    { field: 'nameAtencion', headerName: 'Atención', width: 180 },
    { field: 'fechaEspirometriaEPA', headerName: 'Fecha Espirometría ', width: 150 },
    { field: 'resultadoEspirometriaEPA', headerName: 'Resultado', width: 150 },
    { field: 'observacionesEspirometriaEPA', headerName: 'Observación', width: 400 },
];
///
const columnsAudiometria = [
    { field: 'formatFecha', headerName: 'Fecha', width: 80 },
    { field: 'nameAtencion', headerName: 'Atención', width: 180 },
    { field: 'fechaAudiometriaEPA', headerName: 'Fecha Audiometría', width: 150 },
    { field: 'resultadoAudiometriaEPA', headerName: 'Resultado', width: 150 },
    { field: 'observacionesAudiometriaEPA', headerName: 'Observación', width: 400 },
];
///
const columnsVisiometria = [
    { field: 'formatFecha', headerName: 'Fecha', width: 80 },
    { field: 'nameAtencion', headerName: 'Atención', width: 180 },
    { field: 'fechaVisiometriaEPA', headerName: 'Fecha Visiometria', width: 150 },
    { field: 'resultadoVisiometriaEPA', headerName: 'Resultado', width: 150 },
    { field: 'observacionesVisiometriaEPA', headerName: 'Observación', width: 400 },
];
///
const columnsLaboratorioClinico = [
    { field: 'formatFecha', headerName: 'Fecha', width: 80 },
    { field: 'nameAtencion', headerName: 'Atención', width: 180 },
    { field: 'fechaLaboratorioClinicoEPA', headerName: 'Fecha Laboratorio Clinico', width: 150 },
    { field: 'resultadoLaboratorioClinicoEPA', headerName: 'Resultado', width: 150 },
    { field: 'observacionesLaboratorioClinicoEPA', headerName: 'Observación', width: 400 },
];
///
const columnsSintomasRespiratorios = [
    { field: 'formatFecha', headerName: 'Fecha', width: 80 },
    { field: 'nameAtencion', headerName: 'Atención', width: 180 },
    { field: 'fechaCuestionarioSintomaEPA', headerName: 'Fecha Cuestionario de Sintomas Respiratorios', width: 150 },
    { field: 'resultadoCuestionarioSintomaEPA', headerName: 'Resultado', width: 150 },
    { field: 'observacionesCuestionarioSintomaEPA', headerName: 'Observación', width: 400 },
];
///
const columnsEKG = [
    { field: 'formatFecha', headerName: 'Fecha', width: 80 },
    { field: 'nameAtencion', headerName: 'Atención', width: 180 },
    { field: 'fechaEkgEPA', headerName: 'Fecha EKG', width: 150 },
    { field: 'resultadoEkgEPA', headerName: 'Resultado', width: 150 },
    { field: 'observacionesEkgEPA', headerName: 'Observación', width: 400 },
];
///
const columnsRNMLumbosacra = [
    { field: 'formatFecha', headerName: 'Fecha', width: 80 },
    { field: 'nameAtencion', headerName: 'Atención', width: 180 },
    { field: 'fechaRnmLumbosacraEPA', headerName: 'Fecha Rx Torax', width: 150 },
    { field: 'resultadoRnmLumbosacraEPA', headerName: 'Resultado', width: 150 },
    { field: 'observacionesRnmLumbosacraEPA', headerName: 'Observación', width: 400 },
];
///
const columnsRNMCervical = [
    { field: 'formatFecha', headerName: 'Fecha', width: 80 },
    { field: 'nameAtencion', headerName: 'Atención', width: 180 },
    { field: 'fechaRnmCervicalEPA', headerName: 'Fecha Rx Torax', width: 150 },
    { field: 'resultadoRnmCervicalEPA', headerName: 'Resultado', width: 150 },
    { field: 'observacionesRnmCervicalEPA', headerName: 'Observación', width: 400 },
];
///
const columnsExamenParaclinico = [
    { field: 'formatFecha', headerName: 'Fecha', width: 80 },
    { field: 'nameAtencion', headerName: 'Atención', width: 180 },
    { field: 'observacionEPA', headerName: 'Observación', width: 400 },
];
///
const colummsImpresionDiagnostico = [
    { field: 'formatFecha', headerName: 'Fecha', width: 80 },
    { field: 'nameAtencion', headerName: 'Atención', width: 180 },
    { field: 'observacionID', headerName: 'Observaciones', width: 150 },
    { field: 'recomendacionesID', headerName: 'Recomendaciones', width: 150 },
    { field: 'idConceptoActitudID', headerName: 'Concepto de Actitud Psicofisica', width: 150 },
];
///
const columnsNotificacionEmpresa = [
    { field: 'formatFecha', headerName: 'Fecha', width: 80 },
    { field: 'nameAtencion', headerName: 'Atención', width: 180 },
    { field: 'fechaConceptoNETA', headerName: 'Fecha de Concepto', width: 150 },
    { field: 'conceptoActitudNETA', headerName: 'Concepto de Actitud', width: 150 },
    { field: 'motivoAplazoNETA', headerName: 'Motivo Aplazo', width: 150 },
    { field: 'descripcionResultadoNETA', headerName: 'Descripción de Resultado', width: 150 },
    { field: 'recomendacionesNETA', headerName: 'Recomendaciones', width: 150 },
    { field: 'remitidoNETA', headerName: 'Remitido', width: 150 },
    { field: 'remididoDondeNETA', headerName: 'A Donde', width: 150 },
];

const columnsNotificacionEmpleado = [
    { field: 'formatFecha', headerName: 'Fecha', width: 80 },
    { field: 'nameAtencion', headerName: 'Atención', width: 180 },
    { field: 'idRiesgoCardiovascularNEMTA', headerName: 'Riesgo Cardiovascular', width: 150 },
    { field: 'idClasificacionNEMTA', headerName: 'Clasificación', width: 150 },
    { field: 'observacionesNEMTA', headerName: 'Observación', width: 400 },
    { field: 'conceptoActitudMedicoNEMTA', headerName: 'Concepto Actitud Médica', width: 150 },
];

const columnsInformacionCardiovascular = [
    { field: 'formatFecha', headerName: 'Fecha', width: 80 },
    { field: 'nameAtencion', headerName: 'Atención', width: 180 },
    { field: 'fechaRxToraxEPA', headerName: 'Tensión Arterial', width: 150 },
    { field: 'resultadoRxToraxEPA', headerName: 'Colesterol Total', width: 150 },
    { field: 'resultadoRxToraxEPA', headerName: 'Trigliceridos', width: 150 },
    { field: 'resultadoRxToraxEPA', headerName: 'Glicemia', width: 150 },
    { field: 'resultadoRxToraxEPA', headerName: 'Colesterol Total', width: 150 },
    { field: 'observacionesRxToraxEPA', headerName: 'Observación', width: 400 },
];

const columnsAntropometria = [
    { field: 'formatFecha', headerName: 'Fecha', width: 80 },
    { field: 'nameAtencion', headerName: 'Atención', width: 180 },
    { field: 'pesoEF', headerName: 'Peso(Kilos)', width: 120 },
    { field: 'tallaEF', headerName: 'Talla(Metros)', width: 120 },
    { field: 'imcef', headerName: 'IMC', width: 60 },
    { field: 'clasificacionEF', headerName: 'Clasificación', width: 120 },
    { field: 'idBiotipoEF', headerName: 'Biotipo', width: 150 },
];

const columnsSignosVitales = [
    { field: 'formatFecha', headerName: 'Fecha', width: 80 },
    { field: 'nameAtencion', headerName: 'Atención', width: 180 },
    { field: 'taSentadoEF', headerName: 'TA Sentado', width: 150 },
    { field: 'taAcostadoEF', headerName: 'TA Acostado', width: 150 },
    { field: 'pulsoEF', headerName: 'Pulso', width: 150 },
    { field: 'fcef', headerName: 'FC', width: 150 },
    { field: 'fref', headerName: 'FR', width: 150 },
    { field: 'temperaturaEF', headerName: 'Temperatura', width: 400 },
];

const columnsSintomasRespiratorio = [
    { field: 'formatFecha', headerName: 'Fecha', width: 150 },
    { field: 'nameAtencion', headerName: 'Atención', width: 300 },
    { field: 'recoSintR', headerName: 'Recomendaciones/Observaciones', width: 1000 },
];

const TableAntecedentes = ({ param = '', documento = '' }) => {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        async function GetAll() {
            try {
                const lsServer = await GetAllByDocumento(0, 0, documento);
                if (lsServer.status === 200)
                    setRows(lsServer.data.entities);
            } catch (error) {
                console.log(error);
            }
        }

        GetAll();
    }, []);


    return (
        <div style={{ height: 620, width: '100%' }}>
            <DataGrid
                rows={rows.length != 0 ? rows : []}
                columns={
                    param === 'ANTECEDENTES_PATALOGICOS' ? columnsAntecedentesPatologicos :
                        param === 'ACCIDENTES_TRABAJO' ? columnsAccidenteTrabajo :
                            param === 'ANTROPOMETRIA' ? columnsAntropometria :
                                param === 'SIGNOS_VITALES' ? columnsSignosVitales :
                                    param === 'REVISION_SISTEMAS' ? columnsRevisionSistema :
                                        param === 'EXPLORACION_MORFOLOGICA' ? columnsExploracionMorfologica :
                                            param === 'EXPLORACION_FUNCIONAL' ? columnsExploracionFuncional :
                                                param === 'RX_TORAX' ? columnsRxTorax :
                                                    param === 'ESPIROMETRIA' ? columnsEspirometria :
                                                        param === 'AUDIOMETRIA' ? columnsAudiometria :
                                                            param === 'VISIOMETRIA' ? columnsVisiometria :
                                                                param === 'LABORATORIO_CLINICO' ? columnsLaboratorioClinico :
                                                                    param === 'CUESTIONARIO_SINTOMAS' ? columnsSintomasRespiratorios :
                                                                        param === 'EKG' ? columnsEKG :
                                                                            param === 'RNM-COLUMNA_LUMBOSACRA' ? columnsRNMLumbosacra :
                                                                                param === 'RNM-COLUMNA_CERVICAL' ? columnsRNMCervical :
                                                                                    param === 'EXAMENES_PARACLINICOS' ? columnsExamenParaclinico :
                                                                                        param === 'IMPRESION_DIAGNOSTICA' ? colummsImpresionDiagnostico :
                                                                                            param === 'NOTIFICACION_EMPRESA' ? columnsNotificacionEmpresa :
                                                                                                param === 'NOTIFICACION_EMPLEADO' ? columnsNotificacionEmpleado :
                                                                                                    param === 'INFORMACION_CARDIOVASCULAR' ? columnsInformacionCardiovascular :
                                                                                                        param === 'SINTOMAS_RESPIRATORIOS' ? columnsSintomasRespiratorio : []
                }
                pageSize={9}
                rowsPerPageOptions={[9]}
            />
        </div>
    );
}

export default TableAntecedentes;