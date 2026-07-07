import "./Button.css";

export default function Button({
    children,
    variant = "primary",
    type = "button",
    onClick,
    disabled = false,
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`btn btn-${variant}`}
        >
            {children}
        </button>
    );
}