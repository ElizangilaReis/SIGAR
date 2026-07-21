import api from "./api";

async function download(url, filename) {

    const response = await api.get(url, {

        responseType: "blob"

    });

    const blob = new Blob([response.data]);

    const link = document.createElement("a");

    link.href = window.URL.createObjectURL(blob);

    link.download = filename;

    link.click();

}

const reportService = {

    dashboard() {

        return api.get("/reports/dashboard")
            .then(res => res.data.data);

    },

    charts() {

        return api.get("/reports/charts")
            .then(res => res.data.data);

    },

    students() {

        return api.get("/reports/students")
            .then(res => res.data.data);

    },

    employees() {

        return api.get("/reports/employees")
            .then(res => res.data.data);

    },

    documentRequests() {

        return api.get("/reports/document-requests")
            .then(res => res.data.data);

    },

    payments() {

        return api.get("/reports/payments")
            .then(res => res.data.data);

    },

    exportStudentsPdf() {

        return download(
            "/reports/students/pdf",
            "Estudantes.pdf"
        );

    },

    exportEmployeesPdf() {

        return download(
            "/reports/employees/pdf",
            "Funcionarios.pdf"
        );

    },

    exportRequestsPdf() {

        return download(
            "/reports/document-requests/pdf",
            "Pedidos.pdf"
        );

    },

    exportPaymentsPdf() {

        return download(
            "/reports/payments/pdf",
            "Pagamentos.pdf"
        );

    },

    exportStudentsExcel() {

        return download(
            "/reports/students/excel",
            "Estudantes.xlsx"
        );

    },

    exportEmployeesExcel() {

        return download(
            "/reports/employees/excel",
            "Funcionarios.xlsx"
        );

    },

    exportRequestsExcel() {

        return download(
            "/reports/document-requests/excel",
            "Pedidos.xlsx"
        );

    },

    exportPaymentsExcel() {

        return download(
            "/reports/payments/excel",
            "Pagamentos.xlsx"
        );

    }

};

export default reportService;