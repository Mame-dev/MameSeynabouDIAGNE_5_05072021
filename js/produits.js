function affichageProduit() {
    //Récupération de la chaîne de requête dans l'URL
    const queryString_url_id = window.location.search;

    //Méthode 2 avec searchParams - pour extraire juste l'Id
    const urlSearchParams = new URLSearchParams(queryString_url_id);
    const id = urlSearchParams.get("id");

    //Affichage du produit (de l'objet) qui a été sélectionné par l'id)
    //--- Méthode 1 : avec fetch et en mettant la valeur de l'id à la fin de  l'url
    fetch('http://localhost:3000/api/cameras/' + id)
        .then(function (response) {
            return response.json()
        })
        .then(function (response) {
            displayProduct(response);
        })
        .catch(function (error) {
            console.log(error);
        })
};
affichageProduit();

function displayProduct(idProduitSelectionner) {
    //Sélection de la classe css ou je vais injecter le code html
    const positionElement1 = document.querySelector(".container");
    //La structure html pour l'affichage du produit sélectionné
    const structureProduit2 = `
    <article class="card2">
        <div class="row g-0">
            <div class="col-sm-5">  
                <img
                src="${idProduitSelectionner.imageUrl}"
                id="imageUrl" class="card-img-top h-100"
                />
            </div>
            <div class="col-sm-7">
                <div class="card-block">
                    <h5 id="name">${idProduitSelectionner.name}</h5>
                    <h5 id="price">${idProduitSelectionner.price /100}€</h5>
                </div>
                <form>
                    <label for = "option_produit">Lenses</label>
                    <select name = "option_produit"  class="btn btn-success" id="option_produit">
                        <option selected="lenses"> Lenses </option>
                    </select>
                    <label for = "quantite_produit">Qté</label>
                    <select name = "quantite_produit"  class="btn btn-success" id="quantite_produit">
                    </select>
                </form>
                <p id="description" class="card-text">
                    ${idProduitSelectionner.description}
                </p>
                <a href="#" id="articleLink" class="achat float-right">
                    <button id="btn-envoyer" class="btn btn-outline-success btn-lg btn-block" type="submit" name="ajouter-panier" >
                        <i class="fas fa-cart-plus fa-2x"></i>
                    </button>
                </a>
            </div>
        </div>
    </article>
    </div>
    `;

    // injection html dans la page web produit
    positionElement1.innerHTML = structureProduit2;

    function structureOptions() {
        //Le formulaire s'adapte au nombre d'option qu'il y a dans l'objet du produit
        const optionQuantite = idProduitSelectionner.lenses;
        let structureOptions = [];
        // La boucle for pour afficher toutes les options du produit
        for (let j = 0; j < optionQuantite.length; j++) {
            structureOptions =
                structureOptions +
                `
        <option value="${optionQuantite[j]}">${optionQuantite[j]}</option>
        `;
        }
        // injection html dans la page produit pour le choix des options dans le formulaire
        const positionElement2 = document.querySelector("#option_produit")
        positionElement2.innerHTML = structureOptions;
    };
    structureOptions();

    //Choisir la quantité de produits
    const structureQuantité = `
       <option value="1">1</option>
       <option value="2">2</option>
       <option value="3">3</option>
       <option value="4">4</option>
       `;
    // Afficher les quantités
    const positionElementQuantite = document.querySelector("#quantite_produit")
    positionElementQuantite.innerHTML = structureQuantité;

    //-------- La gestion du panier ----------------
    function btn_envoyerPanier() {
        /*La récupération des données sélectionnées par l'utilisateur et envoie du panier*/
        //Sélection du bouton envoyer l'article au panier
        const btn_envoyerPanier = document.querySelector("#btn-envoyer");
        //Ecouter le bouton et l'envoyer au panier
        btn_envoyerPanier.addEventListener("click", (event) => {
            event.preventDefault();
            //Mettre le choix de l'utilisateur dans une variable
            const choixQuantite = positionElementQuantite.value;
            //Sélection de l'id du formulaire
            const idForm = document.querySelector("#option_produit");
            //Mettre le choix de l'utilisateur dans une variable
            const choixForm = idForm.value;
            //Récuperation des valeurs du formulaire pour envoyer dans le panier
            let optionsProduit = {
                name: idProduitSelectionner.name,
                id_ProduitSelectionner: idProduitSelectionner._id,
                option_produit: choixForm,
                quantité: choixQuantite,
                prix: (idProduitSelectionner.price * choixQuantite) / 100,
            };

            //------- Le local Storage -------
            //------- Stocker la récupération des valeurs du formulaire dans le local storage -----
            //Déclaration de la variable "camera" dans laquelle on met les key et les values qui sont dans le local storage
            //----JSON.parse c'est pour convertir les données au format JSON qui sont dans le local storage en objet JavaScript
            let camera = JSON.parse(localStorage.getItem("produit"));
            //Fonction fenêtre pop up
            const popupConfirmation = () => {
                if (window.confirm(`${idProduitSelectionner.name} Lense: ${choixForm} a bien été ajouté au panier 
Consultez le panier OK ou revenir à l'accueil ANNULER`)) {
                    window.location.href = "panier.html";
                } else {
                    window.location.href = "index.html";
                }
            }

            function produit() {
                //S'il y a déjà des produits enregistrés dans le localStorage
                if (camera) {
                    //Ajout dans le tableau de l'objet avec les values choisi par l'utilisateur
                    camera.push(optionsProduit);
                    //Transformation en format JSON et l'envoyer dans la key "produit"
                    localStorage.setItem("produit", JSON.stringify(camera));
                    console.log(camera);
                    popupConfirmation();
                }
                //S'il n'y a pas des produits enregistrés dans le local
                else {
                    camera = [];
                    camera.push(optionsProduit);
                    localStorage.setItem("produit", JSON.stringify(camera));
                    console.log(camera);
                    popupConfirmation();
                }
            };
            produit();
        });
    };
    btn_envoyerPanier();
}