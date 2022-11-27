import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchPostsAction } from '../actions/posts'
import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import { Container, Grid, Grow } from '@mui/material'

const Home: React.FC = () => {
  const [currentId, setCurrentId] = useState(null)
  const [isMobile, setIsMobile] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPostsAction())

    if (window.innerWidth > 769) {
      setIsMobile(false)
    } else {
      setIsMobile(true)
    }
  }, [dispatch])

  return (
    <Container>
      <Grow in>
        <Grid
          container
          direction={isMobile ? 'column-reverse' : 'row'}
          justifyContent="space-between"
          spacing={3}
          alignItems="stretch"
        >
          <Grid item xs={12} md={8}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} md={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Grow>
    </Container>
  )
}

export default Home
