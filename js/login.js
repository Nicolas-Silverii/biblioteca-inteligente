document.addEventListener("DOMContentLoaded", () => {
  aplicarConfiguracionGlobal(); // Tema y fuente

  const loginForm = document.getElementById("login-form");
  const registroForm = document.getElementById("registro-form");
  const registroSection = document.getElementById("registro-section");
  const loginSection = document.getElementById("login-section");
  const toggleRegistro = document.getElementById("toggle-registro");
  const volverBtn = document.getElementById("volver-login");
  const mensajeDiv = document.getElementById("mensaje");

  // Mostrar mensajes en pantalla
  function mostrarMensaje(texto, tipo = "error") {
    mensajeDiv.textContent = texto;
    mensajeDiv.className = tipo === "error" ? "mensaje-error" : "mensaje-ok";
  }

  // Validar email
  function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  }

  // Validar que nombre/apellido no tengan números o símbolos
  function validarTextoPlano(texto) {
    return /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]+$/.test(texto);
  }

  // Crear admin si no existe
  if (!localStorage.getItem("usuarios")) {
    const admin = [{
      usuario: "admin",
      password: "1234",
      rol: "admin"
    }];
    localStorage.setItem("usuarios", JSON.stringify(admin));
  }

  // -------------------
  // LOGIN
  // -------------------
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const pass = document.getElementById("loginPassword").value.trim();

    mensajeDiv.textContent = "";

    if (!validarEmail(email)) {
      mostrarMensaje("Por favor ingresa un email válido.");
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const user = usuarios.find(u => u.usuario === email && u.password === pass);

    if (user) {
      localStorage.setItem("usuarioActivo", JSON.stringify(user));
      window.location.href = "libros.html";
    } else {
      mostrarMensaje("Email o contraseña incorrectos.");
    }
  });

  // -------------------
  // REGISTRO
  // -------------------
  registroForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const pass = document.getElementById("password").value.trim();

    mensajeDiv.textContent = "";

    if (!nombre || !apellido || !email || !pass) {
      mostrarMensaje("Por favor completa todos los campos.");
      return;
    }

    if (!validarTextoPlano(nombre) || !validarTextoPlano(apellido)) {
      mostrarMensaje("Nombre y apellido no deben contener números ni símbolos.");
      return;
    }

    if (!validarEmail(email)) {
      mostrarMensaje("Por favor ingresa un email válido.");
      return;
    }

    if (pass.length < 6 || !/[0-9]/.test(pass)) {
      mostrarMensaje("La contraseña debe tener al menos 6 caracteres y contener números.");
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const existe = usuarios.some(u => u.usuario === email);

    if (existe) {
      mostrarMensaje("Ya existe un usuario con ese email.");
      return;
    }

    const nuevoUsuario = {
      usuario: email,
      password: pass,
      rol: "usuario",
      nombre,
      apellido
    };

    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    mostrarMensaje("¡Registro exitoso! Ahora puedes iniciar sesión.", "ok");
    registroForm.reset();
    registroSection.classList.add("oculto");
    loginSection.classList.remove("oculto");
  });

  // -------------------
  // Navegación entre secciones
  // -------------------
  toggleRegistro.addEventListener("click", () => {
    registroSection.classList.remove("oculto");
    loginSection.classList.add("oculto");
    mensajeDiv.textContent = "";
  });

  volverBtn.addEventListener("click", () => {
    registroSection.classList.add("oculto");
    loginSection.classList.remove("oculto");
    mensajeDiv.textContent = "";
  });
});
