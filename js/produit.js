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
        //console.log(data);
        camera = data;
        let result;
                if ( IdProduct === camera._id) {
                    result = "afficher le produit";
                    //console.log(result);
        //mise en place de l'HTML
        descriptionproduit.innerHTML += `
            <img class="imageproduit" src="${camera.imageUrl}"  alt="photo de la caméra" width="400" height="400">
            <div class="libelle">
                <h3>${camera.name}</h3>
                <p class="ref">référence: ${camera._id}</p>
                <p>${camera.description}</p>    
            </div>    
        `
        lentille.innerHTML += `
        <option value="">Choix de lentille disponible:</option>
                    
        `
        //boucle pour choix de lentilles
        camera.lenses.forEach(lenses => {
            //console.log(lenses);
            lentille.innerHTML += `
                <option value="${lenses}">${lenses}</option>
            `
            
            
            
        });
        prix.innerHTML += `
            <p>${camera.price/100},00€</p>
        `
        } else {
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

    //console.log(newCamera);
    //console.log("Produit", JSON.stringify(newCamera));
    let cartItems = localStorage.getItem("produitpanier");
    if (cartItems == null) {
        cartItems = []
    } else {
        cartItems = JSON.parse(cartItems);
    }
    cartItems.push(newCamera)
    localStorage.setItem("produitpanier", JSON.stringify(cartItems));
    document.location.href="../panier/panier.html"
    
});




