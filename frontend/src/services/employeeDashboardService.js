import api from "./api";

const employeeDashboardService = {

    async getDashboard() {

        const response = await api.get("/employee/dashboard");

        return response.data.data;

    }

};

export default employeeDashboardService;