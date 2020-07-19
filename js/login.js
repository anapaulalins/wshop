const btnEnter = document.querySelector('#btn-login-enter')
const btnCadastro = document.querySelector('#btn-cadastro')

const emailUser = document.querySelector('#input-login-user-email')
const passwordUser = document.querySelector('#input-login-user-password')

btnCadastro.addEventListener('click', () => {
    window.location.replace('cadastro.html')
})

btnEnter.addEventListener('click', () => {
    firebase.auth().signInWithEmailAndPassword(emailUser.value, passwordUser.value)
        .then(() => {
            window.location.replace('index.html')
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            alert(errorMessage)
        });
})