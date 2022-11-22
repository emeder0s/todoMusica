var user_busq; //variable que almacena el usuario que tiene la sesion iniciada.
var user_address; //variable que almacena el address del usuario en la sesion.
var address_boolean = false;
document.getElementById("map_container").style.display = "none";
(function () {
    document.getElementById("form-address").addEventListener("submit", (e) => {
        address_boolean = true;
        e.preventDefault();
        document.getElementById("acordeon1").click();
        document.getElementById("map_container").style.display = "none";
        document.getElementById("acordeon3").click();
    })
})();

/**
 * Funcion que se ejecuta automaticamente y que busca cual es el usuario
 * que tiene la sesion iniciada en ese momento, una vez encontrado almacena el usuario
 * en la variable global user_busq y su direccion en user_address. Por
 * último, en caso de que el usuario tenga un address registrado
 * llama a la funcion autocompletaAddress() y le pasa como parametro el adress 
 * del usuario que tiene la sesion iniciada.
 */
(function () {
    fetch("/isAuthorized", {
        method: "GET",
        mode: "cors",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "application/json"
        }
    }).then((res) => res.json()).then(json => {
        if (json == "Usuario no loggeado") {
            alert("Tienes que loggearte");
        } else {
            fetch("/getUserByEmail", {
                method: "POST",
                body: JSON.stringify({
                    "email": json.email
                }),
                mode: "cors",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-type": "application/json"
                }
            }).then((res) => res.json()).then(user => {
                user_busq = user;
                if (user.fk_id_address) {
                    fetch("/getAddress", {
                        method: "POST",
                        body: JSON.stringify({
                            "id": user.fk_id_address
                        }),
                        mode: "cors",
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                            "Content-type": "application/json"
                        }
                    }).then((res) => res.json()).then((address) => {
                        autocompletaAddress(address);
                        user_address = address;
                    })
                }
            });
        }
    });
})();

/**
 * Funcion que autocompleta los campos del formulario de direccion de envio con
 * los datos del address del usuario que tiene la sesion inciada.
 * @param {*} address 
 */
function autocompletaAddress(address) {
    document.getElementById("way_type").value = address.way_type;
    document.getElementById("address").value = address.address;
    document.getElementById("additional_address").value = address.additional_address;
    document.getElementById("a_number").value = address.a_number;
    document.getElementById("city").value = address.locality;
    document.getElementById("province").value = address.province;
    document.getElementById("postal_code").value = address.postal_code;
    document.getElementById("country").value = address.country;
}

/**
 * Funcion que crea la orden de un pedido que se envia a domicilio.
 * En caso de que la direccion de envio se igual a la direccion del usuario, se
 * le pone a la orden el id de esta direccion. En caso contrario, se crea una nueva direccion
 * se añade a la base de datos y se le asigna su id a la orden.
 */
(async function createOrder_adress() {
    document.getElementById("pago-form").addEventListener("submit", async e => {
        if (address_boolean) {
            e.preventDefault();
            let orden;
            if (user_address && mismoAddress()) {
                orden = {
                    order_number: generarOrderNumber(),
                    fk_id_user: user_busq.id,
                    fk_id_address: user_busq.fk_id_address
                }
            } else {
                orden = {
                    order_number: generarOrderNumber(),
                    fk_id_user: user_busq.id,
                    fk_id_address: await creaNuevoAddres()
                }
            }
            var id_order;
            await fetch("/new_order_address", {
                method: "POST",
                body: JSON.stringify(orden),
                mode: "cors",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-type": "application/json"
                }
            }).then((res) => res.json()).then( async json => {
                createOrderInstrument(json.id);
                id_order = json.id
                userToBuyer();
                sendPDF(json.id);
            });
            window.location.href = `http://localhost:3000/sendOrder`;
        }
    })

})();

async function sendPDF(id_order) {
    await fetch("/bill_pdf", {
        method: "POST",
        body: JSON.stringify({"order": id_order}),
        mode: "cors",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "application/json"
        }
    }).then((res) => res.json()).then((json) => console.log(json));
}

/**
 * Funcion que genera un numero de pedido
 * @returns retorna un numero de pedido
 */
function generarOrderNumber() {
    var num = parseInt(Math.random() * 10000000)
    return "TM" + num.toString();
};

/**
 * Funcion que añade una direccion a la base de datos.
 * @returns el id de la direccion insertada.
 */
async function creaNuevoAddres() {
    var address_id;
    await fetch("/createAddress", {
        method: "POST",
        body: JSON.stringify({
            way_type: document.getElementById("way_type").value,
            address: document.getElementById("address").value,
            additional_address: document.getElementById("additional_address").value,
            a_number: document.getElementById("a_number").value,
            locality: document.getElementById("city").value,
            province: document.getElementById("province").value,
            postal_code: document.getElementById("postal_code").value,
            country: document.getElementById("country").value,
        }),
        mode: "cors",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "application/json"
        }
    }).then((res) => res.json()).then(address => { address_id = address.id });
    return address_id;
}

/**
 * Funcion que comprueba si la direccion de envio introducida es igual a la direccion del usuario.
 * @returns True si las direcciones son iguales, false en caso contrario.
 */
function mismoAddress() {
    return (document.getElementById("way_type").value == user_address.way_type &&
        document.getElementById("address").value == user_address.address &&
        document.getElementById("additional_address").value == user_address.additional_address &&
        document.getElementById("a_number").value == user_address.a_number &&
        document.getElementById("city").value == user_address.locality &&
        document.getElementById("province").value == user_address.province &&
        document.getElementById("postal_code").value == user_address.postal_code &&
        document.getElementById("country").value == user_address.country);
}

/**
 * Inserta un registro en la tabla order_intruments para cada uno de los
 * intrumentos que hay en el carrito.
 * @param {*} order_id 
 */
function createOrderInstrument(order_id) {
    let carrito = JSON.parse(localStorage.getItem("carrito"));
    carrito.forEach(element => {
        let orden_instru = {
            qty_instrument: element.unidades,
            fk_id_instrument: element.id,
            fk_id_order: order_id
        }
        fetch("/new_order_instru", {
            method: "POST",
            body: JSON.stringify(orden_instru),
            mode: "cors",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "application/json"
            }
        });
    });
    localStorage.setItem("carrito", JSON.stringify([]));
}



/**
 * Actualiza el usuario que ha hecho la compra a "comprador".
 * (es necesario saber si un usuario ha comprado alguna vez puesto 
 * que en ese caso tienen prioridad en las clases de musica).
 */
async function userToBuyer() {
    await fetch("/isbuyer", {
        method: "GET",
        mode: "cors",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "application/json"
        }
    })
}

/**
 * Funcion que permite esconder y mostrar el mapa en la pagina.
 */
function acordeonMap() {
    let map = document.getElementById("map_container");
    if (map.style.display == "flex") {
        map.style.display = "none";
    } else {
        map.style.display = "flex";
    }
}

