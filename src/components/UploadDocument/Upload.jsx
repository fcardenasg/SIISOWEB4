import { useDropzone } from 'react-dropzone';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import animation from 'assets/img/animation.json';
import animation2 from 'assets/img/animation2.json';
import fileuploaded from 'assets/img/fileuploaded.json';
import Lottie from 'lottie-react';
import { Fragment } from 'react';


export default function Upload({
    disabled,
    multiple = false,
    error,
    helperText,
    //
    file,
    onDelete,
    //
    files,
    thumbnail,
    onUpload,
    onRemove,
    onRemoveAll,
    sx,
    ...other
}) {
    const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
        multiple,
        disabled,
        ...other,
    });

    const hasFile = !!file && !multiple;
    const hasError = isDragReject || !!error;

    let usersResult = <></>;

    if (!isDragActive) {
        if (files === null) {
            usersResult = (<Box sx={{ alignContent: 'center', width: '180px', height: '130px', marginX: 'auto' }}>
                <Lottie animationData={animation} />
            </Box>);
        } else {
            usersResult = (<Box sx={{ alignContent: 'center', width: '180px', height: '130px', marginX: 'auto' }}>
                <Lottie animationData={fileuploaded} />
            </Box>);
        }
    } else {
        usersResult = (<Box sx={{ alignContent: 'center', width: '180px', height: '130px', marginX: 'auto' }}>
            <Lottie animationData={animation2} />
        </Box>);
    }

    const renderPlaceholder = (
        <Stack spacing={3} alignItems="center" justifyContent="center" flexWrap="wrap">
            {usersResult}

            <Stack spacing={1} sx={{ textAlign: 'center' }}>
                {files === null ? <Fragment>
                    <Typography variant="h4">Soltar o seleccionar archivo</Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        Suelte los archivos aquí o haga clic
                        <Box
                            component="span"
                            sx={{
                                mx: 0.5,
                                color: 'primary.main',
                                textDecoration: 'underline',
                            }}
                        >
                            aquí
                        </Box>
                    </Typography>
                </Fragment> : <Typography variant="h4">Archivo cargado exitosamente</Typography>}
            </Stack>
        </Stack>
    );

    return (
        <Box sx={{ width: 1, position: 'relative', ...sx }}>
            <Box
                {...getRootProps()}
                sx={{
                    p: 5,
                    outline: 'none',
                    borderRadius: 1,
                    cursor: 'pointer',
                    overflow: 'hidden',
                    position: 'relative',
                    bgcolor: (theme) => alpha(theme.palette.grey[500], 0.08),
                    border: (theme) => `1px dashed ${alpha(theme.palette.grey[500], 0.2)}`,
                    transition: (theme) => theme.transitions.create(['opacity', 'padding']),
                    '&:hover': {
                        opacity: 0.72,
                    },
                    ...(isDragActive && {
                        opacity: 0.72,
                    }),
                    ...(disabled && {
                        opacity: 0.48,
                        pointerEvents: 'none',
                    }),
                    ...(hasError && {
                        color: 'error.main',
                        borderColor: 'error.main',
                        bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
                    }),
                    ...(hasFile && {
                        padding: '24% 0',
                    }),
                }}
            >
                <input {...getInputProps()} />

                {renderPlaceholder}
            </Box>

            {helperText && helperText}
        </Box>
    );
}