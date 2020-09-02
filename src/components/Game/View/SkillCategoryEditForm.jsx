import React from "react";
import {connect} from "react-redux"
import FormViewStyle from "../../../styles/FormViewStyle";
import InputLabel from "../../Common/Labels/InputLabel";
import {upload} from "../../../util/HttpRequests";
import {skillCategoryUrl, uploadServerUrl, uploadUrl} from "../../../util/Parameters";
import {InputTextarea} from "primereact/inputtextarea";
import Btn from "../../Common/Buttons/Btn";
import {get, put} from "../../../util/Http";
import {changeView, updateActiveGame} from "../../../data-layer/ActionCreators";
import {gameView} from "../../../Views";
import Popup from "../../../util/Popup";

export default connect(
    state => ({
        skillCategoryId: state.changeViewParams.id,
        activeGame: state.activeGame
    }),
    dispatch => ({
        back: () => dispatch(changeView(gameView)),
        updateActiveGame: (fieldNameToValue) => dispatch(updateActiveGame(fieldNameToValue))
    })
)(class SkillCategoryEditForm extends React.Component {

    constructor(props) {
        super(props);

        get(skillCategoryUrl(this.props.skillCategoryId), rs => this.setState(rs))

        this.state = {}
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
                <Btn text={"Назад"} onClick={() => this.props.back()}/>
            </div>
        )
    }

    onSaveClicked() {
        put(skillCategoryUrl(this.props.skillCategoryId), this.state, rs => {
            this.props.updateActiveGame({
                skillCategories: this.props.activeGame.skillCategories.filter(it => it.id !== rs.id).concat(rs)
            })
            this.props.back()
            Popup.info("Категория навыков обновлена.")
        })
    }

})