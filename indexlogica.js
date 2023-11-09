//Comprueba que el formulario este completo
document
  .getElementById("surveyForm")
  .addEventListener("submit", function (event) {
    var radioInputs = document.querySelectorAll('input[type="radio"]');
    var selectInput = document.getElementById("tienda");
    var dateInput = document.getElementById("fecha");

    var isAnyUnchecked = false;

    // Verifica los campos de radio
    for (var i = 0; i < radioInputs.length; i++) {
      var radioName = radioInputs[i].name;
      var radioChecked = false;

      for (var j = 0; j < radioInputs.length; j++) {
        if (radioInputs[j].name === radioName && radioInputs[j].checked) {
          radioChecked = true;
          break;
        }
      }

      if (!radioChecked) {
        isAnyUnchecked = true;
        break;
      }
    }

    // Verifica el campo de la lista desplegable
    if (selectInput.value === "") {
      isAnyUnchecked = true;
    }
    // Verifica el campo de fecha
    if (dateInput.value === "") {
      isAnyUnchecked = true;
    }

    if (isAnyUnchecked) {
      event.preventDefault(); // Evita que el formulario se envíe
      alert(
        "Por favor, complete todos los campos antes de enviar la encuesta."
      );
    }
  });
//=====================
// Obtén una referencia a todos los elementos de input tipo radio en el formulario
const radioInputs = document.querySelectorAll('input[type="radio"]');
const porcentajeElement = document.getElementById("porcentaje");
let porcentajePromedio = 0;

// Agrega un evento change a todos los elementos de input tipo radio
radioInputs.forEach((radio) => {
  radio.addEventListener("change", calcularPorcentajeTotal);
});

// Función para calcular el porcentaje total
function calcularPorcentajeTotal() {
  let totalChecked = 0;
  let totalRadios = radioInputs.length;
  let totalValor = 0;

  // Verifica si hay alguna radio seleccionada
  const haySeleccionada = Array.from(radioInputs).some(
    (radio) => radio.checked
  );

  // Si no hay ninguna radio seleccionada, muestra 0% y sale de la función
  if (!haySeleccionada) {
    porcentajeElement.textContent = "0%";
    return;
  }

  // Recorre los radios y calcula el total de valor seleccionado
  radioInputs.forEach((radio) => {
    if (radio.checked) {
      totalChecked++;
      totalValor += parseInt(radio.value);
    }
  });

  // Calcula el porcentaje promedio
  porcentajePromedio = (totalValor / (totalChecked * 5)) * 100;

  // Asegúrate de que el porcentaje promedio no sea mayor al 100%
  porcentajePromedio = Math.min(porcentajePromedio, 100);

  // Muestra el porcentaje promedio en el elemento con id "porcentaje"
  porcentajeElement.textContent = `${porcentajePromedio.toFixed(2)}%`;
}

// Llama a la función para calcular el porcentaje total inicialmente
calcularPorcentajeTotal();

//=========
// Obtén una referencia a los elementos de input tipo radio en el formulario
const radioInput = document.querySelectorAll('input[type="radio"]');

// Obtén una referencia al botón "Limpiar"
const cleanButton = document.querySelector(".clean-button");

// Agrega un evento click al botón "Limpiar"
cleanButton.addEventListener("click", limpiarCheckbox);

// Función para limpiar las checkbox seleccionadas
function limpiarCheckbox() {
  // Recorre los radios y resetea solo los que están seleccionados
  radioInput.forEach((radio) => {
    if (radio.checked) {
      radio.checked = false;
    }
  });

  // Vuelve a calcular el porcentaje total después de limpiar las checkbox
  calcularPorcentajeTotal();
}
