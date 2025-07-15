// Mostrar contenido principal
function showMainContent() {
    document.getElementById('loginScreen').style.opacity = 0;
    setTimeout(() => {
        document.getElementById('loginScreen').style.display = 'none';
    }, 500);
}

// Mostrar sección activa con scroll suave
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
    
    // Scroll suave al cambiar de sección
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Carrusel automático mejorado
let currentSlide = 0;
const slides = document.querySelectorAll('.slider-image');

function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}

const slideInterval = setInterval(nextSlide, 5000);

// Pausar carrusel al hacer hover
const slider = document.querySelector('.home-slider');
slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
slider.addEventListener('mouseleave', () => {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
});

// Comentarios temporales con mejor feedback
function addComment(e) {
    e.preventDefault();
    const commentInput = document.getElementById('commentInput');
    const comment = commentInput.value.trim();
    
    if (comment === '') {
        commentInput.style.borderColor = '#e74c3c';
        setTimeout(() => {
            commentInput.style.borderColor = '#ddd';
        }, 2000);
        return;
    }

    const comments = JSON.parse(localStorage.getItem('comments') || '[]');
    comments.push({ 
        text: comment, 
        time: Date.now(),
        user: 'Usuario' + Math.floor(Math.random() * 1000)
    });
    localStorage.setItem('comments', JSON.stringify(comments));
    displayComments();
    e.target.reset();
    
    // Feedback visual
    const submitBtn = e.target.querySelector('button');
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Enviado';
    submitBtn.style.backgroundColor = '#2ecc71';
    setTimeout(() => {
        submitBtn.innerHTML = 'Enviar';
        submitBtn.style.backgroundColor = '#3498db';
    }, 2000);
}

function displayComments() {
    const container = document.getElementById('commentsContainer');
    const comments = JSON.parse(localStorage.getItem('comments') || '[]');
    const validComments = comments.filter(c => Date.now() - c.time < 86400000); // 24 horas
    
    container.innerHTML = validComments.map(c => `
        <div class="comment">
            <div class="comment-header">
                <i class="fas fa-user-circle"></i>
                <span class="comment-user">${c.user}</span>
                <span class="comment-time">${formatTime(c.time)}</span>
            </div>
            <div class="comment-text">${c.text}</div>
        </div>
    `).join('');
    
    localStorage.setItem('comments', JSON.stringify(validComments));
}

function formatTime(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Chatbot mejorado
function toggleChat() {
    const chat = document.getElementById('chatWindow');
    chat.style.display = chat.style.display === 'flex' ? 'none' : 'flex';
    
    if (chat.style.display === 'flex') {
        const chatMessages = document.getElementById('chatMessages');
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

function handleChatResponse(value) {
    if (!value) return;
    
    const chatMessages = document.getElementById('chatMessages');
    const answers = {
        'horario': 'Nuestras clases son de Lunes a Viernes de 8am a 5pm, con horarios flexibles según el curso.',
        'costos': 'Los precios van desde $50/mes en plan básico hasta $100/mes para acceso completo a todos los cursos.',
        'registro': 'Puedes registrarte usando el botón "Inscribirse" en cada curso o visitando nuestra sección de contacto para asistencia personalizada.'
    };

    // Agregar pregunta del usuario
    const questionDiv = document.createElement('div');
    questionDiv.className = 'user-message';
    questionDiv.innerHTML = `
        <div class="message-content">
            ${document.querySelector(`option[value="${value}"]`).text}
        </div>
    `;
    chatMessages.appendChild(questionDiv);

    // Agregar respuesta del bot
    const answerDiv = document.createElement('div');
    answerDiv.className = 'bot-message';
    answerDiv.innerHTML = `
        <div class="message-content">
            ${answers[value] || 'Lo siento, no entendí tu pregunta. Por favor selecciona una opción del menú.'}
        </div>
    `;
    chatMessages.appendChild(answerDiv);

    // Scroll al final
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Resetear el selector
    document.querySelector('.chat-input select').value = '';
}

// Menú desplegable contacto mejorado
function toggleDropdown(id) {
    const btn = document.querySelector(`button[onclick="toggleDropdown('${id}')"]`);
    const content = document.getElementById(id);
    
    // Cerrar todos los demás dropdowns
    document.querySelectorAll('.dropdown-content').forEach(dropdown => {
        if (dropdown.id !== id) {
            dropdown.style.display = 'none';
            const otherBtn = document.querySelector(`button[onclick="toggleDropdown('${dropdown.id}')"]`);
            otherBtn.classList.remove('active');
        }
    });
    
    // Toggle el actual
    content.style.display = content.style.display === 'block' ? 'none' : 'block';
    btn.classList.toggle('active');
}

// Efecto de navbar al hacer scroll
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Back to top button
    const backToTop = document.getElementById('backToTop');
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

// Back to top button
document.getElementById('backToTop').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Inicializar comentarios al cargar
document.addEventListener('DOMContentLoaded', function() {
    displayComments();
    
    // Agregar tooltips a los botones de inscripción
    document.querySelectorAll('.course-info button').forEach(button => {
        button.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = 'Se abrirá el formulario de inscripción';
            this.appendChild(tooltip);
            
            setTimeout(() => {
                tooltip.style.opacity = '1';
                tooltip.style.visibility = 'visible';
            }, 10);
        });
        
        button.addEventListener('mouseleave', function() {
            const tooltip = this.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
});
