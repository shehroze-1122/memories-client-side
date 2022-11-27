import React from 'react'
import { Container } from '@mui/material'
import NavBar from './Nav/NavBar'
import Home from './Home/Home'
import { ThemeProviderComponent } from './Auth/authStyle'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Auth from './Auth/Auth'

const App: React.FC = () => {
  return (
    <ThemeProviderComponent>
      <BrowserRouter>
        <div className="app">
          <Container maxWidth="lg">
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
            </Routes>
          </Container>
        </div>
      </BrowserRouter>
    </ThemeProviderComponent>
  )
}

export default App
