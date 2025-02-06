let amigos = [];
let sorteioRealizado = false;
let toRemove = '';
let sorteado = '';

// Adiciona a biblioteca de confetes ao carregar a página
function estourarConfete() {
    confetti({
        particleCount: 150, // Quantidade de partículas
        spread: 80,         // Espalhamento das partículas
        origin: { y: 0.6 }, // Local de origem na tela
        colors: ['#ff0f0f', '#ff9800', '#ffeb3b', '#4caf50', '#2196f3', '#9c27b0'] // Cores vibrantes
    });
}

// Capitaliza a primeira letra de cada palavra
function capitalizar(texto) {
    return texto.split(' ')
                .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase())
                .join(' ');
}

// Verifica se o campo está vazio
function validaCampoVazio(texto) {
    return texto.trim() === ''; // (Erro 1: Adicionado .trim() para evitar espaços em branco serem considerados válidos)
}

// Verifica se o amigo já foi adicionado
function validaDuplicado(amigo) {
    return amigos.includes(amigo);
}

function validaTrataInput(amigoInput) {
    const amigo = capitalizar(amigoInput.trim());

    if (validaCampoVazio(amigo)) {
        alert('Digite o nome do amigo!');
        return;
    }

    if (!/^[a-zA-Z\s]+$/.test(amigo)) {
        alert(`Nome ${amigo} inválido! O nome deve conter apenas letras!`); // (Erro 2: Corrigido template string incorreto)
        return;
    }

    if (validaDuplicado(amigo)) {
        alert(`Amigo ${amigo} já adicionado!`); // (Erro 3: Corrigido template string incorreto)
        return;
    }
    amigos.push(amigo);
}

// Adiciona um amigo à lista
function adicionarAmigo() {
    const amigoInput = document.getElementById('amigo').value;

    if (amigoInput.includes(',')) {
        let amigosInput = amigoInput.split(',').map(a => a.trim()); // (Erro 4: Adicionado .trim() para remover espaços indesejados)
        for (let item of amigosInput) {
           validaTrataInput(item);
        }
    } else {
        validaTrataInput(amigoInput);
    }

    document.getElementById('resultado').innerHTML = '';
    atualizarListaAmigos();
    limparElemento("amigo");
}

// Sorteia um amigo da lista
function sortearAmigo() {
    if (sorteioRealizado) {
        alert('Sorteio já realizado, adicione novos amigos para sortear novamente!');
        ocultarResultado();
        return;
    } 
    if (amigos.length === 0) {
        alert('Adicione amigos para sortear!');
        return;
    } 
    
    if(toRemove){
        amigos = amigos.filter(amigo => amigo !== toRemove);
        toRemove = '';
    }
    
    sorteado = amigos[Math.floor(Math.random() * amigos.length)];
    limparElemento('amigo');
    limparElemento('listaAmigos');

    // Dispara o efeito de confete
    estourarConfete();

    if (amigos.length === 1) { // (Erro 5: Alterado de == para === para melhor comparação)
        alterarValorElemento('resultado', sorteado);
        document.getElementById("hiden-elements").classList.remove("hidden");
        document.getElementById("auto-sorteio").classList.add("hidden");
        sorteioRealizado = true;
    } else {
        alterarValorElemento('resultado', sorteado);
        document.getElementById("hiden-elements").classList.remove("hidden");
        document.getElementById("auto-sorteio").classList.remove("hidden");
        toRemove = sorteado;
    }
}

function resortearAmigo() {
    if (amigos.length > 1) { // (Erro 6: Prevenção de loop infinito se houver apenas um amigo)
        let nomeSorteado = sorteado;
        while(sorteado === nomeSorteado) {
            sorteado = amigos[Math.floor(Math.random() * amigos.length)];
        }
        limparElemento('amigo');
        limparElemento('listaAmigos');
        alterarValorElemento('resultado', sorteado);
        document.getElementById("auto-sorteio").classList.add("hidden");
        toRemove = sorteado;
    }
}

// Atualiza a lista de amigos no HTML
function atualizarListaAmigos() {
    alterarValorElemento('listaAmigos', amigos.map(amigo => `<li>${amigo}</li>`).join('')); // (Erro 7: Corrigido uso incorreto de template string)
}

// Limpa o valor de um elemento
function limparElemento(elemento) {
    alterarValorElemento(elemento, '');
    let el = document.getElementById(elemento);
    if (el && 'value' in el) { // (Erro 8: Prevenção de erro ao tentar limpar elementos que não são inputs)
        el.value = '';
    }
}

function alterarValorElemento(elemento, valor) {
    let el = document.getElementById(elemento);
    if (el) { // (Erro 9: Verificação para evitar erro caso o elemento não exista no DOM)
        el.innerHTML = valor;
    }
}

// Limpa a lista de amigos no HTML
function reiniciarAmigoSecreto() {
    limparElemento('amigo');
    limparElemento('resultado');
    limparElemento('listaAmigos');
    document.getElementById("hiden-elements").classList.add("hidden");
    amigos = [];
    sorteioRealizado = false;
    sorteado = '';
    toRemove = '';
}

function ocultarResultado(){
    if (!sorteioRealizado) {
        alterarValorElemento('resultado', 'Continue sorteando!');
        document.getElementById("auto-sorteio").classList.remove("hidden");
        document.getElementById("hiden-elements").classList.add("hidden");
    } else {
        alterarValorElemento('resultado', '');
        reiniciarAmigoSecreto();
    }
    document.getElementById("auto-sorteio").classList.remove("hidden");
    document.getElementById("hiden-elements").classList.add("hidden");
}
