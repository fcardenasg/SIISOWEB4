import { Grid, Card, CardMedia, Typography, IconButton, List, ListItem, ListItemText, ListItemAvatar, Avatar, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFormContext } from 'react-hook-form';

// Helper para formatear el tamaño del archivo
const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const ImageListPreview = ({ name, title }) => {
    const { getValues, setValue } = useFormContext();
    const files = getValues(name) || [];

    // Función para manejar la eliminación de un archivo
    const handleDelete = (index) => {
        const newFiles = files.filter((_, i) => i !== index);
        setValue(name, newFiles, { shouldValidate: true });
    };

    if (files.length === 0) {
        return (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                No hay imágenes seleccionadas.
            </Typography>
        );
    }

    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {files.map((item, index) => (
                <ListItem
                    key={index}
                    secondaryAction={
                        <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(index)}>
                            <DeleteIcon color="error" />
                        </IconButton>
                    }
                    sx={{
                        borderBottom: '1px solid #eee',
                        p: 1,
                        alignItems: 'center',
                        justifyContent: "center"
                    }}
                >
                    <ListItemAvatar sx={{ minWidth: 70, mr: 2 }}>
                        <Avatar variant="square" sx={{ width: 70, height: 70 }}>
                            <CardMedia
                                component="img"
                                image={item.preview}
                                alt={`miniatura-${item.file.name}`}
                                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </Avatar>
                    </ListItemAvatar>

                    <ListItemText
                        primary={
                            <Typography variant="h4" sx={{ fontSize: '0.87rem', flexShrink: 0, mb: 0.5 }}>
                                {item.file.name}
                            </Typography>
                        }
                        secondary={
                            <>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: .3 }}>
                                    <Typography variant="h4" sx={{ fontSize: '0.87rem' }}>Tamaño:</Typography>
                                    <Typography variant="h6" sx={{ fontSize: '0.87rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{formatFileSize(item.file.size)}</Typography>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center', gap: .3 }}>
                                    <Typography variant="h4" sx={{ fontSize: '0.87rem' }}>Tipo:</Typography>
                                    <Typography variant="h6" sx={{ fontSize: '0.87rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.file.type.split('/')[1] || 'N/A'}</Typography>
                                </Box>
                            </>
                        }
                    />
                </ListItem>
            ))}
        </List>
    );
};

export default ImageListPreview;

{/* <>
                                <Typography component="span" variant="body2" color="text.secondary" display="block">
                                    Tamaño: {formatFileSize(item.file.size)}
                                </Typography>
                                <Typography component="span" variant="body2" color="text.secondary" display="block">
                                    Tipo: {item.file.type.split('/')[1] || 'N/A'}
                                </Typography>
                            </> */}