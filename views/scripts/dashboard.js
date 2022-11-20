function sendRequest(button, request_status){
    var request_id = button.getAttribute("request-id");
    var user_email = button.getAttribute("user-email");
    fetch('/send-request?' + new URLSearchParams({request_id,request_status,user_email}))
    .then((res) => res.json())
    .then((data) => {
        document.getElementById(data.request_id).style.display="none";
    })
}

(() =>{
    fetch("/get-all-requests")
    .then((res) => res.json())
    .then((requests) => {
        requests.forEach(request => {
            var container = document.getElementById("enroll-request-container");
            var request_cont = document.createElement("div");
            var buttons_cont = document.createElement("div");
            var accept_request = document.createElement("button");
            var reject_request = document.createElement("button");
            var user = document.createElement("p");
            var isbuyer = document.createElement("p");
            var class_cont = document.createElement("div");
            var center_name = document.createElement("p");
            var instrument = document.createElement("p");
            var schedule = document.createElement("p");
            var seats = document.createElement("p");

            request_cont.setAttribute("class","request-container");
            request_cont.setAttribute("id",request.id_request);
            user.setAttribute("class","request-paragraph");
            isbuyer.setAttribute("class","request-paragraph is-buyer");
            class_cont.setAttribute("class","class-request-container");
            buttons_cont.setAttribute("class","buttons-request-container");
            accept_request.setAttribute("class","btn btn-success btn-sm");
            reject_request.setAttribute("class","btn btn-danger btn-sm");
            accept_request.setAttribute("onclick","sendRequest(this,'accepted')");
            reject_request.setAttribute("onclick","sendRequest(this,'rejected')");
            accept_request.setAttribute("request-id",request.id_request);
            reject_request.setAttribute("request-id",request.id_request);
            accept_request.setAttribute("user-email",request.user_email);
            reject_request.setAttribute("user-email",request.user_email);

            user.innerHTML = `Usuario: ${request.user_email}`

            isbuyer.innerHTML = (request.is_buyer) ? "COMPRADOR" : "";
            accept_request.innerHTML = "Aceptar";
            reject_request.innerHTML = "Rechazar";
            center_name.innerHTML = `Centro: ${request.center}`
            instrument.innerHTML = `Instrumento: ${request.instrument}`
            schedule.innerHTML = `Horario: ${request.schedule}`
            var seatsAvailables = 4 - request.students.length;
            seats.innerHTML = `Num. plazas disponibles: ${seatsAvailables}`

            buttons_cont.appendChild(accept_request);
            buttons_cont.appendChild(reject_request);
            class_cont.appendChild(center_name);
            class_cont.appendChild(instrument);
            class_cont.appendChild(schedule);
            class_cont.appendChild(seats);
            request_cont.appendChild(isbuyer);
            request_cont.appendChild(user);
            request_cont.appendChild(class_cont);
            request_cont.appendChild(buttons_cont);

            container.appendChild(request_cont);
        })
    });
})();

(() =>{
    fetch("/show-classes")
    .then((res) => res.json())
    .then((classes) => {
        console.log(classes);
    });
})()
