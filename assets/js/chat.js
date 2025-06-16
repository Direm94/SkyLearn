const chatbox = document.getElementById('chatbox');
const input = document.getElementById('input');

const respuestas = {
  "hola": "¡Hola! ¿En qué puedo ayudarte?",
  "cursos": "Ofrecemos cursos de programación, diseño, inglés y matemáticas.",
  "precios": "Los precios varían según el curso. ¡Contáctanos para más información!",
  "horarios": "Los horarios están disponibles en la sección 'Precios y Horarios'.",
  "gracias": "¡De nada! 😊",
  "default": "Lo siento, no entiendo esa pregunta."
};

function enviar() {
  const texto = input.value.trim().toLowerCase();
  if (texto === '') return;

  addMessage(texto, 'user');
  setTimeout(() => {
    const respuesta = respuestas[texto] || respuestas["default"];
    addMessage(respuesta, 'bot');
  }, 500);
  input.value = '';
}

function addMessage(text, clase) {
  const div = document.createElement('div');
  div.className = clase;
  div.textContent = text;
  chatbox.appendChild(div);
  chatbox.scrollTop = chatbox.scrollHeight;
}
