let amigos = [];
let sorteados = [];

function adicionarAmigo() {
    const input = document.getElementById('amigo');
    const nomes = input.value.trim();

    if (nomes === '') {
        alert('Digite pelo menos um nome válido!');
        return;
    }
    
    const listaNomes = nomes.split(',').map(nome => nome.trim()).filter(nome => nome !== '');
    
    listaNomes.forEach(nome => {
        if (!amigos.includes(nome)) {
            amigos.push(nome);
        }
    });
    
    atualizarLista();
    input.value = '';
}

function atualizarLista() {
    const lista = document.getElementById('listaAmigos');
    lista.innerHTML = '';

    amigos.forEach((nome) => {
        const li = document.createElement('li');
        li.textContent = nome;
        lista.appendChild(li);
    });
}

function estourarConfete() {
    confetti({
        particleCount: 150, 
        spread: 80,         
        origin: { y: 0.6 },
        colors: ['#ff0f0f', '#ff9800', '#ffeb3b', '#4caf50', '#2196f3', '#9c27b0']
    });
}

function sortearAmigo() {
    if (amigos.length === 0) {
        alert('Por favor, adicione ao menos dois amigos!');
        return;
    }
    if (amigos.length < 2) {
        alert('Adicione pelo menos dois amigos para sortear!');
        return;
    }
    if (sorteados.length === amigos.length) {
        alert('Todos os amigos já foram sorteados!');
        return;
    }
    
    let sorteado;
    do {
        sorteado = amigos[Math.floor(Math.random() * amigos.length)];
    } while (sorteados.includes(sorteado));
    
    sorteados.push(sorteado);
    document.getElementById('resultado').innerText = `Sorteado: ${sorteado}`;
    
    document.getElementById('hiden-elements').classList.remove('hidden');
    document.getElementById('auto-sorteio').classList.remove('hidden');
    document.getElementById('limpar-resposta').classList.remove('hidden');

    estourarConfete();
}

function resortearAmigo() {
    if (sorteados.length === amigos.length) {
        alert('Todos os amigos já foram sorteados!');
        return;
    }
    sortearAmigo();
}

function ocultarResultado() {
    document.getElementById('resultado').innerText = '';
    document.getElementById('hiden-elements').classList.add('hidden');
    document.getElementById('auto-sorteio').classList.add('hidden');
    document.getElementById('limpar-resposta').classList.add('hidden');
    amigos = [];
    sorteados = [];
    atualizarLista();
}
