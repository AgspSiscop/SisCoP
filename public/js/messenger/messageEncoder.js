const messagecontent = document.getElementById('messagecontent');
const message = document.getElementById('message');
const messageconversor = document.createElement('div');
messageconversor.setAttribute('class', 'message');
message.appendChild(messageconversor)
messageconversor.innerHTML = messagecontent.value