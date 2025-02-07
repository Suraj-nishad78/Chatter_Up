

let socket = io();

const nameContainer = document.getElementById('name-container')
const container =  document.getElementById('container')
const inputName = document.getElementById('input-name')
const submitName = document.getElementById('submit-name')
const notificationTitle = document.getElementById('notification-title')
const usersElement = document.getElementById('users')
const inputText = document.getElementById('input-text')
const sentMsg = document.getElementById('msg-sent')
const messageBox = document.getElementById('message-box')
const myAudio = document.getElementById('my-audio')

let username;

// Hide chat box
function hideMainContainer(){
    container.style.display = 'none'
   }
   
hideMainContainer()

// Message sent code
sentMsg.addEventListener('click', (e)=>{
 e.preventDefault();
 const message = inputText.value;
 if(message.trim() === '') return
 socket.emit('message', message)
 inputText.value = '';
})

// Current messages code
socket.on('messageToAll', (message)=>{
 // messageBox.innerHTML = '';
 messageSentToAll(message)
})

 function messageSentToAll (message){

         const msgContainer = document.createElement('div')
         msgContainer.classList.add('msg-container')

         const userImage = document.createElement('user-image')
         userImage.classList.add('user-image')

         const img = document.createElement('img')
         img.src = message.avatar;

         userImage.append(img)

         const userMessage = document.createElement('div')
         userMessage.classList.add('user-message')

         const userNameTime = document.createElement('user-name-time')
         userNameTime.classList.add('user-name-time')

         const pTag = document.createElement('p')
         pTag.textContent = message.username;

         const span = document.createElement('span')
         span.textContent = getISDtime(message.timestamp);

         userNameTime.append(pTag, span)

         const messageText = document.createElement('div')
         messageText.classList.add('message')
         messageText.textContent =  message.text;

         userMessage.append(userNameTime, messageText)

         if(username === message.username){
             msgContainer.classList.add('sender')
             msgContainer.append(userMessage, userImage)
             messageBox.append(msgContainer)
             return 
         }

         playMusic()
         msgContainer.append(userImage, userMessage)
         messageBox.append(msgContainer)
 }

 // Previous Messages codes
 socket.on('previousMessages', (message)=>{
 previousMsgToAll(message)
})

 function previousMsgToAll (messageDetails){
     messageBox.innerHTML = ''
     messageDetails.forEach(message =>{

        messageSentToAll(message)
     })
 }

 // GMT change to ISD time
 function getISDtime(time){
     const timestamp = time;
     const date = new Date(timestamp);

     const istTime = date.toLocaleString("en-IN", { timeZone: "Asia/Kolkata", hour: '2-digit', minute: '2-digit', hour12: false });
     return istTime;
 }


const imagesArray = [
    "https://img.freepik.com/premium-vector/cute-chibi-superhero-design_1046319-149433.jpg",
    "https://www.shutterstock.com/image-vector/kharkov-ukraine-august-16-2017-600nw-697034857.jpg",
    "https://www.shutterstock.com/image-vector/july-3-2023-vector-illustration-260nw-2326749515.jpg",
    "https://static.vecteezy.com/system/resources/previews/022/026/298/non_2x/cute-captain-america-marvel-free-vector.jpg"
]

let ramdomNum = Math.round(Math.random()*3)

// Name container code 
submitName.addEventListener('click', (e)=>{
 e.preventDefault();

 const name = inputName.value;
 if(name.trim() === ''){
     return alert("Please enter your name...")
 }

 container.style.display = 'block'
 nameContainer.style.display = 'none'
 container.style.display = 'flex'

 username = name;
 socket.emit('username', {name, avatar: imagesArray[ramdomNum]})

})

function playMusic(){
 console.log("Music play");
 myAudio.play();
}

// Notify users who join the chat
socket.on('notify', (message)=>{
 notificationTitle.innerHTML = ''
 const div = document.createElement('div')
 div.classList.add('notification')
 div.innerHTML = '<i class="fa-solid fa-circle"></i>'

 const span = document.createElement('span')
 span.textContent = message.text;
 div.append(span)
 notificationTitle.append(div)

 setTimeout(()=>{
    notifyTitle()
 }, 5000)

})

function notifyTitle(){
    notificationTitle.innerHTML = ''
    const div = document.createElement('div')
    div.classList.add('notification')

    const span = document.createElement('span')
    span.textContent = "Chatter Up 🫂";
    div.append(span)
    notificationTitle.append(div)
}

// All Connected users code 
socket.on('allUsers', (users)=>{
 const names = Object.values(users).map(user => user.name);
 connectedUsers(names)
})

function connectedUsers(users){
 usersElement.innerHTML = ''

 const totalUsers = document.createElement('div')
 totalUsers.classList.add('total-users')
 totalUsers.textContent = `Connected users ${users.length}`
 
 
 usersElement.append(totalUsers)
 users.forEach(name => {
     const userNames = document.createElement('div')
     userNames.classList.add('user-name')
     userNames.innerHTML = '<i class="fa-solid fa-circle"></i>'
     const span = document.createElement('span')
     span.textContent = name;
     userNames.append(span) 
     usersElement.append(userNames)
 });
}

// Code for when user start typing to show others user is typing
inputText.addEventListener('keyup', ()=>{
    socket.emit('startTyping')
   })
   
   inputText.addEventListener('blur', ()=>{
    socket.emit('stopTyping')
   })
   
   socket.on('startedTyping', (name)=>{
    notificationTitle.innerHTML = ''
    const div = document.createElement('div')
    div.classList.add('notification')
   
    const span = document.createElement('span')
    span.textContent = `${name} is typing...`;
    div.append(span)
    notificationTitle.append(div)
   })
   
   socket.on('stoppedTyping', ()=>{
       notifyTitle()
   })

// Left users code
socket.on("leftuser", (message)=>{
 notificationTitle.innerHTML = ''
 const div = document.createElement('div')
 div.classList.add('notification')

 const span = document.createElement('span')
 span.textContent = `${message.name} has left the chat.`;
 div.append(span)
 notificationTitle.append(div)

 setTimeout(()=>{
    notifyTitle()
 }, 5000)

})