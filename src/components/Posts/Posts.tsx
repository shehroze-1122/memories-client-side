import React from 'react'
import { Grid, CircularProgress, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { postsType } from '../../actions/posts'
import Post from './Post/Post'

type prop = {
  setCurrentId: Function
}
const Posts: React.FC<prop> = ({ setCurrentId }) => {
  const data = useSelector((state: any) => state.assignPosts)
  const { posts, postsLoading, fetchError } = data

  if (postsLoading)
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '150px' }}>
        <CircularProgress />
        <Typography variant="h6" style={{ marginLeft: '20px' }}>
          Loading Posts...
        </Typography>
      </div>
    )

  if (fetchError) return <p>Unable to get posts at the moment. Try Again!</p>

  return (
    <div style={{ marginTop: '10px', marginBottom: '50px' }}>
      <Grid container spacing={3}>
        {posts.map((post: postsType) => (
          <Grid item xs={12} sm={6} alignItems="stretch" justifyContent="center" key={String(post._id)}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default Posts
