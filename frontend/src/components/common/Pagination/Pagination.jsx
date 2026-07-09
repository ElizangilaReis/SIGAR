import "./Pagination.css";

export default function Pagination({

    currentPage,

    totalPages,

    onPageChange,

}) {

    if (totalPages <= 1) return null;

    return (

        <div className="pagination">

            <button

                disabled={currentPage === 1}

                onClick={() => onPageChange(currentPage - 1)}

            >

                Anterior

            </button>

            <span>

                Página {currentPage} de {totalPages}

            </span>

            <button

                disabled={currentPage === totalPages}

                onClick={() => onPageChange(currentPage + 1)}

            >

                Seguinte

            </button>

        </div>

    );

}