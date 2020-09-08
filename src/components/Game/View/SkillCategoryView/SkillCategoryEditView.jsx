import React from "react";
import {connect} from "react-redux"
import FormViewStyle from "../../../../styles/FormViewStyle";
import InputLabel from "../../../Common/Labels/InputLabel";
import {upload} from "../../../../util/HttpRequests";
import {skillCategoryUrl, uploadServerUrl, uploadUrl} from "../../../../util/Parameters";
import {InputTextarea} from "primereact/inputtextarea";
import Btn from "../../../Common/Buttons/Btn";
import {put} from "../../../../util/Http";
import {changeView, updateActiveGame} from "../../../../data-layer/ActionCreators";
import {skillCategoryView} from "../../../../Views";
import Popup from "../../../../util/Popup";
import Stubs from "../../../../stubs/Stubs";

export default connect(
    state => ({
        changeViewParams: state.changeViewParams,
        id: state.changeViewParams.id,
        activeGame: state.activeGame
    }),
    dispatch => ({
        updateActiveGame: (fieldNameToValue) => dispatch(updateActiveGame(fieldNameToValue)),
        back: id => dispatch(changeView(skillCategoryView, {
            id: id
        }))
    })
)(class SkillCategoryEditForm extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props.changeViewParams)
        this.state = Stubs.basicSkillCategory
        // get(skillCategoryUrl(this.props.id), rs => this.setState(rs))
    }

    onBackClicked() {
        this.props.back(this.props.id)
    }

    render() {
        return (
            <div style={FormViewStyle}>
                <InputLabel text={"Название:"}/>
                <input
                    name={"name"}
                    value={this.state.name}
                    onChange={e => this.setState({name: e.target.value})}/>
                <InputLabel text={"Картинка:"}/>
                <input type={"file"}
                       name={"img"}
                       onChange={e => upload(
                           uploadUrl,
                           e.target.files[0],
                           rs => this.setState({img: uploadServerUrl + "/" + rs.data.filename}))
                       }
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
        put(skillCategoryUrl(this.props.id), this.state, rs => {
            this.props.updateActiveGame({
                skillCategories: this.props.activeGame.skillCategories.filter(it => it.id !== rs.id).concat(rs)
            })
            this.props.back()
            Popup.info("Категория навыков обновлена.")
        })
    }

})