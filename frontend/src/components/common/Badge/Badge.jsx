import "./Badge.css";

export default function Badge({
    children,
    variant = "success",
}) {
    return (
        <span className={`badge badge-${variant}`}>
            {children}
        </span>
    );
}