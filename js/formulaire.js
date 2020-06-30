function displayCart() {
    let formItems = localStorage.getItem("produitpanier");
    formItems = JSON.parse(formItems);
    let productsContainer = document.querySelector("#recapcmd");
    //console.log(formItems);

    if(formItems && productsContainer){
        productsContainer.innerHTML = '';
        formItems.forEach(item => {
            productsContainer.innerHTML += `
            <div class="form_product_container">
                <div class="form_product_name">
                    <p>${item.name} avec objectif ${item.lense}</p>
                </div>
                <div class="form_product_quantity">
                    <p>quantité: ${item.amount}</p>
                </div>
                <div class="form_product_totalprice">
                    <p class="total_produit">Total:${item.amount*item.price},00€</p>
                </div>
            </div>
            ` 
        });
        
    }
}

displayCart();



/***************************************************************************************/
/******************************FORMULAIRE DE CONTACT************************************/
/***************************************************************************************/

function validation(e){
    var lastname = document.getElementById("lastname").value;
    var firstname = document.getElementById("firstname").value;
    var city = document.getElementById("city").value;
    var address = document.getElementById("address").value;
    var email = document.getElementById("email").value;
    var error_message = document.getElementById("error_message");
    var text;
    error_message.style.padding = "10px";


    if(firstname.length <2){
        text = "Merci d'entrer un prénom valide";
        error_message.innerHTML = text;
        return false;
    }   
    if(lastname.length <2){
        text = "Merci d'entrer un nom valide";
        error_message.innerHTML = text;
        return false;
    }
    if(address.length <5){
        text = "Merci d'entrer une adresse valide";
        error_message.innerHTML = text;
        return false;
    }
    if(city.length <2){
        text = "Merci d'entrer une ville valide";
        error_message.innerHTML = text;
        return false;
    }
    if(email.indexOf("@") == -1 || email.length <5 || email.indexOf(".") ==-1){
        text = "Merci d'entrer une adresse email valide";
        error_message.innerHTML = text;
        return false;
    }
    return true;
}
validation()


var form = document.querySelector('#myform');

form.addEventListener('submit', function(e) {
    e.preventDefault() //bloc le comportement du formulaire
    if(validation() == true){
        var contactForm = {};
        var saveProducts = localStorage.getItem("produitpanier");
        contactForm["firstName"] = firstname.value;
        contactForm["lastName"] = lastname.value;
        contactForm["address"] = address.value;
        contactForm["city"] = city.value;
        contactForm["email"] = email.value;
        localStorage.setItem("contact", JSON.stringify(contactForm));

        saveProducts = JSON.parse(saveProducts);
        saveProducts = saveProducts.map(save =>{
            save = save.id/*+save.amount*/
            return save;
        })
        localStorage.setItem("products", JSON.stringify(saveProducts));
        document.location.href="./validation.html";
    }
});


