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
