const nombreElement = document.querySelector(".nombre");
const edadElement = document.querySelector(".edad");
const fotoElement = document.querySelector(".foto");
const btnNo = document.querySelector(".no");
const btnSi = document.querySelector(".si");
const tablaResultados = document.querySelector(".tabla-resultados");
const tbody = document.querySelector(".resultados");

let currentIndex = 0;
let decisiones = {};
let personas;

function mostrarPersona(persona) {
  nombreElement.textContent = persona.nombre;
  edadElement.textContent = persona.edad;
  fotoElement.src = persona.foto;
}

function handleClick(decision) {
  const personaActual = personas[currentIndex];
  decisiones[personaActual.nombre] = decision;
  currentIndex++;
  if (currentIndex < personas.length) {
    mostrarPersona(personas[currentIndex]);
  } else {
    mostrarResultados();
  }
}

function mostrarResultados() {
  tablaResultados.style.display = "block";
  personas.forEach((persona) => {
    const fila = document.createElement("tr");
    const nombre = document.createElement("td");
    const decision = document.createElement("td");
    const match = document.createElement("td");
    nombre.textContent = persona.nombre;
    decision.textContent = decisiones[persona.nombre];
    match.textContent =
      decisiones[persona.nombre] === "amor" ? "Sí" : "No";

    fila.appendChild(nombre);
    fila.appendChild(decision);
    fila.appendChild(match);
    tbody.appendChild(fila);
  });

  Swal.fire(
    'No hay más candidatos por hoy',
    '¡Revisa si tuviste algún match!',
    'success'
  );
}

fetch('data.json')
  .then(response => response.json())
  .then(data => {
    personas = data;
    mostrarPersona(personas[currentIndex]);

    btnNo.addEventListener("click", () => handleClick("odio"));
    btnSi.addEventListener("click", () => handleClick("amor"));
  })
  .catch(error => {
    console.log('Error al cargar los datos:', error);
  });