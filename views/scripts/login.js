(() =>{
   url=document.referrer;
   if(url="http://localhost:3000/passrecovery"){
      url="/";
   }
   action = '/login?' + new URLSearchParams({url});
   document.getElementById("login-form").setAttribute("action",action);
})();