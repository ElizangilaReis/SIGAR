import api from "./api";

const studentDashboardService = {

    getDashboard() {

        return api
            .get("/student/dashboard")
            .then(res => res.data.data);

    }

};

export default studentDashboardService;