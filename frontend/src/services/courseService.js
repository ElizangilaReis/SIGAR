import api from "./api";

const courseService = {

    async getAll() {

        const response = await api.get("/courses");

        return response.data.data;
    }

};

export default courseService;