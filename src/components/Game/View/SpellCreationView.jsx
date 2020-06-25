import React from "react";
import InputLabel from "../../Common/InputLabel";
import {InputTextarea} from "primereact/inputtextarea";
import Btn from "../../Common/Btn";
import {spellSchoolCreationView} from "../../../Views";
import {upload} from "../../../util/HttpRequests";
import FormTitleLabel from "../../Common/FormTitleLabel";

export default class SpellCreationView extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.initialState
    }

    initialState = {
        name: "",
        img: "",
        description: ""
    }

    render() {
        return (
            <div style={style}>
                <FormTitleLabel text={"Создание заклинания:"}/>

                <InputLabel text={"Название заклинания:"}/>
                <input name={"name"}
                       value={this.state.name}
                       onChange={e => this.setState({name: e.target.value})}
                />

                <InputLabel text={"Картинка:"}/>
                <input type={"file"}
                       name={"img"}
                       onChange={e => upload(e.target.files[0], filename => this.setState({img: filename}))}
                />

                <InputLabel text={"Описание:"}/>
                <InputTextarea autoResize={true}
                               name={"description"}
                               value={this.state.description}
                               onChange={e => this.setState({description: e.target.value})}
                />

                <Btn text={"Сохранить"} onClick={() => this.onSaveClicked()}/>
            </div>
        )
    }

    onSaveClicked() {
        if (this.state.name == "" || this.state.description == "") return
        this.props.onSubmit(this.state)
        this.setState(this.initialState)
    }
}

const style = {
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",

    width: "90%"
}