import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store.ts';
import { RouterProvider } from 'react-router-dom';
import router from './routes/router.tsx';
import { PersistGate } from 'redux-persist/integration/react';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Provide the Redux store to the application */}
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
      <Toaster position="top-right" />
    </Provider>
  </React.StrictMode>
);
