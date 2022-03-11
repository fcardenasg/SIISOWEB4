import { useState, useEffect } from 'react';

// material-ui
import { Button, Grid, Typography } from '@mui/material';

// project imports
import GalleryCard from 'ui-component/cards/GalleryCard';
import MainCard from 'ui-component/cards/MainCard';
import axios from 'utils/axios';
import { gridSpacing } from 'store/constant';

// ==============================|| SOCIAL PROFILE - GALLERY ||============================== //

const Paraclinicos = () => {
    const [gallery, setGallery] = useState([]);
    const getGallery = async () => {
        const response = await axios.get('/api/gallery/list');
        setGallery(response.data.gallery);
    };

    useEffect(() => {
        getGallery();
    }, []);

    let galleryResult = <></>;
    if (gallery) {
        galleryResult = gallery.map((item, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                <GalleryCard {...item} />
            </Grid>
        ));
    }

    return (
        <MainCard
        title={
            <Grid container alignItems="center" justifyContent="space-between" spacing={gridSpacing}>
            <Grid item>
                <Typography variant="h4">Exámenes Paraclinicos</Typography>
            </Grid>
     
        </Grid>
        }
    >
        <Grid container direction="row" spacing={gridSpacing}>
            {/* {friendsResult} */}
        </Grid>
    </MainCard>
    );
};

export default Paraclinicos;