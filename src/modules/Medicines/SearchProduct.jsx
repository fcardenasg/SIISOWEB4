import Typography from '@mui/material/Typography';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { memo, useCallback, useState } from 'react';

import Box from '@mui/material/Box';
import Dialog, { dialogClasses } from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputBase from '@mui/material/InputBase';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import { alpha, useTheme } from '@mui/material/styles';

import { Grid, ListItemButton, ListItemText } from '@mui/material';
import { Url } from 'api/instances/AuthRoute';
import axios from 'axios';
import Iconify from 'components/iconify/iconify';
import Label from 'components/label';
import { useBoolean } from 'hooks/use-boolean';
import PerfectScrollbar from 'react-perfect-scrollbar';
import SearchNotFound from './SearchNotFound';
import useAuth from 'hooks/useAuth';

function SearchProduct({ captureData, dataProducto, disabled }) {
    const theme = useTheme();
    const { user } = useAuth();
    const search = useBoolean();
    const [searchQuery, setSearchQuery] = useState('');
    const [lsData, setLsData] = useState([]);

    const handleClose = useCallback(() => {
        search.onFalse();
        setSearchQuery('');
        setLsData([]);
    }, [search, searchQuery]);

    const handleButtonClick = useCallback((item) => {
        captureData(item);
        handleClose();
    }, [captureData, handleClose]);

    const handleSearch = useCallback((event) => {
        try {
            const inputValue = event.target.value;

            if (inputValue.length > 0 && inputValue.startsWith(' ')) {
                setLsData([]);
                setSearchQuery('');
                return;
            }

            if (inputValue.length > 0) {
                axios.get(`${Url.Base}${Url.MedicamentosSearch}/${user?.idsede}/${inputValue}`).then((response) => {
                    if (response.data.exito) {
                        if (response.data.datos.length > 0)
                            setLsData(response.data.datos);
                        else
                            setLsData([]);
                    }
                }).catch((error) => setLsData([]));
            } else {
                setLsData([]);
            }

            setSearchQuery(inputValue);
        } catch (error) {
            setLsData([]);
        }
    }, []);

    const notFound = searchQuery && !lsData.length;

    const renderButton = (
        <Stack disabled={disabled} direction="row" alignItems="center" sx={{ width: '100%', py: 2 }} onClick={!disabled ? search.onTrue : undefined}>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                    width: '100%',
                    height: 60,
                    px: 1.5,
                    border: '1px solid #cfd8dc',
                    background: 'white',
                    borderRadius: 1,
                    cursor: disabled ? 'not-allowed' : 'pointer',
                }}
            >
                <Stack direction="row" alignItems="center" sx={{ flexGrow: 1 }}>
                    <IconButton disabled={disabled}>
                        <Iconify icon="eva:search-fill" />
                    </IconButton>

                    <Typography sx={{ fontWeight: 600 }} color={disabled ? '#B0BEC5' : 'textPrimary'}>
                        {dataProducto?.producto || `Buscar producto por nombre o código...`}
                    </Typography>
                </Stack>

                {dataProducto &&
                    <Typography align="right" variant="body2" color="textSecondary">
                        {`Laboratorio: ${dataProducto?.nameLaboratorio} 
                        / Forma farmacéutica: ${dataProducto?.nameFormaFarmaceutica}
                        / Cantidad: ${dataProducto?.cantidad}`.toUpperCase()}
                    </Typography>
                }
            </Stack>
        </Stack>
    );

    return (
        <>
            {renderButton}

            <Dialog
                fullWidth
                maxWidth="sm"
                open={search.value}
                onClose={handleClose}
                transitionDuration={{
                    enter: theme.transitions.duration.shortest,
                    exit: 0,
                }}
                PaperProps={{
                    sx: {
                        mt: 15,
                        overflow: 'unset',
                    },
                }}
                sx={{
                    [`& .${dialogClasses.container}`]: {
                        alignItems: 'flex-start',
                    },
                }}
            >
                <Box sx={{ p: 3, borderBottom: `solid 1px ${theme.palette.divider}` }}>
                    <InputBase
                        fullWidth
                        autoFocus
                        placeholder="Buscar producto..."
                        value={searchQuery}
                        onChange={(event) => handleSearch(event)}
                        startAdornment={
                            <InputAdornment position="start">
                                <Iconify icon="eva:search-fill" width={24} sx={{ color: 'text.disabled' }} />
                            </InputAdornment>
                        }
                        endAdornment={<Label sx={{ letterSpacing: 1, color: 'text.secondary' }}>esc</Label>}
                        inputProps={{ sx: { typography: 'h6' }, }}
                    />
                </Box>

                <PerfectScrollbar style={{ width: '100%', height: 'calc(100vh - 440px)', overflowX: 'hidden', minHeight: 380 }}>
                    {notFound ? <SearchNotFound query={searchQuery} sx={{ py: 10 }} /> : <>
                        {lsData?.map((item, index) => {
                            const partsTitle = parse(item.producto, match(item.producto, searchQuery));
                            const themecolor = theme.palette.success.main;

                            return (
                                <List key={index} disablePadding>
                                    <ListItemButton
                                        onClick={() => handleButtonClick(item)}
                                        sx={{
                                            borderWidth: 1,
                                            borderStyle: 'dashed',
                                            borderColor: 'transparent',
                                            borderBottomColor: (theme) => theme.palette.divider,
                                            '&:hover': {
                                                borderRadius: 1,
                                                borderColor: themecolor,
                                                backgroundColor: (theme) => alpha(themecolor, theme.palette.action.hoverOpacity)
                                            },
                                        }}
                                    >
                                        <ListItemText
                                            primaryTypographyProps={{ typography: 'h5', mb: 1 }}
                                            secondaryTypographyProps={{ typography: 'caption' }}
                                            primary={partsTitle.map((part, index) => (
                                                <Box key={index} component="span" sx={{ color: part.highlight ? themecolor : 'text.primary' }}>
                                                    {part.text}
                                                </Box>
                                            ))}
                                            secondary={
                                                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                                                    <Box key={index} component="span" sx={{ color: 'text.secondary', mr: 2 }}>
                                                        {item?.nameLaboratorio} - {item?.nameFormaFarmaceutica}
                                                    </Box>

                                                    <Label color={item?.cantidad ? "success" : "error"}>{`CANTIDAD: ${item?.cantidad ?? 0}`}</Label>
                                                </Box>
                                            }
                                        />

                                        {item.producto && <Label color="success">{item?.inicialLabel}</Label>}
                                    </ListItemButton>
                                </List>
                            )
                        })}
                    </>}
                </PerfectScrollbar>
            </Dialog>
        </>
    );
}

export default memo(SearchProduct);