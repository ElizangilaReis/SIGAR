import api from './api';

const notificationService = {

async getAll() {

    const response = await api.get('/student/notifications');

    return response.data.data;

},

async markAsRead(id) {

    const response = await api.patch(`/student/notifications/${id}/read`);

    return response.data;

}

};

export default notificationService;


