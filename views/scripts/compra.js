

(function () {
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
                if(user.fk_id_address) {

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
    document.getElementById("city").value = address.city;
    document.getElementById("province").value = address.province;
    document.getElementById("postal_code").value = address.postal_code;
    document.getElementById("country").value = address.country;
}
