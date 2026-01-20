import React from 'react';
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

    const returnReasons = [
        { label: 'Ocupación incorrecta', value: 'OCUPACION_INCORRECTA' },
        { label: 'Sobrecarga laboral', value: 'SOBRECARGA_LABORAL' },
        { label: 'Falta de documentación soporte', value: 'FALTA_DOCUMENTACION' },
        { label: 'Información inconsistente', value: 'INFORMACION_INCONSISTENTE' },
        { label: 'Error en la asignación geográfica', value: 'ERROR_GEOGRAFICO' },
        { label: 'Conflicto de intereses', value: 'CONFLICTO_INTERESES' },
        { label: 'Otros', value: 'OTROS' },
    ];

    const handleSubmitForm = async (values) => {
        try {
            values.id = idAssignment;

            const result = await RestoreResearchAssignment(values);
            if (result.data.exito) {
                toast.success(result.data.mensaje);
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
                    name="motivoDevolver"
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
                            {returnReasons.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    )}
                />

                <Controller
                    name="observacionDevolver"
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
