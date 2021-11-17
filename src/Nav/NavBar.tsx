import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../Images/memories.png';
import { AppBar, Typography, Toolbar, Button, Avatar } from '@mui/material';
import { blue } from '@mui/material/colors';

const NavBar: React.FC = () => {
    const [user, setUser] = useState(false);

    return (
        <AppBar position="static" color='transparent' style={{padding:'3px 5px'}}>
            <Toolbar >
              <img src={logo} alt="Logo memories" height='50px'/>
              <Typography component={Link} to='/' variant="h3" color='#0cc' style={{textDecoration:'none'}} sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }} >
                Memories
              </Typography>
              {user?(
                <div style={{ display:'flex', marginLeft:'auto'}}>
                    <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">S</Avatar>
                    <Typography component='h6' color='#0cc' sx={{ display: { xs: 'none', sm: 'block' } }} style={{alignSelf:'center', paddingLeft:'8px'}}>Shehroze Talat</Typography>
                    <Button onClick={()=>setUser((prev)=>!prev)}><Typography component={Link} to='/' color='#fff' style={{textDecoration:'none', paddingLeft:'10px'}}>Logout</Typography></Button>
                </div>
              ):(
                <Button onClick={()=>setUser((prev)=>!prev)}><Typography component={Link} to='/auth' color='#fff' style={{textDecoration:'none', marginLeft:'auto'}}>Login</Typography></Button>
              )}
              
            </Toolbar>
        </AppBar>
    )
}

export default NavBar;
