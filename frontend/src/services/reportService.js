import api from "./api";

const reportService = {

    dashboard() {

        return api
            .get("/reports/dashboard")
            .then(res => res.data.data);

    },

    charts() {

        return api
            .get("/reports/charts")
            .then(res => res.data.data);

    },

    students() {

        return api
            .get("/reports/students")
            .then(res => res.data.data);

    },

    employees() {

        return api
            .get("/reports/employees")
            .then(res => res.data.data);

    },

    documentRequests() {

        return api
            .get("/reports/document-requests")
            .then(res => res.data.data);

    },

    payments() {

        return api
            .get("/reports/payments")
            .then(res => res.data.data);

    },

    exportStudentsPdf() {

        return api.get(

            "/reports/students/pdf",

            {

                responseType: "blob"

            }

        );

    },

    exportStudentsExcel() {

        return api.get(

            "/reports/students/excel",

            {

                responseType: "blob"

            }

        );

    },

    exportEmployeesPdf() {

        return api.get(

            "/reports/employees/pdf",

            {

                responseType: "blob"

            }

        );

    },

    exportEmployeesExcel() {

        return api.get(

            "/reports/employees/excel",

            {

                responseType: "blob"

            }

        );

    },

    exportDocumentRequestsPdf() {

        return api.get(

            "/reports/document-requests/pdf",

            {

                responseType: "blob"

            }

        );

    },

    exportDocumentRequestsExcel() {

        return api.get(

            "/reports/document-requests/excel",

            {

                responseType: "blob"

            }

        );

    },

    exportPaymentsPdf() {

        return api.get(

            "/reports/payments/pdf",

            {

                responseType: "blob"

            }

        );

    },

    exportPaymentsExcel() {

        return api.get(

            "/reports/payments/excel",

            {

                responseType: "blob"

            }

        );

    }

};

export default reportService;