import React from "react";
import NoteInput from "../components/NoteInput";
import NoteInputWrapper from "../components/NoteInput";
import { addNote } from "../utils/network-data";
import { useNavigate } from "react-router-dom";

function AddPage() {
    const navigate = useNavigate();

    async function onAddNotesHandler(note) {
        const { error, data } = await addNote(note);
        if (!error) {
            navigate("/");
        }
    }

    return (
        <NoteInputWrapper addNotes={onAddNotesHandler}/>  
    )   
}

export default AddPage;