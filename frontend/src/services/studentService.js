import api from "./api";

const studentService = {

    getAll() {

        return api.get("/students")
            .then(res => res.data.data);

    },

    get(id) {

        return api.get(`/students/${id}`)
            .then(res => res.data.data);

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