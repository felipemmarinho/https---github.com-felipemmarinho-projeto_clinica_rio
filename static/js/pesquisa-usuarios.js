document.addEventListener('DOMContentLoaded', function () {
// Seleção dos elementos do DOM
const radiosProcurarPelo = document.querySelectorAll('input[name="procurarPelo"]');
const grupoProcurarPor = document.getElementById('grupoProcurarPor');
const labelPesquisa = document.getElementById('labelPesquisa');
const campoPesquisa = document.getElementById('campoPesquisa');
const helperPesquisa = document.getElementById('helperPesquisa');
/**
 * Aplica a máscara de CPF (000.000.000-00) no valor digitado
 * @param {string} value 
 * @returns {string}
 */
function aplicarMascaraCPF(value) {
    // Remove tudo que não for dígito
    value = value.replace(/\D/g, '');
    
    // Limita a 11 dígitos
    value = value.substring(0, 11);

    // Aplica a formatação do CPF
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

    return value;
}

/**
 * Manipulador do evento de digitação (input) para tratar a máscara
 */
function tratarInputComMascara(event) {
    const radioSelecionado = document.querySelector('input[name="procurarPelo"]:checked');
    if (radioSelecionado && radioSelecionado.value === 'cpf') {
        event.target.value = aplicarMascaraCPF(event.target.value);
    }
}

/**
 * Função responsável por atualizar a interface de acordo com a opção selecionada
 * @param {string} opcao - Valor do radio selecionado ('nome', 'cpf' ou 'username')
 */
function atualizarInterface(opcao) {
    // Limpa o campo ao trocar a opção de busca
    if (campoPesquisa) {
        campoPesquisa.value = '';
    }

    if (opcao === 'cpf') {
        // Oculta o grupo "Procurar por"
        if (grupoProcurarPor) {
            grupoProcurarPor.style.display = 'none';
        }

        // Atualiza textos e placeholders para CPF
        if (labelPesquisa) labelPesquisa.textContent = 'CPF';
        if (campoPesquisa) {
            campoPesquisa.placeholder = '000.000.000-00';
            campoPesquisa.maxLength = 14; // Limita caracteres no modo CPF (11 números + 3 símbolos)
        }
        if (helperPesquisa) helperPesquisa.textContent = 'Informe o CPF (apenas números).';

    } else if (opcao === 'username') {
        // Exibe o grupo "Procurar por"
        if (grupoProcurarPor) {
            grupoProcurarPor.style.display = 'block';
        }

        // Atualiza textos e placeholders para User name
        if (labelPesquisa) labelPesquisa.textContent = 'User name';
        if (campoPesquisa) {
            campoPesquisa.placeholder = 'Digite o username';
            campoPesquisa.removeAttribute('maxLength'); // Remove o limite do CPF
        }
        if (helperPesquisa) helperPesquisa.textContent = 'Informe o nome de usuário (login).';

    } else {
        // Padrão: 'nome'
        // Exibe o grupo "Procurar por"
        if (grupoProcurarPor) {
            grupoProcurarPor.style.display = 'block';
        }

        // Atualiza textos e placeholders para Nome do usuário
        if (labelPesquisa) labelPesquisa.textContent = 'Nome do usuário';
        if (campoPesquisa) {
            campoPesquisa.placeholder = 'Digite o nome do usuário';
            campoPesquisa.removeAttribute('maxLength'); // Remove o limite do CPF
        }
        if (helperPesquisa) helperPesquisa.textContent = 'Informe parte ou o nome completo do usuário.';
    }
}

// Adiciona evento ao campo de texto para aplicar/remover a máscara enquanto digita
if (campoPesquisa) {
    campoPesquisa.addEventListener('input', tratarInputComMascara);
}

// Adiciona o evento de mudança em todos os rádios de "Procurar pelo"
radiosProcurarPelo.forEach(function (radio) {
    radio.addEventListener('change', function (event) {
        atualizarInterface(event.target.value);
    });
});

// Executa na inicialização para ajustar a tela ao carregar a página
const radioSelecionado = document.querySelector('input[name="procurarPelo"]:checked');
if (radioSelecionado) {
    atualizarInterface(radioSelecionado.value);
}


});
