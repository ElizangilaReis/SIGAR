import Modal from "../../../components/common/Modal/Modal";
import Button from "../../../components/common/Button/Button";

export default function PaymentDetails({

    open,

    onClose,

    payment

}) {

    if (!payment) return null;

    return (

        <Modal

            open={open}

            onClose={onClose}

            title="Detalhes do Pagamento"

            footer={

                <Button

                    onClick={onClose}

                >

                    Fechar

                </Button>

            }

        >

            <p><strong>Referência:</strong> {payment.reference}</p>

            <p><strong>Estudante:</strong> {payment.student?.user?.name}</p>

            <p><strong>Valor:</strong> {payment.amount} Kz</p>

            <p><strong>Estado:</strong> {payment.status}</p>

            <p><strong>Método:</strong> {payment.payment_method}</p>

            <p><strong>Documento:</strong> {payment.document_request?.document_type?.name}</p>

        </Modal>

    );

}