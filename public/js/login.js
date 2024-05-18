// const formLogin = document.querySelector('#form_login');

// formLogin.addEventListener('submit',(event)=>{
//     event.preventDefault(); // não permit que haja o submit

//     let emailVar = document.querySelector('#email_input').value
//     let senhaVar = document.querySelector('#senha_input').value;


//     let erro = '';

//     if (emailVar == "" || senhaVar == "") {
//         erro = 'Preencha todos os campos!'
//         mostrarErro(erro);
//         return false;
//     }


//     console.log("FORM USUÁRIO: ", emailVar);
//     console.log("FORM SENHA: ", senhaVar);

//     fetch("/", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             emailServer: emailVar,
//             senhaServer: senhaVar
//         })
//     }).then(function (resposta) {

//         if (resposta.ok) {
//             console.log(resposta);

//             resposta.json().then(json => {
//                 console.log(json);
//                 console.log(JSON.stringify(json));
//                 sessionStorage.ID_USUARIO = json.id;

//                 if(sessionStorage.ID_USUARIO > 0){
//                     setTimeout(function () {
//                         window.location = "/dashboard";
//                     }, 1000); // apenas para exibir o loading
//                 }else{
//                     erro = 'Email ou Senha inválida. Tente novamente!'
//                     mostrarErro(erro);
//                 }


//             });

//         } else {

//             console.log("Houve um erro ao tentar realizar o login!");
//         }

//     }).catch(function (erro) {
//         console.log(erro);
//     })

//     return false;
// })

// function mostrarErro(erro){
//     // coloca os erros no modal se houver erro=
//     var modalErro = document.querySelector('#modalErro');
//     modalErro.style.display = 'flex'; // ativa o modal

//     var mensagemErro = document.querySelector('#modal_erros');

//     console.log(mensagemErro);
//     mensagemErro.innerHTML = `<p style="color: red; text-align: center" >${erro}</p>`;
//     console.log(erro)

//     modalErro.addEventListener('click', ()=>{
//         modalErro.style.display = 'none'
//     })

//     setTimeout(function () {
//         modalErro.style.display = 'none';
//     }, 3000); // espera 3 segundos para tirar o modal da tela
// }