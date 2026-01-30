import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
    Slide,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { RestoreResearchAssignment } from 'api/clients/ResearchAssignmentClient';
import toast from 'react-hot-toast';
import { CodCatalogo } from 'components/helpers/Enums';
import { GetByTipoCatalogoCombo } from 'api/clients/CatalogClient';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ModalRestore = ({ open, onClose, idAssignment, getData }) => {
    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            motivoDevolver: '',
            observacionDevolver: '',
        },
    });

    const [lsCombo, setLsCombo] = useState([]);

    useEffect(() => {
        const fetchCombo = async () => {
            try {
                const lsServer = await GetByTipoCatalogoCombo(CodCatalogo.IEL_MOTIVODEVOLUCION);
                setLsCombo(lsServer.data);
            } catch (error) {
                console.error(error);
            }
        };

        if (open) {
            fetchCombo();
        }
    }, [open]);


    const handleSubmitForm = async (values) => {
        try {
            values.idAsignacionInvestigacion = idAssignment;

            const result = await RestoreResearchAssignment(values);
            if (result.data.exito) {
                toast.success("Se devolvió la asignación correctamente");
                reset();
                onClose();
                getData();
            }
        } catch (error) {
            toast.error('Error al devolver la asignación');
        }
    };

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            fullWidth
            maxWidth="sm"
            PaperProps={{
                sx: {
                    borderRadius: '12px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                }
            }}
        >
            <DialogTitle sx={{ fontWeight: 600 }}>Devolver Asignación de Investigación</DialogTitle>
            <DialogContent dividers>
                <Controller
                    name="idMotivolDevolucion"
                    control={control}
                    rules={{ required: 'Por favor seleccione un motivo' }}
                    render={({ field, fieldState: { error } }) => (
                        <TextField
                            {...field}
                            select
                            fullWidth
                            label="Motivo de devolución"
                            error={!!error}
                            helperText={error?.message}
                            margin="normal"
                        >
                            {lsCombo.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    )}
                />

                <Controller
                    name="observacion"
                    control={control}
                    rules={{ required: 'Por favor ingrese la descripción' }}
                    render={({ field, fieldState: { error } }) => (
                        <TextField
                            {...field}
                            fullWidth
                            multiline
                            rows={6}
                            label="Observaciones detalladas"
                            placeholder="Describa detalladamente el motivo de la devolución..."
                            error={!!error}
                            helperText={error?.message}
                            margin="normal"
                        />
                    )}
                />
            </DialogContent>

            <DialogActions sx={{ pt: 2 }}>
                <Button onClick={() => { onClose(); reset(); }} color="inherit" variant="text">
                    Cancelar
                </Button>
                <Button onClick={handleSubmit(handleSubmitForm)} variant="contained" sx={{ mr: 2 }}>
                    Devolver Asignación
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalRestore;
