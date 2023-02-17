import React, { Fragment, useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import {
    Box,
    Collapse,
    Grid,
    IconButton,
    TableCell,
    TableRow,
    Tooltip,
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import Cargando from 'components/loading/Cargando';
import SubRowChargeHistory from './Row/SubRowChargeHistory';
import swal from 'sweetalert';
import { FormatDate } from 'components/helpers/Format';
import useAuth from 'hooks/useAuth';
import { PostWorkHistoryRiskCompany } from 'formatdata/WorkHistoryRiskForm';
import SubRowHistoricalCompany from './Row/SubRowHistoricalCompany';
import FullScreenDialog from 'components/controllers/FullScreenDialog';
import { MessageSuccess, MessageDelete, ParamDelete, ParamLoadingData } from 'components/alert/AlertAll';
import { InsertWorkHistoryRiskCompany, DeleteWorkHistoryRiskCompany, GetAllByChargeHistoricoCompany, GetAllByChargeWHRAdvanceCompany, UpdateWorkHistoryRisksCompany } from 'api/clients/WorkHistoryRiskClient';
import { GetAllByCharge } from 'api/clients/PanoramaClient';
import { DefaultValue } from 'components/helpers/Enums';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { SubRow } from './Row/SubRow';
import { MenuItem } from './Menu/MenuItem';
import ModalEditarRiesgo from './ModalEditarRiesgo';

const WorkHistoryRiesgoEmpresa = ({ getSumaRiesgo, handleDelete, documento, getAllWorkHistory }) => {
    const diferen = "COMPANY";
    const { user } = useAuth();
    const [numId, setNumId] = useState(1);
    const [open, setOpen] = useState(false);

    const [numIdRiesgo, setNumIdRiesgo] = useState('');
    const [openEditarRiesgo, setOpenEditarRiesgo] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);

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

                    await DeleteWorkHistoryRiskCompany(riesgoDelete.id);
                }
            }

            const lsServerRiesgo = await GetAllByCharge(0, 0, DefaultValue.RiesgoEnOtrasEmpresas, numRiesgo);

            if (lsServerRiesgo.status === 200) {
                var arrayInsert = lsServerRiesgo.data.entities;

                for (let index = 0; index < arrayInsert.length; index++) {
                    const riesgo = arrayInsert[index];

                    const DataToInsert = PostWorkHistoryRiskCompany(0, FormatDate(new Date()), documento, numRiesgo,
                        '', riesgo.clase, riesgo.exposicion, riesgo.gradosinEPP, riesgo.gradoconEPP,
                        riesgo.medidascontrol, 0, 0, user.nameuser, FormatDate(new Date()), '', FormatDate(new Date()));

                    if (DataToInsert) {
                        const result = await InsertWorkHistoryRiskCompany(DataToInsert);
                        if (result.status === 200) {
                            if (index < arrayInsert.length) {
                                setOpenSuccess(true);
                            }
                        }
                    }
                }
            }

            const lsServerRiesgoHL = await GetAllByChargeWHRAdvanceCompany(0, 0, documento, numRiesgo);
            if (lsServerRiesgoHL.status === 200) {
                return lsServerRiesgoHL.data.entities;
            }

        } catch (error) {

        }

    }

    async function getAllHistoricoForCharge() {
        try {
            const lsServerRiesgoQuimico = await GetAllByChargeHistoricoCompany(0, 0, DefaultValue.RiesgoQuimico, documento);
            if (lsServerRiesgoQuimico.status === 200)
                setLsHisQuimico(lsServerRiesgoQuimico.data.entities);

            const lsServerRiesgoFisico = await GetAllByChargeHistoricoCompany(0, 0, DefaultValue.RiesgoFisico, documento);
            if (lsServerRiesgoFisico.status === 200)
                setLsHisFisico(lsServerRiesgoFisico.data.entities);

            const lsServerRiesgoPsicosocial = await GetAllByChargeHistoricoCompany(0, 0, DefaultValue.RiesgoPsicosocial, documento);
            if (lsServerRiesgoPsicosocial.status === 200)
                setLsHisPsicosocial(lsServerRiesgoPsicosocial.data.entities);

            const lsServerRiesgoBiologico = await GetAllByChargeHistoricoCompany(0, 0, DefaultValue.RiesgoBiologico, documento);
            if (lsServerRiesgoBiologico.status === 200)
                setLsHisBiologico(lsServerRiesgoBiologico.data.entities);

            const lsServerRiesgoECFPostura = await GetAllByChargeHistoricoCompany(0, 0, DefaultValue.RiesgoErgonomicoCargaFisica_Postura, documento);
            if (lsServerRiesgoECFPostura.status === 200)
                setLsHisECFPostura(lsServerRiesgoECFPostura.data.entities);

            const lsServerRiesgoECFFuerza = await GetAllByChargeHistoricoCompany(0, 0, DefaultValue.RiesgoErgonomicoCargaFisica_Fuerza, documento);
            if (lsServerRiesgoECFFuerza.status === 200)
                setLsHisECFFuerza(lsServerRiesgoECFFuerza.data.entities);

            const lsServerRiesgoECFMovimiento = await GetAllByChargeHistoricoCompany(0, 0, DefaultValue.RiesgoErgonomicoCargaFisica_Movimiento, documento);
            if (lsServerRiesgoECFMovimiento.status === 200)
                setLsHisECFMovimiento(lsServerRiesgoECFMovimiento.data.entities);
        } catch (error) { }
    }

    useEffect(() => {
        getAllHistoricoForCharge();
    }, [documento]);

    async function getAll() {
        try {
            const lsServerRiesgoQuimico = await GetAllByChargeWHRAdvanceCompany(0, 0, documento, DefaultValue.RiesgoQuimico);
            if (lsServerRiesgoQuimico.status === 200)
                setLsQuimico(lsServerRiesgoQuimico.data.entities);

            const lsServerRiesgoFisico = await GetAllByChargeWHRAdvanceCompany(0, 0, documento, DefaultValue.RiesgoFisico);
            if (lsServerRiesgoFisico.status === 200)
                setLsFisico(lsServerRiesgoFisico.data.entities);

            const lsServerRiesgoPsicosocial = await GetAllByChargeWHRAdvanceCompany(0, 0, documento, DefaultValue.RiesgoPsicosocial);
            if (lsServerRiesgoPsicosocial.status === 200)
                setLsPsicosocial(lsServerRiesgoPsicosocial.data.entities);

            const lsServerRiesgoBiologico = await GetAllByChargeWHRAdvanceCompany(0, 0, documento, DefaultValue.RiesgoBiologico);
            if (lsServerRiesgoBiologico.status === 200)
                setLsBiologico(lsServerRiesgoBiologico.data.entities);

            const lsServerRiesgoECFFuerza = await GetAllByChargeWHRAdvanceCompany(0, 0, documento, DefaultValue.RiesgoErgonomicoCargaFisica_Fuerza);
            if (lsServerRiesgoECFFuerza.status === 200)
                setLsECFFuerza(lsServerRiesgoECFFuerza.data.entities);

            const lsServerRiesgoECFMovimiento = await GetAllByChargeWHRAdvanceCompany(0, 0, documento, DefaultValue.RiesgoErgonomicoCargaFisica_Movimiento);
            if (lsServerRiesgoECFMovimiento.status === 200)
                setLsECFMovimiento(lsServerRiesgoECFMovimiento.data.entities);

            const lsServerRiesgoECFPostura = await GetAllByChargeWHRAdvanceCompany(0, 0, documento, DefaultValue.RiesgoErgonomicoCargaFisica_Postura);
            if (lsServerRiesgoECFPostura.status === 200)
                setLsECFPostura(lsServerRiesgoECFPostura.data.entities);
        } catch (error) {

        }
    }

    useEffect(() => {
        getAll();
    }, []);

    const handleClickButton = async (id) => {
        try {
            if (id == 8) setOpenHistorico(true);
            setNumId(id);
        } catch (error) {

        }
    }

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
            if (id === 1) {
                setOpenCargoHistorico(true); setCargoHistorico(lsHisQuimico); setTitleCargoHistorico("RIESGO QUÍMICO");
            }

            if (id === 2) {
                setOpenCargoHistorico(true); setCargoHistorico(lsHisFisico); setTitleCargoHistorico("RIESGO FÍSICO");
            }

            if (id === 3) {
                setOpenCargoHistorico(true); setCargoHistorico(lsHisPsicosocial); setTitleCargoHistorico("RIESGO PSICOSOCIAL");
            }

            if (id === 4) {
                setOpenCargoHistorico(true); setCargoHistorico(lsHisBiologico); setTitleCargoHistorico("RIESGO BIOLÓGICO");
            }

            if (id === 5) {
                setOpenCargoHistorico(true); setCargoHistorico(lsHisECFPostura); setTitleCargoHistorico("RIESGO ECF - POSTURA");
            }

            if (id === 6) {
                setOpenCargoHistorico(true); setCargoHistorico(lsHisECFFuerza); setTitleCargoHistorico("RIESGO ECF - FUERZA");
            }

            if (id === 7) {
                setOpenCargoHistorico(true); setCargoHistorico(lsHisECFMovimiento); setTitleCargoHistorico("RIESGO ECF - MOVIMIENTO");
            }

        } catch (error) {

        }

    }

    const handleDeleteHistoryRisk = async (id) => {
        try {
            swal(ParamDelete).then(async (willDelete) => {
                if (willDelete) {
                    const result = await DeleteWorkHistoryRiskCompany(id);
                    if (result.status === 200) {
                        setOpenDelete(true);
                        getAll();
                    }
                }
            });
        } catch (error) { }
    }

    return (
        <Fragment>
            <FullScreenDialog
                open={openHistorico}
                title="REGISTRO HISTÓRICO DE EXPOSICIÓN OCUPACIONAL"
                handleClose={() => setOpenHistorico(false)}
            >
                <SubRowHistoricalCompany documento={documento} />
            </FullScreenDialog>

            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                    <Box sx={{ margin: 0, pt: 5, pb: 5 }}>

                        <MenuItem
                            numId={numId}
                            onClickButton={handleClickButton}
                            onClickNuevo={handleClickNuevo}
                            onClickHistorico={handleClickHistorico}
                        />

                        {lsQuimico.length != 0 && numId == 1 ?
                            <SubRow getSumaRiesgo={getSumaRiesgo} getAll={getAll} diferen={diferen} onClickDelete={handleDeleteHistoryRisk} row={lsQuimico} title="Riesgo Químico" />
                            : null}

                        {lsFisico.length != 0 && numId == 2 ?
                            <SubRow getSumaRiesgo={getSumaRiesgo} getAll={getAll} diferen={diferen} onClickDelete={handleDeleteHistoryRisk} row={lsFisico} title="Riesgo Físico" />
                            : null}

                        {lsPsicosocial.length != 0 && numId == 3 ?
                            <SubRow getSumaRiesgo={getSumaRiesgo} getAll={getAll} diferen={diferen} onClickDelete={handleDeleteHistoryRisk} row={lsPsicosocial} title="Riesgo Psicosocial" />
                            : null}

                        {lsBiologico.length != 0 && numId == 4 ?
                            <SubRow getSumaRiesgo={getSumaRiesgo} getAll={getAll} diferen={diferen} onClickDelete={handleDeleteHistoryRisk} row={lsBiologico} title="Riesgo Biológico" />
                            : null}

                        {lsECFPostura.length != 0 && numId == 5 ?
                            <SubRow getSumaRiesgo={getSumaRiesgo} getAll={getAll} diferen={diferen} onClickDelete={handleDeleteHistoryRisk} row={lsECFPostura} title="Riesgo ECF - Postura" />
                            : null}

                        {lsECFFuerza.length != 0 && numId == 6 ?
                            <SubRow getSumaRiesgo={getSumaRiesgo} getAll={getAll} diferen={diferen} onClickDelete={handleDeleteHistoryRisk} row={lsECFFuerza} title="Riesgo ECF - Fuerza" />
                            : null}

                        {lsECFMovimiento.length != 0 && numId == 7 ?
                            <SubRow getSumaRiesgo={getSumaRiesgo} getAll={getAll} diferen={diferen} onClickDelete={handleDeleteHistoryRisk} row={lsECFMovimiento} title="Riesgo ECF - Movimiento" />
                            : null}
                    </Box>
                </TableCell>
            </TableRow>
        </Fragment>
    );
}

export default WorkHistoryRiesgoEmpresa;