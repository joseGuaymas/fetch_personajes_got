let contenedorPersonajes = document.querySelector("#contenedor-personajes");
let botonStart = document.querySelector("#boton-start");
let botonBack = document.querySelector("#boton-back");
let contenedorBoton = document.querySelectorAll(".contenedor-boton");
let contenedorLoader = document.querySelector(".contenedor-loader");
let bolasLoader = document.querySelectorAll(".bola-loader");

const url = "https://breakingbadapi.com/api/characters";
let personajes = [];

botonStart.addEventListener("click", (e) => {
    e.preventDefault;
    llamarPersonajes();
});

botonBack.addEventListener("click", (e)=>{
    e.preventDefault;
    location.reload();
})

function loader(){
    bolasLoader.forEach(bola => {
        bola.classList.toggle("hidden");
    });
    contenedorLoader.classList.toggle("hidden");
};

function cambiarBotones(){
    botonStart.classList.add("hidden");
    botonBack.classList.toggle("hidden");
    contenedorBoton.forEach(contenedor=>{
        contenedor.classList.toggle("hidden");
    });
};

async function llamarPersonajes(){
    botonStart.classList.add('hidden');
    loader();
    setTimeout( () => {    
        fetch(url)
        .then((res) => res.json())
        .then((res) => {
            personajes = res;
            personajes.splice(13,1) // Elimino personaje sin imagen (Lydia)
            personajes.splice(37,1) // Elimino personaje sin imagen (Holly)
            personajes.splice(49) // Elimino personajes de Better Call Saul
            cargarPersonajes()
            cambiarBotones() 
        })
        loader();
    }, 3000);
};

function cargarPersonajes(){
    personajes.forEach(personaje => {
        let cardConteiner = document.createElement("div");
        cardConteiner.classList.add("cardConteiner");            
        let card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = 
        `<div class="personaje">
            <div class="contenedor-img">
                <img src="${personaje.img}">
            </div>
            <h2>${personaje.name}</h2>
            <h4>Apodo: ${personaje.nickname}</h4>
            <h4>Intérprete: ${personaje.portrayed}</h4>        
        </div>`
        
        cardConteiner.appendChild(card);
        contenedorPersonajes.appendChild(cardConteiner);
    });
};
