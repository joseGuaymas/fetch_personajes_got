let contenedorPersonajes = document.querySelector("#contenedor-personajes");
let botonStart = document.querySelector("#boton-start");
let botonBack = document.querySelector("#boton-back");
let contenedorBoton = document.querySelectorAll(".contenedor-boton");
let contenedorLoader = document.querySelector(".contenedor-loader");
let bolasLoader = document.querySelectorAll(".bola-loader");

const url = "https://thronesapi.com/api/v2/Characters";
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
                <img src="${personaje.imageUrl}">
            </div>
            <h2>${personaje.fullName}</h2>
            <h4>House: ${personaje.family}</h4>
            <h4>Títle: ${personaje.title}</h4>        
        </div>`
        
        cardConteiner.appendChild(card);
        contenedorPersonajes.appendChild(cardConteiner);
    });
};
