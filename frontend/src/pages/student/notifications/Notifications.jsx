import { useEffect, useState } from 'react';

import notificationService from '../../../services/notificationService';

import Loading from '../../../components/common/Loading/Loading';
import Badge from '../../../components/common/Badge/Badge';

export default function Notifications() {

const [loading, setLoading] = useState(true);

const [notifications, setNotifications] = useState([]);

useEffect(() => {

    loadNotifications();

}, []);

async function loadNotifications() {

    try {

        setLoading(true);

        const data = await notificationService.getAll();

        setNotifications(data);

    } finally {

        setLoading(false);

    }

}

async function markAsRead(notification) {

    if (notification.read) return;

    await notificationService.markAsRead(notification.id);

    await loadNotifications();

}

if (loading) return <Loading />;

return (

    <>

        <div className="dashboard-header">

            <h1>Notificações</h1>

            <p>Acompanhe as actualizações dos seus pedidos.</p>

        </div>

        <div className="card">

            {

                notifications.length > 0

                    ?

                    notifications.map(notification => (

                        <div

                            key={notification.id}

                            onClick={() => markAsRead(notification)}

                            style={{

                                padding: 18,

                                borderBottom: '1px solid #e5e7eb',

                                cursor: 'pointer',

                                background: notification.read ? '#ffffff' : '#eff6ff'

                            }}

                        >

                            <div

                                style={{

                                    display: 'flex',

                                    justifyContent: 'space-between',

                                    alignItems: 'center'

                                }}

                            >

                                <strong>{notification.title}</strong>

                                {

                                    !notification.read && (

                                        <Badge status="Novo" />

                                    )

                                }

                            </div>

                            <p style={{ marginTop: 8 }}>

                                {notification.message}

                            </p>

                            <small style={{ color: '#6b7280' }}>

                                {new Date(notification.created_at).toLocaleString('pt-PT')}

                            </small>

                        </div>

                    ))

                    :

                    <div style={{ padding: 24 }}>

                        Nenhuma notificação encontrada.

                    </div>

            }

        </div>

    </>

);

}
