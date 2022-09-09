const socket = io('https://note-chat-app-server.herokuapp.com/');

const sendMsg = document.getElementById('send-form');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
var audio = new Audio('ting.mp3')

const append = (message, position) =>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left'){
        audio.play(); 
    }
}

const userName = prompt("Enter Your Name: ");
socket.emit('new-user-joined', userName);


socket.on('user-joined', name =>{
    append(`${name} has Joined the chat...`, 'left')
})

socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`, 'left')
})

socket.on('left', name =>{
    append(`${name} has Left the chat`, 'left' )
})

sendMsg.addEventListener('submit', (e) =>{
    e.preventDefault();
    const message = messageInput.value;
    append(`you : ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = ''
})
