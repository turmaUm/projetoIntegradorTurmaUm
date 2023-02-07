const formLogin = document.getElementById('formLogin');
const formCadastro = document.getElementById('formCadastro')

//Campos input 'login'
const email = document.getElementById('email');
const senha = document.getElementById('senha');

//Campos input 'cadastro'
const nomeCadastro = document.getElementById('nomeCadastro');
const emailCadastro = document.getElementById('emailCadastro');
const senhaCadastro = document.getElementById('senhaCadastro');
const confirmeSenha = document.getElementById('confirmeSenha');

//Adicionando evento de enviar no javascript e mudando 
//comportamento padrão com .preventDeFualt();
formLogin.addEventListener('submit', (e) => {
    //função para tirar comportamento padrão
    e.preventDefault();
    //chamando função error/success campo input login   
    checkInputsLogin();
});

//.trim() remove espaço em branco
function checkInputsLogin() {

    const emailValue = email.value.trim();
    const senhaValue = senha.value.trim();

    if(emailValue === '') {
        //mostrar o erro
        //adicionar a classe 'error'
        errorValidation(email, 'Preencha esse campo')
    } else {
        //Adicionar a classe 'success'
        successValidation(email);
    }

    if(senhaValue === '') {
          //mostrar o erro
        //adicionar a classe 'error'
        errorValidation(senha, 'Preencha esse campo')
    } else {
        //Adicionar a classe 'success'
        successValidation(senha);
    }
}

formCadastro.addEventListener('submit', (e) => {
    //Tirando comportamento padrão campo input cadastro
    e.preventDefault();
    //chamando função error/success campo input cadastro
    checkInputsCadastro();
});

function checkInputsCadastro() {

    const nomeCadastroValue = nomeCadastro.value.trim();
    const emailCadastroValue = emailCadastro.value.trim();
    const senhaCadastroValue = senhaCadastro.value.trim();
    const confirmeSenhaValue = confirmeSenha.value.trim();

    if(nomeCadastroValue === '') {
        //mostrar o erro
        //adicionar a classe 'error'
        errorValidation(nomeCadastro, 'Preencha esse campo')
    } else {
        //Adicionar a classe 'success'
        successValidation(nomeCadastro);
    }

    if(emailCadastroValue === '') {
        //mostrar o erro
        //adicionar a classe 'error'
        errorValidation(emailCadastro, 'Preencha esse campo')
    } else {
        //Adicionar a classe 'success'
        successValidation(emailCadastro);
    }

    if(senhaCadastroValue === '') {
        //mostrar o erro
        //adicionar a classe 'error'
        errorValidation(senhaCadastro, 'Preencha esse campo')
    } else {
        //Adicionar a classe 'success'
        successValidation(senhaCadastro);
    }
    
    if(confirmeSenhaValue === '') {
        //mostrar o erro
        //adicionar a classe 'error'
        errorValidation(confirmeSenha, 'Preencha esse campo')
    } else {
        //Adicionar a classe 'success'
        successValidation(confirmeSenha);
    }   
}

// parenteElement no JS é um método que retorna uma referencia direita do 
//seu elemento pai
function errorValidation(input, message) {
    const formControl = input.parentElement; 
    const small = formControl.querySelector('small');

    small.innerText = message;

    formControl.className = 'form-control error'
};

function successValidation (input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    small.innerText = message;
    formControl.className = 'form-control success'
};

