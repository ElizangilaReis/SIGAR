import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import paymentService from '../../../services/paymentService';

import Loading from '../../../components/common/Loading/Loading';
import SearchBar from '../../../components/common/SearchBar/SearchBar';
import Table from '../../../components/common/Table/Table';
import Badge from '../../../components/common/Badge/Badge';
import Button from '../../../components/common/Button/Button';
import Modal from '../../../components/common/Modal/Modal';

export default function MyPayments() {

const location = useLocation();

const newPayment = location.state;

const [loading, setLoading] = useState(true);

const [payments, setPayments] = useState([]);

const [search, setSearch] = useState('');

const [showNewPayment, setShowNewPayment] = useState(!!newPayment);

const [selectedPayment, setSelectedPayment] = useState(null);

const [receiptUrl, setReceiptUrl] = useState(null);

useEffect(() => {
    loadPayments();
}, []);

async function loadPayments() {
    try {
        setLoading(true);
        const data = await paymentService.myPayments();
        setPayments(data);
    } finally {
        setLoading(false);
    }
}

async function handleViewReceipt(payment) {
    try {
        const url = await paymentService.getReceiptBlob(payment.id);
        setReceiptUrl(url);
        setSelectedPayment(payment);
    } catch (error) {
        console.error(error);
        alert('Não foi possível abrir o recibo.');
    }
}

function handlePrint() {
    if (!receiptUrl) return;

    const printWindow = window.open(receiptUrl, '_blank');
    printWindow.onload = () => {
        printWindow.print();
    };
}

if (loading) {
    return <Loading />;
}

const filtered = payments.filter(payment =>
    payment.reference.toLowerCase().includes(search.toLowerCase()) ||
    payment.status.toLowerCase().includes(search.toLowerCase())
);

return (
    <>
        <div className="dashboard-header">
            <h1>Meus Pagamentos</h1>
            <p>Consulte todos os pagamentos efectuados.</p>
        </div>

        {showNewPayment && newPayment && (
            <div
                style={{
                    background: '#ecfdf5',
                    border: '1px solid #22c55e',
                    borderRadius: 8,
                    padding: 20,
                    marginBottom: 20,
                    position: 'relative',
                }}
            >
                <h3>Pedido registado com sucesso</h3>

                <button
                    onClick={() => setShowNewPayment(false)}
                    style={{
                        position: 'absolute',
                        right: 15,
                        top: 15,
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer',
                        fontSize: 18,
                        fontWeight: 'bold',
                    }}
                >
                    ×
                </button>

                <p>Utilize a referência abaixo para efectuar o pagamento.</p>

                <hr />

                <p>
                    <strong>Referência:</strong> {newPayment.reference}
                </p>

                <p>
                    <strong>Valor:</strong> {newPayment.amount} Kz
                </p>

                <p>
                    <strong>Método:</strong> {newPayment.payment_method}
                </p>

                <p>
                    <strong>Validade:</strong>{' '}
                    {newPayment.expiry_date
                        ? new Date(newPayment.expiry_date).toLocaleDateString('pt-PT')
                        : '-'}
                </p>

                <Button
                    variant="secondary"
                    onClick={() => {
                        navigator.clipboard.writeText(newPayment.reference);
                        alert('Referência copiada.');
                    }}
                >
                    Copiar referência
                </Button>
            </div>
        )}

        <SearchBar
            placeholder="Pesquisar..."
            value={search}
            onChange={e => setSearch(e.target.value)}
        />

        <Table
    columns={[
        'Referência',
        'Documento',
        'Valor',
        'Estado',
        'Ações',
    ]}
>
    {filtered.length > 0 ? (
        filtered.map(payment => (
            <tr key={payment.id}>
                <td>{payment.reference}</td>

                <td>
                    {payment.document_request?.document_type?.name ||
                        payment.documentRequest?.documentType?.name ||
                        '-'}
                </td>

                <td>
                    {Number(payment.amount).toLocaleString('pt-PT')} Kz
                </td>

                <td>
                    <Badge status={payment.status} />
                </td>

                <td>
                    <div
                        style={{
                            display: 'flex',
                            gap: 8,
                        }}
                    >
                        {payment.status === 'Pendente' && (
                            <Button
                                variant="primary"
                                onClick={async () => {
                                    await paymentService.confirmPayment(payment.id);
                                    loadPayments();
                                }}
                            >
                                Já efectuei o pagamento
                            </Button>
                        )}

                        {payment.status === 'Pago' && (
                            <>
                                <Button
                                    variant="secondary"
                                    onClick={() => handleViewReceipt(payment)}
                                >
                                    Ver recibo
                                </Button>

                                <Button
                                    variant="primary"
                                    onClick={() =>
                                        paymentService.downloadReceipt(
                                            payment.id,
                                            payment.reference
                                        )
                                    }
                                >
                                    Download
                                </Button>
                            </>
                        )}
                    </div>
                </td>
            </tr>
        ))
    ) : (
        <tr>
            <td colSpan="5" style={{ textAlign: 'center' }}>
                Nenhum pagamento encontrado.
            </td>
        </tr>
    )}
</Table>

        <Modal
            open={!!selectedPayment}
            title={`Recibo - ${selectedPayment?.reference || ''}`}
            onClose={() => {
                if (receiptUrl) {
                    URL.revokeObjectURL(receiptUrl);
                }
                setReceiptUrl(null);
                setSelectedPayment(null);
            }}
        >
            {selectedPayment && receiptUrl && (
                <>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: 16,
                        }}
                    >
                        <strong>{selectedPayment.reference}</strong>

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
                                    paymentService.downloadReceipt(
                                        selectedPayment.id,
                                        selectedPayment.reference
                                    )
                                }
                            >
                                Download
                            </Button>
                        </div>
                    </div>

                    <iframe
                        src={receiptUrl}
                        style={{
                            width: '100%',
                            height: '85vh',
                            border: '1px solid #e5e7eb',
                            borderRadius: 8,
                            background: '#fff',
                        }}
                        title="Recibo PDF"
                    />
                </>
            )}
        </Modal>
    </>
);

}
