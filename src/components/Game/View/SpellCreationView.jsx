import React from "react";
import {connect} from "react-redux"
import InputLabel from "../../Common/InputLabel";
import {InputTextarea} from "primereact/inputtextarea";
import Btn from "../../Common/Btn";
import {changeView, updateSpellSchoolForm} from "../../../data-layer/ActionCreators";
import {spellSchoolCreationView} from "../../../Views";
import {upload} from "../../../util/HttpRequests";

function mapStateToProps(state) {
    return {
        parentForm: state.spellSchoolForm
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeView: view => dispatch(changeView(view)),
        updateParentForm: fieldNameToValue => dispatch(updateSpellSchoolForm(fieldNameToValue))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(class SpellCreationView extends React.Component {

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
                <Btn text={"Назад"} onClick={() => this.onBackClicked()}/>
            </div>
        )
    }

    onSaveClicked() {
        if (this.state.name == "" || this.state.description == "") return

        this.props.updateParentForm({spells: this.props.parentForm.spells.concat(this.state)})
        this.setState(this.initialState)
        this.props.changeView(spellSchoolCreationView)
    }

    onBackClicked() {
        this.props.changeView(spellSchoolCreationView)
    }
})

const style = {
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",

    width: "90%"
}