import { Fragment, useState } from 'react';
import { Grid, Button } from '@mui/material';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { ParametrosExcel } from 'formatdata/ParametrosForm';
import { GetExcelRefund } from 'api/clients/RefundClient';
import LoadingGenerate from 'components/loading/LoadingGenerate';
import { MessageError } from 'components/alert/AlertAll';
import { Message, TitleButton } from 'components/helpers/Enums';
import { DownloadFile } from 'components/helpers/ConvertToBytes';

const ReintegroExport = ({ sede, fechaInicio, fechaFin, documento }) => {
    const [loading, setLoading] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    async function getDataForExport() {
        try {
            setLoading(true);

            const parametros = ParametrosExcel(sede, fechaInicio, fechaFin, documento);
            const lsServerExcel = await GetExcelRefund(parametros);

            if (lsServerExcel.status === 200) {
                DownloadFile(lsServerExcel.data.nombre, lsServerExcel.data.base64);

                setTimeout(() => {
                    setLoading(false);
                }, 1500);
            }
        } catch (error) {
            setLoading(false);

            setOpenError(true);
            setErrorMessage(Message.ErrorExcel);
        }
    }

    return (
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <MessageError error={errorMessage} open={openError} onClose={() => setOpenError(false)} />

            <Grid container spacing={3} sx={{ textAlign: 'center' }}>
                <Grid item xs={12}>
                    <AnimateButton>
                        <Button disabled={loading} onClick={getDataForExport} size="large" variant="contained">
                            {TitleButton.Excel}
                        </Button>
                    </AnimateButton>
                </Grid>

                {loading ?
                    <Fragment>
                        <Grid xs={2} md={5} />
                        <Grid item xs={8} md={6} lg={2}>
                            <LoadingGenerate title="Generando..." />
                        </Grid>
                        <Grid xs={2} md={5} />
                    </Fragment> : null
                }
            </Grid>
        </Grid>
    );

}

export default ReintegroExport;