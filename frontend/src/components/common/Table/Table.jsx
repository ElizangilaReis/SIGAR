import "./Table.css";

export default function Table({
    columns = [],
    children,
    className = "",
}) {

    return (

        <div className={`table-container ${className}`}>

            <table className="table">

                <thead>

                    <tr>

                        {columns.map((column, index) => (

                            <th key={index}>
                                {column}
                            </th>

                        ))}

                    </tr>

                </thead>

                <tbody>

                    {children}

                </tbody>

            </table>

        </div>

    );

}