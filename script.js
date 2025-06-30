// Simular respuesta del chatbot
function sendMessage() {
  const input = document.getElementById("userInput");
  const userText = input.value.trim();
  if (!userText) return;

  const chatBody = document.getElementById("chatBody");

  // Mensaje del usuario
  const userMsg = document.createElement("div");
  userMsg.className = "message user";
  userMsg.textContent = userText;
  chatBody.appendChild(userMsg);

  // Respuesta del bot
  setTimeout(() => {
    const botMsg = document.createElement("div");
    botMsg.className = "message bot";
    botMsg.textContent = getBotResponse(userText);
    chatBody.appendChild(botMsg);
    chatBody.scrollTop = chatBody.scrollHeight;
  }, 500);

  input.value = "";
  chatBody.scrollTop = chatBody.scrollHeight;
}

function getBotResponse(message) {
  message = message.toLowerCase();

  if (message.includes("hola") || message.includes("buenos")) {
    return "¡Hola! Bienvenido a SkyLearn Academy. ¿Cómo podemos ayudarte?";
  } else if (message.includes("precio") || message.includes("costo")) {
    return "Nuestra mensualidad es de S/120, pero por apertura tienes un 30% de descuento.";
  } else if (message.includes("horario")) {
    return "Ofrecemos horarios flexibles. ¡Elige el que mejor te convenga!";
  } else if (message.includes("inscripción") || message.includes("registro")) {
    return "Puedes inscribirte desde nuestra página web: www.skylearnacademy.com";
  } else if (message.includes("gracias")) {
    return "¡Gracias por tu consulta! Si necesitas más ayuda, no dudes en escribirnos.";
  } else {
    return "Lo siento, no entiendo tu mensaje. ¿Puedes reformularlo?";
  }
}
