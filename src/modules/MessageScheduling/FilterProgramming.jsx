import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    Badge,
    Box,
    Button,
    CardContent,
    Checkbox,
    Divider,
    Drawer,
    Grid,
    IconButton,
    InputAdornment,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    TextField,
    Toolbar,
    Tooltip,
    Typography,
    useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { visuallyHidden } from '@mui/utils';
import { IconFileExport } from '@tabler/icons';
import { DeleteMedicines, GetAllMedicines } from 'api/clients/MedicinesClient';

import { MessageDelete, ParamDelete } from 'components/alert/AlertAll';
import { CodCatalogo, TitleButton } from 'components/helpers/Enums';
import swal from 'sweetalert';
import MainCard from 'ui-component/cards/MainCard';
import Chip from 'ui-component/extended/Chip';

import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import RadioButtonCheckedTwoToneIcon from '@mui/icons-material/RadioButtonCheckedTwoTone';
import SearchIcon from '@mui/icons-material/Search';
import Cargando from 'components/loading/Cargando';
import Iconify from 'components/iconify/iconify';
import { useBoolean } from 'hooks/use-boolean';
import PerfectScrollbar from 'react-perfect-scrollbar';
import SelectOnChange from 'components/input/SelectOnChange';
import { GetByTipoCatalogoCombo } from 'api/clients/CatalogClient';

const FilterProgramming = () => {
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const openFilters = useBoolean();
    const [dataDepartamento, setDataDepartamento] = useState('');
    const [dataSede, setDataSede] = useState('');
    const [dataArea, setDataArea] = useState('');

    const [lsDepartamento, setLsDepartamento] = useState([]);
    const [lsSede, setLsSede] = useState([]);
    const [lsArea, setLsArea] = useState([]);

    useEffect(() => {
        async function getAll() {
            try {
                const lsServerDep = await GetByTipoCatalogoCombo(CodCatalogo.DepartEmpresa);
                setLsDepartamento(lsServerDep.data);

                const lsServerSede = await GetByTipoCatalogoCombo(CodCatalogo.Sede);
                setLsSede(lsServerSede.data);

                const lsServerArea = await GetByTipoCatalogoCombo(CodCatalogo.Area);
                setLsArea(lsServerArea.data);
            } catch (error) { }
        }

        getAll();
    }, []);

    const renderHead = (
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ py: 2, pr: 1, pl: 2.5 }}>
            <Typography variant="h4" sx={{ flexGrow: 1 }}>Filtros</Typography>

            <Tooltip title="Restablecer">
                <IconButton /* onClick={onResetFilters} */>
                    <Badge color="error" variant="dot" invisible={true}>
                        <Iconify icon="solar:restart-bold" />
                    </Badge>
                </IconButton>
            </Tooltip>

            <Tooltip placement="top" title={TitleButton.Cancelar}>
                <IconButton onClick={openFilters.onFalse}>
                    <Iconify icon="mingcute:close-line" />
                </IconButton>
            </Tooltip>
        </Stack>
    );

    return (
        <>
            <Button
                size="large"
                disableRipple
                color="inherit"
                endIcon={
                    <Badge color="error" variant="dot" invisible={true}>
                        <Iconify icon="ic:round-filter-list" />
                    </Badge>
                }
                onClick={openFilters.onTrue}
            >
                {TitleButton.Filter}
            </Button>

            <Drawer
                anchor="right"
                open={openFilters.value}
                slotProps={{ backdrop: { invisible: true }, }}
                PaperProps={{ sx: { width: 360 }, }}
            >
                {renderHead}

                <Divider />

                <Grid container spacing={2} sx={{ p: 3 }}>
                    <Grid item xs={12}>
                        <Typography sx={{ mb: 2 }} variant="subtitle1">Seleccione el departamento</Typography>

                        <SelectOnChange
                            name="departamento"
                            label="Departamento"
                            value={dataDepartamento}
                            options={lsDepartamento}
                            onChange={(e) => setDataDepartamento(e.target.value)}
                            size={matchesXS ? 'small' : 'medium'}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Typography sx={{ mb: 2 }} variant="subtitle1">Seleccione la sede</Typography>

                        <SelectOnChange
                            name="sede"
                            label="Sede"
                            value={dataSede}
                            options={lsSede}
                            onChange={(e) => setDataSede(e.target.value)}
                            size={matchesXS ? 'small' : 'medium'}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Typography sx={{ mb: 2 }} variant="subtitle1">Seleccione el área</Typography>

                        <SelectOnChange
                            name="area"
                            label="Área"
                            value={dataArea}
                            options={lsArea}
                            onChange={(e) => setDataArea(e.target.value)}
                            size={matchesXS ? 'small' : 'medium'}
                        />
                    </Grid>
                </Grid>
            </Drawer>
        </>
    );
}

export default FilterProgramming;