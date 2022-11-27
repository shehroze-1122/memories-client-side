import React, { useState, useEffect, ChangeEvent } from 'react'
import { createPost, postsType, updatePost } from '../../actions/posts'
import { useDispatch, useSelector } from 'react-redux'
import { ObjectId } from 'mongoose'
import { TextField, Button, Typography, Paper, Container, Alert } from '@mui/material'
import { makeStyles } from '@mui/styles'

type prop = {
  currentId: null | ObjectId
  setCurrentId: Function
}
const Form: React.FC<prop> = ({ currentId, setCurrentId }) => {
  const dispatch = useDispatch()
  const [postData, setPostData] = useState({
    title: '',
    message: '',
    tags: [] as string[],
    selectedFile: ''
  })
  const [err, setErr] = useState(false)
  const user = useSelector((state: any) => state.authReducer.user)

  const [submitStatus, setSubmitStatus] = useState(false)

  const useStyles = makeStyles({
    TextField: {
      marginBottom: '10px'
    }
  })

  const post = useSelector((state: any) =>
    state.assignPosts.posts.find((post: postsType) => post._id === (currentId as ObjectId))
  )

  useEffect(() => {
    if (post && currentId) {
      setPostData(post as postsType)
    }
  }, [currentId, post])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const { message, title, tags, selectedFile } = postData
    if (message && title && tags.length && selectedFile) {
      if (currentId !== null && post) {
        dispatch(updatePost(postData, currentId))
        setCurrentId(null)
      } else {
        dispatch(createPost({ ...postData, name: user.name }))
      }
      setErr(false)
      handleClear()
      setSubmitStatus(true)
    } else {
      setSubmitStatus(false)
      setErr(true)
    }
  }

  const handleClear = () => {
    setPostData({
      title: '',
      message: '',
      tags: [],
      selectedFile: ''
    })

    const inp = document.getElementById('img-input') as HTMLInputElement
    inp.value = ''

    setSubmitStatus(false)
    setErr(false)
    setCurrentId(null)
  }

  const getBase64 = (e: ChangeEvent<HTMLInputElement>, cb: Function) => {
    const file = e.target.files![0] as Blob
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      cb(reader.result)
    }
    reader.onerror = function (error) {
      console.log('Error: ', error)
    }
  }

  const classes = useStyles()

  if (!user) {
    return (
      <Paper elevation={6}>
        <Typography variant="h6" style={{ padding: '15px 8px', marginTop: '10px' }}>
          Please Login or SignUp to be able to create memory posts and like other's memories
        </Typography>
      </Paper>
    )
  }

  return (
    <div style={{ marginTop: '10px' }}>
      <Paper elevation={6}>
        {err ? (
          <Alert variant="filled" severity="error" style={{ borderRadius: '0' }}>
            Please fill out all the fields
          </Alert>
        ) : null}
        {submitStatus ? (
          <Alert variant="filled" severity="success" style={{ borderRadius: '0' }}>
            Post submitted successfully!
          </Alert>
        ) : null}

        <Container style={{ paddingTop: '20px', paddingBottom: '20px', overflow: 'auto' }}>
          <Typography variant="h6" style={{ padding: '5px' }} align="center">
            {post && currentId ? 'EDIT POST' : 'CREATE POST'}
          </Typography>
          <form noValidate onSubmit={handleSubmit}>
            <TextField
              className={classes.TextField}
              id="outlined-basic"
              fullWidth
              label="Title"
              variant="outlined"
              onChange={e => setPostData({ ...postData, title: e.target.value })}
              value={postData.title}
            />

            <TextField
              className={classes.TextField}
              id="filled-multiline-flexible"
              fullWidth
              label="Message"
              variant="outlined"
              onChange={e => setPostData({ ...postData, message: e.target.value })}
              value={postData.message}
              multiline
              maxRows={3}
            />

            <TextField
              className={classes.TextField}
              id="outlined-basic"
              fullWidth
              label="Tags(comma separated)"
              variant="outlined"
              onChange={e =>
                e.target.value
                  ? setPostData({ ...postData, tags: e.target.value.split(',') })
                  : setPostData({ ...postData, tags: [] })
              }
              value={postData.tags.length ? postData.tags.map(tag => tag) : ''}
            />

            <input
              id="img-input"
              type="file"
              accept="image/*"
              onChange={e =>
                getBase64(e, (imageString: string) => setPostData({ ...postData, selectedFile: imageString }))
              }
            />

            <Button
              variant="contained"
              size="large"
              color="primary"
              disableElevation
              style={{ display: 'block', width: '100%', marginTop: '15px', marginBottom: '5px' }}
              type="submit"
            >
              Submit
            </Button>

            <Button
              onClick={() => handleClear()}
              size="small"
              variant="contained"
              color="error"
              disableElevation
              style={{ display: 'block', width: '100%' }}
            >
              Clear
            </Button>
          </form>
        </Container>
      </Paper>
    </div>
  )
}

export default Form
