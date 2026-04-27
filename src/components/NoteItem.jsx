import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { showFormattedDate } from "../utils/index";
import parser from "html-react-parser";
import LocaleContext from "../context/LocaleContext";

function NoteItem({ note }) {
    const [ locale ] = useContext(LocaleContext);

    return (
        <article className="note-item">
            <h3 className="note-item__title"><Link to={`/notes/${note.id}`}>{note.title}</Link></h3>
            <p className="note-item__createdAt">{showFormattedDate(note.createdAt, locale)}</p>
            <p className="note-item__body">{parser(note.body)}</p>
        </article>
    )
}

export default NoteItem;