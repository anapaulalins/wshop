const btnConcluir = document.querySelector('#btn-concluir')

const userEmail = document.querySelector('#input-user-email')
const userName = document.querySelector('#input-user-name')
const userPassword = document.querySelector('#input-user-password')


btnConcluir.addEventListener('click', () => {
    firebase.auth().createUserWithEmailAndPassword(userEmail.value, userPassword.value)
        .then(() => {
            let user = firebase.auth().currentUser;
            user.updateProfile({
                displayName: userName.value,
            })
            db.collection("users").doc(userEmail.value).set({
                name: userName.value,
                email: userEmail.value,
                password: userPassword.value,
                bag: []
            }).then(() => {
                alert('Usuario cadastrado com sucesso!')
                window.location.replace('login.html')
            })
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage)
        });
})