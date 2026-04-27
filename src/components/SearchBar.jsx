import React, { useContext } from "react";
import LocaleContext from "../context/LocaleContext";

function SearchBar({ keyword, onChangeHandler }) {
    const [ locale ] = useContext(LocaleContext);

    return (
        <section className="search-bar">
            <input 
                type="text" 
                placeholder={locale === "id" ? "Cari berdasarkan judul ..." : "Search by title ..." }
                value={keyword}
                onChange={onChangeHandler}
            />
        </section>
    )
}

export default SearchBar;