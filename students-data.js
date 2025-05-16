let estudiantes = [
  { id: 1, nombre: "Laptop Lenovo", precio: 850, cantidad: 10, descripcion: "Portátil de alto rendimiento para oficina" },
  { id: 2, nombre: "Smartphone Samsung", precio: 699, cantidad: 15, descripcion: "Teléfono Android gama media-alta" },
  { id: 3, nombre: "Mouse inalámbrico", precio: 25, cantidad: 50, descripcion: "Mouse ergonómico con conexión Bluetooth" },
  { id: 4, nombre: "Teclado mecánico", precio: 120, cantidad: 20, descripcion: "Teclado retroiluminado para gamers" },
  { id: 5, nombre: "Monitor 24''", precio: 200, cantidad: 12, descripcion: "Monitor LED Full HD de 24 pulgadas" },
  { id: 6, nombre: "Impresora HP", precio: 150, cantidad: 8, descripcion: "Impresora multifunción inalámbrica" },
  { id: 7, nombre: "Auriculares Bluetooth", precio: 80, cantidad: 30, descripcion: "Auriculares con cancelación de ruido" },
  { id: 8, nombre: "Cámara web HD", precio: 60, cantidad: 18, descripcion: "Cámara web 1080p para videollamadas" },
  { id: 9, nombre: "Tablet Android", precio: 300, cantidad: 10, descripcion: "Tablet de 10 pulgadas con Android 12" },
  { id: 10, nombre: "Disco duro externo 1TB", precio: 100, cantidad: 25, descripcion: "Almacenamiento portátil USB 3.0" }
];

document.addEventListener('DOMContentLoaded', () => {
    const list = document.querySelector("student-list");
    const form = document.querySelector("student-form");

    list.students = estudiantes;

    form.addEventListener("student-added", (e) => {
        const editedId = e.detail.id;
        const index = estudiantes.findIndex(s => s.id === editedId);

        if (index >= 0) {
            // Actualización
            estudiantes[index] = e.detail;
        } else {
            // Nuevo estudiante
            e.detail.id = estudiantes.length + 1;
            estudiantes.push(e.detail);
        }

        list.students = [...estudiantes];
    });

    list.addEventListener("student-deleted", (e) => {
        const id = e.detail.id;
        const index = estudiantes.findIndex(s => s.id === id);
        if (index >= 0) {
            estudiantes.splice(index, 1);
            list.students = [...estudiantes];
        }
    });

    list.addEventListener("student-edit", (e) => {
        form.setStudentToEdit(e.detail);
    });

    form.addEventListener("student-updated", (e) => {
    const actualizado = e.detail;
    estudiantes = estudiantes.map((s) =>
        s.id === actualizado.id ? actualizado : s
    );
    list.students = estudiantes;
});

});

