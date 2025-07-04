document.addEventListener("DOMContentLoaded", () => {
  cargarFavoritos();
  configurarFormularioNuevoLibro(); 
});

// Mostrar favoritos
function cargarFavoritos() {
  const cont = document.getElementById("favoritos-container");
  if (!cont) return console.error("No existe #favoritos-container");

  cont.innerHTML = "";

  const favoritos = obtenerDeStorage("favoritos") || [];
  console.log("Favoritos cargados:", favoritos);

  if (favoritos.length === 0) {
    cont.innerHTML = "<p>No tenés libros favoritos.</p>";
    return;
  }

  favoritos.forEach(libro => {
    const card = document.createElement("div");
    card.className = "libro-favorito";

    card.innerHTML = `
      <h3>${libro.titulo}</h3>
      <p>Autor: ${libro.autor}</p>
      <img src="${libro.imagen}" alt="Portada ${libro.titulo}" />
    `;

    const btns = document.createElement("div");
    btns.className = "botones-container";

    const edit = document.createElement("button");
    edit.className = "edit-btn";
    edit.textContent = "Editar";
    edit.addEventListener("click", () => editarFavorito(libro.id));

    const del = document.createElement("button");
    del.className = "delete-btn";
    del.textContent = "Eliminar";
    del.addEventListener("click", () => eliminarFavorito(libro.id));

    btns.append(edit, del);
    card.appendChild(btns);
    cont.appendChild(card);
  });
}

// Editar favorito
function editarFavorito(id) {
  let favoritos = obtenerDeStorage("favoritos") || [];
  const idx = favoritos.findIndex(l => l.id === id);
  if (idx < 0) return;

  const libro = favoritos[idx];
  const nuevoTitulo = prompt("Nuevo título", libro.titulo);
  const nuevoAutor  = prompt("Nuevo autor", libro.autor);

  if (nuevoTitulo && nuevoAutor) {
    favoritos[idx] = { ...libro, titulo: nuevoTitulo, autor: nuevoAutor };
    guardarEnStorage("favoritos", favoritos);
    cargarFavoritos();
  }
}

// Eliminar favorito
function eliminarFavorito(id) {
  let favoritos = obtenerDeStorage("favoritos") || [];
  favoritos = favoritos.filter(l => l.id !== id);
  guardarEnStorage("favoritos", favoritos);
  cargarFavoritos();
}

// Agregar libro a favoritos
function configurarFormularioNuevoLibro() {
  const form = document.getElementById("form-nuevo-libro");
  if (!form) return console.warn("Formulario de nuevo libro no encontrado");

  form.addEventListener("submit", e => {
    e.preventDefault();

    const titulo = document.getElementById("titulo-nuevo").value.trim();
    const autor = document.getElementById("autor-nuevo").value.trim();
    const imagenInput = document.getElementById("imagen-nueva");
    const archivo = imagenInput.files[0];

    if (!titulo || !autor || !archivo) {
      alert("Completá todos los campos.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const nuevosFavoritos = obtenerDeStorage("favoritos") || [];

      const nuevoLibro = {
        id: Date.now(),
        titulo,
        autor,
        imagen: reader.result
      };

      nuevosFavoritos.push(nuevoLibro);
      guardarEnStorage("favoritos", nuevosFavoritos);
      cargarFavoritos();
      form.reset();
    };

    reader.readAsDataURL(archivo);
  });
}
