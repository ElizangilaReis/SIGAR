import api from './api';

const verificationService = {
    async verify(code) {
        const response = await api.get(`/verificar/${code}`);
        return response.data;
    }
};

export default verificationService;