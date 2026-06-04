import { Grid, Paper, Typography } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import InputOnChange from "components/input/InputOnChange";
import InputSelect from "components/input/InputSelect";
import { GetAllByCodeOrName } from "api/clients/CIE11Client";
import { useFormContext } from "react-hook-form";

const DiagnosisAPT = ({ }) => {
    const { watch } = useFormContext();

    const dx1 = watch("dx1");
    const dx2 = watch("dx2");
    const dx3 = watch("dx3");
    const listDx1 = watch("listDx1");
    const listDx2 = watch("listDx2");
    const listDx3 = watch("listDx3");

    const [textDx1, setTextDx1] = useState(dx1 || "");
    const [textDx2, setTextDx2] = useState(dx2 || "");
    const [textDx3, setTextDx3] = useState(dx3 || "");
    const [lsDx1, setLsDx1] = useState(listDx1 || []);
    const [lsDx2, setLsDx2] = useState(listDx2 || []);
    const [lsDx3, setLsDx3] = useState(listDx3 || []);

    const handleDx = async (event, dxType) => {
        const value = event.target.value;

        if (dxType === 1) setTextDx1(value);
        else if (dxType === 2) setTextDx2(value);
        else if (dxType === 3) setTextDx3(value);

        if (event.key === 'Enter' && value.trim()) {
            try {
                const { data } = await GetAllByCodeOrName(value.trim());
                switch (dxType) {
                    case 1: setLsDx1(data); break;
                    case 2: setLsDx2(data); break;
                    case 3: setLsDx3(data); break;
                    default: break;
                }
            } catch {
                toast.error('Error al buscar el diagnóstico');
            }
        } else if (event.key === 'Enter') {
            toast.error('Ingrese un código o nombre de diagnóstico');
        }
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={2.5}>
                <InputOnChange
                    label="Buscar DX1"
                    onChange={(e) => setTextDx1(e.target.value)}
                    onKeyDown={(e) => handleDx(e, 1)}
                    value={textDx1}
                />
            </Grid>

            <Grid item xs={12} md={9.5}>
                <InputSelect
                    defaultValue=""
                    name="dx1"
                    label="Diagnóstico DX1"
                    options={lsDx1}
                />
            </Grid>

            <Grid item xs={12} md={2.5}>
                <InputOnChange
                    label="Buscar DX2"
                    onChange={(e) => setTextDx2(e.target.value)}
                    onKeyDown={(e) => handleDx(e, 2)}
                    value={textDx2}
                />
            </Grid>

            <Grid item xs={12} md={9.5}>
                <InputSelect
                    defaultValue=""
                    name="dx2"
                    label="Diagnóstico DX2"
                    options={lsDx2}
                />
            </Grid>

            <Grid item xs={12} md={2.5}>
                <InputOnChange
                    label="Buscar DX3"
                    onChange={(e) => setTextDx3(e.target.value)}
                    onKeyDown={(e) => handleDx(e, 3)}
                    value={textDx3}
                />
            </Grid>

            <Grid item xs={12} md={9.5}>
                <InputSelect
                    defaultValue=""
                    name="dx3"
                    label="Diagnóstico DX3"
                    options={lsDx3}
                />
            </Grid>
        </Grid>
    );
};

export default DiagnosisAPT;