import {
    Button,
    Grid,
    List,
    Typography
} from '@mui/material';

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
import BusinessIcon from '@mui/icons-material/Business';
import ElderlyIcon from '@mui/icons-material/Elderly';
import EngineeringIcon from '@mui/icons-material/Engineering';
import { ListDetailsAll, ListDetails } from 'components/components/ListDetails';
import { handleBreakpoints } from '@mui/system';

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
    { name: 'Departamento', }, { name: 'Area', }, { name: 'Posición/Cargo', }, { name: 'Grupo', },
    { name: 'Turno', }, { name: 'Tipo Contrato', }, { name: 'Fecha Contrato', }, { name: 'Antiguedad', }, { name: 'GES', },
]

const handleUpdateEmployee = (idEmployee) => {
    return (
        <>
            HOLA MUNDO
        </>
    );
}

const PersonalData = ({ lsEmployee }) => {
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item lg={6} xs={12}>
                <SubCard title="Datos Personales" secondary={<Button onClick={handleUpdateEmployee(lsEmployee.documento)}><IconEdit stroke={1.5} size="1.3rem" /></Button>}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <Avatar sx={{ width: 60, height: 60 }} alt="Foto del Empleado" src={lsEmployee.imagenUrl != null ? lsEmployee.imagenUrl : User} />
                        </Grid>

                        {lsEmployee.length != 0 ?
                            <Grid item xs zeroMinWidth>
                                <Typography align="left" variant="h4">
                                    {lsEmployee.nombres}
                                </Typography>
                                <Typography align="left" variant="h7">
                                    {lsEmployee.nameGenero}
                                </Typography>
                                <Typography align="left" variant="subtitle2">
                                    {ViewFormat(lsEmployee.fechaNaci)}
                                </Typography>
                                <Typography align="left" variant="subtitle2">
                                    {lsEmployee.nameEstadoCivil}
                                </Typography>
                            </Grid>
                            : <></>}

                    </Grid>

                    <List component="nav" aria-label="main mailbox folders">
                        <ListDetailsAll icons={DetailsViewOne[0].icons} name={DetailsViewOne[0].name} campoRender={lsEmployee.email} />
                        <ListDetailsAll icons={DetailsViewOne[1].icons} name={DetailsViewOne[1].name} campoRender={lsEmployee.celular} />
                        <ListDetailsAll icons={DetailsViewOne[2].icons} name={DetailsViewOne[2].name} campoRender={lsEmployee.direccionResidencia} />
                        <ListDetailsAll icons={DetailsViewOne[3].icons} name={DetailsViewOne[3].name} campoRender={lsEmployee.nameMunicipioResidencia} />
                        <ListDetailsAll icons={DetailsViewOne[4].icons} name={DetailsViewOne[4].name} campoRender={lsEmployee.contacto} />
                        <ListDetailsAll icons={DetailsViewOne[5].icons} name={DetailsViewOne[5].name} campoRender={lsEmployee.telefonoContacto} />
                        <ListDetailsAll icons={DetailsViewOne[6].icons} name={DetailsViewOne[6].name} campoRender={lsEmployee.nameEps} />
                        <ListDetailsAll icons={DetailsViewOne[7].icons} name={DetailsViewOne[7].name} campoRender={lsEmployee.nameAfp} />
                        <ListDetailsAll icons={DetailsViewOne[8].icons} name={DetailsViewOne[8].name} campoRender={lsEmployee.nameArl} />
                    </List>
                </SubCard>
            </Grid>

            <Grid item lg={6} xs={12}>
                <SubCard title="Información de la Empresa y Cargo" secondary={<Button><IconEdit stroke={1.5} /></Button>}>
                    <Grid container direction="column" spacing={2}>
                        <ListDetails name={DetailsViewTwo[0].name} campoRender={lsEmployee.nameSede} />
                        <ListDetails name={DetailsViewTwo[1].name} campoRender={lsEmployee.direccionResidencia} />
                        <ListDetails name={DetailsViewTwo[2].name} campoRender={lsEmployee.nameMunicipioResidencia} />
                        <ListDetails name={DetailsViewTwo[3].name} campoRender={lsEmployee.nameDepartamento} />
                        <ListDetails name={DetailsViewTwo[4].name} campoRender={lsEmployee.nameArea} />
                        <ListDetails name={DetailsViewTwo[5].name} campoRender={lsEmployee.nameRosterPosition} />
                        <ListDetails name={DetailsViewTwo[6].name} campoRender={lsEmployee.nameGrupo} />
                        <ListDetails name={DetailsViewTwo[7].name} campoRender={lsEmployee.nameTurno} />
                        <ListDetails name={DetailsViewTwo[8].name} campoRender={lsEmployee.nameTipoContrato} />
                        <ListDetails name={DetailsViewTwo[9].name} campoRender={ViewFormat(lsEmployee.fechaContrato)} />
                        <ListDetails name={DetailsViewTwo[11].name} campoRender={lsEmployee.ges} />
                    </Grid>
                </SubCard>
            </Grid>
        </Grid>
    );
};

export default PersonalData;

PersonalData.propTypes = {
    lsEmployee: PropTypes.any,
};