import React from "react";
import {connect} from "react-redux"
import FormViewStyle from "../../../../styles/FormViewStyle";
import Btn from "../../../Common/Buttons/Btn";
import {changeView} from "../../../../data-layer/ActionCreators";
import {gameView, skillCategoryEditView} from "../../../../Views";
import ViewInfo from "../../../Common/Constructions/ViewInfo";
import BasicSkillCategoryView from "./BasicSkillCategoryView";
import ComplexSkillCategoryView from "./ComplexSkillCategoryView";
import {httpDelete, post, put} from "../../../../util/Http";
import {saveSkillUrl, skillByIdUrl} from "../../../../util/Parameters";
import Popup from "../../../../util/Popup";

export default connect(
    state => ({
        skillCategory: state.changeViewParams.skillCategory,
        currencies: state.activeGame.currencies
    }),
    null,
    (stateProps, dispatchProps, ownProps) => {
        const {dispatch} = dispatchProps

        return {
            ...stateProps,
            ...ownProps,
            back: () => dispatch(changeView(gameView)),
            toEditView: () => dispatch(changeView(skillCategoryEditView, {
                skillCategory: stateProps.skillCategory
            }))
        }
    }
)
(class SkillCategoryView extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.props.skillCategory
        this.setState({
            skillFormVisible: false
        })
    }

    render() {
        return (
            <div style={FormViewStyle}>
                <ViewInfo
                    img={this.state.img}
                    name={this.state.name}
                    description={this.state.description}
                />
                {this.state.complex ?
                    <ComplexSkillCategoryView
                        spellSchools={this.state.spellSchools}
                    /> :
                    <BasicSkillCategoryView
                        skills={this.state.skills}
                        currencies={this.props.currencies}
                        onSkillAdded={skill => this.onSkillAdded(skill)}
                        onSkillEdited={skill => this.onSkillEdited(skill)}
                        onSkillDeleted={skill => this.onSkillDeleted(skill)}
                    />
                }
                <Btn text={"Редактировать"} onClick={() => this.props.toEditView()}/>
                <Btn text={"Назад"} onClick={() => this.props.back()}/>
            </div>
        )
    }

    onSkillAdded(skill) {
        post(saveSkillUrl(this.state.id), skill, rs => {
            this.setState(state => ({
                skills: state.skills.concat(rs)
            }))
            Popup.info("Навык добавлен")
        })
    }


    onSkillEdited(skill) {
        put(skillByIdUrl(skill.id), skill, rs => {
            this.setState(state => ({
                skills: state.skills.filter(v => v.id !== skill.id).concat(skill)
            }))
        })
    }

    onSkillDeleted(skill) {
        httpDelete(skillByIdUrl(skill.id), rs => {
            this.setState(state => ({
                skills: state.skills.filter(it => it.id !== skill.id)
            }))
            Popup.info("Навык удалён")
        })
    }
})