import React, { useRef, useEffect, useState } from 'react';
import { Grid } from '@mui/material';

const DrawingBoard = ({ selectedColor, board }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = 700;
    canvas.height = 650;
    
    // Load and draw the background image
    const backgroundImage = new Image();
    backgroundImage.src = board;
    backgroundImage.onload = () => {
      ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    };
    
    // Set default styles
    ctx.strokeStyle = selectedColor || '#000000';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    
    setContext(ctx);
  }, [board]);

  useEffect(() => {
    if (context) {
      context.strokeStyle = selectedColor || '#000000';
    }
  }, [selectedColor]);

  const startDrawing = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = canvasRef.current.width / rect.width;
    const scaleY = canvasRef.current.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    
    context.beginPath();
    context.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = canvasRef.current.width / rect.width;
    const scaleY = canvasRef.current.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    
    context.lineTo(x, y);
    context.stroke();
  };

  const stopDrawing = () => {
    context.closePath();
    setIsDrawing(false);
  };

  return (
    <Grid 
      item xs={8} 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        marginTop: '20px'
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          border: '1px solid #ccc',
          borderRadius: '4px',
          maxWidth: '100%',
          height: 'auto'
        }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
      />
    </Grid>
  );
};

export default DrawingBoard;