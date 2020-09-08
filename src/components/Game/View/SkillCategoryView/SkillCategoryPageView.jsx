import React from "react";
import {connect} from "react-redux"
import FormViewStyle from "../../../../styles/FormViewStyle";
import Btn from "../../../Common/Buttons/Btn";
import {changeView} from "../../../../data-layer/ActionCreators";
import {gameView, skillCategoryEditView} from "../../../../Views";
import ViewInfo from "../../../Common/Constructions/ViewInfo";
import Stubs from "../../../../stubs/Stubs";
import BasicSkillCategoryView from "./BasicSkillCategoryView";
import ComplexSkillCategoryView from "./ComplexSkillCategoryView";

export default connect(
    state => ({
        changeViewParams: state.changeViewParams,
        id: state.changeViewParams.id
    }),
    dispatch => ({
        back: () => dispatch(changeView(gameView)),
        toEditView: (skillCategoryId) => dispatch(changeView(skillCategoryEditView, {
            id: skillCategoryId
        }))
    })
)(class SkillCategoryView extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props.id)
        this.state = Stubs.basicSkillCategory
        // get(skillCategoryUrl(this.props.id), rs => this.setState(rs))
    }

    toEditView() {
        this.props.toEditView(this.props.id)
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