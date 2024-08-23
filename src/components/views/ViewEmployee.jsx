import { Fragment, useEffect, useState } from "react";
import { Grid, CardMedia, FormGroup, FormControlLabel, useMediaQuery } from '@mui/material';
import user from 'assets/img/user.png';

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
import { useTheme } from '@mui/material/styles';

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

import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import EpidemiologicalView from 'modules/EpidemiologicalView';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        transform: 'translateX(6px)',
        '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(22px)',
            '& .MuiSwitch-thumb:before': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    '#fff',
                )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
        width: 32,
        height: 32,
        '&::before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                '#fff',
            )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
        },
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        borderRadius: 20 / 2,
    },
}));

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
    const theme = useTheme();
    const isMobil = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Grid item xs={12} md={4}>
            <Grid container>
                {icons}<Typography variant="h5" sx={{ pl: 1.2 }}>{label}: </Typography> {isMobil ? <Typography variant="body2" sx={{ pl: 2.5 }}>{nameData ? nameData : 'SIN REGISTRO'}</Typography> : null}
            </Grid>

            {!isMobil ? <Typography variant="body2" sx={{ pl: 2.5 }}>{nameData ? nameData : 'SIN REGISTRO'}</Typography> : null}

            <Grid item xs={12} sx={{ mt: 1 }}>
                <Divider />
            </Grid>
        </Grid>
    );
}

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

/* const EmployeeInfo = ({ lsEmployee = [], disabled = false, documento, onChange, handleDocumento }) => {
    const theme = useTheme();
    const isMobil = useMediaQuery(theme.breakpoints.down('md'));

    const [openUpdate, setOpenUpdate] = useState(false);

    return (
       
    );
}; */

const ViewEmployee = ({ lsEmployee = [], title, documento, disabled = false, onChange, handleDocumento, children = null }) => {
    const theme = useTheme();
    const [openUpdate, setOpenUpdate] = useState(false);
    const [periodoDelDia, setPeriodoDelDia] = useState(false);
    const isMobil = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        const obtenerPeriodoDelDia = () => {
            const horaActual = new Date().getHours();
            if (horaActual >= 6 && horaActual <= 17)
                setPeriodoDelDia(false);
            else
                setPeriodoDelDia(true);
        };

        obtenerPeriodoDelDia();
        const intervalo = setInterval(obtenerPeriodoDelDia, 60000);

        return () => clearInterval(intervalo);
    }, []);

    return (
        <Fragment>
            <SubCard title={title !== '' ? <Typography variant="h4">{title}</Typography> : null}
                secondary={
                    <Fragment>
                        <Grid container spacing={2}>
                            <Grid item xs={3.5}>
                                <EpidemiologicalView documento={documento} />
                            </Grid>

                            <Grid item xs={8.5}>
                                <FormGroup>
                                    <FormControlLabel
                                        control={<MaterialUISwitch defaultChecked />}
                                        checked={periodoDelDia}
                                        onClick={(e) => setPeriodoDelDia(e.target.checked)}
                                        disabled={true}
                                        label={`TURNO: ${periodoDelDia ? 'NOCHE' : 'DÍA'}`}
                                    />
                                </FormGroup>
                            </Grid>
                        </Grid>
                    </Fragment>
                }
            >
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Grid item xs={12} md={3.2}>
                        <CardMedia
                            component="img"
                            image={lsEmployee?.imagenUrl ? lsEmployee?.imagenUrl : user}
                            sx={{ width: isMobil ? 150 : 200, borderRadius: '150px' }}
                        />
                    </Grid>

                    <Grid item xs={12} md={8.8}>
                        {/* <EmployeeInfo
                            disabled={disabled}
                            lsEmployee={lsEmployee}
                            onChange={onChange}
                            documento={documento}
                            handleDocumento={handleDocumento}
                        /> */}

                        <Grid container spacing={1}>
                            <ControlModal
                                title="Actualizar Empleado"
                                open={openUpdate}
                                onClose={() => setOpenUpdate(false)}
                                maxWidth="xl"
                            >
                                <UpdateEmployee idEmpleado={documento} getDataAttention={handleDocumento} setOpenUpdateTwo={setOpenUpdate} />
                            </ControlModal>

                            <Grid item xs={12} sx={{ pb: 4 }}>
                                <Stack direction="row" alignItems="center" alignContent="center" justifyContent="space-between">
                                    <TextField
                                        type="number"
                                        disabled={disabled}
                                        value={documento}
                                        onChange={onChange}
                                        onKeyDown={handleDocumento}
                                        id="standard-basic"
                                        label="Documento"
                                        variant="standard"
                                    />

                                    <Grid container alignItems="left" alignContent="center" spacing={1}>
                                        <Grid item xs={12} md={5.5}>
                                            <Stack alignItems="center" spacing={1}>
                                                <Typography variant="h3">
                                                    {lsEmployee?.nombres == null ? 'Digite Documento...' : lsEmployee?.nombres}
                                                </Typography>
                                            </Stack>
                                        </Grid>

                                        <Grid item xs={12} md={2.5}>
                                            {lsEmployee?.namePayStatus != null ?
                                                <Chip
                                                    size="small"
                                                    label={lsEmployee?.namePayStatus}
                                                    chipcolor={lsEmployee?.namePayStatus === 'ACTIVO (A)'
                                                        ? 'success' : 'error'}
                                                    sx={{ borderRadius: '4px', textTransform: 'capitalize' }}
                                                /> : null}
                                        </Grid>

                                        <Grid item xs={12} md={4}>
                                            <Typography variant="h4">
                                                <b>Profesión:</b> {lsEmployee?.nameOficio}
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                    <AnimateButton>
                                        <Button disabled={documento === '' && lsEmployee?.length === 0 ? true : false} onClick={() => setOpenUpdate(true)}>
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
                                                {lsEmployee?.nameRosterPosition}
                                            </Typography>
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <Typography variant="h5">
                                            Sede:
                                            <Typography variant="h6">
                                                {lsEmployee?.nameSede}
                                            </Typography>
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <Typography variant="h5">
                                            Fecha de Contrato:
                                            <Typography variant="h6">
                                                {lsEmployee?.fechaContrato && ViewFormat(lsEmployee?.fechaContrato)}
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
                                        nameData={lsEmployee?.email}
                                        label={ViewEmployeeDetails[0].label}
                                    />

                                    <ViewData
                                        icons={ViewEmployeeDetails[1].icons}
                                        nameData={lsEmployee?.celular}
                                        label={ViewEmployeeDetails[1].label}
                                    />

                                    <ViewData
                                        icons={ViewEmployeeDetails[2].icons}
                                        nameData={lsEmployee?.nameEscolaridad}
                                        label={ViewEmployeeDetails[2].label}
                                    />

                                    <ViewData
                                        icons={ViewEmployeeDetails[3].icons}
                                        nameData={lsEmployee?.nameCompany}
                                        label={ViewEmployeeDetails[3].label}
                                    />

                                    <ViewData
                                        icons={ViewEmployeeDetails[4].icons}
                                        nameData={lsEmployee?.fechaNaci && ViewFormat(lsEmployee?.fechaNaci)}
                                        label={ViewEmployeeDetails[4].label}
                                    />

                                    <ViewData
                                        icons={ViewEmployeeDetails[5].icons}
                                        nameData={lsEmployee?.nameGenero}
                                        label={ViewEmployeeDetails[5].label}
                                    />

                                    <ViewData
                                        icons={ViewEmployeeDetails[6].icons}
                                        nameData={lsEmployee?.nameEstadoCivil}
                                        label={ViewEmployeeDetails[6].label}
                                    />

                                    <ViewData
                                        icons={ViewEmployeeDetails[7].icons}
                                        nameData={lsEmployee?.contacto}
                                        label={ViewEmployeeDetails[7].label}
                                    />

                                    <ViewData
                                        icons={ViewEmployeeDetails[8].icons}
                                        nameData={lsEmployee?.telefonoContacto}
                                        label={ViewEmployeeDetails[8].label}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sx={{ pt: 1.5 }}>
                        <Divider />
                        <Accordion title={<><IconDatabase stroke={2} color={theme.palette.primary.main} size="1.3rem" />
                            <Typography sx={{ pl: 1 }} variant="h5">Ver mas...</Typography></>}
                        >
                            <Grid container spacing={1}>
                                <Grid item xs={12} md={6} lg={4}>
                                    <ViewDataDetails title="Rol" nameData={lsEmployee?.nameType} />
                                    <ViewDataDetails title="Tipo de Contrato" nameData={lsEmployee?.nameTipoContrato} />
                                    <ViewDataDetails title="Departamento" nameData={lsEmployee?.nameDepartamento} />
                                    <ViewDataDetails title="Área" nameData={lsEmployee?.nameArea} />
                                    <ViewDataDetails title="Subárea" nameData={lsEmployee?.nameSubArea} />
                                    <ViewDataDetails title="Fecha de ingreso" nameData={lsEmployee?.fechaIngreso && ViewFormat(lsEmployee?.fechaIngreso)} />
                                </Grid>

                                <Grid item xs={12} md={6} lg={4}>
                                    <ViewDataDetails title="Grupo" nameData={lsEmployee?.nameGrupo} />
                                    <ViewDataDetails title="General Position" nameData={lsEmployee?.nameGeneralPosition} />
                                    <ViewDataDetails title="EPS" nameData={lsEmployee?.nameEps} />
                                    <ViewDataDetails title="AFP" nameData={lsEmployee?.nameAfp} />
                                    <ViewDataDetails title="Turno" nameData={lsEmployee?.nameTurno} />
                                    <ViewDataDetails title="Fecha de último control" nameData={lsEmployee?.fechaUltimoControl && ViewFormat(lsEmployee?.fechaUltimoControl)} />
                                </Grid>

                                <Grid item xs={12} md={6} lg={4}>
                                    <ViewDataDetails title="Departamento de Nacimiento" nameData={lsEmployee?.nameDptoNacido} />
                                    <ViewDataDetails title="Municipio de Nacimiento" nameData={lsEmployee?.nameMunicipioNacido} />
                                    <ViewDataDetails title="Departamento de Residencia" nameData={lsEmployee?.nameDptoResidencia} />
                                    <ViewDataDetails title="Municipio de Residencia" nameData={lsEmployee?.nameMunicipioResidencia} />
                                    <ViewDataDetails title="Dir. Residencia" nameData={lsEmployee?.direccionResidencia} />
                                    <ViewDataDetails title="Fecha de egreso" nameData={lsEmployee?.fechaEgreso && ViewFormat(lsEmployee?.fechaEgreso)} />
                                </Grid>
                            </Grid>
                        </Accordion>
                    </Grid>
                </Grid>

                {children}
            </SubCard>
        </Fragment>
    );
}

export default ViewEmployee;