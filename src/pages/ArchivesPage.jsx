import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SearchBar from "../components/SearchBar"
import NoteList from "../components/NoteList";
import { getArchivedNotes } from "../utils/network-data";
import LocaleContext from "../context/LocaleContext";

function ArchivesPageWrapper() {
    const navigate = useNavigate();
    const [ searchParams, setSearchParams ] = useSearchParams();    
    const keyword = searchParams.get('keyword');

    function changeSearchParams(keyword) {
        setSearchParams({ keyword });
    }

    return (
        <ArchivesPage navigate={navigate} defaultKeyword={keyword} changeSearchParams={changeSearchParams}/>
    )
}

class ArchivesPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            keyword: this.props.defaultKeyword || '',
            notes: [],
            initialized: true
        }

        this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
    }

    onKeywordChangeHandler(event) {
        this.setState({ keyword: event.target.value })
        this.props.changeSearchParams(event.target.value);
    }

    async componentDidMount() {
        const { error, data } = await getArchivedNotes();
        if (!error) {
            this.setState({ notes: data });
            this.setState({ initialized: false });
        }
    }

    render() {
        const { keyword, notes } = this.state;
        const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(keyword.toLowerCase()));
        
        return (
            <LocaleContext.Consumer>
                {
                    ([locale]) => (
                        <section className="homepage">
                            <h2>{locale === "id" ? "Catatan Arsip" : "Archived Note"}</h2>
                            <SearchBar keyword={this.state.keyword} onChangeHandler={this.onKeywordChangeHandler}/>
                            {
                                this.state.initialized 
                                ? <p>{locale === "id" ? "Mengambil data ..." : "Fetching data ..."}</p>
                                : filteredNotes.length === 0 ? <section className="notes-list-empty"><p className="notes-list__empty">{locale === "id" ? "Tidak ada catatan" : "No notes"}</p></section> : <NoteList notes={filteredNotes}/> 
                            }                
                        </section>
                    )
                }
            </LocaleContext.Consumer>
        )
    }
}

export default ArchivesPageWrapper;