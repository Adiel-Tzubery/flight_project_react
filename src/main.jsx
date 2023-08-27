import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// setup for the global store
import { StoreProvider } from 'easy-peasy';
import { store } from './state/index';

// setup for the css
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from '@material-tailwind/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <StoreProvider store={store}>
        <App />
      </StoreProvider>
    </ThemeProvider>
  </React.StrictMode>
);
