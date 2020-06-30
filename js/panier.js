//ajouter les produits du local storage sur la page panier
function displayCart() {
    let cartItems = localStorage.getItem("produitpanier");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    var total = document.querySelector("#total-products");


    //console.log(cartItems);
    if(cartItems && productContainer){
        productContainer.innerHTML = '';
        cartItems.forEach(item => {
            productContainer.innerHTML += `
            <div class="product">
                <div class="product-name">
                    <ion-icon name="close-circle" class="removeItem" item="${item.id}"></ion-icon>
                    <img src=${item.image} alt="caméra ${item.name}" height="100" width="100">
                    <span>${item.name}</span>
                </div>
                <div class="product-option">
                    <span>${item.lense}</span>
                </div>
                <div class="product-price">
                    <span>${item.price/100},00€</span>
                </div>
                <div class="product-quantity">
                    <ion-icon class="downcrease" item="${item.id}" name="arrow-dropleft-circle"></ion-icon>
                    <span>${item.amount}</span>
                    <ion-icon class="upcrease" item="${item.id}" name="arrow-dropright-circle"></ion-icon>
                </div>
                <div class="product-total">
                    <span>${(item.price * item.amount)/100},00€</span>
                </div>
            </div>
            `
        });
        
    }
    APIdisplay();
    total.innerHTML = '';
        var totalProducts = localStorage.getItem("total");
        total.innerHTML +=`${totalProducts/100},00€`;
}


displayCart();

function APIdisplay() {
    var upAmount = document.querySelectorAll(".upcrease");
    var downAmount = document.querySelectorAll(".downcrease");
    var removeItem = document.querySelectorAll(".removeItem");
    var btnOrder = document.querySelector("#btnorder");
    var product = localStorage.getItem("produitpanier");
    product = JSON.parse(product);

    //ajouter un item
    Array.from(upAmount).forEach(button => {
        button.addEventListener('click', function(e) {
            const id = e.target.getAttribute("item"); 
            product = product.map(val => {
                if (val.id == id) {
                    val.amount++;
                    val.totalPrice = val.price*val.amount;
                }
                return val;
            });
            localStorage.setItem("produitpanier", JSON.stringify(product));
            displayCart();
        });
    });
    //enlever un item
    Array.from(downAmount).forEach(button => {
        button.addEventListener('click', function(e) {
            const id = e.target.getAttribute("item");
            product = product.map(val => {
                if (val.id == id) {
                    val.amount--;
                    val.totalPrice = val.price*val.amount;
                }
                return val;
            });
            localStorage.setItem("produitpanier", JSON.stringify(product));
            displayCart();
        });
    });
    //mettre à 0 un item
    Array.from(removeItem).forEach(button => {
        button.addEventListener('click', function(e) {
            const id = e.target.getAttribute("item");
            product = product.map(val => {
                if (val.id == id) {
                    val.amount = 0;
                    val.totalPrice = val.price*val.amount;
                }
                return val;
            });
            localStorage.setItem("produitpanier", JSON.stringify(product));
            displayCart();
        });
    });
    //si il n'y a pas de produit dans le panier
    if(product === null){
        let nulCart = document.querySelector(".no-products")
        nulCart.innerHTML += `
            <p>Votre panier est vide :(</p>
            <p><a href="../index.html">Retour à la page d'accueil</a></p>
            `
        btnOrder.style.display = "none";
        localStorage.removeItem("total");
    } else {
    //supprimer un produit si <=0
        for (let i=0; i < product.length; i++){
            productAmount = (product[i].amount);
            productId = (product[i].id);
            console.log(productAmount, productId);
            
            if(productAmount <= 0){
                console.log("supprimer le produit");
                localStorage.removeItem("produitpanier");
                window.location.reload();
            }
        }
    //prixTotal
        let priceProduct = 0;
        for (let i=0; i < product.length; i++){ //boucle qui ajoute le prix total des produits
            priceProduct += (product[i].totalPrice);
        }
        localStorage.setItem("total", priceProduct);
    }   
    btnOrder.addEventListener('click', function() {
        let displayForm = document.querySelector("#formulaire");
        displayForm.style.display = "block";
    });
}




