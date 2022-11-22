let btn = document.getElementById("btn2");
btn.addEventListener("click", () => {
  let newPass = document.getElementById("pass1").value;
  let repeatPass = document.getElementById("pass2").value;
  var ok = newPass == repeatPass;

  // [window.location.pathname] -> Recoge la url de la pg
  let token = window.location.pathname.split("/")[2];

  if (ok) {
    let password = newPass;
    
    let info = {
      method: "POST",
      body: JSON.stringify({ password, token }),
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      },
    };

    fetch("/verificar", info)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          document.getElementsByTagName("p")[0].innerText =
            "Éxito! - Se ha actualizado su nuevo Password - ";
        } else {
          document.getElementsByTagName("p")[0].innerText = "Token incorrecto o caducado";
        }
      });
  } else {
    document.getElementsByTagName("p")[0].innerText =
      "No son iguales o está vacio el campo";
  }
});