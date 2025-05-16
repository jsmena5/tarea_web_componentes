// acerca-de.js

class AcercaDe extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }); // Crea el shadow DOM
  }

  connectedCallback() {
    this.render(); // Renderiza el contenido cuando se conecta al DOM
  }

  render = () => {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #000;
        }

        .container {
          font-family: sans-serif;
          padding: 20px 40px;
          background-color: #000;
          color: rgb(20, 255, 255);
          text-align: center;
          border-radius: 20px;
          box-shadow: 0 0 25px rgba(20, 255, 255, 0.3);
        }

        h2 {
          color: rgb(20, 255, 251);
          text-shadow: 0 0 10px rgb(20, 231, 255), 0 0 20px rgb(20, 255, 255);
        }

        ul {
          margin-top: 10px;
          padding-left: 0;
          list-style: none;
        }

        li {
          margin: 10px 0;
        }

        .nombre {
          padding: 10px 20px;
          border-radius: 15px;
          background-color: #000;
          box-shadow:
            0 0 5px rgb(20, 255, 247),
            0 0 10px rgb(20, 255, 247),
            0 0 20px rgb(20, 255, 247);
        }
      </style>

      <div class="container">
        <h2>Integrantes:</h2>
        <p>Aplicación desarrollada por:</p>
        <ul>
          <li><div class="nombre">Mateo Colina</div></li>
          <li><div class="nombre">Oscar Chanataxi</div></li>
          <li><div class="nombre">James Mena</div></li>
        </ul>
      </div>
    `;
  }
}

// Define el componente personalizado <acerca-de>
customElements.define('acerca-de', AcercaDe);