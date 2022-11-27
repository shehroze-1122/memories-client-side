import React, { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signin, signup } from '../../actions/auth'
import { Container, Paper, Avatar, Typography, Grid, Button } from '@mui/material'
import useStyles from './authStyle'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Input from './Input'
import { GoogleLogin } from 'react-google-login'
import Icon from './Icon'

export type formDataType = {
  firstName?: string
  lastName?: string
  email: string
  password: string
  confirmPassword?: string
}
const initialFormData: formDataType = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const Auth: React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isSignUp, setIsSignUp] = useState(false)
  const [formData, setFormData] = useState<formDataType>(initialFormData)
  const [showPassword, setShowPassword] = useState(false)
  const authStates = useSelector((state: any) => state.authReducer)
  const { error, loading } = authStates

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isSignUp) {
      dispatch(signup(formData, navigate))
    } else {
      dispatch(signin(formData, navigate))
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleShowPassword = () => {
    setShowPassword(prev => !prev)
  }

  const switchAuthMode = () => {
    setIsSignUp(prev => !prev)
    setShowPassword(false)
  }

  const googleLoginSuccess = async (res: any) => {
    const result = res?.profileObj
    const token = res?.tokenId
    try {
      dispatch({ type: 'AUTH', payload: { user: { name: result.name, id: result.googleId }, token } })
      navigate('/')
    } catch (error) {}
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input name="firstName" half label="First Name" type="text" autoFocus handleChange={handleChange} />
                <Input name="lastName" half label="Last Name" type="text" handleChange={handleChange} />
              </>
            )}
            <Input name="email" label="Email Address" type="email" handleChange={handleChange} />
            <Input
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              handleChange={handleChange}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type={showPassword ? 'text' : 'password'}
              />
            )}
            {error && (
              <Typography variant="subtitle2" style={{ padding: '3px 15px' }}>
                Incorrect Email or password. Please make sure you have a valid account
              </Typography>
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
            className={classes.submit}
          >
            {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}
            render={renderProps => (
              <Button
                className={classes.googleButton}
                variant="contained"
                color="secondary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled || loading}
                startIcon={<Icon />}
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleLoginSuccess}
            cookiePolicy="single_host_origin"
          />
          <Grid container justifyContent="center">
            <Grid item>
              {isSignUp ? 'Already have a account?' : 'New here?'}
              <Button onClick={switchAuthMode} disabled={loading}>
                {isSignUp ? 'Sign In ' : 'Sign Up'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth
