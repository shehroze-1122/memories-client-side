import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Avatar, Typography, Grid, Button } from '@mui/material';
import useStyles from './authStyle';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Input from './Input';
import { GoogleLogin } from 'react-google-login';
import Icon from './Icon'

const Auth: React.FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ isSignUp, setIsSignUp ] = useState(true);
    const [ showPassword, setShowPassword ] = useState(false);

    const handleSubmit = () =>{

    }

    const handleChange = () =>{

    }

    const handleShowPassword = () =>{
        setShowPassword((prev)=> !prev);
    }

    const switchAuthMode = () =>{
        setIsSignUp((prev)=> !prev);
        setShowPassword(false);
    }

    const googleLoginSuccess= async (res: any) =>{
        const result = res?.profileObj;
        const token = res?.tokenId;
        
        try {
            dispatch({type:'AUTH', payload: {result, token}});
            navigate('/');
        } catch (error) {
            console.log(error)
        }
    }

    const googleLoginFailure = (err: Error) =>{
        console.log('Error occured:', err);
    }

    return (
        <Container component='main' maxWidth='xs'>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5'>{isSignUp? 'Sign Up': 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <>
                                    <Input name='firstname' half label='First Name' type='text' autoFocus handleChange={handleChange}/>
                                    <Input name='lastname' half label='Last Name' type='text' handleChange={handleChange}/>
                                </>
                            )
                        }
                            <Input name='email' label='Email Address' type='email' handleChange={handleChange}/>
                            <Input name='password' label='Password' type={showPassword? 'text': 'password'} handleChange={handleChange} handleShowPassword={handleShowPassword}/>
                            {
                                isSignUp && <Input name='confirmPassword' label='Repeat Password' type='password' handleChange={handleChange}/>

                            }
                    </Grid>
                    <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>{isSignUp? 'Sign Up' : 'Sign In'}</Button>
                    <GoogleLogin
                        clientId='883201599656-7685gnp0fgdo492h84avttk9f6mijm11.apps.googleusercontent.com'
                        render={(renderProps)=>(
                            <Button 
                            className={classes.googleButton} 
                            variant='contained'
                            color='secondary'
                            fullWidth
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled} 
                            startIcon={<Icon/>}
                            >
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleLoginSuccess}
                        onFailure={googleLoginFailure}
                        cookiePolicy='single_host_origin'
                    />
                    <Grid container justifyContent='center'>
                        <Grid item>
                            { isSignUp? 'Already have a account?':'New here?'}
                            <Button onClick={switchAuthMode}>
                                { isSignUp? 'Sign Up': 'Sign In'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>

        </Container>
    )
}

export default Auth;
