//Récupération de l'id de la commande (provenant du serveur) dans le local storage
const orderId = localStorage.getItem("orderId");

//Récupération du prix total de la commande
const prixTotal = localStorage.getItem("prixTotal");

//La structure HTML de la page confirmation
const positionElement5 = document.querySelector("#container")
const structureConfirmation = `
        <div class="row-fluid">
            <div id="container-confirmation" class="col-12">
                <h2>Récapitulatif de votre commande</h2>
                <div class="recap-commande">
                    <p>Merci pour votre commande</p>
                    <p>
                        Votre commande numéro : 
                        <span class="gras">${orderId}</span>
                        a bien été enregistré
                    </p>
                    <p>
                        Le montant de votre commande est de :
                        <span class="gras">${prixTotal}</span> €
                    </p>
                    <p class="gras">Au plaisir de vous revoir</p>
                </div>
            </div>
        </div>
        `;
// Injection HTML
positionElement5.insertAdjacentHTML("afterbegin", structureConfirmation);