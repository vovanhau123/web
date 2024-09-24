import React from 'react';
import ReactDOM from 'react-dom/client';
import WalletComponent from './WalletComponent';

class WalletWebComponent extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement('div');
    this.attachShadow({ mode: 'open' }).appendChild(mountPoint);

    const root = ReactDOM.createRoot(mountPoint);
    root.render(<WalletComponent />);
  }
}

customElements.define('wallet-component', WalletWebComponent);

export default WalletWebComponent;