import React, { useEffect, useRef, useState } from 'react'
import io from "socket.io-client";
import { Badge, IconButton, TextField } from '@mui/material';
import { Button } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff'
import styles from "../components/meeting/MeetingRoom.module.css";
import CallEndIcon from '@mui/icons-material/CallEnd'
import MicIcon from '@mui/icons-material/Mic'
import MicOffIcon from '@mui/icons-material/MicOff'
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import StopScreenShareIcon from '@mui/icons-material/StopScreenShare'
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import server from '../environment';

const server_url = server;

const peerConfigConnections = {
    "iceServers": [
        { "urls": process.env.REACT_APP_STUN_SERVER || "stun:stun.l.google.com:19302" },
        ...(process.env.REACT_APP_TURN_SERVER ? [{
            urls: process.env.REACT_APP_TURN_SERVER,
            username: process.env.REACT_APP_TURN_USERNAME || "",
            credential: process.env.REACT_APP_TURN_CREDENTIAL || ""
        }] : [])
    ]
};

export default function VideoMeetComponent() {

    var socketRef = useRef();
    let socketIdRef = useRef();
    let connectionsRef = useRef({});

    let localVideoref = useRef();

    let [videoAvailable, setVideoAvailable] = useState(true);

    let [audioAvailable, setAudioAvailable] = useState(true);

    let [video, setVideo] = useState([]);

    let [audio, setAudio] = useState();

    let [screen, setScreen] = useState();

    let [showModal, setModal] = useState(true);
    const showModalRef = useRef(showModal);

    useEffect(() => {
        showModalRef.current = showModal;
    }, [showModal]);

    let [screenAvailable, setScreenAvailable] = useState();

    let [messages, setMessages] = useState([])

    let [message, setMessage] = useState("");

    let [newMessages, setNewMessages] = useState(0);

    let [askForUsername, setAskForUsername] = useState(true);

    let [username, setUsername] = useState("");

    const videoRef = useRef([])

    let [videos, setVideos] = useState([])

    // TODO
    // if(isChrome() === false) {


    // }

    useEffect(() => {
        console.log("HELLO");
        getPermissions();

        const currentConnections = connectionsRef.current;

        return () => {
            try {
                if (window.localStream) {
                    window.localStream.getTracks().forEach(track => track.stop());
                }
                if (socketRef.current) {
                    socketRef.current.disconnect();
                }
                for (let id in currentConnections) {
                    if (currentConnections[id]) {
                        currentConnections[id].close();
                    }
                }
            } catch (e) {
                console.error('Error cleaning up WebRTC resources:', e);
            }
        };
    }, []);

    let getDisplayMedia = () => {
        if (screen) {
            if (navigator.mediaDevices.getDisplayMedia) {
                navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
                    .then(getDisplayMediaSuccess)
                    .then((stream) => { })
                    .catch((e) => console.log(e))
            }
        }
    }

    const getPermissions = async () => {
        try {
            const videoPermission = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoPermission) {
                setVideoAvailable(true);
                console.log('Video permission granted');
            } else {
                setVideoAvailable(false);
                console.log('Video permission denied');
            }

            const audioPermission = await navigator.mediaDevices.getUserMedia({ audio: true });
            if (audioPermission) {
                setAudioAvailable(true);
                console.log('Audio permission granted');
            } else {
                setAudioAvailable(false);
                console.log('Audio permission denied');
            }

            if (navigator.mediaDevices.getDisplayMedia) {
                setScreenAvailable(true);
            } else {
                setScreenAvailable(false);
            }

            if (videoAvailable || audioAvailable) {
                const userMediaStream = await navigator.mediaDevices.getUserMedia({ video: videoAvailable, audio: audioAvailable });
                if (userMediaStream) {
                    window.localStream = userMediaStream;
                    if (localVideoref.current) {
                        localVideoref.current.srcObject = userMediaStream;
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (video !== undefined && audio !== undefined) {
            getUserMedia();
            console.log("SET STATE HAS ", video, audio);
        }
    }, [video, audio]);
    let getMedia = () => {
        setVideo(videoAvailable);
        setAudio(audioAvailable);
        connectToSocketServer();

    }




    let getUserMediaSuccess = (stream) => {
        try {
            window.localStream.getTracks().forEach(track => track.stop())
        } catch (e) { console.log(e) }

        window.localStream = stream
        localVideoref.current.srcObject = stream

        for (let id in connectionsRef.current) {
            if (id === socketIdRef.current) continue

            connectionsRef.current[id].addStream(window.localStream)

            connectionsRef.current[id].createOffer().then((description) => {
                console.log(description)
                connectionsRef.current[id].setLocalDescription(description)
                    .then(() => {
                        socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connectionsRef.current[id].localDescription }))
                    })
                    .catch(e => console.log(e))
            })
        }

        stream.getTracks().forEach(track => track.onended = () => {
            setVideo(false);
            setAudio(false);

            try {
                let tracks = localVideoref.current.srcObject.getTracks()
                tracks.forEach(track => track.stop())
            } catch (e) { console.log(e) }

            let blackSilence = (...args) => new MediaStream([black(...args), silence()])
            window.localStream = blackSilence()
            localVideoref.current.srcObject = window.localStream

            for (let id in connectionsRef.current) {
                connectionsRef.current[id].addStream(window.localStream)

                connectionsRef.current[id].createOffer().then((description) => {
                    connectionsRef.current[id].setLocalDescription(description)
                        .then(() => {
                            socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connectionsRef.current[id].localDescription }))
                        })
                        .catch(e => console.log(e))
                })
            }
        })
    }

    let getUserMedia = () => {
        if ((video && videoAvailable) || (audio && audioAvailable)) {
            navigator.mediaDevices.getUserMedia({ video: video, audio: audio })
                .then(getUserMediaSuccess)
                .then((stream) => { })
                .catch((e) => console.log(e))
        } else {
            try {
                let tracks = localVideoref.current.srcObject.getTracks()
                tracks.forEach(track => track.stop())
            } catch (e) { }
        }
    }





    let getDisplayMediaSuccess = (stream) => {
        console.log("HERE")
        try {
            window.localStream.getTracks().forEach(track => track.stop())
        } catch (e) { console.log(e) }

        window.localStream = stream
        localVideoref.current.srcObject = stream

        for (let id in connectionsRef.current) {
            if (id === socketIdRef.current) continue

            connectionsRef.current[id].addStream(window.localStream)

            connectionsRef.current[id].createOffer().then((description) => {
                connectionsRef.current[id].setLocalDescription(description)
                    .then(() => {
                        socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connectionsRef.current[id].localDescription }))
                    })
                    .catch(e => console.log(e))
            })
        }

        stream.getTracks().forEach(track => track.onended = () => {
            setScreen(false)

            try {
                let tracks = localVideoref.current.srcObject.getTracks()
                tracks.forEach(track => track.stop())
            } catch (e) { console.log(e) }

            let blackSilence = (...args) => new MediaStream([black(...args), silence()])
            window.localStream = blackSilence()
            localVideoref.current.srcObject = window.localStream

            getUserMedia()

        })
    }

    let gotMessageFromServer = (fromId, message) => {
        var signal = JSON.parse(message)

        if (fromId !== socketIdRef.current) {
            if (!connectionsRef.current[fromId]) {
                connectionsRef.current[fromId] = new RTCPeerConnection(peerConfigConnections);
                connectionsRef.current[fromId].onicecandidate = function (event) {
                    if (event.candidate != null) {
                        socketRef.current.emit('signal', fromId, JSON.stringify({ 'ice': event.candidate }));
                    }
                };
                connectionsRef.current[fromId].onaddstream = (event) => {
                    let videoExists = videoRef.current.find(video => video.socketId === fromId);
                    if (videoExists) {
                        setVideos(videos => {
                            const updatedVideos = videos.map(video =>
                                video.socketId === fromId ? { ...video, stream: event.stream } : video
                            );
                            videoRef.current = updatedVideos;
                            return updatedVideos;
                        });
                    } else {
                        let newVideo = { socketId: fromId, stream: event.stream, autoplay: true, playsinline: true };
                        setVideos(videos => {
                            const updatedVideos = [...videos, newVideo];
                            videoRef.current = updatedVideos;
                            return updatedVideos;
                        });
                    }
                };
                if (window.localStream) {
                    try {
                        connectionsRef.current[fromId].addStream(window.localStream);
                    } catch (e) { }
                }
            }

            if (signal.sdp) {
                console.log(`[WEBRTC] ${fromId} ← ${signal.sdp.type.toUpperCase()}`);
                connectionsRef.current[fromId].setRemoteDescription(new RTCSessionDescription(signal.sdp)).then(() => {
                    if (signal.sdp.type === 'offer') {
                        connectionsRef.current[fromId].createAnswer().then((description) => {
                            connectionsRef.current[fromId].setLocalDescription(description).then(() => {
                                console.log(`[WEBRTC] ${socketIdRef.current} → ANSWER to ${fromId}`);
                                socketRef.current.emit('signal', fromId, JSON.stringify({ 'sdp': connectionsRef.current[fromId].localDescription }))
                            }).catch(e => console.log(e))
                        }).catch(e => console.log(e))
                    }
                }).catch(e => console.log(e))
            }

            if (signal.ice) {
                console.log(`[WEBRTC] ${fromId} ← ICE CANDIDATE`);
                connectionsRef.current[fromId].addIceCandidate(new RTCIceCandidate(signal.ice)).catch(e => console.log(e))
            }
        }
    }




    let connectToSocketServer = () => {
        const token = localStorage.getItem('token') || localStorage.getItem('authToken');
        console.log('[SOCKET] creating socket to:', server_url);
        socketRef.current = io(server_url, {
            auth: { token },
            transports: ['polling', 'websocket'],
            withCredentials: true,
        });

        console.log('[SOCKET] connecting');
        socketRef.current.off('signal');
        socketRef.current.on('signal', gotMessageFromServer);

        const getMeetingRoomPath = () => {
            const parts = window.location.pathname.split('/').filter(Boolean);
            const meetingCode = parts[parts.length - 1] || 'default-room';
            return `meeting-room-${meetingCode.toLowerCase()}`;
        };

        socketRef.current.off('connect');
        socketRef.current.on('connect', () => {
            const roomPath = getMeetingRoomPath();
            console.log(`[SOCKET] CONNECTED id=${socketRef.current.id}`);
            console.log(`[MEETING JOIN FRONTEND] meetingId=${roomPath} socketId=${socketRef.current.id}`);
            socketRef.current.emit('join-call', roomPath);
            socketIdRef.current = socketRef.current.id;
        });

        socketRef.current.off('chat-message');
        socketRef.current.on('chat-message', addMessage);

        socketRef.current.off('user-left');
        socketRef.current.on('user-left', (id) => {
            console.log(`[MEETING] PARTICIPANT_LEFT socketId=${id}`);
            setVideos((videos) => videos.filter((video) => video.socketId !== id));
            if (connectionsRef.current[id]) {
                connectionsRef.current[id].close();
                delete connectionsRef.current[id];
            }
        });

        socketRef.current.off('user-joined');
        socketRef.current.on('user-joined', (id, clients) => {
            if (!Array.isArray(clients)) return;
            console.log(`[MEETING] PARTICIPANT_JOINED id=${id} clients=`, clients);
            clients.forEach((socketListId) => {
                // Do NOT create a peer connection to self
                if (socketListId === socketIdRef.current) return;

                if (!connectionsRef.current[socketListId]) {
                    console.log(`[WEBRTC] creating peer connection for remote user socketId=${socketListId}`);
                    connectionsRef.current[socketListId] = new RTCPeerConnection(peerConfigConnections);

                    connectionsRef.current[socketListId].onicecandidate = function (event) {
                        if (event.candidate != null) {
                            console.log(`[WEBRTC] ICE sent to socketId=${socketListId}`);
                            socketRef.current.emit('signal', socketListId, JSON.stringify({ 'ice': event.candidate }));
                        }
                    };

                    connectionsRef.current[socketListId].onaddstream = (event) => {
                        console.log(`[WEBRTC] REMOTE TRACK RECEIVED from socketId=${socketListId}`);

                        let videoExists = videoRef.current.find(video => video.socketId === socketListId);

                        if (videoExists) {
                            setVideos(videos => {
                                const updatedVideos = videos.map(video =>
                                    video.socketId === socketListId ? { ...video, stream: event.stream } : video
                                );
                                videoRef.current = updatedVideos;
                                return updatedVideos;
                            });
                        } else {
                            let newVideo = {
                                socketId: socketListId,
                                stream: event.stream,
                                autoplay: true,
                                playsinline: true
                            };

                            setVideos(videos => {
                                const updatedVideos = [...videos, newVideo];
                                videoRef.current = updatedVideos;
                                return updatedVideos;
                            });
                        }
                    };

                    if (window.localStream !== undefined && window.localStream !== null) {
                        connectionsRef.current[socketListId].addStream(window.localStream);
                    } else {
                        let blackSilence = (...args) => new MediaStream([black(...args), silence()]);
                        window.localStream = blackSilence();
                        connectionsRef.current[socketListId].addStream(window.localStream);
                    }
                }
            });

            if (id === socketIdRef.current) {
                for (let id2 in connectionsRef.current) {
                    if (id2 === socketIdRef.current) continue;

                    try {
                        if (window.localStream) {
                            connectionsRef.current[id2].addStream(window.localStream);
                        }
                    } catch (e) { }

                    console.log(`[WEBRTC] createOffer for targetSocketId=${id2}`);
                    connectionsRef.current[id2].createOffer().then((description) => {
                        connectionsRef.current[id2].setLocalDescription(description)
                            .then(() => {
                                console.log(`[WEBRTC] offer sent to socketId=${id2}`);
                                socketRef.current.emit('signal', id2, JSON.stringify({ 'sdp': connectionsRef.current[id2].localDescription }));
                            })
                            .catch(e => console.log(e));
                    });
                }
            }
        });

        socketRef.current.off('connect_error');
        socketRef.current.on('connect_error', (err) => {
            console.log(`[SOCKET] CONNECT_ERROR message=${err.message}`);
        });

        socketRef.current.off('disconnect');
        socketRef.current.on('disconnect', (reason) => {
            console.log(`[SOCKET] DISCONNECTED reason=${reason}`);
        });
    };

let silence = () => {
    let ctx = new AudioContext()
    let oscillator = ctx.createOscillator()
    let dst = oscillator.connect(ctx.createMediaStreamDestination())
    oscillator.start()
    ctx.resume()
    return Object.assign(dst.stream.getAudioTracks()[0], { enabled: false })
}
let black = ({ width = 640, height = 480 } = {}) => {
    let canvas = Object.assign(document.createElement("canvas"), { width, height })
    canvas.getContext('2d').fillRect(0, 0, width, height)
    let stream = canvas.captureStream()
    return Object.assign(stream.getVideoTracks()[0], { enabled: false })
}

let handleVideo = () => {
    const nextState = !video;
    setVideo(nextState);
    if (window.localStream) {
        window.localStream.getVideoTracks().forEach(track => track.enabled = nextState);
    }
};
let handleAudio = () => {
    const nextState = !audio;
    setAudio(nextState);
    if (window.localStream) {
        window.localStream.getAudioTracks().forEach(track => track.enabled = nextState);
    }
};

useEffect(() => {
    if (screen !== undefined) {
        getDisplayMedia();
    }
}, [screen]);
let handleScreen = () => {
    setScreen(!screen);
}

let handleEndCall = () => {
    try {
        let tracks = localVideoref.current.srcObject.getTracks()
        tracks.forEach(track => track.stop())
    } catch (e) { }
    window.location.href = "/"
}

let openChat = () => {
    setModal(true);
    setNewMessages(0);
}
let closeChat = () => {
    setModal(false);
}
let handleMessage = (e) => {
    setMessage(e.target.value);
}

const addMessage = (data, sender, socketIdSender) => {
    setMessages((prevMessages) => [
        ...prevMessages,
        { sender: sender, data: data }
    ]);
    if (socketIdSender !== socketIdRef.current && !showModalRef.current) {
        setNewMessages((prevNewMessages) => prevNewMessages + 1);
    }
};



let sendMessage = () => {
    if (socketRef.current) {
        socketRef.current.emit('chat-message', message, username);
    }
    setMessage("");
}


let connect = () => {
    setAskForUsername(false);
    getMedia();
}


return (
    <div>

        {askForUsername === true ?

            <div>


                <h2>Enter into Lobby </h2>
                <TextField id="outlined-basic" label="Username" value={username} onChange={e => setUsername(e.target.value)} variant="outlined" />
                <Button variant="contained" onClick={connect}>Connect</Button>


                <div>
                    <video ref={localVideoref} autoPlay muted></video>
                </div>

            </div> :


            <div className={styles.meetVideoContainer}>

                {showModal ? <div className={styles.chatRoom}>

                    <div className={styles.chatContainer}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h1>Chat</h1>
                            <IconButton onClick={closeChat}>
                                <CloseIcon />
                            </IconButton>
                        </div>

                        <div className={styles.chattingDisplay}>

                            {messages.length !== 0 ? messages.map((item, index) => {

                                console.log(messages)
                                return (
                                    <div style={{ marginBottom: "20px" }} key={index}>
                                        <p style={{ fontWeight: "bold" }}>{item.sender}</p>
                                        <p>{item.data}</p>
                                    </div>
                                )
                            }) : <p>No Messages Yet</p>}


                        </div>

                        <div className={styles.chattingArea}>
                            <TextField value={message} onChange={handleMessage} id="outlined-basic" label="Enter Your chat" variant="outlined" />
                            <Button variant='contained' onClick={sendMessage}>Send</Button>
                        </div>


                    </div>
                </div> : <></>}


                <div className={styles.buttonContainers}>
                    <IconButton onClick={handleVideo} style={{ color: "white" }}>
                        {(video === true) ? <VideocamIcon /> : <VideocamOffIcon />}
                    </IconButton>
                    <IconButton onClick={handleEndCall} style={{ color: "red" }}>
                        <CallEndIcon />
                    </IconButton>
                    <IconButton onClick={handleAudio} style={{ color: "white" }}>
                        {audio === true ? <MicIcon /> : <MicOffIcon />}
                    </IconButton>

                    {screenAvailable === true ?
                        <IconButton onClick={handleScreen} style={{ color: "white" }}>
                            {screen === true ? <ScreenShareIcon /> : <StopScreenShareIcon />}
                        </IconButton> : <></>}

                    <Badge badgeContent={newMessages} max={999} color='secondary'>
                        <IconButton onClick={openChat} style={{ color: "white" }}>
                            <ChatIcon />                        </IconButton>
                    </Badge>

                </div>


                <video className={styles.meetUserVideo} ref={localVideoref} autoPlay muted></video>

                <div className={styles.conferenceView}>
                    {videos.map((video) => (
                        <div key={video.socketId}>
                            <video

                                data-socket={video.socketId}
                                ref={ref => {
                                    if (ref && video.stream) {
                                        ref.srcObject = video.stream;
                                    }
                                }}
                                autoPlay
                            >
                            </video>
                        </div>

                    ))}

                </div>

            </div>

        }

    </div>
)
}

