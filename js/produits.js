//Récupération de la chaîne de requête dans l'URL
const queryString_url_id = window.location.search;
console.log(queryString_url_id);

//Méthode 1 avec slice - pour extraire juste l'Id
//const leId = queryString_url_id.slice(1);
//console.log(leId);

//Méthode 2 avec searchParams - pour extraire juste l'Id
const urlSearchParams = new URLSearchParams(queryString_url_id);
console.log(urlSearchParams);

const id = urlSearchParams.get("id");
console.log(id);

//Affichage du produit (de l'objet) qui a été sélectionné par l'id)
//---------2 méthodes possible----------

//--- Méthode 1 : avec fetch et en mettant la valeur de l'id à la fin de  l'url
fetch ('http://localhost:3000/api/cameras/' + id)
.then (function (response) {
    return response.json()
}) 
.then (function (response) {
    displayProduct(response);
}) 
.catch (function (error) {
    console.log(error);
})

function displayProduct (idProduitSelectionner){
//Sélection de la classe ou je vais injecter le code html
const positionElement2 = document.querySelector(".contain-produit");
console.log(positionElement2);

//La structure html pour l'affichage du produit sélectionné
const structureProduit2 = `
    <article class="bloc-produit">
        <img
        src="${idProduitSelectionner.imageUrl}"
        id="imageUrl"
        />
        <div class="text">
            <p id="name">${idProduitSelectionner.name}</p>
            <p id="price">${idProduitSelectionner.price /100}€</p>
        </div>
        <form>
            <label for = "option_produit"></label>
            <select name = "option_produit"  id="option_produit">
                <option selected="lenses"> Lenses </option>
            </select>
        <p id="description">
            ${idProduitSelectionner.description}
        </p>
        <a href="#" id="articleLink" class="achat">
            <button id="btn-envoyer" type="submit" name="ajouter-panier">
                <i class="fas fa-cart-plus fa-2x"></i>
            </button>
        </a>
    </article>`
    ;

  //Le formulaire s'adapte au nombre d'option qu'il y a dans l'objet du produit
  const optionQuantite = idProduitSelectionner.lenses;
  let structureOptions = [];
  console.log(optionQuantite);

 // La boucle for pour afficher toutes les options du produit
    for (let j = 0; j < optionQuantite.length; j++) {
        structureOptions =
         structureOptions +
        `
        <option value="${optionQuantite[j]}">${optionQuantite[j]}</option>
        ` ;
    } 
  console.log(structureOptions);

 // injection html dans la page web produit
    positionElement2.innerHTML = structureProduit2;

// injection html dans la page produit pour le choix des options dans le formulaire
    const positionElement3 = document.querySelector("#option_produit")
    positionElement3.innerHTML = structureOptions;
    console.log(positionElement3);

 //-------- La gestion du panier
//La récupération des données sélectionnées par l'utilisateur et envoie du panier

//Sélection du bouton Ajouter l'article au panier
    const btn_envoyerPanier = document.querySelector("#btn-envoyer");
   console.log(btn_envoyerPanier);

//Ecouter le bouton et l'envoyer au panier
    btn_envoyerPanier.addEventListener("click" , (event)=>{
    event.preventDefault();

    //Sélection de l'id du formulaire
const idForm = document.querySelector("#option_produit");
console.log(option_produit);

 //Mettre le choix de l'utilisateur dans une variable
    const choixForm = idForm.value;
    console.log(choixForm);

    //Récuperation des valeurs du formulaire pour envoyer dans le panier
    let optionsProduit = {
        name : idProduitSelectionner.name,
        id_ProduitSelectionner : idProduitSelectionner._id,
        option_produit : choixForm,
        quantité: 1,
        prix : idProduitSelectionner.price / 100
    };

    console.log(optionsProduit);

//-------Le local Storage-------
//------- Stocker la récupération des valeurs du formulaire dans le local storage-----

//Déclaration de la variable "produitEnregistreDansLocalStorage" dans laquelle on met les key et les values qui sont dans le local storage
let produitEnregistreDansLocalStorage = JSON.parse(localStorage.getItem("produit"));  

//----JSON.parse c'est pour convertir les données au format JSON qui sont dans le local storage en objet JavaScript
console.log(produitEnregistreDansLocalStorage);

 //Fonction fenêtre pop up
    const popupConfirmation = () =>{
        if (window.confirm(`${idProduitSelectionner.name} Lense: ${choixForm} a bien été ajouté au panier 
Consultez le panier OK ou revenir à l'accueil ANNULER`)) {
          window.location.href = "panier.html";  
        } else { 
          window.location.href = "index.html";  
        }
    }

//S'il y a déjà des produits enregistrés dans le localStorage
    if (produitEnregistreDansLocalStorage) {
      //Ajout dans le tableau de l'objet avec les values choisi par l'utilisateur
        produitEnregistreDansLocalStorage.push(optionsProduit);
        
      //Transformation en format JSON et l'envoyer dans la key "produit"
        localStorage.setItem("produit", JSON.stringify(produitEnregistreDansLocalStorage));
        console.log(produitEnregistreDansLocalStorage);
        popupConfirmation();
    } 

//S'il n'y a pas des produits enregistrés dans le local
    else {
        produitEnregistreDansLocalStorage = [];
        produitEnregistreDansLocalStorage.push(optionsProduit);
        localStorage.setItem("produit", JSON.stringify(produitEnregistreDansLocalStorage));
        console.log(produitEnregistreDansLocalStorage);
        popupConfirmation();
    };
    });
}
