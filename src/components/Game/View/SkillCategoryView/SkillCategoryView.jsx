import React from "react";
import {connect} from "react-redux"
import FormViewStyle from "../../../../styles/FormViewStyle";
import Btn from "../../../Common/Buttons/Btn";
import {changeView} from "../../../../data-layer/ActionCreators";
import {gameView, skillCategoryEditView, skillCategoryView, skillFormView} from "../../../../Views";
import ViewInfo from "../../../Common/Constructions/ViewInfo";
import BasicSkillCategoryView from "./BasicSkillCategoryView";
import ComplexSkillCategoryView from "./ComplexSkillCategoryView";

export default connect(
    state => ({
        skillCategory: state.changeViewParams.skillCategory
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
                        onSkillAdded={(skill) => this.onSkillAdded(skill)}
                        onSkillEdited={(skill) => this.onSkillEdited(skill)}
                    />
                }
                <Btn text={"Редактировать"} onClick={() => this.props.toEditView()}/>
                <Btn text={"Назад"} onClick={() => this.props.back()}/>
            </div>
        )
    }

    onSkillAdded(skill) {
        console.log("added skill")
        console.log(skill)
        this.setState(state => ({
            skills: state.skills.concat(skill)
        }))
    }

    onSkillEdited(skill) {
        console.log("edited skill")
        console.log(skill)
    }
})