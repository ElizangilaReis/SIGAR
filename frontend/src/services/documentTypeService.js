import api from "./api";

const documentTypeService = {

    getAll() {
        return api.get("/document-types");
    },

    getById(id) {
        return api.get(`/document-types/${id}`);
    },

    create(data) {
        return api.post("/document-types", data);
    },

    update(id, data) {
        return api.put(`/document-types/${id}`, data);
    },

    remove(id) {
        return api.delete(`/document-types/${id}`);
    },

    changeStatus(id, active) {
        return api.patch(
            `/document-types/${id}/status`,
            { active }
        );
    }

};

export default documentTypeService;