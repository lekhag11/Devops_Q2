import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import {
    Link,
    BrowserRouter as Router,
    Route,
    Routes,
    Outlet,
} from 'react-router-dom';


function VideoPlayer() {
    const [playing, setPlaying] = useState(false);
    const [url, setUrl] = useState('');

    const handleButtonClick1 = () => {
        setPlaying(true);
        setUrl('https://www.youtube.com/watch?v=7K24pFmq22w');
    };

    const handleButtonClick2 = () => {
        setPlaying(true);
        setUrl(
            'https://www.youtube.com/watch?v=KlG0xk93J-E&pp=ygUTZW5lcmd5IGNvbnNlcnZhdGlvbg%3D%3D'
        );
    };

    const handleButtonClick3 = () => {
        setPlaying(true);
        setUrl(
            'https://www.youtube.com/watch?v=B-dCmbViDEQ&pp=ygUOc3VzdGFpbmFiaWxpdHk%3D'
        );
    };

    return (
        <div>
            <div className='container' >
                <ButtonGroup
                    variant='contained'
                    aria-label='Video navigation'
                    className='button-group'
                >
                    <Button
                        component={Link}
                        to='video1'
                        onClick={handleButtonClick1}
                    >
                        Video 1
                    </Button>
                    <Button
                        component={Link}
                        to='video2'
                        onClick={handleButtonClick2}
                    >
                        Video 2
                    </Button>
                    <Button
                        component={Link}
                        to='video3'
                        onClick={handleButtonClick3}
                    >
                        Video 3
                    </Button>
                </ButtonGroup>
            </div>
            <Routes>
                <Route
                    path='/videos'
                    element={<Videos />}
                >
                    <Route
                        index
                        element={
                            <Player
                                url={url}
                                playing={playing}
                                onClose={() => setPlaying(false)}
                            />
                        }
                    />
                    <Route
                        path='video1'
                        element={
                            <Player
                                url='https://www.youtube.com/watch?v=7K24pFmq22w'
                                playing={playing}
                                onClose={() => setPlaying(false)}
                            />
                        }
                    />
                    <Route
                        path='video2'
                        element={
                            <Player
                                url='https://www.youtube.com/watch?v=KlG0xk93J-E&pp=ygUTZW5lcmd5IGNvbnNlcnZhdGlvbg%3D%3D'
                                playing={playing}
                                onClose={() => setPlaying(false)}
                            />
                        }
                    />
                    <Route
                        path='video3'
                        element={
                            <Player
                                url='https://www.youtube.com/watch?v=B-dCmbViDEQ&pp=ygUOc3VzdGFpbmFiaWxpdHk%3D'
                                playing={playing}
                                onClose={() => setPlaying(false)}
                            />
                        }
                    />
                </Route>
            </Routes>
        </div>
    );
}

export function Player({ url, playing, onClose }) {
    return (
        <ReactPlayer
            url={url}
            controls={false}
            height='500px'
            width='750px'
            light={false}
            playing={playing}
            config={{
                youtube: {
                    playerVars: {
                        autoplay: 1,
                        controls: 0,
                        disablekb: 1,
                        fs: 0,
                        modestbranding: 1,
                    },
                },
            }}
        />
    );
}

export default VideoPlayer;

function Videos() {
    return (
        <div>
            <Outlet />
        </div>
    );
}
