var express=require('express');
var socket=require('socket.io');
var app=express();
//server listen
var server =app.listen(65080,function(){
    console.log('Listening to 65080');
});

//static files
app.use(express.static('public'));

//socket setup
var io=socket(server    
    ,{pingInterval: 10000,pingTimeout: 500000,}
);
var roomno=1,users=0,availableRooms=[];

//when connection is made fire the callback function
io.on('connection',function(receivedSocket){
    console.log('made socket connection with id'+receivedSocket.id);
    users++;
    //when 3 people are filled increase roomno
    if(users%4==0){roomno++};
    receivedSocket.join('room-'+roomno);//join room
    io.sockets.in('room-'+roomno).emit('inRoom',"you are in room "+roomno);//Send message in particular room
    //console.log("User :"+ users);
    // console.log("room :"+ roomno);
    receivedSocket.roomId="room-"+roomno;
    receivedSocket.on('chat',function(data){
        io.sockets.emit('chat',data);
    });
    receivedSocket.on('typing',function(data){
        receivedSocket.broadcast.emit('typing',data);
    });
    receivedSocket.on('disconnect',function(data){
        console.log('Disconnected The socket with Id '+receivedSocket.id+" from room : "+receivedSocket.roomId);
    });
    //get all clients namespace '/'
    io.of('/').clients((error, clients) => {
        if (error) throw error;
        // console.log("Clients All : "+clients);
        // console.log("Total clients: "+clients.length);
    });
    //get all clients in 1room-1' of namespace '/' 
    io.of('/').in('room-1').clients((error, clients) => {
        if (error) throw error;
        // console.log("Clients in room-1: "+ clients);
    });    
});

