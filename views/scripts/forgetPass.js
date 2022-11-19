let btn = document.getElementById("btn");
btn.addEventListener("click", () => {
  let email = document.getElementById("email").value;
  
  let info = {
    method: "POST",
    body: JSON.stringify({ email }),
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-type": "application/json",
    },
  };

  fetch("/getUser", info)
    .then((res) => res.json())
    .then((token) => {
      if (!token) {
        document.getElementsByTagName("p")[0].innerText =
          "El email no existe en la BD";
      } else {
        document.getElementsByTagName("p")[0].innerText = "La solicitud de cambio de contraseña se ha realizado con éxito. Hemos enviado un email con un enlace de recuperacion. Muchas gracias.";
      }
    });
});