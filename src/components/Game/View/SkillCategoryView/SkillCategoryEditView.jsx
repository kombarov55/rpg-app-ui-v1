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

export default connect(
    state => ({
        skillCategory: state.changeViewParams.skillCategory,
        activeGame: state.activeGame
    }),
    null,
    (stateProps, {dispatch}, ownProps) => ({
        ...stateProps,
        ...ownProps,
        updateActiveGame: (fieldNameToValue) => dispatch(updateActiveGame(fieldNameToValue, {
            skillCategory: stateProps.skillCategory
        })),
        back: (skillCategory = stateProps.skillCategory) => dispatch(changeView(skillCategoryView, {
            skillCategory: skillCategory
        }))
    })
)(class SkillCategoryEditForm extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props.skillCategory)
        this.state = this.props.skillCategory
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
        put(skillCategoryUrl(this.props.skillCategory.id), this.state, rs => {
            this.props.updateActiveGame({
                skillCategories: this.props.activeGame.skillCategories.filter(it => it.id !== rs.id).concat(rs)
            })
            this.props.back(rs)
            Popup.info("Категория навыков обновлена.")
        })
    }

})