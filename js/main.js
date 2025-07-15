// Mostrar contenido principal
function showMainContent() {
    document.getElementById('loginScreen').style.opacity = 0;
    setTimeout(() => {
        document.getElementById('loginScreen').style.display = 'none';
    }, 500);
}

// Mostrar sección activa
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

// Carrusel automático
let currentSlide = 0;
const slides = document.querySelectorAll('.slider-image');
setInterval(() => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}, 3000);

// Comentarios temporales
function addComment(e) {
    e.preventDefault();
    const comment = document.getElementById('commentInput').value;
    const comments = JSON.parse(localStorage.getItem('comments') || '[]');
    comments.push({ text: comment, time: Date.now());
    localStorage.setItem('comments', JSON.stringify(comments));
    displayComments();
    e.target.reset();
}

function displayComments() {
    const container = document.getElementById('commentsContainer');
    const comments = JSON.parse(localStorage.getItem('comments') || '[]');
    const validComments = comments.filter(c => Date.now() - c.time < 86400000); // 24 horas
    container.innerHTML = validComments.map(c => `
        <div style="margin: 1rem 0; padding: 1rem; background: #f5f5f5; border-radius: 5px;">${c.text}</div>
    `).join('');
    localStorage.setItem('comments', JSON.stringify(validComments));
}

// Chatbot
function toggleChat() {
    const chat = document.getElementById('chatWindow');
    chat.style.display = chat.style.display === 'flex' ? 'none' : 'flex';
}

function handleChatResponse(value) {
    const chatMessages = document.getElementById('chatMessages');
    const answers = {
        'horario': 'Nuestras clases son de Lunes a Viernes de 8am a 5pm.',
        'costos': 'Los precios van desde $50/mes en plan básico.',
        'registro': 'Puedes registrarte usando el botón "Inscribirse" en cada curso.'
    };
    if (value && answers[value]) {
        const msg = document.createElement('div');
        msg.textContent = answers[value];
        msg.style.margin = '0.5rem 0';
        chatMessages.appendChild(msg);
    }
}

// Menú desplegable contacto
function toggleDropdown(id) {
    const content = document.getElementById(id);
    content.style.display = content.style.display === 'block' ? 'none' : 'block';
}

// Planes de Precios
function showPricing(plan) {
    const content = document.getElementById('pricing-content');
    content.innerHTML = plan === 'basic' ?
        '<h3>Plan Básico</h3><p>$50/mes - Acceso a 3 cursos</p>' :
        '<h3>Plan Premium</h3><p>$100/mes - Acceso a todos los cursos</p>';
}

displayComments();
