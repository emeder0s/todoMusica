
function checkIfLogued(){
    fetch("/isAuthorized", {
        method: "GET",
        mode: "cors",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "application/json"
        }
    }).then((res) => res.json()).then(json => {
        console.log(json);
        if(json == "Usuario no loggeado") {            
            window.location.href = "http://localhost:3000/login";
        } else {
            window.location.href = "http://localhost:3000/select-center-instrument";
        }
    });

}

