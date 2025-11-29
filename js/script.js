const cards = document.querySelectorAll('.card');
let index = 0;

function updateCards() {
    cards.forEach(card => card.classList.remove('active'));
    cards[index].classList.add('active');

    const track = document.getElementById('track');
    track.style.transform = `translateX(calc(50vw - ${(index * 300) + 150}px))`;
}

setInterval(() => {
    index = (index + 1) % cards.length;
    updateCards();
}, 3500);

cards.forEach((card, i) => {
    card.addEventListener('mouseenter', () => {
        index = i;
        updateCards();
    });
});
function initMap() {
    // Coordenadas para São Paulo
    const localizacao = { lat: -23.5505, lng: -46.6333 };

    // Cria uma nova instância do mapa e a insere na div 'mapa'
    const map = new google.maps.Map(document.getElementById("mapa"), {
        zoom: 12, // Nível de zoom
        center: localizacao,
    });

    // Adiciona um marcador no mapa
    new google.maps.Marker({
        position: localizacao,
        map: map,
        title: "São Paulo"
    });
}
document.addEventListener("scroll", () => {
    const box = document.getElementById("socialBox");

    if (window.scrollY > 200) {
        box.classList.add("show");
    } else {
        box.classList.remove("show");
    }
});