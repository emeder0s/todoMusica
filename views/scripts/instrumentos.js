var allInstruments; //variable que almacena un array con todos los instrumentos en la base de datos.
/**
 * Funcion que se ejecuta automaticamente al abrir la pagina instrumentos.js.
 * Recorre todos los botones de las categorias y cuando hacemos click en uno de ellos
 * hace un una peticion POST a intruments.controllers, saca de la base de datos
 * todos los intrumentos de la categoria seleccionada y llama a una funcion que 
 * los muestra por pantalla.
 */
(function () {
    const buttons = document.querySelectorAll("button.instrumentos");
    fetch("/findInstruments", {
        method: "GET",
        mode: "cors",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "application/json"
        }
    }).then((res) => res.json()).then(json => {
        allInstruments = json;
        pintaCarrito(json);
    });

    buttons.forEach(boton => {
        boton.addEventListener("click", () => {
            document.getElementById("carritoIni").style.display = "none";
            let info = {
                method: "POST",
                body: JSON.stringify({
                    "category": boton.id
                }),
                mode: "cors",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-type": "application/json"
                }
            }

            fetch("/findCategory", info).then((res) => res.json())
                .then(json => {
                    muestraIntrumentos(json, boton.id);
                });
        })
    });
})();


/**
 * Funcion que genera un div en el DOM para mostrar
 * cada uno de los intrumentos del array instrumentos que 
 * se pasa como parametro.
 */
function muestraIntrumentos(instrumentos, categoria) {
    document.getElementById("categorias").innerText = document.querySelector(`#${categoria} p`).innerText;
    let categorias = document.getElementById("instrumentos");
    categorias.style.display = "none";
    let div = document.getElementById("contenedor_instrumentos");
    div.innerHTML = "";
    let contenedor_botones = document.createElement("div");
    contenedor_botones.setAttribute("id", "grid_botones");
    let boton = document.createElement("button");
    div.appendChild(contenedor_botones);
    contenedor_botones.appendChild(boton);
    boton.innerHTML = "Ver todas las categorías";
    let carrito = document.createElement("button");
    contenedor_botones.appendChild(carrito);
    preparaBotonCarrito(carrito);
    boton.innerHTML = "Ver todas las categorías";
    boton.setAttribute("class", "btn btn-dark");
    boton.addEventListener("click", () => {
        document.getElementById("carritoIni").style.display = "";
        document.getElementById("categorias").innerText = "Nuestras categorías";
        categorias.style.display = "flex";
        div.innerHTML = "";
    });
    let div_i;
    let img;
    let brand;
    let model;
    let div_datos;
    let precio;
    let div_botones;
    let boton_compra;
    let boton_carrito;
    instrumentos.forEach(instrument => {
        div_i = document.createElement("div");
        div_i.setAttribute("class", "instrumento_comprar");
        div.appendChild(div_i);
        img = document.createElement("img");
        img.setAttribute("src", instrument.photo_path);
        div_i.appendChild(img);
        div_datos = document.createElement("div");
        div_i.appendChild(div_datos);
        brand = document.createElement("span");
        brand.innerText = instrument.brand;
        model = document.createElement("p");
        model.style.marginBottom = "0";
        model.appendChild(brand);
        model.appendChild(document.createTextNode(instrument.model.replace(instrument.brand, '')));
        div_datos.appendChild(model);
        precio = document.createElement("span");
        precio.innerText = instrument.price;
        div_datos.appendChild(precio);
        div_botones = document.createElement("div");
        div_datos.appendChild(div_botones);
        div_datos.setAttribute("class", "div_datos");
        boton_carrito = document.createElement("button");
        div_botones.appendChild(boton_carrito);
        div_botones.style.display = "flex";
        div_botones.style.justifyContent = "flex-end";
        boton_carrito.setAttribute("class", "btn btn-dark compra");
        boton_carrito.setAttribute("idinstrumento", instrument.id);
        let carritoadd = document.createElement("img");
        carritoadd.setAttribute("src", "http://127.0.0.1:3000/img/carritoadd.png");
        boton_carrito.appendChild(carritoadd);
        boton_carrito.appendChild(document.createTextNode("Añadir al carrito"));
        intrumentosAlLocalStorage(boton_carrito, instrumentos);
    });
}

/**
 * Funcion que controla que al hacer click en un boton "añadir al carrito", añada al local storage
 * el instrumento asociado a ese boton. En el local storage se guarda un array de jsons que contienen
 * el id del instrumento y el numero de veces que se ha añadido al carrito.
 * @param {*} boton 
 * @param {*} instrumentos 
 */
function intrumentosAlLocalStorage(boton) {
    boton.addEventListener("click", () => {
        var id_instru = boton.getAttribute("idinstrumento");
        var carrito = JSON.parse(localStorage.getItem("carrito"));
        if (carrito) {
            let index = buscaEnCarrito(carrito, id_instru);
            if (index != undefined) {
                carrito[index].unidades++;
            } else {
                carrito.push({ id: id_instru, unidades: 1 })
            }
            localStorage.setItem("carrito", JSON.stringify(carrito));
        } else {
            localStorage.setItem("carrito", JSON.stringify([{ id: id_instru, unidades: 1 }]));
        }
        pintaCarrito(allInstruments);
    });
}

/**
 * Funcion que busca un instrumento cuyo id se pasa como parametro dentro del 
 * carrito que tambien se pasa como parametro.
 * @param {*} carrito 
 * @param {*} id 
 * @returns Retorna la posicion en la que se encuentra el instrumento dentro del carrito.
 */
function buscaEnCarrito(carrito, id) {
    var index;
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id == id) {
            index = i;
        }
    }
    return index;
}

/**
 * Busca un instrumento cuyo id se pasa como parametro dentro de un array
 * de instrumentos que tambien se pasa como parametro.
 * @param {*} instrumentos 
 * @param {*} id 
 * @returns retorna el instrumento cuyo id se pasa como parametro.
 */
function buscaInstrumento(instrumentos, id) {
    let instrumento
    instrumentos.forEach(instru => {
        if (instru.id == id) {
            instrumento = instru;
        }
    })
    return instrumento;
}

/**
 * Funcion que crea el boton que permite visualiza el carrito con
 * los instrumentos seleccionados.
 * @param {*} boton 
 */
function preparaBotonCarrito(boton) {
    boton.setAttribute("class", "btn btn-dark");
    boton.setAttribute("data-bs-toggle", "offcanvas");
    boton.setAttribute("data-bs-target", "#offcanvasRight");
    boton.setAttribute("aria-controls", "offcanvasRight");
    boton.style.padding = "0";
    let img = document.createElement("img");
    img.setAttribute("src", "http://127.0.0.1:3000/img/carrito.png");
    img.setAttribute("class", "foto_carrito");
    boton.appendChild(img);
}

/**
 * Funcion que muestra en el carrito todos los elementos alamacenados en 
 * el carrito del local storage
 * @param {*} instrumentos 
 */
function pintaCarrito(instrumentos) {
    const body_carrito = document.getElementsByClassName("offcanvas-body")[0];
    body_carrito.innerHTML = "";
    const carrito = JSON.parse(localStorage.getItem("carrito"));
    if (carrito) {
        let div, img, precio, instru, brand, model, div_datos, unidades, div_2, sacar;
        carrito.forEach(element => {
            div = document.createElement("div");
            div.setAttribute("class", "elemento_carrito");
            body_carrito.appendChild(div);
            instru = buscaInstrumento(instrumentos, element.id);
            img = document.createElement("img");
            div.appendChild(img);
            img.setAttribute("src", instru.photo_path);
            div_datos = document.createElement("div");
            div.appendChild(div_datos);
            brand = document.createElement("span");
            brand.innerText = instru.brand;
            model = document.createElement("p");
            model.style.marginBottom = "0";
            model.appendChild(brand);
            model.appendChild(document.createTextNode(instru.model.replace(instru.brand, '')));
            div_datos.appendChild(model);

            div_2 = document.createElement("div");
            div_datos.appendChild(div_2);
            precio = document.createElement("span");
            precio.innerText = instru.price;
            precio.style.marginRight = "5px"
            div_2.appendChild(precio);
            div_2.style.display = "flex"

            unidades = document.createElement("p");
            unidades.innerText = "| " + element.unidades + " Uds.";
            div_2.appendChild(unidades);
            sacar = document.createElement("button");
            sacar.setAttribute("class", "btn btn-dark btn-papelera");
            let papelera = document.createElement("img");
            papelera.setAttribute("class", "papelera");
            papelera.setAttribute("src", "http://127.0.0.1:3000/img/papelera.png");
            sacar.appendChild(papelera)
            div_2.appendChild(sacar);
            div_datos.style.width = "100%";
            div_datos.style.display = "flex";
            div_datos.style.flexDirection = "column";
            div_datos.style.justifyContent = "space-around";
            div_2.style.width = "100%";
            div_2.style.justifyContent = "space-between";
            sacar.addEventListener("click", () => {
                let carri = JSON.parse(localStorage.getItem("carrito"));
                let i = buscaEnCarrito(carri, element.id);
                carri.splice(i, 1);
                localStorage.setItem("carrito", JSON.stringify(carri));
                pintaCarrito(instrumentos);
            })
        });

        let comprar = document.createElement("button");
        comprar.setAttribute("id", "comprar");
        comprar.innerHTML = "Comprar";
        comprar.setAttribute("onclick", "comprar()");
        comprar.setAttribute("class", "btn btn-dark");
        body_carrito.appendChild(comprar);
    }
};

/**
 * Funcion que comprueba que el usuario tenga la sesion iniciada
 * y en ese caso permite pasar al siguiente paso para comprar los elementos del 
 * carrito.
 */
function comprar() {
    fetch("/isAuthorized", {
        method: "GET",
        mode: "cors",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "application/json"
        }
    }).then((res) => res.json()).then(json => {
        if(json == "Usuario no loggeado") {
            alert("Tienes que loggearte");
        } else if (JSON.parse(localStorage.getItem("carrito")).length == 0) {
            alert("El carrito esta vacío.");
        } else {
            window.location.href = "http://localhost:3000/compra";
        }
    });
}
