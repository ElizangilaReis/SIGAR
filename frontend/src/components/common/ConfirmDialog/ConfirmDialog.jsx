import "./ConfirmDialog.css";
import Button from "../Button/Button";

export default function ConfirmDialog({
    open,
    title = "Confirmação",
    message,
    onConfirm,
    onCancel
}) {

    if (!open) return null;

    return (

        <div className="confirm-overlay">

            <div className="confirm-box">

                <h2>{title}</h2>

                <p>{message}</p>

                <div className="confirm-actions">

                    <Button variant="secondary" onClick={onCancel}>
                        Cancelar
                    </Button>

                    <Button variant="danger" onClick={onConfirm}>
                        Confirmar
                    </Button>

                </div>

            </div>

        </div>

    );

}