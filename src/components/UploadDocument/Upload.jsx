import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import UploadIllustration from './UploadIllustration';

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

    const renderPlaceholder = (
        <Stack spacing={3} alignItems="center" justifyContent="center" flexWrap="wrap">
            <UploadIllustration sx={{ width: 1, maxWidth: 200 }} />
            <Stack spacing={1} sx={{ textAlign: 'center' }}>
                <Typography variant="h">Soltar o seleccionar archivo</Typography>
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

Upload.propTypes = {
    disabled: PropTypes.object,
    error: PropTypes.bool,
    file: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    files: PropTypes.array,
    helperText: PropTypes.object,
    multiple: PropTypes.bool,
    onDelete: PropTypes.func,
    onRemove: PropTypes.func,
    onRemoveAll: PropTypes.func,
    onUpload: PropTypes.func,
    sx: PropTypes.object,
    thumbnail: PropTypes.bool,
};
