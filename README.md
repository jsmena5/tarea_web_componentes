# tarea_web_componentes

 🛒 Web Components - Gestión de Productos

Este proyecto es una aplicación web desarrollada con **Web Components** para gestionar productos (simulados como estudiantes en la estructura). Está compuesto por componentes personalizados (`custom elements`) y no depende de frameworks externos.

## 📦 Componentes Incluidos

- `<menu-navegacion>`: Menú superior con navegación entre vistas (Inicio, Gestión, Acerca de).
- `<student-form>`: Formulario para agregar o editar productos.
- `<student-list>`: Tabla que lista los productos, permite editar y eliminar.
- `<footer-app>`: Pie de página con enlaces a redes sociales (GitHub, LinkedIn).
- `<acerca-de>`: Componente informativo sobre el autor o el sistema.

## 🧠 Funcionalidades Principales

- Navegación entre vistas sin recargar la página.
- Añadir, editar y eliminar productos (modo Gestión).
- Visualización en solo lectura (modo Inicio).
- Persistencia de datos en memoria (array `estudiantes`).
- Arquitectura modular usando Shadow DOM.
