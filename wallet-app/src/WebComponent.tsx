import React from 'react';
import ReactDOM from 'react-dom';
import WalletComponent from './WalletComponent';

class WalletWebComponent extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement('div');
    this.attachShadow({ mode: 'open' }).appendChild(mountPoint);

    ReactDOM.render(<WalletComponent />, mountPoint);
  }
}

customElements.define('wallet-component', WalletWebComponent);