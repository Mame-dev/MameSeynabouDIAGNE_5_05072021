//Déclaration de la variable "produitEnregistreDansLocalStorage" dans laquelle on met les key et les values qui sont dans le local storage
let produitEnregistreDansLocalStorage = JSON.parse(localStorage.getItem("produit"));  

//----JSON.parse c'est pour convertir les données au format JSON qui sont dans le local storage en objet JavaScript
console.log(produitEnregistreDansLocalStorage);

//----------- L'AFFICHAGE  DES PRODUITS DU PANIER----------
//Sélection de la classe ou je vais injecter le code HTML
const positionElement3 = document.querySelector("#container");
console.log(positionElement3);

let structureProduitPanier = [];
   
//Si le panier est vide : afficher le panier est vide
if (produitEnregistreDansLocalStorage === null || produitEnregistreDansLocalStorage == 0) {
const panierVide = `
    <div class="container-panier-vide">
        <div> Le panier est vide </div>
    </div>
`;
    positionElement3.innerHTML = panierVide;
    console.log(panierVide);
} 

//Si le panier n'est pas vide : afficher les produits dans le localStorage
else{
    for (k = 0; k < produitEnregistreDansLocalStorage.length; k++) {
        console.log(produitEnregistreDansLocalStorage);

        structureProduitPanier = 
        structureProduitPanier + 
        `
        <table class="table">
            <tbody class="panier__total">
                <tr>
                    <td>${produitEnregistreDansLocalStorage[k].name} - ${produitEnregistreDansLocalStorage[k].option_produit}</td>
                    <td>${produitEnregistreDansLocalStorage[k].price} €</td>
                    <td class ="btn-supprimer"><i class="fas fa-trash-alt"></i></td>
                </tr>
            </tbody>
        </table>
        `;
    }
    if (k == produitEnregistreDansLocalStorage.length) {
        // injection html dans la page web produit
        positionElement3.innerHTML = structureProduitPanier;    
    }
}

//--------- Gestion du bouton supprimer l'article ---------
// Sélection des références de tous les boutons btn-supprimer
let btn_supprimer = document.querySelectorAll(".btn-supprimer");
console.log(btn_supprimer);

for (let l = 0; l < btn_supprimer.length; l++) {
    btn_supprimer[l].addEventListener("click" , (event)=>{
    event.preventDefault();
    
    //Sélection de l'id du produit qui va être supprimer en cliquant sur le bouton
    let id_selectionner_suppression = produitEnregistreDansLocalStorage[l].id_ProduitSelectionner;
    console.log(id_selectionner_suppression);

    //avec la méthode filter je sélectionne les éléments à garder et je supprime l'élément ou le btn suppr a été cliqué
    produitEnregistreDansLocalStorage = produitEnregistreDansLocalStorage.filter(
        (el) => el.id_ProduitSelectionner !== id_selectionner_suppression
    );
    console.log(produitEnregistreDansLocalStorage);

    //On envoie le variable dans le local Storage
    //Transformation en format JSON et l'envoyer dans la key "produit"
    localStorage.setItem(
        "produit", 
        JSON.stringify(produitEnregistreDansLocalStorage)
    );
    // Alerte pour avertir que le produit a été supprimer et rechargement de la page
    alert("Ce produit a été supprimer du panier");
    window.location.href = "panier.html";
    });
}

//--------- Le bouton pour vider le panier ---------
// Le code HTML du bouton à afficher dans la page
const btn_tout_supprimer_panier_html = `
<button class= "btn-tout-supprimer-panier> Vider le panier </button>
`

//Insertion du bouton dans le HTML du panier
positionElement3.insertAdjacentHTML

