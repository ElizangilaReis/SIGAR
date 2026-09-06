import api from './api';

const paymentService = {

    async getAll() {
        const response = await api.get('/payments');

        return response.data.data;
    },

    async myPayments() {
        const response = await api.get('/student/payments');

        return response.data.data;
    },

    async employeePayments() {
        const response = await api.get('/employee/payments');

        return response.data.data;
    },

    async confirmPayment(id) {
        const response = await api.post(
            `/student/payments/${id}/confirm`
        );

        return response.data;
    },

    async getReceiptBlob(paymentId) {
        const response = await api.get(
            `/student/payments/${paymentId}/receipt`,
            {
                responseType: 'blob',
            }
        );

        return URL.createObjectURL(response.data);
    },

    getReceiptViewUrl(paymentId) {
        return `${API_URL}/student/payments/${paymentId}/receipt`;
    },

    async downloadReceipt(paymentId, reference) {
        const response = await api.get(
            `/student/payments/${paymentId}/receipt`,
            {
                responseType: 'blob',
            }
        );

        const url = URL.createObjectURL(response.data);

        const link = document.createElement('a');
        link.href = url;
        link.download = `RECIBO_${reference}.pdf`;

        document.body.appendChild(link);
        link.click();
        link.remove();

        URL.revokeObjectURL(url);
    },

};

export default paymentService;