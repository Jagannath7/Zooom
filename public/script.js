const socket=io('/');
const videoGrid=document.getElementById('video-grid');
let myVideoStream;
const myVideo=document.createElement('video');
myVideo.muted=true;

var peer = new Peer(undefined,{
    path:'/peerjs',
    host:'/',
    port:'3030',
});

navigator.mediaDevices.getUserMedia({
    video:true,
    audio:true
}).then(stream=>{
    myVideoStream=stream;
    addVideoStream(myVideo,stream);
})
peer.on('open',id=>{
    console.log(id);
})
socket.emit('join-room',Room_Id);

socket.on('user-connected',()=>{
    connectToNewUser();
})

const connectToNewUser=()=>{
    console.log("new user");
}

const addVideoStream=(video,stream)=>{
    video.srcObject=stream;
    video.addEventListener('loadedmetadata',()=>{
        video.play();
    })
    videoGrid.append(video);
}