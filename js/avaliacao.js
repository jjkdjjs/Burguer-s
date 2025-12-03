function calcularMediaAvaliacoes() {
const estrelas = document.querySelectorAll('.card-stars');
let soma = 0;
let qtd = 0;


estrelas.forEach(e => {
let valor = 0;


if (e.dataset.stars) {
valor = parseFloat(e.dataset.stars);
} else {
const texto = e.textContent.trim();
const cheias = (texto.match(/⭐/g) || []).length;
const vazias = (texto.match(/☆/g) || []).length;
valor = cheias + (vazias > 0 ? 0.5 : 0);
}


soma += valor;
qtd++;
});


const media = (soma / qtd).toFixed(1);


const global = document.querySelector('.rating-global span');
if (global) global.textContent = media;
}


window.onload = calcularMediaAvaliacoes;
document.addEventListener('DOMContentLoaded', function() {
    // 1. Tenta buscar a avaliação salva pelo usuário no localStorage
    const savedAvaliacaoJSON = localStorage.getItem('novaAvaliacaoUsuario');
    
    // Verifica se existe alguma avaliação salva
    if (savedAvaliacaoJSON) {
        
        try {
            const novaAvaliacao = JSON.parse(savedAvaliacaoJSON);
            const containerAva = document.querySelector('.container-ava');

            if (containerAva) {
                const novoCardHTML = createAvaliacaoCardHTML(novaAvaliacao);
                const novoCardElement = document.createElement('div');
                
                // Adiciona a classe para estilizar e identificar
                novoCardElement.className = 'card-avaliacao user-generated';
                novoCardElement.innerHTML = novoCardHTML;
                
                // 5. INSERE O NOVO CARD NO INÍCIO DA LISTA
                containerAva.insertBefore(novoCardElement, containerAva.firstChild);

                // IMPORTANTE: Não removemos o item do localStorage aqui!
                // Só removemos quando o usuário clica em "Excluir" ou recarrega a página.
                
                // ----------------------------------------------------
                // 6. LÓGICA DO BOTÃO DE EXCLUSÃO
                // ----------------------------------------------------
                const deleteButton = novoCardElement.querySelector('.delete-btn');
                
                deleteButton.addEventListener('click', function() {
                    if (confirm('Tem certeza que deseja excluir esta avaliação?')) {
                        
                        // Remove a avaliação do localStorage
                        localStorage.removeItem('novaAvaliacaoUsuario'); 
                        
                        // Remove o card da tela (DOM)
                        novoCardElement.remove();
                        
                        alert('Avaliação excluída com sucesso! Recarregue a página para ver a lista original.');
                        
                        // Opcional: Recarregar a página após a exclusão para garantir a limpeza
                        // window.location.reload(); 
                    }
                });

            } else {
                console.error("Contêiner de avaliações '.container-ava' não encontrado.");
                // Se não encontrar o container, pelo menos limpa o item para evitar problemas futuros
                localStorage.removeItem('novaAvaliacaoUsuario');
            }

        } catch (e) {
            console.error("Erro ao processar a avaliação salva:", e);
            localStorage.removeItem('novaAvaliacaoUsuario'); // Limpa dados corrompidos
        }
    }
});


// ----------------------------------------------------
// FUNÇÕES AUXILIARES (MANTENHA AS SEGUINTES FUNÇÕES)
// ----------------------------------------------------

function generateEstrelasHTML(rating) {
    const fullStar = '★';
    const emptyStar = '☆';
    
    const fullStars = fullStar.repeat(rating);
    const emptyStars = emptyStar.repeat(5 - rating);
    
    return fullStars + emptyStars;
}
// Localize e ajuste esta função no seu arquivo JS da página de listagem (avaliacao.html)

function createAvaliacaoCardHTML(avaliacao) {
    const estrelas = generateEstrelasHTML(avaliacao.estrelas);
    const defaultAvatar = 'https://via.placeholder.com/60?text=U'; 
    const fotoSource = avaliacao.foto || defaultAvatar; 
    
    return `
        <div class="perfil-info">
            <img class="avatar-cliente"
                src="${fotoSource}"
                alt="Avatar do Cliente ${avaliacao.nome}">
            <div class="nome-estrelas">
                <span class="nome-cliente">${avaliacao.nome} (Sua Avaliação)</span>
                <div class="estrelas user-rating">${estrelas}</div>
            </div>
        </div>
        <p class="depoimento">"${avaliacao.depoimento}"</p>
        
        <button class="delete-btn" aria-label="Excluir Minha Avaliação">
            <svg class="trash-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 7H5V18C5 18.5304 5.21071 19.0391 5.58579 19.4142C5.96086 19.7893 6.46957 20 7 20H17C17.5304 20 18.0391 19.7893 18.4142 19.4142C18.7893 19.0391 19 18.5304 19 18V7H6ZM10 11V16H12V11H10ZM14 11V16H16V11H14ZM19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z"></path>
            </svg>
        </button>
    `;
}
// Mantenha as funções generateEstrelasHTML e o resto do código JS!