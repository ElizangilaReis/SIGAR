import api from './api';

const notificationService = {
    // Compatibilidade com o estudante
    async getAll() {
        const response = await api.get('/student/notifications');
        return response.data.data || [];
    },

    async markAsRead(id) {
        const response = await api.patch(
            `/student/notifications/${id}/read`
        );
        return response.data;
    },

    // Rotas reutilizáveis (employee e admin)
    async getNotifications() {
        const response = await api.get('/notifications');
        return response.data.data || [];
    },

    async getUnreadCount() {
        const response = await api.get(
            '/notifications/unread-count'
        );
        return response.data.count || 0;
    },

    async markNotificationAsRead(id) {
        const response = await api.patch(
            `/notifications/${id}/read`
        );
        return response.data;
    },

    async markAllAsRead() {
        const response = await api.patch(
            '/notifications/read-all'
        );
        return response.data;
    },
};

export default notificationService;


