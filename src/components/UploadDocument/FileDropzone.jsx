import { Box, Grid, Typography } from '@mui/material';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Controller, useFormContext } from 'react-hook-form';
import upload from "assets/icons/upload.svg";
import toast from 'react-hot-toast';

const FileDropzone = ({ name, defaultValue, ...other }) => {
    const { control, setValue, getValues } = useFormContext();

    // Función para leer un archivo y devolver un objeto con los datos y la URL
    const fileToFormData = async (archivo) => {
        const dataUrl = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => resolve(event.target.result);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(archivo);
        });

        // Devolvemos el archivo original (File) y la URL de previsualización
        return {
            file: archivo, // Archivo físico original para nombre, tamaño y tipo
            preview: dataUrl, // Data URL para la miniatura
        };
    };

    const onDrop = useCallback(async (acceptedFiles) => {
        if (acceptedFiles.length === 0) {
            toast.error("El tipo de archivo seleccionado no es válido. Por favor, selecciona imágenes.");
            return;
        }

        const currentFiles = getValues(name) || [];
        const newFilesPromises = acceptedFiles.map(fileToFormData);

        try {
            const newFiles = await Promise.all(newFilesPromises);
            setValue(name, [...currentFiles, ...newFiles], { shouldValidate: true });
        } catch (error) {
            toast.error("Ocurrió un error al leer uno o más archivos.");
        }
    }, [name, setValue, getValues]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: true,
        accept: {
            'image/*': [],
        },
        ...other,
    });

    return (
        <Controller
            name={name}
            defaultValue={defaultValue}
            control={control}
            render={({ field }) => (
                <Box
                    {...getRootProps()}
                    sx={{
                        border: '2px dashed rgb(240, 240, 240)',
                        borderRadius: 2,
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: '0.3s',
                        p: 2, // Padding añadido para mejor visual
                        minHeight: 150, // Altura mínima para el área de drop
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        '&:hover': {
                            borderColor: 'primary.main',
                        }
                    }}
                >
                    <input {...getInputProps()} />

                    {/* Ícono de Subida */}
                    <img src={upload} alt="upload icon" style={{ width: 120, height: 120, marginBottom: 8 }} />

                    {/* Mensaje de Dropzone */}
                    <Typography color={isDragActive ? 'primary.main' : 'text.secondary'} sx={{ mb: 0.5 }}>
                        {isDragActive
                            ? 'Suelta las imágenes aquí...'
                            : 'Arrastra y suelta imágenes, o haz clic para seleccionar'}
                    </Typography>
                    <Typography variant="caption" color="text.disabled">
                        Solo archivos de imagen (JPG, PNG, GIF, etc.)
                    </Typography>
                </Box>
            )}
        />
    );
};

export default FileDropzone;