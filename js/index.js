/*let container = document.getElementById('row container');

// Aller cherche URL
fetch('http://localhost:3000/api/cameras')
//Executer les fonctions avec then
.then(function (response) {
    return response.json();
})
// Récuperation des caméras
.then(function (cameras) {
    //verifier que le fetch marche
    console.log(cameras);
    cameras.map(function (camera) {
        console.log(camera);
        console.log(camera.name);
        //creation nouveau élément div
        /*let bloc = document.createElement('bloc');
        //let bloc = document.getElementById('bloc');
        //contenu élément div
        bloc.innerHTML +=
        `<div class="col-sm-6 bloc">
            <img src="http://localhost:3000/images/vcam_1.jpg" alt="Zurss 50S">
            <div class="col text">
                <h2 class="nom">${'produit.name'}</h2>
                <h2 class="prix">price€</h2>
            </div>
            <p class="description">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                et dolore magna aliqua.
            </p>
            <a href="Zurss-50S.html" class="achat">
                <button type="button">
                    <i class="fas fa-cart-plus fa-2x"></i>
                </button>
            </a>
        </div>`
        //Ajout élément
        container.appendChild(bloc);
    })
    
})*/

//Fonction principale, gere le temps de telechargement
(async function() {
    const articles = await getArticles()
    //Creation de la boucle des articles
    for (article of articles) {
        displayArticle(article)
    }
    })()
    async function getArticles(){
    try {
        //Appelle la reponse de l'api
        const httpBodyResponse = await fetch("http://localhost:3000/api/cameras")
        const articles = await httpBodyResponse.json()
        return articles
    } catch (error) {
        alert(error)
    }
}
    //Gere laffichage des produits
    function displayArticle(article){
    //Appelle le temmplate
    const templateElt = document.getElementById("templateArticle")
    //Clone le template
    const cloneElt = document.importNode(templateElt.content, true)

    cloneElt.getElementById("name").textContent = article.name
    cloneElt.getElementById("price").textContent = `${article.price / 100}.00 €`
    cloneElt.getElementById("description").textContent = article.description
    cloneElt.getElementById("imageUrl").src = article.imageUrl
    cloneElt.getElementById('articleLink').href = `product.html?id=${article._id}`
    //Affiche lelement enfant clone
    
    document.getElementById("main").appendChild(cloneElt)
}
