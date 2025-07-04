// Autenticación global

document.addEventListener("DOMContentLoaded", () => {
  aplicarConfiguracionGlobal();
  verificarSesion();

  const estaEnLogin = window.location.pathname.endsWith("login.html") ||
                      window.location.pathname.endsWith("index.html") ||
                      window.location.pathname === "/";
  if (estaEnLogin) {
    configurarLogin();
  }
});

function verificarSesion() {
  const usuario = obtenerDeStorage("usuarioActivo");
  const esLogin = window.location.pathname.endsWith("login.html") ||
                  window.location.pathname.endsWith("index.html") ||
                  window.location.pathname === "/";
  if (!usuario && !esLogin) {
    window.location.href = "login.html";
  }
}

function cerrarSesion() {
  localStorage.removeItem("usuarioActivo");
  localStorage.removeItem("usuarioActual");
  localStorage.removeItem("favoritos");
  window.location.href = "login.html";
}

function aplicarConfiguracionGlobal() {
  const tema = obtenerDeStorage("temaUsuario") || "claro";
  const tamano = obtenerDeStorage("tamanoFuente") || "mediana";

  document.body.classList.remove("claro", "oscuro");
  document.body.classList.add(tema);

  document.body.classList.remove("fuente-chica", "fuente-mediana", "fuente-grande");
  document.body.classList.add(`fuente-${tamano}`);
}

//  form del login
function configurarLogin() {
  const loginForm = document.getElementById("login-form");
  if (!loginForm) return;

  // Usuario admin
  if (!obtenerDeStorage("usuarios")) {
    guardarEnStorage("usuarios", [{ usuario: "admin", password: "1234", rol: "admin" }]);
  }

  loginForm.addEventListener("submit", e => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const pass  = document.getElementById("loginPassword").value.trim();

    if (!validarEmail(email)) {
      alert("Ingresá un email válido.");
      return;
    }

    const usuarios = obtenerDeStorage("usuarios") || [];
    const user = usuarios.find(u => u.usuario === email && u.password === pass);

    if (user) {
      guardarEnStorage("usuarioActivo", user);
      localStorage.setItem("usuarioActual", email);
      window.location.href = "libros.html";
    } else {
      alert("Usuario o contraseña inválidos.");
    }
  });
}

function validarEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
}
