import React, { useEffect, useState } from "react";
import NoteDetails from "../components/NoteDetails";
import { useParams, useNavigate } from "react-router-dom";
import { getNote, archiveNote, unarchiveNote, deleteNote } from "../utils/network-data";

function DetailPage () {
    const navigate = useNavigate();
    const { id } = useParams();
    const [note, setNote] = useState(null);
    const [initialize, setInitialize] = useState(true);

    useEffect(() => {
        async function fetchNote() {
            const { error, data } = await getNote(id)

            if(!error) {
                setNote(data);
            }

            setInitialize(false);
        } 
        
        fetchNote(); 
    }, [id]);    

    async function onDeleteNotesHandler() {
        const { error, data } = await deleteNote(id);
        if (!error){
            note.archived? navigate("/archives") : navigate("/");
        }
    }

    async function onArchiveNotesHandler() {
        if (note.archived) {
            const { error, data } = await unarchiveNote(id);
            if (!error) {
                navigate("/archives");
            }
        } else {
            const { error, data } = await archiveNote(id);
            if (!error) {
                navigate("/")
            }
        }
    }

    if (initialize) {
        return <></>;
    }

    return (
        <NoteDetails note={note} onArchiveNotes={onArchiveNotesHandler} onDeleteNotes={onDeleteNotesHandler}/>        
    )
}

export default DetailPage;