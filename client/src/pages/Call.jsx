import React from 'react';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';

import VideoPlayer from '../components/ui/VideoPlayer';
import Sidebar from '../components/ui/Sidebar';
import Notifications from '../components/ui/Notifications';

export default function Call() {
    document.title = "Video Call";;

    return (
        <>
            <div className='flex flex-col items-center w-100'>
                <AppBar
                    sx={{
                        borderRadius: 15,
                        margin: '30px 100px',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '600px',
                        border: '2px solid black',
                    }}
                    position="static" color="inherit">
                    <Typography variant="h2" align="center">Video Chat</Typography>
                </AppBar>
                <VideoPlayer />
                <Sidebar>
                    <Notifications />
                </Sidebar>
            </div>
        </>
    );
}
