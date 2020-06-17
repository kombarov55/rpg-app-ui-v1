import React from "react";
import {connect} from "react-redux";
import InputLabel from "../Common/InputLabel";
import {InputTextarea} from "primereact/inputtextarea";
import Btn from "../Common/Btn";
import {changeView, updateSpellSchoolForm} from "../../data-layer/ActionCreators";
import {skillCategoryFormView} from "../../Views";
import {upload} from "../../util/HttpRequests";

function mapStateToProps(state) {
    return {
        form: state.spellSchoolForm
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeView: view => dispatch(changeView(view)),
        updateForm: fieldNameToValue => dispatch(updateSpellSchoolForm(fieldNameToValue))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(function (props) {

    function onBackClicked() {
        props.changeView(skillCategoryFormView)
    }

    return (
        <div style={style}>
            <InputLabel text={"Название:"}/>
            <input name={"name"}
                   value={props.form.name}
                   onChange={e => props.updateForm({name: e.target.value})}
            />

            <InputLabel text={"Картинка:"}/>
            <input
                type={"file"}
                name={"img"}
                onChange={e => upload(e.target.files[0], filename => props.updateForm({img: filename}))}
            />

            <InputLabel text={"Описание:"}/>
            <InputTextarea autoResize={true}
                           name={"description"}
                           value={props.form.description}
                           onChange={e => props.updateForm({description: e.target.value})}
            />

            <InputLabel text={"Заклинания:"}/>
            <InputLabel text={"Стоимость перехода на новый круг:"}/>

            <Btn text={"Сохранить"}/>
            <Btn text={"Назад"} onClick={() => onBackClicked()}/>
        </div>
    )
})

const style = {
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",

    width: "90%"

}