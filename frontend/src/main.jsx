import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './routes';
import settingsService from './services/settingsService';

settingsService.applyTheme(
    settingsService.getCurrentTheme()
);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AppRoutes />
    </React.StrictMode>
);