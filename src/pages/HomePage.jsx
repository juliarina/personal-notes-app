import React from "react";
import { FiPlus } from "react-icons/fi";
import { useNavigate, useSearchParams } from "react-router-dom";
import SearchBar from "../components/SearchBar"
import NoteList from "../components/NoteList";
import { getActiveNotes } from "../utils/network-data";
import LocaleContext from "../context/LocaleContext";

function HomePageWrapper() {
    const navigate = useNavigate();
    const [ searchParams, setSearchParams ] = useSearchParams();    
    const keyword = searchParams.get('keyword');

    function changeSearchParams(keyword) {
        setSearchParams({ keyword });
    }

    return (
        <HomePage navigate={navigate} defaultKeyword={keyword} changeSearchParams={changeSearchParams}/>
    )
}

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            keyword: this.props.defaultKeyword || '',
            notes: [],
            initializing: true
        }

        this.onNavigatePageHandler = this.onNavigatePageHandler.bind(this);
        this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
    }

    async componentDidMount() {
        const { error, data } = await getActiveNotes();
        if (!error) {
            this.setState({ notes: data, initializing: false });
        }
    }

    onNavigatePageHandler() {
        this.props.navigate("/notes/new");
    }

    onKeywordChangeHandler(event) {
        this.setState({ keyword: event.target.value })
        this.props.changeSearchParams(event.target.value);
    }

    render() {
        const { keyword, notes } = this.state;
        const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(keyword.toLowerCase()));
        return (
            <LocaleContext.Consumer>
                {
                    ([locale]) => (
                        <section className="homepage">
                            <h2>{locale === "id" ? "Catatan Aktif" : "Active Note"}</h2>
                            <div className="homepage__action">
                                <button className="action" type="button" title={locale === "id" ? "Tambah" : "Add" } onClick={this.onNavigatePageHandler}><FiPlus /></button>
                            </div>  
                            <SearchBar keyword={this.state.keyword} onChangeHandler={this.onKeywordChangeHandler}/>
                            { 
                                this.state.initializing 
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

export default HomePageWrapper;