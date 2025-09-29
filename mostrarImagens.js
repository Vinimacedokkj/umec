function mostrarMaisImagensMocambique() {
    const imagensOcultas = document.querySelectorAll('.galeria-item#mocambique .galeria-grid .hidden-image');
    imagensOcultas.forEach(img => {
        img.classList.remove('hidden-image');
    });

    const botao = document.getElementById('btn-mocambique');
    botao.style.display = 'none'; // Oculta o botão após clicar
}

function mostrarMaisImagensApoioAfrica() {
    const imagensOcultas = document.querySelectorAll('.galeria-item#apoio-continente-africano .galeria-grid .hidden-image');
    imagensOcultas.forEach(img => {
        img.classList.remove('hidden-image');
    });

    const botao = document.getElementById('btn-apoio-africa');
    botao.style.display = 'none'; // Oculta o botão após clicar
}

function mostrarMaisImagensColatam() {
    const imagensOcultas = document.querySelectorAll('.galeria-item#encontro-colatam .galeria-grid .hidden-image');
    imagensOcultas.forEach(img => {
        img.classList.remove('hidden-image');
    });

    const botao = document.getElementById('btn-colatam');
    botao.style.display = 'none'; // Oculta o botão após clicar
}