import React, { ChangeEvent } from 'react'
import { Grid, TextField, InputAdornment, IconButton } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

type props = {
  half?: boolean
  name: string
  label: string
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
  autoFocus?: boolean
  type: string
  handleShowPassword?: () => void
}
const Input: React.FC<props> = ({ half, name, label, handleChange, autoFocus, type, handleShowPassword }) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        label={label}
        onChange={handleChange}
        variant="outlined"
        required
        fullWidth
        autoFocus={autoFocus}
        type={type}
        InputProps={
          name === 'password'
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword}>
                      {type === 'password' ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }
            : undefined
        }
      />
    </Grid>
  )
}

export default Input
