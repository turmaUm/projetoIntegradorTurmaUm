const form = document.getElementById('form');

const email = document.getElementById('email');
const senha = document.getElementById('senha');

const nomeCadastro = document.getElementById('nomeCadastro');
const emailCadastro = document.getElementById('emailCadastro');
const senhaCadastro = document.getElementById('senhaCadastro');
const confirmeSenha = document.getElementById('confirmeSenha');

//Adicionando evento de enviar no javascript e mudando 
//comportamento padrão com .preventDeFualt();

form.addEventListener('submit', (e) => {
    e.preventDefault();

    checkInputs();
});


function checkInputs () {
    const emailValue = email.value.trim();
    const senhaValue = senha.value.trim();
    const nomeCadastroValue = nomeCadastro.value.trim();
    const emailCadastroValue = emailCadastro.value.trim();
    const senhaCadastroValue = senhaCadastro.value.trim();
    const confirmeSenhaValue = confirmeSenha.value.trim();

    if(emailValue === '') {
        //mostrar o erro
        //adicionar a classe 'error'
        errorValidation(email, 'Preencha esse campo')
    } else {
        //Adicionar a classe 'success'
    }
}

// parenteElement no JS é um método que retorna uma referencia direita do 
//seu elemento pai

function errorValidation(input, message) {
    const formControl = input.parentElement; 
    const small = formControl.querySelector('small');

    small.innerText = message;

    formControl.className = 'form-control error'
}