import api from "./api";

const departmentService = {

    getAll() {
        return api.get("/departments");
    },

    getById(id) {
        return api.get(`/departments/${id}`);
    },

    create(data) {
        return api.post("/departments", data);
    },

    update(id, data) {
        return api.put(`/departments/${id}`, data);
    },

    remove(id) {
        return api.delete(`/departments/${id}`);
    },

    changeStatus(id, active) {
        return api.patch(
            `/departments/${id}/status`,
            { active }
        );
    }

};

export default departmentService;