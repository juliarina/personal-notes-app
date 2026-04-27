import React from "react";
import { MdDone } from "react-icons/md";
import LocaleContext from "../context/LocaleContext";

class NoteInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            body: ''
        }

        this.onTitleChangeHandler = this.onTitleChangeHandler.bind(this);
        this.onBodyChangeHandler = this.onBodyChangeHandler.bind(this)
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onTitleChangeHandler(event) {
        this.setState({ title: event.target.value });
    }

    onBodyChangeHandler(event) {
        this.setState({ body: event.target.innerHTML });
    }

    onSubmitHandler() {
        this.props.addNotes(this.state)
    }

    render() {
        return (
            <LocaleContext.Consumer>
                {
                    ([locale, toggleLocale]) => (
                        <section className="add-new-page">
                            <div className="add-new-page__input">
                                <input className="add-new-page__input__title" type="text" placeholder={locale === "id" ? "Judul" : "Title"} value={this.state.title} onChange={this.onTitleChangeHandler}/>
                                <div className="add-new-page__input__body" contentEditable="true" type="text" data-placeholder={locale === "id" ? "tuliskan sesuatu ..." : "write something ..."} value={this.state.body} onInput={this.onBodyChangeHandler}/>
                            </div>
                            <div className="add-new-page__action">
                                <button className="action" type="button" title="Simpan" onClick={this.onSubmitHandler}><MdDone /></button>
                            </div>
                        </section>
                    )
                }
            </LocaleContext.Consumer>
        )
    }
}

export default NoteInput;