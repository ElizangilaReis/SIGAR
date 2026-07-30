import { useEffect, useState } from 'react';

import { getUser } from '../../../services/auth';
import notificationService from '../../../services/notificationService';

import './StudentHeader.css';

export default function StudentHeader() {

const user = getUser();

const [unread, setUnread] = useState(0);

useEffect(() => {

    loadNotifications();

}, []);

async function loadNotifications() {

    try {

        const notifications = await notificationService.getAll();

        setUnread(

            notifications.filter(notification => !notification.read).length

        );

    } catch {

        setUnread(0);

    }

}

return (

    <header className="admin-header">

        <div>

            <h2>Painel do Estudante</h2>

            <p>

                Bem-vindo,

                <strong> {user?.name}</strong>

            </p>

        </div>

        <div className="header-actions">

            <a

                href="/dashboard/notifications"

                className="notification-btn"

            >

                🔔

                {

                    unread > 0 && (

                        <span className="notification-badge">

                            {unread}

                        </span>

                    )

                }

            </a>

        </div>

    </header>

);

}

