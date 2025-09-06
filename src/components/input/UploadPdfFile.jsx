import { Box, Typography } from '@mui/material';
import ImgPDF from 'assets/images/ImgPDF.png';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';

const UploadPdfFile = ({ name, defaultValue }) => {
    const [dragActive, setDragActive] = useState(false);
    const { setValue, watch, control } = useFormContext();
    const urlFile = watch(name);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            if (file.type === 'application/pdf') {
                try {
                    let reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onloadend = (e) => {
                        setValue(name, e.target.result);
                    }
                } catch (error) {
                    toast.error('Error al procesar el archivo.');
                }
            } else {
                toast.error('Solo se permiten archivos PDF.');
            }
        }
    };

    const handleFile = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'application/pdf') {
            try {
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = (e) => {
                    setValue(name, e.target.result);
                }
            } catch (error) {
                toast.error('Error al procesar el archivo.');
            }
        } else {
            toast.error('Solo se permiten archivos PDF.');
        }
    };

    return (
        <Box
            sx={{
                border: dragActive ? '2px dashed #1976d2' : '2px dashed #ccc',
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxSizing: 'border-box',
                cursor: 'pointer',
                transition: 'border-color 0.3s ease',
                p: 1,
                height: '100%',
                position: 'relative',
            }}
            onClick={() => document.getElementById('fileInput').click()}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
        >
            {!urlFile && (
                <>
                    <img src={ImgPDF} alt="PDF Icon" style={{ width: '150px', height: 'auto', marginBottom: '40px' }} />

                    <Typography variant="body1" sx={{ color: '#888', textAlign: 'center', fontSize: '0.9rem' }}>
                        Arrastra y suelta tu archivo aquí o haz clic para seleccionarlo.
                    </Typography>
                </>
            )}

            {urlFile && (
                <iframe
                    src={urlFile}
                    width="100%"
                    height="100%"
                    title="PDF Preview"
                    style={{ border: 'none', flexGrow: 1 }}
                />
            )}

            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                render={({ field }) => (
                    <input
                        id="fileInput"
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => {
                            handleFile(e);
                            field.onChange(e);
                        }}
                        style={{ display: 'none' }}
                    />
                )}
            />
        </Box>
    );
};

export default UploadPdfFile;