document.addEventListener("DOMContentLoaded", () => {
  const registroForm = document.getElementById("registro-form");
  const registroSection = document.getElementById("registro-section");
  const loginSection = document.getElementById("login-section");
  const toggleRegistro = document.getElementById("toggle-registro");
  const volverBtn = document.getElementById("volver-login");

  if (!obtenerDeStorage("usuarios")) {
    guardarEnStorage("usuarios", [{ usuario: "admin", password: "1234", rol: "admin" }]);
  }

  toggleRegistro.addEventListener("click", () => {
    registroSection.classList.remove("oculto");
    loginSection.classList.add("oculto");
  });
  volverBtn.addEventListener("click", () => {
    registroSection.classList.add("oculto");
    loginSection.classList.remove("oculto");
  });

  // Form pra registrarse
  registroForm.addEventListener("submit", e => {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const pass = document.getElementById("password").value.trim();

    if (!nombre || !apellido || !email || !pass) {
      alert("Completá todos los campos.");
      return;
    }
    if (!validarEmail(email)) {
      alert("Email inválido.");
      return;
    }
    if (pass.length < 4) {
      alert("La contraseña debe tener al menos 4 caracteres.");
      return;
    }

    const usuarios = obtenerDeStorage("usuarios") || [];
    if (usuarios.some(u => u.usuario === email)) {
      alert("Ese email ya está registrado.");
      return;
    }

    usuarios.push({ usuario: email, password: pass, rol: "usuario", nombre, apellido });
    guardarEnStorage("usuarios", usuarios);

    alert("¡Registro exitoso! Ahora podés iniciar sesión.");
    registroForm.reset();
    registroSection.classList.add("oculto");
    loginSection.classList.remove("oculto");
  });
});
