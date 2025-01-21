// Array para tareas
let tareas = [];

// Para recuperar tareas desde LocalStorage al cargar
document.addEventListener("DOMContentLoaded", () => {
  const tareasGuardadas = localStorage.getItem("tareas");
  if (tareasGuardadas) {
    tareas = JSON.parse(tareasGuardadas);
    renderizarTareas();
  }
});

// Para agregar una tarea
document.getElementById("addTask").addEventListener("click", () => {
  const taskInput = document.getElementById("taskInput");
  const nombreTarea = taskInput.value.trim();

  // Para corroborar que no este vacia ni duplicada
  if (nombreTarea && !tareas.some((t) => t.nombre === nombreTarea)) {
    const nuevaTarea = {
      id: Date.now(),
      nombre: nombreTarea,
      completada: false,
    };

    tareas.push(nuevaTarea);
    guardarTareas();
    renderizarTareas();
    taskInput.value = "";
  } else {
    alert("La tarea ya existe o está vacía.");
  }
});

// Para renderizar tareas en el DOM
function renderizarTareas() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tareas.forEach((tarea) => {
    const li = document.createElement("li");
    li.classList.add("task-item");
    if (tarea.completada) li.classList.add("completed");

    // Texto de la tarea
    const span = document.createElement("span");
    span.textContent = tarea.nombre;
    span.style.flexGrow = "1";
    li.appendChild(span);

    // Boton de tarea Pendiente/Completada
    const completeBtn = document.createElement("button");
    completeBtn.textContent = tarea.completada ? "Pendiente" : "Completada";
    completeBtn.className = "complete-btn";
    completeBtn.addEventListener("click", () => {
      tarea.completada = !tarea.completada;
      guardarTareas();
      renderizarTareas();
    });
    li.appendChild(completeBtn);

    // Boton de eliminar tarea
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Eliminar";
    removeBtn.className = "remove-btn";
    removeBtn.addEventListener("click", () => {
      tareas = tareas.filter((t) => t.id !== tarea.id);
      guardarTareas();
      renderizarTareas();
    });
    li.appendChild(removeBtn);

    taskList.appendChild(li);
  });
}

// Para guardar tareas en LocalStorage
function guardarTareas() {
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

//Fin