let btn = document.getElementById("btn");
btn.addEventListener("click", () => {
// Recoger del body los datos para meterlos en json.stringigfy
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
        document.getElementsByTagName("p")[0].innerText = "";
        document.getElementsByTagName("a")[0].style.display = "block";
        document.getElementsByTagName(
          "a"
        )[0].href = `http://localhost:3000/forgetpassword/${token}`;
      }
    });
});