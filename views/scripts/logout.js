function logout(){
    fetch("/logout")
    .then(res=>res.json())
    .then(token => {
        document.cookie = `infoJwt=${token}; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
        window.location.href="/";
    })
}

(() =>{
    fetch("/isAuthorized", {
        method: "GET",
        mode: "cors",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "application/json"
        }
    }).then((res) => res.json()).then(json => {
        if(json == "Usuario no loggeado") {
            document.getElementById("nav-login").style.display="flex";
        } else {
            document.getElementById("nav-logout").style.display="flex";
        }
    });
    
 })();