import api from './api';

const settingsService = {
async get() {
const response = await api.get('/settings');
return response.data.data;
},

async update(data) {
    const response = await api.put('/settings', data);
    return response.data;
},

async uploadLogo(file) {
    const formData = new FormData();
    formData.append('logo', file);

    const response = await api.post(
        '/settings/logo',
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
    );

    return response.data;
},

async backup() {
    const response = await api.get(
        '/settings/backup',
        {
            responseType: 'blob',
        }
    );

    const url = window.URL.createObjectURL(response.data);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'backup.sql';

    document.body.appendChild(link);
    link.click();
    link.remove();

    window.URL.revokeObjectURL(url);
},

applyTheme(theme) {
    localStorage.setItem('theme', theme);

    let appliedTheme = theme;

    if (theme === 'system') {
        appliedTheme = window.matchMedia(
            '(prefers-color-scheme: dark)'
        ).matches
            ? 'dark'
            : 'light';
    }

    document.body.classList.remove(
        'theme-light',
        'theme-dark'
    );

    document.body.classList.add(
        `theme-${appliedTheme}`
    );
},

getCurrentTheme() {
    return (
        localStorage.getItem('theme') ||
        'system'
    );
},

};

export default settingsService;
