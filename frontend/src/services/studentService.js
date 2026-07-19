import api from "./api";

const studentService = {

    getAll() {

        return api.get("/students");

    },

    get(id) {

        return api.get(`/students/${id}`);

    },

    create(data) {

        return api.post("/students", data);

    },

    update(id, data) {

        return api.put(`/students/${id}`, data);

    },

    remove(id) {

        return api.delete(`/students/${id}`);

    },

    changeStatus(id, status) {

        return api.patch(

            `/students/${id}/status`,

            { status }

        );

    }

};

export default studentService;