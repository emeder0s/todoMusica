
/**
 * Funcion que se ejecuta automaticamente y que se encarga de realizar el inicio
 * de sesion. En caso de que el usuario o la contraseña no sean validos muestra
 * un mensaje de error.
 */
(() => {
   document.getElementById("alert").style.display = "none";
   document.getElementById("login-form").addEventListener("submit", e => {
      e.preventDefault();
      let info = {
         method: "POST",
         body: JSON.stringify({
            email: document.getElementById("email").value,
            user_password: document.getElementById("user_password").value
         }),
         mode: "cors",
         headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "application/json"
         }
      }
      url = document.referrer;
      if (url = "http://localhost:3000/passrecovery") {
         url = "/";
      }
      action = '/login?' + new URLSearchParams({ url });
      fetch(action, info).then((res) => res.json())
         .then(json => {
            if (json == "no ok") {
               document.getElementById("alert").style.display = "block";
            } else {
               window.location.href = "http://localhost:3000/";
            }
         });
   })
})();

(() =>{
   url=document.referrer;
   if(url="http://localhost:3000/passrecovery"){
      url="/";
   }
   action = '/login?' + new URLSearchParams({url});
   document.getElementById("login-form").setAttribute("action",action);
})();

