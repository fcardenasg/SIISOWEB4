import { Fragment, useEffect, useState } from 'react';
import { Button, Grid, useMediaQuery } from '@mui/material';
import SelectOnChange from 'components/input/SelectOnChange';
import { useTheme } from '@mui/material/styles';
import { GetByIdPermiso, GetComboCardItem, GetComboComponente, GetComboItemMenu, UpdateRols } from 'api/clients/RolClient';
import { Message, TitleButton } from 'components/helpers/Enums';
import AnimateButton from 'ui-component/extended/AnimateButton';
import Cargando from 'components/loading/Cargando';
import InputCheck from 'components/input/InputCheck';
import { MessageError, MessageSuccess } from 'components/alert/AlertAll';
import useAuth from 'hooks/useAuth';

const EditPermiso = ({ idPermiso, getAllPermisos }) => {
    const { user } = useAuth();
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [dataPermiso, setDataPermiso] = useState([]);
    const [lsComponente, setLsComponente] = useState([]);
    const [lsItem, setLsItem] = useState([]);
    const [lsCard, setLsCard] = useState([]);

    const [valueComponente, setValueComponente] = useState(undefined);
    const [valueItem, setValueItem] = useState(undefined);
    const [valueCard, setValueCard] = useState(undefined);

    const [openSuccess, setOpenSuccess] = useState(false);
    const [estadoPermiso, setEstadoPermiso] = useState(false);
    const [loading, setLoading] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    async function getAll() {
        try {
            const lsServer = await GetComboComponente();
            setLsComponente(lsServer.data);

            const lsServerId = await GetByIdPermiso(idPermiso);
            if (lsServerId.status === 200) {
                setDataPermiso(lsServerId.data);
                setLsItem(lsServerId.data.lsItems);
                setLsCard(lsServerId.data.lsCards);
                setEstadoPermiso(lsServerId.data.estado);
                setValueComponente(lsServerId.data.idComponente);
                setValueItem(lsServerId.data.idItemMenu);
                setValueCard(lsServerId.data.idCardItem);
                setLoading(true);
            }
        } catch (error) { }
    }

    useEffect(() => {
        getAll();
    }, []);

    const handleChangeComponente = async (event) => {
        try {
            setValueItem(undefined); setValueCard(undefined); setLsItem([]); setLsCard([]);
            setValueComponente(event.target.value);

            var resultComponente = await GetComboItemMenu([event.target.value]);
            setLsItem(resultComponente.data);
        } catch (error) { }
    };

    const handleChangeItem = async (event) => {
        try {
            setValueCard(undefined);
            setValueItem(event.target.value);
            var resultItem = await GetComboCardItem([event.target.value]);
            setLsCard(resultItem.data);
        } catch (error) { }
    };

    const handleClick = async () => {
        try {
            const DataToInsert = {
                id: dataPermiso.id,
                idItemMenu: valueItem,
                idCardItem: valueCard,
                estado: estadoPermiso,
                usuarioModifico: user.nameuser,
                isPermiso: true,
            };

            const result = await UpdateRols(DataToInsert);
            console.log("result => ", result);
            if (result.status === 200) {
                if (dataPermiso.id === result.data) {
                    setOpenSuccess(true);
                    getAllPermisos();
                } else {
                    setOpenError(true);
                    setErrorMessage(result.data);
                }
            }
        } catch (error) {
            setOpenError(true);
            setErrorMessage(Message.RegistroNoGuardado);
        }
    };

    return (
        <Fragment>
            <MessageSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} />
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            {loading ?
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <SelectOnChange
                            name="idComponentes"
                            label="Componente"
                            value={valueComponente}
                            options={lsComponente}
                            onChange={handleChangeComponente}
                            size={matchesXS ? 'small' : 'medium'}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <SelectOnChange
                            name="idItem"
                            label="Ìtem"
                            value={valueItem}
                            options={lsItem}
                            onChange={handleChangeItem}
                            size={matchesXS ? 'small' : 'medium'}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <SelectOnChange
                            disabled={lsCard.length === 0 ? true : false}
                            name="idCard"
                            label="Card"
                            value={valueCard}
                            options={lsCard}
                            onChange={(e) => setValueCard(e.target.value)}
                            size={matchesXS ? 'small' : 'medium'}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <InputCheck
                            label={`Estado: ${estadoPermiso ? 'Activo' : 'Inactivo'}`}
                            onChange={(e) => setEstadoPermiso(e.target.checked)}
                            checked={estadoPermiso}
                            size={matchesXS ? 25 : 30}
                        />
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 4 }}>
                        <AnimateButton>
                            <Button variant="contained" fullWidth onClick={handleClick}>
                                {TitleButton.Actualizar}
                            </Button>
                        </AnimateButton>
                    </Grid>
                </Grid> : <Cargando />
            }
        </Fragment>
    );
};

export default EditPermiso;