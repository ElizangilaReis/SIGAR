import { useEffect, useState } from 'react';

import Button from '../../../components/common/Button/Button';
import settingsService from '../../../services/settingsService';

export default function Settings() {
const [theme, setTheme] = useState(
settingsService.getCurrentTheme()
);

useEffect(() => {
    settingsService.applyTheme(theme);

    if (theme !== 'system') {
        return;
    }

    const media = window.matchMedia(
        '(prefers-color-scheme: dark)'
    );

    const handler = () =>
        settingsService.applyTheme('system');

    if (media.addEventListener) {
        media.addEventListener('change', handler);
    } else {
        media.addListener(handler);
    }

    return () => {
        if (media.removeEventListener) {
            media.removeEventListener(
                'change',
                handler
            );
        } else {
            media.removeListener(handler);
        }
    };
}, [theme]);

function changeTheme(value) {
    setTheme(value);
    settingsService.applyTheme(value);
}

return (
    <>
        <div className="dashboard-header">
            <h1>Configurações</h1>

            <p>
                Personalize a sua experiência na plataforma.
            </p>
        </div>

        <div className="settings-container">
            <div className="settings-card">
                <h3>Aparência</h3>

                <p>
                    Escolha o tema da plataforma.
                </p>

                <div
                    style={{
                        display: 'flex',
                        gap: '12px',
                        marginTop: '20px',
                        flexWrap: 'wrap',
                    }}
                >
                    <Button
                        variant={
                            theme === 'light'
                                ? 'primary'
                                : 'secondary'
                        }
                        onClick={() =>
                            changeTheme('light')
                        }
                    >
                        ☀ Claro
                    </Button>

                    <Button
                        variant={
                            theme === 'dark'
                                ? 'primary'
                                : 'secondary'
                        }
                        onClick={() =>
                            changeTheme('dark')
                        }
                    >
                        🌙 Escuro
                    </Button>

                    <Button
                        variant={
                            theme === 'system'
                                ? 'primary'
                                : 'secondary'
                        }
                        onClick={() =>
                            changeTheme('system')
                        }
                    >
                        💻 Automático
                    </Button>
                </div>

                <p
                    style={{
                        marginTop: '16px',
                        color: '#6b7280',
                        fontSize: '13px',
                    }}
                >
                    Tema actual:{' '}
                    <strong>
                        {theme === 'light'
                            ? 'Claro'
                            : theme === 'dark'
                              ? 'Escuro'
                              : 'Automático (Sistema)'}
                    </strong>
                </p>
            </div>

            <div className="settings-card">
                <h3>Idioma</h3>

                <p>Português (Angola)</p>

                <small>
                    Brevemente será possível alterar o idioma.
                </small>
            </div>

            <div className="settings-card">
                <h3>Notificações</h3>

                <p>
                    Em breve poderá definir como deseja receber notificações da plataforma.
                </p>
            </div>
        </div>
    </>
);


}
