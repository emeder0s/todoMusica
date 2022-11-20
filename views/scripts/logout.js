function logout(){
    fetch("/logout")
    .then(res=>res.json())
    .then(token => {
        document.cookie = `infoJwt=${token}; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
        window.location.href="/";
    })
}