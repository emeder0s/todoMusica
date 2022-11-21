var user_busq; //variable que almacena el usuario que tiene la sesion iniciada.
var user_address; //variable que almacena el address del usuario en la sesion.

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
                autocompletaDatos(user);
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
                        console.log("Carga finalizada")
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
 * Funcion que autocompleta los campos del formulario de datos de usuario con
 * los datos del usuario que tiene la sesion inciada.
 * @param {*} user 
 */
function autocompletaDatos(user) {
    document.getElementById("first_name").value = user.first_name;
    document.getElementById("last_name").value = user.last_name;
    document.getElementById("dni").value = user.dni;
    document.getElementById("birth_date").value = user.birth_date;
    document.getElementById("phone").value = user.phone;
    document.getElementById("email").value = user.email;

}
/**
 * Funcion que añade una direccion a la base de datos.
 * @returns el id de la direccion insertada.
 */
async function creaNuevoAddres() {
    await fetch("/setAddress", {
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
    }).then((res) => res.json()).then(e=>console.log(e))
}
/* async function updateData() {
    document.getElementById("regis-form").addEventListener("submit", async e => {
        e.preventDefault();
    console.log("Guardando Datos")
    await fetch("/update", {
        method: "POST",
        body: JSON.stringify({
            first_name: document.getElementById("first_name").value,
            last_name: document.getElementById("last_name").value,
            dni: document.getElementById("dni").value,
            birth_date: document.getElementById("birth_date").value,
            phone: document.getElementById("phone").value,
            email: document.getElementById("email").value
        }),
        mode: "cors",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "application/json"
        }
    }).then((res) => res.json()).then(e=>console.log(e))
})} */





