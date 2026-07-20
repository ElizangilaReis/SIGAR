export default function downloadFile(

    response,

    filename

) {

    const blob = new Blob(

        [response.data]

    );

    const url = window.URL.createObjectURL(

        blob

    );

    const link = document.createElement(

        "a"

    );

    link.href = url;

    link.download = filename;

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(url);

}