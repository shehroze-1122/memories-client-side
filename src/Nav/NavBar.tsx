import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import logo from '../Images/memories.png';
import { AppBar, Typography, Toolbar, Button, Avatar } from '@mui/material';
import { blue } from '@mui/material/colors';

const NavBar: React.FC = () => {

  interface userInterface{
    result:{ name: string, imageUrl: string},
    token: string
  }
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const [ user, setUser ] = useState<userInterface>(JSON.parse(localStorage.getItem('profile') as string));
    const token = user?.token;

    useEffect(()=>{
      setUser(JSON.parse(localStorage.getItem('profile') as string))
    }, [location])

    const googleLogout = ()=>{
      dispatch({type:'LOGOUT', payload: null});
      navigate('/');
    }
    return (
        <AppBar position="static" color='transparent' style={{padding:'3px 5px'}}>
            <Toolbar >
              <img src={logo} alt="Logo memories" height='50px'/>
              <Typography component={Link} to='/' variant="h3" color='#0cc' style={{textDecoration:'none'}} sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }} >
                Memories
              </Typography>
              {user?(
                <div style={{ display:'flex', marginLeft:'auto'}}>
                    <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe" alt={user.result.name} src={user.result.imageUrl}></Avatar>
                    <Typography component='h6' color='#0cc' sx={{ display: { xs: 'none', sm: 'block' } }} style={{alignSelf:'center', paddingLeft:'8px'}}>{user.result.name}</Typography>
                    <Button><Typography component={Link} to='/' color='#fff' style={{textDecoration:'none', paddingLeft:'10px'}} onClick={()=>googleLogout()}>Logout</Typography></Button>
                </div>
              ):(
                <Button><Typography component={Link} to='/auth' color='#fff' style={{textDecoration:'none', marginLeft:'auto'}}>Login</Typography></Button>
              )}
              
            </Toolbar>
        </AppBar>
    )
}

export default NavBar;
