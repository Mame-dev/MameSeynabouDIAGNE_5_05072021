//Récupération de l'id de la commande (provenant du serveur) dans le local storage
const orderId = localStorage.getItem("orderId");
console.log(orderId);

//Récupération du prix total de la commande
const prixTotal = localStorage.getItem("prixTotal");
console.log(prixTotal);

//La structure HTML de la page confirmation
const positionElement5 = document.querySelector("#container-confirmation")

const structureConfirmation = `
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
        `;
// Injection HTML
positionElement5.insertAdjacentHTML("afterbegin", structureConfirmation);