import api from "./api";

const employeeService = {

    getAll() {

        return api.get("/employees")
            .then(res => res.data.data);

    },

    getById(id) {

        return api.get(`/employees/${id}`)
            .then(res => res.data.data);

    },

    create(data) {

        return api.post("/employees", data);

    },

    update(id, data) {

        return api.put(`/employees/${id}`, data);

    },

    remove(id) {

        return api.delete(`/employees/${id}`);

    },

    changeStatus(id, status) {

        return api.patch(

            `/employees/${id}/status`,

            { status }

        );

    }

};

export default employeeService;