import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Avatar, Divider, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import User from 'assets/img/user.png';
import { GetAnioMeses, GetEdad, ViewFormat } from 'components/helpers/Format';
import AnimateComponent from 'components/loading/AnimateComponent';
import MainCard from 'ui-component/cards/MainCard';
import Chip from 'ui-component/extended/Chip';

const EmployeeDetail = ({ employeeData, openViewDetail }) => {
    const nameParts = employeeData.nombres.split(' ').slice(0, 3);

    return (
        <MainCard>
            <AnimateComponent>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
                        <Avatar
                            variant="rounded"
                            sx={{
                                bgcolor: 'inherit',
                                width: 70,
                                height: 70,
                                borderRadius: '10px',
                            }}
                            src={employeeData.imagenUrl !== null ? employeeData.imagenUrl : User}
                        />
                    </Grid>

                    <Grid item xs={12} md={8}>
                        <Grid container spacing={1}>
                            <Grid item xs={10}>
                                <Typography variant="h5">{nameParts.join(' ')}</Typography>
                                <Typography variant="h5" sx={{ my: 0.5 }}>C.C. {employeeData.documento}</Typography>
                                <Chip
                                    size="small"
                                    label={employeeData.namePayStatus}
                                    chipcolor={employeeData.namePayStatus === 'ACTIVO (A)' ? 'success' : 'error'}
                                    sx={{ borderRadius: '4px', textTransform: 'capitalize' }}
                                />
                            </Grid>

                            <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Tooltip title="Cerrar" placement="top">
                                    <IconButton onClick={openViewDetail.onFalse} color="error">
                                        <HighlightOffIcon sx={{ fontSize: '1.7rem' }} color="inherit" />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}><Divider /></Grid>

                    <Grid item xs={12}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1">ROSTER POSITION</Typography>
                                <Typography variant="body2">{employeeData.nameRosterPosition}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1">LUGAR DE RESIDENCIA</Typography>
                                <Typography variant="body2">{`${employeeData.nameDepartamentoResidencia}, ${employeeData.nameMunicipioResidencia}`}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1">CORREO</Typography>
                                <Typography variant="body2">{employeeData.email}</Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography variant="subtitle1">GENERO</Typography>
                                <Typography variant="body2">{employeeData.nameGenero}</Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography variant="subtitle1">EDAD</Typography>
                                <Typography variant="body2">{`${GetEdad(employeeData.fechaNaci)} AÑOS`}</Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography variant="subtitle1">F. DE CONTRATO</Typography>
                                <Typography variant="body2">{ViewFormat(employeeData.fechaContrato)}</Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography variant="subtitle1">ANTIGÜEDAD</Typography>
                                <Typography variant="body2">{GetAnioMeses(employeeData.fechaContrato)}</Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography variant="subtitle1">GES</Typography>
                                <Typography variant="body2">{employeeData.nameGes}</Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography variant="subtitle1">TELÉFONO</Typography>
                                <Typography variant="body2">{employeeData.celular}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </AnimateComponent>
        </MainCard>
    );
};

export default EmployeeDetail;