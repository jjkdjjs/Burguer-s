document.getElementById('avaliacaoForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // 1. Captura dos campos de texto e nota
    const nome = document.getElementById('nameInput').value;
    const depoimento = document.getElementById('avaInput').value;
    const notaElement = document.querySelector('input[name="rating"]:checked');
    const fotoArquivo = document.getElementById('profilePicture').files[0]; // Captura o arquivo de imagem

    if (!nome || !depoimento) {
        alert('Por favor, preencha seu nome e a avaliação.');
        return;
    }

    if (!notaElement) {
        alert('Por favor, selecione uma nota!');
        return;
    }
    const nota = parseInt(notaElement.value);

    // 2. Processamento do arquivo de imagem (assíncrono)
    if (fotoArquivo) {
        // Verifica o tamanho do arquivo (limite de 1MB) para evitar estourar o localStorage
        if (fotoArquivo.size > 1024 * 1024 * 1) { 
             alert('A foto de perfil é muito grande. Por favor, escolha uma imagem menor que 1MB.');
             return;
        }

        const reader = new FileReader();

        // Esta função será executada quando o arquivo for totalmente lido
        reader.onload = function(e) {
            const fotoBase64 = e.target.result; // A imagem como string Base64

            salvarAvaliacao(nome, depoimento, nota, fotoBase64);
        };

        // Lê o arquivo como Data URL (Base64)
        reader.readAsDataURL(fotoArquivo);
        
    } else {
        // Se nenhuma foto foi selecionada, salva com 'null'
        salvarAvaliacao(nome, depoimento, nota, null); 
    }
});

/**
 * Função para criar o objeto de avaliação e salvar no localStorage.
 */
function salvarAvaliacao(nome, depoimento, estrelas, fotoData) {
    const novaAvaliacao = {
        nome: nome,
        // O valor 'foto' agora é a string Base64 ou nulo
        foto: fotoData, 
        depoimento: depoimento,
        estrelas: estrelas
    };

    // 3. Salva a nova avaliação no localStorage
    try {
        localStorage.setItem('novaAvaliacaoUsuario', JSON.stringify(novaAvaliacao));
        
        // 4. Redireciona o usuário para a página de avaliações
        window.location.href = 'avaliacao.html';
        
    } catch (e) {
        // Trata erro de limite de tamanho do localStorage
        alert('Erro ao salvar avaliação. O tamanho total dos dados (incluindo a foto) excedeu o limite do navegador. Tente usar uma foto menor.');
        console.error('Erro ao salvar no localStorage:', e);
    }
}