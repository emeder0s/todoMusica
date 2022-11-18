/**
 * Funcion que se ejecuta automaticamente al abrir la pagina instrumentos.js.
 * Recorre todos los botones de las categorias y cuando hacemos click en uno de ellos
 * hace un una peticion POST a intruments.controllers, saca de la base de datos
 * todos los intrumentos de la categoria seleccionada y llama a una funcion que 
 * los muestra por pantalla.
 */
(function () {
    const buttons = document.querySelectorAll("button.instrumentos");
    buttons.forEach(boton => { 
        boton.addEventListener("click", () => {
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
                    console.log(json);
                    muestraIntrumentos(json);
                });
        })
    });
})();


/**
 * Funcion que genera un div en el DOM para mostrar
 * cada uno de los intrumentos del array instrumentos que 
 * se pasa como parametro.
 */
function muestraIntrumentos(instrumentos) {
    let categorias = document.getElementById("instrumentos");
    categorias.style.display = "none";
    let div = document.getElementById("contenedor_instrumentos");
    div.innerHTML = "";
    let boton = document.createElement("button");
    div.appendChild(boton);
    boton.innerHTML = "Todas las categorias";
    boton.addEventListener("click", () => {
        categorias.style.display = "flex";
        div.innerHTML = "";
    });
    let div_i;
    let img;
    instrumentos.forEach(instrument => {
        div_i = document.createElement("div");
        div.appendChild(div_i);
        img = document.createElement("img");
        img.setAttribute("src", instrument.photo_path);
        div_i.appendChild(img);
    });
}