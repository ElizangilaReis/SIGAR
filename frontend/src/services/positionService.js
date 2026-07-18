import api from "./api";

const positionService = {

    getAll() {
        return api.get("/positions");
    },

    getByDepartment(departmentId) {
        return api.get(`/departments/${departmentId}/positions`);
    }

};

export default positionService;