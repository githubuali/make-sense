import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import configureStore from './configureStore';
import { Provider } from 'react-redux';
import { AppInitializer } from './logic/initializer/AppInitializer';

export const store = configureStore();
export type AppDispatch = typeof store.dispatch

AppInitializer.inti();

// const root = ReactDOM.createRoot(document.getElementById('root') || document.createElement('div'));
ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
      document.getElementById('root'),
    );
