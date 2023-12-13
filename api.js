// Nombre del archivo: loadTienditas.js

document.addEventListener("DOMContentLoaded", function () {
  // Obtén la referencia al elemento <select>
  const tiendaSelect = document.getElementById("tienda");

  // Realiza una solicitud GET al endpoint /siren/tienditas
  fetch("http://localhost:8080/siren/tienditas")
    .then((response) => response.json())
    .then((tienditas) => {
      // Elimina las opciones existentes en el <select>
      tiendaSelect.innerHTML = "";

      // Agrega la opción por defecto
      const defaultOption = document.createElement("option");
      defaultOption.value = "";
      defaultOption.textContent = "Seleccione una tiendita";
      tiendaSelect.appendChild(defaultOption);

      // Llena el <select> con las opciones obtenidas de la respuesta
      tienditas.forEach((tiendita) => {
        const option = document.createElement("option");
        option.value = tiendita.idTienditas;
        option.textContent = tiendita.tiendita;
        tiendaSelect.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Error al obtener tienditas:", error);
    });
});

// Mostrar preguntas
document.addEventListener("DOMContentLoaded", function () {
  // Llama a la función para obtener y mostrar las preguntas
  obtenerYMostrarPreguntas();
});

function obtenerYMostrarPreguntas() {
  // Hacer la solicitud al endpoint que devuelve las preguntas
  fetch("http://localhost:8080/siren/preguntas")
    .then((response) => response.json())
    .then((preguntas) => {
      // Recorre las preguntas y actualiza el contenido en el HTML
      preguntas.forEach((pregunta) => {
        // Reemplaza 'funcionalidad', 'confiabilidad', etc., con el identificador correcto en tu HTML
        const elementoPregunta = document.getElementById(
          pregunta.identificador
        );
        if (elementoPregunta) {
          elementoPregunta.innerHTML = pregunta.pregunta;
        }
      });
    })
    .catch((error) => console.error("Error al obtener las preguntas:", error));
}

//Mostrar encuestas en el select
document.addEventListener("DOMContentLoaded", function () {
  // Obtén la referencia al elemento <select> para encuestas
  const encuestaSelect = document.getElementById("fecha");

  // Realiza una solicitud GET al endpoint /siren/tienditas
  fetch("http://localhost:8080/siren/encuestas")
    .then((response) => response.json())
    .then((encuestas) => {
      // Elimina las opciones existentes en el <select> de encuestas
      encuestaSelect.innerHTML = "";

      // Agrega la opción por defecto
      const defaultOption = document.createElement("option");
      defaultOption.value = "";
      defaultOption.textContent = "Seleccione una encuesta";
      encuestaSelect.appendChild(defaultOption);

      // Llena el <select> de encuestas con las opciones obtenidas de la respuesta
      encuestas.forEach((encuesta) => {
        const option = document.createElement("option");
        option.value = encuesta.idEncuestas;
        option.textContent = encuesta.encuestas;
        encuestaSelect.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Error al obtener encuestas:", error);
    });
});

//Guardar encuesta
document.addEventListener("DOM  ContentLoaded", function () {
  // Espera a que el DOM esté completamente cargado

  document
    .getElementById("surveyForm")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Evita la recarga de la página por defecto

      // Obtén los valores del formulario
      const idEncuestas = document.getElementById("idEncuestas").value;
      const idTienditas = document.getElementById("idTienditas").value;
      const idPreguntas = document.getElementById("idPreguntas").value;
      const valor = document.querySelector('input[name="valor"]:checked').value;

      // Crea un objeto con los datos del formulario
      const encuestasDto = {
        idEncuestas: parseInt(idEncuestas),
        idTienditas: parseInt(idTienditas),
        idPreguntas: parseInt(idPreguntas),
        valor: parseInt(valor),
      };

      // Realiza la solicitud al servidor usando fetch
      fetch("/siren/respuestaSave", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(encuestasDto),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Respuesta del servidor:", data);
          // Aquí puedes manejar la respuesta del servidor, por ejemplo, mostrar un mensaje al usuario
          alert("Respuesta guardada correctamente");
        })
        .catch((error) => {
          console.error("Error al enviar la solicitud:", error);
          // Maneja el error, por ejemplo, muestra un mensaje de error al usuario
          alert(
            "Error al guardar la respuesta. Por favor, inténtalo de nuevo."
          );
        });
    });
});
