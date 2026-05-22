import { Box, CardMedia, FormControlLabel, FormGroup, FormHelperText, Grid, IconButton, Tooltip, useMediaQuery } from '@mui/material';
import user from 'assets/img/user.png';
import { Fragment, useEffect, useState } from "react";

import AnimateButton from 'ui-component/extended/AnimateButton';

import {
    Divider,
    ListItemButton,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import ControlModal from 'components/controllers/ControlModal';
import UpdateEmployee from 'modules/Programming/Attention/OccupationalExamination/Update/UpdateEmployee';
import Chip from 'ui-component/extended/Chip';

import {
    IconBuildingFactory2,
    IconCalendar,
    IconDatabase,
    IconDeviceMobile,
    IconEdit,
    IconGenderBigender,
    IconHierarchy,
    IconMail,
    IconPhone,
    IconUser,
    IconSchool
} from '@tabler/icons';
import Accordion from 'components/accordion/Accordion';
import { UpperFirstChar, ViewFormat } from "components/helpers/Format";
import SubCard from 'ui-component/cards/SubCard';

import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import EpidemiologicalView from 'modules/EpidemiologicalView';
import { ColorDrummondltd } from "themes/colors";
import Iconify from 'components/iconify/iconify';

const SocialSecurityInfo = ({ dataEmployee }) => {
    return (
        <Box sx={{ display: "flex", textAlign: "center", gap: 2, flexWrap: "wrap", mt: 1 }}>
            <Box sx={{ display: "flex", textAlign: "center", gap: 1 }}>
                <Iconify icon="mdi:building" color="#1E88E5" />
                <Typography variant="body2" color="text.secondary" sx={{ textTransform: "capitalize" }}>
                    Sede: {dataEmployee?.nameSede ? dataEmployee?.nameSede?.toLowerCase() : "Sin registro"}
                </Typography>
            </Box>

            <Box sx={{ display: "flex", textoA: "center", gap: 1 }}>
                <Iconify icon="mdi:cake-variant" color="#8E24AA" />
                <Typography variant="body2" color="text.secondary" sx={{ textTransform: "capitalize" }}>
                    Edad: {dataEmployee?.edad ? `${dataEmployee?.edad} año(s)` : "Sin registro"}
                </Typography>
            </Box>

            <Box sx={{ display: "flex", textoA: "center", gap: 1 }}>
                <IconCalendar color="#43A047" />
                <Typography variant="body2" color="text.secondary" sx={{ textTransform: "capitalize" }}>
                    Antigüedad: {dataEmployee?.antiguedad ? `${dataEmployee?.antiguedad} año(s)` : "Sin registro"}
                </Typography>
            </Box>

            <Box sx={{ display: "flex", textoA: "center", gap: 1 }}>
                <Iconify icon="mdi:stethoscope" color="#FB8C00" />
                <Typography variant="body2" color="text.secondary" sx={{ textTransform: "capitalize" }}>
                    EPS: {dataEmployee?.nameEps ? dataEmployee?.nameEps?.toLowerCase() : "Sin registro"}
                </Typography>
            </Box>
        </Box>
    );
};

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
    { icons: <IconGenderBigender stroke={2} size="1.3rem" />, label: 'Sexo / Genero' },
    { icons: <IconCalendar stroke={2} size="1.3rem" />, label: 'Fecha de nacimiento' },
    { icons: <IconHierarchy stroke={2} size="1.3rem" />, label: 'Estado civil' },
    { icons: <IconUser stroke={2} size="1.3rem" />, label: 'Contacto' }
]

const ViewData = ({ icons, nameData, label }) => {
    return (
        <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {icons}
            <Typography variant="h4" sx={{ fontSize: '0.87rem', flexShrink: 0 }}>{label}: </Typography>
            <Typography variant="h6" sx={{ fontSize: '0.87rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flexGrow: 1, textTransform: 'capitalize' }}>{nameData ? nameData : 'Sin registro'}</Typography>
        </Grid>
    );
}

const ViewDataDetails = ({ title, nameData }) => {
    const theme = useTheme();

    return (
        <>
            <ListItemButton sx={{ paddingTop: '4px', paddingBottom: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4" sx={{ fontSize: '0.87rem', flexShrink: 0, color: theme.palette.grey[700], pr: 1 }}>
                    {title}
                </Typography>
                <Typography
                    variant="h6"
                    sx={{
                        fontSize: '0.87rem',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        textAlign: 'right',
                        textTransform: 'capitalize',
                        minWidth: '40%',
                        maxWidth: '70%'
                    }}
                >
                    {nameData || 'Sin registro'}
                </Typography>
            </ListItemButton>
            <Divider />
        </>
    );
}

const ViewEmployee = ({ lsEmployee = [], title, documento, disabled = false, onChange, handleDocumento, children = null, errors }) => {
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
            <ControlModal
                title="Actualizar Empleado"
                open={openUpdate}
                onClose={() => setOpenUpdate(false)}
                maxWidth="xl"
            >
                <UpdateEmployee idEmpleado={documento} getDataAttention={handleDocumento} setOpenUpdateTwo={setOpenUpdate} />
            </ControlModal>

            <SubCard darkTitle content={false} title={title && UpperFirstChar(title)}
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
                <Grid container spacing={1} sx={{ mt: 0.2, px: 2 }}>
                    <Grid item xs={12} md={3.2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CardMedia
                            component="img"
                            image={lsEmployee?.imagenUrl ? lsEmployee?.imagenUrl : user}
                            sx={{ width: isMobil ? 150 : 200, height: isMobil ? 150 : 200, borderRadius: '16px' }}
                        />
                    </Grid>

                    <Grid item xs={12} md={8.8}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                                        {!disabled &&
                                            <TextField
                                                type="text"
                                                disabled={disabled}
                                                value={documento}
                                                onChange={(e) => {
                                                    const value = e.target.value.replace(/[^0-9]/g, '');
                                                    e.target.value = value;
                                                    if (onChange) onChange(e);
                                                }}
                                                onKeyDown={(e) => {
                                                    if (e.key === ' ' || e.key === '-' || e.key === '+' || e.key === 'e' || e.key === 'E') {
                                                        e.preventDefault();
                                                    }
                                                    if (handleDocumento) handleDocumento(e);
                                                }}
                                                id="documento-input"
                                                size="small"
                                                label="Documento"
                                                variant="standard"
                                                error={!!errors?.documento}
                                                helperText={errors?.documento?.message}
                                                sx={{ width: '100px', mr: 2 }}
                                                inputProps={{
                                                    inputMode: 'numeric',
                                                    pattern: '[0-9]*'
                                                }}
                                            />
                                        }

                                        <Typography variant="h4" sx={{ fontSize: '1.1rem' }}>
                                            {disabled ?
                                                <>{lsEmployee?.documento} • {lsEmployee?.nombres}</>
                                                : lsEmployee?.nombres == null ? 'Digite Documento...'
                                                    : lsEmployee?.nombres}
                                        </Typography>

                                        {lsEmployee?.namePayStatus &&
                                            <Chip
                                                size="small"
                                                label={lsEmployee?.namePayStatus}
                                                chipcolor={lsEmployee?.namePayStatus === 'ACTIVO (A)'
                                                    ? 'success' : 'error'}
                                                sx={{ borderRadius: '4px', textTransform: 'capitalize' }}
                                            />
                                        }
                                    </Box>

                                    <AnimateButton>
                                        <Tooltip title="Actualizar Empleado" placement="top">
                                            <span>
                                                <IconButton
                                                    sx={{ color: ColorDrummondltd.RedDrummond }}
                                                    onClick={() => setOpenUpdate(true)}
                                                    disabled={documento === '' || lsEmployee?.length === 0}
                                                >
                                                    <IconEdit stroke={2} size="1.5rem" />
                                                </IconButton>
                                            </span>
                                        </Tooltip>
                                    </AnimateButton>
                                </Stack>
                            </Grid>

                            <Grid item xs={12}>
                                <SocialSecurityInfo
                                    dataEmployee={
                                        {
                                            nameSede: lsEmployee?.nameSede,
                                            edad: lsEmployee?.edad,
                                            antiguedad: lsEmployee?.antiguedad,
                                            nameEps: lsEmployee?.nameEps
                                        }
                                    }
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Divider orientation="horizontal" />
                            </Grid>

                            <Grid item xs={12}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12} md={6} lg={4} sx={{ display: 'flex', alignItems: 'center', gap: .3 }}>
                                        <Typography variant="h4" sx={{ fontSize: '0.87rem', flexShrink: 0 }}>Tipo de contrato:</Typography>
                                        <Typography variant="h6" sx={{ fontSize: '0.87rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flexGrow: 1, textTransform: 'capitalize' }}>{lsEmployee?.nameTipoContrato?.toLowerCase()}</Typography>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4} sx={{ display: 'flex', alignItems: 'center', gap: .3 }}>
                                        <Typography variant="h4" sx={{ fontSize: '0.87rem', flexShrink: 0 }}>Fecha de contrato:</Typography>
                                        <Typography variant="h6" sx={{ fontSize: '0.87rem', flexGrow: 1 }}>{lsEmployee?.fechaContrato && ViewFormat(lsEmployee?.fechaContrato)}</Typography>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4} sx={{ display: 'flex', alignItems: 'center', gap: .3 }}>
                                        <Typography variant="h4" sx={{ fontSize: '0.87rem', flexShrink: 0 }}>Terminación de contrato:</Typography>
                                        <Typography variant="h6" sx={{ fontSize: '0.87rem' }}>
                                            {lsEmployee?.termDate && ViewFormat(lsEmployee?.termDate)}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4} sx={{ display: 'flex', alignItems: 'center', gap: .3 }}>
                                        <Typography variant="h4" sx={{ fontSize: '0.87rem', flexShrink: 0 }}>Departamento:</Typography>
                                        <Typography variant="h6" sx={{ fontSize: '0.87rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flexGrow: 1, textTransform: 'capitalize' }}>{lsEmployee?.nameDepartamento?.toLowerCase()}</Typography>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4} sx={{ display: 'flex', alignItems: 'center', gap: .3 }}>
                                        <Typography variant="h4" sx={{ fontSize: '0.87rem', flexShrink: 0 }}>R. position:</Typography>
                                        <Typography variant="h6" sx={{ fontSize: '0.87rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flexGrow: 1 }}>{lsEmployee?.nameRosterPosition}</Typography>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={4} sx={{ display: 'flex', alignItems: 'center', gap: .3 }}>
                                        <Typography variant="h4" sx={{ fontSize: '0.87rem', flexShrink: 0 }}>Profesión:</Typography>
                                        <Typography variant="h6" sx={{ fontSize: '0.87rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flexGrow: 1, textTransform: 'capitalize' }}>{lsEmployee?.nameOficio?.toLowerCase()}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12}>
                                <Divider orientation="horizontal" />
                            </Grid>

                            <Grid item xs={12}>
                                <Grid container spacing={1}>
                                    <ViewData
                                        icons={ViewEmployeeDetails[0].icons}
                                        nameData={lsEmployee?.email?.toUpperCase()}
                                        label={ViewEmployeeDetails[0].label}
                                    />

                                    <ViewData
                                        icons={ViewEmployeeDetails[1].icons}
                                        nameData={lsEmployee?.celular}
                                        label={ViewEmployeeDetails[1].label}
                                    />

                                    <ViewData
                                        icons={ViewEmployeeDetails[2].icons}
                                        nameData={UpperFirstChar(lsEmployee?.nameEscolaridad)}
                                        label={ViewEmployeeDetails[2].label}
                                    />

                                    <ViewData
                                        icons={ViewEmployeeDetails[3].icons}
                                        nameData={lsEmployee?.nameCompany}
                                        label={ViewEmployeeDetails[3].label}
                                    />

                                    <ViewData
                                        icons={ViewEmployeeDetails[4].icons}
                                        nameData={`${UpperFirstChar(lsEmployee?.nameGenero)} ${lsEmployee?.nameGrupoLGBT != null ? `- ${lsEmployee?.nameGrupoLGBT}` : ''}`}
                                        label={ViewEmployeeDetails[4].label}
                                    />

                                    <ViewData
                                        icons={ViewEmployeeDetails[5].icons}
                                        nameData={lsEmployee?.fechaNaci && ViewFormat(lsEmployee?.fechaNaci)}
                                        label={ViewEmployeeDetails[5].label}
                                    />

                                    <ViewData
                                        icons={ViewEmployeeDetails[6].icons}
                                        nameData={lsEmployee?.nameEstadoCivil?.toLowerCase()}
                                        label={ViewEmployeeDetails[6].label}
                                    />

                                    <ViewData
                                        icons={ViewEmployeeDetails[7].icons}
                                        nameData={lsEmployee?.contacto?.toLowerCase()}
                                        label={ViewEmployeeDetails[7].label}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 1 }}>
                        <Divider />
                        <Accordion title={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <IconDatabase stroke={2} color={theme.palette.primary.main} size="1.3rem" />
                                <Typography variant="h5">Ver mas...</Typography>
                            </Box>
                        }>
                            <Grid container spacing={1}>
                                <Grid item xs={12} md={6} lg={4}>
                                    <ViewDataDetails title="Rol" nameData={lsEmployee?.nameType} />
                                    <ViewDataDetails title="General position" nameData={UpperFirstChar(lsEmployee?.nameGeneralPosition)} />
                                    <ViewDataDetails title="Área" nameData={UpperFirstChar(lsEmployee?.nameArea)} />
                                    <ViewDataDetails title="Subarea" nameData={UpperFirstChar(lsEmployee?.nameArea)} />
                                    <ViewDataDetails title="Grupo" nameData={lsEmployee?.nameGrupo} />
                                    <ViewDataDetails title="Turno" nameData={lsEmployee?.nameTurno?.toLowerCase()} />
                                    <ViewDataDetails title="Rotación" nameData={lsEmployee?.nameRotation?.toLowerCase()} />
                                </Grid>

                                <Grid item xs={12} md={6} lg={4}>
                                    <ViewDataDetails title="Dpto. de nacimiento" nameData={UpperFirstChar(lsEmployee?.nameDptoNacido)} />
                                    <ViewDataDetails title="Mun. de nacimiento" nameData={UpperFirstChar(lsEmployee?.nameMunicipioNacido)} />
                                    <ViewDataDetails title="Dpto. de residencia" nameData={UpperFirstChar(lsEmployee?.nameDptoResidencia)} />
                                    <ViewDataDetails title="Mun. de residencia" nameData={UpperFirstChar(lsEmployee?.nameMunicipioResidencia)} />
                                    <ViewDataDetails title="Dir. Residencia" nameData={lsEmployee?.direccionResidencia} />
                                    <ViewDataDetails title="Dpto. de residencia laboral" nameData={UpperFirstChar(lsEmployee?.nameDptoResidenciaLaboral)} />
                                    <ViewDataDetails title="Mun. de residencia laboral" nameData={UpperFirstChar(lsEmployee?.nameMunicipioResidenciaLaboral)} />
                                </Grid>

                                <Grid item xs={12} md={6} lg={4}>
                                    <ViewDataDetails title="AFP" nameData={lsEmployee?.nameAfp?.toLowerCase()} />
                                    <ViewDataDetails title="ARL" nameData={lsEmployee?.nameArl?.toLowerCase()} />
                                    <ViewDataDetails title="Cesantías" nameData={lsEmployee?.nameCesantias?.toLowerCase()} />
                                    <ViewDataDetails title="GES" nameData={lsEmployee?.nameGes?.toUpperCase()} />
                                    <ViewDataDetails title="Fecha de ingreso" nameData={ViewFormat(lsEmployee?.fechaIngreso)} />
                                    <ViewDataDetails title="Fecha de último control" nameData={ViewFormat(lsEmployee?.fechaUltimoControl)} />
                                    <ViewDataDetails title="Fecha de egreso" nameData={ViewFormat(lsEmployee?.fechaEgreso)} />
                                </Grid>
                            </Grid>
                        </Accordion>
                    </Grid>

                    {errors?.documento && (
                        <Grid item xs={12} sx={{ mb: 1 }}>
                            <FormHelperText error>{errors.documento?.message}</FormHelperText>
                        </Grid>
                    )}
                </Grid>

                {children}
            </SubCard>
        </Fragment >
    );
}

export default ViewEmployee;