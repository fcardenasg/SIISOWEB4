import { useState, useEffect, useCallback } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    FormControl,
    FormControlLabel,
    Grid,
    InputAdornment,
    Radio,
    RadioGroup,
    TextField,
    useMediaQuery
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';

import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { GetAllByTipoCatalogo, GetByTipoCatalogoCombo } from 'api/clients/CatalogClient';
import InputText from 'components/input/InputText';
import InputSelect from 'components/input/InputSelect';
import { TitleButton, CodCatalogo, ValidationMessage, Message } from 'components/helpers/Enums';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { MessageSuccess, MessageError } from 'components/alert/AlertAll';
import { PostUser } from 'formatdata/UserForm';
import { InsertUser } from 'api/clients/UserClient';
import { GetComboRol } from 'api/clients/RolClient';
import { RHFUpload } from 'components/upload';
import InputDatePicker from 'components/input/InputDatePicker';
import HelpCard from './HelpCard';
import { GetAllSoporte } from 'api/clients/HelpClient';
import useAuth from 'hooks/useAuth';
import { UpperFirstChar } from 'components/helpers/Format';

function compareByValue(a, b) {
    return a.value - b.value;
}

const HelpManagement = () => {
    const [rows, setRows] = useState([]);
    const [lsData, setLsData] = useState([]);
    const [search, setSearch] = useState('');
    const [radioSearch, setRadioSearch] = useState(1);
    const [lsEstado, setLsEstado] = useState([]);

    useEffect(() => {
        async function getAllData() {
            try {
                const serverLsEstado = await GetByTipoCatalogoCombo(CodCatalogo.SoporteEstado);
                if (serverLsEstado.status === 200) {
                    setLsEstado(serverLsEstado.data.sort(compareByValue));
                    setRadioSearch(serverLsEstado.data[0].value);

                    const serverData = await GetAllSoporte(serverLsEstado.data[0].value);
                    if (serverData.status === 200) {
                        setLsData(serverData.data);
                        setRows(serverData.data);
                    }
                }
            } catch (error) { }
        }

        getAllData();
    }, []);

    useEffect(() => {
        async function getAll() {
            try {
                const serverData = await GetAllSoporte(radioSearch);
                if (serverData.status === 200) {
                    setLsData(serverData.data);
                    setRows(serverData.data);
                }
            } catch (error) { }
        }

        getAll();
    }, [radioSearch]);

    const handleSearch = (event) => {
        const newString = event?.target.value;
        setSearch(newString || '');

        if (newString) {
            const newRows = rows.filter((row) => {
                let matches = true;

                const properties = ['id', 'nameTipoIncidente', 'namePrioridad', 'nameTipoCaso', 'usuarioRegistro', 'nameSede', 'nameEstado'];
                let containsQuery = false;

                properties.forEach((property) => {
                    if (row[property]?.toString().toLowerCase().includes(newString.toString().toLowerCase())) {
                        containsQuery = true;
                    }
                });

                if (!containsQuery) {
                    matches = false;
                }
                return matches;
            });
            setLsData(newRows);
        } else {
            setLsData(rows);
        }
    };

    return (
        <MainCard title="Responder casos">
            <Grid container spacing={2} justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Grid item xs={12} md={6} lg={8}>
                    <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon fontSize="small" />
                                </InputAdornment>
                            )
                        }}
                        onChange={handleSearch}
                        placeholder="Buscar"
                        value={search}
                        size="small"
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                    <FormControl>
                        <RadioGroup
                            row
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={radioSearch}
                            onChange={(e) => setRadioSearch(e.target.value)}
                        >
                            {lsEstado.map(item => (
                                <FormControlLabel value={item?.value} control={<Radio />} label={UpperFirstChar(item?.label)} />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                {lsData && lsData.map((item) => (
                    <Grid item xs={12} md={6} lg={4}>
                        <HelpCard lsData={item} />
                    </Grid>
                ))}
            </Grid>
        </MainCard>
    );
};

export default HelpManagement;