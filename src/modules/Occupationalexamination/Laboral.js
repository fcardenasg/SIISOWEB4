import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, Divider, Grid, IconButton, Link, TextField, Typography } from '@mui/material';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import Posts from 'ui-component/cards/Post';
import MainCard from 'ui-component/cards/MainCard';
import axios from 'utils/axios';
import { gridSpacing } from 'store/constant';

// assets
import AttachmentTwoToneIcon from '@mui/icons-material/AttachmentTwoTone';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LayersTwoToneIcon from '@mui/icons-material/LayersTwoTone';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import PublicTwoToneIcon from '@mui/icons-material/PublicTwoTone';
import RecentActorsTwoToneIcon from '@mui/icons-material/RecentActorsTwoTone';

// ==============================|| SOCIAL PROFILE - POST ||============================== //

const Laboral = () => {
    const theme = useTheme();
    const [posts, setPosts] = useState([]);
    const getPost = async () => {
        const response = await axios.get('/api/posts/list');
        setPosts(response.data.posts);
    };

    useEffect(() => {
        getPost();
    }, []);

    const editPost = async (id, commentId) => {
        await axios
            .post('/api/posts/editComment', {
                key: id,
                id: commentId
            })
            .then((response) => {
                setPosts(response.data.posts);
            });
    };

    const commentAdd = async (id, comment) => {
        await axios
            .post('/api/comments/add', {
                postId: id,
                comment
            })
            .then((response) => {
                setPosts(response.data.posts);
            });
    };

    const replyAdd = async (postId, commentId, reply) => {
        await axios
            .post('/api/replies/add', {
                postId,
                commentId,
                reply
            })
            .then((response) => {
                setPosts(response.data.posts);
            });
    };

    const handlePostLikes = async (postId) => {
        await axios
            .post('/api/posts/list/like', {
                postId
            })
            .then((response) => {
                setPosts(response.data.posts);
            });
    };

    const handleCommentLikes = async (postId, commentId) => {
        await axios
            .post('/api/comments/list/like', {
                postId,
                commentId
            })
            .then((response) => {
                setPosts(response.data.posts);
            });
    };

    const handleReplayLikes = async (postId, commentId, replayId) => {
        await axios
            .post('/api/replies/list/like', {
                postId,
                commentId,
                replayId
            })
            .then((response) => {
                setPosts(response.data.posts);
            });
    };

    const sideAvatarSX = {
        borderRadius: '8px',
        width: 48,
        height: 48,
        fontSize: '1.5rem',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: theme.palette.mode === 'dark' ? '1px solid' : 'none',
        '&>svg': {
            width: 24,
            height: 24
        }
    };

    return (
        <MainCard
            title={
                <Grid container alignItems="center" justifyContent="space-between" spacing={gridSpacing}>
                    <Grid item>
                        <Typography variant="h4">Historia Laboral otras empresas</Typography>
                    </Grid>
                 
                </Grid>
            }
        >
            <Grid container direction="row" spacing={gridSpacing}>
                
            </Grid>
        </MainCard>
    );
};

export default Laboral;
