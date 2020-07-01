//création de la constante pour récuperer les cameras sur le fichier Json du serveur

const camerasOrinoco = document.getElementById("produits");

// connection avec les produits sur le serveur 

var API = "http://localhost:3000/api/cameras";

async function produits(url) {
    let result = await fetch(url)
    return result.json()
}
produits(API).then(cameras => {
    cameras.forEach(camera => {
        //mise en place de l'HTML
        camerasOrinoco.innerHTML +=
        `
        <article class="produit ${camera._id}">
            <a href="./produits/produit.html?product=${camera._id}">
                <img class="imageproduit" src="${camera.imageUrl}"  alt="photo de la caméra" width="200" height="200">
                <div class="libelle">
                    <h3>${camera.name}</h3>
                    <p>${camera.description}</p>
                </div>
                <div class="prix">
                    <p>${camera.price/100},00€</p>
                </div>
                </a>
            </article>
        `
    }) 
})