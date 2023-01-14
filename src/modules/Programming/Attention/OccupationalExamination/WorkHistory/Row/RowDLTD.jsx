import React, { Fragment, useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import {
    Box,
    Collapse,
    IconButton,
    TableCell,
    TableRow,
    Tooltip,
} from '@mui/material';

import Cargando from 'components/loading/Cargando';
import FullScreenDialog from 'components/controllers/FullScreenDialog';
import swal from 'sweetalert';
import { MessageSuccess, MessageDelete, ParamDelete, ParamLoadingData } from 'components/alert/AlertAll';
import useAuth from 'hooks/useAuth';
import { GetAllByCharge } from 'api/clients/PanoramaClient';
import { GetAllByChargeHistorico, GetAllByChargeWHRAdvance } from 'api/clients/WorkHistoryRiskClient';
import { PostWorkHistoryRiskDLTD } from 'formatdata/WorkHistoryRiskForm';
import { DefaultValue } from 'components/helpers/Enums';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { InsertWorkHistoryRisk, DeleteWorkHistoryRisk } from 'api/clients/WorkHistoryRiskClient';
import { FormatDate } from 'components/helpers/Format';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { SubRow } from './SubRow';
import { MenuItem } from '../Menu/MenuItem';
import SubRowHistoricalDLTD from './SubRowHistoricalDLTD';
import SubRowChargeHistory from './SubRowChargeHistory';

export default function RowDLTD({ row = [], getSumaRiesgo, handleDelete, documento }) {
    const diferen = "DLTD";
    const { user } = useAuth();
    const [numId, setNumId] = useState(1);

    const [openDelete, setOpenDelete] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);

    const [open, setOpen] = useState(false);
    const [openHistorico, setOpenHistorico] = useState(false);
    const [openCargoHistorico, setOpenCargoHistorico] = useState(false);

    const [cargoHistorico, setCargoHistorico] = useState([]);
    const [titleCargoHistorico, setTitleCargoHistorico] = useState('');

    const [lsHisQuimico, setLsHisQuimico] = useState([]);
    const [lsHisFisico, setLsHisFisico] = useState([]);
    const [lsHisPsicosocial, setLsHisPsicosocial] = useState([]);
    const [lsHisBiologico, setLsHisBiologico] = useState([]);
    const [lsHisECFPostura, setLsHisECFPostura] = useState([]);
    const [lsHisECFFuerza, setLsHisECFFuerza] = useState([]);
    const [lsHisECFMovimiento, setLsHisECFMovimiento] = useState([]);

    const [lsQuimico, setLsQuimico] = useState([]);
    const [lsFisico, setLsFisico] = useState([]);
    const [lsPsicosocial, setLsPsicosocial] = useState([]);
    const [lsBiologico, setLsBiologico] = useState([]);
    const [lsECFPostura, setLsECFPostura] = useState([]);
    const [lsECFFuerza, setLsECFFuerza] = useState([]);
    const [lsECFMovimiento, setLsECFMovimiento] = useState([]);

    async function DeleteAndInsertRisk(lsDelete = [], numRiesgo = 0) {
        try {

            if (lsDelete.length != 0) {
                for (let index = 0; index < lsDelete.length; index++) {
                    const riesgoDelete = lsDelete[index];

                    await DeleteWorkHistoryRisk(riesgoDelete.id);
                }
            }

            const lsServerRiesgo = await GetAllByCharge(0, 0, DefaultValue.RiesgoEnDLTD, numRiesgo);

            if (lsServerRiesgo.status === 200) {
                var arrayInsert = lsServerRiesgo.data.entities;

                for (let index = 0; index < arrayInsert.length; index++) {
                    const riesgo = arrayInsert[index];

                    const DataToInsert = PostWorkHistoryRiskDLTD(row.id, row.fecha, row.documento, numRiesgo,
                        row.idCargo, riesgo.clase, riesgo.exposicion, riesgo.gradosinEPP, riesgo.gradoconEPP,
                        riesgo.medidascontrol, 0, 0, user.email, FormatDate(new Date()), '', FormatDate(new Date()));

                    if (DataToInsert) {
                        const result = await InsertWorkHistoryRisk(DataToInsert);
                        if (result.status === 200) {
                            if (index < arrayInsert.length) {
                                setOpenSuccess(true);
                            }
                        }
                    }
                }
            }

            const lsServerRiesgoHL = await GetAllByChargeWHRAdvance(0, 0, row.idCargo, numRiesgo, row.id);
            if (lsServerRiesgoHL.status === 200) {
                return lsServerRiesgoHL.data.entities;
            }

        } catch (error) {

        }

    }

    async function GetAllHistoricoForCharge() {
        try {
            const lsServerRiesgoQuimico = await GetAllByChargeHistorico(0, 0, row.idCargo, DefaultValue.RiesgoQuimico, documento);
            if (lsServerRiesgoQuimico.status === 200)
                setLsHisQuimico(lsServerRiesgoQuimico.data.entities);

            const lsServerRiesgoFisico = await GetAllByChargeHistorico(0, 0, row.idCargo, DefaultValue.RiesgoFisico, documento);
            if (lsServerRiesgoFisico.status === 200)
                setLsHisFisico(lsServerRiesgoFisico.data.entities);

            const lsServerRiesgoPsicosocial = await GetAllByChargeHistorico(0, 0, row.idCargo, DefaultValue.RiesgoPsicosocial, documento);
            if (lsServerRiesgoPsicosocial.status === 200)
                setLsHisPsicosocial(lsServerRiesgoPsicosocial.data.entities);

            const lsServerRiesgoBiologico = await GetAllByChargeHistorico(0, 0, row.idCargo, DefaultValue.RiesgoBiologico, documento);
            if (lsServerRiesgoBiologico.status === 200)
                setLsHisBiologico(lsServerRiesgoBiologico.data.entities);

            const lsServerRiesgoECFPostura = await GetAllByChargeHistorico(0, 0, row.idCargo, DefaultValue.RiesgoErgonomicoCargaFisica_Postura, documento);
            if (lsServerRiesgoECFPostura.status === 200)
                setLsHisECFPostura(lsServerRiesgoECFPostura.data.entities);

            const lsServerRiesgoECFFuerza = await GetAllByChargeHistorico(0, 0, row.idCargo, DefaultValue.RiesgoErgonomicoCargaFisica_Fuerza, documento);
            if (lsServerRiesgoECFFuerza.status === 200)
                setLsHisECFFuerza(lsServerRiesgoECFFuerza.data.entities);

            const lsServerRiesgoECFMovimiento = await GetAllByChargeHistorico(0, 0, row.idCargo, DefaultValue.RiesgoErgonomicoCargaFisica_Movimiento, documento);
            if (lsServerRiesgoECFMovimiento.status === 200)
                setLsHisECFMovimiento(lsServerRiesgoECFMovimiento.data.entities);
        } catch (error) {

        }
    }

    useEffect(() => {
        GetAllHistoricoForCharge();
    }, [documento]);

    async function getAll() {
        try {
            const lsServerRiesgoQuimico = await GetAllByChargeWHRAdvance(0, 0, row.idCargo, DefaultValue.RiesgoQuimico, row.id);
            if (lsServerRiesgoQuimico.status === 200)
                setLsQuimico(lsServerRiesgoQuimico.data.entities);

            const lsServerRiesgoFisico = await GetAllByChargeWHRAdvance(0, 0, row.idCargo, DefaultValue.RiesgoFisico, row.id);
            if (lsServerRiesgoFisico.status === 200)
                setLsFisico(lsServerRiesgoFisico.data.entities);

            const lsServerRiesgoPsicosocial = await GetAllByChargeWHRAdvance(0, 0, row.idCargo, DefaultValue.RiesgoPsicosocial, row.id);
            if (lsServerRiesgoPsicosocial.status === 200)
                setLsPsicosocial(lsServerRiesgoPsicosocial.data.entities);

            const lsServerRiesgoBiologico = await GetAllByChargeWHRAdvance(0, 0, row.idCargo, DefaultValue.RiesgoBiologico, row.id);
            if (lsServerRiesgoBiologico.status === 200)
                setLsBiologico(lsServerRiesgoBiologico.data.entities);

            const lsServerRiesgoECFFuerza = await GetAllByChargeWHRAdvance(0, 0, row.idCargo, DefaultValue.RiesgoErgonomicoCargaFisica_Fuerza, row.id);
            if (lsServerRiesgoECFFuerza.status === 200)
                setLsECFFuerza(lsServerRiesgoECFFuerza.data.entities);

            const lsServerRiesgoECFMovimiento = await GetAllByChargeWHRAdvance(0, 0, row.idCargo, DefaultValue.RiesgoErgonomicoCargaFisica_Movimiento, row.id);
            if (lsServerRiesgoECFMovimiento.status === 200)
                setLsECFMovimiento(lsServerRiesgoECFMovimiento.data.entities);

            const lsServerRiesgoECFPostura = await GetAllByChargeWHRAdvance(0, 0, row.idCargo, DefaultValue.RiesgoErgonomicoCargaFisica_Postura, row.id);
            if (lsServerRiesgoECFPostura.status === 200)
                setLsECFPostura(lsServerRiesgoECFPostura.data.entities);
        } catch (error) {

        }
    }

    useEffect(() => {
        getAll();
    }, []);

    const handleClickNuevo = (id) => {
        try {
            swal(ParamLoadingData).then(async (willDelete) => {
                if (willDelete) {
                    if (id == 1) {
                        const lsRiesgoQuimico = await DeleteAndInsertRisk(lsQuimico, DefaultValue.RiesgoQuimico);
                        setLsQuimico(lsRiesgoQuimico);
                    }

                    if (id == 2) {
                        const lsRiesgoFisico = await DeleteAndInsertRisk(lsFisico, DefaultValue.RiesgoFisico);
                        setLsFisico(lsRiesgoFisico);
                    }

                    if (id == 3) {
                        const lsRiesgoPsicosocial = await DeleteAndInsertRisk(lsPsicosocial, DefaultValue.RiesgoPsicosocial);
                        setLsPsicosocial(lsRiesgoPsicosocial);
                    }

                    if (id == 4) {
                        const lsRiesgoBiologico = await DeleteAndInsertRisk(lsBiologico, DefaultValue.RiesgoBiologico);
                        setLsBiologico(lsRiesgoBiologico);
                    }

                    if (id == 5) {
                        const lsRiesgoECFPostura = await DeleteAndInsertRisk(lsECFPostura, DefaultValue.RiesgoErgonomicoCargaFisica_Postura);
                        setLsECFPostura(lsRiesgoECFPostura);
                    }

                    if (id == 6) {
                        const lsRiesgoFuerza = await DeleteAndInsertRisk(lsECFFuerza, DefaultValue.RiesgoErgonomicoCargaFisica_Fuerza);
                        setLsECFFuerza(lsRiesgoFuerza);
                    }

                    if (id == 7) {
                        const lsRiesgoMovimiento = await DeleteAndInsertRisk(lsECFMovimiento, DefaultValue.RiesgoErgonomicoCargaFisica_Movimiento);
                        setLsECFMovimiento(lsRiesgoMovimiento);
                    }
                }
            });
        } catch (error) {

        }
    }

    const handleClickHistorico = (id) => {
        try {
            if (id == 1) {
                setOpenCargoHistorico(true); setCargoHistorico(lsHisQuimico); setTitleCargoHistorico("RIESGO QUÍMICO");
            }

            if (id == 2) {
                setOpenCargoHistorico(true); setCargoHistorico(lsHisFisico); setTitleCargoHistorico("RIESGO FÍSICO");
            }

            if (id == 3) {
                setOpenCargoHistorico(true); setCargoHistorico(lsHisPsicosocial); setTitleCargoHistorico("RIESGO PSICOSOCIAL");
            }

            if (id == 4) {
                setOpenCargoHistorico(true); setCargoHistorico(lsHisBiologico); setTitleCargoHistorico("RIESGO BIOLÓGICO");
            }

            if (id == 5) {
                setOpenCargoHistorico(true); setCargoHistorico(lsHisECFPostura); setTitleCargoHistorico("RIESGO ECF - POSTURA");
            }

            if (id == 6) {
                setOpenCargoHistorico(true); setCargoHistorico(lsHisECFFuerza); setTitleCargoHistorico("RIESGO ECF - FUERZA");
            }

            if (id == 7) {
                setOpenCargoHistorico(true); setCargoHistorico(lsHisECFMovimiento); setTitleCargoHistorico("RIESGO ECF - MOVIMIENTO");
            }

        } catch (error) {

        }

    }

    const handleClickButton = async (id) => {
        try {
            if (id == 8) setOpenHistorico(true);
            setNumId(id);
        } catch (error) {

        }
    }

    const handleDeleteHistoryRisk = async (id) => {
        try {
            swal(ParamDelete).then(async (willDelete) => {
                if (willDelete) {
                    const result = await DeleteWorkHistoryRisk(id);
                    if (result.status === 200) {
                        setOpenDelete(true);
                        getAll();
                    }
                }
            });
        } catch (error) {

        }
    }

    return (
        <Fragment>
            <MessageSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} />
            <MessageDelete open={openDelete} onClose={() => setOpenDelete(false)} />

            <FullScreenDialog
                open={openCargoHistorico}
                title={"REGISTRO HISTÓRICO DE " + titleCargoHistorico}
                handleClose={() => setOpenCargoHistorico(false)}
            >
                {cargoHistorico.length != 0 ? <SubRowChargeHistory key={row.id} row={cargoHistorico} title={titleCargoHistorico} /> : <Cargando />}
            </FullScreenDialog>

            <FullScreenDialog
                open={openHistorico}
                title="REGISTRO HISTÓRICO DE EXPOSICIÓN OCUPACIONAL"
                handleClose={() => setOpenHistorico(false)}
            >
                <SubRowHistoricalDLTD key={row.id} documento={documento} />
            </FullScreenDialog>

            <TableRow hover sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell sx={{ pl: 3 }}>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>

                <TableCell>{row.nameCargo}</TableCell>
                <TableCell>{row.anio}</TableCell>
                <TableCell>{row.meses}</TableCell>
                <TableCell>
                    <Tooltip title="Eliminar" onClick={() => handleDelete(row.id)}>
                        <IconButton color="error" size="small">
                            <HighlightOffIcon sx={{ fontSize: '2rem' }} />
                        </IconButton>
                    </Tooltip>
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 0, pt: 5, pb: 5 }}>

                            <MenuItem
                                key={row.id}
                                numId={numId}
                                onClickButton={handleClickButton}
                                onClickNuevo={handleClickNuevo}
                                onClickHistorico={handleClickHistorico}
                            />

                            {lsQuimico.length != 0 && numId == 1 ?
                                <SubRow key={row.id} getSumaRiesgo={getSumaRiesgo} getAll={getAll} diferen={diferen} onClickDelete={handleDeleteHistoryRisk} row={lsQuimico} title="Riesgo Químico" />
                                : null}

                            {lsFisico.length != 0 && numId == 2 ?
                                <SubRow key={row.id} getSumaRiesgo={getSumaRiesgo} getAll={getAll} diferen={diferen} onClickDelete={handleDeleteHistoryRisk} row={lsFisico} title="Riesgo Físico" />
                                : null}

                            {lsPsicosocial.length != 0 && numId == 3 ?
                                <SubRow key={row.id} getSumaRiesgo={getSumaRiesgo} getAll={getAll} diferen={diferen} onClickDelete={handleDeleteHistoryRisk} row={lsPsicosocial} title="Riesgo Psicosocial" />
                                : null}

                            {lsBiologico.length != 0 && numId == 4 ?
                                <SubRow key={row.id} getSumaRiesgo={getSumaRiesgo} getAll={getAll} diferen={diferen} onClickDelete={handleDeleteHistoryRisk} row={lsBiologico} title="Riesgo Biológico" />
                                : null}

                            {lsECFPostura.length != 0 && numId == 5 ?
                                <SubRow key={row.id} getSumaRiesgo={getSumaRiesgo} getAll={getAll} diferen={diferen} onClickDelete={handleDeleteHistoryRisk} row={lsECFPostura} title="Riesgo ECF - Postura" />
                                : null}

                            {lsECFFuerza.length != 0 && numId == 6 ?
                                <SubRow key={row.id} getSumaRiesgo={getSumaRiesgo} getAll={getAll} diferen={diferen} onClickDelete={handleDeleteHistoryRisk} row={lsECFFuerza} title="Riesgo ECF - Fuerza" />
                                : null}

                            {lsECFMovimiento.length != 0 && numId == 7 ?
                                <SubRow key={row.id} getSumaRiesgo={getSumaRiesgo} getAll={getAll} diferen={diferen} onClickDelete={handleDeleteHistoryRisk} row={lsECFMovimiento} title="Riesgo ECF - Movimiento" />
                                : null}
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    );
}

RowDLTD.propTypes = {
    row: PropTypes.object,
    handleDelete: PropTypes.func,
    documento: PropTypes.string,
};