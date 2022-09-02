import ReactExport from "react-export-excel";
import { IconFileExport } from '@tabler/icons';
import { Fragment } from "react";
import { Grid, Tooltip, Button, IconButton } from "@mui/material";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const ExportConsulting = ({ sede, atencion, fechaInicio, fechaFin }) => {

    function getDataForExport() {
        try {
            if (sede === '' && atencion === '') {

            }

            if (sede !== '' && atencion === '') { }

            if (sede === '' && atencion !== '') { }

            if (sede !== '' && atencion !== '') { }


        } catch (error) { }
    }

    const lsAsesorias = [];
    return (
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <ExcelFile element={
                <Button size="large" variant="contained">
                    GENERAR EXPORTACIÓN
                </Button>
            } filename="ASESORÍAS">
                <ExcelSheet data={lsAsesorias} name="Listado de Asesorías">
                    <ExcelColumn label="ID" value="id" />
                </ExcelSheet>
            </ExcelFile>
        </Grid>
    );

}

export default ExportConsulting;