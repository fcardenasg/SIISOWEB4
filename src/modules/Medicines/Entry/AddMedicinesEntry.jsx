import { Grid, useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import InputSelect from "components/input/InputSelect";
import { useState } from "react";
import SearchProduct from "../SearchProduct";

const AddMedicinesEntry = ({ errors }) => {
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const [dataProducto, setDataProducto] = useState(null);
    const [lsProveedor, setLsProveedor] = useState([]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <SearchProduct captureData={setDataProducto} dataProducto={dataProducto} />
            </Grid>

            <Grid item xs={12} md={6}>
                <InputSelect
                    name="idProveedor"
                    label="Proveedor"
                    defaultValue=""
                    options={lsProveedor}
                    size={matchesXS ? 'small' : 'medium'}
                    bug={errors.idProveedor}
                />
            </Grid>

            <Grid item xs={12} md={6}>

            </Grid>

            <Grid item xs={12}>

            </Grid>
        </Grid>
    );
};

export default AddMedicinesEntry;