
let amigos = [];
let sorteioRealizado = false;
let toRemove = '';
let sorteado = '';

function estourarConfete() {
    confetti({
        particleCount: 150, 
        spread: 80,         
        origin: { y: 0.6 },
        colors: ['#ff0f0f', '#ff9800', '#ffeb3b', '#4caf50', '#2196f3', '#9c27b0']
    });
}

function sortearAmigo() {
    if (sorteioRealizado) {
        alert('Sorteio já realizado, adicione novos amigos para sortear novamente!');
        return;
    }
    if (amigos.length === 0) {
        alert('Adicione amigos para sortear!');
        return;
    }
    
    sorteado = amigos[Math.floor(Math.random() * amigos.length)];
    
    document.getElementById('resultado').innerText = sorteado;
    document.getElementById("hiden-elements").classList.remove("hidden");

    estourarConfete();
    sorteioRealizado = true;
}