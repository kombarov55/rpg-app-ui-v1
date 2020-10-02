import React from "react";
import {connect} from "react-redux"
import FormViewStyle from "../../../../styles/FormViewStyle";
import Btn from "../../../Common/Buttons/Btn";
import {changeView, setActiveSpellSchool} from "../../../../data-layer/ActionCreators";
import {gameView, spellSchoolView} from "../../../../Views";
import ViewInfo from "../../../Common/Constructions/ViewInfo";
import BasicSkillCategoryComponent from "../Component/BasicSkillCategoryComponent";
import ComplexSkillCategoryComponent from "../Component/ComplexSkillCategoryComponent";
import {httpDelete, post, put} from "../../../../util/Http";
import {saveSkillUrl, skillByIdUrl} from "../../../../util/Parameters";
import Popup from "../../../../util/Popup";
import InputLabel from "../../../Common/Labels/InputLabel";
import GetDestinationByName from "../../../../data-layer/enums/GetDestinationByName";
import Chip from "../../../Common/Labels/Chip";

export default connect(
    state => ({
        skillCategory: state.activeSkillCategory,
        gameId: state.activeGame.id,
        currencies: state.activeGame.currencies
    }),
    null,
    (stateProps, dispatchProps, ownProps) => {
        const {dispatch} = dispatchProps

        return {
            ...stateProps,
            ...ownProps,

            toSpellSchoolView: (spellSchool) => {
                dispatch(setActiveSpellSchool(spellSchool))
                dispatch(changeView(spellSchoolView))
            },
            back: () => dispatch(changeView(gameView))
        }
    }
)
(class SkillCategoryView extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.props.skillCategory
    }

    render() {
        return (
            <div style={FormViewStyle}>
                <ViewInfo
                    img={this.state.img}
                    name={this.state.name}
                    description={this.state.description}
                    chips={[
                        GetDestinationByName(this.state.destination)
                    ]}
                />
                {this.state.complex ?
                    <ComplexSkillCategoryComponent
                        skillCategoryId={this.state.id}
                        currencies={this.props.currencies}
                        spellSchools={this.state.spellSchools}
                        toSpellSchoolView={spellSchool => this.props.toSpellSchoolView(spellSchool)}
                    /> :
                    <BasicSkillCategoryComponent
                        gameId={this.props.gameId}
                        skills={this.state.skills}
                        currencies={this.props.currencies}
                        onSkillAdded={skill => this.onSkillAdded(skill)}
                        onSkillEdited={skill => this.onSkillEdited(skill)}
                        onSkillDeleted={skill => this.onSkillDeleted(skill)}
                        updateSkill={skill => this.updateSkill(skill)}
                    />
                }
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

    updateSkill(skill) {
        this.setState(state => ({
            skills: state.skills.filter(v => v.id !== skill.id).concat(skill)
        }))
    }
})