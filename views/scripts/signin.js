

(function () {
    document.getElementById("alert").style.display = "none";
    document.getElementById("regis-form").addEventListener("submit", e => {
        e.preventDefault();
        let info = {
            method: "POST",
            body: JSON.stringify({ 
                first_name: document.getElementById("first_name"),
                last_name: document.getElementById("last_name"), 
                dni: document.getElementById("dni"), 
                email: document.getElementById("email"), 
                phone: document.getElementById("phone"), 
                birth_date: document.getElementById("birth_date"), 
                user_password: document.getElementById("user_password")
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
                }
            });
    })
})();