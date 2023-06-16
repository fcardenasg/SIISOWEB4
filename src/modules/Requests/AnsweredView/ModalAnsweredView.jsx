import PropTypes from 'prop-types';
import { Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@mui/material';

import { Message } from 'components/helpers/Enums';
import { Fragment, useEffect, useState } from 'react';
import { GetAllRequestsDetaillsByIdSolicitud, GetFileRequests } from 'api/clients/RequestsClient';
import Cargando from 'components/loading/Cargando';

import AnimateButton from 'ui-component/extended/AnimateButton';
import ControlModal from 'components/controllers/ControlModal';
import ViewPDF from 'components/components/ViewPDF';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { MessageError, MessageSuccess } from 'components/alert/AlertAll';
import ViewEmployee from 'components/views/ViewEmployee';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import SubCard from 'ui-component/cards/SubCard';
import Chip from 'ui-component/extended/Chip';

const ModalAnsweredView = ({ lsCardRequests }) => {
    const [documento, setDocumento] = useState('');
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [dataPDF, setDataPDF] = useState(null);
    const [openReport, setOpenReport] = useState(false);

    const [lsEmployee, setLsEmployee] = useState([]);
    const [lsRequests, setLsRequests] = useState([]);
    const [timeWait, setTimeWait] = useState(false);

    const handleLoadingDocument = async (idEmployee) => {
        try {
            var lsServerEmployee = await GetByIdEmployee(idEmployee.target.value);

            if (lsServerEmployee.status === 200) {
                setLsEmployee(lsServerEmployee.data);
            }
        } catch (error) {
            setLsEmployee([]);
            setErrorMessage(Message.ErrorDeDatos);
        }
    }

    const handleViewPdf = async (id) => {
        try {
            setDataPDF(null);
            var serverPdf = await GetFileRequests(id);

            if (serverPdf.status === 200) {
                setDataPDF(serverPdf.data);

                setTimeout(() => {
                    setOpenReport(true);
                }, 500);
            }
        } catch (error) { }
    }

    useEffect(() => {
        const getAll = async () => {
            try {
                const event = {
                    target: { value: lsCardRequests.documento }
                }
                setDocumento(lsCardRequests.documento);
                handleLoadingDocument(event);

                await GetAllRequestsDetaillsByIdSolicitud(lsCardRequests.id).then(response => {
                    setLsRequests(response.data);
                });
            } catch (error) { }
        };

        getAll();
    }, []);

    setTimeout(() => {
        if (lsRequests.length !== 0)
            setTimeWait(true);
    }, 1000);

    return (
        <Fragment>
            <MessageSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            <ControlModal
                title={Message.VistaArchivo}
                open={openReport}
                onClose={() => setOpenReport(false)}
                maxWidth="md"
            >
                <ViewPDF dataPDF={dataPDF} />
            </ControlModal>

            {timeWait ?
                <ViewEmployee
                    title="Información del Empleado"
                    disabled={true}
                    key={lsEmployee.documento}
                    documento={documento}
                    onChange={(e) => setDocumento(e.target.value)}
                    lsEmployee={lsEmployee}
                    handleDocumento={handleLoadingDocument}
                >
                    <Grid sx={{ pt: 4 }}>
                        <SubCard title={<Typography variant='h4'>Lista De Solicitudes</Typography>}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TableContainer>
                                        <Table aria-label="collapsible table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Solicitud</TableCell>
                                                    <TableCell>Responsable Respuesta</TableCell>
                                                    <TableCell>Estado Respuesta</TableCell>
                                                    <TableCell>Fecha Registro</TableCell>
                                                    <TableCell>Acción</TableCell>
                                                </TableRow>
                                            </TableHead>

                                            <TableBody>
                                                {lsRequests.map((row) => (
                                                    <TableRow hover sx={{ '& > *': { borderBottom: 'unset' } }}>
                                                        <TableCell component="th" scope="row">{row.nameTipoSolicitud}</TableCell>
                                                        <TableCell>{row.nameAreaRespuesta}</TableCell>
                                                        <TableCell>
                                                            <Chip
                                                                size="small"
                                                                label={row.estadoRespuesta ? 'RESPONDIDA' : 'SIN RESPUESTA'}
                                                                chipcolor={row.estadoRespuesta ? 'success' : 'error'}
                                                            />
                                                        </TableCell>
                                                        <TableCell>{new Date(row.fechaRegistro).toLocaleString()}</TableCell>

                                                        <TableCell>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={6}>
                                                                    <AnimateButton>
                                                                        <Tooltip disabled={!row.estadoRespuesta ? true : false} title="Ver Archivo" onClick={() => handleViewPdf(row.id)}>
                                                                            <IconButton color="primary">
                                                                                <VisibilityIcon sx={{ fontSize: '2rem' }} />
                                                                            </IconButton>
                                                                        </Tooltip>
                                                                    </AnimateButton>
                                                                </Grid>
                                                            </Grid>
                                                        </TableCell>
                                                    </TableRow>))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>
                </ViewEmployee> : <Cargando />
            }

        </Fragment>
    );
};

ModalAnsweredView.propTypes = {
    about: PropTypes.string,
    avatar: PropTypes.string,
    contact: PropTypes.string,
    email: PropTypes.string,
    location: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string
};

export default ModalAnsweredView;