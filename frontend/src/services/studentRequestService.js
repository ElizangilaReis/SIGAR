import api from "./api";

const studentRequestService = {

    getAll(){

        return api
            .get("/student/requests")
            .then(res => res.data.data);

    },

    create(data){

        return api
            .post("/document-requests", data)
            .then(res => res.data);

    }

};

export default studentRequestService;