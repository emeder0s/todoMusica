(() =>{
   url=document.referrer;
   action = '/login?' + new URLSearchParams({url});
   document.getElementById("login-form").setAttribute("action",action);
})();
