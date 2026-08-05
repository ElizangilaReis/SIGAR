import { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';

import { getUser } from '../../../services/auth';
import notificationService from '../../../services/notificationService';

import './EmployeeHeader.css';

export default function EmployeeHeader({ onMenuClick }) {

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
   <header className="employee-header">

    <button
        className="menu-btn"
        onClick={onMenuClick}
    >
        ☰
    </button>

    <div>
        <h2>Painel do Funcionário</h2>
        <p>Bem-vindo, <strong>{user?.name}</strong></p>
    </div>

    <div className="header-notifications">
        {/* mantém o resto igual */}
    </div>

</header>
);

}
