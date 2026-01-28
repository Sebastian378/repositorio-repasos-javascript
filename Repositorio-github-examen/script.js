/*🧠 1. DOM (Document Object Model) — TODO lo esencial*/
/*🔹 Seleccionar elementos del DOM*/
// Selecciona un elemento por su ID
// Úsalo cuando el elemento es único (formularios, botones principales)
const titulo = document.getElementById("titulo");

// Selecciona el PRIMER elemento que coincida con el selector CSS
// Muy usado porque acepta clases, ids, etiquetas
const boton = document.querySelector(".btn");

// Selecciona TODOS los elementos que coincidan
// Devuelve un NodeList (parecido a un array)
const tarjetas = document.querySelectorAll(".card");

/*🔹 Modificar contenido*/
// Cambia SOLO el texto (recomendado por seguridad)
titulo.textContent = "Hola mundo";

// Cambia el HTML interno (⚠️ cuidado con inyección de código)
titulo.innerHTML = "<span>Hola</span>";

/*🔹 Modificar estilos desde JS*/
// Cambia estilos directamente (no recomendado para muchas reglas)
titulo.style.color = "red";
titulo.style.fontSize = "30px";

// Mejor práctica: usar clases
titulo.classList.add("activo");
titulo.classList.remove("activo");
titulo.classList.toggle("activo"); // agrega o quita

/*🔹 Crear elementos dinámicamente (MUY preguntado)*/
// Crear un elemento HTML desde JS
const li = document.createElement("li");

// Asignar contenido
li.textContent = "Nuevo elemento";

// Agregarlo al DOM
document.querySelector("ul").appendChild(li);

/*🔹 Eventos (clave en exámenes)*/
const btn = document.querySelector("#guardar");

btn.addEventListener("click", () => {
  // Este código se ejecuta cuando el usuario hace click
  console.log("Botón presionado");
});

/*🔹 Eventos en formularios*/
const form1 = document.querySelector("#formulario");

form.addEventListener("submit", (e) => {
  // Evita que la página se recargue
  e.preventDefault();

  console.log("Formulario enviado");
});

/*🧠 2. CRUD con JavaScript (SIN backend)*/

/*👉 CRUD = Create, Read, Update, Delete*/

/*Usamos un array como base de datos simulada.*/

let usuarios = [];

/*🟢 CREATE (Crear)*/
function crearUsuario(nombre, email) {
  // Creamos un objeto usuario
  const nuevoUsuario = {
    id: Date.now(), // id único basado en tiempo
    nombre,
    email
  };

  // Agregamos al array
  usuarios.push(nuevoUsuario);
}

/*🔵 READ (Leer / Mostrar)*/
function mostrarUsuarios() {
  // Recorremos el array
  usuarios.forEach(usuario => {
    console.log(usuario.nombre, usuario.email);
  });
}

/*🟡 UPDATE (Actualizar)*/
function actualizarUsuario(id, nuevoNombre) {
  // Buscamos el usuario por id
  const usuario = usuarios.find(u => u.id === id);

  if (usuario) {
    // Actualizamos el valor
    usuario.nombre = nuevoNombre;
  }
}

/*🔴 DELETE (Eliminar)*/
function eliminarUsuario(id) {
  // Filtramos todos menos el que queremos borrar
  usuarios = usuarios.filter(u => u.id !== id);
}

/*🧠 3. CRUD usando DOM + Formulario*/
const form = document.querySelector("#form");
const inputNombre = document.querySelector("#nombre");
const lista = document.querySelector("#lista");

let datos = [];

/*CREATE + DOM*/
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const objeto = {
    id: Date.now(),
    nombre: inputNombre.value
  };

  datos.push(objeto);
  pintarDatos();
  form.reset();
});

/*READ + DOM*/
function pintarDatos() {
  // Limpiamos antes de pintar
  lista.innerHTML = "";

  datos.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item.nombre;
    lista.appendChild(li);
  });
}

/*🧠 4. FETCH API (🔥 MUY IMPORTANTE)*/
/*🔹 GET (Obtener datos)*/
fetch("https://jsonplaceholder.typicode.com/users")
  .then(response => response.json()) // Convertimos a JSON
  .then(data => {
    console.log(data); // Datos del servidor
  })
  .catch(error => {
    console.error("Error:", error);
  });

/*🔹 POST (Crear datos)*/
fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    title: "Nuevo post",
    body: "Contenido",
    userId: 1
  })
})
.then(res => res.json())
.then(data => console.log(data));

/*🔹 PUT (Actualizar TODO)*/
fetch("https://jsonplaceholder.typicode.com/posts/1", {
  method: "PUT",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    title: "Actualizado",
    body: "Nuevo contenido",
    userId: 1
  })
});

/*🔹 PATCH (Actualizar PARTE)*/
fetch("https://jsonplaceholder.typicode.com/posts/1", {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    title: "Solo cambio el título"
  })
});

/*🔹 DELETE (Eliminar)*/
fetch("https://jsonplaceholder.typicode.com/posts/1", {
  method: "DELETE"
});

/*🧠 5. FETCH con async / await (PRO)*/
async function obtenerDatos() {
  try {
    const respuesta = await fetch("https://jsonplaceholder.typicode.com/users");
    const datos = await respuesta.json();
    console.log(datos);
  } catch (error) {
    console.error("Error:", error);
  }
}

/*📘 EXPLICACIÓN TEÓRICA: DOM Y CRUD
🧠 ¿Qué es el DOM?

El DOM (Document Object Model) es una representación estructurada del documento HTML en forma de árbol.
Cada etiqueta HTML se convierte en un nodo, y JavaScript puede acceder, modificar, crear o eliminar estos nodos.

Gracias al DOM, JavaScript puede interactuar con la página sin recargarla, permitiendo páginas dinámicas e interactivas.

🪜 PASO A PASO DEL MANEJO DEL DOM
🔹 Paso 1: Seleccionar elementos del DOM

El primer paso para trabajar con el DOM es seleccionar los elementos HTML que se desean manipular.

Esto se hace usando métodos del objeto document, como:

Seleccionar por id

Seleccionar por clase

Seleccionar por etiqueta

Seleccionar usando selectores CSS

Este paso es fundamental porque sin seleccionar el elemento, no se puede modificar ni escuchar eventos sobre él.

🔹 Paso 2: Acceder o modificar contenido

Una vez seleccionado el elemento, se puede:

Leer su contenido

Cambiar el texto visible

Insertar contenido dinámico

Esto permite actualizar títulos, párrafos, mensajes o información que depende de acciones del usuario, como enviar un formulario o presionar un botón.

🔹 Paso 3: Modificar estilos y clases

El DOM permite cambiar la apariencia de los elementos:

Modificando estilos directamente

Agregando o quitando clases CSS

Este paso se utiliza para:

Mostrar u ocultar elementos

Cambiar colores o tamaños

Resaltar errores o estados activos

Es una práctica común usar clases para mantener el código ordenado y reutilizable.

🔹 Paso 4: Crear y eliminar elementos dinámicamente

JavaScript permite:

Crear nuevos elementos HTML

Asignarles contenido y atributos

Insertarlos en el documento

Eliminar elementos existentes

Esto se usa cuando el contenido no existe desde el inicio, como listas, tarjetas, comentarios o resultados generados dinámicamente.

🔹 Paso 5: Manejar eventos

Los eventos permiten que la página responda a las acciones del usuario, como:

Clics

Envío de formularios

Escritura en inputs

Movimiento del mouse

Mediante eventos, se puede ejecutar lógica cuando ocurre una acción específica, lo que convierte una página estática en interactiva.

🔹 Paso 6: Evitar comportamientos por defecto

Algunos elementos HTML tienen comportamientos automáticos, como:

Los formularios que recargan la página

Los enlaces que redirigen

JavaScript permite evitar estos comportamientos para manejar todo desde código, logrando aplicaciones más controladas y fluidas.

📘 ¿QUÉ ES CRUD?

CRUD es un acrónimo que representa las cuatro operaciones básicas para la gestión de datos:

Create (Crear)

Read (Leer)

Update (Actualizar)

Delete (Eliminar)

Estas operaciones se utilizan en cualquier sistema que maneje información, ya sea con bases de datos reales o estructuras de datos en memoria.

🪜 PASO A PASO DEL FUNCIONAMIENTO DEL CRUD
🟢 CREATE (Crear)

En esta etapa se:

Capturan datos del usuario (generalmente desde un formulario)

Se validan los datos

Se crea un nuevo objeto con esos datos

Se guarda en una estructura de datos (array, base de datos, API)

Este paso es esencial para ingresar nueva información al sistema.

🔵 READ (Leer)

Aquí se:

Accede a la estructura donde están los datos

Se recorren los registros

Se muestran al usuario de forma clara

El objetivo del READ es visualizar la información existente, ya sea en tablas, listas o tarjetas.

🟡 UPDATE (Actualizar)

En esta operación se:

Identifica el elemento que se desea modificar

Se cambian uno o más valores del registro

Se guarda nuevamente la información actualizada

El UPDATE permite mantener los datos correctos y actualizados, sin necesidad de crear registros nuevos.

🔴 DELETE (Eliminar)

En este paso se:

Selecciona el registro que se desea eliminar

Se remueve de la estructura de datos

Se actualiza la visualización

El DELETE es importante para evitar información innecesaria o duplicada.

🔗 Relación entre DOM y CRUD

El DOM se encarga de:

Capturar la información del usuario

Mostrar los datos en pantalla

Actualizar la interfaz

El CRUD se encarga de:

Manipular los datos internamente

Gestionar la información

Ambos trabajan juntos para crear aplicaciones interactivas y dinámicas.

✅ CONCLUSIÓN

El DOM permite la interacción directa con la interfaz gráfica, mientras que el CRUD permite la gestión de los datos.
Juntos forman la base del desarrollo frontend moderno, permitiendo crear aplicaciones funcionales, organizadas y escalables.*/


/*📘 EXPLICACIÓN TEÓRICA: MÉTODOS FETCH
🧠 ¿Qué es Fetch?

Fetch es una API nativa de JavaScript que permite realizar peticiones HTTP a servidores externos o APIs.
Se utiliza principalmente para enviar y recibir datos sin recargar la página, lo que permite aplicaciones web dinámicas y modernas.

Fetch funciona de manera asíncrona, es decir, la ejecución del programa continúa mientras la petición se procesa.

🌐 ¿Qué es una petición HTTP?

Una petición HTTP es una solicitud que el cliente (navegador) envía a un servidor para:

Obtener información

Enviar datos

Actualizar información

Eliminar registros

Estas acciones se realizan mediante métodos HTTP, los cuales indican qué operación se desea ejecutar.

🪜 PASO A PASO DEL USO DE FETCH
🔹 Paso 1: Definir el recurso (URL)

El primer paso es definir la URL del servidor o API a la cual se hará la petición.
Esta URL representa el recurso que se quiere consultar o modificar.

Ejemplo conceptual:

Usuarios

Productos

Publicaciones

Sin una URL válida, Fetch no puede comunicarse con el servidor.

🔹 Paso 2: Enviar la petición Fetch

Se realiza la petición utilizando Fetch, que por defecto ejecuta un método GET.
Fetch inicia la comunicación con el servidor y espera una respuesta.

Este proceso no bloquea el resto del código gracias a su naturaleza asíncrona.

🔹 Paso 3: Recibir la respuesta del servidor

El servidor responde con:

Un estado HTTP (200, 404, 500, etc.)

Información solicitada o un mensaje de confirmación

Fetch recibe esta respuesta como un objeto, el cual debe ser procesado antes de utilizar los datos.

🔹 Paso 4: Convertir la respuesta a formato utilizable

Generalmente, los datos del servidor llegan en formato JSON.
Es necesario convertir esta respuesta para poder acceder a la información desde JavaScript.

Este paso transforma los datos en objetos o arreglos manejables.

🔹 Paso 5: Usar los datos recibidos

Una vez convertidos, los datos pueden:

Mostrarse en pantalla usando el DOM

Guardarse en variables

Usarse en operaciones CRUD

Validarse o transformarse

Aquí es donde Fetch se conecta directamente con la interfaz del usuario.

🔹 Paso 6: Manejo de errores

Es fundamental manejar posibles errores como:

Fallos de conexión

Recursos inexistentes

Respuestas inválidas del servidor

Esto permite que la aplicación sea más robusta y confiable.

📘 MÉTODOS HTTP USADOS CON FETCH
🟢 GET (Obtener información)

El método GET se utiliza para solicitar datos al servidor.

Características:

No modifica información

Se usa para listar o consultar datos

Es el método por defecto en Fetch

Ejemplos de uso:

Obtener usuarios

Listar productos

Consultar información específica

🔵 POST (Enviar información)

El método POST se utiliza para enviar datos al servidor y crear nuevos registros.

Características:

Envía información en el cuerpo de la petición

Crea nuevos recursos

Se usa comúnmente con formularios

Es ideal para registrar usuarios o crear contenido nuevo.

🟡 PUT (Actualizar información completa)

El método PUT se utiliza para actualizar completamente un recurso existente.

Características:

Reemplaza toda la información del recurso

Requiere identificar el elemento a modificar

Se usa cuando se envían todos los datos actualizados

🟠 PATCH (Actualizar parcialmente)

El método PATCH permite modificar solo una parte del recurso.

Características:

Más eficiente que PUT

Solo se envían los campos que cambian

Reduce el consumo de datos

🔴 DELETE (Eliminar información)

El método DELETE se utiliza para eliminar un recurso del servidor.

Características:

Remueve datos permanentemente

Requiere identificar el recurso

No necesita cuerpo en la mayoría de casos

🔄 FETCH Y ASINCRONÍA

Fetch trabaja de forma asíncrona, lo que significa que:

La petición puede tardar

El resto del código sigue ejecutándose

La respuesta se maneja cuando llega

Esto evita bloqueos y mejora la experiencia del usuario.

🧠 Uso de async y await (Conceptual)

El uso de async y await permite escribir código asíncrono de manera más clara y ordenada.

Beneficios:

Código más legible

Flujo similar a código síncrono

Mejor manejo de errores

🔗 Relación entre Fetch y CRUD

Fetch es la herramienta que permite conectar el CRUD del frontend con:

Servidores

APIs

Bases de datos

Relación directa:

GET → READ

POST → CREATE

PUT / PATCH → UPDATE

DELETE → DELETE*/


// 1️⃣ Seleccionamos elementos del DOM
const titulo = document.getElementById("titulo");
const boton2 = document.querySelector(".btn");
const input = document.querySelector("#input");

// 2️⃣ Modificamos contenido
titulo.textContent = "Texto modificado desde JavaScript";

// 3️⃣ Evento click
boton.addEventListener("click", () => {
  // Se ejecuta cuando el usuario hace click
  titulo.textContent = input.value;
});


// Base de datos simulada
let dato2s = [];

// 🟢 CREATE
function crearDato(nombre) {
  const nuevo = {
    id: Date.now(),
    nombre: nombre
  };
  datos.push(nuevo);
}

// 🔵 READ
function leerDatos() {
  return datos;
}

// 🟡 UPDATE
function actualizarDato(id, nuevoNombre) {
  const item = datos.find(d => d.id === id);
  if (item) {
    item.nombre = nuevoNombre;
  }
}

// 🔴 DELETE
function eliminarDato(id) {
  datos = datos.filter(d => d.id !== id);
}


// 1️⃣ Selección de elementos
const form2 = document.querySelector("#formulario");
const input2 = document.querySelector("#nombre");
const list2a = document.querySelector("#lista");

// 2️⃣ Base de datos
let registros = [];

// 3️⃣ CREATE (Formulario)
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Evita recarga

  const objeto = {
    id: Date.now(),
    nombre: input.value
  };

  registros.push(objeto);
  mostrar();
  form.reset();
});

// 4️⃣ READ (Mostrar datos)
function mostrar() {
  lista.innerHTML = "";

  registros.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item.nombre;
    lista.appendChild(li);
  });
}

function mostrar() {
  lista.innerHTML = "";

  registros.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item.nombre;

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";

    btnEliminar.addEventListener("click", () => {
      eliminar(item.id);
    });

    li.appendChild(btnEliminar);
    lista.appendChild(li);
  });
}

// 🔴 DELETE
function eliminar(id) {
  registros = registros.filter(r => r.id !== id);
  mostrar();
}

/*actualizar datos*/
function actualizar(id, nuevoValor) {
  const elemento = registros.find(r => r.id === id);
  if (elemento) {
    elemento.nombre = nuevoValor;
    mostrar();
  }
}