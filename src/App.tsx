import React from "react";
import logo from './Images/memories.png';
import Posts from "./Posts/Posts";
import Form from "./Form/Form";
import { Typography, Container, AppBar, Grid, Grow } from '@mui/material';


const App: React.FC = () => {
 
  return (
    <div className='app'>
      <Container maxWidth='lg'>
          <AppBar position="static" color='transparent' style={{padding:'10px'}}>
              <Typography variant="h3" component="div" sx={{ flexGrow: 1 }} align='center' color='#0cc' style={{display:'flex', justifyContent:'center'}}>
                <img src={logo} alt="Logo memories" height='50px'/>
                <span style={{paddingLeft:'5px'}}>Memories</span>
              </Typography>
          </AppBar>
          <Container>
            <Grow in>
              <Grid container justifyContent='space-between' spacing={3} alignItems='stretch' >
                <Grid item xs={12} sm={8}>
                  <Posts/>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Form/>
                </Grid>
              </Grid>
            </Grow>
          </Container>
      </Container>
    </div>
  );
}

export default App;
