import api from './api';

const documentService = {
    async getMyDocuments() {
        const response = await api.get('/student/documents');
        return response.data.data || [];
    },

    async getDocumentBlob(id) {
        const response = await api.get(
            `/student/documents/${id}/view`,
            {
                responseType: 'blob',
            }
        );

        return URL.createObjectURL(response.data);
    },

    async downloadDocument(id, reference) {
        const response = await api.get(
            `/student/documents/${id}/download`,
            {
                responseType: 'blob',
            }
        );

        const url = URL.createObjectURL(response.data);

        const link = document.createElement('a');
        link.href = url;
        link.download = `${reference}.pdf`;
        document.body.appendChild(link);
        link.click();
        link.remove();

        URL.revokeObjectURL(url);
    },
};

export default documentService;