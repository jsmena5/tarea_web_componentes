
// menu-navegacion.js
class MenuNavegacion extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

connectedCallback() {
  this.render();
  this.setupListeners();
  this.mostrarVistaInicial();
}

mostrarVistaInicial() {
  const contenedor = document.getElementById('contenido');
  contenedor.innerHTML = `<student-list solo-lectura></student-list>`;
  this.inicializarEventos(); // ← Aquí gestionamos eventos y datos
}



  render() {
  this.shadowRoot.innerHTML = `
    <style>
      nav {
        display: flex;
        gap: 20px;
        background-color: #000; 
        padding: 10px;
      }

      a {
        color:rgb(20, 255, 255);
        text-decoration: none;
        font-weight: bold;
        cursor: pointer;
        font-family: sans-serif;
        text-shadow: 0 0 5pxrgb(20, 243, 255);
        transition: transform 0.2s ease;
      }

      a:hover {
        transform: scale(1.1);
        color:rgb(0, 217, 255);
      }
    </style>
    <nav>
      <a data-vista="inicio">Inicio</a>
      <a data-vista="gestion">Gestión Productos</a>
      <a data-vista="acerca">Acerca de</a>
    </nav>
  `;
}

setupListeners = () => {
  const enlaces = this.shadowRoot.querySelectorAll('a');
  enlaces.forEach(enlace => {
    enlace.addEventListener('click', (e) => {
      const vista = e.target.dataset.vista;
      const contenedor = document.getElementById('contenido');

      switch (vista) {
        case 'inicio':
          contenedor.innerHTML = `<student-list solo-lectura></student-list>`;
          this.inicializarEventos();
          break;

        case 'gestion':
          contenedor.innerHTML = `<student-form></student-form><student-list></student-list>`;
          this.inicializarEventos();
          break;

        case 'acerca':
          contenedor.innerHTML = `<acerca-de></acerca-de>`;
          break;
      }
    });
  });
}

inicializarEventos() {
  setTimeout(() => {
    const list = document.querySelector("student-list");
    const form = document.querySelector("student-form");

    if (list) {
      list.students = estudiantes;

      list.addEventListener("student-deleted", (e) => {
        const id = e.detail.id;
        const index = estudiantes.findIndex(s => s.id === id);
        if (index >= 0) {
          estudiantes.splice(index, 1);
          list.students = [...estudiantes];
        }
      });

      list.addEventListener("student-edit", (e) => {
        const form = document.querySelector("student-form");
        if (form) form.setStudentToEdit(e.detail);
      });
    }

    if (form) {
      form.addEventListener("student-added", (e) => {
        const editedId = e.detail.id;
        const index = estudiantes.findIndex(s => s.id === editedId);
        if (index >= 0) {
          estudiantes[index] = e.detail;
        } else {
          e.detail.id = estudiantes.length + 1;
          estudiantes.push(e.detail);
        }
        const list = document.querySelector("student-list");
        if (list) list.students = [...estudiantes];
      });

      form.addEventListener("student-updated", (e) => {
        const actualizado = e.detail;
        estudiantes = estudiantes.map((s) =>
          s.id === actualizado.id ? actualizado : s
        );
        const list = document.querySelector("student-list");
        if (list) list.students = estudiantes;
      });
    }
  }, 0);
}



}

window.customElements.define('menu-navegacion', MenuNavegacion);
