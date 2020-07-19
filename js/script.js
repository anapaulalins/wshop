const slide = document.querySelectorAll('.slide')

const btnMenu = document.querySelector('#btn-menu')
const menu = document.querySelector('.menu')
const arrMenu = document.querySelectorAll('.menu ul li')

const bestSellersContent = document.querySelector('.best-sellers-content')

const btnLogin = document.querySelector('.login')
const loginOut = document.querySelector('.login-out')
const nameLoginUser = document.querySelector('.login-out span')
const btnSingOut = document.querySelector('#btn-sing-out')

const bagCount = document.querySelector('#count-bag')

const btnBag = document.querySelector('#btn-bag')
const bagContainer = document.querySelector('.bag-container')
const bagContent = document.querySelector('.bag-content')

const totalValueBag = document.querySelector('#total-bag-value')

const colors = ['#fdfd96', '#afff94', '#ff94ff', '#ff94b2', '#B0E0E6']
let index = 0
let userSelect

function getUser() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            btnLogin.classList.add('hide')
            loginOut.classList.add('active')
            nameLoginUser.innerHTML = `Olá, ${user.displayName}`

            userSelect = db.collection("users").doc(user.email);

            userSelect.get().then(doc => console.log(doc.data()))

        } else {
            // User is signed out.
            // ...
        }
        renderCount()
        createElementBag()
        renderTotal()
    });

}

btnSingOut.addEventListener('click', () => {
    firebase.auth().signOut().then(function () {
        btnLogin.classList.remove('hide')
        loginOut.classList.remove('active')
        window.location.reload('index.html')
    }).catch(function (error) {
        // An error happened.
    });
})


btnLogin.addEventListener('click', () => {
    window.location.replace('login.html')
})

bestSellersContent.addEventListener('click', (event) => {
    getElement(event)
    renderCount()
    createElementBag()
    renderTotal()
})


btnBag.addEventListener('click', () => {
    bagContainer.classList.toggle('active')
})


arrMenu.forEach((element, index) => {
    element.style.backgroundColor = colors[index]
})


btnMenu.addEventListener('click', () => {
    menu.classList.toggle('active')
})

bagContent.addEventListener('click', (event) => {
    removeElement()
})

function removeElement() {
    if (event.target.id === 'remove-item-bag') {
        let elementId = event.target.parentElement.parentElement.dataset.dataId
        userSelect.get().then((doc) => {
            let selectedElement = doc.data().bag.find(e => e.id === elementId)
            userSelect.update({
                bag: firebase.firestore.FieldValue.arrayRemove(selectedElement)
            });
            renderCount()
            renderTotal()
        })
        event.target.parentElement.parentElement.style.display = 'none'
    }
}


function createElementBag() {
    clear(bagContent)
    userSelect.get().then(doc => {
        let arrBag = doc.data().bag

        arrBag.forEach(e => {
            const bagItem = document.createElement('div')
            bagItem.classList.add('bag-item')
            bagItem.dataset.dataId = e.id
            bagItem.innerHTML = `
            <img src="${e.img}" alt="">
                <div class="bag-item-details">
                    <span id="name-product">${e.name}</span>
                    <span id="price-product">$${e.price}</span>
                    <span id="remove-item-bag">remove</span>
                </div> `
            bagContent.appendChild(bagItem)
            console.log(e)
        })
    })
}

function renderTotal() {
    let total = 0
    userSelect.get().then(doc => {
        let arrBag = doc.data().bag
        if (arrBag.length === 0) { totalValueBag.innerHTML = `total: $${0}` }
        arrBag.forEach(e => {
            total += (e.price * e.amount)
            totalValueBag.innerHTML = `total: $${parseFloat(total).toFixed(2)}`
            console.log(parseFloat(total).toFixed(2))
        })
    })
}

function renderCount() {
    userSelect.get().then(doc => bagCount.innerHTML = doc.data().bag.length)
}

function getElement(event) {
    let img
    let name
    let price

    if (event.target.tagName.toLowerCase() === 'i') {
        let productSelected = event.target.parentElement.parentElement
        Array.from(productSelected.children).forEach(e => {
            if (e.tagName.toLowerCase() === 'img') {
                let src = e.src
                let index = src.indexOf('img')
                img = src.slice(index)
            }
            if (e.className.toLowerCase() === 'product-details') {
                let productDetails = e.children
                Array.from(productDetails).forEach(e => e.id === 'name-product' ? name = e : price = e)


            }
        })
    }
    userSelect.update({
        bag: firebase.firestore.FieldValue.arrayUnion(createObj(name.textContent, price.textContent.substring(1), img))
    });

}

function createObj(name, price, img) {
    return {
        id: Date.now().toString(),
        name: name,
        price: Number(price),
        img: img,
        amount: 1
    }
}

function next() {
    if (index == slide.length - 1) {
        index = 0
    } else {
        index++
    }
    changeSlide()
}
function changeSlide() {
    Array.from(slide).forEach(e => e.classList.remove('active'))
    slide[index].classList.add('active')
}

function clear(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

setInterval(() => {
    next()
}, 5000)


getUser()
changeSlide()

