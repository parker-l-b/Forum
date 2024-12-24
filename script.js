const socket = io();

const form = document.getElementById('chat-form');
const input = document.getElementById('message-input');
const messages = document.getElementById('messages');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', input.value);
    input.value = '';
  }
});

// Display chat history when received
socket.on('chat history', (history) => {
  history.forEach((msg) => {
    const item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
  });
  messages.scrollTop = messages.scrollHeight;
});

// Display new messages
socket.on('chat message', (msg) => {
  const item = document.createElement('li');
  item.textContent = msg;
  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight;
});
//
