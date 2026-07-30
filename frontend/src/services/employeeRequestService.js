import api from "./api";

const employeeRequestService = {

    getAll() {

        return api
            .get("/employee/requests")
            .then(res => res.data.data);

    },

    get(id) {

        return api
            .get(`/employee/requests/${id}`)
            .then(res => res.data.data);

    },

    update(id, data) {

        return api.put(`/document-requests/${id}`, data);

    },

    getReadyDocuments() {
        return api
            .get('/employee/documents/ready')
            .then(res => res.data.data);
    },

};

export default employeeRequestService;