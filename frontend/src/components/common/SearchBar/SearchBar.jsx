import "./SearchBar.css";
import { FaSearch } from "react-icons/fa";

export default function SearchBar({

    value,

    onChange,

    placeholder = "Pesquisar..."

}) {

    return (

        <div className="searchbar">

            <FaSearch />

            <input

                value={value}

                onChange={(e) => onChange(e.target.value)}

                placeholder={placeholder}

            />

        </div>

    );

}