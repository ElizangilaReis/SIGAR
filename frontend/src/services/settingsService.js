import api from "./api";

const settingsService = {

    get() {

        return api
            .get("/settings")
            .then(res => res.data.data);

    },

    update(data) {

        return api
            .put("/settings", data)
            .then(res => res.data);

    },

    uploadLogo(file) {

        const formData = new FormData();

        formData.append("logo", file);

        return api.post(

            "/settings/logo",

            formData,

            {

                headers: {

                    "Content-Type": "multipart/form-data"

                }

            }

        );

    },

    backup() {

        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

        window.open(

            `${apiUrl}/settings/backup`,

            "_blank"

        );

    }

};

export default settingsService;