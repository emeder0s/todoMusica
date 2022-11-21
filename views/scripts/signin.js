

(function () {
    document.getElementById("alert").style.display = "none";
    document.getElementById("regis-form").addEventListener("submit", e => {
        e.preventDefault();
        let info = {
            method: "POST",
            body: JSON.stringify({ 
                first_name: document.getElementById("first_name").value,
                last_name: document.getElementById("last_name").value, 
                dni: document.getElementById("dni").value, 
                email: document.getElementById("email").value, 
                phone: document.getElementById("phone").value, 
                birth_date: document.getElementById("birth_date").value, 
                user_password: document.getElementById("user_password").value
            }),
            mode: "cors",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "application/json"
            }
        }
        fetch("/register", info).then((res) => res.json())
            .then(json => {
                if(json == "Email o DNI repetido"){
                    document.getElementById("alert").style.display = "block";
                } else {
                    window.location.href = "http://localhost:3000/login"
                }
            });
    })
})();