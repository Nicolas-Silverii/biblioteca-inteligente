
function guardarEnStorage(clave, valor) {
  try {
    const dato = typeof valor === "string"
                 ? valor
                 : JSON.stringify(valor);
    localStorage.setItem(clave, dato);
  } catch (error) {
    console.error(`Error guardando en localStorage: ${error}`);
  }
}

function obtenerDeStorage(clave) {
  try {
    const raw = localStorage.getItem(clave);
    if (!raw) return null;

    try {
      return JSON.parse(raw);
    } catch {
      return raw;
    }
  } catch (error) {
    console.error(`Error obteniendo de localStorage: ${error}`);
    return null;
  }
}

function mostrarMensaje(id, texto, color = "green") {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = texto;
  el.style.color = color;
  el.style.display = "block";
  setTimeout(() => {
    el.textContent = "";
    el.style.display = "none";
  }, 3000);
}

