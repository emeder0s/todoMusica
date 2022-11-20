document.getElementById("incorrect-login-alert").style.display="none";
const form = document.getElementById("login-admin-form");
form.addEventListener("submit", e => {
    e.preventDefault();
    let user = form["user"].value;
    let password = form["password"].value;
    let info = {
      method: "POST",
      body: JSON.stringify({user, password }),
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      },
    };
    fetch("/get-admin", info)
    .then((res) => res.json())
    .then(data =>{
        if (data){
            window.location.href = data;
        }else{
            document.getElementById("incorrect-login-alert").style.display="block";
        }
    })

})


