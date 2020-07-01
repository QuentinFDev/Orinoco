//création de produit
const descriptionproduit = document.getElementById("descriptionproduit");
const prix = document.getElementById("prix");
var lentille = document.getElementById("choixlentilles")

//boutton ajouter au panier
let btnAddCart = document.getElementById("btnaddcart");

//nombre de produits dans le panier
var nbrProducts = document.querySelector("numberofproducts");

//on récupère l'id du produit
var urlParams = new URLSearchParams(window.location.search);
var IdProduct =urlParams.get("product");

var camera; 


// connection avec les produits sur le serveur 
async function produits(url) {
    let result = await fetch(url)
    return result.json()
}
produits('http://localhost:3000/api/cameras/'+ IdProduct).then(data => {
    camera = data;
    let result;
    if ( IdProduct === camera._id) {
        document.title = "Caméra vintage " + camera.name;
        result = "afficher le produit";
        //mise en place de l'HTML
        descriptionproduit.innerHTML +=
            `
            <img class="imageproduit" src="${camera.imageUrl}"  alt="photo de la caméra" width="400" height="400">
            <div class="libelle">
                <h3>${camera.name}</h3>
                <p class="ref">référence: ${camera._id}</p>
                <p>${camera.description}</p>    
            </div>    
            `
        lentille.innerHTML +=
        `
        <option value="">Choix de lentille disponible:</option>
        `
        //boucle pour choix de lentilles
        camera.lenses.forEach(lenses => {
            lentille.innerHTML +=
            `
                <option value="${lenses}">${lenses}</option>
            `
        });
        prix.innerHTML +=
        `
            <p>${camera.price/100},00€</p>
        `
    } 
    else {
        result = "erreur"
    }
    return result;      
});

btnAddCart.addEventListener('click', event => {
    var error_message = document.getElementById("error_lense");
    var amount = 1;
    var totalPrice = camera.price*amount;
    var lense = document.getElementById("choixlentilles").value;
    var newCamera = {};
    var productCart = localStorage.getItem("produitpanier");//récupère les produits déjà dans le panier

    if (productCart !==null){
        productCart = JSON.parse(productCart);
        for (let i=0; i < productCart.length; i++){
            productCartId = (productCart[i].id);
            productCartLense =(productCart[i].lense);
            productCartAmount =(productCart[i].amount);
            console.log(productCartId, productCartLense, productCartAmount);
        }
    } 
    else {
        productCart = [];
    }

    newCamera["image"] = camera.imageUrl;
    newCamera["id"] = camera._id;
    newCamera["name"] = camera.name;
    newCamera["amount"] = amount;
    newCamera["lense"] = lense;
    newCamera["price"] = camera.price;
    newCamera["totalPrice"] = totalPrice;
    error_message.style.padding = "10px";

    if(lense === ""){
        text = "Merci de selectionner une lentille";
        error_message.innerHTML = text;
        return false;
    }
    let isInCart = false;
    productCart = productCart.map(prod => {
        if (prod.id == camera._id && prod.lense == lense){
            isInCart = true;
            prod.amount++;
        }
        return prod;
    });
    if(!isInCart){
        productCart.push(newCamera)
    }
    localStorage.setItem("produitpanier", JSON.stringify(productCart));
    document.location.href="../panier/panier.html"
});