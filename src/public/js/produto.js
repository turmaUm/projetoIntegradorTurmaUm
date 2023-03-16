const cores = document.querySelectorAll('.cores input[type="button"]');
const tamanhos = document.querySelectorAll('.tamanhos input[type="button"]');
const corSelecionada = document.getElementById("cor-selecionada");
const tamanhoSelecionado = document.getElementById("tamanho-selecionado");
// const teste = document.getElementById('teste')

// teste.value = 300

cores.forEach((cor) => {
  cor.addEventListener('click', () => {
    // Remove a classe "selecionado" de todos os botões de cor
    cores.forEach(botao => {
      botao.classList.remove('corselecionado');
      botao.style.border = "";
    });
    // Adiciona a classe "corselecionado" ao botão que foi clicado
    cor.classList.add('corselecionado');
    cor.style.border = '2px solid #333';
    corSelecionada.value = cor.value;   //Porque o input tipo hidden ele é enviado no query 
  });
});


tamanhos.forEach((tamanho) => {
    tamanho.addEventListener('click', () => {
    // Remove a classe "selecionado" de todos os botões de tamanho
    tamanhos.forEach(botao => {
      botao.classList.remove('selecionado');
      botao.style.backgroundColor = 'white'; // adiciona a cor padrão de fundo
    });
    // Adiciona a classe "selecionado" ao botão que foi clicado
    tamanho.classList.add('selecionado');
    tamanho.style.backgroundColor = 'black'; // altera a cor de fundo do botão selecionado
    tamanhoSelecionado.value = tamanho.value;
  });
});

const form = document.querySelector('form');
form.addEventListener('submit', event => {
 
  const tamanhoSelecionado = document.querySelector('.selecionado');
  const corSelecionado = document.querySelector('.corselecionado');
  if (!corSelecionado) {
    alert('Selecione uma cor');
    event.preventDefault();
    return;
  }
  if (!tamanhoSelecionado) {
    alert('Selecione uma tamanho');
    event.preventDefault();
    return;
  }
  const item = {
    tamanho: tamanhoSelecionado.value,
    quantidade: 1
  };
  console.log(item); // exibe o objeto item no console do navegador
  // Adicione aqui o código para enviar o item para o carrinho
});

// Alterando o valor dos produtos 

const qtdCamisaInput = document.querySelector('.qtd-camisa');

// Seleciona o botão de classe "remove" e adiciona um ouvinte de eventos de clique
document.querySelector('.remove').addEventListener('click', () => {
  // Obtém o valor atual do input
  let currentValue = parseInt(qtdCamisaInput.value);

  // Verifica se o valor atual é maior do que o valor mínimo permitido
  if (currentValue > parseInt(qtdCamisaInput.min)) {
    // Diminui o valor atual em 1
    currentValue--;

    // Atualiza o valor do input
    qtdCamisaInput.value = currentValue.toString();
  }
});

// Seleciona o botão de classe "add" e adiciona um ouvinte de eventos de clique
document.querySelector('.add').addEventListener('click', () => {
  // Obtém o valor atual do input
  let currentValue = parseInt(qtdCamisaInput.value);

  // Verifica se o valor atual é menor do que o valor máximo permitido
  if (currentValue < parseInt(qtdCamisaInput.max)) {
    // Aumenta o valor atual em 1
    currentValue++;

    // Atualiza o valor do input
    qtdCamisaInput.value = currentValue.toString();
  }
});


