import React, { useEffect, useRef } from 'react';

const App: React.FC = () => {
  const walletRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import('walletApp/WalletWebComponent').then(() => {
      if (walletRef.current) {
        const walletElement = document.createElement('wallet-component');
        walletRef.current.appendChild(walletElement);
      }
    });
  }, []);

  return (
    <div>
      <h1>Host App</h1>
      <div ref={walletRef}></div>
    </div>
  );
};

export default App;