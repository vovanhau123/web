import './App';

const app = document.createElement('app-component');
document.body.appendChild(app);


import('remoteApp/Config').then((module) => {
  const RemoteConfig = module.default;
  customElements.define('remote-config', RemoteConfig);
});