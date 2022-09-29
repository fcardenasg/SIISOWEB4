import PropTypes from 'prop-types';
import { Fragment, useState } from "react";
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
import ControlModal from 'components/controllers/ControlModal';
import UpdateEmployee from 'modules/Programming/Attention/OccupationalExamination/Update/UpdateEmployee';

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
                {icons}<Typography variant="h5" sx={{ pl: 1.2 }}>{label}: </Typography>
            </Grid>
            <Typography variant="body2" sx={{ pl: 2.5 }}>{nameData}</Typography>
            <Grid item xs={12}>
                <Divider />
            </Grid>
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

const EmployeeInfo = ({ lsEmployee = [], disabled = false, documento, onChange, handleDocumento }) => {
    const [openUpdate, setOpenUpdate] = useState(false);

    return (
        <Grid container spacing={1}>
            <ControlModal
                title="ACTUALIZAR EMPLEADO"
                open={openUpdate}
                onClose={() => setOpenUpdate(false)}
                maxWidth="xl"
            >
                <UpdateEmployee idEmpleado={documento} getDataAttention={handleDocumento} setOpenUpdateTwo={setOpenUpdate} />
            </ControlModal>

            <Grid item xs={12} sx={{ pb: 4 }}>
                <Stack direction="row" alignItems="center" alignContent="center" justifyContent="space-between">
                    <TextField
                        disabled={disabled}
                        value={documento}
                        onChange={onChange}
                        onKeyDown={handleDocumento}
                        id="standard-basic"
                        label="Documento"
                        variant="standard"
                    />

                    <Grid container alignItems="leftS" alignContent="center">
                        <Grid item xs={6}>
                            <Stack sx={{ pr: 2 }} alignItems="center" spacing={1}>
                                <Typography variant="h3">
                                    {lsEmployee.nombres == null ? 'Digite Documento...' : lsEmployee.nombres}
                                </Typography>
                            </Stack>
                        </Grid>

                        <Grid item xs={6}>
                            {lsEmployee.namePayStatus != null ?
                                <Chip
                                    size="small"
                                    label={lsEmployee.namePayStatus}
                                    chipcolor={true ? 'success' : 'error'}
                                    sx={{ borderRadius: '4px', textTransform: 'capitalize' }}
                                /> : <></>}
                        </Grid>
                    </Grid>

                    {/* AQUI VA EL ACTUALIZAR */}
                    <AnimateButton>
                        <Button disabled={documento === '' && lsEmployee.length === 0 ? true : false} onClick={() => setOpenUpdate(true)}>
                            <IconEdit stroke={2} size="1.3rem" />
                        </Button>
                    </AnimateButton>

                </Stack>
            </Grid>

            <Grid item xs={12} sx={{ pb: 1 }}>
                <Grid container>
                    <Grid item xs={4}>
                        <Typography variant="h5">
                            Roster Position:
                            <Typography variant="h6">
                                {lsEmployee.nameRosterPosition}
                            </Typography>
                        </Typography>
                    </Grid>

                    <Grid item xs={4}>
                        <Typography variant="h5">
                            Sede:
                            <Typography variant="h6">
                                {lsEmployee.nameSede}
                            </Typography>
                        </Typography>
                    </Grid>

                    <Grid item xs={4}>
                        <Typography variant="h5">
                            Fecha de Contrato:
                            <Typography variant="h6">
                                {lsEmployee.fechaContrato == null ? '' : ViewFormat(lsEmployee.fechaContrato)}
                            </Typography>
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12} sx={{ pb: 1 }}>
                <Divider orientation="horizontal" />
            </Grid>

            <Grid item xs={12}>
                <Grid container spacing={2}>
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
    disabled: PropTypes.bool,
    handleDocumento: PropTypes.object,
    onChange: PropTypes.object,
};

const ViewEmployee = ({ lsEmployee = [], title, documento, disabled = false, onChange, handleDocumento }) => {
    const theme = useTheme();

    return (
        <Fragment>
            <SubCard title={<Typography variant="h4">{title}</Typography>}>
                <Grid container alignItems="center">
                    <Grid item xs={3.2}>
                        <CardMedia
                            component="img"
                            image={lsEmployee.imagenUrl === undefined ? user :
                                lsEmployee.imagenUrl === '' ? user : lsEmployee.imagenUrl}
                            sx={{ width: 200, borderRadius: '150px' }}
                        />
                    </Grid>

                    <Grid item xs={8.8}>
                        <EmployeeInfo
                            disabled={disabled}
                            lsEmployee={lsEmployee}
                            onChange={onChange}
                            documento={documento}
                            handleDocumento={handleDocumento}
                        />
                    </Grid>

                    <Grid item xs={12} sx={{ pt: 1.5 }}>
                        <Divider />
                        <Accordion title={<><IconDatabase stroke={2} color={theme.palette.primary.main} size="1.3rem" />
                            <Typography sx={{ pl: 1 }} variant="h5">Ver mas...</Typography></>}
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
                    </Grid>
                </Grid>
            </SubCard>
        </Fragment>
    );
}

export default ViewEmployee;

ViewEmployee.propTypes = {
    lsEmployee: PropTypes.object,
    title: PropTypes.string,
    documento: PropTypes.string,
    disabled: PropTypes.bool,
    handleDocumento: PropTypes.object,
};