const elInput = document.querySelector("input");
const laFecha = document.getElementById("laFecha");
const dtFecha = new Date();

laFecha.innerHTML = dtFecha.toLocaleString('es', {dateStyle: 'full'});
let elListado = document.querySelector("#idListado");

Pendientes();

function agregarTarea() {
    if (!elInput.value) {return};
    const numID = elListado.children.length + 1;
    const lineaTarea = document.createElement("li");

    lineaTarea.textContent = elInput.value;
    lineaTarea.id = "T" + String(numID).padStart(3, "0")
    lineaTarea.className = "elListado-item";

    lineaTarea.innerHTML = `<i id="${"C" + String(numID).padStart(3, "0")}" onclick="tramite(this)" class="material-symbols-outlined" data-accion="marca">circle</i>`
        + `<span id="${"S" + String(numID).padStart(3, "0")}" onclick="tramite(this)">${lineaTarea.textContent}</span>`
        + `<i id="${"D" + String(numID).padStart(3, "0")}" onclick="borrarTarea(this)" class="material-symbols-outlined" data-accion="borrar">delete</i>`;

    elListado.appendChild(lineaTarea);
    elInput.value = '';

    Pendientes();
};

const tramite = (vNsp) => {
    const li_Tarea = vNsp.parentElement;
    const primerI = li_Tarea.querySelector("i");

    primerI.innerHTML = (primerI.innerHTML === "circle") ? "check_circle" : "circle"
    /* vNsp.innerHTML = (vNsp.innerHTML === "circle") ? "check_circle" : "circle" */
    /* console.log(vNsp.id + "<<\n<<" + primerI.id + ">>\n>>" + primerI.textContent + "<<\n<<" + vNsp.id.slice(0,1)); */
    Pendientes();
};

function borrarTarea(vNsp) {
    vNsp.parentElement.remove();
    Pendientes();
};

function Pendientes() {
    let MenTareas = document.querySelector("#SinTareas");
    const Total = elListado.children.length;
    const Completadas = [...document.querySelectorAll('#idListado i[data-accion="marca"]')].filter(icono => icono.textContent.trim() === 'check_circle').length;

    const Porcentaje = Total > 0 ? (Completadas / Total) * 100 : 0;

    if (elListado.children.length > 0) {
        MenTareas.className = "porc-avance"
        MenTareas.textContent = `Procentaje de progreso ${Porcentaje.toFixed(0)}%`;
    } else {
        MenTareas.className = "Sin_Tareas"
        MenTareas.textContent = 'No hay tareas pendientes 😊';
    }
};

document.addEventListener('keyup', function(event) {
    if (event.key=='Enter') {
        const tarea = elInput.value;
        if (tarea) {
            agregarTarea();
        }
        elInput.value = '';
    }
    Pendientes();
});