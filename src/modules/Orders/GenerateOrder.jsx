import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import {
    Table,
    useMediaQuery,
    TableBody,
    Grid,
    TableCell,
    TableContainer,
    TableHead,
    Button,
    Tooltip,
    IconButton,
    Stack,
    TableRow,
} from '@mui/material';

import { MessageSuccess, MessageDelete, ParamDelete } from 'components/alert/AlertAll';
import Transitions from 'ui-component/extended/Transitions';
import InputSelect from 'components/input/InputSelect';
import { FormProvider, useForm } from 'react-hook-form';
import SubCard from 'ui-component/cards/SubCard';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const GenerateOrder = ({ lsEmployee = [] }) => {
    const row = [];
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [addItemClickedDLTD, setAddItemClickedDLTD] = useState(false);
    const [lsCargo, setLsCargo] = useState([]);

    const methods = useForm();
    /* { resolver: yupResolver(validationSchema) } */

    const { handleSubmit, errors, reset } = methods;

    const handleDelete = (id) => {

    }

    const handleClick = (datos) => {

    }

    return (
        <Grid container spacing={2}>
            <MessageSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} />
            <MessageDelete open={openDelete} onClose={() => setOpenDelete(false)} />

            <Grid item xs={12}>
                <SubCard title="Historia Laboral DLTD">
                    <TableContainer>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Estudio</TableCell>
                                    <TableCell>Proveedor</TableCell>
                                    <TableCell>Ciudad</TableCell>
                                    <TableCell>
                                        Meses
                                    </TableCell>
                                    <TableCell>
                                        Acciones
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            {row.length != 0 ?
                                <TableBody>
                                    <TableRow hover sx={{ '& > *': { borderBottom: 'unset' } }}>
                                        <TableCell>
                                            {row.label}
                                        </TableCell>
                                        <TableCell>{row.label}</TableCell>
                                        <TableCell>{row.label}</TableCell>
                                        <TableCell>{row.label}</TableCell>
                                        <TableCell>
                                            <Tooltip title="Eliminar" onClick={() => handleDelete(row.id)}>
                                                <IconButton color="error" size="small">
                                                    <HighlightOffIcon sx={{ fontSize: '2rem' }} />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                </TableBody> : <></>
                            }

                        </Table>
                    </TableContainer>

                    <Transitions type="collapse" in={addItemClickedDLTD} position="top-left" direction="up">
                        <Grid container sx={{ pt: 5 }} spacing={2}>
                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="idEstudio"
                                        label="Estudio"
                                        defaultValue=""
                                        options={lsCargo}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="idProveedor"
                                        label="Proveedor"
                                        defaultValue=""
                                        options={lsCargo}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>

                            <Grid item xs={4}>
                                <FormProvider {...methods}>
                                    <InputSelect
                                        name="idCiudad"
                                        label="Ciudad"
                                        defaultValue=""
                                        options={lsCargo}
                                        size={matchesXS ? 'small' : 'medium'}
                                        bug={errors}
                                    />
                                </FormProvider>
                            </Grid>
                        </Grid>

                        <Grid container sx={{ pr: 0.5, pt: 3 }} justifyContent="flex-end">
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Button color="error" onClick={() => setAddItemClickedDLTD(false)}>
                                    Cancelar
                                </Button>
                                <Button variant="contained" size="small" onClick={handleSubmit(handleClick)}>
                                    Adicionar
                                </Button>
                            </Stack>
                        </Grid>
                    </Transitions>

                    {!addItemClickedDLTD ?
                        <Grid item sx={{ pl: 2, pt: 3 }}>
                            <Button disabled={lsEmployee.length === 0 ? true : false} variant="text" onClick={() => setAddItemClickedDLTD(true)}>
                                + Agregar Orden
                            </Button>
                        </Grid> : <></>}
                </SubCard>
            </Grid>
        </Grid>
    )
}

export default GenerateOrder;

GenerateOrder.propTypes = {
    lsEmployee: PropTypes.object
};