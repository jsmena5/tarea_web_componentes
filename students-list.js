class StudentList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this._students = [];
  }

    connectedCallback() {
        this.render();
    }

    set students(arr){
        //esta seteando
        if(!Array.isArray(arr)) return;
        this._students = arr;
        this.render();
       
    }

    get students() {
        return this._students;
    }

    render(){
        this.shadowRoot.innerHTML = ``;

        const style = document.createElement("style");
        style.textContent = `
            table{
                width: 100%;
                border-collapse: collapse;
            }
            th, td{
                padding: 10px;
                text-align: left;
                border-bottom: 1px solid #ddd;
            }
            th{
                background-color: #f2f2f2;
            }
            tbody{
                background-color: #fff;
            }
            .container {
                display: flex;
                flex-wrap: wrap;
                gap: 20px;
            }
        `;
const soloLectura = this.hasAttribute("solo-lectura");
        const table = document.createElement("table");
        const thead = document.createElement("thead");
        thead.innerHTML = `
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Descripcion</th>
                
                ${!soloLectura ? `
        <th>Accion</th>
` : ""}
            </tr>
        `;
        const tbody = document.createElement("tbody");
        
        this._students.forEach((student) => {
    const fila = document.createElement("tr");
    
    fila.innerHTML = `
        <td>${student.id}</td>
        <td>${student.nombre}</td>
        <td>${student.precio}</td>
        <td>${student.cantidad}</td>
        <td>${student.descripcion}</td>
        ${!soloLectura ? `
        <td>
            <button class="btn-delete" data-id="${student.id}">Eliminar</button>
            <button class="btn-edit" data-id="${student.id}">Editar</button>
        </td>
` : ""}

    `;
    
    tbody.appendChild(fila);
    });

        table.appendChild(thead);
        table.appendChild(tbody);

        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(table);

        this.shadowRoot.querySelectorAll(".btn-delete").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const id = parseInt(btn.dataset.id);
            this.dispatchEvent(new CustomEvent("student-deleted", {
                detail: { id },
                bubbles: true,
                composed: true,
            }));
        });
        });

        this.shadowRoot.querySelectorAll(".btn-edit").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const id = parseInt(btn.dataset.id);
                const student = this._students.find(s => s.id === id);
                this.dispatchEvent(new CustomEvent("student-edit", {
                    detail: student,
                    bubbles: true,
                    composed: true,
                }));
            });
        });


    }
}

window.customElements.define("student-list", StudentList);