import React from "react";
import NoteItem from "./NoteItem";

function NoteList({ notes }) {
    return (
        <section className="notes-list">
            { notes.map((note) => <NoteItem key={note.id} note={note}/>) }
        </section>
    )
}

export default NoteList;