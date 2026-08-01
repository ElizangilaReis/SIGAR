import { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';

import { getUser } from '../../../services/auth';
import notificationService from '../../../services/notificationService';

import './EmployeeHeader.css';

export default function EmployeeHeader() {

const user = getUser();

const [notifications, setNotifications] = useState([]);

const [unreadCount, setUnreadCount] = useState(0);

const [open, setOpen] = useState(false);

useEffect(() => {
    loadNotifications();

    const interval = setInterval(loadNotifications, 30000);

    return () => clearInterval(interval);
}, []);

async function loadNotifications() {
    try {
        const list = await notificationService.getNotifications();

        setNotifications(list);

        setUnreadCount(
            list.filter(notification => !notification.read).length
        );
    } catch (error) {
        console.error(error);
    }
}

async function handleRead(notification) {
    if (!notification.read) {
        await notificationService.markNotificationAsRead(
            notification.id
        );

        loadNotifications();
    }
}

async function handleReadAll() {
    await notificationService.markAllAsRead();

    loadNotifications();
}

return (
    <header className="admin-header">
        <div>
            <h2>Painel do Funcionário</h2>
            <p>
                Bem-vindo,
                <strong> {user?.name}</strong>
            </p>
        </div>

        <div className="header-notifications">
            <div
                className="notification-icon"
                onClick={() => setOpen(!open)}
            >
                <Bell size={22} />

                {unreadCount > 0 && (
                    <span className="notification-badge">
                        {unreadCount}
                    </span>
                )}
            </div>

            {open && (
                <div className="notification-dropdown">
                    <div className="notification-header">
                        <strong>Notificações</strong>

                        {unreadCount > 0 && (
                            <button
                                onClick={handleReadAll}
                                className="notification-read-all"
                            >
                                Marcar todas
                            </button>
                        )}
                    </div>

                    {notifications.length === 0 ? (
                        <div className="notification-empty">
                            Nenhuma notificação.
                        </div>
                    ) : (
                        notifications.map(notification => (
                            <div
                                key={notification.id}
                                className={`notification-item ${
                                    notification.read
                                        ? ''
                                        : 'unread'
                                }`}
                                onClick={() =>
                                    handleRead(notification)
                                }
                            >
                                <div className="notification-title">
                                    {notification.title}
                                </div>

                                <div className="notification-message">
                                    {notification.message}
                                </div>

                                <div className="notification-time">
                                    {new Date(
                                        notification.created_at
                                    ).toLocaleString('pt-PT')}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    </header>
);

}
