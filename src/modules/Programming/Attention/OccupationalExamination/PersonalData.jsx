import {
    Button,
    Grid,
    List,
    Typography,
    Tooltip
} from '@mui/material';

import ControlModal from 'components/controllers/ControlModal';
import PropTypes from 'prop-types';
import { ViewFormat } from 'components/helpers/Format';
import User from 'assets/img/user.png'
import Avatar from 'ui-component/extended/Avatar';
import SubCard from 'ui-component/cards/SubCard';
import { gridSpacing } from 'store/constant';
import { IconEdit } from '@tabler/icons';
import PhonelinkRingTwoToneIcon from '@mui/icons-material/PhonelinkRingTwoTone';
import PinDropTwoToneIcon from '@mui/icons-material/PinDropTwoTone';
import MailTwoToneIcon from '@mui/icons-material/MailTwoTone';
import PeopleIcon from '@mui/icons-material/People';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import ElderlyIcon from '@mui/icons-material/Elderly';
import EngineeringIcon from '@mui/icons-material/Engineering';
import { ListDetailsAll, ListDetails } from 'components/components/ListDetails';
import UpdateEmployee from './Update/UpdateEmployee';
import RoomPreferencesIcon from '@mui/icons-material/RoomPreferences';
import BusinessIcon from '@mui/icons-material/Business';
import SchoolIcon from '@mui/icons-material/School';
import { useState } from 'react';
import { DefaultValue } from 'components/helpers/Enums';

const DetailsViewOne = [
    {
        icons: <MailTwoToneIcon sx={{ fontSize: '1.3rem' }} />,
        name: 'Correo',
    },
    {
        icons: <PhonelinkRingTwoToneIcon sx={{ fontSize: '1.3rem' }} />,
        name: 'Celular',
    },
    {
        icons: <PinDropTwoToneIcon sx={{ fontSize: '1.3rem' }} />,
        name: 'Dirección de residencia',
    },
    {
        icons: <PinDropTwoToneIcon sx={{ fontSize: '1.3rem' }} />,
        name: 'Municipio de residencia',
    },
    {
        icons: <PeopleIcon sx={{ fontSize: '1.3rem' }} />,
        name: 'Nombre contacto',
    },
    {
        icons: <AddIcCallIcon sx={{ fontSize: '1.3rem' }} />,
        name: 'Teléfono contacto',
    },
    {
        icons: <BusinessIcon sx={{ fontSize: '1.3rem' }} />,
        name: 'EPS',
    },
    {
        icons: <ElderlyIcon sx={{ fontSize: '1.3rem' }} />,
        name: 'AFP',
    },
    {
        icons: <EngineeringIcon sx={{ fontSize: '1.3rem' }} />,
        name: 'ARL',
    },
]

const DetailsViewTwo = [
    { name: 'Sede de Trabajo', }, { name: 'Dirección de residencia mientras trabaja', }, { name: 'Municipio de residencia mientras trabaja', },
    { name: 'Departamento', }, { name: 'Área', }, { name: 'Posición/Cargo', }, { name: 'Grupo', },
    { name: 'Turno', }, { name: 'Tipo Contrato', }, { name: 'Fecha Contrato', }, { name: 'Antiguedad', }, { name: 'GES', }, { name: 'Fecha de ingreso', },
    { name: 'Fecha de último control' }, { name: 'Fecha de egreso' },
]

const PersonalData = ({ lsEmployee = [], getDataAttention, atencion }) => {
    const [openUpdate, setOpenUpdate] = useState(false);

    return (
        <Grid container spacing={gridSpacing}>
            <ControlModal
                title="ACTUALIZAR EMPLEADO"
                open={openUpdate}
                onClose={() => setOpenUpdate(false)}
                maxWidth="xl"
            >
                <UpdateEmployee idEmpleado={lsEmployee.documento} getDataAttention={getDataAttention} setOpenUpdateTwo={setOpenUpdate} key={1} />
            </ControlModal>

            <Grid item lg={6} xs={12}>
                <SubCard secondary={
                    <Tooltip title="Actualizar Empleado">
                        <Button disabled={lsEmployee.length === 0 ? true : false} onClick={() => setOpenUpdate(true)}>
                            <IconEdit stroke={1.5} size="1.3rem" />
                        </Button>
                    </Tooltip>
                }>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <Avatar sx={{ width: 80, height: 80 }} alt="Foto del Empleado" src={lsEmployee.imagenUrl !== null ? lsEmployee.imagenUrl : User} />
                        </Grid>

                        {lsEmployee.length !== 0 ?
                            <Grid item xs zeroMinWidth>
                                <Typography align="justify" variant="h4">
                                    <Grid container spacing={0.5}>
                                        <Grid item xs={9} md={10}>
                                            {lsEmployee.nombres}
                                        </Grid>

                                        <Grid item xs={3} md={2}>
                                            <Tooltip title="Actualizar Empleado">
                                                <Button disabled={lsEmployee.length === 0 ? true : false} onClick={() => setOpenUpdate(true)}>
                                                    <IconEdit stroke={1.5} />
                                                </Button>
                                            </Tooltip>
                                        </Grid>
                                    </Grid>
                                </Typography>

                                <Typography align="left" variant="h6">
                                    Genero: {lsEmployee.nameGenero}
                                </Typography>

                                <Typography align="left" variant="h6">
                                    Fecha De Nacimiento: {ViewFormat(lsEmployee.fechaNaci)}
                                </Typography>

                                <Typography align="left" variant="h6">
                                    Municipio De Nacimiento: {lsEmployee.nameMunicipioNacido}
                                </Typography>

                                <Typography align="left" variant="h6">
                                    Estado Civil: {lsEmployee.nameEstadoCivil}
                                </Typography>
                            </Grid> : null
                        }

                    </Grid>

                    <List component="nav" aria-label="main mailbox folders">
                        <Typography variant="h4" sx={{ my: 2 }}>Información Personales</Typography>
                        <ListDetailsAll icons={DetailsViewOne[0].icons} name={DetailsViewOne[0].name} campoRender={lsEmployee.email} />
                        <ListDetailsAll icons={DetailsViewOne[1].icons} name={DetailsViewOne[1].name} campoRender={lsEmployee.celular} />
                        <ListDetailsAll icons={<SchoolIcon sx={{ fontSize: '1.3rem' }} />} name="Escolaridad" campoRender={lsEmployee.nameEscolaridad} />
                        <ListDetailsAll icons={<RoomPreferencesIcon sx={{ fontSize: '1.3rem' }} />} name="Sede" campoRender={lsEmployee.nameSede} />
                        <ListDetailsAll icons={<BusinessIcon sx={{ fontSize: '1.3rem' }} />} name="Empresa" campoRender={lsEmployee.nameCompany} />

                        <ListDetailsAll icons={DetailsViewOne[4].icons} name={DetailsViewOne[4].name} campoRender={lsEmployee.contacto} />
                        <ListDetailsAll icons={DetailsViewOne[5].icons} name={DetailsViewOne[5].name} campoRender={lsEmployee.telefonoContacto} />

                        <Typography variant="h4" sx={{ my: 2 }}>Información De Seguridad Social</Typography>
                        <ListDetailsAll icons={DetailsViewOne[6].icons} name={DetailsViewOne[6].name} campoRender={lsEmployee.nameEps} />
                        <ListDetailsAll icons={DetailsViewOne[7].icons} name={DetailsViewOne[7].name} campoRender={lsEmployee.nameAfp} />
                        {DefaultValue.EMO_ATENCION_INGRESO === atencion ? null : <ListDetailsAll icons={DetailsViewOne[8].icons} name={DetailsViewOne[8].name} campoRender={lsEmployee.nameArl} />}
                    </List>
                </SubCard>
            </Grid >

            <Grid item lg={6} xs={12}>
                <SubCard>
                    <Grid container direction="column" spacing={2}>
                        <Typography variant="h4" sx={{ my: 2, ml: 2 }}>Información Demográfica</Typography>
                        <ListDetails name="Municipio de nacimiento" campoRender={lsEmployee.nameMunicipioNacido} />
                        <ListDetails name={DetailsViewOne[2].name} campoRender={lsEmployee.direccionResidencia} />
                        <ListDetails name={DetailsViewOne[3].name} campoRender={lsEmployee.nameMunicipioResidencia} />

                        <ListDetails name={DetailsViewTwo[1].name} campoRender={lsEmployee.direccionResidenciaTrabaja} />
                        <ListDetails name={DetailsViewTwo[2].name} campoRender={lsEmployee.nameMunicipioResidenciaTrabaja} />
                        <Typography variant="h4" sx={{ my: 2, ml: 2 }}>Información Contractual</Typography>

                        <ListDetails name={DetailsViewTwo[3].name} campoRender={lsEmployee.nameDepartamento} />
                        <ListDetails name={DetailsViewTwo[4].name} campoRender={lsEmployee.nameArea} />
                        <ListDetails name={`Posición/Cargo Del ${lsEmployee.nameTipoContrato1}`} campoRender={lsEmployee.nameRosterPosition} />
                        {DefaultValue.EMO_ATENCION_INGRESO === atencion ? null : <ListDetails name={DetailsViewTwo[6].name} campoRender={lsEmployee.nameGrupo} />}
                        {DefaultValue.EMO_ATENCION_CONTRO === atencion ? null : <ListDetails name={DetailsViewTwo[7].name} campoRender={lsEmployee.nameTurno} />}
                        <ListDetails name={DetailsViewTwo[8].name} campoRender={lsEmployee.nameTipoContrato} />
                        {DefaultValue.EMO_ATENCION_INGRESO === atencion ? null : <ListDetails name={DetailsViewTwo[9].name} campoRender={ViewFormat(lsEmployee.fechaContrato)} />}
                        <ListDetails name={DetailsViewTwo[11].name} campoRender={lsEmployee.nameGes} />

                        {lsEmployee?.fechaIngreso && <ListDetails name={DetailsViewTwo[12].name} campoRender={ViewFormat(lsEmployee?.fechaIngreso)} />}
                        {lsEmployee?.fechaEgreso && <ListDetails name={DetailsViewTwo[13].name} campoRender={ViewFormat(lsEmployee?.fechaEgreso)} />}
                        {lsEmployee?.fechaUltimoControl && <ListDetails name={DetailsViewTwo[14].name} campoRender={ViewFormat(lsEmployee?.fechaUltimoControl)} />}
                    </Grid>
                </SubCard>
            </Grid>
        </Grid >
    );
};

export default PersonalData;