import React, { useRef, useEffect, useState } from 'react';
import { Grid } from '@mui/material';

const DrawingBoard = ({ selectedColor, board, brushSize, isEraser, onRef }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState(null);
  const [drawLayer, setDrawLayer] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    canvas.width = 1000;
    canvas.height = 800;
    
    // Create a separate canvas for drawing
    const drawingCanvas = document.createElement('canvas');
    drawingCanvas.width = canvas.width;
    drawingCanvas.height = canvas.height;
    const drawCtx = drawingCanvas.getContext('2d');
    setDrawLayer(drawCtx);
    
    // Load and store the background image
    const bgImage = new Image();
    bgImage.src = board;
    bgImage.onload = () => {
      setBackgroundImage(bgImage);
      ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
    };
    
    setContext(ctx);
  }, [board]);

  useEffect(() => {
    if (drawLayer) {
      drawLayer.strokeStyle = isEraser ? '#FFFFFF' : selectedColor;
      drawLayer.lineWidth = brushSize;
      drawLayer.lineCap = 'round';
      
      if (isEraser) {
        drawLayer.globalCompositeOperation = 'destination-out';
      } else {
        drawLayer.globalCompositeOperation = 'source-over';
      }
    }
  }, [selectedColor, brushSize, isEraser]);

  const startDrawing = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = canvasRef.current.width / rect.width;
    const scaleY = canvasRef.current.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    
    drawLayer.beginPath();
    drawLayer.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = canvasRef.current.width / rect.width;
    const scaleY = canvasRef.current.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    
    drawLayer.lineTo(x, y);
    drawLayer.stroke();
    
    // Composite the drawing layer onto the main canvas
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // Draw the stored background image
    if (backgroundImage) {
      ctx.drawImage(backgroundImage, 0, 0, ctx.canvas.width, ctx.canvas.height);
    }
    ctx.drawImage(drawLayer.canvas, 0, 0); // Draw user's drawing
  };

  const stopDrawing = () => {
    drawLayer.closePath();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    if (drawLayer && backgroundImage) {
      // Clear drawing layer
      drawLayer.clearRect(0, 0, drawLayer.canvas.width, drawLayer.canvas.height);
      
      // Reset main canvas with background
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.drawImage(backgroundImage, 0, 0, ctx.canvas.width, ctx.canvas.height);
    }
  };

  useEffect(() => {
    if (onRef && drawLayer && backgroundImage) {
      onRef({ clearCanvas });
    }
  }, [onRef, drawLayer, backgroundImage]);

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
          height: 'auto',
          width: '1000px'
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