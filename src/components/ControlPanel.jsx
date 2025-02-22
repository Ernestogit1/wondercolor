import React from 'react';
import { Box, Button, Grid, Paper } from '@mui/material';

const ControlPanel = () => (
  <Grid 
    item xs={2}
    sx={{ 
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center'
    }}
  >
    <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
      <Box sx={{ height: 150, backgroundColor: '#f0f0f0', marginBottom: 2 }}>
        Image Placeholder
      </Box>
      <Button variant="contained" color="primary" sx={{ marginBottom: 1, width: '150px' }}>
        Select Image
      </Button>
      <Button variant="contained" color="success" sx={{ marginBottom: 1, width: '150px' }}>
        Save
      </Button>
      <Button variant="contained" color="error" sx={{ width: '150px' }}>
        Clear
      </Button>
    </Paper>
  </Grid>
);

export default ControlPanel;