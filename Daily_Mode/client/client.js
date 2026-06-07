const socket = io()
const DalyFeed = document.getElementById('feed');
const userInput = document.getElementById('msg-input');

socket.on('client-total', (size)=>{
    console.log(size);
})

function postMessage(){
    if (userInput.value === '') return

    // console.log(userInput.value)
    const data = {
        // name: token.Name
        message :userInput.value,
        dateTime : new Date()
    }
    // console.log(data)
    
    // client sends message
    socket.emit('client-msg',data)
    userInput.value = ''
}

// message sent by server
socket.on('server-msg', (data) => {
    DalyFeed.innerHTML += `
        <div class="msg-card">
        <div class="msg-text">${data.message}</div>
        <div class="msg-user">Placeholder</div>
        <div class ="date">${new Date(data.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
        </div>
    `
    scrollToBottom()
})

function scrollToBottom() {
  DalyFeed.scrollTop = DalyFeed.scrollHeight
}

function handleEnter(e){
    if(e.key == 'Enter') postMessage()
}