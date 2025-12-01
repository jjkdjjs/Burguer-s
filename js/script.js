const track = document.getElementById('track');
let cards = Array.from(document.querySelectorAll('.card')); 

// Variáveis de controle de movimento
const scrollSpeed = 0.1; // Velocidade LENTA de rolagem (AJUSTE AQUI)
let pos = 0; // Posição atual do carrossel
let direction = 1; // 1 = Avançar, -1 = Recuar
let animationFrameId;

// Variáveis de Destaque
let activeIndex = 0;
let isMouseOver = false; // Estado para saber se o usuário está com o mouse em um card


// --- 1. FUNÇÃO DE DESTAQUE ---

function highlightCard(index) {
    // Garante que o índice não saia dos limites do array
    if (index < 0 || index >= cards.length) return; 

    cards.forEach(c => c.classList.remove('active'));
    cards[index].classList.add('active');
}


// --- 2. FUNÇÃO DE ROLAGEM CONTÍNUA "VAI E VOLTA" (O CORE) ---

function animate() {
    if (cards.length === 0) return;
    
    // 1. Cálculos de Largura
    const cardWidth = cards[0].offsetWidth; 
    const margin = parseFloat(window.getComputedStyle(cards[0]).marginRight || 0);
    const itemWidthWithMargin = cardWidth + margin;

    const contentWidth = itemWidthWithMargin * cards.length; 
    const containerWidth = track.parentElement.offsetWidth;
    const maxScroll = contentWidth - containerWidth; 

    // 2. Aplica o Movimento na Direção Atual
    pos -= scrollSpeed * direction;
    
    // 3. Lógica de INVERSÃO (Vai e Volta)
    if (Math.abs(pos) >= maxScroll) {
        direction = -1; 
    }
    if (pos >= 0) {
        direction = 1; 
        pos = 0; 
    }

    // 4. Aplica a Transição
    track.style.transform = `translateX(${pos}px)`;
    
    // 💥 5. CÁLCULO DE DESTAQUE PRECISO (SÓ RODA SE O MOUSE NÃO ESTIVER EM CIMA)
    if (!isMouseOver) {
        const currentScroll = Math.abs(pos);
        // Calcula o índice do card que está na borda esquerda
        const newIndex = Math.floor(currentScroll / itemWidthWithMargin);

        if (newIndex !== activeIndex) {
            activeIndex = newIndex;
            highlightCard(activeIndex);
        }
    }
    
    // 6. Continua o Loop
    animationFrameId = requestAnimationFrame(animate);
}


// --- 3. Interação com Mouse (Arrasto e Hover) ---

let isDragging = false;
let startX;
let scrollLeftInitial;

// 1. Mouse DOWN (Inicia o Arrasto)
track.addEventListener('mousedown', (e) => {
    isDragging = true;
    cancelAnimationFrame(animationFrameId); // Para a rolagem automática
    
    startX = e.pageX - track.offsetLeft;
    scrollLeftInitial = Math.abs(pos);
    
    isMouseOver = true; // Sinaliza que o usuário está interagindo
});

// 2. Mouse MOVE (Arrastando)
track.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX);

    let newPos = -(scrollLeftInitial - walk); 

    // Limites (para não sair da tela)
    const cardWidth = cards[0].offsetWidth; 
    const margin = parseFloat(window.getComputedStyle(cards[0]).marginRight || 0);
    const itemWidthWithMargin = cardWidth + margin;
    const contentWidth = itemWidthWithMargin * cards.length; 
    const containerWidth = track.parentElement.offsetWidth;
    const maxScroll = contentWidth - containerWidth; 

    if (newPos > 0) newPos = 0;
    if (Math.abs(newPos) > maxScroll) newPos = -maxScroll;

    pos = newPos;
    track.style.transform = `translateX(${pos}px)`;
    
    // Destaque durante o arrasto: Mantenha o destaque no card mais à esquerda
    const currentScroll = Math.abs(pos);
    const newIndex = Math.floor(currentScroll / itemWidthWithMargin);
    highlightCard(newIndex);
});

// 3. Mouse UP (Solta o Arrasto)
track.addEventListener('mouseup', () => {
    isDragging = false;
    isMouseOver = false;
    // Retoma a animação automática
    animationFrameId = requestAnimationFrame(animate); 
});

// 4. Mouse LEAVE (Sai do Track)
track.addEventListener('mouseleave', () => {
    isDragging = false;
    isMouseOver = false;
});


// 💥 5. INTERAÇÃO APENAS COM HOVER (Se o mouse entra sem arrastar)
cards.forEach((card, index) => {
    card.addEventListener("mouseenter", () => {
        isMouseOver = true; // Sinaliza que o mouse está em um card
        highlightCard(index); // 🎯 DESTAQUE IMEDIATO NO CARD QUE O MOUSE ESTÁ
    });

    card.addEventListener("mouseleave", () => {
        isMouseOver = false; // Permite que o destaque automático recomece
    });
});


// --- 4. Inicialização ---

window.addEventListener('load', () => {
    animate(); 
    highlightCard(0);
});

// MAPA
function initMap() {
    const localizacao = { lat: -23.5505, lng: -46.6333 };

    const map = new google.maps.Map(document.getElementById("mapa"), {
        zoom: 12,
        center: localizacao,
    });

    new google.maps.Marker({
        position: localizacao,
        map: map,
        title: "São Paulo"
    });
}

// BOTÃO SOCIAL
document.addEventListener("scroll", () => {
    const box = document.getElementById("socialBox");

    if (window.scrollY > 200) {
        box.classList.add("show");
    } else {
        box.classList.remove("show");
    }
});
