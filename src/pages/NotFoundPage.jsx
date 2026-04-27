import React, { useContext } from "react";
import LocaleContext from "../context/LocaleContext";

function NotFoundPage() {
    const [ locale ] = useContext(LocaleContext);

    return (
        <section>
            <h2>404</h2>
            <p>{locale === "id" ? "Halaman tidak ditemukan" : "Page not found"}</p>
        </section>
    )
}

export default NotFoundPage;