import api from "./api";

const documentRequestService = {

    getAll() {

        return api.get("/document-requests")
            .then(res => res.data.data);

    },

    getById(id) {

        return api.get(`/document-requests/${id}`)
            .then(res => res.data.data);

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