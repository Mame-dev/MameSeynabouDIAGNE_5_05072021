let container = document.getElementById('container');

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
        let bloc = document.createElement("div");
        //contenu élément div
        bloc.innerHTML +=
        `<div class="bloc">
            <img src="http://localhost:3000/images/vcam_1.jpg" alt="Zurss 50S">
            <div class="text">
                <h2 class="nom">$name</h2>
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
    
})

