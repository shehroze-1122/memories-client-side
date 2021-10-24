import React, { useEffect, useState } from "react";
import logo from './Images/memories.png';
import Posts from "./Posts/Posts";
import Form from "./Form/Form";
import { useDispatch } from 'react-redux';
import { fetchPostsAction } from "./actions/posts";
import { Typography, Container, AppBar, Grid, Grow } from '@mui/material';


const App: React.FC = () => {
 
  const [ currentId, setCurrentId ] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchPostsAction());

    if (window.innerWidth > 769) {
      setIsMobile(false);
    } else {
      setIsMobile(true);
    }

  }, [dispatch])

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
              <Grid container direction={isMobile?'column-reverse': 'row'} justifyContent='space-between' spacing={3} alignItems='stretch' >
                <Grid item xs={12} md={8}>
                  <Posts setCurrentId={setCurrentId}/>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Form currentId={currentId} setCurrentId={setCurrentId}/>
                </Grid>
              </Grid>
            </Grow>
          </Container>
      </Container>
    </div>
  );
}

export default App;
