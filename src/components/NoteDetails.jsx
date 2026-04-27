import React, { useContext } from "react";
import { showFormattedDate } from "../utils";
import { MdOutlineArchive, MdOutlineUnarchive, MdDeleteOutline } from "react-icons/md";
import parser from "html-react-parser";
import LocaleContext from "../context/LocaleContext";

function NoteDetails({ note, onArchiveNotes, onDeleteNotes }) {
    const [ locale ] = useContext(LocaleContext)
    return (
        note !== null && (
        <section className="detail-page">
            <h3 className="detail-page__title">{note.title}</h3>
            <p className="detail-page__createdAt">{showFormattedDate(note.createdAt, locale)}</p>
            <div className="detail-page__body">
                {parser(note.body)}
            </div>
            <div className="detail-page__action">
                <button className="action" type="button" title={note.archived? "Aktifkan" : "Arsipkan"} onClick={onArchiveNotes}>
                    {
                        note.archived? <MdOutlineUnarchive /> : <MdOutlineArchive />
                    }
                </button>
                <button className="action" type="button" title="Hapus" onClick={onDeleteNotes}><MdDeleteOutline /></button>
            </div>
        </section>
    ))
}

export default NoteDetails;