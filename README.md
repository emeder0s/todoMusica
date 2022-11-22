# todoMusica

<p>Todo Música es una aplicación que ofrece venta de intrumentos y clases particulares para aprender
a tocar aquellos instrumentos que vende.
Cuando entras a la pagina web, lo primero que ves es una pagina de inicio con las siguientes opciones:
    <ul>
        <li>Instrumentos: Te permite navegar entre todos los intrumentos que ofrece la tienda y añadir todos aquellos
        que quieras al carrito de compra. Una vez has seleccionado todos los artículos que deseas, puedes
        comprarlos desde el carrito, para ellos debes de tener la sesión iniciada. Desde ahí se te dirige a otra vista donde puedes seleccionar la
        dirección de envío que elijas o un punto de recogida (los puntos de recogida aparecen en el mapa). 
        Por último se introducen los datos del método de pago y se enviará un email de confirmación con el resumen de la compra.</li>
        <li>Matricularse: Para acceder a esta parte es necesario iniciar sesión. Una vez has iniciado la sesión,
        aparecen dos apartados, uno para seleccionar el centro donde quieres recibir las clases y otro para
        seleccionar el instrumento que quieres aprender a tocar. Una vez has hecho tu selección se muestra un
        listado con las clases disponibles dentro de tu selección y puedes solicitar matricularte.</li>
        <li>Contacto: Muestra un formulario que te permite ponerte en contacto con Todo Música. Una vez lo rellenes ellos recibiran un email y se pondrán en contacto contigo lo antes posible.</li>
    </ul>
    
    

Además en la parte superior derecha hay un icono de un usuario que te permite iniciar sesión. En caso de que no estés registrado, desde la página de Log In podrás hacer click en un enlace que te permitirá registrate. De igual modo, si quieres iniciar sesión pero has olvidado tu contraseña podrás hacer click en un enlace que te permitirá 
introducir tu correo y se te enviará un enlace de recuperación de contraseña a tu email.
Una vez has iniciado sesión, desde el perfil de usuario, puedes visualizar tus datos personales y editarlos, añadir una dirección, visualizar tus pedidos y solicitar un copia de tu factura que podrás descargar en el momento o te la pueden enviar por correo.
</p>
<img src="./docs/casos_de_uso/Caso de uso User.png">
<p>
Además la aplicación dispone de otro tipo de usuario que es el usuario administrador. Para registrar a este tipo 
de usuarios hay que hacerlo directamente desde la base de datos. Para iniciar sesión con un usuario administrado
hay que hacerlo desde un endpoint concreto que no es accesible desde la aplicación. El usuario administrador puede
aceptar o rechazar solicitudes de matriculas a clases y puede iniciar la sesión de un usuario unicamente introduciendo su correo.
</p>

<img src="./docs/casos_de_uso/Caso de uso Admin.png">

<p>
*Para poder cargar la aplicación por primera vez es necesario crear la base de datos de mySQL, ejecutar "node ./scrapping/scrapping.js" y cargar los jsons en la base de datos de mongo.
</p>
