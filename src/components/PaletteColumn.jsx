import React from 'react';
import { Grid } from '@mui/material';

const PaletteColumn = ({ palettes, onSelectColor }) => (
  <Grid 
    item xs={0.6}
    sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center',
      position: 'relative'
    }}
  >
    <Grid container spacing={0.5} sx={{ position: 'relative', zIndex: 1 }}>
      {palettes.map((palette, index) => (
        <Grid item xs={12} key={index}>
          <img 
            src={palette} 
            alt={`Palette ${index + 1}`} 
            style={{ 
              width: '50px',
              cursor: 'pointer',
              transition: 'transform 0.2s'
            }}
            onClick={() => onSelectColor(palette)}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          />
        </Grid>
      ))}
    </Grid>
  </Grid>
);

export default PaletteColumn;