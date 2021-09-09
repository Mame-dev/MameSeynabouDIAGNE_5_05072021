//Fonction principale, gere le temps de telechargement
(async function () {
    const articles = await getArticles()
    //Creation de la boucle des articles
    for (article of articles) {
        displayArticle(article)
    }
})()

async function getArticles() {
    try {
        //Appelle la reponse de l'api
        const httpBodyResponse = await fetch("http://localhost:3000/api/cameras")
        const articles = await httpBodyResponse.json()
        return articles
    }
    // Gérer les erreurs
    catch (error) {
        alert(error)
    }
}
//Gere laffichage des produits
function displayArticle(article) {
    //Récupérer le temmplate
    const templateElt = document.getElementById("templateArticle")
    //Cloner le template
    const cloneElt = document.importNode(templateElt.content, true)

    cloneElt.getElementById("name").textContent = article.name
    cloneElt.getElementById("price").textContent = `${article.price / 100}.00 €`
    cloneElt.getElementById("description").textContent = article.description
    cloneElt.getElementById("imageUrl").src = article.imageUrl
    cloneElt.getElementById('articleLink').href += `?id=${article._id}`
    //Intégrer les élèments cloner avec appendChild
    document.getElementById("main").appendChild(cloneElt)
}