
const nombreElement = document.querySelector(".nombre");
const edadElement = document.querySelector(".edad");
const fotoElement = document.querySelector(".foto");
const btnNo = document.querySelector(".no");
const btnSi = document.querySelector(".si");
const tablaResultados = document.querySelector(".tabla-resultados");
const tbody = document.querySelector(".resultados");

const personas = [
  {
    nombre: "Javi",
    edad: 52,
    foto: "./assets/javi.png",
  },
  {
    nombre: "Horacio",
    edad: 57,
    foto: "./assets/larreta.png",
  },
  {
    nombre: "Mauri",
    edad: 25,
    foto: "./assets/mauri.jpg",
  },
  {
    nombre: "Máximo",
    edad: 46,
    foto: "./assets/maximo.jpg",
  },
  {
    nombre: "Albert",
    edad: 64,
    foto: "./assets/albert.png",
  },
];
let currentIndex = 0;
let decisiones = {};
function mostrarPersona() {
  const personaActual = personas[currentIndex];
  nombreElement.textContent = personaActual.nombre;
  edadElement.textContent = personaActual.edad;
  fotoElement.src = personaActual.foto;
}
mostrarPersona();
function handleClick(decision) {
  const personaActual = personas[currentIndex];
  decisiones[personaActual.nombre] = decision;
  currentIndex++;
  if (currentIndex < personas.length) {
    mostrarPersona();
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
      match.textContent = decisiones[persona.nombre] === "amor" ? "Sí" : "No";
  
      fila.appendChild(nombre);
      fila.appendChild(decision);
      fila.appendChild(match);
      tbody.appendChild(fila);
    });
  
    Swal.fire(
      'No hay más candidatos por hoy',
      'Revisa si tuviste algún match!',
      'success'
    );
  }

btnNo.addEventListener("click", () => handleClick("odio"));
btnSi.addEventListener("click", () => handleClick("amor"));
