import React from 'react';
import ReactDOM from 'react-dom/client';

const ConfigComponent: React.FC = () => (
  <div>
    <h2>Config from Remote App</h2>
    <p>This is a React component exposed as a Web Component</p>
  </div>
);

class ConfigWebComponent extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement('div');
    this.attachShadow({ mode: 'open' }).appendChild(mountPoint);

    const root = ReactDOM.createRoot(mountPoint);
    root.render(<ConfigComponent />);
  }
}

customElements.define('remote-config', ConfigWebComponent);

export default ConfigWebComponent;