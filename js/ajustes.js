document.addEventListener("DOMContentLoaded", () => {
  console.log(" ajustes.js cargado");

  aplicarConfiguracionGlobal();

  // Verificar usuario logueado
  if (!obtenerDeStorage("usuarioActual")) {
    console.warn("No hay usuario logueado");
    return;
  }

  // modal 
  const abrirBtn    = document.getElementById("btn-ajustes");
  const modal       = document.getElementById("modal-ajustes");
  const cerrarBtn   = document.getElementById("cerrar-ajustes");
  const guardarBtn  = document.getElementById("guardar-ajustes");
  const temaSelect  = document.getElementById("tema-select");
  const fuenteSelect= document.getElementById("fuente-select");

  if (!abrirBtn || !modal || !cerrarBtn || !guardarBtn || !temaSelect || !fuenteSelect) {
    console.error("Faltan elementos del modal de ajustes.");
    return;
  }

  const temaGuardado  = obtenerDeStorage("temaUsuario");
  const fuenteGuardada= obtenerDeStorage("tamanoFuente");
  if (temaGuardado)  temaSelect.value = temaGuardado;
  if (fuenteGuardada) fuenteSelect.value = fuenteGuardada;

  abrirBtn.addEventListener("click", () => modal.classList.remove("oculto"));
  cerrarBtn.addEventListener("click", () => modal.classList.add("oculto"));

  guardarBtn.addEventListener("click", () => {
    guardarEnStorage("temaUsuario", temaSelect.value);
    guardarEnStorage("tamanoFuente", fuenteSelect.value);
    console.log(` Ajustes guardados: tema=${temaSelect.value}, fuente=${fuenteSelect.value}`);
    aplicarConfiguracionGlobal();
    modal.classList.add("oculto");
  }); 
});
