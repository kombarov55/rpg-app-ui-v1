import React from "react";
import {connect} from "react-redux"
import FormViewStyle from "../../../../styles/FormViewStyle";
import Btn from "../../../Common/Buttons/Btn";
import {changeView} from "../../../../data-layer/ActionCreators";
import {gameView, skillCategoryEditView} from "../../../../Views";
import ViewInfo from "../../../Common/Constructions/ViewInfo";
import BasicSkillCategoryView from "./BasicSkillCategoryView";
import ComplexSkillCategoryView from "./ComplexSkillCategoryView";
import Stubs from "../../../../stubs/Stubs";

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
            toEditView: () => {
                console.log("skillCategoryPageView#mergeProps dispatching toEditView:")
                console.log(stateProps.skillCategory)
                return dispatch(changeView(skillCategoryEditView, {
                    skillCategory: stateProps.skillCategory
                }))
            }
        }
    }
)
(class SkillCategoryView extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.props.skillCategory
    }

    toEditView() {
        this.props.toEditView(this.props.skillCategory)
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
                    />

                }

                <Btn text={"Редактировать"} onClick={() => this.toEditView()}/>
                <Btn text={"Назад"} onClick={() => this.props.back()}/>
            </div>
        )
    }
})