import api from "./api";

const documentRequestService = {

    getAll() {

        return api.get("/document-requests");

    },

    getById(id) {

        return api.get(`/document-requests/${id}`);

    },

    create(data) {

        return api.post("/document-requests", data);

    },

    update(id, data) {

        return api.put(`/document-requests/${id}`, data);

    },

    remove(id) {

        return api.delete(`/document-requests/${id}`);

    },

    changeStatus(id, status) {

        return api.patch(

            `/document-requests/${id}/status`,

            { status }

        );

    }

};

export default documentRequestService;