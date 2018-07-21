//make connection
var socket=io.connect('https://joytugcptest.appspot.com');
//query dom

var message=document.getElementById('message');
var handler=document.getElementById('handler');
var output=document.getElementById('chat-display');
var btn=document.getElementById('send');
var typing=document.getElementById('typing');
console.log(output.innerHTML);
//emit events
btn.addEventListener('click',function(){
    socket.emit('chat',{
        message:message.value,
        handler:handler.value
    });
    message.innerHTML="<input id='message' placeholder='Message' value=''></div>"
});

message.addEventListener('keypress',function(){
    socket.emit('typing',{
        handler:handler.value
    });
    console.log('Key are pressed');
});

//Listen to events
socket.on('chat',function(data){
    typing.innerHTML = '';
     output.innerHTML += '<p>'+ data.handler+' : '+data.message+'</p>';

});
socket.on('typing',function(data){
    typing.innerHTML = '<p>'+ data.handler+' is typing</p>';
    console.log(data);
});
socket.on('inRoom',function(data){
    typing.innerHTML = '';
     output.innerHTML += '<p>'+ data+'</p>';

});
socket.on('connection',function(data){
    console.log("Connece");

});

