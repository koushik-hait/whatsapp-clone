import React, { useContext } from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { SocketContext } from '../../context/SocketContext';


const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);


  return (
    <Grid container className="MuiGrid-direction-xs-column">
      {stream && (
        <Paper
          sx={{
            padding: '10px',
            border: '2px solid black',
            margin: '10px',
          }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>{name || 'Name'}</Typography>
            <video playsInline muted ref={myVideo} autoPlay className="w-[550px]" />
          </Grid>
        </Paper>
      )}
      {callAccepted && !callEnded && (
        <Paper sx={{
          padding: '10px',
          border: '2px solid black',
          margin: '10px',
        }} >
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>{call.name || 'Name'}</Typography>
            <video playsInline ref={userVideo} autoPlay className="w-[550px]" />
          </Grid>
        </Paper>
      )}
    </Grid>
  );
};

export default VideoPlayer;