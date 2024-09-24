class AppComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div>
        <h1>App 1 Host (Web Component)</h1>
        <remote-config></remote-config>
      </div>
    `;
  }
}

customElements.define('app-component', AppComponent);