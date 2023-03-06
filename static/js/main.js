const messageForm = document.querySelector('form');
const messageContainer = document.getElementById('message-container');
const messageInput = document.getElementById('message-input');
const messageSubmit = document.getElementById('message-submit');

messageForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const message = messageInput.value;
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', 'user');
    messageElement.innerHTML = `
        <img src="https://cdn-icons-png.flaticon.com/512/6073/6073874.png" alt="User Avatar">
        <div class="text">${message}</div>
      `;
    messageContainer.appendChild(messageElement);
    messageSubmit.remove();
    messageInput.value = '';

    const botMessageElementLoading = document.createElement('div');
    botMessageElementLoading.classList.add('message', 'bot');
    botMessageElementLoading.innerHTML = `
        <img src="https://img.freepik.com/vetores-premium/robo-bonito-icon-ilustracao-conceito-de-icone-de-robo-de-tecnologia-isolado-estilo-cartoon-plana_138676-1220.jpg" alt="Bot Avatar">
        <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
      `;
    messageContainer.appendChild(botMessageElementLoading);
    messageInput.remove();

    const response = await fetch('https://api-chat-bot.diogoribeiro15.repl.co/chat-bot', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({message}),
        mode: 'cors'
    });
    const data = await response.json();

    botMessageElementLoading.remove();

    const botMessageElement = document.createElement('div');
    botMessageElement.classList.add('message', 'bot');

    if (!data.response) {
        botMessageElement.innerHTML = `
            <img src="https://img.freepik.com/vetores-premium/robo-bonito-icon-ilustracao-conceito-de-icone-de-robo-de-tecnologia-isolado-estilo-cartoon-plana_138676-1220.jpg" alt="Bot Avatar">
            <div class="text">Desculpe, não foi possivel responder sua pergunta no momento!</div>
          `;
        messageContainer.appendChild(botMessageElement);
        messageContainer.appendChild(messageInput);
        messageContainer.appendChild(messageSubmit);
        return;
    }

    botMessageElement.innerHTML = `
        <img src="https://img.freepik.com/vetores-premium/robo-bonito-icon-ilustracao-conceito-de-icone-de-robo-de-tecnologia-isolado-estilo-cartoon-plana_138676-1220.jpg" alt="Bot Avatar">
        <div class="text">${data.response}</div>
      `;

    messageContainer.appendChild(botMessageElement);

    messageForm.appendChild(messageInput);
    messageForm.appendChild(messageSubmit);
    messageContainer.appendChild(messageForm);

});


