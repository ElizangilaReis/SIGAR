import { useEffect, useState } from 'react';

import documentService from '../../../services/documentService';

import Loading from '../../../components/common/Loading/Loading';
import Modal from '../../../components/common/Modal/Modal';
import Button from '../../../components/common/Button/Button';
import Table from '../../../components/common/Table/Table';

import './MyDocuments.css';

export default function MyDocuments() {

const [loading, setLoading] = useState(true);

const [documents, setDocuments] = useState([]);

const [selectedDocument, setSelectedDocument] = useState(null);

const [pdfUrl, setPdfUrl] = useState(null);

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

async function handleView(document) {
    try {

        const url = await documentService.getDocumentBlob(document.id);

        setPdfUrl(url);

        setSelectedDocument(document);

    } catch (error) {

        console.error(error);

        alert('Não foi possível abrir o documento.');

    }
}

function handlePrint() {

    if (!selectedDocument) return;

    const url = documentService.getViewUrl(selectedDocument.id);

    const printWindow = window.open(url, '_blank');

    printWindow.onload = () => {

        printWindow.print();

    };

}

if (loading) {

    return <Loading />;

}

return (

    <div className="student-dashboard">

        <div className="dashboard-header">

            <h1>Meus Documentos</h1>

            <p>

                Consulte, visualize e descarregue os seus documentos digitais.

            </p>

        </div>

        <div className="card">

            <Table
            columns={[
                'Documento',
                'Referência',
                'Emitido em',
                'Ações',
            ]}
        >
            {documents.length > 0 ? (
                documents.map((document) => (
                    <tr key={document.id}>
                        <td>
                            {document.document_type?.name ||
                            document.documentType?.name}
                        </td>

                        <td>{document.reference}</td>

                        <td>
                            {document.issued_at
                                ? new Date(
                                    document.issued_at
                                ).toLocaleDateString('pt-PT')
                                : '-'}
                        </td>

                        <td>
                            <div className="documents-actions">
                                <Button
                                    variant="secondary"
                                    disabled={!document.can_view}
                                    onClick={() => handleView(document)}
                                >
                                    Ver
                                </Button>

                                <Button
                                    variant="primary"
                                    onClick={() =>
                                        documentService.downloadDocument(
                                            document.id,
                                            document.reference
                                        )
                                    }
                                >
                                    Download
                                </Button>
                            </div>
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td
                        colSpan="4"
                        className="documents-empty"
                    >
                        Nenhum documento disponível.
                    </td>
                </tr>
            )}
        </Table>

        </div>

        <Modal
            open={!!selectedDocument}
            title={
                selectedDocument?.document_type?.name ||
                selectedDocument?.documentType?.name ||
                'Documento'
            }
            onClose={() => {
                setSelectedDocument(null);
                if (pdfUrl) URL.revokeObjectURL(pdfUrl);
                setPdfUrl(null);
            }}
        >
            {selectedDocument && pdfUrl && (
                <>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: 16,
                        }}
                    >
                        <div>
                            <strong>
                                {selectedDocument.reference}
                            </strong>
                        </div>

                        <div
                            style={{
                                display: 'flex',
                                gap: 8,
                            }}
                        >
                            <Button
                                variant="secondary"
                                onClick={handlePrint}
                            >
                                Imprimir
                            </Button>

                            <Button
                                variant="primary"
                                onClick={() =>
                                    documentService.downloadDocument(
                                        selectedDocument.id,
                                        selectedDocument.reference
                                    )
                                }
                            >
                                Download
                            </Button>
                        </div>
                    </div>

                    <iframe
                        src={pdfUrl}
                        style={{
                            width: '100%',
                            height: '85vh',
                            border: '1px solid #e5e7eb',
                            borderRadius: 8,
                            background: '#fff',
                        }}
                        title="Documento PDF"
                    />
                </>
            )}
        </Modal>
    </div>

);

}
