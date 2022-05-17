import React, { useEffect, useState } from 'react';
// material-ui
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import {
    Button, Grid, MenuItem, TextField, Divider,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    FormHelperText,
    Select,
    Stack,
    Box, Tab, Tabs,
    useMediaQuery,
    Typography,
    Tooltip,
    Fab,
    Collapse,
    IconButton,
    Avatar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Card, CardActions, CardContent, CardHeader, CardMedia, Modal

} from '@mui/material';



// project imports
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';

// assets
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


// Terceros
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { yupResolver } from '@hookform/resolvers/yup';

// project imports
import UserDetailsCard from 'ui-component/cards/UserDetailsCard';
import UserProfileCard from 'ui-component/cards/UserProfileCard';
import UserSimpleCard from 'ui-component/cards/UserSimpleCard';
import FollowerCard from 'ui-component/cards/FollowerCard';



// project imports
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';
import InputText from 'components/input/InputText';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { FormProvider, useForm } from 'react-hook-form';


import { Message, TitleButton, ValidationMessage } from 'components/helpers/Enums';

// assets
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';


// table data
function createData(name, calories, fat, carbs, protein, price) {
    return {
        name,
        calories,
        fat,
        carbs,
        protein,
        price,
        history: [
            { date: '1', customerId: 'MPI', amount: 3 },
            { date: '2', customerId: 'MPO', amount: 1 }
        ]
    };
}

function Row({ row }) {
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    return (
        <>
            <TableRow hover sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell sx={{ pl: 3 }}>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell>{row.calories}</TableCell>
                <TableCell >{row.fat}</TableCell>
                <TableCell >{row.carbs}</TableCell>
                <TableCell >{row.protein}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box
                            sx={{
                                margin: 1
                            }}
                        >
                            <TableContainer>
                                <SubCard
                                    sx={{ bgcolor: theme.palette.mode === 'dark' ? 'dark.800' : 'grey.50', mb: 2 }}
                                    title="Exposición Ocupacional > Tipo de Riesgo > Quimico"
                                    content={false}
                                >
                                    <Table size="small" aria-label="purchases">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Consecutivo</TableCell>
                                                <TableCell>Clase</TableCell>
                                                <TableCell>Exposición</TableCell>
                                                <TableCell >Año</TableCell>
                                                <TableCell >Mes</TableCell>
                                                <TableCell >GR sin EPP</TableCell>
                                                <TableCell >GPR con EPP</TableCell>
                                                <TableCell >Medidas de Control</TableCell>

                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {row.history?.map((historyRow) => (
                                                <TableRow hover key={historyRow.date}>
                                                   <TableCell>{historyRow.customerId}</TableCell>
                                                    <TableCell>{historyRow.customerId}</TableCell>
                                                    <TableCell >{historyRow.amount}</TableCell>
                                                    <TableCell >  {historyRow.amount} </TableCell>
                                                    <TableCell>{historyRow.customerId}</TableCell>
                                                    <TableCell >{historyRow.amount}</TableCell>
                                                    <TableCell >{historyRow.amount}</TableCell>


                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </SubCard>
                            </TableContainer>

                            <TableContainer>
                                <SubCard
                                    sx={{ bgcolor: theme.palette.mode === 'dark' ? 'dark.800' : 'grey.50', mb: 2 }}
                                    title="Exposición Ocupacional > Tipo de Riesgo > Físico"
                                    content={false}
                                >
                                    <Table size="small" aria-label="purchases">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Consecutivo</TableCell>
                                                <TableCell>Clase</TableCell>
                                                <TableCell>Exposición</TableCell>
                                                <TableCell >Año</TableCell>
                                                <TableCell >Mes</TableCell>
                                                <TableCell >GR sin EPP</TableCell>
                                                <TableCell >GPR con EPP</TableCell>
                                                <TableCell >Medidas de Control</TableCell>

                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {row.history?.map((historyRow) => (

                                                
                                                <TableRow hover key={historyRow.date}>
                                                    
                                                   <TableCell>{historyRow.customerId}</TableCell>
                                                    <TableCell>{historyRow.customerId}</TableCell>
                                                    <TableCell >{historyRow.amount}</TableCell>
                                                    <TableCell >  {historyRow.amount} </TableCell>
                                                    <TableCell>{historyRow.customerId}</TableCell>
                                                    <TableCell >{historyRow.amount}</TableCell>
                                                    <TableCell >{historyRow.amount}</TableCell>


                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </SubCard>
                            </TableContainer>



                            <TableContainer>
                                <SubCard
                                    sx={{ bgcolor: theme.palette.mode === 'dark' ? 'dark.800' : 'grey.50', mb: 2 }}
                                    title="Exposición Ocupacional > Tipo de Riesgo > Psicosocial"
                                    content={false}
                                >
                                    <Table size="small" aria-label="purchases">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Consecutivo</TableCell>
                                                <TableCell>Clase</TableCell>
                                                <TableCell>Exposición</TableCell>
                                                <TableCell >Año</TableCell>
                                                <TableCell >Mes</TableCell>
                                                <TableCell >GR sin EPP</TableCell>
                                                <TableCell >GPR con EPP</TableCell>
                                                <TableCell >Medidas de Control</TableCell>

                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {row.history?.map((historyRow) => (
                                                <TableRow hover key={historyRow.date}>
                                                   <TableCell>{historyRow.customerId}</TableCell>
                                                    <TableCell>{historyRow.customerId}</TableCell>
                                                    <TableCell >{historyRow.amount}</TableCell>
                                                    <TableCell >  {historyRow.amount} </TableCell>
                                                    <TableCell>{historyRow.customerId}</TableCell>
                                                    <TableCell >{historyRow.amount}</TableCell>
                                                    <TableCell >{historyRow.amount}</TableCell>


                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </SubCard>
                            </TableContainer>



                            <TableContainer>
                                <SubCard
                                    sx={{ bgcolor: theme.palette.mode === 'dark' ? 'dark.800' : 'grey.50', mb: 2 }}
                                    title="Exposición Ocupacional > Tipo de Riesgo > Biológico"
                                    content={false}
                                >
                                    <Table size="small" aria-label="purchases">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Consecutivo</TableCell>
                                                <TableCell>Clase</TableCell>
                                                <TableCell>Exposición</TableCell>
                                                <TableCell >Año</TableCell>
                                                <TableCell >Mes</TableCell>
                                                <TableCell >GR sin EPP</TableCell>
                                                <TableCell >GPR con EPP</TableCell>
                                                <TableCell >Medidas de Control</TableCell>

                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {row.history?.map((historyRow) => (
                                                <TableRow hover key={historyRow.date}>
                                                   <TableCell>{historyRow.customerId}</TableCell>
                                                    <TableCell>{historyRow.customerId}</TableCell>
                                                    <TableCell >{historyRow.amount}</TableCell>
                                                    <TableCell >  {historyRow.amount} </TableCell>
                                                    <TableCell>{historyRow.customerId}</TableCell>
                                                    <TableCell >{historyRow.amount}</TableCell>
                                                    <TableCell >{historyRow.amount}</TableCell>


                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </SubCard>
                            </TableContainer>


                            <TableContainer>
                                <SubCard
                                    sx={{ bgcolor: theme.palette.mode === 'dark' ? 'dark.800' : 'grey.50', mb: 2 }}
                                    title="Exposición Ocupacional > Tipo de Riesgo > Ergonómico carga física"
                                    content={false}
                                >
                                    <Table size="small" aria-label="purchases">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Consecutivo</TableCell>
                                                <TableCell>Clase</TableCell>
                                                <TableCell>Exposición</TableCell>
                                                <TableCell >Año</TableCell>
                                                <TableCell >Mes</TableCell>
                                                <TableCell >GR sin EPP</TableCell>
                                                <TableCell >GPR con EPP</TableCell>
                                                <TableCell >Medidas de Control</TableCell>

                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {row.history?.map((historyRow) => (
                                                <TableRow hover key={historyRow.date}>
                                                   <TableCell>{historyRow.customerId}</TableCell>
                                                    <TableCell>{historyRow.customerId}</TableCell>
                                                    <TableCell >{historyRow.amount}</TableCell>
                                                    <TableCell >  {historyRow.amount} </TableCell>
                                                    <TableCell>{historyRow.customerId}</TableCell>
                                                    <TableCell >{historyRow.amount}</TableCell>
                                                    <TableCell >{historyRow.amount}</TableCell>


                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </SubCard>
                            </TableContainer>

                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

Row.propTypes = {
    row: PropTypes.object
};

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
    createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
    createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
    createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5)
];



// ==============================|| PROFILE 1 - PROFILE ACCOUNT ||============================== //

const Workhistory = () => {

    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const [open, setOpen] = useState(false);
    const [currency, setCurrency] = useState('Washington');
    const handleChange1 = (event) => {
        setCurrency(event.target.value);
    };


    const [valueBasic, setValueBasic] = React.useState(new Date());
    const [addItemClicked, setAddItemClicked] = useState(false);

    const [experience, setExperience] = useState('Startup');
    const handleChange2 = (event) => {
        setExperience(event.target.value);
    };


    const methods = useForm();

    const { handleSubmit, errors, reset } = methods;

    // array of products

    const [allAmounts, setAllAmounts] = useState({
        subTotal: 0,
        appliedTaxValue: 0.1,
        appliedDiscountValue: 0.05,
        taxesAmount: 0,
        discountAmount: 0,
        totalAmount: 0
    });





    return (



        <Grid container spacing={gridSpacing}>
            <Grid item xs={12} md={12}>

                <MainCard
                    content={false}
                    title={<Typography variant="h4">HISTORIA LABORAL OTRAS EMPRESAS</Typography>}
                    secondary={<SecondaryAction link="https://next.material-ui.com/components/tables/" />}
                >
                    {/* table */}
                    <TableContainer>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ pl: 3 }} />
                                    <TableCell>Empresa</TableCell>
                                    <TableCell>Cargo</TableCell>
                                    <TableCell>Fecha</TableCell>
                                    <TableCell>Años</TableCell>
                                    <TableCell sx={{ pr: 3 }}>
                                       Meses
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <Row key={row.name} row={row} />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </MainCard>


            </Grid>


            <Grid item xs={12} md={12}>

                <MainCard
                    content={false}
                    title={<Typography variant="h4">HISTORIA LABORAL DLTD</Typography>}
                    secondary={<SecondaryAction link="https://next.material-ui.com/components/tables/" />}
                >
                    {/* table */}
                    <TableContainer>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ pl: 3 }} />
                                    <TableCell>Área</TableCell>
                                    <TableCell >Cargo</TableCell>
                                    <TableCell >Fecha</TableCell>
                                    <TableCell >Año</TableCell>
                                    <TableCell >Meses</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <Row key={row.name} row={row} />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </MainCard>


            </Grid>


        </Grid>






    );
};

export default Workhistory;
