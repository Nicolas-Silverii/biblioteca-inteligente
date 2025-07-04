document.addEventListener("DOMContentLoaded", () => {
  verificarSesion(); 
  aplicarConfiguracionGlobal();
  inicializarLibros();
  configurarEventos();
});

function inicializarLibros() {
  fetch("../libros.json")
    .then(res => res.json())
    .then(data => {
      localStorage.setItem("libros", JSON.stringify(data));
      cargarLibros(data);
    })
    .catch(err => console.error("Error al cargar libros:", err));
}

function cargarLibros(libros) {
  const contenedor = document.getElementById("lista-libros");
  contenedor.innerHTML = "";

  if (libros.length === 0) {
    contenedor.innerHTML = "<p>No hay libros disponibles.</p>";
    return;
  }

  libros.sort((a, b) => a.titulo.localeCompare(b.titulo));

  libros.forEach(libro => {
    const div = document.createElement("div");
    div.classList.add("book-card");

    div.innerHTML = `
      <img src="${libro.imagen}" alt="Portada ${libro.titulo}" />
      <h3>${libro.titulo}</h3>
      <p>Autor: ${libro.autor}</p>
      <div class="botones-container">
        <button class="fav-btn" onclick="añadirAFavoritos(${libro.id})">Añadir a favoritos</button>
        <span class="mensaje" id="mensaje-${libro.id}"></span>
      </div>
    `;

    contenedor.appendChild(div);
  });
}

function añadirAFavoritos(id) {
  const libros = JSON.parse(localStorage.getItem("libros")) || [];
  const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

  const libro = libros.find(l => l.id === id);
  const mensaje = document.getElementById(`mensaje-${id}`);

  if (!libro) return;

  if (!favoritos.some(fav => fav.id === id)) {
    favoritos.push(libro);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    mensaje.textContent = `"${libro.titulo}" añadido a favoritos.`;
    mensaje.style.color = "green";
  } else {
    mensaje.textContent = `"${libro.titulo}" ya está en favoritos.`;
    mensaje.style.color = "red";
  }

  setTimeout(() => mensaje.textContent = "", 3000);
}

function filtrarLibros(e) {
  const query = e.target.value.toLowerCase();
  const libros = JSON.parse(localStorage.getItem("libros")) || [];

  const filtrados = libros.filter(libro =>
    libro.titulo.toLowerCase().includes(query) ||
    libro.autor.toLowerCase().includes(query)
  );

  cargarLibros(filtrados);
}



function configurarEventos() {
  const buscarInput = document.getElementById("buscar-libros");
  if (buscarInput) {
    buscarInput.addEventListener("input", filtrarLibros);
  }

  // ajustse
  const btnAjustes = document.getElementById("btn-ajustes");
  const modal = document.getElementById("modal-ajustes");
  const cerrarBtn = document.getElementById("cerrar-ajustes");
  const guardarBtn = document.getElementById("guardar-ajustes");

  if (btnAjustes && modal) {
    btnAjustes.addEventListener("click", () => {
      modal.classList.remove("oculto");
    });
  }

  if (cerrarBtn && modal) {
    cerrarBtn.addEventListener("click", () => {
      modal.classList.add("oculto");
    });
  }

  if (guardarBtn && modal) {
    guardarBtn.addEventListener("click", () => {
      const tema = document.getElementById("tema-select").value;
      const fuente = document.getElementById("fuente-select").value;

      localStorage.setItem("temaUsuario", tema);
      localStorage.setItem("tamanoFuente", fuente);

      aplicarConfiguracionGlobal();
      modal.classList.add("oculto");
    });
  }
}
