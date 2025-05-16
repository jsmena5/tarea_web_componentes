class StudentForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.editingId = null;
  }

  connectedCallback() {
    this.render();
  }

  render = () => {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          justify-content: center;
          padding-top: 50px;
          background-color: #000;
          min-height: 100vh;
          box-sizing: border-box;
        }

        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: 360px;
          padding: 20px;
        }

        h2 {
          color: rgb(20, 255, 251);
          font-family: sans-serif;
          text-shadow: 0 0 10px rgb(20, 231, 255), 0 0 20px rgb(20, 255, 255);
          margin-bottom: 20px;
          text-align: center;
        }

        form {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 20px;
          background-color: #000;
          border-radius: 10px;
          box-shadow: 0 0 15px rgb(20, 255, 255);
          color: rgb(20, 239, 255);
          font-family: sans-serif;
          width: 100%;
        }

        input[type="text"],
        input[type="number"] {
          padding: 8px 10px;
          border-radius: 6px;
          border: 1px solid rgb(20, 255, 247);
          background-color: #111;
          color: rgb(20, 212, 255);
          box-shadow: 0 0 6px rgb(20, 204, 255);
          font-size: 14px;
        }

        input::placeholder {
          color: rgb(20, 247, 255);
          opacity: 0.6;
        }

        button {
          padding: 10px;
          background-color: #000;
          color: rgb(20, 220, 255);
          border: 1px solid rgb(20, 235, 255);
          border-radius: 6px;
          cursor: pointer;
          font-weight: bold;
          text-shadow: 0 0 5px rgb(20, 255, 235);
          box-shadow: 0 0 8px rgb(20, 165, 255);
          transition: background 0.3s ease, transform 0.2s ease;
        }

        button:hover {
          background-color: #111;
          transform: scale(1.03);
          box-shadow: 0 0 12px rgb(20, 165, 255);
        }
      </style>

      <div class="container">
        <form id="form-students">
          <input type="text" name="nombre" placeholder="Ingrese el nombre" required>
          <input type="text" name="precio" placeholder="Ingrese el precio" required>
          <input type="text" name="cantidad" placeholder="Ingrese la cantidad" required>
          <input type="text" name="descripcion" placeholder="Ingrese la descripción" required>
          <button type="submit">Enviar</button>
        </form>
      </div>
    `;

    this.shadowRoot
      .getElementById("form-students")
      .addEventListener("submit", (e) => {
        e.preventDefault();

        const form = e.target;

        const student = {
          id: this.editingId ?? 0,
          nombre: form.nombre.value.trim(),
          precio: form.precio.value.trim(),
          cantidad: form.cantidad.value.trim(),
          descripcion: form.descripcion.value.trim(),
        };

        if (this.editingId !== null) {
          this.dispatchEvent(new CustomEvent("student-updated", {
            detail: student,
            bubbles: true,
            composed: true,
          }));
          this.editingId = null;
        } else {
          this.dispatchEvent(new CustomEvent("student-added", {
            detail: student,
            bubbles: true,
            composed: true,
          }));
        }

        form.reset();
      });
  };

  setStudentToEdit(student) {
    console.log("Editando estudiante:", student);
    this.editingId = student.id;
    const form = this.shadowRoot.getElementById("form-students");
    form.nombre.value = student.nombre;
    form.precio.value = student.precio;
    form.cantidad.value = student.cantidad;
    form.descripcion.value = student.descripcion;
  }
}

window.customElements.define("student-form", StudentForm);