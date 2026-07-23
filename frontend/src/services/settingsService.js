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

   async backup() {

        const response = await api.get(

            "/settings/backup",

            {

                responseType: "blob"

            }

        );

        const url = window.URL.createObjectURL(

            new Blob([response.data])

        );

        const link = document.createElement("a");

        link.href = url;

        link.download = "backup.sql";

        document.body.appendChild(link);

        link.click();

        link.remove();

    }

};

export default settingsService;