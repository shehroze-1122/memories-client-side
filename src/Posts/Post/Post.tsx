import React, { useEffect, useState } from 'react';
import useStyles from './postStyle';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, likePost } from '../../actions/posts';
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

    const { name, creator, title, message, createdAt, likes, selectedFile, tags } = post;

    const user = JSON.parse(localStorage.getItem('profile') as string);
    const authData =  useSelector((state:any)=>state.authReducer.authData);

    const [ isLiked, setIsLiked ] = useState(likes?.findIndex((like)=>like===user?.id) !== -1);
    const classes = useStyles();
    const dispatch = useDispatch();
    const handleLikes = () =>{
        dispatch(likePost(post._id as ObjectId));
        setIsLiked(prev=>!prev);

    }
    const numLikes = likes?.length;

    useEffect(()=>{
        if(!authData && !JSON.parse(localStorage.getItem('profile') as string)){
            setIsLiked(false);
        }
    }, [authData, user])

    return (
        <div>
                <Card sx={{ maxWidth: 300 }} className={classes.card}>
                    <CardHeader
                        avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            {name?name[0].toUpperCase(): null}
                        </Avatar>
                        }
                        action={
                        <IconButton aria-label="settings" onClick={()=>setCurrentId(post._id)}>
                            <MoreVertIcon />
                        </IconButton>
                        }
                        title={name}
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
                        <Typography variant="body2" height='50px'>
                        {message}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing className={classes.cardActions}>
                        <IconButton aria-label="add to favorites" onClick={()=>handleLikes()} disabled={!authData&&!JSON.parse(localStorage.getItem('profile') as string)}>
                            {isLiked?<FavoriteIcon sx={{ color: red[500] }}/>: <FavoriteIcon />}
                        </IconButton>

                        {
                            user?.id && (
                                user?.id === creator && (
                                    
                                    <IconButton aria-label="share" onClick={()=>dispatch(deletePost(post._id as ObjectId))}>
                                        <DeleteIcon />
                                    </IconButton>
                                )
                            )
                        }
                       
                    </CardActions>
                    <CardContent className={classes.paddingBetween}>
                        <Typography>{numLikes} {(numLikes as number)>1?'likes':'like'}</Typography>
                    </CardContent>    
                </Card>
        </div>
    )
}

export default Post
