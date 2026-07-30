import api from './api';

const documentService = {

getMyDocuments() {

    return api
        .get('/student/documents')
        .then(response => response.data.data);

},

getViewUrl(id) {

    return `http://127.0.0.1:8000/api/student/documents/${id}/view`;

},

getDownloadUrl(id) {

    return `http://127.0.0.1:8000/api/student/documents/${id}/download`;

}

};

export default documentService;
