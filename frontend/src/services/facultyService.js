import api from "./api";

const facultyService = {

    async getAll() {

        const response = await api.get("/faculties");

        return response.data.data;
    }

};

export default facultyService;