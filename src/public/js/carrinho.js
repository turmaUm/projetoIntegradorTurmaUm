 // Selecionando todos os botões de adição e remoção
 const btnAdd = document.querySelectorAll(".btAdd");
 const btnRemove = document.querySelectorAll(".btRemove");
 
 // Adicionando um listener de eventos para cada botão de adição
 btnAdd.forEach(function(btn) {
     btn.addEventListener("click", function() {
         // Selecionando o campo de entrada de quantidade correspondente
         const quantidade = this.parentNode.querySelector(".quantidade");
         // Obtendo o valor atual da quantidade e incrementando em 1
         const valorAtual = parseInt(quantidade.value);
         quantidade.value = valorAtual + 1;
         console.log(carrinhoSession)
     });
 });
 
 // Adicionando um listener de eventos para cada botão de remoção
 btnRemove.forEach(function(btn) {
     btn.addEventListener("click", function() {
         // Selecionando o campo de entrada de quantidade correspondente
         const quantidade = this.parentNode.querySelector(".quantidade");
         // Obtendo o valor atual da quantidade e decrementando em 1
         const valorAtual = parseInt(quantidade.value);
         if (valorAtual > 0) {
             quantidade.value = valorAtual - 1;
         }
     });
 });


// Hiddens inputs

const quantidades = document.querySelectorAll('.quantidade');
const quantidadesHidden = document.querySelectorAll('.quantidadeHidden');
const valoresTotal = document.querySelectorAll('.valorTotalH');
const valoresTotalHidden = document.querySelectorAll('.valorTotalHidden');


for (let i = 0; i < quantidades.length; i++) {
  quantidadesHidden[i].value = quantidades[i].value;
  valoresTotalHidden[i].value = valoresTotal[i].value;
}


