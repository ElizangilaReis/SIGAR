import { useEffect, useState } from 'react';

import documentService from '../../../services/documentService';

import Loading from '../../../components/common/Loading/Loading';
import Modal from '../../../components/common/Modal/Modal';
import Button from '../../../components/common/Button/Button';

import './MyDocuments.css';

export default function MyDocuments() {

const [loading, setLoading] = useState(true);

const [documents, setDocuments] = useState([]);

const [selectedDocument, setSelectedDocument] = useState(null);

useEffect(() => {

    loadDocuments();

}, []);

async function loadDocuments() {

    try {

        setLoading(true);

        const data = await documentService.getMyDocuments();

        setDocuments(Array.isArray(data) ? data : []);

    } catch (error) {

        console.error(error);

        setDocuments([]);

    } finally {

        setLoading(false);

    }

}

if (loading) {

    return <Loading />;

}

return (

    <div className="student-dashboard">

        <div className="dashboard-header">

            <h1>Meus Documentos</h1>

            <p>Consulte e descarregue os seus documentos digitais.</p>

        </div>

        <div className="card">

            <table className="dashboard-table">

                <thead>

                    <tr>

                        <th>Documento</th>

                        <th>Referência</th>

                        <th>Emitido em</th>

                        <th>Ações</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        documents.length > 0

                            ?

                            documents.map(document => (

                                <tr key={document.id}>

                                    <td>{document.document_type?.name || document.documentType?.name}</td>

                                    <td>{document.reference}</td>

                                    <td>

                                        {

                                            document.issued_at

                                                ?

                                                new Date(document.issued_at).toLocaleDateString('pt-PT')

                                                :

                                                '-'

                                        }

                                    </td>

                                    <td>

                                        <div className="documents-actions">

                                            <Button

                                                variant="secondary"

                                                onClick={() => setSelectedDocument(document)}

                                            >

                                                Ver

                                            </Button>

                                            <Button

                                                variant="primary"

                                                onClick={() => window.open(documentService.getDownloadUrl(document.id), '_blank')}

                                            >

                                                Download

                                            </Button>

                                        </div>

                                    </td>

                                </tr>

                            ))

                            :

                            <tr>

                                <td colSpan="4" className="documents-empty">

                                    Nenhum documento disponível.

                                </td>

                            </tr>

                    }

                </tbody>

            </table>

        </div>

        <Modal

            open={!!selectedDocument}

            title={selectedDocument?.document_type?.name || selectedDocument?.documentType?.name || 'Documento'}

            onClose={() => setSelectedDocument(null)}

        >

            {

                selectedDocument && (

                    <iframe

                        src={documentService.getViewUrl(selectedDocument.id)}

                        className="documents-viewer"

                        title="Documento PDF"

                    />

                )

            }

        </Modal>

    </div>

);

}
