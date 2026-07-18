import Modal from "../../../components/common/Modal/Modal";
import Button from "../../../components/common/Button/Button";

export default function DocumentRequestDetails({

    open,
    onClose,
    request

}) {

    if (!request) return null;

    return (

        <Modal

            open={open}

            onClose={onClose}

            title="Detalhes do Pedido"

            footer={

                <Button

                    onClick={onClose}

                >

                    Fechar

                </Button>

            }

        >

            <div className="details-grid">

                <div className="detail-item">

                    <strong>Referência</strong>

                    <p>{request.reference}</p>

                </div>

                <div className="detail-item">

                    <strong>Estado</strong>

                    <p>{request.status}</p>

                </div>

                <div className="detail-item">

                    <strong>Estudante</strong>

                    <p>{request.student?.name}</p>

                </div>

                <div className="detail-item">

                    <strong>Nº do Estudante</strong>

                    <p>{request.student?.student_number}</p>

                </div>

                <div className="detail-item">

                    <strong>Documento</strong>

                    <p>{request.document_type?.name}</p>

                </div>

                <div className="detail-item">

                    <strong>Preço</strong>

                    <p>

                        {request.document_type?.price}

                        {" "}
                        Kz

                    </p>

                </div>

                <div className="detail-item">

                    <strong>Funcionário Responsável</strong>

                    <p>

                        {

                            request.employee?.name ||

                            "Não atribuído"

                        }

                    </p>

                </div>

                <div className="detail-item">

                    <strong>Data do Pedido</strong>

                    <p>{request.requested_at}</p>

                </div>

                <div className="detail-item">

                    <strong>Data de Conclusão</strong>

                    <p>

                        {

                            request.completed_at ||

                            "-"

                        }

                    </p>

                </div>

                <div className="detail-item">

                    <strong>Data de Entrega</strong>

                    <p>

                        {

                            request.delivered_at ||

                            "-"

                        }

                    </p>

                </div>

                <div className="detail-item full-width">

                    <strong>Observações</strong>

                    <p>

                        {

                            request.observations ||

                            "Sem observações."

                        }

                    </p>

                </div>

            </div>

        </Modal>

    );

}