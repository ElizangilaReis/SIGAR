import "./PageHeader.css";
import Button from "../../common/Button/Button";

export default function PageHeader({
    title,
    subtitle,
    buttonText,
    onButtonClick,
}) {
    return (
        <div className="page-header">

            <div>

                <h1>{title}</h1>

                {subtitle && <p>{subtitle}</p>}

            </div>

            {buttonText && (

                <Button
                    onClick={onButtonClick}
                >
                    {buttonText}
                </Button>

            )}

        </div>
    );
}