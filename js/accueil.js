//création de la constante pour récuperer les cameras sur le fichier Json du serveur

const camerasOrinoco = document.getElementById("produits");


// connection avec les produits sur le serveur 

async function produits(url) {
    let result = await fetch(url)
    return result.json()
}
    produits('http://localhost:3000/api/cameras').then(cameras => {
        console.log(cameras)
        cameras.forEach(camera => {
            console.log(camera)
            
//mise en place de l'HTML
        camerasOrinoco.innerHTML += `
    <article class="produit">
        <a href="./produits/produit.html">
            <img class="imageproduit" src="${camera.imageUrl}"  alt="photo de la caméra" width="200" height="200">
            <div class="libelle">
                <h3>${camera.name}</h3>
                <p>${camera.description}</p>
            </div>
            <div class="prix">
                <p>${camera.price}€</p>
            </div>
        </a>
    </article>
    `
    }) 
})

