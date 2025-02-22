import React from 'react';
import { Grid } from '@mui/material';

const DrawingBoard = ({ board }) => (
  <Grid 
    item xs={8} 
    sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      marginTop: '20px'
    }}
  >
    <img src={board} alt="Board" style={{ width: '100%', maxWidth: '700px' }} />
  </Grid>
);

export default DrawingBoard;