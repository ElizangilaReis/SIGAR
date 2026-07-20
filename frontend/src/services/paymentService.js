import api from "./api";

const paymentService = {

    getAll() {

        return api
            .get("/payments")
            .then(res => res.data.data);

    },

    getById(id) {

        return api
            .get(`/payments/${id}`)
            .then(res => res.data.data);

    },

    create(data) {

        return api.post(

            "/payments",

            data

        );

    },

    update(id, data) {

        return api.put(

            `/payments/${id}`,

            data

        );

    },

    remove(id) {

        return api.delete(

            `/payments/${id}`

        );

    },

    changeStatus(id, status) {

        return api.patch(

            `/payments/${id}/status`,

            { status }

        );

    }

};

export default paymentService;