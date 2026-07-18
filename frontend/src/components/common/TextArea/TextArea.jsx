import "./TextArea.css";

export default function TextArea({

    label,
    name,
    value,
    onChange,
    rows = 4,
    required = false,
    placeholder = ""

}) {

    return (

        <div className="textarea-group">

            {label && <label>{label}</label>}

            <textarea

                name={name}

                value={value}

                onChange={onChange}

                rows={rows}

                required={required}

                placeholder={placeholder}

            />

        </div>

    );

}