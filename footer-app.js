class FooterApp extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" }); // Crea el shadow DOM
  }

  connectedCallback() {
    // Renderiza el contenido del footer
    this.shadow.innerHTML = `
      <style>
        :host {
          display: block;
          background-color: #000; 
          color: rgb(20, 251, 255); 
          text-align: center;
          padding: 15px;
          font-family: Arial, sans-serif;
          font-size: 14px;
          text-shadow: 0 0 8px rgb(20, 220, 255); /* Efecto neón */
        }

        a {
          color: rgb(20, 255, 251);
          margin: 0 10px;
          text-decoration: none;
          text-shadow: 0 0 5px rgb(20, 239, 255);
        }

        a:hover {
          text-decoration: underline;
          color: rgba(20, 255, 251, 0.97); 
        }
      </style>

      <div>
        © 2025 Todos los derechos reservados.
        <div>
          <!-- Enlaces a redes o perfiles -->
          <a href="https://github.com/tuusuario" target="_blank">GitHub</a> |
          <a href="https://linkedin.com/in/tuusuario" target="_blank">LinkedIn</a>
        </div>
      </div>
    `;
  }
}

// Define el componente personalizado <footer-app>
customElements.define("footer-app", FooterApp);