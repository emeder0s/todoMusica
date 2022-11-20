var user_busq;
var user_address;

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


async function createOrder_adress() {
    let orden;
    if (mismoAddress()) {
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
    await fetch("/new_order_address", {
        method: "POST",
        body: JSON.stringify(orden),
        mode: "cors",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "application/json"
        }
    }).then((res) => res.json()).then(json => { 
        createOrderInstrument(json.id);
        userToBuyer();
    });
    window.location.href = "http://localhost:3000/pay";
}

function generarOrderNumber() {
    var num = parseInt(Math.random() * 10000000)
    return "TM" + num.toString();
};

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

/* async function instrumentos() {
    let allInstruments;
    await fetch("/findInstruments", {
        method: "GET",
        mode: "cors",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "application/json"
        }
    }).then((res) => res.json()).then(json => {
        allInstruments = json;
    });
    return allInstruments;
} */

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

function acordeonMap() {
    let map = document.getElementById("map_container");
    if(map.style.display == "flex") {
        console.log(2)
        map.style.display = "none";
    } else {
        console.log(1)
        map.style.display = "flex";
    }
}

