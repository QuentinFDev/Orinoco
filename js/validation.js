var contact = localStorage.getItem('contact');
var products = localStorage.getItem('products')
contact = JSON.parse(contact);
products = JSON.parse(products);

fetch('http://localhost:3000/api/cameras/order', { //fonction qui envoi avec la methode POST la demande sur le serveur
    method: 'post',
    headers: { "Content-type": "application/JSON; charset=UTF-8"},
    body: JSON.stringify({contact:contact,products:products}) 
})
.then(function(response) {
    return response.json();
})
.then(function(data){
    dataProducts = data.products;
    if(dataProducts === undefined){
        alert('une erreur c\'est produite, merci de rééssayer ou contactez le service client')
        document.location.href="../index.html"
    }
    else
    localStorage.setItem("orderId", data.orderId); // récupère l'order ID donné par le serveur
    let orderPrice = 0;
    for (let i=0; i < dataProducts.length; i++){ //boucle qui ajoute le prix total des produits
        orderPrice += data.products[i].price;
    }
    localStorage.setItem("orderPrice", orderPrice); // récupère le prix total des produits
    displayRecap()
})

function displayRecap() {
    let orderPrice = localStorage.getItem("total");
    let orderId = localStorage.getItem("orderId");
    let RecapContainer = document.querySelector(".recap");

    RecapContainer.innerHTML += `
    <p>Votre commande a bien été transmise</p>
    <p>Un email vous a été envoyé</p>
    <p>Numéro de commande: <span>${orderId}</span></p>
    <p class="responsive">${orderId}</p>
    <p>Le Total de votre commande est de : <span>${orderPrice/100},00€</span></p>
    <p class="responsive">${orderPrice/100},00€</p>
    `
    localStorage.clear();
}


function returnHome() {
    let orderId = localStorage.getItem("orderId");
    let btnHome = document.querySelector(".btn-accueil");
    if(btnFunction | orderId == undefined) {
        var btnFunction = btnHome.addEventListener('click', function(e) {
        document.location.href="../index.html"
        })
    }
}
returnHome()