//criando os objetos dos elementos de texto do form

var nome = document.querySelector("#inputName");
var nomeHelp = document.querySelector("#inputNameHelp");
var ano = document.querySelector("#inputYear");
var anoHelp = document.querySelector("#inputYearHelp");
var email = document.querySelector("#inputEmail");
var emailHelp = document.querySelector("#inputEmailHelp");
var senha = document.querySelector("#inputPassword");
var senhaHelp = document.querySelector("#inputPasswordHelp");

/*declarando o evento listener para o campos de texto do form. 
Uma vez o foco do campo inputName mude, será chamada a função validarNome*/
nome.addEventListener('focusout', validarNome);

/*declaração tradicional de função validarNome(e)
'e' é o objeto do tipo evento que contém, alpem de outras propriedades, o objeto que iniciou o evento,
neste caso o objeto 'nome'
*/
let isValidName = false;
let isValidAno = false;
let isValidEmail = false;
let isValidSenha = false;

function validarNome(e) {
    //declaração da expressão regular para definir o formato de um nome válido
    const regexNome = /^[A-ZÁ-Ú][a-zá-ú]+ [A-ZÁ-Ú][a-zá-ú]+$/;
    const nomeTrimado = nome.value.trim();

    if (nomeTrimado.match(regexNome) === null) {
        //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputNameHelp
        nomeHelp.textContent = "Formato de nome inválido. Insira Nome e Sobrenome com a primeira letra maiúscula.";
        nomeHelp.style.color = "red";
    }
    else if (nomeTrimado.length < 5) {
        //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputNameHelp
        nomeHelp.textContent = "Nome muito curto. Insira Nome e Sobrenome com a primeira letra maiúscula.";
        nomeHelp.style.color = "red";
    }
    else {
        isValidName = true;
        validateSubmit();
        nomeHelp.textContent = "";
    }
}

/*declarando o evento listener para o campos de texto do form. 
Uma vez o foco seja mudado, será chamada a função validarNome*/

//declaração de função de forma anônima usando uma expressão de função de seta =>

ano.addEventListener('focusout', () => {
    //declaração da expressão regular para definir o formato de um ano válido
    const regexAno = /^[0-9]{4}$/;
    const anoTrimado = ano.value.trim();
    console.log(ano.value);

    if (anoTrimado.match(regexAno) === null) {
        //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputYearHelp
        anoHelp.textContent = "Formato de ano inválido. Insira um ano com 4 dígitos.";
        anoHelp.style.color = "red";
    }
    else {
        //objeto Date
        var date = new Date();
        //obtem o ano atual
        console.log(date.getFullYear());

        if (parseInt(anoTrimado) > 2022) {
            //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputYearHelp
            anoHelp.textContent = `Ano inválido. O ano não pode ser maior que ${2022}.`;
            anoHelp.style.color = "red";
        }
        else if (parseInt(anoTrimado) < 1900) {
            //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputYearHelp
            anoHelp.textContent = `Ano inválido. O ano não pode ser menor que ${1900}.`;
            anoHelp.style.color = "red";
        }
        else {
            isValidAno = true;
            validateSubmit();
            anoHelp.textContent = "";
        }
    }
}
);

email.addEventListener('focusout', validarEmail);

function validarEmail(e) {
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(br|com|net|org)$/
    const emailTrimado = email.value.trim();

    if (emailTrimado.match(regexEmail) === null) {
        emailHelp.textContent = "Email inválido. Insira um email válido que termine em .br, .com, .gov ou .net";
        emailHelp.style.color = "red";
    }
    else {
        isValidEmail = true;
        validateSubmit();
        emailHelp.textContent = "";
    }
}

senha.addEventListener('focusout', validarSenha);

function validarSenha(e) {
    const senhaTrimada = senha.value.trim();

    const nomeSenha = document.querySelector("#inputName").value.toLowerCase().split(' '); // separa nome e sobrenome
    const nomeSenhaTrimado = senhaTrimada.includes(nomeSenha[0]);
    const sobrenomeSenhaTrimado = senhaTrimada.includes(nomeSenha[1]);
    const senhaContemDataNascimento = senhaTrimada.includes(ano);

    if (senhaTrimada.length < 6) {
        senhaHelp.textContent = "Senha inválida. Sua senha deve ter no mínimo 6 caracteres.";
        senhaHelp.style.color = "red";
    }
    else if (senhaTrimada.length > 20) {
        senhaHelp.textContent = "Senha inválida. Sua senha deve ter no máximo 6 caracteres.";
        senhaHelp.style.color = "red";
    }
    else if (nomeSenha[0] !== '' && (nomeSenhaTrimado || sobrenomeSenhaTrimado)) {
        senhaHelp.textContent = "Senha inválida. Sua senha não deve conter seu nome ou sobrenome.";
        senhaHelp.style.color = "red";
    }
    else if (senhaContemDataNascimento) {
        senhaHelp.textContent = "Senha inválida. Sua senha nao deve incluir o ano de nascimento.";
        senhaHelp.style.color = "red";
    }
    else {
        validarForcaDaSenha(senhaTrimada);
        isValidSenha = true;
        validateSubmit();
    }
}

function validarForcaDaSenha(senha) {
    const regexSenhaMinimoNumeros = /(?:[0-9].*){2,}/; // pelo menos dois digitos
    const regexCaracteresEspeciais = /(?=.*[$*&@#])/; // pelo menos dois caracteres especiais
    const regexSenhaMinimoLetrasMaisculas = /(?:[A-Z].*){2,}/; // pelo menos duas letras maiusculas

    let inputResult = document.querySelector("#inputResult");
    let getPassword = document.querySelector("#passStrengthMeter");
    let passwordStrength = 5;
    getPassword.value = passwordStrength;
    console.log("senha", senha);
    console.log("tamanho senha", senha.length);
    console.log("regex caracteres", regexCaracteresEspeciais.test(senha));
    console.log("regex letras maiusculas", regexSenhaMinimoLetrasMaisculas.test(senha));
    console.log("regex numeros", regexSenhaMinimoNumeros.test(senha));

    if (senha.length > 12 && (regexSenhaMinimoNumeros.test(senha)
        && regexCaracteresEspeciais.test(senha)
        && regexSenhaMinimoLetrasMaisculas.test(senha))) {
        inputResult.textContent = "Senha forte.";
        inputResult.style.color = "green";
        getPassword.value = 30;
    }
    else if (senha.length >= 8 && (regexSenhaMinimoNumeros.test(senha) || regexCaracteresEspeciais.test(senha)
    || regexSenhaMinimoLetrasMaisculas.test(senha))) {
        inputResult.textContent = "Senha moderada. Inclua números, caracteres especiais e letras maiusculas.";
        inputResult.style.color = "red";
        getPassword.value = 12;
    }
    else if (senha.length < 8 && (!regexSenhaMinimoNumeros.test(senha) && !regexCaracteresEspeciais.test(senha)) && !regexSenhaMinimoLetrasMaisculas.test(senha)) {
        inputResult.textContent = "Senha fraca. Recomendado ter mais de 12 digitos. Inclua números, caracteres especiais e letras maiusculas.";
        inputResult.style.color = "red";
        getPassword.value = 5;
    }
    else {
        inputResult.textContent = "Senha fraca. Recomendado ter mais de 12 digitos. Inclua números, caracteres especiais e letras maiusculas.";
        inputResult.style.color = "red";
        getPassword.value = 5;
    }
}

function validateSubmit() {
    if (isValidName && isValidAno && isValidEmail && isValidSenha) {
        document.querySelector(".btn").removeAttribute("disabled");
    }
}

function Mudarestado(el) {
    var display = document.getElementById(el).style.display;
    if(display == "none") {
        document.getElementById(el).style.display = 'block';
        
    }
    else{
        document.getElementById(el).style.display = 'none';
        document.querySelector("#cadastrado").style.display = 'block';
        document.querySelector("#usuarioCadastrado").textContent = nome.value;
    }
}