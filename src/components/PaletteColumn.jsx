import React from 'react';
import { Grid } from '@mui/material';

const PaletteColumn = ({ palettes }) => (
  <Grid 
    item xs={0.6}
    sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center', 
    }}
  >
    <Grid container spacing={0.5}>
      {palettes.map((palette, index) => (
        <Grid item xs={12} key={index}>
          <img src={palette} alt={`Palette ${index + 1}`} style={{ width: '50px' }} />
        </Grid>
      ))}
    </Grid>
  </Grid>
);

export default PaletteColumn;