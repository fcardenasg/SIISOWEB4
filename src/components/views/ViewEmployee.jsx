import PropTypes from 'prop-types';
import { Fragment, } from "react";
import { useSelector } from 'react-redux';
import { Grid, CardMedia } from '@mui/material'
import user from 'assets/img/user.png'
import { useTheme } from "@mui/material/styles";

import AnimateButton from 'ui-component/extended/AnimateButton';

import {
    Button,
    Divider,
    ListItemButton,
    ListItemText,
    ListItemSecondaryAction,
    TextField,
    Stack,
    Typography
} from '@mui/material';

import Chip from 'ui-component/extended/Chip';

import {
    IconEdit,
    IconMail,
    IconPhone,
    IconHierarchy,
    IconUser,
    IconDeviceMobile,
    IconSchool,
    IconDatabase,
    IconCalendar,
    IconBuildingFactory2,
    IconGenderBigender
} from '@tabler/icons';
import { ViewFormat } from "components/helpers/Format";
import SubCard from 'ui-component/cards/SubCard';
import Accordion from 'components/accordion/Accordion';

const ViewEmployeeDetails = [
    { icons: <IconMail stroke={2} size="1.3rem" />, label: 'Email' },
    { icons: <IconDeviceMobile stroke={2} size="1.3rem" />, label: 'Celular' },
    { icons: <IconSchool stroke={2} size="1.3rem" />, label: 'Escolaridad' },
    { icons: <IconBuildingFactory2 stroke={2} size="1.3rem" />, label: 'Empresa' },
    { icons: <IconCalendar stroke={2} size="1.3rem" />, label: 'Fecha de Nacimiento' },
    { icons: <IconGenderBigender stroke={2} size="1.3rem" />, label: 'Genero' },
    { icons: <IconHierarchy stroke={2} size="1.3rem" />, label: 'Estado Civil' },
    { icons: <IconUser stroke={2} size="1.3rem" />, label: 'Contacto' },
    { icons: <IconPhone stroke={2} size="1.3rem" />, label: 'Telefono de Contacto' },
]

const ViewData = ({ icons, nameData, label }) => {
    return (
        <Grid item xs={4}>
            <Grid container>
                {icons}<Typography variant="h4" sx={{ pl: 1.2 }}>{label}: </Typography>
            </Grid>
            <Typography variant="body2" sx={{ pl: 2.5 }}>{nameData}</Typography>
        </Grid>
    );
}

ViewData.propTypes = {
    icons: PropTypes.any,
    nameData: PropTypes.string,
    label: PropTypes.string,
};

const ViewDataDetails = ({ title, nameData }) => {
    return (
        <Fragment>
            <ListItemButton>
                <ListItemText primary={<Typography variant="subtitle1">{title}</Typography>} />
                <ListItemSecondaryAction>
                    <Grid item xs zeroMinWidth>
                        <Typography variant="subtitle2" noWrap>
                            {nameData}
                        </Typography>
                    </Grid>
                </ListItemSecondaryAction>
            </ListItemButton>
            <Divider />
        </Fragment>
    );
}

ViewDataDetails.propTypes = {
    title: PropTypes.string,
    nameData: PropTypes.string,
};

const EmployeeInfo = ({ lsEmployee = [], documento, onChange, handleDocumento }) => {
    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Stack direction="row" alignItems="center" alignContent="center" justifyContent="space-between">

                    <Grid container>
                        <Stack sx={{ pr: 2 }} direction="row" alignItems="center" spacing={1}>
                            <Typography variant="h3">{lsEmployee.nombres == null ? 'Digite Documento...' : lsEmployee.nombres}</Typography>
                        </Stack>
                        {lsEmployee.namePayStatus != null ?
                            <Chip
                                size="small"
                                label={lsEmployee.namePayStatus}
                                chipcolor={true ? 'success' : 'error'}
                                sx={{ borderRadius: '4px', textTransform: 'capitalize' }}
                            /> : <></>}
                    </Grid>

                    <TextField sx={{ pr: 5 }} value={documento} onChange={onChange} onKeyDown={handleDocumento} id="standard-basic" label="Documento" variant="standard" />
                    {/* AQUI VA EL ACTUALIZAR */}
                    <AnimateButton>
                        <Button>
                            <IconEdit stroke={2} size="1.3rem" />
                        </Button>
                    </AnimateButton>

                </Stack>
            </Grid>

            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={3}>
                        <Typography variant="h4">
                            Cargo:
                            <Typography variant="h6">
                                {lsEmployee.nameRosterPosition}
                            </Typography>
                        </Typography>
                    </Grid>

                    <Grid item xs={3}>
                        <Typography variant="h4">
                            Sede:
                            <Typography variant="h6">
                                {lsEmployee.nameSede}
                            </Typography>
                        </Typography>
                    </Grid>

                    <Grid item xs={3}>
                        <Typography variant="h4">
                            Fecha de Contrato:
                            <Typography variant="h6">
                                {lsEmployee.fechaContrato == null ? '' : ViewFormat(lsEmployee.fechaContrato)}
                            </Typography>
                        </Typography>
                    </Grid>

                    <Grid item xs={3}>
                        <Typography variant="h4">
                            Edad:
                            <Typography variant="h6">
                                {lsEmployee.length == 0 ? '' : '20 Años'}
                            </Typography>
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <Divider />
            </Grid>

            <Grid item xs={12}>
                <Grid container spacing={3}>
                    <ViewData
                        icons={ViewEmployeeDetails[0].icons}
                        nameData={lsEmployee.email}
                        label={ViewEmployeeDetails[0].label}
                    />

                    <ViewData
                        icons={ViewEmployeeDetails[1].icons}
                        nameData={lsEmployee.celular}
                        label={ViewEmployeeDetails[1].label}
                    />

                    <ViewData
                        icons={ViewEmployeeDetails[2].icons}
                        nameData={lsEmployee.nameEscolaridad}
                        label={ViewEmployeeDetails[2].label}
                    />

                    <ViewData
                        icons={ViewEmployeeDetails[3].icons}
                        nameData={lsEmployee.nameCompany}
                        label={ViewEmployeeDetails[3].label}
                    />

                    <ViewData
                        icons={ViewEmployeeDetails[4].icons}
                        nameData={lsEmployee.fechaNaci == null ? '' : ViewFormat(lsEmployee.fechaNaci)}
                        label={ViewEmployeeDetails[4].label}
                    />

                    <ViewData
                        icons={ViewEmployeeDetails[5].icons}
                        nameData={lsEmployee.nameGenero}
                        label={ViewEmployeeDetails[5].label}
                    />

                    <ViewData
                        icons={ViewEmployeeDetails[6].icons}
                        nameData={lsEmployee.nameEstadoCivil}
                        label={ViewEmployeeDetails[6].label}
                    />

                    <ViewData
                        icons={ViewEmployeeDetails[7].icons}
                        nameData={lsEmployee.contacto}
                        label={ViewEmployeeDetails[7].label}
                    />

                    <ViewData
                        icons={ViewEmployeeDetails[8].icons}
                        nameData={lsEmployee.telefonoContacto}
                        label={ViewEmployeeDetails[8].label}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

EmployeeInfo.propTypes = {
    lsEmployee: PropTypes.object,
    documento: PropTypes.string,
    handleDocumento: PropTypes.object,
    onChange: PropTypes.object,
};

const ViewEmployee = ({ lsEmployee = [], documento, onChange, handleDocumento }) => {
    const theme = useTheme();
    const customization = useSelector((state) => state.customization);

    return (
        <Fragment>
            <SubCard>
                <Grid container justifyContent="center" alignItems="center">
                    <Grid item xs={3.2}>
                        <CardMedia
                            component="img"
                            image={lsEmployee.imagenUrl != null ? lsEmployee.imagenUrl : user}
                            sx={{ width: 260, borderRadius: `${customization.borderRadius}px`, overflow: 'hidden' }}
                        />
                    </Grid>

                    <Grid item xs={8.8}>
                        <EmployeeInfo lsEmployee={lsEmployee} onChange={onChange} documento={documento} handleDocumento={handleDocumento} />
                    </Grid>

                    <Grid item xs={12} sx={{ pt: 1.5 }}>
                        <Accordion title={<><IconDatabase stroke={2} color={theme.palette.primary.main} size="1.3rem" />
                            <Typography sx={{ pl: 1 }} variant="h4">Ver mas...</Typography></>}
                        >
                            <Grid container spacing={1}>
                                <Grid item xs={4}>
                                    <ViewDataDetails title="Rol" nameData={lsEmployee.nameType} />
                                    <ViewDataDetails title="Tipo de Contrato" nameData={lsEmployee.nameTipoContrato} />
                                    <ViewDataDetails title="Departamento" nameData={lsEmployee.nameDepartamento} />
                                    <ViewDataDetails title="Area" nameData={lsEmployee.nameArea} />
                                    <ViewDataDetails title="Subarea" nameData={lsEmployee.nameSubArea} />

                                </Grid>

                                <Grid item xs={4}>
                                    <ViewDataDetails title="Grupo" nameData={lsEmployee.nameGrupo} />
                                    <ViewDataDetails title="General Position" nameData={lsEmployee.nameGeneralPosition} />
                                    <ViewDataDetails title="EPS" nameData={lsEmployee.nameEps} />
                                    <ViewDataDetails title="AFP" nameData={lsEmployee.nameAfp} />
                                    <ViewDataDetails title="Turno" nameData={lsEmployee.nameTurno} />
                                </Grid>

                                <Grid item xs={4}>
                                    <ViewDataDetails title="Departamento de Nacimiento" nameData={lsEmployee.nameDptoNacido} />
                                    <ViewDataDetails title="Municipio de Nacimiento" nameData={lsEmployee.nameMunicipioNacido} />
                                    <ViewDataDetails title="Departamento de Residencia" nameData={lsEmployee.nameDptoResidencia} />
                                    <ViewDataDetails title="Municipio de Residencia" nameData={lsEmployee.nameMunicipioResidencia} />
                                    <ViewDataDetails title="Dir. Residencia" nameData={lsEmployee.direccionResidencia} />
                                </Grid>
                            </Grid>
                        </Accordion>
                        <Divider />
                    </Grid>
                </Grid>
            </SubCard>
        </Fragment>
    );
}

export default ViewEmployee;

ViewEmployee.propTypes = {
    lsEmployee: PropTypes.object,
    documento: PropTypes.string,
    handleDocumento: PropTypes.object,
};