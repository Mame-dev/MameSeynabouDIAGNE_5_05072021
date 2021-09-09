//Déclaration de la variable "produitEnregistreDansLocalStorage" dans laquelle on met les key et les values qui sont dans le local storage
let produitEnregistreDansLocalStorage = JSON.parse(localStorage.getItem("produit"));
//----JSON.parse c'est pour convertir les données au format JSON qui sont dans le local storage en objet JavaScript
console.log(produitEnregistreDansLocalStorage);

//----------- L'AFFICHAGE  DES PRODUITS DU PANIER----------
//Sélection de la classe ou je vais injecter le code HTML
const positionElement2 = document.querySelector("#container");

let structureProduitPanier = [];

//Si le panier est vide : afficher le panier est vide
if (produitEnregistreDansLocalStorage === null || produitEnregistreDansLocalStorage == 0) {
    const panierVide = `
    <div class="container-panier-vide">
        <div> Le panier est vide </div>
    </div>
`;
    positionElement2.innerHTML = panierVide;
}

//Si le panier n'est pas vide : afficher les produits dans le localStorage
else {
    for (k = 0; k < produitEnregistreDansLocalStorage.length; k++) {

        structureProduitPanier =
            structureProduitPanier +
            `<table class="table container">
                <tbody class="panier__total">
                    <tr>
                        <td>${produitEnregistreDansLocalStorage[k].name} - ${produitEnregistreDansLocalStorage[k].option_produit}</td>
                        <td>${produitEnregistreDansLocalStorage[k].prix} €</td>
                        <td class ="btn-supprimer"><i class="fas fa-trash-alt"></i></td>
                    </tr>
                </tbody>
            </table>
            `;
    }
    if (k == produitEnregistreDansLocalStorage.length) {
        // injection html dans la page web produit
        positionElement2.innerHTML = structureProduitPanier;
    }
}

//--------- Gestion du bouton supprimer l'article ---------
// Sélection des références de tous les boutons btn-supprimer
let btn_supprimer = document.querySelectorAll(".btn-supprimer");

for (let l = 0; l < btn_supprimer.length; l++) {
    btn_supprimer[l].addEventListener("click", (event) => {
        event.preventDefault();

        //Sélection de l'id du produit qui va être supprimer en cliquant sur le bouton
        let id_selectionner_suppression = produitEnregistreDansLocalStorage[l].id_ProduitSelectionner;

        //Avec la méthode filter je sélectionne les éléments à garder et je supprime l'élément ou le btn suppr a été cliqué
        produitEnregistreDansLocalStorage = produitEnregistreDansLocalStorage.filter(
            (el) => el.id_ProduitSelectionner !== id_selectionner_suppression
        );

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
<button class= "btn btn-outline-danger btn-sm btn-tout-supprimer-panier"> Vider le panier </button>
`
//Insertion du bouton dans le HTML du panier
positionElement2.insertAdjacentHTML("beforeend", btn_tout_supprimer_panier_html);

// La sélection de la référence du bouton "btn-tout-supprimer-panier"
const btn_tout_supprimer_panier = document.querySelector(".btn-tout-supprimer-panier")

// Suppression de la key "produit" du local Storage pour vider entierement le panier
btn_tout_supprimer_panier.addEventListener("click", (event) => {
    event.preventDefault();

    //.removeItem pour vider le local storage
    localStorage.removeItem("produit");

    //alert "Le panier a été vidé"
    alert("Le panier a été vidé");

    //rechargement de la page
    window.location.href = "panier.html";
});

//--------- Le montant total du panier ---------
//Déclaration de la variable pour pouvoir y mettre les prix qui sont présents dans le panier
let prixTotalCalcul = [];
//Aller chercher les prix dans le panier
for (let m = 0; m < produitEnregistreDansLocalStorage.length; m++) {
    let prixProduitsDansLePanier = produitEnregistreDansLocalStorage[m].prix;
    //Mettre les prix du panier dans la variable "prixTotalCalcul"
    prixTotalCalcul.push(prixProduitsDansLePanier)
}

//Additionner les prix qu'il y a dans le tableau de la variable "prixTotalCalcul" avec la méthode .reduce
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const prixTotal = prixTotalCalcul.reduce(reducer, 0)

//Le code HTML du prix total à afficher 
const affichagePrixHtml = `
<div class= "affichage-prix-html"> Le prix total est de : ${prixTotal} € </div>
`
//Injection html dans la page panier après le dernier enfant
positionElement2.insertAdjacentHTML("beforeend", affichagePrixHtml);

//----------------- Le formulaire de commande ----------

const affichageFormulaireHtml = () => {
    // Sélection élément du DOM pour le positionnement du formulaire
    const positionElement4 = document.querySelector("#container");

    const structureFormulaire = `
    <form class="container">
            <div class="form-group">
                <div class="row">
                    <div class="col-md-6">
                        <label for="lastname">Nom</label>
                        <input type="text" name="lastName" class="form-control" id="lastName" placeholder="Entrer votre nom" required />
                    </div>
                    <div class="col-md-6">
                        <label for="firstname">Prénom</label>
                        <input type="text" name="firstName" class="form-control" id="firstName" placeholder="Entrer votre prénom" required />
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="row">
                    <div class="col-md-6">
                        <label for="address">Adresse</label>
                        <input type="text" name="address" class="form-control" id="address" placeholder="Entrer votre adresse" required />
                    </div>
                    <div class="col-md-6">
                        <label for="city">Ville</label>
                        <input type="text" name="city" class="form-control" id="city" placeholder="Entrer votre Ville" required />
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label for="email">Adresse mail</label>
                <input type="email" name="email" class="form-control" id="email" placeholder="Entrer votre email" required />
            </div>
            <div>
                <input type="submit" class="btn btn-outline-success" id="envoyerFormulaire" value="Envoyer" />
            </div>
        </form>

        `;
    // Injection HTML
    positionElement4.insertAdjacentHTML("afterend", structureFormulaire);
};

// Affichage du formulaire
affichageFormulaireHtml();

//Sélection du bouton envoyer le formulaire
const btnEnvoyerFormulaire = document.querySelector("#envoyerFormulaire");

//-----------addEventListener---------
btnEnvoyerFormulaire.addEventListener("click", (event) => {
    event.preventDefault();
    //Récupération des valeurs du formulaire
    const formulaireValues = {
        lastName: document.querySelector("#lastName").value,
        firstName: document.querySelector("#firstName").value,
        address: document.querySelector("#address").value,
        city: document.querySelector("#city").value,
        email: document.querySelector("#email").value,
    }
    //---------------- Gestion validation formulaire
    function nomControle() {
        //Contrôle de la validité du nom
        const leNom = formulaireValues.lastName;
        if (/^[A-Za-z]{3,20}$/.test(leNom)) {
            return true;
        } else {
            alert("Chiffre et symbole ne sont pas autorise \nne pas dépasser 20 caractères, minimum 3 caractères");
            return false;
        }
    };

    function prenomControle() {
        //Contrôle de la validité du prénom
        const lePrenom = formulaireValues.firstName;
        if (/^[A-Za-z\s]{3,20}$/.test(lePrenom)) {
            return true;
        } else {
            alert("Chiffre et symbole ne sont pas autorise \nne pas dépasser 20 caractères, minimum 3 caractères");
            return false;
        }
    }

    function addresseControle() {
        //Contrôle de la validité de l'adresse
        const leAdresse = formulaireValues.address;
        if (/^[A-Za-z0-9\s]{5,50}$/.test(leAdresse)) {
            return true;
        } else {
            alert("L'adresse doit contenir que des lettres sans ponctuation et des chiffres.");
            return false;
        }
    }

    function villeControle() {
        //Contrôle de la validité de la ville
        const laVille = formulaireValues.city;
        if (/^[A-Za-z\s]{3,50}$/.test(laVille)) {
            return true;
        } else {
            alert("La ville n'est pas valide.");
            return false;
        }
    }

    function emailControle() {
        //Contrôle de la validité de l'email
        const leEmail = formulaireValues.email;
        if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(leEmail)) {
            return true;
        } else {
            alert("L'email n'est pas valide.");
            return false;
        }
    }

    const productsID = [];
    //Contrôle validité formulaire avant envoie dans le local storage
    if (nomControle() && prenomControle() && addresseControle() && villeControle() && emailControle()) {
        //Mettre l'objet "formulaireValues" et "prixTotal" dans le local storage
        localStorage.setItem("formulaireValues", JSON.stringify(formulaireValues));
        localStorage.setItem("prixTotal", JSON.stringify(prixTotal));

        //Mettre les values du formulaire et mettre les produits sélectionnés dans un objet à envoyer  vers le serveur
        const contact = {
                firstName: firstName.value,
                lastName: lastName.value,
                address: address.value,
                city: city.value,
                email: email.value
            },
            products = productsID;

        //Envoie de l'objet vers le serveur
        const promise01 = fetch('http://localhost:3000/api/cameras/order', {
                method: "POST",
                body: JSON.stringify({
                    contact: contact,
                    products: products
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            })

            .then(response => response.json())
            .then(order => {
                //Mettre l'id dans le local storage
                localStorage.setItem("orderId", order.orderId);

                //Aller vers la page confirmation commande
                window.location.href = "confirmation.html";
            })
            .catch(function (err) {});
    } else {
        alert("Veuillez bien remplir le formulaire");
    };

});