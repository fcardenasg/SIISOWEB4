import { Button, Grid } from "@mui/material";
import { GetByIdDataReport } from "api/clients/OccupationalExaminationClient";
import { GetByMail } from "api/clients/UserClient";
import { GetAllByDocumentWorkHistory } from "api/clients/WorkHistoryClient";
import { GetAllByDocumentWorkHistoryOtherCompany } from "api/clients/WorkHistoryOtherCompany";
import { Fragment } from "react";
import AnimateButton from "ui-component/extended/AnimateButton";
import { GetAllRHL, GetAllRHLOE, GetDataExploracion } from 'api/clients/WorkHistoryRiskClient';
import { useState } from "react";
import useAuth from "hooks/useAuth";
import { generateReportIndex } from "../EMO";
import ControlModal from "components/controllers/ControlModal";
import ViewPDF from "components/components/ViewPDF";
import { generateConceptoExamenOcupacional, generateCuestionarioSintomasRespiratorio, generateEspacioConfinado, generateFramingham, generateHistoriaClinicaOcupacional, generateTrabajoAltura } from "./Report";


const SingleReportView = ({ documento, resultData }) => {
    const { user } = useAuth();

    const [dataPDF, setDataPDF] = useState(null);
    const [openReport, setOpenReport] = useState(false);


    const handleClickReportAll = async (idNumber) => {
        try {
            setDataPDF(null);
            setOpenReport(true);

            var dataPDFTwo = null;

            var lsDataReport = await GetByIdDataReport(resultData);
            var lsDataUser = await GetByMail(user.nameuser);
            var resultExpoDLTD = await GetDataExploracion(documento);
            //reporte riesgos
            var lsServerWorkHistory = await GetAllByDocumentWorkHistory(0, 0, documento);
            var lsServerWorkHistoryOtherCompany = await GetAllByDocumentWorkHistoryOtherCompany(0, 0, documento);

            var lsRiesgoHLD = await GetAllRHL(documento);
            var lsRiesgoHLDO = await GetAllRHLOE(documento);

            if (idNumber === 1) { dataPDFTwo = generateConceptoExamenOcupacional(lsDataReport.data, lsDataUser.data); }

            if (idNumber === 2) {
                dataPDFTwo = generateHistoriaClinicaOcupacional(lsDataReport.data, lsDataUser.data, resultExpoDLTD.data, lsRiesgoHLD.data,
                    lsRiesgoHLDO.data, lsServerWorkHistory.data.entities, lsServerWorkHistoryOtherCompany.data.entities);
            }

            if (idNumber === 3) { dataPDFTwo = generateTrabajoAltura(lsDataReport.data, lsDataUser.data); }

            if (idNumber === 4) { dataPDFTwo = generateEspacioConfinado(lsDataReport.data, lsDataUser.data); }

            if (idNumber === 5) { dataPDFTwo = generateCuestionarioSintomasRespiratorio(lsDataReport.data, lsDataUser.data); }

            if (idNumber === 6) { dataPDFTwo = generateFramingham(lsDataReport.data, lsDataUser.data); }

            if (idNumber === 7) {
                dataPDFTwo = generateReportIndex(lsDataReport.data, lsDataUser.data, resultExpoDLTD.data,
                    lsRiesgoHLD.data, lsRiesgoHLDO.data, lsServerWorkHistory.data.entities,
                    lsServerWorkHistoryOtherCompany.data.entities);
            }

            setDataPDF(dataPDFTwo);
        } catch (err) { }
    };

    return (
        <Fragment>
            <ControlModal
                title="VISTA DE REPORTE"
                open={openReport}
                onClose={() => setOpenReport(false)}
                maxWidth="xl"
            >
                <ViewPDF dataPDF={dataPDF} />
            </ControlModal>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <AnimateButton>
                        <Button variant="outlined" fullWidth onClick={() => handleClickReportAll(1)}>
                            Imprimir Concepto Examen Ocupacional
                        </Button>
                    </AnimateButton>
                </Grid>

                <Grid item xs={12}>
                    <AnimateButton>
                        <Button variant="outlined" fullWidth onClick={() => handleClickReportAll(2)}>
                            Imprimir Historia Clinica Ocupacional
                        </Button>
                    </AnimateButton>
                </Grid>

                <Grid item xs={12}>
                    <AnimateButton>
                        <Button variant="outlined" fullWidth onClick={() => handleClickReportAll(3)}>
                            Imprimir Trabajo En Altura
                        </Button>
                    </AnimateButton>
                </Grid>

                <Grid item xs={12}>
                    <AnimateButton>
                        <Button variant="outlined" fullWidth onClick={() => handleClickReportAll(4)}>
                            Imprimir Especio Confinado
                        </Button>
                    </AnimateButton>
                </Grid>

                <Grid item xs={12}>
                    <AnimateButton>
                        <Button variant="outlined" fullWidth onClick={() => handleClickReportAll(5)}>
                            Imprimir Cuestionario de Sintomas Respiratorio
                        </Button>
                    </AnimateButton>
                </Grid>

                <Grid item xs={12}>
                    <AnimateButton>
                        <Button variant="outlined" fullWidth onClick={() => handleClickReportAll(6)}>
                            Imprimir Framingham
                        </Button>
                    </AnimateButton>
                </Grid>

                <Grid item xs={12}>
                    <AnimateButton>
                        <Button variant="outlined" fullWidth onClick={() => handleClickReportAll(7)}>
                            Imprimir Toda la Historia Clinica
                        </Button>
                    </AnimateButton>
                </Grid>
            </Grid>
        </Fragment>
    );
}

export default SingleReportView;