import React from 'react';
import { Grid, CircularProgress, Typography } from '@mui/material';
import { useSelector } from "react-redux";
import { postsStateType } from '../reducers/posts';
import Post from './Post/Post';

const Posts: React.FC = () => {
    const data = useSelector((state: postsStateType)=>state.posts);
    console.log(data.length);
    return (
        data.length?(
        <div style={{marginTop:'10px'}}>
            <Grid container spacing={3}>
                {data.map((post)=>(
                    <Grid item xs={12} sm={6} alignItems='stretch'>
                            <Post
                            key={post.id}
                            post={post}
                            />
                    </Grid>)
                )}
            </Grid>
            

        </div>):(
            <div style={{display:'flex', justifyContent:'center', marginTop:'150px'}}>
                <CircularProgress />
                <Typography variant='h6' style={{marginLeft:'20px'}}>Loading Posts...</Typography>
            </div>
            )
        )
}

export default Posts
