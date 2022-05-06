import PropTypes from 'prop-types';
import { useState, useEffect, useCallback, useRef } from 'react';

// material-ui
import {
    Box,
    Button,
    CardContent,
    Chip,
    Divider,
    Grid,
    LinearProgress,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography
} from '@mui/material';

// project imports
import Avatar from 'ui-component/extended/Avatar';
import SubCard from 'ui-component/cards/SubCard';
import { gridSpacing } from 'store/constant';

// assets
import { IconEdit } from '@tabler/icons';
import PhonelinkRingTwoToneIcon from '@mui/icons-material/PhonelinkRingTwoTone';
import PinDropTwoToneIcon from '@mui/icons-material/PinDropTwoTone';
import MailTwoToneIcon from '@mui/icons-material/MailTwoTone';
import { GetByIdEmployee } from 'api/clients/EmployeeClient';
import Avatar3 from 'assets/images/users/avatar-3.png';
import PeopleIcon from '@mui/icons-material/People';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import BusinessIcon from '@mui/icons-material/Business';
import ElderlyIcon from '@mui/icons-material/Elderly';
import EngineeringIcon from '@mui/icons-material/Engineering';
// progress
function LinearProgressWithLabel({ value, ...other }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress {...other} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="textSecondary">{`${Math.round(value)}%`}</Typography>
            </Box>
        </Box>
    );
}

LinearProgressWithLabel.propTypes = {
    value: PropTypes.number
};

// personal details table
/** names Don&apos;t look right */
function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Full Name', ':', 'Anshan Handgun'),
    createData('Fathers Name', ':', 'Mr. Deepen Handgun'),
    createData('Address', ':', 'Street 110-B Kalians Bag, Dewan, M.P. INDIA'),
    createData('Zip Code', ':', '12345'),
    createData('Phone', ':', '+0 123456789 , +0 123456789'),
    createData('Email', ':', 'support@example.com'),
    createData('Website', ':', 'http://example.com')
];

// ==============================|| PROFILE 1 - PROFILE ||============================== //





const Personaldata = () => {

    const [employee, setEmployee] = useState([]);

    const idEmpleado = 29;
    async function GetById() {
        try {
            const lsServer = await GetByIdEmployee(idEmpleado);
            if (lsServer.status === 200) {
                setEmployee(lsServer.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

      /* EL useEffect QUE LLENA LA LISTA */
      useEffect(() => {
        GetById();
    },)

    return (
    <Grid container spacing={gridSpacing}>
        <Grid item lg={6} xs={12}>
        <SubCard
                        title="Datos Personales"
                        secondary={
                            <Button>
                                <IconEdit stroke={1.5} size="1.3rem" />
                            </Button>
                        }
                    >
    
          
                    <Grid container spacing={2} alignItems="center">
            
                              
                       
                        <Grid item>
                            <Avatar alt="User 1" src={Avatar3} />
                        </Grid>
                     



                        <Grid item xs zeroMinWidth>
                               <Typography align="left" variant="subtitle1">
                                    {employee.nombres}
                                </Typography>
                                <Typography align="left" variant="subtitle2">
                                    {employee.nameGenero} 
                               
                                    </Typography>
                                    <Typography align="left" variant="subtitle2">
                                    {employee.fechaNaci}
                                    </Typography>
                                    <Typography align="left" variant="subtitle2">
                                    {employee.nameEstadocivil}
                                    </Typography>
                            </Grid>


                    </Grid>
               
            


{/* const DataToInsert = PostEmployee(datos.documento, datos.nombres, FechaNaci, datos.type, datos.departamento,
                datos.area, datos.subArea, datos.grupo, datos.municipioNacido, datos.dptoNacido, FechaContrato,
                datos.rosterPosition, datos.tipoContrato, datos.generalPosition, datos.genero, datos.sede,
                datos.direccionResidencia, datos.municipioResidencia, datos.dptoResidencia, datos.celular, datos.eps,
                datos.afp, datos.turno, datos.email, datos.telefonoContacto, datos.estadoCivil, datos.empresa, datos.arl,
                datos.contacto, datos.escolaridad, datos.cesantias, datos.rotation, datos.payStatus, TermDate,
                datos.bandera, datos.ges, datos.usuarioModifica, FechaModificacion, datos.usuarioCreacion,
                FechaCreacion, imgSrc); */}

                <List component="nav" aria-label="main mailbox folders">
                    <ListItemButton>
                        <ListItemIcon>
                            <MailTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                        </ListItemIcon>
                        <ListItemText primary={<Typography variant="subtitle1">Correo</Typography>} />
                        <ListItemSecondaryAction>
                            <Typography variant="subtitle2" align="right">
                            {employee.email}
                            </Typography>       

                        </ListItemSecondaryAction>
                    </ListItemButton>
                    <Divider />
                    <ListItemButton>
                        <ListItemIcon>
                            <PhonelinkRingTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                        </ListItemIcon>
                        <ListItemText primary={<Typography variant="subtitle1">Celular</Typography>} />
                        <ListItemSecondaryAction>
                            <Typography variant="subtitle2" align="right">
                            {employee.celular}
                            </Typography>
                        </ListItemSecondaryAction>
                    </ListItemButton>
                    <Divider />
                    <ListItemButton>
                        <ListItemIcon>
                            <PinDropTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                        </ListItemIcon>
                        <ListItemText primary={<Typography variant="subtitle1">Dirección de residencia</Typography>} />
                        <ListItemSecondaryAction>
                            <Typography variant="subtitle2" align="right">
                            {employee.celular}
                            </Typography>
                        </ListItemSecondaryAction>
                    </ListItemButton>
                    <Divider />


                    <ListItemButton>
                        <ListItemIcon>
                            <PinDropTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                        </ListItemIcon>
                        <ListItemText primary={<Typography variant="subtitle1">Municipio de residencia</Typography>} />
                        <ListItemSecondaryAction>
                            <Typography variant="subtitle2" align="right">
                            {employee.nameMunicipioResidencia}
                            </Typography>
                        </ListItemSecondaryAction>
                    </ListItemButton>
                    <Divider />
                    <ListItemButton>
                        <ListItemIcon>
                            <PeopleIcon sx={{ fontSize: '1.3rem' }} />
                        </ListItemIcon>
                        <ListItemText primary={<Typography variant="subtitle1">Nombre contacto</Typography>} />
                        <ListItemSecondaryAction>
                            <Typography variant="subtitle2" align="right">
                            {employee.contacto}
                            </Typography>
                        </ListItemSecondaryAction>
                    </ListItemButton>
                    <Divider />
                    <ListItemButton>
                        <ListItemIcon>
                            <AddIcCallIcon sx={{ fontSize: '1.3rem' }} />
                        </ListItemIcon>
                        <ListItemText primary={<Typography variant="subtitle1">Teléfono contacto</Typography>} />
                        <ListItemSecondaryAction>
                            <Typography variant="subtitle2" align="right">
                            {employee.telefonoContacto}
                            </Typography>
                        </ListItemSecondaryAction>
                    </ListItemButton>
                    <Divider />

                    <ListItemButton>
                        <ListItemIcon>
                            <BusinessIcon sx={{ fontSize: '1.3rem' }} />
                        </ListItemIcon>
                        <ListItemText primary={<Typography variant="subtitle1">EPS</Typography>} />
                        <ListItemSecondaryAction>
                            <Typography variant="subtitle2" align="right">
                            {employee.telefonoContacto}
                            </Typography>
                        </ListItemSecondaryAction>
                    </ListItemButton>
                    <Divider />
                    <ListItemButton>
                        <ListItemIcon>
                            <ElderlyIcon sx={{ fontSize: '1.3rem' }} />
                        </ListItemIcon>
                        <ListItemText primary={<Typography variant="subtitle1">AFP</Typography>} />
                        <ListItemSecondaryAction>
                            <Typography variant="subtitle2" align="right">
                            {employee.telefonoContacto}
                            </Typography>
                        </ListItemSecondaryAction>
                    </ListItemButton>
                    <Divider />
                    <ListItemButton>
                        <ListItemIcon>
                            <EngineeringIcon sx={{ fontSize: '1.3rem' }} />
                        </ListItemIcon>
                        <ListItemText primary={<Typography variant="subtitle1">ARL</Typography>} />
                        <ListItemSecondaryAction>
                            <Typography variant="subtitle2" align="right">
                            {employee.telefonoContacto}
                            </Typography>
                        </ListItemSecondaryAction>
                    </ListItemButton>
            


                </List>
            
            </SubCard>
        </Grid>
        <Grid item lg={6} xs={12}>
            <Grid container direction="column" spacing={gridSpacing}>
                <Grid item xs={12}>
                    <SubCard
                        title="Información de la Empresa y Cargo"
                        secondary={
                            <Button>
                                <IconEdit stroke={1.5} size="1.3rem" />
                            </Button>
                        }
                    >
                        <Grid container direction="column" spacing={2}>
                         
                        <ListItemButton>
                        {/* <ListItemIcon>
                            <MailTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                        </ListItemIcon> */}
                        <ListItemText primary={<Typography variant="subtitle1">Sede de Trabajo</Typography>} />
                        <ListItemSecondaryAction>
                            <Typography variant="subtitle2" align="right">
                            {employee.nameSede}
                            </Typography>       

                        </ListItemSecondaryAction>
                    </ListItemButton>
                    <Divider />

                    <ListItemButton>
                        {/* <ListItemIcon>
                            <MailTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                        </ListItemIcon> */}
                        <ListItemText primary={<Typography variant="subtitle1">Departamento</Typography>} />
                        <ListItemSecondaryAction>
                            <Typography variant="subtitle2" align="right">
                            {employee.nameSede}
                            </Typography>       

                        </ListItemSecondaryAction>
                    </ListItemButton>

                    <Divider />
                    <ListItemButton>
                        {/* <ListItemIcon>
                            <MailTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                        </ListItemIcon> */}
                        <ListItemText primary={<Typography variant="subtitle1">Area</Typography>} />
                        <ListItemSecondaryAction>
                            <Typography variant="subtitle2" align="right">
                            {employee.nameSede}
                            </Typography>       

                        </ListItemSecondaryAction>
                    </ListItemButton>
                    <Divider />
                    <ListItemButton>
                        {/* <ListItemIcon>
                            <MailTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                        </ListItemIcon> */}
                        <ListItemText primary={<Typography variant="subtitle1">Subarea</Typography>} />
                        <ListItemSecondaryAction>
                            <Typography variant="subtitle2" align="right">
                            {employee.nameSede}
                            </Typography>       

                        </ListItemSecondaryAction>
                    </ListItemButton>
                    <Divider />
                    <ListItemButton>
                        {/* <ListItemIcon>
                            <MailTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                        </ListItemIcon> */}
                        <ListItemText primary={<Typography variant="subtitle1">Posición/Cargo</Typography>} />
                        <ListItemSecondaryAction>
                            <Typography variant="subtitle2" align="right">
                            {employee.nameSede}
                            </Typography>       

                        </ListItemSecondaryAction>
                    </ListItemButton>
                    <Divider />
                    <ListItemButton>
                        {/* <ListItemIcon>
                            <MailTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                        </ListItemIcon> */}
                        <ListItemText primary={<Typography variant="subtitle1">Grupo</Typography>} />
                        <ListItemSecondaryAction>
                            <Typography variant="subtitle2" align="right">
                            {employee.nameSede}
                            </Typography>       

                        </ListItemSecondaryAction>
                    </ListItemButton>
                    <Divider />
                    <ListItemButton>
                        {/* <ListItemIcon>
                            <MailTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                        </ListItemIcon> */}
                        <ListItemText primary={<Typography variant="subtitle1">Turno</Typography>} />
                        <ListItemSecondaryAction>
                            <Typography variant="subtitle2" align="right">
                            {employee.nameSede}
                            </Typography>       

                        </ListItemSecondaryAction>
                    </ListItemButton>
                    <Divider />
                    <ListItemButton>
                        {/* <ListItemIcon>
                            <MailTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                        </ListItemIcon> */}
                        <ListItemText primary={<Typography variant="subtitle1">Tipo Contrato</Typography>} />
                        <ListItemSecondaryAction>
                            <Typography variant="subtitle2" align="right">
                            {employee.nameSede}
                            </Typography>       

                        </ListItemSecondaryAction>
                    </ListItemButton>
                    <Divider />
                    <ListItemButton>
                        {/* <ListItemIcon>
                            <MailTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                        </ListItemIcon> */}
                        <ListItemText primary={<Typography variant="subtitle1">Fecha Contrato</Typography>} />
                        <ListItemSecondaryAction>
                            <Typography variant="subtitle2" align="right">
                            {employee.nameSede}
                            </Typography>       

                        </ListItemSecondaryAction>
                    </ListItemButton>
                    <Divider />
                    <ListItemButton>
                        {/* <ListItemIcon>
                            <MailTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                        </ListItemIcon> */}
                        <ListItemText primary={<Typography variant="subtitle1">Antiguedad</Typography>} />
                        <ListItemSecondaryAction>
                            <Typography variant="subtitle2" align="right">
                            {employee.nameSede}
                            </Typography>       

                        </ListItemSecondaryAction>
                    </ListItemButton>
                         
                        </Grid>
                    </SubCard>
                </Grid>
            
            </Grid>
        </Grid>
    </Grid>
    );
};

export default Personaldata;
