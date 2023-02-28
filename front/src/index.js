import ReactDOM from 'react-dom/client';
import './assets/style/index.css';
import App from './App';
import StoreProvider from './components/StoreProvider.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StoreProvider>
    <App />
  </StoreProvider>
);