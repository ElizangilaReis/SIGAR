import "./StatCard.css";

export default function StatCard({
    title,
    value,
    subtitle,
    icon
}) {
    return (
        <div className="stat-card">

            <div className="stat-icon">
                {icon}
            </div>

            <div className="stat-info">

                <h4>{title}</h4>

                <h2>{value}</h2>

                {subtitle && <p>{subtitle}</p>}

            </div>

        </div>
    );
}