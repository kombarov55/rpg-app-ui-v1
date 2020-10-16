import React from "react";
import {connect} from "react-redux"
import FormViewStyle from "../../../../styles/FormViewStyle";
import Btn from "../../../Common/Buttons/Btn";
import {changeView, setActiveSkill, setActiveSpellSchool} from "../../../../data-layer/ActionCreators";
import {adminGameView, skillView, spellSchoolView} from "../../../../Views";
import ViewInfo from "../../../Common/Constructions/ViewInfo";
import BasicSkillCategoryComponent from "../Component/BasicSkillCategoryComponent";
import ComplexSkillCategoryComponent from "../Component/ComplexSkillCategoryComponent";
import GetDestinationByName from "../../../../data-layer/enums/GetDestinationByName";

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

            toSpellSchoolView: spellSchool => {
                dispatch(setActiveSpellSchool(spellSchool))
                dispatch(changeView(spellSchoolView))
            },
            toSkillView: skill => {
                dispatch(setActiveSkill(skill))
                dispatch(changeView(skillView))
            },
            back: () => dispatch(changeView(adminGameView))
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
                        skillCategoryId={this.state.id}
                        gameId={this.props.gameId}
                        skills={this.state.skills}
                        currencies={this.props.currencies}
                        toSkillView={skill => this.props.toSkillView(skill)}
                    />
                }
                <Btn text={"Назад"} onClick={() => this.props.back()}/>
            </div>
        )
    }
})