import "./Modal.css";

export default function Modal({

    open = false,

    title,

    children,

    footer,

    onClose

}) {

    if (!open) return null;

    return (

        <div
            className="modal-overlay"
            onClick={onClose}
        >

            <div
                className="modal"
                onClick={(e) => e.stopPropagation()}
            >

                <div className="modal-header">

                    <h3>{title}</h3>

                    <button
                        type="button"
                        onClick={onClose}
                    >
                        ✕
                    </button>

                </div>

                <div className="modal-body">

                    {children}

                </div>

                {

                    footer && (

                        <div className="modal-footer">

                            {footer}

                        </div>

                    )

                }

            </div>

        </div>

    );

}