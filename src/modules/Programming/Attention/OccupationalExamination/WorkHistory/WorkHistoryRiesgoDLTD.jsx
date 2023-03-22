import { Fragment, useState, useEffect } from 'react';

import {
    Box,
    TableCell,
    TableRow,
} from '@mui/material';

import swal from 'sweetalert';
import { DefaultValue } from 'components/helpers/Enums';
import { SubRow } from './Row/SubRow';
import { MenuItem } from './Menu/MenuItem';
import { MessageSuccess, MessageDelete, ParamDelete, ParamLoadingData } from 'components/alert/AlertAll';
import { DeleteWorkHistoryRisk, GetAllByChargeWHRAdvanceDLTD, RiskDLTDDeleteAndInsertRisk } from 'api/clients/WorkHistoryRiskClient';

const WorkHistoryRiesgoDLTD = ({ getSumaRiesgo, documento, atencion }) => {
    const diferen = "DLTD";
    const [numId, setNumId] = useState(1);
    const [openDelete, setOpenDelete] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);

    const [lsQuimico, setLsQuimico] = useState([]);
    const [lsFisico, setLsFisico] = useState([]);
    const [lsPsicosocial, setLsPsicosocial] = useState([]);
    const [lsBiologico, setLsBiologico] = useState([]);
    const [lsECFPostura, setLsECFPostura] = useState([]);
    const [lsECFFuerza, setLsECFFuerza] = useState([]);
    const [lsECFMovimiento, setLsECFMovimiento] = useState([]);

    async function getAll() {
        try {
            const lsServerRiesgoQuimico = await GetAllByChargeWHRAdvanceDLTD(0, 0, documento, DefaultValue.RiesgoQuimico);
            if (lsServerRiesgoQuimico.status === 200)
                setLsQuimico(lsServerRiesgoQuimico.data.entities);

            const lsServerRiesgoFisico = await GetAllByChargeWHRAdvanceDLTD(0, 0, documento, DefaultValue.RiesgoFisico);
            if (lsServerRiesgoFisico.status === 200)
                setLsFisico(lsServerRiesgoFisico.data.entities);

            const lsServerRiesgoPsicosocial = await GetAllByChargeWHRAdvanceDLTD(0, 0, documento, DefaultValue.RiesgoPsicosocial);
            if (lsServerRiesgoPsicosocial.status === 200)
                setLsPsicosocial(lsServerRiesgoPsicosocial.data.entities);

            const lsServerRiesgoBiologico = await GetAllByChargeWHRAdvanceDLTD(0, 0, documento, DefaultValue.RiesgoBiologico);
            if (lsServerRiesgoBiologico.status === 200)
                setLsBiologico(lsServerRiesgoBiologico.data.entities);

            const lsServerRiesgoECFFuerza = await GetAllByChargeWHRAdvanceDLTD(0, 0, documento, DefaultValue.RiesgoErgonomicoCargaFisica_Fuerza);
            if (lsServerRiesgoECFFuerza.status === 200)
                setLsECFFuerza(lsServerRiesgoECFFuerza.data.entities);

            const lsServerRiesgoECFMovimiento = await GetAllByChargeWHRAdvanceDLTD(0, 0, documento, DefaultValue.RiesgoErgonomicoCargaFisica_Movimiento);
            if (lsServerRiesgoECFMovimiento.status === 200)
                setLsECFMovimiento(lsServerRiesgoECFMovimiento.data.entities);

            const lsServerRiesgoECFPostura = await GetAllByChargeWHRAdvanceDLTD(0, 0, documento, DefaultValue.RiesgoErgonomicoCargaFisica_Postura);
            if (lsServerRiesgoECFPostura.status === 200)
                setLsECFPostura(lsServerRiesgoECFPostura.data.entities);
        } catch (error) { }
    }

    useEffect(() => {
        getAll();
    }, [documento]);

    const handleClickNuevo = (id) => {
        try {
            swal(ParamLoadingData).then(async (willDelete) => {
                if (willDelete) {
                    if (id == 1) {
                        const lsRiesgoQuimico = await RiskDLTDDeleteAndInsertRisk(DefaultValue.RiesgoQuimico, documento, atencion);
                        if (lsRiesgoQuimico.status === 200) {
                            setLsQuimico(lsRiesgoQuimico.data);
                            setOpenSuccess(true);
                        }
                    }

                    if (id == 2) {
                        const lsRiesgoFisico = await RiskDLTDDeleteAndInsertRisk(DefaultValue.RiesgoFisico, documento, atencion);
                        if (lsRiesgoFisico.status === 200) {
                            setLsFisico(lsRiesgoFisico.data);
                            setOpenSuccess(true);
                        }
                    }

                    if (id == 3) {
                        const lsRiesgoPsicosocial = await RiskDLTDDeleteAndInsertRisk(DefaultValue.RiesgoPsicosocial, documento, atencion);
                        if (lsRiesgoPsicosocial.status === 200) {
                            setLsPsicosocial(lsRiesgoPsicosocial.data);
                            setOpenSuccess(true);
                        }
                    }

                    if (id == 4) {
                        const lsRiesgoBiologico = await RiskDLTDDeleteAndInsertRisk(DefaultValue.RiesgoBiologico, documento, atencion);
                        if (lsRiesgoBiologico.status === 200) {
                            setLsBiologico(lsRiesgoBiologico.data);
                            setOpenSuccess(true);
                        }
                    }

                    if (id == 5) {
                        const lsRiesgoECFPostura = await RiskDLTDDeleteAndInsertRisk(DefaultValue.RiesgoErgonomicoCargaFisica_Postura, documento, atencion);
                        if (lsRiesgoECFPostura.status === 200) {
                            setLsECFPostura(lsRiesgoECFPostura.data);
                            setOpenSuccess(true);
                        }
                    }

                    if (id == 6) {
                        const lsRiesgoFuerza = await RiskDLTDDeleteAndInsertRisk(DefaultValue.RiesgoErgonomicoCargaFisica_Fuerza, documento, atencion);
                        if (lsRiesgoFuerza.status === 200) {
                            setLsECFFuerza(lsRiesgoFuerza.data);
                            setOpenSuccess(true);
                        }
                    }

                    if (id == 7) {
                        const lsRiesgoMovimiento = await RiskDLTDDeleteAndInsertRisk(DefaultValue.RiesgoErgonomicoCargaFisica_Movimiento, documento, atencion);
                        if (lsRiesgoMovimiento.status === 200) {
                            setLsECFMovimiento(lsRiesgoMovimiento.data);
                            setOpenSuccess(true);
                        }
                    }
                }
            });
        } catch (error) { }
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
        } catch (error) { }
    }

    return (
        <Fragment>
            <MessageSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} />
            <MessageDelete open={openDelete} onClose={() => setOpenDelete(false)} />

            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                    <Box sx={{ margin: 0, pt: 5, pb: 5 }}>

                        <MenuItem
                            numId={numId}
                            onClickButton={setNumId}
                            onClickNuevo={handleClickNuevo}
                        />

                        {lsQuimico.length != 0 && numId == 1 ?
                            <SubRow
                                getSumaRiesgo={getSumaRiesgo}
                                getAll={getAll}
                                diferen={diferen}
                                onClickDelete={handleDeleteHistoryRisk}
                                row={lsQuimico}
                                title="Riesgo Químico"
                            /> : null}

                        {lsFisico.length != 0 && numId == 2 ?
                            <SubRow
                                getSumaRiesgo={getSumaRiesgo}
                                getAll={getAll}
                                diferen={diferen}
                                onClickDelete={handleDeleteHistoryRisk}
                                row={lsFisico}
                                title="Riesgo Físico"
                            /> : null}

                        {lsPsicosocial.length != 0 && numId == 3 ?
                            <SubRow
                                getSumaRiesgo={getSumaRiesgo}
                                getAll={getAll}
                                diferen={diferen}
                                onClickDelete={handleDeleteHistoryRisk}
                                row={lsPsicosocial}
                                title="Riesgo Psicosocial"
                            /> : null}

                        {lsBiologico.length != 0 && numId == 4 ?
                            <SubRow
                                getSumaRiesgo={getSumaRiesgo}
                                getAll={getAll}
                                diferen={diferen}
                                onClickDelete={handleDeleteHistoryRisk}
                                row={lsBiologico}
                                title="Riesgo Biológico"
                            /> : null}

                        {lsECFPostura.length != 0 && numId == 5 ?
                            <SubRow
                                getSumaRiesgo={getSumaRiesgo}
                                getAll={getAll}
                                diferen={diferen}
                                onClickDelete={handleDeleteHistoryRisk}
                                row={lsECFPostura}
                                title="Riesgo ECF - Postura"
                            /> : null}

                        {lsECFFuerza.length != 0 && numId == 6 ?
                            <SubRow
                                getSumaRiesgo={getSumaRiesgo}
                                getAll={getAll}
                                diferen={diferen}
                                onClickDelete={handleDeleteHistoryRisk}
                                row={lsECFFuerza}
                                title="Riesgo ECF - Fuerza"
                            /> : null}

                        {lsECFMovimiento.length != 0 && numId == 7 ?
                            <SubRow
                                getSumaRiesgo={getSumaRiesgo}
                                getAll={getAll}
                                diferen={diferen}
                                onClickDelete={handleDeleteHistoryRisk}
                                row={lsECFMovimiento}
                                title="Riesgo ECF - Movimiento"
                            /> : null}
                    </Box>
                </TableCell>
            </TableRow>
        </Fragment>
    );
}

export default WorkHistoryRiesgoDLTD;