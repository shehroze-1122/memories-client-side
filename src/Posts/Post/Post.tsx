import React, { useState } from 'react';
import useStyles from './postStyle';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../actions/posts';
// import { incLikes } from '../../actions/posts';
import { postsType } from '../../actions/posts';
import { Card, CardHeader, Avatar, IconButton, CardMedia,CardContent, Typography, CardActions } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import { ObjectId } from 'mongoose';

type PostProps = {
    post:postsType,
    setCurrentId: Function
}
const Post: React.FC<PostProps> = ({post, setCurrentId}) => {

    const {creator, title, message, createdAt, likes, selectedFile, tags} = post;

    const [ isLiked, setIsLiked ] = useState(false);
    const [ numLikes, setNumLikes ] = useState(likes as number);
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleLikes = () =>{
        // dispatch(incLikes(post));
        if(!isLiked){
            fetch( 'http://localhost:5000/posts/likesInc', {
            method: 'put',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({...post, likes: numLikes})
        })
        .then(resp=>resp.json())
        .then(data=>{
            setNumLikes(prev=>prev+1);
        })
        

        }else{
            fetch( 'http://localhost:5000/posts/likesDec', {
            method: 'put',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({...post, likes: numLikes})
        })
        .then((resp)=>resp.json())
        .then((data)=>{
            setNumLikes(prev=>prev-1);
        })
        
        }
        
        setIsLiked(prev=>!prev);

    }

    return (
        <div>
                <Card sx={{ maxWidth: 300 }} className={classes.card}>
                    <CardHeader
                        avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            {creator[0].toUpperCase()}
                        </Avatar>
                        }
                        action={
                        <IconButton aria-label="settings" onClick={()=>setCurrentId(post._id)}>
                            <MoreVertIcon />
                        </IconButton>
                        }
                        title={creator}
                        subheader={moment(createdAt).fromNow()}
                    />
                    <CardMedia
                        className={classes.media}
                        image={selectedFile}
                        title={title}
                    />
                     <CardContent >
                        <Typography variant='subtitle2' color='darkgrey'>{tags.map((tag, ind)=><span key={ind}>#{tag+' '}</span>)}</Typography>
                    </CardContent>

                    <CardContent className={classes.paddingBetween}>
                        <Typography variant="body2" height='60px'>
                        {message}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing className={classes.cardActions}>
                        <IconButton aria-label="add to favorites" onClick={()=>handleLikes()}>
                            {isLiked?<FavoriteIcon sx={{ color: red[500] }}/>: <FavoriteIcon />}
                        </IconButton>
                        <IconButton aria-label="share" onClick={()=>dispatch(deletePost(post._id as ObjectId))}>
                            <DeleteIcon />
                        </IconButton>
                    </CardActions>
                    <CardContent className={classes.paddingBetween}>
                        <Typography>{numLikes} likes</Typography>

                    </CardContent>    
                </Card>
        </div>
    )
}

export default Post
